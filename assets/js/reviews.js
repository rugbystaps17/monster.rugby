/* =========================================================
   AVIS GOOGLE — bandeau défilant
   ---------------------------------------------------------
   ⚠️ Les avis ci-dessous sont des EXEMPLES de mise en page.
   Remplacez-les par de vrais avis Google du cabinet
   (copiés à la main), ou branchez un widget / l'API Google
   Places (voir README.md). Passez ensuite PLACEHOLDER à false.
   ========================================================= */
(function () {
  var PLACEHOLDER = true;
  var GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Le Kab kinésithérapie " + window.KAB.addressFull);
  var AVERAGE = "5,0";

  var REVIEWS = [
    { name: "Exemple A.", when: "il y a 2 semaines", text: "Rééducation du genou après ligamentoplastie : suivi au top, plateau technique incroyable. Je recommande !" },
    { name: "Exemple B.", when: "il y a 1 mois", text: "Équipe à l'écoute et très professionnelle. Les séances de balnéo m'ont énormément aidé après mon opération." },
    { name: "Exemple C.", when: "il y a 1 mois", text: "Cabinet moderne, accueil chaleureux, et de vraies explications à chaque séance." },
    { name: "Exemple D.", when: "il y a 2 mois", text: "Retour au rugby après une entorse de cheville grâce à un programme progressif et très bien encadré." },
    { name: "Exemple E.", when: "il y a 3 mois", text: "Super expérience, matériel de pointe (Voltra, BFR…) et des kinés passionnés." },
    { name: "Exemple F.", when: "il y a 3 mois", text: "Parking facile, horaires flexibles et des soins efficaces. Merci à toute l'équipe !" },
    { name: "Exemple G.", when: "il y a 4 mois", text: "Lombalgie chronique enfin sous contrôle grâce aux exercices et à la thérapie manuelle." },
    { name: "Exemple H.", when: "il y a 5 mois", text: "Les cours d'aquagym sont top, ambiance conviviale et encadrement sérieux." }
  ];

  var COLORS = ["#15b58a", "#ff6b3d", "#107aca", "#8e44ad", "#0d2433", "#e0a100"];
  var G = '<svg class="g" viewBox="0 0 48 48" aria-label="Google"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';

  function card(r, i) {
    var esc = function (s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; };
    return '<article class="review"><header><span class="av" style="background:' + COLORS[i % COLORS.length] + '">' + esc(r.name.charAt(0)) +
      '</span><div><div class="who">' + esc(r.name) + '</div><div class="when">' + esc(r.when) + "</div></div>" + G +
      '</header><div class="stars" aria-label="5 étoiles sur 5">★★★★★</div><p>' + esc(r.text) + "</p></article>";
  }
  function fill(id, list, offset) {
    var el = document.getElementById(id);
    if (!el) return;
    var html = list.map(function (r, i) { return card(r, i + offset); }).join("");
    el.innerHTML = html + html; // doublé pour une boucle infinie
    el.querySelectorAll(".review").forEach(function (n, i) { if (i >= list.length) n.setAttribute("aria-hidden", "true"); });
  }
  var half = Math.ceil(REVIEWS.length / 2);
  fill("reviews-a", REVIEWS.slice(0, half), 0);
  fill("reviews-b", REVIEWS.slice(half), 3);

  var link = document.getElementById("reviews-link");
  if (link) link.href = GOOGLE_REVIEWS_URL;
  var avg = document.getElementById("rating-value");
  if (avg) avg.textContent = AVERAGE;
  var note = document.getElementById("reviews-note");
  if (note && PLACEHOLDER) note.textContent = "Aperçu de mise en page : avis fictifs à remplacer par les vrais avis Google du cabinet.";
})();
