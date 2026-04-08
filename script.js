const tabs = document.querySelectorAll('nav.tabs .tab');
const panels = document.querySelectorAll('.panel');
const langButtons = document.querySelectorAll('.lang-btn');
const i18nNodes = document.querySelectorAll('[data-i18n]');
const countdownEl = document.getElementById('countdown');
const homeWeekendRsvpLine = document.getElementById('home-weekend-rsvp');
const homeGalleryCaption = document.getElementById('home-gallery-caption');
const rsvpTabButton = document.getElementById('tab-rsvp');
const rsvpPanel = document.getElementById('rsvp');
const rsvpForm = document.getElementById('rsvp-form');
const rsvpStatus = document.getElementById('rsvp-status');
const rsvpQuickLinks = document.querySelectorAll('a[href="#rsvp"]');
const faqQuickLinks = document.querySelectorAll('a[href="#faq"]');
const scheduleEvent6 = document.getElementById('schedule-event-6');
let rsvpSubmitting = false;

let currentLang = 'en';
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw7JUFnr5pbad78peYSqojd5Fm0jHe730wEUpeIB78FHo11tJFhwjjWPv37ar3TMabzYQ/exec';

const translations = {
  en: {
    eyebrow: 'Wedding Celebration',
    date_line: 'Saturday, 8 August 2026 | Chateau de Nitray | Touraine, France',
    tab_home: 'Home',
    tab_travel: 'Travel & Accommodation',
    tab_venue: 'Chateau Nitray',
    tab_schedule: 'Schedule',
    tab_loire: 'What to Do in the Loire',
    tab_gifts: 'Gifts',
    tab_faq: 'FAQ',
    tab_rsvp: 'Friday RSVP',
    home_title: 'Welcome',
    home_intro: 'We are delighted to invite you to celebrate our marriage at Chateau de Nitray. Join us for a summer weekend of ceremony, food, dancing, and time together in the Loire Valley.',
    home_big_day: 'The Big Day',
    home_date: 'Date: Saturday, 8 August 2026, from 3 pm (tbc)',
    home_venue: 'Venue: Chateau de Nitray, Athee-sur-Cher',
    home_style: 'Dress code: Colorful, comfortable for the summer and flat shoes for walking on grass. Wear something that brings you joy: this is a wedding with no expectation of a suit.',
    home_weekend: 'Weekend Plan',
    home_weekend_1_intro: 'Friday: dinner for those travelling (',
    home_weekend_1_link: 'RSVP here',
    home_weekend_1_suffix: ').',
    home_weekend_2: 'Saturday: ceremony and reception.',
    home_weekend_3: 'Sunday: relaxed brunch and departures.',
    home_weekend_faq_link: 'Questions about the weekend? See FAQ.',
    rsvp_title: 'Friday Dinner RSVP',
    rsvp_intro: 'Please let us know how many guests are joining Friday dinner and any dietary requirements.',
    rsvp_name_label: 'Your name',
    rsvp_attendees_label: 'Number of attendees',
    rsvp_dietary_label: 'Dietary information',
    rsvp_submit: 'Send RSVP',
    rsvp_status_sending: 'Sending RSVP...',
    rsvp_status_sent: 'Thanks! Your RSVP has been sent.',
    rsvp_status_setup: 'RSVP endpoint not configured yet. Add your Google Apps Script URL in script.js.',
    rsvp_status_error: 'Sorry, there was a problem sending your RSVP. Please try again.',
    photo_nitray: 'Chateau de Nitray',
    photo_welcome: 'A welcome from our family to yours',
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
    travel_stay_title: 'Where to Stay',
    travel_stay_1: 'From the UK: Eurostar from London to Paris and then follow the Paris instructions above. Please do not take the plane.',
    travel_stay_2: 'Amboise and Loches are both great towns to visit, with beautiful historic buildings, and both are around a 30-minute drive from the venue.',
    travel_stay_3: 'We have a personal preference for Amboise, which sits directly on the Loire.',
    photo_amboise: 'Amboise',
    travel_tip: 'August is high season in the Loire, so book accommodation and trains early.',
    travel_sncf_link: 'Book trains on SNCF Connect',
    venue_title: 'Chateau de Nitray',
    venue_history_title: 'History',
    venue_history_1: 'Nitray castle was built in the 16th century, likely to replace an older castle dating from the 13th century. Nitray castle has produced wines since the 18th century. It follows traditional wine production methods, and only produces organic wines. These wines carry the label of the local region, AOC Touraine.',
    venue_website: 'Visit the official website',
    venue_notes_title: 'Venue Notes',
    venue_notes_1: 'Outdoor spaces for the wedding ceremony and cocktails',
    venue_notes_2: 'Indoor spaces for the dinner and dancing that follows',
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
    schedule_3: 'Dinner - indoors on the second floor, note there are 10-20 stairs',
    schedule_4: 'Dancing - in a room adjoining the dinner',
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
    loire_trip_title: 'Cycling itinerary 3 days (from Amboise)',
    loire_trip_1: 'Itinerary to be confirmed, we recommend booking an accommodation in Amboise for the duration of the wedding and until Wednesday morning.',
    loire_trip_2: '',
    loire_trip_3: '',
    photo_velo: 'La Loire a Velo',
    gifts_title: 'Gifts',
    gifts_intro: 'Your presence is the best gift. If you would like to give something, the following options would be lovely. Gifts need not be expensive! We would love something that reminds us of you. For example, we would love a second-hand book you have read, with a note explaining what it means to you.',
    gifts_intro_2: 'We will update this page with a link to select gift options and track what others have selected.',
    gifts_personal_title: 'Personal gifts',
    gifts_personal_1: 'A second-hand book you have read, with a short personal note',
    gifts_personal_2: 'Something artistic that you have liked (or made!) and a description of why',
    gifts_exp_title: 'Experiences & Memories',
    gifts_exp_1: 'Contribution to our honeymoon and family trip: we are planning two weeks in Japan and two weeks in Australia, including a celebration with John\'s family.',
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
    tab_venue: 'Château Nitray',
    tab_schedule: 'Programme',
    tab_loire: 'Que faire dans la Loire',
    tab_gifts: 'Cadeaux',
    tab_faq: 'FAQ',
    tab_rsvp: '',
    home_title: 'Bienvenue',
    home_intro: 'Nous sommes ravis de vous inviter à célébrer notre mariage au Château de Nitray. Rejoignez-nous pour un week-end d\'été en Val de Loire, avec cérémonie, repas, danse et moments partagés.',
    home_big_day: 'Le grand jour',
    home_date: 'Date : samedi 8 août 2026, à partir de 15 h (à confirmer)',
    home_venue: 'Lieu : Château de Nitray, Athée-sur-Cher',
    home_style: 'Code vestimentaire : coloré, confortable pour l\'été et des chaussures plates pour marcher sur l\'herbe. Portez quelque chose qui vous rend heureux·se, pas besoin d\'un costume.',
    home_weekend: 'Programme du week-end',
    home_weekend_1_intro: '',
    home_weekend_1_link: '',
    home_weekend_1_suffix: '',
    home_weekend_2: 'Samedi : cérémonie et réception.',
    home_weekend_3: 'Dimanche : brunch',
    home_weekend_faq_link: 'Des questions sur le week-end ? Voir la FAQ.',
    rsvp_title: 'RSVP dîner du vendredi',
    rsvp_intro: '',
    rsvp_name_label: '',
    rsvp_attendees_label: 'Nombre de participant·es',
    rsvp_dietary_label: 'Informations alimentaires',
    rsvp_submit: '',
    rsvp_status_sending: '',
    rsvp_status_sent: '',
    rsvp_status_setup: '',
    rsvp_status_error: '',
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
    travel_stay_title: 'Où loger',
    travel_stay_1: 'Depuis le Royaume-Uni : Eurostar de Londres à Paris puis suivez les indications depuis Paris. Merci de ne pas prendre l\'avion.',
    travel_stay_2: 'Amboise et Loches sont deux villes très jolies à visiter, avec de beaux bâtiments historiques, et toutes les deux à environ trente minutes en voiture du Château de Nitray.',
    travel_stay_3: 'Nous avons une préférence personnelle pour Amboise, qui se trouve directement sur la Loire.',
    photo_amboise: 'Amboise',
    travel_tip: 'Août est la haute saison en Loire : réservez hébergement et trains le plus tôt possible.',
    travel_sncf_link: 'Réserver des trains sur SNCF Connect',
    venue_title: 'Château de Nitray',
    venue_history_title: 'Histoire',
    venue_history_1: 'Le château de Nitray a été construit au XVIe siècle, probablement pour remplacer un ancien château datant du XIIIe siècle. Le château de Nitray produit du vin depuis le XVIIIe siècle. Il suit des méthodes de production traditionnelles et ne produit que des vins biologiques. Ces vins portent l\'appellation de la région locale, AOC Touraine.',
    venue_website: 'Consulter le site officiel',
    venue_notes_title: 'Infos sur le lieu',
    venue_notes_1: 'Espaces extérieurs pour la cérémonie de mariage et les cocktails',
    venue_notes_2: 'Espaces intérieurs pour le dîner et la danse (accessibles par des escaliers uniquement)',
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
    schedule_3: 'Dîner - à l\'intérieur au deuxième étage, notez qu\'il y a 10 à 20 marches',
    schedule_4: 'Danse - dans une salle attenante au dîner',
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
    loire_trip_title: 'Itinéraire vélo 3 jours (depuis Amboise)',
    loire_trip_1: 'Itinéraire à confirmer, on vous conseille de prendre un logement sur Amboise pour la durée du mariage et jusqu\'au mercredi matin car ce sera notre point de départ.',
    loire_trip_2: '',
    loire_trip_3: '',
    photo_velo: 'La Loire à Vélo',
    photo_welcome: '',
    gifts_title: 'Cadeaux',
    gifts_intro: 'Votre présence est déjà le plus beau cadeau. Si vous souhaitez offrir quelque chose, les options suivantes nous feraient très plaisir. Les cadeaux n\'ont pas besoin d\'être chers. Nous aimerions surtout quelque chose qui nous fasse penser à vous. Par exemple, nous serions ravis de recevoir un livre d\'occasion que vous avez lu, avec un mot expliquant ce qu\'il représente pour vous.',
    gifts_intro_2: 'Nous mettrons cette page à jour avec un lien pour choisir des options de cadeaux et suivre ce que les autres ont déjà sélectionné.',
    gifts_personal_title: 'Cadeaux personnels',
    gifts_personal_1: 'Un livre d\'occasion que vous avez lu, avec un petit mot personnel.',
    gifts_personal_2: 'Quelque chose d\'artistique que vous avez aimé (ou créé), avec un mot expliquant pourquoi.',
    gifts_exp_title: 'Expériences et souvenirs',
    gifts_exp_1: 'Contribution à notre voyage de noces et familial : nous prévoyons deux semaines au Japon et deux semaines en Australie, avec une célébration avec la famille de John.',
    gifts_exp_2: 'Expérience de cuisine ou de dégustation de vin à vivre ensemble.',
    gifts_exp_3: 'Billets de théâtre, concert ou musée.',
    gifts_exp_4: 'Contribution à de futurs voyages.',
    gifts_home_title: 'Maison et vie quotidienne',
    gifts_home_1: 'Linge de lit ou serviettes de haute qualité.',
    gifts_home_2: 'Vaisselle ou verrerie pour recevoir.',
    gifts_home_3: 'Ustensiles de cuisine durables pour les années à venir.',
    gifts_home_4: 'Oeuvres d\'art ou livres pour notre maison.',
    gifts_home_5: 'Machine à café.',
    gifts_home_6: 'Sac à dos pour chien.',
    gifts_charity_title: 'Associations',
    gifts_charity_1: 'GiveWell',
    gifts_charity_2: 'CoefficientGiving',
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

  const isEnglish = lang === 'en';
  if (homeWeekendRsvpLine) {
    homeWeekendRsvpLine.hidden = !isEnglish;
  }
  if (homeGalleryCaption) {
    homeGalleryCaption.hidden = !translations[lang].photo_welcome;
  }
  if (rsvpTabButton) {
    rsvpTabButton.hidden = !isEnglish;
  }
  if (rsvpPanel) {
    rsvpPanel.hidden = !isEnglish;
  }
  if (scheduleEvent6) {
    scheduleEvent6.hidden = !translations[lang].schedule_6;
  }
  if (!isEnglish) {
    const activeTab = document.querySelector('.tab.is-active');
    if (activeTab && activeTab.dataset.tab === 'rsvp') {
      activateTab('home');
    }
  }

  document.documentElement.lang = lang;
  document.body.dataset.lang = lang;
  updateCountdown();
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

rsvpQuickLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    activateTab('rsvp');
    const target = document.getElementById('rsvp-form-en');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!rsvpStatus) return;
    if (rsvpSubmitting) return;
    rsvpSubmitting = true;

    const formData = new FormData(rsvpForm);
    const payload = {
      timestamp: new Date().toISOString(),
      name: String(formData.get('name') || '').trim(),
      attendees: String(formData.get('attendees') || '').trim(),
      dietary: String(formData.get('dietary') || '').trim(),
      lang: currentLang
    };

    const fields = rsvpForm.querySelectorAll('input, textarea, button');
    fields.forEach((field) => {
      field.disabled = true;
    });
    rsvpStatus.textContent = translations[currentLang].rsvp_status_sending || '';

    if (!GOOGLE_SHEETS_WEB_APP_URL) {
      rsvpForm.classList.remove('is-complete');
      rsvpStatus.textContent = translations[currentLang].rsvp_status_setup || '';
      fields.forEach((field) => {
        field.disabled = false;
      });
      rsvpSubmitting = false;
      return;
    }

    try {
      const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('RSVP request failed');
      }

      rsvpForm.classList.add('is-complete');
      rsvpStatus.textContent = translations[currentLang].rsvp_status_sent || '';
      rsvpForm.reset();
    } catch (error) {
      rsvpForm.classList.remove('is-complete');
      rsvpStatus.textContent = translations[currentLang].rsvp_status_error || '';
      fields.forEach((field) => {
        field.disabled = false;
      });
    } finally {
      rsvpSubmitting = false;
    }
  });
}
