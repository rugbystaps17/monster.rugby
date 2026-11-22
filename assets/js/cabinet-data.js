/* =========================================================
   CABINET — données de la visite (textes, matériel, salles).
   Les dessins sont des illustrations provisoires : pour passer
   aux vraies photos, voir README.md (« photo » de chaque salle).
   ========================================================= */
(function () {
  var N = "#0d2433", F = "#2a3d4a", M = "#9aa8b2", A = "#15b58a", W = "#c58b4b", L = "#f5f4ef";

  /* ---------- Dessins du matériel (repère 200 × 150) ---------- */
  var DRAW = {
    rower:
      '<rect x="18" y="100" width="174" height="9" rx="4" fill="' + F + '"/>' +
      '<path d="M26 108v32M184 108v32" stroke="' + F + '" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="40" cy="78" r="28" fill="' + M + '" stroke="' + F + '" stroke-width="6"/><circle cx="40" cy="78" r="9" fill="' + A + '"/>' +
      '<path d="M64 70 L102 64" stroke="' + F + '" stroke-width="3"/><rect x="98" y="54" width="7" height="20" rx="3" fill="' + A + '"/>' +
      '<rect x="72" y="88" width="20" height="10" rx="2" fill="' + A + '"/>' +
      '<rect x="120" y="86" width="40" height="13" rx="6" fill="' + N + '"/>' +
      '<rect x="40" y="38" width="22" height="14" rx="2" fill="' + N + '"/><path d="M51 52v4" stroke="' + N + '" stroke-width="3"/>',
    skierg:
      '<rect x="52" y="134" width="96" height="10" rx="5" fill="' + F + '"/>' +
      '<rect x="92" y="38" width="16" height="98" rx="3" fill="' + F + '"/>' +
      '<rect x="74" y="4" width="52" height="40" rx="8" fill="' + N + '"/><circle cx="100" cy="24" r="12" fill="' + M + '"/><circle cx="100" cy="24" r="4" fill="' + A + '"/>' +
      '<path d="M84 40 L74 80 M116 40 L126 80" stroke="' + M + '" stroke-width="2"/>' +
      '<rect x="68" y="78" width="12" height="24" rx="5" fill="' + A + '"/><rect x="120" y="78" width="12" height="24" rx="5" fill="' + A + '"/>',
    bike:
      '<circle cx="52" cy="92" r="40" fill="' + M + '" stroke="' + F + '" stroke-width="6"/>' +
      '<g stroke="' + F + '" stroke-width="3"><path d="M52 52v80M12 92h80M24 64l56 56M80 64l-56 56"/></g><circle cx="52" cy="92" r="8" fill="' + A + '"/>' +
      '<path d="M52 92 L128 100 L150 136 M128 100 L140 56 M52 92 L74 36" stroke="' + F + '" stroke-width="8" stroke-linecap="round" fill="none"/>' +
      '<rect x="126" y="48" width="36" height="10" rx="5" fill="' + N + '"/>' +
      '<path d="M74 36 L60 24 M74 36 L92 26" stroke="' + A + '" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="110" y="134" width="60" height="8" rx="4" fill="' + F + '"/><rect x="20" y="134" width="60" height="8" rx="4" fill="' + F + '"/>',
    reverse:
      '<path d="M40 70 L30 144 M140 70 L150 144 M30 144 H150" stroke="' + F + '" stroke-width="8" stroke-linecap="round" fill="none"/>' +
      '<rect x="26" y="52" width="130" height="20" rx="8" fill="' + N + '"/>' +
      '<rect x="18" y="74" width="24" height="8" rx="4" fill="' + A + '"/>' +
      '<path d="M156 66 L176 128" stroke="' + M + '" stroke-width="7" stroke-linecap="round"/><circle cx="156" cy="64" r="7" fill="' + F + '"/>' +
      '<rect x="164" y="122" width="30" height="12" rx="6" fill="' + N + '"/>' +
      '<rect x="168" y="96" width="16" height="22" rx="3" fill="' + F + '"/><rect x="164" y="100" width="24" height="4" fill="' + M + '"/>',
    rack:
      '<rect x="34" y="6" width="12" height="138" fill="' + F + '"/><rect x="154" y="6" width="12" height="138" fill="' + F + '"/>' +
      '<rect x="34" y="6" width="132" height="10" fill="' + F + '"/><rect x="26" y="138" width="148" height="8" rx="3" fill="' + F + '"/>' +
      '<g fill="' + M + '"><circle cx="40" cy="30" r="2"/><circle cx="40" cy="44" r="2"/><circle cx="40" cy="72" r="2"/><circle cx="40" cy="86" r="2"/><circle cx="160" cy="30" r="2"/><circle cx="160" cy="44" r="2"/><circle cx="160" cy="72" r="2"/><circle cx="160" cy="86" r="2"/></g>' +
      '<rect x="4" y="56" width="192" height="5" rx="2" fill="' + M + '"/>' +
      '<rect x="12" y="38" width="10" height="42" rx="3" fill="' + N + '"/><rect x="22" y="44" width="7" height="30" rx="2" fill="' + A + '"/>' +
      '<rect x="178" y="38" width="10" height="42" rx="3" fill="' + N + '"/><rect x="171" y="44" width="7" height="30" rx="2" fill="' + A + '"/>' +
      '<rect x="64" y="112" width="72" height="12" rx="5" fill="' + N + '"/><path d="M76 124v16M124 124v16" stroke="' + F + '" stroke-width="5"/>',
    legext:
      '<rect x="146" y="22" width="36" height="116" rx="4" fill="' + F + '"/>' +
      '<g fill="' + M + '"><rect x="152" y="70" width="24" height="7"/><rect x="152" y="80" width="24" height="7"/><rect x="152" y="90" width="24" height="7"/><rect x="152" y="100" width="24" height="7"/><rect x="152" y="110" width="24" height="7"/><rect x="152" y="120" width="24" height="7"/></g>' +
      '<rect x="60" y="84" width="72" height="16" rx="7" fill="' + N + '"/>' +
      '<rect x="118" y="34" width="16" height="56" rx="7" fill="' + N + '" transform="rotate(12 126 62)"/>' +
      '<path d="M90 100 V140 M70 140 H140" stroke="' + F + '" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M64 96 L38 126" stroke="' + M + '" stroke-width="7" stroke-linecap="round"/><circle cx="64" cy="96" r="7" fill="' + F + '"/>' +
      '<rect x="20" y="118" width="34" height="14" rx="7" fill="' + A + '"/>',
    legcurl:
      '<rect x="150" y="22" width="36" height="116" rx="4" fill="' + F + '"/>' +
      '<g fill="' + M + '"><rect x="156" y="80" width="24" height="7"/><rect x="156" y="90" width="24" height="7"/><rect x="156" y="100" width="24" height="7"/><rect x="156" y="110" width="24" height="7"/><rect x="156" y="120" width="24" height="7"/></g>' +
      '<rect x="40" y="70" width="104" height="16" rx="7" fill="' + N + '" transform="rotate(-6 92 78)"/>' +
      '<path d="M60 86 V140 M126 82 V140 M48 140 H140" stroke="' + F + '" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M40 82 L24 50" stroke="' + M + '" stroke-width="7" stroke-linecap="round"/><circle cx="40" cy="82" r="7" fill="' + F + '"/>' +
      '<rect x="8" y="40" width="34" height="14" rx="7" fill="' + A + '"/><rect x="28" y="54" width="22" height="12" rx="6" fill="' + N + '"/>',
    boxes:
      '<rect x="8" y="92" width="56" height="52" rx="4" fill="' + W + '"/><rect x="72" y="64" width="58" height="80" rx="4" fill="#b37a3c"/><rect x="138" y="34" width="56" height="110" rx="4" fill="' + W + '"/>' +
      '<g fill="' + N + '" font-family="Barlow Condensed,sans-serif" font-weight="800" font-size="18" text-anchor="middle"><text x="36" y="124">30</text><text x="101" y="108">45</text><text x="166" y="94">60</text></g>' +
      '<g fill="none" stroke="#8e5d2a" stroke-width="2"><rect x="22" y="100" width="28" height="8" rx="4"/><rect x="87" y="72" width="28" height="8" rx="4"/><rect x="152" y="42" width="28" height="8" rx="4"/></g>',
    voltra:
      '<rect x="92" y="4" width="16" height="140" rx="3" fill="' + F + '"/><rect x="70" y="138" width="60" height="8" rx="4" fill="' + F + '"/>' +
      '<rect x="64" y="34" width="72" height="56" rx="12" fill="' + N + '"/><rect x="76" y="44" width="48" height="22" rx="4" fill="' + A + '"/>' +
      '<path d="M82 55h8l4-6 5 12 4-6h15" stroke="' + N + '" stroke-width="2.5" fill="none" stroke-linejoin="round"/>' +
      '<circle cx="100" cy="78" r="5" fill="' + M + '"/><path d="M100 82 C 120 110, 150 110, 164 118" stroke="' + M + '" stroke-width="2.5" fill="none"/>' +
      '<rect x="158" y="112" width="28" height="10" rx="5" fill="' + A + '"/>',
    madup:
      '<path d="M50 10 C 40 60, 46 100, 62 146 L104 146 C 112 100, 114 60, 112 10 Z" fill="#e7c9b0" stroke="#c9a588" stroke-width="2"/>' +
      '<rect x="40" y="40" width="80" height="28" rx="8" fill="' + N + '"/><rect x="44" y="49" width="72" height="10" rx="3" fill="' + A + '"/>' +
      '<path d="M120 54 C 140 54, 140 90, 152 92" stroke="' + M + '" stroke-width="3" fill="none"/>' +
      '<rect x="146" y="78" width="46" height="58" rx="10" fill="' + F + '"/><rect x="154" y="88" width="30" height="18" rx="3" fill="' + A + '"/>' +
      '<text x="169" y="101" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" font-weight="700" fill="' + N + '">80%</text><circle cx="169" cy="122" r="6" fill="' + M + '"/>',
    emg:
      '<path d="M30 6 C 22 60, 26 100, 40 146 L80 146 C 88 100, 92 60, 92 6 Z" fill="#e7c9b0" stroke="#c9a588" stroke-width="2"/>' +
      '<rect x="44" y="40" width="20" height="14" rx="3" fill="' + N + '"/><rect x="52" y="74" width="20" height="14" rx="3" fill="' + N + '"/>' +
      '<circle cx="54" cy="47" r="3" fill="' + A + '"/><circle cx="62" cy="81" r="3" fill="' + A + '"/>' +
      '<path d="M76 46 q8 -6 16 0 M80 40 q12 -10 24 0" stroke="' + A + '" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<rect x="110" y="36" width="84" height="64" rx="8" fill="' + N + '"/><rect x="116" y="42" width="72" height="52" rx="4" fill="#102d40"/>' +
      '<path d="M118 70 h10 l3 -14 4 26 4 -32 4 30 3 -10 h8 l3 -6 3 10 3 -4 h10" stroke="' + A + '" stroke-width="2" fill="none" stroke-linejoin="round"/>' +
      '<rect x="140" y="100" width="24" height="6" fill="' + F + '"/><rect x="128" y="104" width="48" height="6" rx="3" fill="' + F + '"/>',
    gameready:
      '<rect x="12" y="52" width="74" height="88" rx="10" fill="' + N + '"/><path d="M28 52 V38 H70 V52" stroke="' + F + '" stroke-width="6" fill="none"/>' +
      '<rect x="22" y="64" width="54" height="22" rx="4" fill="' + A + '"/><text x="49" y="80" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="700" fill="' + N + '">4°C</text>' +
      '<circle cx="34" cy="104" r="6" fill="' + M + '"/><circle cx="64" cy="104" r="6" fill="' + M + '"/>' +
      '<path d="M86 100 C 110 100, 112 70, 130 70" stroke="' + M + '" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M138 10 C 132 60, 134 100, 144 146 L180 146 C 188 100, 190 60, 186 10 Z" fill="#e7c9b0" stroke="#c9a588" stroke-width="2"/>' +
      '<rect x="128" y="50" width="66" height="54" rx="14" fill="#1d6fa3"/><path d="M134 66h54M134 78h54M134 90h54" stroke="#7fc3ea" stroke-width="2.5"/>',
    normatec:
      '<rect x="6" y="82" width="54" height="58" rx="10" fill="' + N + '"/><rect x="14" y="92" width="38" height="16" rx="3" fill="' + A + '"/><circle cx="33" cy="124" r="7" fill="' + M + '"/>' +
      '<path d="M60 112 C 80 112, 82 60, 96 50 M60 120 C 90 120, 120 70, 140 52" stroke="' + M + '" stroke-width="3" fill="none"/>' +
      '<g fill="#22313d" stroke="' + N + '" stroke-width="2"><path d="M86 20 h34 v104 q0 18 -18 18 h-20 q-12 0 -12 -10 l0 -4 q0 -8 10 -10 z"/><path d="M134 20 h34 v104 q0 18 -18 18 h-20 q-12 0 -12 -10 l0 -4 q0 -8 10 -10 z"/></g>' +
      '<g stroke="' + A + '" stroke-width="2.5"><path d="M88 42h30M88 62h30M88 82h30M88 102h30M136 42h30M136 62h30M136 82h30M136 102h30"/></g>',
    table:
      '<rect x="10" y="62" width="180" height="20" rx="8" fill="' + N + '"/><rect x="10" y="60" width="38" height="20" rx="8" fill="' + F + '"/>' +
      '<path d="M40 82 L60 140 M160 82 L140 140 M60 140 H140 M100 82 V140" stroke="' + M + '" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="22" y="76" width="10" height="4" rx="2" fill="' + A + '"/>'
  };

  /* ---------- Fiches matériel ---------- */
  var EQUIP = {
    rower: {
      name: "Rameur", sub: "Équipement cardio", room: "plateau",
      text: "Échauffement global, rodage articulaire et travail cardio ou de pré-fatigue, sans impact.",
      bullets: ["Mobilise jambes, tronc et bras dans un même geste", "Idéal en début de séance pour préparer les articulations", "Travail par intervalles pour le reconditionnement"],
      spots: [[20, 52, "Volant d'inertie", "La résistance augmente avec l'intensité de la tirée."], [70, 62, "Siège coulissant", "Mouvement fluide, sans choc pour les articulations."]]
    },
    skierg: {
      name: "SkiErg", sub: "Équipement cardio", room: "plateau",
      text: "Cardio intense du haut du corps et gainage, possible même quand une jambe est blessée.",
      bullets: ["Entretien cardio pendant une blessure du membre inférieur", "Renforcement des dorsaux, épaules et sangle abdominale", "Pré-fatigue avant un travail technique"],
      spots: [[50, 16, "Volant à air", "Résistance naturelle : plus vous tirez fort, plus c'est dur."], [37, 60, "Poignées", "Mouvement de poussée alternée ou simultanée."]]
    },
    bike: {
      name: "Bike", sub: "Équipement cardio", room: "plateau",
      text: "Vélo à air pour l'échauffement, le rodage du genou après une opération et le travail cardio fractionné.",
      bullets: ["Rodage articulaire en douceur (post-op genou/hanche)", "Séances de fractionné pour retrouver le souffle", "Travail bras + jambes combiné"],
      spots: [[26, 61, "Ventilateur", "Résistance progressive et illimitée."], [72, 35, "Selle réglable", "Réglée selon l'amplitude autorisée de votre genou."]]
    },
    reverse: {
      name: "Reverse hyper extension", sub: "Chaîne postérieure", room: "plateau",
      text: "Renforce fessiers, ischio-jambiers et muscles lombaires tout en décomprimant la colonne.",
      bullets: ["Rééducation et prévention des lombalgies", "Prévention des lésions des ischio-jambiers", "Renforcement de la chaîne postérieure du sportif"],
      spots: [[45, 40, "Plateau d'appui", "Le buste reste immobile, le bas du corps travaille."], [88, 85, "Balancier", "Le mouvement de pendule décomprime le rachis lombaire."]]
    },
    rack: {
      name: "Rack complet", sub: "Force & réathlétisation", room: "plateau",
      text: "Rack entièrement équipé avec barre olympique et poids, pour le travail de force en toute sécurité.",
      bullets: ["Squat, soulevé de terre, développé, fentes…", "Développement de la force maximale et de la puissance", "Dernière étape de la réathlétisation avant le retour au jeu"],
      spots: [[50, 39, "Barre olympique", "Barre de 20 kg et disques pour une progression fine."], [80, 20, "Sécurités", "Crochets et barres de sécurité réglables."], [50, 79, "Banc", "Pour le développé et les exercices assis."]]
    },
    legext: {
      name: "Leg extension", sub: "Quadriceps", room: "plateau",
      text: "Travail isolé des quadriceps, avec un contrôle précis de l'amplitude et de la charge.",
      bullets: ["Renforcement ciblé après ligamentoplastie (LCA)", "Lutte contre la fonte musculaire du quadriceps", "Amplitude limitée selon le protocole chirurgical"],
      spots: [[18, 83, "Boudin", "Placé sur le bas de la jambe, il guide l'extension du genou."], [82, 55, "Pile de poids", "Charge ajustable de façon progressive."]]
    },
    legcurl: {
      name: "Leg curl", sub: "Ischio-jambiers", room: "plateau",
      text: "Travail des ischio-jambiers, essentiel pour la prévention et la rééducation des lésions musculaires.",
      bullets: ["Rééducation après déchirure des ischio-jambiers", "Équilibre quadriceps / ischios après chirurgie du genou", "Travail excentrique de prévention"],
      spots: [[12, 31, "Boudin", "Placé derrière la cheville pour fléchir le genou."], [46, 50, "Banc incliné", "Position allongée pour isoler les ischio-jambiers."]]
    },
    boxes: {
      name: "Box jump & plyo box", sub: "Pliométrie", room: "plateau",
      text: "Travail de pliométrie et de renforcement : sauts, réceptions, explosivité.",
      bullets: ["Apprendre à bien réceptionner (genou, cheville)", "Développer l'explosivité et la réactivité", "Valider les critères de retour au sport"],
      spots: [[18, 75, "30 cm", "Premières réceptions contrôlées."], [83, 50, "60 cm", "Sauts explosifs en fin de rééducation."]]
    },
    voltra: {
      name: "Voltra", sub: "Poulie à résistance électromagnétique", room: "plateau",
      text: "Poulie à résistance électromagnétique pour un contrôle optimal de la charge, réglable très finement.",
      bullets: ["Charge ajustée au plus près de vos capacités du jour", "Modes de résistance variés (excentrique, isométrique, élastique…)", "Suivi chiffré de la force et de la vitesse de chaque répétition"],
      spots: [[38, 52, "Moteur électromagnétique", "Remplace les poids : la résistance est générée électroniquement."], [50, 36, "Écran", "Affiche la charge, la vitesse et la puissance."], [86, 78, "Câble & poignée", "Accessoires interchangeables pour tous les mouvements."]]
    },
    madup: {
      name: "Mad-Up BFR", sub: "Blood Flow Restriction", room: "plateau",
      text: "Restriction partielle du flux sanguin pour gagner en force et en masse musculaire avec des charges très légères.",
      bullets: ["Limite la fonte musculaire en post-opératoire", "Renforcement quand les charges lourdes sont contre-indiquées", "Pression personnalisée et contrôlée automatiquement"],
      note: "L'utilisation du BFR est validée lors du bilan : certaines contre-indications existent.",
      spots: [[40, 36, "Brassard", "Gonflé à une pression calculée pour chaque patient."], [84, 70, "Boîtier", "Régule et contrôle la pression en continu."]]
    },
    emg: {
      name: "EMG", sub: "Électromyographie de surface", room: "plateau",
      text: "Capteurs qui mesurent l'activité électrique des muscles et permettent de déceler une inhibition musculaire arthrogénique (AMI).",
      bullets: ["Visualiser en direct la contraction du muscle (biofeedback)", "Détecter l'AMI après une chirurgie ou un traumatisme du genou", "Objectiver la progression séance après séance"],
      spots: [[27, 31, "Capteurs", "Posés sur la peau, ils captent le signal électrique du muscle."], [76, 46, "Écran", "La courbe permet au patient de « réveiller » son muscle."]]
    },
    gameready: {
      name: "Game Ready", sub: "Cryothérapie & compression", room: "recup",
      text: "Associe le froid et la compression pneumatique pour diminuer la douleur et l'œdème.",
      bullets: ["Indispensable après une chirurgie ou une entorse", "Réduit le gonflement et soulage la douleur", "Location possible en post-opératoire pour accélérer la récupération à domicile"],
      note: "Renseignez-vous au cabinet pour la location de la Game Ready.",
      spots: [[24, 50, "Unité de contrôle", "Règle la température et le niveau de compression."], [80, 52, "Manchon", "Adapté à chaque articulation : genou, cheville, épaule…"]]
    },
    normatec: {
      name: "Normatec", sub: "Pressothérapie", room: "recup",
      text: "Pressothérapie séquentielle qui améliore le retour veineux et accélère la récupération.",
      bullets: ["Meilleure récupération après l'effort", "Sensation de jambes légères", "Massage par compression progressive des pieds vers les cuisses"],
      spots: [[16, 75, "Boîtier", "Programme l'intensité et la durée de la séance."], [62, 50, "Bottes", "Plusieurs chambres se gonflent l'une après l'autre."]]
    },
    table: {
      name: "Table de soin", sub: "Soins & récupération", room: "recup",
      text: "Table électrique réglable en hauteur, pour les soins manuels et les séances de récupération.",
      bullets: ["Confort et sécurité du patient", "Hauteur ajustée pour chaque technique"],
      spots: [[50, 48, "Plateau réglable", "Montée et descente électriques."]]
    }
  };

  /* ---------- Salles ---------- */
  var ROOMS = [
    {
      id: "accueil", title: "L'accueil", kicker: "Première étape",
      intro: "Dès la porte poussée, l'équipe vous accueille et vous guide.",
      hotspots: [
        { x: 50, y: 53, title: "Accueil & prise de rendez-vous", text: "Notre secrétariat vous accueille, planifie vos séances et répond à vos questions. Rendez-vous aussi possibles par téléphone ou sur Doctolib.", link: ["contact.html#rdv", "Prendre rendez-vous"] },
        { x: 19, y: 34, title: "Les premiers pas", text: "Première séance ? Pensez à apporter votre ordonnance, votre carte Vitale, votre mutuelle, vos examens (radios, IRM, compte rendu opératoire) et une tenue confortable." },
        { x: 85, y: 62, title: "Salle d'attente", text: "Un espace calme pour patienter quelques minutes avant votre séance." }
      ]
    },
    {
      id: "soin", title: "La salle de soin", kicker: "Bilan & soins manuels",
      intro: "Un espace individuel pour le bilan et les techniques manuelles.",
      hotspots: [
        { x: 86, y: 57, title: "Bilan kiné", text: "Évaluation complète : douleur, mobilité, force, tests fonctionnels. Il sert à fixer des objectifs et à construire votre programme." },
        { x: 26, y: 62, title: "Dry needling", text: "Technique utilisant une aiguille fine pour traiter les points gâchettes musculaires et diminuer les douleurs et tensions." },
        { x: 56, y: 52, title: "Massage", text: "Massage thérapeutique et de récupération : détente musculaire, circulation, diminution des douleurs." },
        { x: 36, y: 50, title: "Thérapie manuelle", text: "Mobilisations et manipulations articulaires pour restaurer la mobilité et soulager la douleur, toujours associées à l'exercice." }
      ]
    },
    {
      id: "balneo", title: "La balnéothérapie", kicker: "Rééducation dans l'eau",
      intro: "Un bassin d'eau chaude pour bouger plus tôt, avec moins de douleur.",
      hotspots: [
        { x: 44, y: 76, title: "Cours collectifs", text: "Aquagym, bébés nageurs et autres cours en petit groupe. Renseignez-vous au cabinet pour le planning et les inscriptions.", tags: ["Aquagym", "Bébés nageurs"] },
        { x: 70, y: 70, title: "Balnéo & post-opératoire", text: "La portance de l'eau allège le poids du corps : on remarche, on remobilise et on renforce plus tôt après une chirurgie (genou, hanche, épaule, rachis), avec moins de douleur." },
        { x: 13, y: 66, title: "Matériel aquatique", text: "Frites, planches, haltères aquatiques : un matériel varié pour adapter la résistance de l'eau à chaque exercice." }
      ]
    },
    {
      id: "plateau", title: "Le plateau technique", kicker: "Force, cardio & mesure",
      intro: "Cliquez sur une machine pour zoomer et découvrir son utilité.",
      zoom: true,
      items: [
        { eq: "rack", x: 30, bottom: 600, s: 1.4 },
        { eq: "skierg", x: 330, bottom: 600, s: 1.3 },
        { eq: "voltra", x: 590, bottom: 600, s: 1.3 },
        { eq: "reverse", x: 860, bottom: 600, s: 1.3 },
        { eq: "legcurl", x: 1150, bottom: 600, s: 1.3 },
        { eq: "rower", x: 10, bottom: 870, s: 1.6 },
        { eq: "bike", x: 360, bottom: 870, s: 1.5 },
        { eq: "legext", x: 680, bottom: 870, s: 1.5 },
        { eq: "boxes", x: 1000, bottom: 870, s: 1.35 },
        { eq: "madup", x: 1290, bottom: 712, s: .75 },
        { eq: "emg", x: 1430, bottom: 712, s: .75 }
      ]
    },
    {
      id: "recup", title: "Zone récupération", kicker: "Plateau technique",
      intro: "Table de soin, cryothérapie compressive et pressothérapie.",
      zoom: true,
      items: [
        { eq: "table", x: 360, bottom: 820, s: 3.4 },
        { eq: "gameready", x: 40, bottom: 840, s: 1.6 },
        { eq: "normatec", x: 1080, bottom: 840, s: 2.1 }
      ]
    }
  ];

  window.KAB_TOUR = { DRAW: DRAW, EQUIP: EQUIP, ROOMS: ROOMS };
})();
