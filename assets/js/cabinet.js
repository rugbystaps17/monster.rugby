/* Le cabinet — survol aérien → façade → porte → visite des salles en photos,
   zoom sur les machines, fiches produit et mode « matériel un à un ». */
(function () {
  var T = window.KAB_TOUR, DRAW = T.DRAW, EQUIP = T.EQUIP, ROOMS = T.ROOMS;
  var mqMobile = window.matchMedia("(max-width: 700px)");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var esc = function (s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var NOTE = '<span class="photo-note">Visuel non contractuel</span>';
  EQUIP.voltra.contain = EQUIP.emg.contain = true;

  /* =========================================================
     Vue aérienne stylisée (d'après le plan réel : rue en courbe,
     parking devant le bâtiment, entrée face au parking)
     ========================================================= */
  function aerial() {
    // Emprise d'après le plan du RDC (échelle réduite, retourné : l'entrée fait face au parking, en bas)
    var cars = "", col = ["#d9dde0", "#2f3a42", "#9aa3a9", "#c0392b", "#ecf0f1", "#4a6274", "#d9dde0", "#1f2a30", "#b8bfc4", "#e4e7e9", "#6b7a85"];
    [400, 470, 540, 610, 680, 880, 950, 1020, 1090].forEach(function (x, i) {
      cars += '<g transform="translate(' + (x + 9) + ' 478)"><rect width="50" height="92" rx="13" fill="' + col[i] + '"/><rect x="6" y="14" width="38" height="20" rx="5" fill="#25313a" opacity=".85"/><rect x="6" y="62" width="38" height="14" rx="5" fill="#25313a" opacity=".7"/></g>';
    });
    [500, 640, 900, 1110].forEach(function (x, i) {
      cars += '<g transform="translate(' + (x + 9) + ' 650)"><rect width="50" height="92" rx="13" fill="' + col[i + 6] + '"/><rect x="6" y="58" width="38" height="20" rx="5" fill="#25313a" opacity=".85"/><rect x="6" y="16" width="38" height="14" rx="5" fill="#25313a" opacity=".7"/></g>';
    });
    var lines = "";
    for (var x = 390; x <= 1170; x += 70) { if (x > 740 && x < 860) continue; lines += '<path d="M' + x + ' 470v110M' + x + ' 640v110" stroke="#f3f3f0" stroke-width="3"/>'; }
    var trees = "";
    [[1320, 150, 62], [1440, 330, 66], [1400, 560, 58], [1330, 840, 54], [90, 120, 50], [1180, 60, 44], [980, 860, 46]].forEach(function (t) {
      trees += '<circle cx="' + (t[0] + 12) + '" cy="' + (t[1] + 14) + '" r="' + t[2] + '" fill="#000" opacity=".18"/><circle cx="' + t[0] + '" cy="' + t[1] + '" r="' + t[2] + '" fill="#4f7f4a"/><circle cx="' + (t[0] - t[2] * .3) + '" cy="' + (t[1] - t[2] * .3) + '" r="' + t[2] * .5 + '" fill="#63955a"/>';
    });
    var road = "M 250 -40 C 180 260, 180 560, 420 800 S 900 960, 1120 990";
    var roof = 'fill="#d3d6d6" stroke="#8d9496" stroke-width="5"';
    return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<rect width="1600" height="900" fill="#9fae95"/>' +
      // parking
      '<path d="M330 460 H1190 V770 H460 C 380 700, 330 600, 330 460 Z" fill="#6d757b"/>' + lines + cars +
      '<path d="M800 470 V780" stroke="#f3f3f0" stroke-width="4" stroke-dasharray="18 14" opacity=".7"/>' +
      '<g transform="translate(344 650)"><rect width="52" height="92" fill="#2f6fb5" opacity=".9"/><circle cx="26" cy="34" r="6" fill="#fff"/><path d="M26 42v16h12l4 14M26 50h12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g>' +
      // rue
      '<path d="' + road + '" stroke="#565d62" stroke-width="120" fill="none"/>' +
      '<path id="roadLine" d="' + road + '" stroke="#f1f0ea" stroke-width="4" fill="none" stroke-dasharray="36 30"/>' +
      '<text font-family="Inter,sans-serif" font-weight="700" font-size="22" letter-spacing="5" fill="#f1f0ea" opacity=".85" dy="-16"><textPath href="#roadLine" startOffset="14%">RUE MARIUS BERLIET</textPath></text>' +
      '<rect x="318" y="470" width="20" height="38" fill="#4f565b"/><text x="328" y="498" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="20" fill="#fff">7</text>' +
      // ombres
      '<path d="M371 30 L688 30 L688 205 L939 205 L939 462 L539 462 L539 205 L409 205 Z" fill="#000" opacity=".18"/>' +
      // plateau technique (aile arrière) + cellule voisine + bâtiment principal
      '<path d="M359 18 L676 18 L676 193 L397 193 Z" ' + roof + '/>' +
      '<rect x="527" y="193" width="147" height="257" fill="#c9c6c0" stroke="#8d9496" stroke-width="5"/>' +
      '<rect x="926" y="200" width="250" height="250" fill="#c9c6c0" stroke="#8d9496" stroke-width="5"/>' +
      '<rect x="674" y="153" width="252" height="297" ' + roof + '/>' +
      '<rect x="700" y="176" width="60" height="40" fill="#aeb5b8"/><rect x="420" y="60" width="80" height="50" fill="#aeb5b8"/>' +
      '<text x="517" y="120" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="13" letter-spacing="3" fill="#17392e" opacity=".55">PLATEAU</text>' +
      '<rect x="674" y="436" width="252" height="16" fill="#c4612f"/><rect x="926" y="436" width="250" height="16" fill="#c4612f"/>' +
      '<text x="800" y="330" text-anchor="middle" font-family="Outfit,Inter,sans-serif" font-size="56" fill="#17392e"><tspan font-weight="300">Le </tspan><tspan font-weight="800">Kab</tspan></text>' +
      '<text x="800" y="362" text-anchor="middle" font-family="Inter,sans-serif" font-weight="600" font-size="14" letter-spacing="6" fill="#17392e" opacity=".7">CHAZAY</text>' +
      // marquise + porte
      '<rect x="735" y="452" width="130" height="18" fill="#cfe3ea" opacity=".9" stroke="#7d8a90" stroke-width="2"/><rect x="782" y="444" width="36" height="10" fill="#2b3135"/>' +
      trees + "</svg>";
  }

  /* =========================================================
     Survol : vue aérienne → façade (photo) → porte → accueil
     ========================================================= */
  var fly = document.getElementById("flyover");
  if (fly) {
    var world = fly.querySelector(".flyover-world");
    var photo = fly.querySelector(".flyover-photo");
    var inside = fly.querySelector(".flyover-inside");
    var door = fly.querySelector(".flyover-door");
    var cap = fly.querySelector(".flyover-caption span");
    var sticky = fly.querySelector(".flyover-sticky");
    world.innerHTML = aerial();
    world.style.transformOrigin = "50% 50%";
    inside.innerHTML = '<img src="assets/img/cabinet/accueil.jpg" alt="">';
    var CAPS = [
      [0, "Vue du ciel — 7 rue Marius Berliet, Chazay-d'Azergues"],
      [.18, "Parking devant le cabinet et stationnement dans la rue"],
      [.38, "Le Kab Chazay — kiné sport & balnéo"],
      [.62, "Direction l'entrée…"],
      [.8, "Bienvenue ! Poussez la porte"]
    ];
    var lastCap = "";
    var update = function () {
      var total = fly.offsetHeight - sticky.offsetHeight;
      var p = clamp(-fly.getBoundingClientRect().top / total, 0, 1);
      // 1. vue aérienne
      var e1 = ease(clamp(p / .42, 0, 1));
      world.style.transform = "scale(" + (1 + e1 * 3.2).toFixed(3) + ") perspective(1400px) rotateX(" + (e1 * 30).toFixed(2) + "deg)";
      var f = clamp((p - .32) / .1, 0, 1);
      world.style.opacity = 1 - f;
      // 2. façade
      photo.style.opacity = f;
      var e2 = ease(clamp((p - .34) / .44, 0, 1));
      photo.style.transform = "scale(" + (1.05 + e2 * 2.1).toFixed(3) + ")";
      // 3. porte puis accueil
      var d = clamp((p - .7) / .08, 0, 1);
      var open = ease(clamp((p - .8) / .16, 0, 1));
      door.style.opacity = d;
      door.style.setProperty("--door", open);
      inside.style.opacity = d;
      inside.style.transform = "scale(" + (1.2 - .2 * open).toFixed(3) + ")";
      var c = CAPS[0][1];
      CAPS.forEach(function (k) { if (p >= k[0]) c = k[1]; });
      if (c !== lastCap) { cap.textContent = c; lastCap = c; }
    };
    if (reduce) {
      fly.classList.add("static");
      world.style.opacity = 0; photo.style.opacity = 1;
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

  function gearCard(id) {
    var eq = EQUIP[id];
    var ROOM_NAMES = { plateau: "Plateau technique", recup: "Récupération" };
    var media = eq.photo
      ? '<img src="' + eq.photo + '" alt="' + esc(eq.name) + '" loading="lazy">'
      : '<svg viewBox="-10 -10 220 170" aria-hidden="true">' + DRAW[id] + "</svg>";
    return '<button class="gear" data-id="' + id + '" data-room="' + eq.room + '"><div class="gear-media' + (eq.contain ? " contain" : "") + '">' + media +
      '<span class="room-tag">' + ROOM_NAMES[eq.room] + "</span></div>" +
      '<div class="gear-body"><h3>' + esc(eq.name) + "</h3><p>" + esc(eq.text) + "</p></div></button>";
  }

  ROOMS.forEach(function (room, idx) {
    var hs = room.hotspots ? room.hotspots.slice() : [];
    (room.items || []).forEach(function (it) {
      var eq = EQUIP[it.eq];
      hs.push({ eq: it.eq, title: eq.name, text: eq.text, x: it.x, y: it.y });
    });
    room._hs = hs;

    var sec = document.createElement("section");
    sec.className = "room";
    sec.id = room.id;
    sec.innerHTML =
      '<div class="container">' +
      '<div class="room-head"><div style="display:flex;gap:20px;align-items:end"><span class="room-step">' + String(idx + 1).padStart(2, "0") + "</span>" +
      '<div><span class="eyebrow" style="margin-bottom:6px">' + esc(room.kicker) + "</span><h2>" + esc(room.title) + "</h2></div></div>" +
      '<span class="room-hint"><i></i>' + esc(room.intro) + "</span></div>" +
      '<div class="scene' + (room.zoom ? " zoomable" : "") + '">' + NOTE +
      '<div class="scene-media"><img src="' + room.photo + '" alt="' + esc(room.title) + ' du cabinet Le Kab Chazay" loading="' + (idx ? "lazy" : "eager") + '">' +
      hs.map(function (h, i) {
        return '<button class="hotspot' + (h.eq ? " zoom" : "") + '" style="--x:' + h.x + "%;--y:" + h.y + '%" data-i="' + i + '" aria-label="' + esc(h.title) + '"></button>';
      }).join("") +
      "</div>" +
      '<div class="bubble" role="status"></div>' +
      (room.zoom ? '<button class="btn btn-light btn-sm zoom-exit">← Vue d\'ensemble</button><div class="zoom-info"></div>' : "") +
      "</div>" +
      (room.zoom ? '<div class="scene-legend">' + hs.map(function (h, i) { return '<button data-i="' + i + '">' + esc(h.title) + "</button>"; }).join("") + "</div>" : "") +
      (room.special ? '<div class="special-gear"><h3>Aussi sur le plateau</h3><p class="muted" style="margin:0">Du matériel de pointe pour mesurer et accélérer la rééducation. Cliquez pour ouvrir la fiche.</p>' +
        '<div class="gear-grid">' + room.special.map(gearCard).join("") + "</div></div>" : "") +
      "</div>";
    tour.appendChild(sec);

    nav.insertAdjacentHTML("beforeend", '<li><a href="#' + room.id + '"><b>' + (idx + 1) + "</b>" +
      esc(room.title.replace(/^(L'|La |Le |Les )/, "").replace(/^./, function (c) { return c.toUpperCase(); })) + "</a></li>");
    wireScene(sec, room);
    sec.querySelectorAll(".special-gear .gear").forEach(function (g) {
      g.addEventListener("click", function () { openProduct(g.dataset.id); });
    });
  });

  function bubbleHTML(h) {
    return (h.img ? '<img class="bubble-img" src="' + h.img + '" alt="">' : "") + "<h4>" + esc(h.title) + "</h4><p>" + esc(h.text) + "</p>" +
      (h.tags ? '<div class="tags">' + h.tags.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>" : "") +
      (h.link ? '<div class="more"><a class="btn btn-sm btn-rdv" href="' + h.link[0] + '">' + esc(h.link[1]) + "</a></div>" : "") +
      (h.eq ? '<div class="more"><button class="btn btn-sm btn-kab" data-product="' + h.eq + '">Fiche détaillée →</button></div>' : "");
  }

  function placeBubble(b, x, y, gap) {
    b.style.left = b.style.right = b.style.top = b.style.bottom = "";
    if (x <= 55) b.style.left = "calc(" + x + "% + " + gap + "px)"; else b.style.right = "calc(" + (100 - x) + "% + " + gap + "px)";
    if (y < 50) b.style.top = "calc(" + y + "% - 20px)"; else b.style.bottom = "calc(" + (100 - y) + "% - 20px)";
  }

  function wireScene(sec, room) {
    var scene = sec.querySelector(".scene");
    var media = scene.querySelector(".scene-media");
    var bubble = scene.querySelector(".bubble");
    var pinned = null;
    var hsEls = scene.querySelectorAll(".hotspot");

    function show(i) {
      var h = room._hs[i];
      bubble.innerHTML = bubbleHTML(h);
      placeBubble(bubble, h.x, h.y, 26);
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
      var W = media.clientWidth, H = media.clientHeight, s = mqMobile.matches ? 2 : 2.4;
      var px = h.x / 100 * W, py = h.y / 100 * H;
      var tx = clamp(W * (mqMobile.matches ? .5 : .62) - s * px, W - s * W, 0);
      var ty = clamp(H * .5 - s * py, H - s * H, 0);
      media.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + s + ")";
      scene.classList.add("zoomed");
      info.innerHTML = '<div class="bubble">' + bubbleHTML(h) + "</div>";
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
        var r = scene.getBoundingClientRect();
        if (r.top < 0 || r.bottom > innerHeight) scene.scrollIntoView({ behavior: "smooth", block: "center" });
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
          if (on && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = a.offsetLeft - 16;
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
    var isPhoto = !!eq.photo;
    var media = isPhoto ? '<img src="' + eq.photo + '" alt="' + esc(eq.name) + '">' : '<svg viewBox="-10 -10 220 170">' + DRAW[id] + "</svg>";
    var pos = function (s) {
      // photo : % directs ; dessin : repère 200×150 dans une vue 220×170
      return isPhoto ? [s[0], s[1]] : [(s[0] * 2 + 10) / 220 * 100, (s[1] * 1.5 + 10) / 170 * 100];
    };
    var html =
      '<div class="product"><div class="product-media' + (isPhoto ? " is-photo" : "") + '"><div class="pm-frame">' + media +
      spots.map(function (s, i) {
        var p = pos(s);
        return '<button class="hotspot" style="--x:' + p[0].toFixed(1) + "%;--y:" + p[1].toFixed(1) + '%" data-s="' + i + '" aria-label="' + esc(s[2]) + '"></button>';
      }).join("") +
      '<div class="bubble"></div></div></div>' +
      '<div class="product-info"><span class="eyebrow">' + esc(eq.sub) + "</span><h2>" + esc(eq.name) + '</h2><p class="sub">' + esc(eq.text) + "</p>" +
      "<ul>" + eq.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" +
      (eq.note ? '<p class="note">' + esc(eq.note) + "</p>" : "") +
      '<div class="btn-row" style="margin-top:20px"><a class="btn btn-sm btn-rdv" href="contact.html#rdv">Prendre rendez-vous</a></div>' +
      (spots.length ? '<p class="muted" style="font-size:.8rem;margin-top:16px">Survolez ou touchez les points « + » de l\'image.</p>' : "") +
      (isPhoto ? "" : '<p class="muted" style="font-size:.8rem">Illustration — photo à venir.</p>') + "</div></div>";
    window.KabModal.open(html);
    var root = document.querySelector(".modal .pm-frame");
    var img = root.querySelector("img");
    var fit = function () {
      if (!img || !img.naturalWidth) return;
      root.style.width = "min(100%, " + Math.round(420 * img.naturalWidth / img.naturalHeight) + "px)";
      root.style.marginInline = "auto";
    };
    if (img) { if (img.complete) fit(); else img.addEventListener("load", fit); }
    var bub = root.querySelector(".bubble");
    root.querySelectorAll(".hotspot").forEach(function (b) {
      var s = spots[+b.dataset.s], p = pos(s);
      var showIt = function () {
        bub.innerHTML = "<h4>" + esc(s[2]) + "</h4><p>" + esc(s[3]) + "</p>";
        placeBubble(bub, p[0], p[1], 22);
        bub.classList.add("show");
        root.querySelectorAll(".hotspot").forEach(function (o) { o.classList.toggle("open", o === b); });
      };
      b.addEventListener("mouseenter", showIt);
      b.addEventListener("focus", showIt);
      b.addEventListener("click", showIt);
    });
  }

  /* =========================================================
     Mode « matériel un à un »
     ========================================================= */
  var grid = document.getElementById("gear-grid");
  grid.innerHTML = Object.keys(EQUIP).map(gearCard).join("");
  grid.addEventListener("click", function (e) { var g = e.target.closest(".gear"); if (g) openProduct(g.dataset.id); });
  document.querySelectorAll(".gear-filter button").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".gear-filter button").forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
      var f = b.dataset.f;
      grid.querySelectorAll(".gear").forEach(function (g) { g.style.display = f === "all" || g.dataset.room === f ? "" : "none"; });
    });
  });

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
