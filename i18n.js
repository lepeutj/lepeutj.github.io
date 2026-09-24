const translations = {
  en: {
    title: "Jérémy — AI/ML Engineer",
    description: "Portfolio of Jérémy, an AI/ML Engineer with a background in applied mathematics and data science.",
    languageLabel: "Language",
    diagramLabel: "Diagram: data sources and tools feed a language model, which produces responses and actions",
    statusLabel: "STATUS",
    statusValue: "OPEN TO OPPORTUNITIES",
    heroIntro: "I’m Jérémy, an AI/ML Engineer with a background in applied mathematics and data science. I like understanding a problem, working with the data, and choosing suitable methods before building a solution.",
    diagramSources: "SOURCES",
    diagramInputs: "documents · tools",
    diagramActions: "ACTIONS",
    diagramOutputs: "responses · tasks",
    diagramContext: "retrieved context + tool calls",
    nameLabel: "NAME",
    roleLabel: "ROLE",
    aboutTitle: "About",
    aboutSubtitle: "background & approach",
    about1: "I have worked with a wide range of data, including tabular data, text, documents, audio, and time series. Much of the work often consists of exploring, cleaning, transforming, or anonymising that data. This has allowed me to develop skills in data analysis and data engineering alongside machine learning.",
    about2: "I work mainly in Python and am as interested in models as I am in what makes them usable in practice: APIs, databases, Docker, Linux, cloud services, and deployment. In particular, I developed an end-to-end meeting transcription and summarisation application, from data processing through to deployment.",
    about3: "I am currently exploring LLMs, RAG, agents, and fine-tuning, not as answers to every problem, but as tools that can help build suitable solutions.",
    about4: "I also pay close attention to privacy and control over data. I am interested in open source and self-hosted solutions, while pragmatically using cloud services and proprietary tools when they are the right fit.",
    about5: "My background in teaching taught me how to communicate, explain complex ideas clearly, and adapt to different audiences. Curious and quick to learn, I am now looking to join a team where I can contribute my skills while continuing to grow alongside more experienced colleagues.",
    projectsTitle: "Projects",
    moreProjects: "More projects are on the way.",
    allRepositories: "See all my GitHub repositories ↗",
    emailLabel: "Email",
    footerMeta: "SHEET 01 — BACKGROUND & PROJECTS"
  },
  fr: {
    title: "Jérémy — AI/ML Engineer",
    description: "Portfolio de Jérémy, AI/ML Engineer avec une formation en mathématiques appliquées et Data Science.",
    languageLabel: "Langue",
    diagramLabel: "Schéma : des sources et des outils alimentent un modèle de langage qui produit des réponses et des actions",
    statusLabel: "STATUT",
    statusValue: "OUVERT AUX OPPORTUNITÉS",
    heroIntro: "Je suis Jérémy, AI/ML Engineer, avec une formation en mathématiques appliquées et Data Science. J’aime comprendre un problème, travailler les données et choisir les méthodes adaptées avant de construire une solution.",
    diagramSources: "SOURCES",
    diagramInputs: "documents · outils",
    diagramActions: "ACTIONS",
    diagramOutputs: "réponses · tâches",
    diagramContext: "contexte retrouvé + appels d’outils",
    nameLabel: "NOM",
    roleLabel: "RÔLE",
    aboutTitle: "À propos",
    aboutSubtitle: "parcours & approche",
    about1: "J’ai travaillé avec des données variées : données tabulaires, texte, documents, audio ou séries temporelles. Une grande partie du travail consiste souvent à les explorer, les nettoyer, les transformer ou les anonymiser. J’ai ainsi développé des compétences en Data Analysis et Data Engineering, en plus du Machine Learning.",
    about2: "Je travaille principalement en Python et m’intéresse autant aux modèles qu’à ce qui permet de les utiliser réellement : API, bases de données, Docker, Linux, cloud et déploiement. J’ai notamment développé une application de transcription et de synthèse de réunions de bout en bout, du traitement des données jusqu’au déploiement.",
    about3: "J’explore aujourd’hui les LLM, le RAG, les agents et le fine-tuning, non comme des réponses à tous les problèmes, mais comme des outils qui peuvent contribuer à construire des solutions adaptées.",
    about4: "Je suis également attentif à la confidentialité et à la maîtrise des données. Je m’intéresse aux solutions open source et auto-hébergées, tout en utilisant de manière pragmatique les services cloud et les outils propriétaires lorsqu’ils sont adaptés au besoin.",
    about5: "Mon parcours dans l’enseignement m’a appris à communiquer, vulgariser et m’adapter à différents interlocuteurs. Curieux et rapide à apprendre, je souhaite aujourd’hui rejoindre une équipe à laquelle apporter mes compétences tout en continuant à progresser au contact de profils plus expérimentés.",
    projectsTitle: "Projets",
    moreProjects: "D’autres projets sont en préparation.",
    allRepositories: "Voir tous mes dépôts GitHub ↗",
    emailLabel: "E-mail",
    footerMeta: "FICHE 01 — PARCOURS & PROJETS"
  }
};

function savedLanguage() {
  try {
    return localStorage.getItem("language");
  } catch {
    return null;
  }
}

function rememberLanguage(language) {
  try {
    localStorage.setItem("language", language);
  } catch {
    // The language still works when browser storage is unavailable.
  }
}

function setLanguage(language) {
  const selected = translations[language] ? language : "en";
  const text = translations[selected];

  document.documentElement.lang = selected;
  document.title = text.title;
  document.querySelector('meta[name="description"]').content = text.description;
  document.querySelector(".language-switch").setAttribute("aria-label", text.languageLabel);
  document.querySelector(".diagram").setAttribute("aria-label", text.diagramLabel);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = text[element.dataset.i18n];
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === selected));
  });

  renderProjects(selected);
  rememberLanguage(selected);

  const url = new URL(window.location.href);
  if (selected === "fr") url.searchParams.set("lang", "fr");
  else url.searchParams.delete("lang");
  history.replaceState(null, "", url);
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
const initialLanguage = translations[requestedLanguage]
  ? requestedLanguage
  : (savedLanguage() === "fr" ? "fr" : "en");

setLanguage(initialLanguage);
