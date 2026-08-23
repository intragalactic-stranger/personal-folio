/**
 * ASCII glyph definitions, spinner frames, and technology labels for knowledge clusters.
 */

export const STARFIELD_GLYPHS = [
  "·", "•", "*", "✧", "✦", "°", "×", "+", "::", "~", "^", "⌬", "¤", "⋄", "⁕"
];

export const SPINNER_FRAMES = [
  "⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"
];

export const TECH_CLUSTERS_CONFIG = [
  {
    theme: "01 // AGENTIC_SYSTEMS",
    color: "#38bdf8",
    tags: ["LangGraph", "Agents", "LiteLLM", "MCP", "Claude", "Gemini", "Guardrails", "Tools", "Routing"],
  },
  {
    theme: "02 // GRAPH_&_RETRIEVAL",
    color: "#58a6ff",
    tags: ["Neo4j", "GraphRAG", "HybridRAG", "Pinecone", "RAGAS", "pgvector", "FAISS", "Embeddings"],
  },
  {
    theme: "03 // EVALS_&_INFRA",
    color: "#38bdf8",
    tags: ["Celery", "LangFuse", "Phoenix", "25K_evals/d", "p95<9s", "LangSmith", "Giskard", "Traces"],
  },
  {
    theme: "04 // CLOUD_&_PLATFORMS",
    color: "#58a6ff",
    tags: ["Kubernetes", "Helm", "Terraform", "AWS Bedrock", "GCP Vertex", "Docker", "Redis", "FastAPI"],
  },
  {
    theme: "05 // FORECASTING_&_ML",
    color: "#38bdf8",
    tags: ["PyTorch", "TFT", "XGBoost", "13%_WAPE", "MLflow", "ZenML", "Evidently", "Python"],
  },
];
