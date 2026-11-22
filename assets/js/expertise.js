/* Domaines d'expertise — silhouette interactive.
   Pour modifier les textes : éditez le tableau ZONES ci-dessous.
   Positions (x, y) dans le repère du dessin (220 × 470). */
(function () {
  var ZONES = [
    {
      id: "epaule", label: "Épaule", short: "ÉP",
      sub: "Ceinture scapulaire",
      points: { front: [[66, 100], [154, 100]], back: [[66, 102], [154, 102]] },
      patho: ["Tendinopathie de la coiffe des rotateurs", "Conflit sous-acromial", "Capsulite rétractile (épaule gelée)", "Luxation & instabilité", "Post-opératoire : réparation de coiffe, Latarjet, Bankart", "Fracture de l'humérus / de la clavicule"],
      approach: "Bilan de mobilité et de force, thérapie manuelle, renforcement progressif sur Voltra et retour aux gestes sportifs (lancer, contacts, natation)."
    },
    {
      id: "coude", label: "Coude", short: "CO",
      sub: "Coude & avant-bras",
      points: { front: [[50, 182], [170, 182]] },
      patho: ["Épicondylite latérale (tennis elbow)", "Épitrochléite (golfer's elbow)", "Raideur post-traumatique", "Rééducation après fracture ou luxation"],
      approach: "Charge progressive du tendon, travail excentrique et isométrique, dry needling si indiqué."
    },
    {
      id: "main", label: "Poignet & main", short: "MA",
      sub: "Poignet, main & doigts",
      points: { front: [[42, 256], [178, 256]] },
      patho: ["Entorse du poignet", "Fracture du poignet (Pouteau-Colles, scaphoïde)", "Tendinite de De Quervain", "Suites de canal carpien", "Entorses des doigts du sportif"],
      approach: "Récupération des amplitudes, proprioception et renforcement de la préhension."
    },
    {
      id: "cervical", label: "Cou", short: "CE",
      sub: "Rachis cervical",
      points: { front: [[110, 76]], back: [[110, 74]] },
      patho: ["Cervicalgies aiguës et chroniques", "Torticolis", "Névralgie cervico-brachiale", "Coup du lapin (whiplash)", "Céphalées d'origine cervicale"],
      approach: "Thérapie manuelle, exercices de contrôle moteur et conseils posturaux adaptés au quotidien."
    },
    {
      id: "dos", label: "Dos", short: "DO",
      sub: "Rachis dorsal & lombaire",
      points: { front: [[110, 205]], back: [[110, 160], [110, 215]] },
      patho: ["Lombalgie aiguë (lumbago)", "Lombalgie chronique", "Sciatique / cruralgie", "Hernie discale", "Dorsalgies", "Scoliose", "Rééducation après chirurgie du rachis"],
      approach: "Éducation à la douleur, mobilisation, thérapie manuelle et reconditionnement à l'effort pour rester actif."
    },
    {
      id: "hanche", label: "Hanche & bassin", short: "HA",
      sub: "Hanche, bassin & aine",
      points: { front: [[90, 250], [130, 250]], back: [[90, 246], [130, 246]] },
      patho: ["Pubalgie", "Tendinopathie des fessiers", "Conflit fémoro-acétabulaire", "Prothèse totale de hanche (PTH)", "Lésions des adducteurs", "Arthrose de hanche"],
      approach: "Renforcement global, travail en balnéothérapie après chirurgie et retour progressif aux appuis."
    },
    {
      id: "cuisse", label: "Muscles de la cuisse", short: "MU",
      sub: "Ischio-jambiers, quadriceps, adducteurs",
      points: { back: [[86, 300], [134, 300]] },
      patho: ["Déchirure / élongation des ischio-jambiers", "Contusion du quadriceps (béquille)", "Lésions des adducteurs", "Prévention des récidives (Nordic, leg curl)"],
      approach: "Protocole de reprise progressif, renforcement excentrique, sprints encadrés et tests de retour au jeu."
    },
    {
      id: "genou", label: "Genou", short: "GE",
      sub: "Ligaments, ménisques & tendons",
      points: { front: [[84, 345], [136, 345]], back: [[84, 345], [136, 345]] },
      patho: ["Rupture du LCA & ligamentoplastie", "Lésions méniscales (méniscectomie, suture)", "Entorse du ligament latéral interne", "Syndrome fémoro-patellaire", "Tendinopathie rotulienne", "Prothèse totale de genou (PTG)", "Syndrome de la bandelette ilio-tibiale"],
      approach: "EMG pour lever l'inhibition du quadriceps (AMI), BFR en post-op précoce, Voltra, pliométrie puis tests de retour au sport."
    },
    {
      id: "mollet", label: "Mollet & Achille", short: "MO",
      sub: "Triceps sural & tendon d'Achille",
      points: { back: [[83, 395], [137, 395]] },
      patho: ["Tendinopathie d'Achille", "Rupture du tendon d'Achille", "Déchirure du mollet (« tennis leg »)", "Crampes et contractures à répétition"],
      approach: "Programme de mise en charge du tendon, travail isométrique puis pliométrique."
    },
    {
      id: "cheville", label: "Cheville & pied", short: "CH",
      sub: "Cheville, pied & voûte plantaire",
      points: { front: [[82, 430], [138, 430]], back: [[82, 432], [138, 432]] },
      patho: ["Entorse de la cheville", "Instabilité chronique de cheville", "Fasciopathie plantaire", "Fracture de la cheville", "Métatarsalgies", "Post-opératoire (ligamentoplastie, hallux valgus)"],
      approach: "Proprioception, renforcement, pliométrie sur plyo box et réathlétisation jusqu'au terrain."
    }
  ];

  var NS = "http://www.w3.org/2000/svg";
  var svg = document.getElementById("body-svg");
  var zonesG = document.getElementById("zones");
  var pills = document.getElementById("zone-pills");
  var view = "front";
  var current = null;

  function el(name, attrs) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function drawZones() {
    zonesG.innerHTML = "";
    ZONES.forEach(function (z) {
      var pts = z.points[view];
      if (!pts) return;
      var g = el("g", { "class": "zone", tabindex: "0", role: "button", "aria-label": z.label, "data-id": z.id });
      pts.forEach(function (p, i) {
        g.appendChild(el("circle", { "class": "area", cx: p[0], cy: p[1], r: 20 }));
        g.appendChild(el("circle", { "class": "halo", cx: p[0], cy: p[1], r: 11 }));
        g.appendChild(el("circle", { "class": "dot", cx: p[0], cy: p[1], r: 7 }));
      });
      var lp = pts[pts.length - 1];
      var right = lp[0] >= 110;
      var t = el("text", { "class": "zone-label", x: lp[0] + (right ? 14 : -14), y: lp[1] - 12, "text-anchor": right ? "start" : "end" });
      if (pts.length === 1) { t.setAttribute("x", lp[0] + 16); t.setAttribute("text-anchor", "start"); }
      t.textContent = z.label;
      g.appendChild(t);
      g.addEventListener("click", function () { select(z.id); });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(z.id); } });
      if (current === z.id) g.classList.add("active");
      zonesG.appendChild(g);
    });
  }

  function drawPills() {
    pills.innerHTML = ZONES.map(function (z) {
      return '<button type="button" data-id="' + z.id + '" aria-pressed="false">' + z.label + "</button>";
    }).join("");
    pills.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var z = find(b.dataset.id);
      if (!z.points[view]) setView(z.points.front ? "front" : "back");
      select(b.dataset.id);
    });
  }

  function find(id) { return ZONES.filter(function (z) { return z.id === id; })[0]; }

  function select(id) {
    current = id;
    var z = find(id);
    zonesG.querySelectorAll(".zone").forEach(function (g) { g.classList.toggle("active", g.dataset.id === id); });
    pills.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.id === id); });
    document.getElementById("zp-ic").textContent = z.short;
    document.getElementById("zp-title").textContent = z.label;
    document.getElementById("zp-sub").textContent = z.sub;
    var body = document.getElementById("zp-body");
    body.classList.remove("swap"); void body.offsetWidth; body.classList.add("swap");
    body.innerHTML =
      '<h4 style="font-family:var(--font);font-size:.8rem;color:var(--muted);margin-bottom:12px">Pathologies prises en charge</h4>' +
      '<ul class="patho-list">' + z.patho.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>" +
      '<div class="approach"><h4>Notre approche</h4><p>' + z.approach + "</p></div>" +
      '<div class="btn-row"><a class="btn btn-sm btn-rdv" href="contact.html#rdv">Prendre rendez-vous</a>' +
      '<a class="btn btn-sm btn-ghost" href="cabinet.html#plateau">Voir le plateau technique</a></div>';
    if (history.replaceState) history.replaceState(null, "", "#" + id);
  }

  function setView(v) {
    view = v;
    document.querySelectorAll(".view-switch button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.view === v); });
    svg.querySelector(".front-only").style.display = v === "front" ? "" : "none";
    svg.querySelector(".back-only").style.display = v === "back" ? "" : "none";
    drawZones();
  }

  document.querySelectorAll(".view-switch button").forEach(function (b) {
    b.addEventListener("click", function () { setView(b.dataset.view); });
  });

  drawPills();
  drawZones();
  var fromHash = location.hash.slice(1);
  var start = find(fromHash) ? fromHash : "genou";
  var sz = find(start);
  if (!sz.points.front) setView("back");
  select(start);
})();
