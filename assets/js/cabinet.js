/* Le cabinet — survol aérien, visite des salles à points d'intérêt,
   zoom sur les machines et mode « matériel un à un ». */
(function () {
  var T = window.KAB_TOUR, DRAW = T.DRAW, EQUIP = T.EQUIP, ROOMS = T.ROOMS;
  var mqMobile = window.matchMedia("(max-width: 700px)");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var esc = function (s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* =========================================================
     Décors (illustrations 1600 × 900)
     ========================================================= */
  function svgWrap(inner, extra) {
    return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" ' + (extra || "") + ">" + inner + "</svg>";
  }
  function place(id, x, bottom, s) {
    return '<g transform="translate(' + x + " " + (bottom - 150 * s) + ") scale(" + s + ')">' + DRAW[id] + "</g>";
  }
  function person(hx, hy, x1, x2, top, shirt) {
    return '<circle cx="' + hx + '" cy="' + hy + '" r="34" fill="#e7c9b0"/><path d="M' + (hx - 30) + " " + (hy - 14) + " q30 -34 62 0\" fill=\"#3b2a20\"/>" +
      '<rect x="' + x1 + '" y="' + top + '" width="' + ((x2 - x1) * .55) + '" height="50" rx="24" fill="' + shirt + '"/>' +
      '<rect x="' + (x1 + (x2 - x1) * .5) + '" y="' + (top + 4) + '" width="' + ((x2 - x1) * .2) + '" height="44" rx="18" fill="#0d2433"/>' +
      '<rect x="' + (x1 + (x2 - x1) * .66) + '" y="' + (top + 8) + '" width="' + ((x2 - x1) * .34) + '" height="36" rx="16" fill="#e7c9b0"/>';
  }

  var SCENES = {
    aerial: function () {
      var cars = "", colors = ["#e74c3c", "#ecf0f1", "#2c3e50", "#3498db", "#f1c40f", "#95a5a6", "#16a085", "#ecf0f1"];
      [480, 560, 640, 960, 1040, 1120].forEach(function (x, i) {
        if (i === 2) return;
        cars += '<g transform="translate(' + (x + 8) + ' 500)"><rect width="56" height="104" rx="14" fill="' + colors[i] + '"/><rect x="7" y="20" width="42" height="22" rx="5" fill="#26343f" opacity=".85"/><rect x="7" y="70" width="42" height="16" rx="5" fill="#26343f" opacity=".7"/></g>';
      });
      [520, 600, 1000, 1080].forEach(function (x, i) {
        cars += '<g transform="translate(' + (x + 8) + ' 630)"><rect width="56" height="104" rx="14" fill="' + colors[i + 4] + '"/><rect x="7" y="62" width="42" height="22" rx="5" fill="#26343f" opacity=".85"/><rect x="7" y="18" width="42" height="16" rx="5" fill="#26343f" opacity=".7"/></g>';
      });
      var lines = "";
      for (var x = 470; x <= 1150; x += 80) { if (x > 700 && x < 900) continue; lines += '<path d="M' + x + ' 490v120M' + x + ' 625v120" stroke="#fff" stroke-width="3"/>'; }
      var trees = "";
      [[180, 160, 70], [300, 330, 55], [150, 520, 60], [1380, 180, 65], [1480, 360, 70], [1330, 560, 55], [380, 90, 45], [1250, 80, 50]].forEach(function (t) {
        trees += '<circle cx="' + (t[0] + 12) + '" cy="' + (t[1] + 14) + '" r="' + t[2] + '" fill="#000" opacity=".18"/><circle cx="' + t[0] + '" cy="' + t[1] + '" r="' + t[2] + '" fill="#3f8a4c"/><circle cx="' + (t[0] - t[2] * .3) + '" cy="' + (t[1] - t[2] * .3) + '" r="' + t[2] * .5 + '" fill="#4fa05c"/>';
      });
      return svgWrap(
        '<rect width="1600" height="900" fill="#7cae68"/>' +
        '<path d="M0 0h420v420H0z" fill="#86b872"/><path d="M1180 0h420v460h-420z" fill="#86b872"/>' +
        // voisins
        '<rect x="20" y="230" width="240" height="160" fill="#b7aea2"/><rect x="1340" y="240" width="220" height="180" fill="#a9a39a"/>' +
        // route
        '<rect y="770" width="1600" height="130" fill="#4e565c"/><rect y="756" width="1600" height="14" fill="#c9c5bc"/>' +
        '<path d="M0 836 H1600" stroke="#f5f4ef" stroke-width="5" stroke-dasharray="44 34"/>' +
        '<text x="250" y="822" fill="#f5f4ef" opacity=".75" font-family="Inter,sans-serif" font-weight="700" font-size="22" letter-spacing="4">RUE MARIUS BERLIET</text>' +
        // parking
        '<rect x="440" y="470" width="720" height="290" fill="#646d73"/>' + lines + cars +
        '<path d="M800 500 V756" stroke="#f5f4ef" stroke-width="4" stroke-dasharray="18 14" opacity=".8"/>' +
        '<g transform="translate(760 680)"><rect width="80" height="56" rx="8" fill="#107aca"/><text x="40" y="40" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-weight="800" font-size="34">P</text></g>' +
        // bâtiment
        '<rect x="528" y="128" width="560" height="330" fill="#000" opacity=".2"/>' +
        '<rect x="520" y="118" width="560" height="332" fill="#cfd4d6" stroke="#8d969b" stroke-width="6"/>' +
        '<rect x="560" y="150" width="90" height="60" fill="#aab3b8"/><rect x="952" y="150" width="90" height="60" fill="#aab3b8"/>' +
        '<rect x="560" y="370" width="130" height="50" fill="#9fc4d8" opacity=".8"/><rect x="910" y="370" width="130" height="50" fill="#9fc4d8" opacity=".8"/>' +
        '<g transform="translate(800 270)"><ellipse rx="58" ry="38" transform="rotate(-35)" fill="#15b58a"/><path d="M-40 28 L40 -28" stroke="#0d2433" stroke-width="7" stroke-linecap="round"/></g>' +
        '<text x="800" y="370" text-anchor="middle" fill="#0d2433" font-family="Barlow Condensed,sans-serif" font-weight="900" font-size="64" letter-spacing="6">LE KAB</text>' +
        // auvent + porte
        '<rect x="740" y="446" width="120" height="16" fill="#0d2433"/><rect x="780" y="440" width="40" height="20" fill="#15b58a"/>' +
        trees
      );
    },
    accueil: function () {
      return svgWrap(
        '<rect width="1600" height="600" fill="#ebe5d8"/><rect y="590" width="1600" height="310" fill="#c9a77c"/>' +
        '<g stroke="#b8935f" stroke-width="3"><path d="M0 650H1600M0 720H1600M0 800H1600"/><path d="M300 600v50M900 650v70M500 720v80M1200 600v50M1300 720v80M150 800v100M800 800v100"/></g>' +
        '<rect y="586" width="1600" height="14" fill="#d8cfbd"/>' +
        '<path d="M650 0v60M950 0v60" stroke="#2a3d4a" stroke-width="3"/><path d="M620 60h60l-12 26h-36zM920 60h60l-12 26h-36z" fill="#0d2433"/>' +
        // panneau « premiers pas »
        '<rect x="200" y="170" width="210" height="270" rx="10" fill="#fff" stroke="#0d2433" stroke-width="5"/>' +
        '<text x="305" y="215" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="800" font-size="30" fill="#0d2433">PREMIERS PAS</text>' +
        '<g stroke="#15b58a" stroke-width="5" fill="none" stroke-linecap="round"><path d="M226 258l8 8 14-16M226 308l8 8 14-16M226 358l8 8 14-16M226 408l8 8 14-16"/></g>' +
        '<g stroke="#c5ccd1" stroke-width="8" stroke-linecap="round"><path d="M264 260h120M264 310h100M264 360h116M264 410h90"/></g>' +
        // enseigne
        '<rect x="600" y="100" width="400" height="120" rx="22" fill="#0d2433"/>' +
        '<g transform="translate(675 160)"><ellipse rx="34" ry="23" transform="rotate(-35)" fill="#15b58a"/><path d="M-24 16 L24 -16" stroke="#0d2433" stroke-width="5" stroke-linecap="round"/></g>' +
        '<text x="840" y="186" text-anchor="middle" fill="#fff" font-family="Barlow Condensed,sans-serif" font-weight="900" font-size="76" letter-spacing="4">LE KAB</text>' +
        // banque d'accueil
        '<ellipse cx="800" cy="735" rx="360" ry="22" fill="#000" opacity=".12"/>' +
        '<rect x="640" y="340" width="130" height="86" rx="6" fill="#1b2c38"/><rect x="650" y="350" width="110" height="64" rx="3" fill="#2c6b8a"/><rect x="694" y="426" width="22" height="14" fill="#1b2c38"/>' +
        '<rect x="860" y="404" width="60" height="30" rx="6" fill="#2a3d4a"/>' +
        '<rect x="480" y="432" width="640" height="30" rx="6" fill="#d9c3a0"/><rect x="500" y="462" width="600" height="268" fill="#0d2433"/>' +
        '<rect x="500" y="610" width="600" height="12" fill="#15b58a"/>' +
        // plante
        '<rect x="1150" y="640" width="60" height="80" rx="8" fill="#f5f4ef"/><g fill="#3f8a4c"><ellipse cx="1166" cy="600" rx="18" ry="44" transform="rotate(-20 1166 600)"/><ellipse cx="1196" cy="596" rx="18" ry="46" transform="rotate(18 1196 596)"/><ellipse cx="1180" cy="580" rx="16" ry="50"/></g>' +
        // chaises
        [1250, 1360, 1470].map(function (x) {
          return '<rect x="' + x + '" y="520" width="90" height="80" rx="14" fill="#15b58a"/><rect x="' + (x - 6) + '" y="596" width="102" height="30" rx="10" fill="#0c8a68"/><path d="M' + (x + 8) + " 626v74M" + (x + 82) + ' 626v74" stroke="#2a3d4a" stroke-width="6"/>';
        }).join("")
      );
    },
    soin: function () {
      return svgWrap(
        '<rect width="1600" height="600" fill="#e3ecea"/><rect y="590" width="1600" height="310" fill="#d9d4c7"/><rect y="586" width="1600" height="12" fill="#c8cfcc"/>' +
        '<rect x="1060" y="80" width="360" height="260" rx="10" fill="#bcd9e6" stroke="#fff" stroke-width="14"/><path d="M1240 80v260" stroke="#fff" stroke-width="10"/>' +
        // affiche anatomie
        '<rect x="170" y="110" width="190" height="290" rx="8" fill="#fff" stroke="#0d2433" stroke-width="4"/>' +
        '<g stroke="#0d2433" stroke-width="5" stroke-linecap="round" fill="none"><circle cx="265" cy="160" r="20"/><path d="M265 180v110M235 205h60M265 290l-25 80M265 290l25 80M235 205l-15 70M295 205l15 70"/></g>' +
        '<g stroke="#15b58a" stroke-width="3"><path d="M248 225h34M248 240h34M248 255h34"/></g>' +
        // chariot dry needling
        '<rect x="340" y="540" width="170" height="16" rx="6" fill="#9aa8b2"/><rect x="340" y="660" width="170" height="12" rx="6" fill="#9aa8b2"/><path d="M352 556v170M498 556v170" stroke="#2a3d4a" stroke-width="7"/>' +
        '<rect x="360" y="510" width="60" height="30" rx="4" fill="#fff" stroke="#0d2433" stroke-width="3"/><rect x="430" y="516" width="60" height="24" rx="4" fill="#15b58a"/><path d="M372 520h36M372 530h36" stroke="#9aa8b2" stroke-width="2"/>' +
        // table + patient
        place("table", 480, 800, 3.6) + person(590, 452, 625, 1170, 430, "#15b58a") +
        // bureau bilan
        '<rect x="1260" y="560" width="290" height="20" rx="6" fill="#c58b4b"/><path d="M1280 580v150M1530 580v150" stroke="#2a3d4a" stroke-width="8"/>' +
        '<path d="M1320 560 l20 -70 h120 l-20 70z" fill="#1b2c38"/><path d="M1340 548 l16 -50 h96 l-16 50z" fill="#2c6b8a"/><path d="M1360 530 l10 -14 10 8 12 -22 12 18 14 -6" stroke="#15b58a" stroke-width="3" fill="none"/>'
      );
    },
    balneo: function () {
      var tiles = "";
      for (var x = 0; x <= 1600; x += 64) tiles += '<path d="M' + x + ' 0v600" />';
      for (var y = 0; y <= 600; y += 64) tiles += '<path d="M0 ' + y + 'h1600" />';
      return svgWrap(
        '<defs><linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5cc3dc"/><stop offset="1" stop-color="#1d7aa0"/></linearGradient>' +
        '<linearGradient id="skyb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd2ea"/><stop offset="1" stop-color="#d9f0f8"/></linearGradient></defs>' +
        '<rect width="1600" height="600" fill="#d6ecf1"/><g stroke="#c2dde4" stroke-width="2">' + tiles + "</g>" +
        '<rect x="200" y="60" width="1200" height="130" rx="8" fill="url(#skyb)" stroke="#fff" stroke-width="12"/><path d="M500 60v130M800 60v130M1100 60v130" stroke="#fff" stroke-width="8"/>' +
        '<text x="800" y="290" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="900" font-size="90" fill="#0d2433" opacity=".12" letter-spacing="10">BALNÉOTHÉRAPIE</text>' +
        '<rect y="560" width="1600" height="340" fill="#e7eef0"/>' +
        '<path d="M150 630 H1450 L1530 890 H70 Z" fill="#f2f7f8"/>' +
        '<path d="M180 650 H1420 L1490 870 H110 Z" fill="url(#water)"/>' +
        '<g stroke="#fff" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"><path d="M260 700 q30 -14 60 0 t60 0"/><path d="M900 740 q30 -14 60 0 t60 0 t60 0"/><path d="M480 820 q30 -14 60 0 t60 0"/><path d="M1180 690 q30 -14 60 0 t60 0"/></g>' +
        // frites
        '<path d="M560 760 q80 -40 170 -6" stroke="#ff6b3d" stroke-width="22" stroke-linecap="round" fill="none"/><path d="M640 800 q70 -30 140 6" stroke="#f1c40f" stroke-width="22" stroke-linecap="round" fill="none"/>' +
        '<path d="M960 800 q60 -40 140 -10" stroke="#15b58a" stroke-width="22" stroke-linecap="round" fill="none"/>' +
        // échelle
        '<g stroke="#b5c2c9" stroke-width="10" fill="none" stroke-linecap="round"><path d="M1240 560 v-40 q0 -30 30 -30 q30 0 30 30 v170M1320 560 v-40 q0 -30 30 -30 q30 0 30 30 v170"/></g>' +
        '<g stroke="#b5c2c9" stroke-width="8"><path d="M1300 640h80M1300 690h80"/></g>' +
        // planches
        '<g><rect x="150" y="548" width="120" height="22" rx="10" fill="#107aca"/><rect x="156" y="528" width="120" height="22" rx="10" fill="#ff6b3d"/><rect x="146" y="508" width="120" height="22" rx="10" fill="#15b58a"/></g>' +
        '<g fill="#f1c40f"><rect x="300" y="540" width="16" height="30" rx="6"/><rect x="340" y="540" width="16" height="30" rx="6"/></g><rect x="300" y="550" width="56" height="8" fill="#0d2433"/>'
      );
    },
    plateau: function () {
      var items = ROOMS.filter(function (r) { return r.id === "plateau"; })[0].items;
      return svgWrap(
        '<rect width="1600" height="600" fill="#e4e7e6"/>' +
        '<text x="800" y="150" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="900" font-size="120" fill="#0d2433" opacity=".07" letter-spacing="8">PERFORMANCE</text>' +
        '<rect x="0" y="210" width="1600" height="10" fill="#15b58a" opacity=".8"/>' +
        '<rect y="560" width="1600" height="340" fill="#39444d"/>' +
        '<g stroke="#2f3941" stroke-width="3"><path d="M0 640H1600M0 740H1600M0 840H1600M200 560v340M600 560v340M1000 560v340M1400 560v340"/></g>' +
        '<path d="M300 0v40M800 0v40M1300 0v40" stroke="#2a3d4a" stroke-width="3"/><g fill="#0d2433"><rect x="240" y="40" width="120" height="14" rx="7"/><rect x="740" y="40" width="120" height="14" rx="7"/><rect x="1240" y="40" width="120" height="14" rx="7"/></g>' +
        '<rect x="1280" y="712" width="300" height="16" rx="6" fill="#9aa8b2"/><path d="M1296 728v140M1564 728v140" stroke="#2a3d4a" stroke-width="8"/>' +
        items.map(function (it) { return place(it.eq, it.x, it.bottom, it.s); }).join("")
      );
    },
    recup: function () {
      return svgWrap(
        '<rect width="1600" height="600" fill="#ece6df"/><rect y="590" width="1600" height="310" fill="#d9d4c7"/><rect y="586" width="1600" height="12" fill="#d0c8bd"/>' +
        '<rect x="560" y="80" width="480" height="240" rx="10" fill="#bcd9e6" stroke="#fff" stroke-width="14"/><path d="M800 80v240" stroke="#fff" stroke-width="10"/>' +
        '<text x="800" y="440" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="900" font-size="80" fill="#0d2433" opacity=".08" letter-spacing="8">RÉCUPÉRATION</text>' +
        place("table", 360, 820, 3.4) + person(470, 476, 500, 1010, 458, "#107aca") +
        place("gameready", 40, 840, 1.6) + place("normatec", 1080, 840, 2.1)
      );
    }
  };

  /* =========================================================
     Survol aérien
     ========================================================= */
  var fly = document.getElementById("flyover");
  if (fly) {
    var world = fly.querySelector(".flyover-world");
    var inside = fly.querySelector(".flyover-inside");
    var door = fly.querySelector(".flyover-door");
    var cap = fly.querySelector(".flyover-caption span");
    var sticky = fly.querySelector(".flyover-sticky");
    world.innerHTML = SCENES.aerial();
    inside.innerHTML = SCENES.accueil();
    var CAPS = [
      [0, "Vue aérienne — 7 rue Marius Berliet, Chazay-d'Azergues"],
      [.22, "Parking devant le cabinet et places dans la rue"],
      [.48, "Direction l'entrée du Kab…"],
      [.7, "Bienvenue ! Poussez la porte"]
    ];
    var lastCap = "";
    var ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
    var update = function () {
      var total = fly.offsetHeight - sticky.offsetHeight;
      var p = clamp(-fly.getBoundingClientRect().top / total, 0, 1);
      var e = ease(clamp(p / .72, 0, 1));
      var s = Math.pow(16, e);
      world.style.transform = "scale(" + s.toFixed(3) + ") perspective(1400px) rotateX(" + (e * 24).toFixed(2) + "deg)";
      var d = clamp((p - .6) / .1, 0, 1);
      var open = clamp((p - .76) / .18, 0, 1);
      door.style.opacity = d;
      door.style.setProperty("--door", ease(open));
      inside.style.opacity = d;
      inside.style.transform = "scale(" + (1.25 - .25 * open) + ")";
      var c = CAPS[0][1];
      CAPS.forEach(function (k) { if (p >= k[0]) c = k[1]; });
      if (c !== lastCap) { cap.textContent = c; lastCap = c; }
    };
    if (reduce) {
      fly.classList.add("static");
    } else {
      window.addEventListener("scroll", function () { requestAnimationFrame(update); }, { passive: true });
      window.addEventListener("resize", update);
      update();
    }
  }

  /* =========================================================
     Salles
     ========================================================= */
  var tour = document.getElementById("tour");
  var nav = document.getElementById("tour-nav-list");

  ROOMS.forEach(function (room, idx) {
    var hs = room.hotspots ? room.hotspots.slice() : [];
    if (room.items) {
      room.items.forEach(function (it) {
        var eq = EQUIP[it.eq];
        hs.push({
          eq: it.eq, title: eq.name, text: eq.text,
          x: ((it.x + 100 * it.s) / 1600) * 100,
          y: ((it.bottom - 75 * it.s) / 900) * 100
        });
      });
    }
    room._hs = hs;

    var sec = document.createElement("section");
    sec.className = "room";
    sec.id = room.id;
    sec.innerHTML =
      '<div class="container">' +
      '<div class="room-head"><div style="display:flex;gap:20px;align-items:end"><span class="room-step">' + String(idx + 1).padStart(2, "0") + "</span>" +
      '<div><span class="eyebrow" style="margin-bottom:6px">' + esc(room.kicker) + "</span><h2>" + esc(room.title) + "</h2></div></div>" +
      '<span class="room-hint"><i></i>' + esc(room.intro) + "</span></div>" +
      '<div class="scene' + (room.zoom ? " zoomable" : "") + '">' +
      '<div class="scene-media">' + SCENES[room.id]() +
      hs.map(function (h, i) {
        return '<button class="hotspot' + (h.eq ? " zoom" : "") + '" style="--x:' + h.x.toFixed(2) + "%;--y:" + h.y.toFixed(2) + '%" data-i="' + i + '" aria-label="' + esc(h.title) + '"></button>';
      }).join("") +
      "</div>" +
      '<div class="bubble" role="status"></div>' +
      (room.zoom ? '<button class="btn btn-light btn-sm zoom-exit">← Vue d\'ensemble</button><div class="zoom-info"></div>' : "") +
      "</div>" +
      (room.zoom ? '<div class="scene-legend">' + hs.map(function (h, i) { return '<button data-i="' + i + '">' + esc(h.title) + "</button>"; }).join("") + "</div>" : "") +
      "</div>";
    tour.appendChild(sec);

    nav.insertAdjacentHTML("beforeend", '<li><a href="#' + room.id + '"><b>' + (idx + 1) + "</b>" + esc(room.title.replace(/^(L'|La |Le |Zone )/, "").replace(/^./, function (c) { return c.toUpperCase(); })) + "</a></li>");
    wireScene(sec, room);
  });

  function bubbleHTML(h, withMore) {
    return "<h4>" + esc(h.title) + "</h4><p>" + esc(h.text) + "</p>" +
      (h.tags ? '<div class="tags">' + h.tags.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>" : "") +
      (h.link ? '<div class="more"><a class="btn btn-sm btn-rdv" href="' + h.link[0] + '">' + esc(h.link[1]) + "</a></div>" : "") +
      (withMore && h.eq ? '<div class="more"><button class="btn btn-sm btn-kab" data-product="' + h.eq + '">Fiche détaillée →</button></div>' : "");
  }

  function wireScene(sec, room) {
    var scene = sec.querySelector(".scene");
    var media = scene.querySelector(".scene-media");
    var bubble = scene.querySelector(".bubble");
    var pinned = null;
    var hsEls = scene.querySelectorAll(".hotspot");

    function show(i) {
      var h = room._hs[i];
      bubble.innerHTML = bubbleHTML(h, true);
      bubble.style.left = bubble.style.right = bubble.style.top = bubble.style.bottom = "";
      if (h.x <= 55) bubble.style.left = "calc(" + h.x + "% + 26px)"; else bubble.style.right = "calc(" + (100 - h.x) + "% + 26px)";
      if (h.y < 50) bubble.style.top = "calc(" + h.y + "% - 20px)"; else bubble.style.bottom = "calc(" + (100 - h.y) + "% - 20px)";
      bubble.classList.add("show");
      hsEls.forEach(function (b) { b.classList.toggle("open", +b.dataset.i === i); });
    }
    function hide() {
      bubble.classList.remove("show");
      hsEls.forEach(function (b) { b.classList.remove("open"); });
    }

    hsEls.forEach(function (b) {
      var i = +b.dataset.i;
      b.addEventListener("mouseenter", function () { if (!mqMobile.matches) show(i); });
      b.addEventListener("mouseleave", function () { if (pinned === null) hide(); else show(pinned); });
      b.addEventListener("focus", function () { show(i); });
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        if (room.zoom && room._hs[i].eq) { zoomTo(i); return; }
        if (pinned === i) { pinned = null; hide(); } else { pinned = i; show(i); }
      });
    });
    bubble.addEventListener("mouseleave", function () { if (pinned === null) hide(); });
    bubble.addEventListener("mouseenter", function () { bubble.classList.add("show"); });
    scene.addEventListener("click", function (e) {
      var p = e.target.closest("[data-product]");
      if (p) { openProduct(p.dataset.product); return; }
      if (!e.target.closest(".bubble") && !e.target.closest(".zoom-info") && !e.target.closest(".zoom-exit")) { pinned = null; hide(); }
    });

    if (!room.zoom) return;
    var info = scene.querySelector(".zoom-info");
    var legend = sec.querySelectorAll(".scene-legend button");
    function zoomTo(i) {
      var h = room._hs[i];
      hide(); pinned = null;
      var W = media.clientWidth, H = media.clientHeight, s = mqMobile.matches ? 1.8 : 2.2;
      var px = h.x / 100 * W, py = h.y / 100 * H;
      var tx = clamp(W / 2 - s * px, W - s * W, 0);
      var ty = clamp(H * (mqMobile.matches ? .5 : .42) - s * py, H - s * H, 0);
      media.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + s + ")";
      scene.classList.add("zoomed");
      info.innerHTML = '<div class="bubble">' + bubbleHTML(h, true) + "</div>";
      legend.forEach(function (b) { b.classList.toggle("on", +b.dataset.i === i); });
    }
    function unzoom() {
      media.style.transform = "";
      scene.classList.remove("zoomed");
      legend.forEach(function (b) { b.classList.remove("on"); });
    }
    scene.querySelector(".zoom-exit").addEventListener("click", unzoom);
    legend.forEach(function (b) {
      b.addEventListener("click", function () {
        zoomTo(+b.dataset.i);
        if (scene.getBoundingClientRect().top < 0 || scene.getBoundingClientRect().bottom > innerHeight) scene.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
    window.addEventListener("resize", unzoom);
  }

  /* Navigation active selon la salle visible */
  if ("IntersectionObserver" in window) {
    var links = nav.querySelectorAll("a");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + e.target.id;
          a.classList.toggle("active", on);
          if (on && a.scrollIntoView && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = a.offsetLeft - 16;
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll(".room").forEach(function (r) { io.observe(r); });
  }

  /* =========================================================
     Fiche produit (photo interactive)
     ========================================================= */
  function openProduct(id) {
    var eq = EQUIP[id];
    var spots = eq.spots || [];
    var html =
      '<div class="product"><div class="product-media"><svg viewBox="-10 -10 220 170">' + DRAW[id] + "</svg>" +
      spots.map(function (s, i) {
        // conversion repère dessin (220 × 170 avec marge) → %
        return '<button class="hotspot" style="--x:' + ((s[0] * 2 + 10) / 220 * 100).toFixed(1) + "%;--y:" + ((s[1] * 1.5 + 10) / 170 * 100).toFixed(1) + '%" data-s="' + i + '" aria-label="' + esc(s[2]) + '"></button>';
      }).join("") +
      '<div class="bubble"></div></div>' +
      '<div class="product-info"><span class="eyebrow">' + esc(eq.sub) + "</span><h2>" + esc(eq.name) + '</h2><p class="sub">' + esc(eq.text) + "</p>" +
      "<ul>" + eq.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" +
      (eq.note ? '<p class="note">' + esc(eq.note) + "</p>" : "") +
      '<div class="btn-row" style="margin-top:20px"><a class="btn btn-sm btn-rdv" href="contact.html#rdv">Prendre rendez-vous</a></div>' +
      '<p class="muted" style="font-size:.8rem;margin-top:16px">Survolez ou touchez les points « + » de l\'image.</p></div></div>';
    window.KabModal.open(html);
    var root = document.querySelector(".modal .product-media");
    var bub = root.querySelector(".bubble");
    root.querySelectorAll(".hotspot").forEach(function (b) {
      var s = spots[+b.dataset.s];
      var x = parseFloat(b.style.getPropertyValue("--x")), y = parseFloat(b.style.getPropertyValue("--y"));
      var showIt = function () {
        bub.innerHTML = "<h4>" + esc(s[2]) + "</h4><p>" + esc(s[3]) + "</p>";
        bub.style.left = bub.style.right = bub.style.top = bub.style.bottom = "";
        if (x <= 55) bub.style.left = "calc(" + x + "% + 22px)"; else bub.style.right = "calc(" + (100 - x) + "% + 22px)";
        if (y < 50) bub.style.top = "calc(" + y + "% - 16px)"; else bub.style.bottom = "calc(" + (100 - y) + "% - 16px)";
        bub.classList.add("show");
        root.querySelectorAll(".hotspot").forEach(function (o) { o.classList.toggle("open", o === b); });
      };
      b.addEventListener("mouseenter", showIt);
      b.addEventListener("focus", showIt);
      b.addEventListener("click", showIt);
    });
    var first = root.querySelector(".hotspot");
    if (first && !mqMobile.matches) first.dispatchEvent(new Event("mouseenter"));
  }

  /* =========================================================
     Mode « matériel un à un »
     ========================================================= */
  var grid = document.getElementById("gear-grid");
  var ROOM_NAMES = { plateau: "Plateau technique", recup: "Récupération" };
  grid.innerHTML = Object.keys(EQUIP).map(function (id) {
    var eq = EQUIP[id];
    return '<button class="gear" data-id="' + id + '" data-room="' + eq.room + '"><div class="gear-media"><span class="room-tag">' + ROOM_NAMES[eq.room] + '</span><svg viewBox="-10 -10 220 170" aria-hidden="true">' + DRAW[id] + "</svg></div>" +
      '<div class="gear-body"><h3>' + esc(eq.name) + "</h3><p>" + esc(eq.text) + "</p></div></button>";
  }).join("");
  grid.addEventListener("click", function (e) { var g = e.target.closest(".gear"); if (g) openProduct(g.dataset.id); });
  document.querySelectorAll(".gear-filter button").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".gear-filter button").forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
      var f = b.dataset.f;
      grid.querySelectorAll(".gear").forEach(function (g) { g.style.display = f === "all" || g.dataset.room === f ? "" : "none"; });
    });
  });

  /* Bascule visite / matériel */
  var modeBtns = document.querySelectorAll(".mode-switch button");
  function setMode(m) {
    modeBtns.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.mode === m); });
    document.getElementById("mode-tour").hidden = m !== "tour";
    document.getElementById("mode-gear").hidden = m !== "gear";
  }
  modeBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      setMode(b.dataset.mode);
      document.getElementById(b.dataset.mode === "tour" ? "mode-tour" : "mode-gear").scrollIntoView({ behavior: "smooth" });
    });
  });
  if (location.hash === "#materiel") setMode("gear");
})();
