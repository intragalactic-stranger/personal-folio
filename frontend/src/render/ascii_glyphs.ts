export const STARFIELD_GLYPHS = [
  "·", "+", "*", "•", "°", "✦", "✧", "▲", "▼", "◆", "◇",
  "0", "1", "/", "\\", "_", "-", ":", "~", "⬡", "⌬", "◈"
];

export const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export interface TechClusterMeta {
  theme: string;
  zoneCode: string;
  color: string;
  summary: string;
  tags: string[];
}

export const TECH_CLUSTERS_CONFIG: TechClusterMeta[] = [
  {
    theme: "01 // AGENTIC_SYSTEMS",
    zoneCode: "ZONE_01_AGENTIC",
    color: "#00cccc",
    summary: "8 frameworks · LangGraph primary · 95% proficiency",
    tags: ["LangGraph", "Agents", "LiteLLM", "MCP", "Claude", "Gemini", "Guardrails", "Tools", "Routing"],
  },
  {
    theme: "02 // GRAPH_&_RETRIEVAL",
    zoneCode: "ZONE_02_GRAPH_RAG",
    color: "#3888ff",
    summary: "5 vector stores · Neo4j certified · 1.2M nodes modeled",
    tags: ["Neo4j", "GraphRAG", "HybridRAG", "Pinecone", "RAGAS", "pgvector", "FAISS", "Embeddings"],
  },
  {
    theme: "03 // EVALS_&_INFRA",
    zoneCode: "ZONE_03_EVALS_INFRA",
    color: "#00cccc",
    summary: "25K evals/day · p95 <9s · LangSmith + RAGAS",
    tags: ["Celery", "LangFuse", "Phoenix", "25K_evals/d", "p95<9s", "LangSmith", "Giskard", "Traces"],
  },
  {
    theme: "04 // CLOUD_&_PLATFORMS",
    zoneCode: "ZONE_04_CLOUD_MLOPS",
    color: "#3888ff",
    summary: "AWS + GCP certified · Kubernetes prod deployments",
    tags: ["Kubernetes", "Helm", "Terraform", "AWS Bedrock", "GCP Vertex", "Docker", "Redis", "FastAPI"],
  },
  {
    theme: "05 // FORECASTING_&_ML",
    zoneCode: "ZONE_05_FORECASTING",
    color: "#00cccc",
    summary: "PyTorch TFT · 13% WAPE across 2,400 SKUs · R² 0.94",
    tags: ["PyTorch", "TFT", "XGBoost", "13%_WAPE", "MLflow", "ZenML", "Evidently", "Python"],
  },
];
