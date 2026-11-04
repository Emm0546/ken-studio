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
  ".section-heading, .intro-label, .intro-content, .service-card, .work-card, .about-label, .about-content, .contact > *",
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

/* ===== 3. FRENCH / ENGLISH ===== */

const translations = {
  fr: {
    "nav.services": "Services",
    "nav.work": "Réalisations",
    "nav.about": "À propos",
    "nav.start": "Démarrer un projet ↗",

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

    "work.label": "03 — RÉALISATIONS",
    "work.title":
      "Des idées transformées en <span>expériences digitales.</span>",
    "w1.tag": "01 / DESIGN WEB",
    "w1.title": "Démo de site pour restaurant",
    "w1.meta": "Design web · Restauration",
    "w1.link": "Voir la démo ↗",
    "w2.tag": "02 / SITE BILINGUE",
    "w2.title": "Site d’église — EN / FR",
    "w2.meta": "Design web · Communauté",
    "w2.link": "Voir le site ↗",

    "about.label": "04 — NOTRE APPROCHE",
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

    "contact.label": "05 — TRAVAILLONS ENSEMBLE",
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
