/*
 * Carpool backend for the wedding site.
 *
 * DEPLOYMENT
 * 1. Create a new Google Sheet (any name, e.g. "Wedding Carpool Data").
 *    It can start completely empty - this script creates its own "Rides"
 *    and "Joins" tabs (with headers) the first time it runs.
 * 2. In that Sheet: Extensions -> Apps Script.
 * 3. Delete the placeholder code and paste this whole file in.
 * 4. Deploy -> New deployment -> Select type: Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Authorize when prompted (it's your own script/sheet).
 * 6. Copy the resulting Web App URL (ends in /exec) and paste it into
 *    CARPOOL_APPS_SCRIPT_URL near the top of script.js.
 * 7. Every time you change this .gs file, you must create a NEW deployment
 *    version (Deploy -> Manage deployments -> Edit -> new version) for the
 *    changes to take effect on the existing URL.
 *
 * DATA MODEL
 * - "Rides" tab: one row per offered ride OR posted ride request, distinguished
 *   by the "type" column ('offer' or 'request'). Offers use driverName /
 *   driverContact / spareSeats; requests use requesterName / requesterContact
 *   and leave those columns blank. type/requesterName/requesterContact are
 *   appended as the LAST three columns (rather than inserted earlier) so that
 *   if you already deployed an earlier version of this script and have real
 *   rows in the sheet, they keep working unchanged - old rows just read as
 *   type 'offer' since their (blank) type cell defaults to that.
 * - "Joins" tab: one row per person who joined an offered ride.
 * doGet returns all rides/requests with any joined passengers nested inline.
 * doPost handles three actions: "offerRide", "requestRide", and "joinRide".
 */

var RIDES_SHEET_NAME = 'Rides';
var RIDES_HEADERS = [
  'rideId', 'direction', 'datetime', 'driverName', 'driverContact', 'spareSeats', 'notes', 'createdAt',
  'type', 'requesterName', 'requesterContact'
];

var JOINS_SHEET_NAME = 'Joins';
var JOINS_HEADERS = ['joinId', 'rideId', 'name', 'contact', 'createdAt'];

function getOrCreateSheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
  }
  return sheet;
}

function doGet(e) {
  return respond_(getAllData_());
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (error) {
    return respond_({ error: 'Invalid request body' });
  }

  if (body.action === 'offerRide') {
    var rideId = addRide_(body);
    var result = getAllData_();
    result.rideId = rideId;
    return respond_(result);
  }

  if (body.action === 'requestRide') {
    var requestId = addRequest_(body);
    var requestResult = getAllData_();
    requestResult.rideId = requestId;
    return respond_(requestResult);
  }

  if (body.action === 'joinRide') {
    addJoin_(body);
    var joinResult = getAllData_();
    joinResult.rideId = body.rideId;
    return respond_(joinResult);
  }

  return respond_({ error: 'Unknown action' });
}

// Writes a full row as literal text (number format '@') so Sheets never
// auto-converts the datetime/createdAt strings into Date cells - that
// conversion would re-anchor them to the spreadsheet's timezone and corrupt
// the wall-clock time originally entered by the driver/requester. Also
// guards against two simultaneous submissions clobbering the same row.
function appendRowAsText_(sheet, values) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var row = sheet.getLastRow() + 1;
    var range = sheet.getRange(row, 1, 1, values.length);
    range.setNumberFormat('@');
    range.setValues([values]);
  } finally {
    lock.releaseLock();
  }
}

function addRide_(body) {
  var sheet = getOrCreateSheet_(RIDES_SHEET_NAME, RIDES_HEADERS);
  var rideId = Utilities.getUuid();
  appendRowAsText_(sheet, [
    rideId,
    body.direction || '',
    body.datetime || '',
    body.driverName || '',
    body.driverContact || '',
    body.spareSeats || '',
    body.notes || '',
    new Date().toISOString(),
    'offer',
    '',
    ''
  ]);
  return rideId;
}

function addRequest_(body) {
  var sheet = getOrCreateSheet_(RIDES_SHEET_NAME, RIDES_HEADERS);
  var rideId = Utilities.getUuid();
  appendRowAsText_(sheet, [
    rideId,
    body.direction || '',
    body.datetime || '',
    '',
    '',
    '',
    body.notes || '',
    new Date().toISOString(),
    'request',
    body.requesterName || '',
    body.requesterContact || ''
  ]);
  return rideId;
}

function addJoin_(body) {
  var sheet = getOrCreateSheet_(JOINS_SHEET_NAME, JOINS_HEADERS);
  var joinId = Utilities.getUuid();
  appendRowAsText_(sheet, [
    joinId,
    body.rideId || '',
    body.name || '',
    body.contact || '',
    new Date().toISOString()
  ]);
  return joinId;
}

function getAllData_() {
  var ridesSheet = getOrCreateSheet_(RIDES_SHEET_NAME, RIDES_HEADERS);
  var joinsSheet = getOrCreateSheet_(JOINS_SHEET_NAME, JOINS_HEADERS);

  var rideRows = ridesSheet.getDataRange().getValues().slice(1).filter(function (row) {
    return row[0];
  });
  var joinRows = joinsSheet.getDataRange().getValues().slice(1).filter(function (row) {
    return row[0];
  });

  var joinsByRide = {};
  joinRows.forEach(function (row) {
    var rideId = row[1];
    if (!joinsByRide[rideId]) joinsByRide[rideId] = [];
    joinsByRide[rideId].push({
      name: row[2],
      contact: row[3]
    });
  });

  var rides = rideRows.map(function (row) {
    var rideId = row[0];
    var type = row[8] || 'offer';
    var ride = {
      rideId: rideId,
      type: type,
      direction: row[1],
      datetime: row[2],
      notes: row[6],
      createdAt: row[7],
      passengers: joinsByRide[rideId] || []
    };
    if (type === 'request') {
      ride.requesterName = row[9];
      ride.requesterContact = row[10];
    } else {
      ride.driverName = row[3];
      ride.driverContact = row[4];
      ride.spareSeats = row[5];
    }
    return ride;
  });

  rides.sort(function (a, b) {
    return new Date(a.datetime) - new Date(b.datetime);
  });

  return { rides: rides };
}

function respond_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
