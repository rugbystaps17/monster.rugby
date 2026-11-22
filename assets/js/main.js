/* Le Kab — script commun à toutes les pages :
   en-tête, pied de page, bouton RDV flottant, menu mobile, animations. */
(function () {
  var K = window.KAB;
  var page = document.body.getAttribute("data-page") || "";

  var LOGO =
    '<svg class="logo-mark" viewBox="0 0 64 64" aria-hidden="true">' +
    '<ellipse cx="32" cy="32" rx="28" ry="19" transform="rotate(-35 32 32)" fill="currentColor"/>' +
    '<path d="M21 43 L43 21" stroke="var(--logo-ink)" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M27 33 l4 4 M30.5 29.5 l4 4 M34 26 l4 4" stroke="var(--logo-ink)" stroke-width="2.4" stroke-linecap="round"/>' +
    "</svg>";

  var NAV = [
    ["index.html", "Accueil", "accueil"],
    ["equipe.html", "L'équipe", "equipe"],
    ["expertise.html", "Expertises", "expertise"],
    ["cabinet.html", "Le cabinet", "cabinet"],
    ["contact.html", "Contact & horaires", "contact"]
  ];

  function navLinks() {
    return NAV.map(function (n) {
      var cur = n[2] === page ? ' aria-current="page"' : "";
      return '<a href="' + n[0] + '"' + cur + ">" + n[1] + "</a>";
    }).join("");
  }

  // ---------- Header ----------
  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="container header-inner">' +
      '<a class="brand" href="index.html" aria-label="' + K.name + ' — accueil">' + LOGO +
      '<span class="brand-text"><strong>' + K.name + "</strong><small>" + K.tagline + "</small></span></a>" +
      '<nav class="main-nav" id="main-nav" aria-label="Navigation principale">' + navLinks() + "</nav>" +
      '<a class="btn btn-rdv header-rdv" href="contact.html#rdv">' + icon("cal") + "<span>Prendre rendez-vous</span></a>" +
      '<button class="burger" aria-expanded="false" aria-controls="main-nav" aria-label="Menu"><span></span><span></span><span></span></button>' +
      "</div>";
    var burger = header.querySelector(".burger");
    burger.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------- Bouton RDV flottant (toujours visible) ----------
  if (page !== "contact") {
    var fab = document.createElement("a");
    fab.className = "rdv-fab";
    fab.href = "contact.html#rdv";
    fab.innerHTML = icon("cal") + "<span>Prise de rendez-vous</span>";
    document.body.appendChild(fab);
  }

  // ---------- Footer ----------
  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="container footer-grid">' +
      '<div><a class="brand brand-footer" href="index.html">' + LOGO +
      '<span class="brand-text"><strong>' + K.name + "</strong><small>" + K.tagline + "</small></span></a>" +
      '<p class="muted">Rééducation, performance et prévention, pour tous les patients et tous les sportifs.</p></div>' +
      "<div><h4>Nous trouver</h4><p>" + K.addressFull + '</p><a class="link" href="' + K.mapsDir + '" target="_blank" rel="noopener">Itinéraire Google Maps →</a></div>' +
      '<div><h4>Contact</h4><p><a class="link" href="tel:' + K.phoneHref + '">' + K.phone + "</a></p>" +
      '<p><a class="link" href="' + K.doctolib + '" target="_blank" rel="noopener">Réserver sur Doctolib →</a></p>' +
      '<div class="socials">' + socials() + "</div></div>" +
      "<div><h4>Plan du site</h4><nav class=\"footer-nav\">" + navLinks() + "</nav></div>" +
      "</div>" +
      '<div class="container footer-bottom"><span>© ' + new Date().getFullYear() + " " + K.name + " — Cabinet de kinésithérapie, Chazay-d'Azergues</span></div>";
  }

  function socials() {
    var s = "";
    if (K.instagram) s += '<a href="' + K.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + icon("insta") + "</a>";
    if (K.facebook) s += '<a href="' + K.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + icon("fb") + "</a>";
    return s;
  }

  // ---------- Remplissage des éléments [data-k] ----------
  document.querySelectorAll("[data-k]").forEach(function (el) {
    var key = el.getAttribute("data-k");
    switch (key) {
      case "phone": el.textContent = K.phone; if (el.tagName === "A") el.href = "tel:" + K.phoneHref; break;
      case "doctolib": el.href = K.doctolib; break;
      case "maps-dir": el.href = K.mapsDir; break;
      case "maps-embed": el.src = K.mapsEmbed; break;
      case "address": el.textContent = K.addressFull; break;
      case "instagram": el.href = K.instagram; break;
      case "email": el.textContent = K.email; if (el.tagName === "A") el.href = "mailto:" + K.email; break;
    }
  });

  // ---------- Apparition au scroll ----------
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
  }

  // ---------- Modale générique ----------
  window.KabModal = (function () {
    var wrap = document.createElement("div");
    wrap.className = "modal";
    wrap.setAttribute("hidden", "");
    wrap.innerHTML =
      '<div class="modal-backdrop" data-close></div>' +
      '<div class="modal-card" role="dialog" aria-modal="true" tabindex="-1">' +
      '<button class="modal-close" data-close aria-label="Fermer">×</button><div class="modal-body"></div></div>';
    document.body.appendChild(wrap);
    var body = wrap.querySelector(".modal-body");
    var card = wrap.querySelector(".modal-card");
    var lastFocus = null;
    function open(html) {
      lastFocus = document.activeElement;
      body.innerHTML = html;
      wrap.removeAttribute("hidden");
      document.documentElement.classList.add("no-scroll");
      requestAnimationFrame(function () { wrap.classList.add("open"); card.focus(); });
    }
    function close() {
      wrap.classList.remove("open");
      document.documentElement.classList.remove("no-scroll");
      setTimeout(function () { wrap.setAttribute("hidden", ""); }, 200);
      if (lastFocus) lastFocus.focus();
    }
    wrap.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !wrap.hasAttribute("hidden")) close(); });
    return { open: open, close: close };
  })();

  // ---------- Icônes ----------
  function icon(name) {
    var p = {
      cal: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
      insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
      fb: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a0 0 0 0 1 0 0z"/>'
    }[name];
    return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>";
  }
  window.KabIcon = icon;
})();
