const tabs = document.querySelectorAll('nav.tabs .tab');
const panels = document.querySelectorAll('.panel');
const langButtons = document.querySelectorAll('.lang-btn');
const i18nNodes = document.querySelectorAll('[data-i18n]');
const countdownEl = document.getElementById('countdown');
const homeGalleryCaption = document.getElementById('home-gallery-caption');
const faqQuickLinks = document.querySelectorAll('a[href="#faq"]');
const scheduleEvent6 = document.getElementById('schedule-event-6');
const carpoolModeButtons = document.querySelectorAll('.carpool-mode-btn');
const carpoolOfferForm = document.getElementById('carpool-offer-form');
const carpoolOfferStatus = document.getElementById('carpool-offer-status');
const carpoolOfferTimeSelect = document.getElementById('carpool-offer-time');
const carpoolRequestForm = document.getElementById('carpool-request-form');
const carpoolRequestStatus = document.getElementById('carpool-request-status');
const carpoolRequestTimeSelect = document.getElementById('carpool-request-time');
const carpoolList = document.getElementById('carpool-list');
const carpoolLoading = document.getElementById('carpool-loading');
const carpoolEmpty = document.getElementById('carpool-empty');
const carpoolRequestsList = document.getElementById('carpool-requests-list');
const carpoolRequestsEmpty = document.getElementById('carpool-requests-empty');

let currentLang = 'en';
// Paste the deployed Apps Script Web App URL here (see carpool-apps-script.gs for the backend to deploy).
const CARPOOL_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzgBX5twsUrd6CYUajoTTSDnTu0svEXNy_pQYHO_g3xO23dzPNOxBmp8CiKCXSXO2Qq/exec'

const translations = {
  en: {
    eyebrow: 'Wedding Celebration',
    date_line: 'Saturday, 8 August 2026 | Chateau de Nitray | Touraine, France',
    tab_home: 'Home',
    tab_travel: 'Travel & Accommodation',
    tab_carpool: 'Carpool',
    tab_venue: 'Chateau Nitray',
    tab_schedule: 'Schedule',
    tab_loire: 'What to Do in the Loire',
    tab_gifts: 'Gifts',
    tab_faq: 'FAQ',
    home_title: 'Welcome',
    home_intro: 'We are delighted to invite you to celebrate our marriage at Chateau de Nitray. Join us for a summer weekend of ceremony, food, dancing, and time together in the Loire Valley.',
    home_big_day: 'The Big Day',
    home_date: 'Date: Saturday, 8 August 2026, from 3 pm (tbc)',
    home_venue: 'Venue: Chateau de Nitray, Athee-sur-Cher',
    home_style: 'Dress code: Colorful, comfortable for the summer and flat shoes for walking on grass. Wear something that brings you joy: this is a wedding with no expectation of a suit.',
    home_weekend: 'Weekend Plan',
    home_weekend_2: 'Saturday: ceremony and reception.',
    home_weekend_3: 'Sunday: relaxed brunch and departures.',
    home_weekend_faq_link: 'Questions about the weekend? See FAQ.',
    photo_nitray: 'Chateau de Nitray',
    photo_welcome: 'A welcome from our family to yours',
    photo_signing: 'All the documents are signed, so we are ready for a big party on the 8th!',
    travel_title: 'Travel & Accommodation',
    travel_intro: 'Chateau de Nitray is in the Loire Valley between Tours and Amboise. The closest rail stop is Saint-Martin-le-Beau, while Amboise and Saint-Pierre-des-Corps are the easiest larger stations for onward transfers and car hire.',
    travel_paris_title: 'From Paris',
    travel_paris_1: 'Fastest route for most guests: Paris Montparnasse → Saint-Pierre-des-Corps or Tours TGV station.',
    travel_paris_link: 'Book this train route on SNCF Connect',
    travel_paris_2: 'Road: approximately 2h30 to 3h00 depending on traffic.',
    travel_paris_3: 'Car hire is available in the Tours / Saint-Pierre-des-Corps area, and local transfer to Chateau de Nitray is usually around 20 to 25 minutes.',
    travel_lille_title: 'From Lille',
    travel_lille_1: 'Train: direct train from Lille to Saint-Pierre-des-Corps.',
    travel_lille_2: 'Road: approximately 5 to 6h depending on traffic.',
    travel_lille_3: 'From the station, continue by car hire or taxi.',
    travel_uk_title: 'From the UK',
    travel_uk_1: 'Eurostar from London to Paris and then follow the Paris instructions above. Please do not take the plane.',
    travel_stay_title: 'Where to Stay',
    travel_stay_1: 'Amboise and Loches are both great towns to visit, with beautiful historic buildings, and both are around a 30-minute drive from the venue.',
    travel_stay_2: 'We have a personal preference for Amboise, which sits directly on the Loire.',
    photo_amboise: 'Amboise',
    travel_tip: 'August is high season in the Loire, so book accommodation and trains early.',
    travel_sncf_link: 'Book trains on SNCF Connect',
    carpool_title: 'Carpool',
    carpool_intro: 'Use this page to organise car sharing between the stations, Amboise, and the chateau. Offer spare seats if you are driving, or post a request if you need a lift.',
    carpool_mode_offer: 'I have spare seats',
    carpool_mode_request: 'I need a ride',
    carpool_offer_heading: 'Offer a ride',
    carpool_request_heading: 'Request a ride',
    carpool_direction_label: 'Direction',
    carpool_dir_tours_nitray: 'Tours → Chateau de Nitray',
    carpool_dir_amboise_nitray: 'Amboise → Chateau de Nitray',
    carpool_dir_nitray_tours: 'Chateau de Nitray → Tours',
    carpool_dir_nitray_amboise: 'Chateau de Nitray → Amboise',
    carpool_day_label: 'Day',
    carpool_day_friday: 'Friday 7 August',
    carpool_day_saturday: 'Saturday 8 August',
    carpool_day_sunday: 'Sunday 9 August',
    carpool_time_label: 'Time',
    carpool_name_label: 'Your name',
    carpool_contact_label: 'Phone or email',
    carpool_seats_label: 'Number of spare seats',
    carpool_notes_label: 'Notes (optional)',
    carpool_offer_submit: 'Offer this ride',
    carpool_offer_status_sending: 'Posting your ride...',
    carpool_offer_status_sent: 'Thanks! Your ride has been posted below.',
    carpool_offer_status_setup: 'Carpool backend not configured yet. Add the Apps Script URL in script.js.',
    carpool_offer_status_error: 'Sorry, there was a problem posting your ride. Please try again.',
    carpool_request_submit: 'Request this ride',
    carpool_request_status_sending: 'Posting your request...',
    carpool_request_status_sent: 'Thanks! Your request has been posted below.',
    carpool_request_status_error: 'Sorry, there was a problem posting your request. Please try again.',
    carpool_tracker_title: 'Current rides',
    carpool_loading: 'Loading current rides...',
    carpool_offers_subtitle: 'Rides offered',
    carpool_empty: 'No rides posted yet - be the first!',
    carpool_requests_subtitle: 'Ride requests',
    carpool_requests_empty: 'No requests posted yet.',
    carpool_seats_offered_singular: 'spare seat offered by',
    carpool_seats_offered_plural: 'spare seats offered by',
    carpool_passengers_label: 'Passengers:',
    carpool_no_passengers: 'No one has joined yet.',
    carpool_driver_contact_label: 'Driver contact',
    carpool_passenger_contact_label: 'Passenger contacts',
    carpool_requester_contact_label: 'Contact',
    carpool_join_button: 'Join this car',
    carpool_join_name_placeholder: 'Your name',
    carpool_join_contact_placeholder: 'Phone or email',
    carpool_join_confirm: 'Confirm',
    carpool_join_status_sending: 'Joining...',
    carpool_join_status_error: 'Sorry, there was a problem joining this car. Please try again.',
    carpool_joined_badge: 'You are in this car',
    venue_title: 'Chateau de Nitray',
    venue_history_title: 'History',
    venue_history_1: 'Nitray castle was built in the 16th century, likely to replace an older castle dating from the 13th century. Nitray castle has produced wines since the 18th century. It follows traditional wine production methods, and only produces organic wines. These wines carry the label of the local region, AOC Touraine.',
    venue_website: 'Visit the official website',
    venue_notes_title: 'Venue Notes',
    venue_notes_1: 'Outdoor spaces for the wedding ceremony and cocktails',
    venue_notes_2: 'Dinner outside in the chateau courtyard, with indoor space for dancing afterward',
    venue_notes_3: 'A small forest for an afternoon stroll',
    venue_notes_4: 'Bring clothing that is appropriate for hot weather and comfortable shoes',
    venue_notes_5: 'Indoor spaces are only accessible via stairs. Please contact us if you think you might need support in navigating stairs.',
    venue_address_title: 'Address',
    venue_address_line: 'Chateau de Nitray, 31 Nitray, 37270 Athee-sur-Cher, France',
    venue_address_more: 'More information about the castle and estate is available at the link below.',
    venue_map: 'Open in Google Maps',
    schedule_title: 'Schedule',
    schedule_intro: 'Here is a rough schedule of events for the day. Times are approximate and may shift slightly.',
    schedule_1: 'Ceremony - In an aisle of trees behind the castle (wear appropriate shoes)',
    schedule_2: 'Photos, cocktails, snacks and games - in the castle courtyard',
    schedule_3: 'Dinner - outside in the chateau courtyard',
    schedule_4: 'Dancing - indoors after dinner',
    schedule_5: 'Snacks and refreshments',
    schedule_6: 'The party concludes',
    loire_title: 'What to Do in the Loire',
    loire_intro: 'Turn the wedding trip into a Loire holiday with wine, cycling, chateaux, and nearby historic towns.',
    loire_wine_title: 'Wine Tastings',
    loire_wine_1: 'Touraine and Vouvray are both nearby, with cellar visits and guided tastings.',
    loire_wine_2: 'Many wineries offer English and French tasting sessions.',
    loire_wine_3: 'Half-day and full-day tasting routes are available from Amboise and Tours.',
    loire_velo_title: 'La Loire a Velo',
    loire_velo_1: 'A famous long-distance cycle route with mostly flat riverside sections.',
    loire_velo_2: 'Great for mixed groups; e-bikes are widely available.',
    loire_velo_3: 'Suitable for easy day rides or multi-day itineraries.',
    photo_velo: 'La Loire a Velo',
    gifts_title: 'Gifts',
    gifts_intro: 'Your presence is the best gift. If you would like to give something, we would love something that reminds us of you - gifts need not be expensive. For example, we would love a second-hand book you have read, with a note explaining what it means to you. If you have your own idea for something you think we might like, we would be absolutely delighted, so please do not feel bound by any suggestions.',
    gifts_personal_title: 'Personal gifts',
    gifts_personal_1: 'A second-hand book you have read, with a short personal note',
    gifts_personal_2: 'Something artistic that you have liked (or made!) and a description of why',
    gifts_exp_title: 'Experiences & Memories',
    gifts_exp_1: 'Contribution to our honeymoon and family trip: we are planning a small celebration in Australia with John\'s family, with a two-week stopover in Japan or South Korea.',
    gifts_exp_2: 'Cooking or wine-tasting experience to enjoy together',
    gifts_exp_3: 'Theatre, concert, or museum tickets',
    gifts_exp_4: 'Contribution toward future travels',
    gifts_home_title: 'Home & Everyday Life',
    gifts_home_1: 'High-quality bed linen or towels.',
    gifts_home_2: 'Tableware or glassware for hosting.',
    gifts_home_3: 'Cookware or kitchen tools we will use for years to come.',
    gifts_home_4: 'Artwork or books for our home.',
    gifts_home_5: 'Coffee machine.',
    gifts_home_6: 'Dog backpack.',
    gifts_charity_title: 'Charities',
    gifts_charity_1: 'GiveWell',
    gifts_charity_2: 'CoefficientGiving',
    gifts_payment_note: 'For those who would prefer to contribute financially towards a gift, find below our bank details for accounts in France, Australia, and the UK - please choose whichever is most convenient for you. Please use the reference "Wedding John Adrien - [Name of gift]" so we know what it\'s for.',
    gifts_fr_bank_title: 'French bank details',
    gifts_uk_bank_title: 'UK bank details',
    gifts_au_bank_title: 'Australian bank details',
    gifts_iban_label: 'IBAN',
    gifts_bic_label: 'BIC',
    gifts_sort_code_label: 'Sort code',
    gifts_account_label: 'Account number',
    gifts_account_name_label: 'Account name',
    gifts_bsb_label: 'BSB',
    faq_title: 'FAQ',
    faq_general_title: 'General',
    faq_q_arrival: 'When should we arrive for the ceremony?',
    faq_a_arrival: 'Guest arrival begins at 14:30. We recommend arriving promptly so everyone is seated comfortably before the ceremony.',
    faq_q_children: 'Are children welcome?',
    faq_a_children: 'Yes - children are very welcome.',
    faq_rsvp_note: 'Please make sure all guests (including children and plus-ones) were included in your RSVP. If you are unsure, just contact us and we will confirm.',
    faq_transport_title: 'Transport',
    faq_q_car: 'Do I need a car?',
    faq_a_car: 'Not necessarily. Many guests will manage perfectly with trains and taxis, but hiring a car gives more flexibility. We intend to provide a limited shuttle service to and from neighbouring towns on the night of the wedding.',
    faq_q_parking: 'Will there be parking at the venue?',
    faq_a_parking: 'Yes - parking will be available.',
    faq_q_dress: 'Dress code?',
    faq_a_dress: 'Colorful, comfortable for the summer and flat shoes for walking on grass. Wear something that brings you joy: this is a wedding with no expectation of a suit.',
    faq_contact_prompt: 'Any more questions? Contact us:',
    footer_line: 'With love, John & Adrien'
  },
  fr: {
    eyebrow: 'Célébration de mariage',
    date_line: 'Samedi 8 août 2026 | Château de Nitray | Touraine, France',
    tab_home: 'Accueil',
    tab_travel: 'Voyage et hébergement',
    tab_carpool: 'Covoiturage',
    tab_venue: 'Château Nitray',
    tab_schedule: 'Programme',
    tab_loire: 'Que faire dans la Loire',
    tab_gifts: 'Cadeaux',
    tab_faq: 'FAQ',
    home_title: 'Bienvenue',
    home_intro: 'Nous sommes ravis de vous inviter à célébrer notre mariage au Château de Nitray. Rejoignez-nous pour un week-end d\'été en Val de Loire, avec cérémonie, repas, danse et moments partagés.',
    home_big_day: 'Le grand jour',
    home_date: 'Date : samedi 8 août 2026, à partir de 15 h (à confirmer)',
    home_venue: 'Lieu : Château de Nitray, Athée-sur-Cher',
    home_style: 'Code vestimentaire : coloré, confortable pour l\'été et des chaussures plates pour marcher sur l\'herbe. Portez quelque chose qui vous rend heureux·se, pas besoin d\'un costume.',
    home_weekend: 'Programme du week-end',
    home_weekend_2: 'Samedi : cérémonie et réception.',
    home_weekend_3: 'Dimanche : brunch',
    home_weekend_faq_link: 'Des questions sur le week-end ? Voir la FAQ.',
    photo_nitray: 'Château de Nitray',
    travel_title: 'Voyage et hébergement',
    travel_intro: 'Le Château de Nitray se situe proche de Tours et d\'Amboise. La gare la plus proche est Saint-Martin-le-Beau, tandis qu\'Amboise et Saint-Pierre-des-Corps sont les grandes gares les plus pratiques pour les transferts et la location de voiture.',
    travel_paris_title: 'Depuis Paris',
    travel_paris_1: 'Itinéraire le plus rapide pour la plupart des invités : Paris Montparnasse → Saint-Pierre-des-Corps ou la gare TGV de Tours.',
    travel_paris_link: 'Réserver ce trajet sur SNCF Connect',
    travel_paris_2: 'Route : environ 2 h 30 à 3 h 00 selon le trafic.',
    travel_paris_3: 'La location de voiture est disponible autour de Tours / Saint-Pierre-des-Corps, et le transfert local vers le Château de Nitray prend en général 20 à 25 minutes.',
    travel_lille_title: 'Depuis Lille',
    travel_lille_1: 'Train direct pour Saint-Pierre-des-Corps.',
    travel_lille_2: 'Route : environ 5 à 6 h selon le trafic.',
    travel_lille_3: 'Puis location de voiture ou taxi.',
    travel_uk_title: 'Depuis le Royaume-Uni',
    travel_uk_1: 'Eurostar de Londres à Paris puis suivez les indications depuis Paris. Merci de ne pas prendre l\'avion.',
    travel_stay_title: 'Où loger',
    travel_stay_1: 'Amboise et Loches sont deux villes très jolies à visiter, avec de beaux bâtiments historiques, et toutes les deux à environ trente minutes en voiture du Château de Nitray.',
    travel_stay_2: 'Nous avons une préférence personnelle pour Amboise, qui se trouve directement sur la Loire.',
    photo_amboise: 'Amboise',
    travel_tip: 'Août est la haute saison en Loire : réservez hébergement et trains le plus tôt possible.',
    travel_sncf_link: 'Réserver des trains sur SNCF Connect',
    carpool_title: 'Covoiturage',
    carpool_intro: 'Utilisez cette page pour organiser le covoiturage entre les gares, Amboise et le château. Proposez des places libres si vous conduisez, ou publiez une demande si vous avez besoin d\'être déposé·e.',
    carpool_mode_offer: 'J\'ai des places libres',
    carpool_mode_request: 'J\'ai besoin d\'un trajet',
    carpool_offer_heading: 'Proposer un trajet',
    carpool_request_heading: 'Demander un trajet',
    carpool_direction_label: 'Direction',
    carpool_dir_tours_nitray: 'Tours → Château de Nitray',
    carpool_dir_amboise_nitray: 'Amboise → Château de Nitray',
    carpool_dir_nitray_tours: 'Château de Nitray → Tours',
    carpool_dir_nitray_amboise: 'Château de Nitray → Amboise',
    carpool_day_label: 'Jour',
    carpool_day_friday: 'Vendredi 7 août',
    carpool_day_saturday: 'Samedi 8 août',
    carpool_day_sunday: 'Dimanche 9 août',
    carpool_time_label: 'Heure',
    carpool_name_label: 'Votre nom',
    carpool_contact_label: 'Téléphone ou email',
    carpool_seats_label: 'Nombre de places disponibles',
    carpool_notes_label: 'Remarques (facultatif)',
    carpool_offer_submit: 'Proposer ce trajet',
    carpool_offer_status_sending: 'Publication du trajet...',
    carpool_offer_status_sent: 'Merci ! Votre trajet a été publié ci-dessous.',
    carpool_offer_status_setup: 'Le service de covoiturage n\'est pas encore configuré. Ajoutez l\'URL Apps Script dans script.js.',
    carpool_offer_status_error: 'Désolé, un problème est survenu lors de la publication de votre trajet. Veuillez réessayer.',
    carpool_request_submit: 'Demander ce trajet',
    carpool_request_status_sending: 'Publication de votre demande...',
    carpool_request_status_sent: 'Merci ! Votre demande a été publiée ci-dessous.',
    carpool_request_status_error: 'Désolé, un problème est survenu lors de la publication de votre demande. Veuillez réessayer.',
    carpool_tracker_title: 'Trajets en cours',
    carpool_loading: 'Chargement des trajets en cours...',
    carpool_offers_subtitle: 'Trajets proposés',
    carpool_empty: 'Aucun trajet publié pour le moment - soyez le premier !',
    carpool_requests_subtitle: 'Demandes de trajet',
    carpool_requests_empty: 'Aucune demande publiée pour le moment.',
    carpool_seats_offered_singular: 'place disponible proposée par',
    carpool_seats_offered_plural: 'places disponibles proposées par',
    carpool_passengers_label: 'Passagers :',
    carpool_no_passengers: 'Personne n\'a encore rejoint ce trajet.',
    carpool_driver_contact_label: 'Contact du conducteur ou de la conductrice',
    carpool_passenger_contact_label: 'Contacts des passagers',
    carpool_requester_contact_label: 'Contact',
    carpool_join_button: 'Rejoindre ce trajet',
    carpool_join_name_placeholder: 'Votre nom',
    carpool_join_contact_placeholder: 'Téléphone ou email',
    carpool_join_confirm: 'Confirmer',
    carpool_join_status_sending: 'Inscription en cours...',
    carpool_join_status_error: 'Désolé, un problème est survenu. Veuillez réessayer.',
    carpool_joined_badge: 'Vous faites partie de ce trajet',
    venue_title: 'Château de Nitray',
    venue_history_title: 'Histoire',
    venue_history_1: 'Le château de Nitray a été construit au XVIe siècle, probablement pour remplacer un ancien château datant du XIIIe siècle. Le château de Nitray produit du vin depuis le XVIIIe siècle. Il suit des méthodes de production traditionnelles et ne produit que des vins biologiques. Ces vins portent l\'appellation de la région locale, AOC Touraine.',
    venue_website: 'Consulter le site officiel',
    venue_notes_title: 'Infos sur le lieu',
    venue_notes_1: 'Espaces extérieurs pour la cérémonie de mariage et les cocktails',
    venue_notes_2: 'Dîner dehors dans la cour du château, avec un espace intérieur pour la danse ensuite',
    venue_notes_3: 'Une petite forêt pour une promenade l\'après-midi',
    venue_notes_4: 'Apportez des vêtements adaptés aux fortes chaleurs et des chaussures confortables',
    venue_notes_5: 'Les espaces intérieurs sont accessibles uniquement par des escaliers. Contactez-nous si vous pensez avoir besoin d\'aide pour les emprunter.',
    venue_address_title: 'Adresse',
    venue_address_line: 'Château de Nitray, 31 Nitray, 37270 Athée-sur-Cher, France',
    venue_address_more: 'Plus d\'informations sur le château et le domaine sont disponibles au lien ci-dessous.',
    venue_map: 'Voir sur Google Maps',
    tab_schedule: 'Programme',
    schedule_title: 'Programme',
    schedule_intro: 'Voici un programme approximatif des événements de la journée. Les horaires sont approximatifs et peuvent varier légèrement.',
    schedule_1: 'Cérémonie - Dans une allée d\'arbres derrière le château (portez des chaussures adaptées)',
    schedule_2: 'Photos, cocktails, collations et jeux - dans la cour du château',
    schedule_3: 'Dîner - dehors dans la cour du château',
    schedule_4: 'Danse - à l\'intérieur après le dîner',
    schedule_5: 'Collations et rafraîchissements',
    schedule_6: '',
    loire_title: 'Que faire dans la Loire',
    loire_intro: 'Transformez ce voyage de mariage en séjour en Loire : vins, vélo, châteaux et villages historiques.',
    loire_wine_title: 'Dégustations de vin',
    loire_wine_1: 'La Touraine et Vouvray sont proches, avec visites de caves et dégustations guidées.',
    loire_wine_2: 'De nombreux domaines proposent des séances en français et en anglais.',
    loire_wine_3: 'Des circuits de dégustation d\'une demi-journée ou d\'une journée sont possibles depuis Amboise et Tours.',
    loire_velo_title: 'La Loire à Vélo',
    loire_velo_1: 'Un itinéraire cyclable très connu avec des sections majoritairement plates en bord de Loire.',
    loire_velo_2: 'Accessible pour tous les niveaux avec possibilité de louer des vélos électriques.',
    loire_velo_3: 'Parfait pour une sortie d\'une journée ou un itinéraire sur plusieurs jours.',
    photo_velo: 'La Loire à Vélo',
    photo_welcome: '',
    photo_signing: 'Tous les documents sont signés : place à une grande fête le 8 !',
    gifts_title: 'Cadeaux',
    gifts_intro: 'Votre présence est le plus beau des cadeaux. Si vous souhaitez néanmoins nous offrir quelque chose, nous serions ravis d\'un cadeau qui vous rappelle à nous - pas besoin de dépenser une fortune. Par exemple, nous serions touchés de recevoir un livre d\'occasion que vous avez lu, accompagné d\'un mot expliquant ce qu\'il représente pour vous. Si vous avez votre propre idée de cadeau qui pourrait nous plaire, nous en serions absolument enchantés, alors ne vous sentez surtout pas limité·e par ces quelques exemples.',
    gifts_personal_title: 'Cadeaux personnels',
    gifts_personal_1: 'Un livre d\'occasion que vous avez lu, avec un petit mot personnel.',
    gifts_personal_2: 'Quelque chose d\'artistique que vous avez aimé (ou créé), avec un mot expliquant pourquoi.',
    gifts_exp_title: 'Expériences et souvenirs',
    gifts_exp_1: 'Contribution à notre voyage de noces : nous prévoyons de faire une petite cérémonie en Australie avec la famille de John et de faire une escale de deux semaines au Japon ou en Corée du Sud.',
    gifts_exp_2: 'Expérience de cuisine ou de dégustation de vin à vivre ensemble.',
    gifts_exp_3: 'Billets de théâtre, concert ou musée.',
    gifts_exp_4: 'Contribution à de futurs voyages.',
    gifts_home_title: 'Maison et vie quotidienne',
    gifts_home_1: 'Linge de lit ou serviettes de haute qualité.',
    gifts_home_2: 'Vaisselle ou verrerie pour recevoir.',
    gifts_home_3: 'Ustensiles de cuisine qui durent toute la vie.',
    gifts_home_4: 'Oeuvres d\'art ou livres pour notre maison.',
    gifts_home_5: 'Machine à café.',
    gifts_home_6: 'Sac à dos pour chien.',
    gifts_charity_title: 'Associations',
    gifts_charity_1: 'GiveWell',
    gifts_charity_2: 'CoefficientGiving',
    gifts_payment_note: 'Pour celles et ceux qui préféreraient contribuer financièrement à un cadeau, vous trouverez ci-dessous nos coordonnées bancaires pour des comptes en France, en Australie et au Royaume-Uni : choisissez celui qui vous convient le mieux. Merci d\'indiquer en référence « Mariage John Adrien - [Nom du cadeau] » afin que nous sachions à quoi cela correspond.',
    gifts_fr_bank_title: 'Coordonnées bancaires françaises',
    gifts_uk_bank_title: 'Coordonnées bancaires britanniques',
    gifts_au_bank_title: 'Coordonnées bancaires australiennes',
    gifts_iban_label: 'IBAN',
    gifts_bic_label: 'BIC',
    gifts_sort_code_label: 'Sort code',
    gifts_account_label: 'Numéro de compte',
    gifts_account_name_label: 'Nom du titulaire',
    gifts_bsb_label: 'BSB',
    faq_title: 'FAQ',
    faq_general_title: 'Informations générales',
    faq_q_arrival: 'Quand devons-nous arriver pour la cérémonie ?',
    faq_a_arrival: 'L\'arrivée des invités commence à 14 h 30. Nous vous recommandons d\'arriver à l\'heure afin que tout le monde soit confortablement installé avant la cérémonie.',
    faq_q_children: 'Les enfants sont-ils les bienvenus ?',
    faq_a_children: 'Oui - les enfants sont les bienvenus.',
    faq_rsvp_note: 'Merci de vérifier que tous les invités (y compris les enfants et les plus-uns) sont bien inclus dans votre RSVP. En cas de doute, contactez-nous et nous confirmerons.',
    faq_transport_title: 'Transport',
    faq_q_car: 'Ai-je besoin d\'une voiture ?',
    faq_a_car: 'Pas nécessairement. De nombreux invités se débrouilleront parfaitement avec les trains et les taxis, mais louer une voiture offre plus de flexibilité. Nous prévoyons de proposer un service de navettes limité vers et depuis les villes voisines la nuit du mariage.',
    faq_q_parking: 'Y aura-t-il un parking sur place ?',
    faq_a_parking: 'Oui - un parking sera disponible.',
    faq_q_dress: 'Code vestimentaire ?',
    faq_a_dress: 'Coloré, confortable pour l\'été et des chaussures plates pour marcher sur l\'herbe. Portez quelque chose qui vous apporte de la joie : c\'est un mariage sans attente de costume.',
    faq_contact_prompt: 'D\'autres questions ? Contactez-nous :',
    footer_line: 'Avec amour, John et Adrien'
  }
};

function activateTab(tabId) {
  tabs.forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.tab === tabId);
  });

  panels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.id === tabId);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));
});

function applyTranslations(lang) {
  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    const text = translations[lang][key];
    if (text !== undefined) {
      node.textContent = text;
      node.hidden = text === '';
    }
  });

  if (homeGalleryCaption) {
    homeGalleryCaption.hidden = !translations[lang].photo_welcome;
  }
  if (scheduleEvent6) {
    scheduleEvent6.hidden = !translations[lang].schedule_6;
  }

  document.documentElement.lang = lang;
  document.body.dataset.lang = lang;
  updateCountdown();
  renderCarpoolRides();
}

langButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentLang = button.dataset.langBtn;
    langButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn === button);
    });
    applyTranslations(currentLang);
  });
});

faqQuickLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    activateTab('faq');
    const target = document.getElementById('faq');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const CARPOOL_JOINED_STORAGE_KEY = 'carpool_joined_ride_ids';
const CARPOOL_DIRECTION_KEYS = {
  'tours-nitray': 'carpool_dir_tours_nitray',
  'amboise-nitray': 'carpool_dir_amboise_nitray',
  'nitray-tours': 'carpool_dir_nitray_tours',
  'nitray-amboise': 'carpool_dir_nitray_amboise'
};

let carpoolData = [];
let carpoolOfferSubmitting = false;
let carpoolRequestSubmitting = false;

function getJoinedRideIds() {
  try {
    const raw = window.localStorage.getItem(CARPOOL_JOINED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function addJoinedRideId(rideId) {
  const ids = getJoinedRideIds();
  if (!ids.includes(rideId)) {
    ids.push(rideId);
    try {
      window.localStorage.setItem(CARPOOL_JOINED_STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      // localStorage unavailable - contact reveal just won't persist across reloads
    }
  }
}

function formatCarpoolDateTime(lang, value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  return date.toLocaleString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatCarpoolSeatsLine(lang, seats, driverName) {
  const key = Number(seats) === 1 ? 'carpool_seats_offered_singular' : 'carpool_seats_offered_plural';
  return `${seats} ${translations[lang][key]} ${driverName}`;
}

function buildCarpoolDirectionEl(lang, ride) {
  const directionEl = document.createElement('p');
  directionEl.className = 'carpool-ride-direction';
  const directionKey = CARPOOL_DIRECTION_KEYS[ride.direction];
  directionEl.textContent = directionKey ? translations[lang][directionKey] : ride.direction;
  return directionEl;
}

function buildCarpoolDatetimeEl(lang, ride) {
  const datetimeEl = document.createElement('p');
  datetimeEl.className = 'carpool-ride-datetime';
  datetimeEl.textContent = formatCarpoolDateTime(lang, ride.datetime);
  return datetimeEl;
}

function buildCarpoolOfferCard(lang, ride, joinedIds) {
  const card = document.createElement('article');
  card.className = 'card carpool-ride';
  card.dataset.rideId = ride.rideId;

  card.appendChild(buildCarpoolDirectionEl(lang, ride));
  card.appendChild(buildCarpoolDatetimeEl(lang, ride));

  const seatsEl = document.createElement('p');
  seatsEl.className = 'carpool-ride-seats';
  seatsEl.textContent = formatCarpoolSeatsLine(lang, ride.spareSeats, ride.driverName);
  card.appendChild(seatsEl);

  if (ride.notes) {
    const notesEl = document.createElement('p');
    notesEl.className = 'carpool-ride-notes';
    notesEl.textContent = ride.notes;
    card.appendChild(notesEl);
  }

  const passengersEl = document.createElement('p');
  passengersEl.className = 'carpool-ride-passengers';
  const passengersLabel = document.createElement('strong');
  passengersLabel.textContent = translations[lang].carpool_passengers_label;
  passengersEl.appendChild(passengersLabel);
  if (ride.passengers.length > 0) {
    const list = document.createElement('ul');
    ride.passengers.forEach((passenger) => {
      const li = document.createElement('li');
      li.textContent = passenger.name;
      list.appendChild(li);
    });
    passengersEl.appendChild(list);
  } else {
    const noneEl = document.createElement('span');
    noneEl.textContent = ` ${translations[lang].carpool_no_passengers}`;
    passengersEl.appendChild(noneEl);
  }
  card.appendChild(passengersEl);

  const isJoined = joinedIds.includes(ride.rideId);

  if (isJoined) {
    const contactsEl = document.createElement('div');
    contactsEl.className = 'carpool-contacts';

    const driverContactEl = document.createElement('p');
    const driverLabel = document.createElement('strong');
    driverLabel.textContent = `${translations[lang].carpool_driver_contact_label}: `;
    driverContactEl.appendChild(driverLabel);
    driverContactEl.appendChild(document.createTextNode(`${ride.driverName} - ${ride.driverContact}`));
    contactsEl.appendChild(driverContactEl);

    if (ride.passengers.length > 0) {
      const passengerContactLabel = document.createElement('p');
      const strongLabel = document.createElement('strong');
      strongLabel.textContent = translations[lang].carpool_passenger_contact_label;
      passengerContactLabel.appendChild(strongLabel);
      contactsEl.appendChild(passengerContactLabel);

      const contactList = document.createElement('ul');
      ride.passengers.forEach((passenger) => {
        const li = document.createElement('li');
        li.textContent = `${passenger.name} - ${passenger.contact}`;
        contactList.appendChild(li);
      });
      contactsEl.appendChild(contactList);
    }

    card.appendChild(contactsEl);

    const badge = document.createElement('span');
    badge.className = 'carpool-joined-badge';
    badge.textContent = translations[lang].carpool_joined_badge;
    card.appendChild(badge);
  } else {
    const joinButton = document.createElement('button');
    joinButton.type = 'button';
    joinButton.className = 'form-submit';
    joinButton.textContent = translations[lang].carpool_join_button;

    const joinForm = document.createElement('form');
    joinForm.className = 'data-form carpool-join-form';
    joinForm.hidden = true;

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.required = true;
    nameInput.placeholder = translations[lang].carpool_join_name_placeholder;
    joinForm.appendChild(nameInput);

    const contactInput = document.createElement('input');
    contactInput.type = 'text';
    contactInput.required = true;
    contactInput.placeholder = translations[lang].carpool_join_contact_placeholder;
    joinForm.appendChild(contactInput);

    const confirmButton = document.createElement('button');
    confirmButton.type = 'submit';
    confirmButton.className = 'form-submit';
    confirmButton.textContent = translations[lang].carpool_join_confirm;
    joinForm.appendChild(confirmButton);

    const statusEl = document.createElement('p');
    statusEl.className = 'form-status';
    joinForm.appendChild(statusEl);

    joinButton.addEventListener('click', () => {
      joinButton.hidden = true;
      joinForm.hidden = false;
      nameInput.focus();
    });

    joinForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handleCarpoolJoinSubmit(ride.rideId, nameInput.value.trim(), contactInput.value.trim(), statusEl, joinForm);
    });

    card.appendChild(joinButton);
    card.appendChild(joinForm);
  }

  return card;
}

function buildCarpoolRequestCard(lang, ride) {
  const card = document.createElement('article');
  card.className = 'card carpool-ride';
  card.dataset.rideId = ride.rideId;

  card.appendChild(buildCarpoolDirectionEl(lang, ride));
  card.appendChild(buildCarpoolDatetimeEl(lang, ride));

  const requesterEl = document.createElement('p');
  requesterEl.className = 'carpool-ride-seats';
  requesterEl.textContent = ride.requesterName;
  card.appendChild(requesterEl);

  if (ride.notes) {
    const notesEl = document.createElement('p');
    notesEl.className = 'carpool-ride-notes';
    notesEl.textContent = ride.notes;
    card.appendChild(notesEl);
  }

  const contactEl = document.createElement('p');
  const contactLabel = document.createElement('strong');
  contactLabel.textContent = `${translations[lang].carpool_requester_contact_label}: `;
  contactEl.appendChild(contactLabel);
  contactEl.appendChild(document.createTextNode(ride.requesterContact));
  card.appendChild(contactEl);

  return card;
}

function renderCarpoolRides() {
  const lang = currentLang;
  const joinedIds = getJoinedRideIds();
  const offers = carpoolData.filter((ride) => ride.type !== 'request');
  const requests = carpoolData.filter((ride) => ride.type === 'request');

  if (carpoolList) {
    carpoolList.innerHTML = '';
    if (carpoolEmpty) carpoolEmpty.hidden = offers.length > 0;
    offers.forEach((ride) => {
      carpoolList.appendChild(buildCarpoolOfferCard(lang, ride, joinedIds));
    });
  }

  if (carpoolRequestsList) {
    carpoolRequestsList.innerHTML = '';
    if (carpoolRequestsEmpty) carpoolRequestsEmpty.hidden = requests.length > 0;
    requests.forEach((ride) => {
      carpoolRequestsList.appendChild(buildCarpoolRequestCard(lang, ride));
    });
  }
}

async function fetchCarpoolData() {
  if (!CARPOOL_APPS_SCRIPT_URL) {
    if (carpoolLoading) {
      carpoolLoading.hidden = false;
      carpoolLoading.textContent = translations[currentLang].carpool_offer_status_setup;
    }
    return;
  }

  try {
    const response = await fetch(CARPOOL_APPS_SCRIPT_URL);
    if (!response.ok) throw new Error('Carpool fetch failed');
    const data = await response.json();
    carpoolData = data.rides || [];
    if (carpoolLoading) carpoolLoading.hidden = true;
    renderCarpoolRides();
  } catch (error) {
    if (carpoolLoading) {
      carpoolLoading.hidden = false;
      carpoolLoading.textContent = translations[currentLang].carpool_offer_status_error;
    }
  }
}

function populateCarpoolTimeOptions(selectEl) {
  if (!selectEl) return;
  for (let hour = 0; hour < 24; hour += 1) {
    for (let minute = 0; minute < 60; minute += 15) {
      const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      selectEl.appendChild(option);
    }
  }
}

populateCarpoolTimeOptions(carpoolOfferTimeSelect);
populateCarpoolTimeOptions(carpoolRequestTimeSelect);

carpoolModeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.dataset.carpoolMode;
    carpoolModeButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn === button);
    });
    if (carpoolOfferForm) carpoolOfferForm.hidden = mode !== 'offer';
    if (carpoolRequestForm) carpoolRequestForm.hidden = mode !== 'request';
  });
});

async function handleCarpoolOfferSubmit(event) {
  event.preventDefault();
  if (!carpoolOfferForm || !carpoolOfferStatus) return;
  if (carpoolOfferSubmitting) return;
  carpoolOfferSubmitting = true;

  const payload = {
    action: 'offerRide',
    direction: document.getElementById('carpool-offer-direction').value,
    datetime: `${document.getElementById('carpool-offer-day').value}T${document.getElementById('carpool-offer-time').value}`,
    driverName: document.getElementById('carpool-offer-name').value.trim(),
    driverContact: document.getElementById('carpool-offer-contact').value.trim(),
    spareSeats: document.getElementById('carpool-offer-seats').value,
    notes: document.getElementById('carpool-offer-notes').value.trim()
  };

  const fields = carpoolOfferForm.querySelectorAll('input, select, textarea, button');
  fields.forEach((field) => { field.disabled = true; });
  carpoolOfferStatus.textContent = translations[currentLang].carpool_offer_status_sending;

  if (!CARPOOL_APPS_SCRIPT_URL) {
    carpoolOfferStatus.textContent = translations[currentLang].carpool_offer_status_setup;
    fields.forEach((field) => { field.disabled = false; });
    carpoolOfferSubmitting = false;
    return;
  }

  try {
    const response = await fetch(CARPOOL_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Carpool offer failed');
    const data = await response.json();
    carpoolData = data.rides || [];
    if (data.rideId) addJoinedRideId(data.rideId);
    renderCarpoolRides();
    carpoolOfferStatus.textContent = translations[currentLang].carpool_offer_status_sent;
    carpoolOfferForm.reset();
  } catch (error) {
    carpoolOfferStatus.textContent = translations[currentLang].carpool_offer_status_error;
  } finally {
    fields.forEach((field) => { field.disabled = false; });
    carpoolOfferSubmitting = false;
  }
}

async function handleCarpoolRequestSubmit(event) {
  event.preventDefault();
  if (!carpoolRequestForm || !carpoolRequestStatus) return;
  if (carpoolRequestSubmitting) return;
  carpoolRequestSubmitting = true;

  const payload = {
    action: 'requestRide',
    direction: document.getElementById('carpool-request-direction').value,
    datetime: `${document.getElementById('carpool-request-day').value}T${document.getElementById('carpool-request-time').value}`,
    requesterName: document.getElementById('carpool-request-name').value.trim(),
    requesterContact: document.getElementById('carpool-request-contact').value.trim(),
    notes: document.getElementById('carpool-request-notes').value.trim()
  };

  const fields = carpoolRequestForm.querySelectorAll('input, select, textarea, button');
  fields.forEach((field) => { field.disabled = true; });
  carpoolRequestStatus.textContent = translations[currentLang].carpool_request_status_sending;

  if (!CARPOOL_APPS_SCRIPT_URL) {
    carpoolRequestStatus.textContent = translations[currentLang].carpool_offer_status_setup;
    fields.forEach((field) => { field.disabled = false; });
    carpoolRequestSubmitting = false;
    return;
  }

  try {
    const response = await fetch(CARPOOL_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Carpool request failed');
    const data = await response.json();
    carpoolData = data.rides || [];
    renderCarpoolRides();
    carpoolRequestStatus.textContent = translations[currentLang].carpool_request_status_sent;
    carpoolRequestForm.reset();
  } catch (error) {
    carpoolRequestStatus.textContent = translations[currentLang].carpool_request_status_error;
  } finally {
    fields.forEach((field) => { field.disabled = false; });
    carpoolRequestSubmitting = false;
  }
}

async function handleCarpoolJoinSubmit(rideId, name, contact, statusEl, joinForm) {
  if (!name || !contact) return;
  const fields = joinForm.querySelectorAll('input, button');
  fields.forEach((field) => { field.disabled = true; });
  statusEl.textContent = translations[currentLang].carpool_join_status_sending;

  if (!CARPOOL_APPS_SCRIPT_URL) {
    statusEl.textContent = translations[currentLang].carpool_offer_status_setup;
    fields.forEach((field) => { field.disabled = false; });
    return;
  }

  try {
    const response = await fetch(CARPOOL_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'joinRide', rideId, name, contact })
    });
    if (!response.ok) throw new Error('Carpool join failed');
    const data = await response.json();
    carpoolData = data.rides || [];
    addJoinedRideId(rideId);
    renderCarpoolRides();
  } catch (error) {
    statusEl.textContent = translations[currentLang].carpool_join_status_error;
    fields.forEach((field) => { field.disabled = false; });
  }
}

if (carpoolOfferForm) {
  carpoolOfferForm.addEventListener('submit', handleCarpoolOfferSubmit);
}

if (carpoolRequestForm) {
  carpoolRequestForm.addEventListener('submit', handleCarpoolRequestSubmit);
}

const weddingDate = new Date('2026-08-08T14:00:00+02:00');

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdownEl.textContent = currentLang === 'fr' ? 'C\'est le jour du mariage !' : 'It is the day of the marriage!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (currentLang === 'fr') {
    countdownEl.textContent = `${days} jours avant le mariage`;
    return;
  }

  countdownEl.textContent = `${days} days to go`;
}

applyTranslations(currentLang);
setInterval(updateCountdown, 60000);

fetchCarpoolData();
setInterval(fetchCarpoolData, 45000);
