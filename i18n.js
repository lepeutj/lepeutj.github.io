const translations = {
  en: {
    title: "Jérémy — AI/ML Engineer",
    description: "Portfolio of Jérémy, an AI/ML Engineer with a background in applied mathematics and data science.",
    languageLabel: "Language",
    diagramLabel: "Diagram: data sources and tools feed a language model, which produces responses and actions",
    statusLabel: "STATUS",
    statusValue: "OPEN TO OPPORTUNITIES",
    heroIntro: "I’m Jérémy, an AI/ML Engineer with a background in applied mathematics and data science. I work at the intersection of data, models, and software to build solutions that work in practice.",
    diagramSources: "SOURCES",
    diagramInputs: "documents · tools",
    diagramActions: "ACTIONS",
    diagramOutputs: "responses · tasks",
    diagramContext: "retrieved context + tool calls",
    nameLabel: "NAME",
    roleLabel: "ROLE",
    aboutTitle: "About",
    aboutSubtitle: "background & approach",
    about1: "What interests me in a machine learning project goes beyond choosing a model. The first step is to understand the need, examine the available data, and determine what can realistically be built. I have worked with tabular data, text, documents, audio, and time series, including the exploration, cleaning, transformation, and sometimes anonymisation they require.",
    about2: "I work mainly in Python, both on data analysis and models and on the components needed to put them to use. This includes APIs, databases, Docker, Linux, and deployment. My meeting transcription and summarisation application is an example of this approach. I developed it end to end, from audio processing through to production deployment.",
    about3: "I am currently exploring LLMs, RAG, agents, and fine-tuning. These technologies open up interesting possibilities, but they do not replace statistics or more traditional machine learning. My goal is to choose an approach that fits the problem rather than starting from a particular technology.",
    about4: "I am also interested in how systems are hosted and in the data they handle. Open source projects and self-hosted solutions often make it easier to understand and retain control over these aspects. I remain pragmatic, however, and also use cloud services or proprietary tools when they are relevant.",
    about5: "My background in teaching now helps me communicate, explain technical subjects clearly, and work with people from different backgrounds. I am looking to join a team where technical discussion, high standards, and collective learning are an important part of the work.",
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
    heroIntro: "Je suis Jérémy, AI/ML Engineer, avec une formation en mathématiques appliquées et en Data Science. Je travaille à l’interface entre les données, les modèles et le logiciel pour construire des solutions utilisables en pratique.",
    diagramSources: "SOURCES",
    diagramInputs: "documents · outils",
    diagramActions: "ACTIONS",
    diagramOutputs: "réponses · tâches",
    diagramContext: "contexte retrouvé + appels d’outils",
    nameLabel: "NOM",
    roleLabel: "RÔLE",
    aboutTitle: "À propos",
    aboutSubtitle: "parcours & approche",
    about1: "Ce qui m’intéresse dans un projet de Machine Learning ne se limite pas au choix du modèle. Il faut d’abord comprendre le besoin, examiner les données et déterminer ce qu’il est réellement possible de construire. J’ai travaillé avec des données tabulaires, du texte, des documents, de l’audio et des séries temporelles, avec tout ce que cela implique en matière d’exploration, de nettoyage, de transformation et parfois d’anonymisation.",
    about2: "Je travaille principalement en Python, aussi bien sur l’analyse des données et les modèles que sur les composants nécessaires à leur utilisation. Cela comprend les API, les bases de données, Docker, Linux et le déploiement. Mon application de transcription et de synthèse de réunions est un exemple de cette approche. Je l’ai développée de bout en bout, depuis le traitement de l’audio jusqu’à sa mise en production.",
    about3: "J’explore actuellement les LLM, le RAG, les agents et le fine-tuning. Ces technologies ouvrent des possibilités intéressantes, mais elles ne remplacent ni les méthodes statistiques ni le Machine Learning plus classique. Mon objectif reste de choisir une approche adaptée au problème plutôt que de partir d’une technologie particulière.",
    about4: "Je m’intéresse également à la manière dont les systèmes sont hébergés et aux données qu’ils manipulent. Les projets open source et les solutions auto-hébergées permettent souvent de mieux comprendre et maîtriser ces aspects. Je conserve néanmoins une approche pragmatique et utilise aussi des services cloud ou propriétaires lorsque cela est pertinent.",
    about5: "Mon parcours dans l’enseignement m’aide aujourd’hui à communiquer, à vulgariser et à travailler avec des interlocuteurs aux profils différents. Je souhaite rejoindre une équipe où les échanges techniques, l’exigence et l’apprentissage collectif occupent une place importante.",
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
