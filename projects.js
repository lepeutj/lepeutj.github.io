// Add an object to this list to publish a new project card.
// The three short labels in "diagram" form the diagram at the top of the card.
const projects = [
  {
    title: { en: "RAG System", fr: "Système RAG" },
    description: {
      en: "A retrieval-augmented generation pipeline built from the ground up: custom recursive chunking, interchangeable embedding and LLM providers, and persistent vector storage. Designed to run on a basic VPS.",
      fr: "Un pipeline de génération augmentée par recherche développé de A à Z, avec découpage récursif personnalisé, fournisseurs d'embeddings et de LLM interchangeables, et stockage vectoriel persistant. Conçu pour fonctionner sur un VPS simple."
    },
    tags: ["Python", "FastAPI", "ChromaDB", "sentence-transformers", "Docker"],
    diagram: {
      en: ["Docs", "Chunks", "Retrieval"],
      fr: ["Docs", "Segments", "Recherche"]
    },
    url: "https://github.com/lepeutj/RAG"
  },
  {
    title: { en: "Agent System", fr: "Système d'agent" },
    description: {
      en: "An autonomous agent with native tool use (structured function calling), explicit planning, and a fully traced execution loop. Sandboxed tools include a calculator, web search, file access, and isolated Python execution.",
      fr: "Un agent autonome avec utilisation native d'outils, planification explicite et boucle d'exécution entièrement tracée. Les outils isolés comprennent une calculatrice, une recherche web, un accès aux fichiers et une exécution Python sécurisée."
    },
    tags: ["Python", "FastAPI", "Anthropic API", "function calling", "Docker"],
    diagram: {
      en: ["Plan", "Tool Use", "Response"],
      fr: ["Plan", "Outils", "Réponse"]
    },
    url: "https://github.com/lepeutj/agent-system"
  },
  {
    title: { en: "LLM Fine-Tuning Experiment", fr: "Expérience de fine-tuning de LLM" },
    description: {
      en: "A reproducible experiment comparing zero-shot, few-shot, and QLoRA fine-tuned language models on bilingual information extraction. Includes a harder dataset with distractors and missing values, strict JSON evaluation, and configurable Hugging Face models and quantization.",
      fr: "Une expérience reproductible comparant des modèles de langage en zero-shot, few-shot et affinés avec QLoRA sur une tâche bilingue d'extraction d'informations. Elle comprend un jeu de données plus difficile, une évaluation JSON stricte et des modèles Hugging Face configurables."
    },
    tags: ["Python", "PyTorch", "Hugging Face", "QLoRA", "LLM evaluation"],
    diagram: {
      en: ["Dataset", "Baseline vs QLoRA", "Evaluation"],
      fr: ["Données", "Base vs QLoRA", "Évaluation"]
    },
    url: "https://github.com/lepeutj/llm-finetuning"
  }
];

const svgNS = "http://www.w3.org/2000/svg";
function svgElement(name, attributes = {}, content = "") {
  const node = document.createElementNS(svgNS, name);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  node.textContent = content;
  return node;
}

function projectDiagram(labels) {
  const svg = svgElement("svg", {
    class: "mini-diagram", viewBox: "0 0 260 64", "aria-hidden": "true"
  });
  const boxes = [[4, 52], [88, 72], [190, 66]];
  boxes.forEach(([x, width], index) => {
    svg.append(svgElement("rect", { class: "node", x, y: 22, width, height: 20, rx: 2 }));
    svg.append(svgElement("text", { x: x + width / 2, y: 35, "text-anchor": "middle" }, labels[index] || ""));
    if (index < 2) {
      svg.append(svgElement("line", { x1: x + width, y1: 32, x2: boxes[index + 1][0] - 2, y2: 32 }));
    }
  });
  return svg;
}

function renderProjects(language) {
  const grid = document.querySelector("#project-grid");
  const count = document.querySelector("#project-count");
  grid.replaceChildren();

  for (const project of projects) {
    const card = document.createElement("article");
    card.className = "project-card";
    card.append(projectDiagram(project.diagram[language]));

    const title = document.createElement("h3");
    title.textContent = project.title[language];
    card.append(title);

    const description = document.createElement("p");
    description.textContent = project.description[language];
    card.append(description);

    const tags = document.createElement("div");
    tags.className = "tags";
    for (const label of project.tags) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = label;
      tags.append(tag);
    }
    card.append(tags);

    const link = document.createElement("a");
    link.className = "project-link";
    link.href = project.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = language === "fr" ? "Voir le dépôt ↗" : "View repository ↗";
    card.append(link);
    grid.append(card);
  }

  count.textContent = language === "fr"
    ? `${projects.length} projets publiés`
    : `${projects.length} project${projects.length === 1 ? "" : "s"} published`;
}
