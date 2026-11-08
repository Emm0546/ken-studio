/* ===== 1. MOBILE MENU ===== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ===== 2. SCROLL REVEAL ===== */

const revealItems = document.querySelectorAll(
  ".section-heading, .intro-label, .intro-content, .service-card, .shop-card, .work-card, .about-label, .about-content, .contact > *",
);

revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealItems.forEach((item) => observer.observe(item));

/* ===== 2B. SHOP (config + WhatsApp order links) ===== */

const SHOP_PHONE = "2250546918383";

const SHOP = {
  kit: { status: "soon", price: 3000 },
  menu: { status: "live", price: null },
};

const SHOP_NAMES = {
  kit: { fr: "le Kit Vendeur", en: "the Seller Kit" },
  menu: { fr: "le Menu WhatsApp", en: "the WhatsApp Menu" },
};

const SHOP_TEXT = {
  fr: {
    soon: "Bientôt",
    buy: "Commander sur WhatsApp ↗",
    notify: "Être prévenu ↗",
    quote: "Sur devis",
  },
  en: {
    soon: "Coming soon",
    buy: "Order on WhatsApp ↗",
    notify: "Notify me ↗",
    quote: "On quote",
  },
};

// Short reference the buyer puts in the payment note, e.g. KS-1105-4F2
function shopRef() {
  const d = new Date();
  const mmdd =
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  return (
    "KS-" + mmdd + "-" + Math.random().toString(36).slice(2, 5).toUpperCase()
  );
}

function shopLang() {
  return document.documentElement.lang === "fr" ? "fr" : "en";
}

function shopMessage(id) {
  const lang = shopLang();
  const name = SHOP_NAMES[id][lang];

  if (SHOP[id].status === "soon") {
    return lang === "fr"
      ? "Bonjour Ken Studio ! Prévenez-moi dès que " + name + " est disponible."
      : "Hello Ken Studio! Please let me know when " + name + " is available.";
  }

  const ref = shopRef();
  return lang === "fr"
    ? "Bonjour Ken Studio ! Je veux " + name + ". (réf " + ref + ")"
    : "Hello Ken Studio! I want " + name + ". (ref " + ref + ")";
}

function renderShop() {
  const t = SHOP_TEXT[shopLang()];

  document.querySelectorAll("[data-product]").forEach((card) => {
    const id = card.dataset.product;
    const item = SHOP[id];

    const badge = card.querySelector(".shop-badge");
    badge.textContent = t.soon;
    badge.hidden = item.status !== "soon";

    card.querySelector(".shop-price").textContent =
      item.price === null
        ? t.quote
        : item.price.toLocaleString("fr-FR") + " FCFA";

    card.querySelector(".shop-cta").textContent =
      item.status === "soon" ? t.notify : t.buy;
  });
}

document.querySelectorAll("[data-product] .shop-cta").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const id = button.closest("[data-product]").dataset.product;
    const url =
      "https://wa.me/" +
      SHOP_PHONE +
      "?text=" +
      encodeURIComponent(shopMessage(id));

    if (typeof gtag === "function") {
      gtag("event", "shop_click", { product: id, status: SHOP[id].status });
    }
    window.open(url, "_blank", "noopener");
  });
});
/* ===== 2C. CONTACT BUTTON MESSAGE ===== */

const CONTACT_MESSAGES = {
  fr: "Bonjour Ken Studio ! Je suis intéressé par vos services digitaux.",
  en: "Hello Ken Studio! I’m interested in your digital services.",
};

function updateContactLink() {
  const link = document.querySelector("#contact-button");
  const lang = document.documentElement.lang === "fr" ? "fr" : "en";

  link.href =
    "https://wa.me/2250546918383?text=" +
    encodeURIComponent(CONTACT_MESSAGES[lang]);
}
/* ===== 3. FRENCH / ENGLISH ===== */

const translations = {
  fr: {
    "nav.services": "Services",
    "nav.work": "Réalisations",
    "nav.about": "À propos",
    "nav.start": "Démarrer un projet ↗",
    "nav.shop": "Boutique",

    "shop.label": "03 — BOUTIQUE",
    "shop.title":
      "Des outils prêts à l’emploi <span>pour vendre sur WhatsApp.</span>",
    "shop.intro":
      "Simples, locaux, pensés pour la façon dont on vend vraiment en Côte d’Ivoire : WhatsApp et mobile money.",
    "shop.kit.tag": "MODÈLES + SCRIPTS",
    "shop.kit.title": "Kit Vendeur",
    "shop.kit.text":
      "Modèles Canva et scripts WhatsApp prêts à copier pour les vendeurs Instagram, TikTok et WhatsApp : liste de prix, promos, infos de livraison et relances de paiement.",
    "shop.kit.meta": "Livré sur WhatsApp · Paiement mobile money",
    "shop.menu.tag": "SERVICE + OUTIL",
    "shop.menu.title": "Menu WhatsApp",
    "shop.menu.text":
      "Vos clients choisissent leurs articles et les quantités, puis envoient la commande directement sur votre WhatsApp. Configuré à l’image de votre commerce.",
    "shop.demo": "Voir la démo ↗",

    "hero.label": "SOLUTIONS DIGITALES & EXPÉRIENCES CRÉATIVES",
    "hero.title":
      "Nous créons des expériences digitales <span>qui font avancer les entreprises.</span>",
    "hero.desc":
      "Nous aidons les entreprises ambitieuses à renforcer leur présence en ligne, à se rapprocher de leurs clients et à se développer grâce à des solutions digitales réfléchies.",
    "hero.primary": "Démarrer un projet ↗",
    "hero.secondary": "Voir nos réalisations",
    "hero.b1": "STRATÉGIE. DESIGN. TECHNOLOGIE.",
    "hero.b2": "BASÉ À ABIDJAN, CÔTE D’IVOIRE",

    "intro.label": "01 — QUI SOMMES-NOUS",
    "intro.title":
      "La technologie ne doit pas seulement embellir une entreprise. <span>Elle doit l’aider à avancer.</span>",
    "intro.text":
      "Ken Studio est un studio de solutions digitales qui aide les entreprises à bâtir une présence en ligne plus forte, à mieux communiquer avec leurs clients et à offrir de meilleures expériences grâce à la technologie.",

    "services.label": "02 — CE QUE NOUS FAISONS",
    "services.title":
      "Des solutions digitales pour <span>des besoins réels.</span>",
    "s1.title": "Conception & développement web",
    "s1.text":
      "Des sites web et des pages d’atterrissage professionnels qui présentent clairement votre activité, inspirent confiance et transforment les visiteurs en demandes.",
    "s2.title": "Présence digitale",
    "s2.text":
      "Aidez vos clients à vous découvrir et à vous contacter grâce à des catalogues numériques, des profils d’entreprise en ligne et l’intégration de WhatsApp.",
    "s3.title": "Solutions digitales pour entreprises",
    "s3.text":
      "Des outils pratiques qui aident les entreprises à organiser leurs informations, gérer les demandes et prendre de meilleures décisions.",

    "work.label": "04 — RÉALISATIONS",
    "work.title":
      "Des idées transformées en <span>expériences digitales.</span>",
    "w1.tag": "01 / DESIGN WEB",
    "w1.title": "Démo de site pour restaurant",
    "w1.meta": "Design web · Restauration",
    "w1.link": "Voir la démo ↗",
    "w2.tag": "02 / MENU DIGITAL",
    "w2.title": "Menu WhatsApp",
    "w2.meta": "Menu digital · Intégration WhatsApp",
    "w2.link": "Voir la démo ↗",

    "about.label": "05 — NOTRE APPROCHE",
    "about.title":
      "Nous ne créons pas que des produits digitaux. <span>Nous créons avec un but.</span>",
    "about.text":
      "Ken Studio est un studio de solutions digitales indépendant basé à Abidjan, en Côte d’Ivoire. Nous associons créativité, technologie et compréhension concrète des besoins des entreprises pour créer des expériences digitales qui font la différence.",
    "v1.title": "Stratégie",
    "v1.text": "Comprendre les besoins derrière chaque projet.",
    "v2.title": "Design",
    "v2.text": "Créer des expériences claires et porteuses de sens.",
    "v3.title": "Technologie",
    "v3.text": "Concevoir des solutions digitales pratiques.",
    "about.sig": "Konan Emmanuel Nassé · Développeur web, Abidjan",

    "contact.label": "06 — TRAVAILLONS ENSEMBLE",
    "contact.title": "Un projet en tête ? <span>Concrétisons-le.</span>",
    "contact.text":
      "Que vous ayez besoin d’un site web, d’une présence digitale plus forte ou d’une solution digitale pratique, parlons de vos objectifs.",
    "contact.button": "Démarrer une conversation ↗",

    "footer.tagline": "Solutions digitales & expériences créatives.",
    "footer.connect": "Restons en contact",
    "footer.rights": "© 2026 Ken Studio. Tous droits réservés.",
  },
};

const langToggle = document.querySelector(".lang-toggle");
const i18nItems = document.querySelectorAll("[data-i18n]");

i18nItems.forEach((item) => {
  item.dataset.en = item.innerHTML;
});

function setLanguage(lang) {
  i18nItems.forEach((item) => {
    const key = item.dataset.i18n;
    if (lang === "fr" && translations.fr[key]) {
      item.innerHTML = translations.fr[key];
    } else {
      item.innerHTML = item.dataset.en;
    }
  });

  document.documentElement.lang = lang;
  renderShop();
  updateContactLink();
  langToggle.textContent = lang === "fr" ? "EN" : "FR";
  localStorage.setItem("ken-language", lang);
}

langToggle.addEventListener("click", () => {
  const nextLang = document.documentElement.lang === "fr" ? "en" : "fr";
  setLanguage(nextLang);
});

const savedLang = localStorage.getItem("ken-language");
const browserLang = navigator.language.startsWith("fr") ? "fr" : "en";
setLanguage(savedLang || browserLang);

document.querySelectorAll('a[href^="https://wa.me"]').forEach((link) => {
  link.addEventListener("click", () => {
    gtag("event", "whatsapp_click");
  });
});

langToggle.addEventListener("click", () => {
  gtag("event", "language_change", { language: document.documentElement.lang });
});
