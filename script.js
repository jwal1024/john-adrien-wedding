const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
const langButtons = document.querySelectorAll('.lang-btn');
const i18nNodes = document.querySelectorAll('[data-i18n]');
const countdownEl = document.getElementById('countdown');

let currentLang = 'en';

const translations = {
  en: {
    eyebrow: 'Wedding Celebration',
    date_line: 'Saturday, 8 August 2026 | Chateau de Nitray | Touraine, France',
    tab_home: 'Home',
    tab_travel: 'Travel & Accommodation',
    tab_venue: 'Chateau Nitray',
    tab_loire: 'What to Do in the Loire',
    tab_gifts: 'Gifts',
    home_title: 'Welcome',
    home_intro: 'We are delighted to invite you to celebrate our marriage at Chateau de Nitray. Join us for a summer weekend of ceremony, food, dancing, and time together in the Loire Valley.',
    home_big_day: 'The Big Day',
    home_date: 'Date: Saturday, 8 August 2026',
    home_venue: 'Venue: Chateau de Nitray, Athee-sur-Cher',
    home_style: 'Dress style: Wear what you enjoy and feel great in.',
    home_weekend: 'Weekend Plan',
    home_weekend_1: 'Friday: dinner for those arriving early (please let us know).',
    home_weekend_2: 'Saturday: ceremony and reception.',
    home_weekend_3: 'Sunday: relaxed brunch and departures.',
    photo_nitray: 'Chateau de Nitray',
    travel_title: 'Travel & Accommodation',
    travel_intro: 'Chateau de Nitray is in the Loire Valley between Tours and Amboise. The closest rail stop is Saint-Martin-le-Beau, while Amboise and Saint-Pierre-des-Corps are the easiest larger stations for onward transfers and car hire.',
    travel_paris_title: 'From Paris',
    travel_paris_1: 'Train: Paris to Saint-Pierre-des-Corps by TGV in about 55 to 75 minutes.',
    travel_paris_2: 'Road: approximately 2h30 to 3h00 depending on traffic.',
    travel_paris_3: 'Local transfer to Chateau de Nitray is usually around 20 to 25 minutes from Tours/Amboise area.',
    travel_lille_title: 'From Lille',
    travel_lille_1: 'Train: usually via Paris, then TGV to Tours area (around 3h00 to 4h00 total).',
    travel_lille_2: 'Road: approximately 4h30 to 5h30 depending on traffic.',
    travel_lille_3: 'Saint-Martin-le-Beau remains the closest local stop near the venue.',
    travel_stay_title: 'Where to Stay',
    travel_stay_1: 'Amboise: walkable center and a wide choice of hotels and guesthouses.',
    travel_stay_2: 'Loches: charming medieval town with quieter, boutique options.',
    photo_amboise: 'Amboise',
    travel_tip: 'August is high season in the Loire, so book accommodation and trains early.',
    venue_title: 'Chateau de Nitray',
    venue_intro: 'Our celebration takes place at Chateau de Nitray, a historic estate in Touraine known for elegant architecture, vineyards, and beautiful grounds.',
    venue_notes_title: 'Venue Notes',
    venue_notes_1: 'Outdoor spaces for aperitif and photos (weather permitting).',
    venue_notes_2: 'Indoor spaces for dinner and dancing.',
    venue_notes_3: 'Grounds suitable for a relaxed summer evening.',
    venue_address_title: 'Address',
    venue_address_line: 'Chateau de Nitray, 31 Nitray, 37270 Athee-sur-Cher, France',
    venue_map: 'Open in Google Maps',
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
    loire_trip_title: '3-Day Cycle Trip (From Amboise)',
    loire_trip_1: 'Day 1: Amboise to Chenonceaux loop (vineyards and villages).',
    loire_trip_2: 'Day 2: Amboise to Tours on La Loire a Velo.',
    loire_trip_3: 'Day 3: Tours to Vouvray and back toward Amboise.',
    photo_velo: 'La Loire a Velo',
    gifts_title: 'Gifts',
    gifts_intro: 'Your presence is the best gift. If you would like to give something, the following options would be lovely. Gifts need not be expensive! We would love something that reminds us of you. For example, we would love a second-hand book you have read, with a note explaining what it means to you.',
    gifts_personal_title: 'Personal gifts',
    gifts_personal_1: 'A second-hand book you have read, with a short personal note',
    gifts_personal_2: 'Something artistic that you have liked (or made!) and a description of why',
    gifts_exp_title: 'Experiences & Memories',
    gifts_exp_1: 'Contribution to a honeymoon experience (special dinners, local excursions, or cultural visits)',
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
    footer_line: 'With love, John & Adrien'
  },
  fr: {
    eyebrow: 'Celebration de mariage',
    date_line: 'Samedi 8 aout 2026 | Chateau de Nitray | Touraine, France',
    tab_home: 'Accueil',
    tab_travel: 'Voyage et hebergement',
    tab_venue: 'Chateau Nitray',
    tab_loire: 'Que faire en Loire',
    tab_gifts: 'Cadeaux',
    home_title: 'Bienvenue',
    home_intro: 'Nous sommes ravis de vous inviter a celebrer notre mariage au Chateau de Nitray. Rejoignez-nous pour un week-end d ete en Val de Loire, avec ceremonie, repas, danse et moments partages.',
    home_big_day: 'Le grand jour',
    home_date: 'Date : samedi 8 aout 2026',
    home_venue: 'Lieu : Chateau de Nitray, Athee-sur-Cher',
    home_style: 'Tenue : portez ce que vous aimez et dans lequel vous vous sentez bien.',
    home_weekend: 'Programme du week-end',
    home_weekend_1: 'Vendredi : diner pour celles et ceux qui arrivent tot (merci de nous prevenir).',
    home_weekend_2: 'Samedi : ceremonie et reception.',
    home_weekend_3: 'Dimanche : brunch detendu puis departs.',
    photo_nitray: 'Chateau de Nitray',
    travel_title: 'Voyage et hebergement',
    travel_intro: 'Le Chateau de Nitray se situe entre Tours et Amboise. La gare la plus proche est Saint-Martin-le-Beau, tandis qu Amboise et Saint-Pierre-des-Corps sont les grandes gares les plus pratiques pour les transferts et la location de voiture.',
    travel_paris_title: 'Depuis Paris',
    travel_paris_1: 'Train : Paris vers Saint-Pierre-des-Corps en TGV en environ 55 a 75 minutes.',
    travel_paris_2: 'Route : environ 2 h 30 a 3 h 00 selon le trafic.',
    travel_paris_3: 'Le transfert local vers le Chateau de Nitray est en general de 20 a 25 minutes depuis Tours/Amboise.',
    travel_lille_title: 'Depuis Lille',
    travel_lille_1: 'Train : souvent via Paris puis TGV vers Tours (environ 3 h 00 a 4 h 00 au total).',
    travel_lille_2: 'Route : environ 4 h 30 a 5 h 30 selon le trafic.',
    travel_lille_3: 'Saint-Martin-le-Beau reste la gare la plus proche du lieu.',
    travel_stay_title: 'Ou loger',
    travel_stay_1: 'Amboise : centre accessible a pied et large choix d hotels et de maisons d hotes.',
    travel_stay_2: 'Loches : charmante ville medievale avec des options plus calmes et de caractere.',
    photo_amboise: 'Amboise',
    travel_tip: 'Aout est la haute saison en Loire : reservez hebergement et trains le plus tot possible.',
    venue_title: 'Chateau de Nitray',
    venue_intro: 'Notre celebration a lieu au Chateau de Nitray, domaine historique de Touraine connu pour son architecture elegante, son vignoble et ses magnifiques jardins.',
    venue_notes_title: 'Infos sur le lieu',
    venue_notes_1: 'Espaces exterieurs pour l aperitif et les photos (selon la meteo).',
    venue_notes_2: 'Espaces interieurs pour le diner et la danse.',
    venue_notes_3: 'Un cadre ideal pour une soiree d ete detendue.',
    venue_address_title: 'Adresse',
    venue_address_line: 'Chateau de Nitray, 31 Nitray, 37270 Athee-sur-Cher, France',
    venue_map: 'Voir sur Google Maps',
    loire_title: 'Que faire en Loire',
    loire_intro: 'Transformez ce voyage de mariage en sejour en Loire : vins, velo, chateaux et villages historiques.',
    loire_wine_title: 'Degustations de vin',
    loire_wine_1: 'La Touraine et Vouvray sont proches, avec visites de caves et degustations guidees.',
    loire_wine_2: 'De nombreux domaines proposent des seances en francais et en anglais.',
    loire_wine_3: 'Des circuits de degustation d une demi-journee ou d une journee sont possibles depuis Amboise et Tours.',
    loire_velo_title: 'La Loire a Velo',
    loire_velo_1: 'Un itineraire cyclable tres connu avec des sections majoritairement plates en bord de Loire.',
    loire_velo_2: 'Ideal pour des groupes mixtes ; les velos electriques sont faciles a trouver.',
    loire_velo_3: 'Parfait pour une sortie d une journee ou un itineraire sur plusieurs jours.',
    loire_trip_title: 'Itineraire velo 3 jours (depuis Amboise)',
    loire_trip_1: 'Jour 1 : boucle Amboise - Chenonceaux (vignes et villages).',
    loire_trip_2: 'Jour 2 : Amboise - Tours par La Loire a Velo.',
    loire_trip_3: 'Jour 3 : Tours - Vouvray puis retour vers Amboise.',
    photo_velo: 'La Loire a Velo',
    gifts_title: 'Cadeaux',
    gifts_intro: 'Votre presence est deja le plus beau cadeau. Si vous souhaitez offrir quelque chose, les options suivantes nous feraient tres plaisir. Les cadeaux n ont pas besoin d etre chers. Nous aimerions surtout quelque chose qui nous fasse penser a vous. Par exemple, nous serions ravis de recevoir un livre d occasion que vous avez lu, avec un mot expliquant ce qu il represente pour vous.',
    gifts_personal_title: 'Cadeaux personnels',
    gifts_personal_1: 'Un livre d occasion que vous avez lu, avec un petit mot personnel.',
    gifts_personal_2: 'Quelque chose d artistique que vous avez aime (ou cree), avec un mot expliquant pourquoi.',
    gifts_exp_title: 'Experiences et souvenirs',
    gifts_exp_1: 'Contribution a une experience de voyage de noces (diner special, excursion locale ou visite culturelle).',
    gifts_exp_2: 'Experience de cuisine ou de degustation de vin a vivre ensemble.',
    gifts_exp_3: 'Billets de theatre, concert ou musee.',
    gifts_exp_4: 'Contribution a de futurs voyages.',
    gifts_home_title: 'Maison et vie quotidienne',
    gifts_home_1: 'Linge de lit ou serviettes de haute qualite.',
    gifts_home_2: 'Vaisselle ou verrerie pour recevoir.',
    gifts_home_3: 'Ustensiles de cuisine durables pour les annees a venir.',
    gifts_home_4: 'Oeuvres d art ou livres pour notre maison.',
    gifts_home_5: 'Machine a cafe.',
    gifts_home_6: 'Sac a dos pour chien.',
    gifts_charity_title: 'Associations',
    gifts_charity_1: 'GiveWell',
    gifts_charity_2: 'CoefficientGiving',
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
    if (text) {
      node.textContent = text;
    }
  });

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

const weddingDate = new Date('2026-08-08T14:00:00+02:00');

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdownEl.textContent = currentLang === 'fr' ? 'C est le jour du mariage !' : 'It is wedding time.';
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
