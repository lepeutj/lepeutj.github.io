// Add an object to this list to publish a new project card.
// The three short labels in "diagram" form the diagram at the top of the card.
const projects = [
  {
    title: "RAG System",
    description: "A retrieval-augmented generation pipeline built from the ground up: custom recursive chunking, interchangeable embedding and LLM providers, and persistent vector storage. Designed to run on a basic VPS.",
    tags: ["Python", "FastAPI", "ChromaDB", "sentence-transformers", "Docker"],
    diagram: ["docs", "chunks", "retrieval"],
    url: "https://github.com/lepeutj/RAG"
  },
  {
    title: "Agent System",
    description: "An autonomous agent with native tool use (structured function calling), explicit planning, and a fully traced execution loop. Sandboxed tools include a calculator, web search, file access, and isolated Python execution.",
    tags: ["Python", "FastAPI", "Anthropic API", "function calling", "Docker"],
    diagram: ["plan", "tool use", "response"],
    url: "https://github.com/lepeutj/agent-system"
  },
  {
  title: "LLM Fine-Tuning Experiment",
  description: "A reproducible experiment comparing zero-shot, few-shot, and QLoRA fine-tuned language models on bilingual information extraction. Includes a harder dataset with distractors and missing values, strict JSON evaluation, and configurable Hugging Face models and quantization.",
  tags: ["Python", "PyTorch", "Hugging Face", "QLoRA", "LLM evaluation"],
  diagram: ["dataset", "baseline vs QLoRA", "evaluation"],
  url: "https://github.com/lepeutj/llm-finetuning"
}
];

const svgNS = "http://www.w3.org/2000/svg";
const grid = document.querySelector("#project-grid");
const count = document.querySelector("#project-count");

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

for (const project of projects) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.append(projectDiagram(project.diagram));

  const title = document.createElement("h3");
  title.textContent = project.title;
  card.append(title);

  const description = document.createElement("p");
  description.textContent = project.description;
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
  link.textContent = "View repository ↗";
  card.append(link);
  grid.append(card);
}

count.textContent = `${projects.length} project${projects.length === 1 ? "" : "s"} published`;
