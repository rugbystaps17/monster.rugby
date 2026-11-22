/* =========================================================
   CONFIGURATION DU SITE — modifiez ici les infos du cabinet.
   Tout ce qui est marqué « À REMPLACER » est provisoire.
   ========================================================= */
window.KAB = {
  name: "Le Kab",
  tagline: "Kinésithérapie & rééducation du sport",

  // À REMPLACER : numéro réel du cabinet
  phone: "04 00 00 00 00",
  phoneHref: "+33400000000",

  // À REMPLACER : e-mail du cabinet (utilisé par le formulaire de demande de RDV)
  email: "contact@lekab.fr",

  // À REMPLACER : lien Doctolib du cabinet
  doctolib: "https://www.doctolib.fr/",

  // À REMPLACER : réseaux sociaux
  instagram: "https://www.instagram.com/",
  facebook: "",

  address: {
    street: "7 rue Marius Berliet",
    zip: "69380",
    city: "Chazay-d'Azergues"
  },

  // À REMPLACER : horaires réels
  hours: [
    ["Lundi", "8h00 – 20h00"],
    ["Mardi", "8h00 – 20h00"],
    ["Mercredi", "8h00 – 20h00"],
    ["Jeudi", "8h00 – 20h00"],
    ["Vendredi", "8h00 – 19h00"],
    ["Samedi", "Sur rendez-vous"],
    ["Dimanche", "Fermé"]
  ]
};

(function () {
  var a = window.KAB.address;
  var full = a.street + ", " + a.zip + " " + a.city;
  window.KAB.addressFull = full;
  window.KAB.mapsDir = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(full);
  window.KAB.mapsEmbed = "https://www.google.com/maps?q=" + encodeURIComponent(full) + "&output=embed";
})();
