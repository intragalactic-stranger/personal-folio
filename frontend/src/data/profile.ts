export interface ProjectItem {
  id: string;
  title: string;
  category: "AUTONOMOUS SYSTEMS" | "GRAPH AI" | "LLM INFRASTRUCTURE" | "ML PLATFORMS";
  categoryColor: string; // amber, teal, blue, emerald
  description: string;
  metrics: string;
  stack: string[];
  archIcon: string;
  githubUrl: string;
  liveUrl: string;
}

export interface SkillRadial {
  name: string;
  shortName: string;
  pct: number;
  color: string;
  category: string;
  detail: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  tag: string;
  tint: "teal" | "green" | "purple" | "blue";
  year: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  nodeLocation: string;
  status: string;
  phone: string;
  socials: {
    email: string;
    github: string;
    linkedin: string;
    website: string;
  };
  bio: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    grade: string;
  }>;
  achievements: string[];
  skillRadials: SkillRadial[];
  skillCategories: Array<{
    category: string;
    skills: string[];
  }>;
  activeLearning: Array<{
    title: string;
    status: string;
  }>;
  projects: ProjectItem[];
  certifications: CertificationItem[];
}

export const PROFILE_DATA: ProfileData = {
  name: "Ganeshan Arumuganainar",
  headline: "AI Software Engineer // Agentic Systems, Evals & LLM Infrastructure",
  nodeLocation: "MUMBAI, INDIA // ASIA-SOUTH1",
  status: "ONLINE // DELIVERING PRODUCTION AI",
  phone: "+91 8169956401",
  socials: {
    email: "ganeshanarumuganainar@gmail.com",
    github: "https://github.com/intragalactic-stranger",
    linkedin: "https://linkedin.com/in/ganeshannainar",
    website: "https://ganeshan.dev",
  },
  bio: [
    "AI Software Engineer (2+ yrs, promoted within 18 months) focused on making LLM agents reliable in production evaluations, guardrails, and observability.",
    "Build LangGraph-based multi-agent systems and hybrid/graph retrieval pipelines, deployed on Kubernetes across AWS, GCP, and on-premise.",
    "Own systems end-to-end: architecture, build, deployment, and client handover. Delivered 7 production systems for 6 clients across BFSI, retail, healthcare, and logistics.",
  ],
  education: [
    {
      degree: "B.E. Computer Engineering, Honours in AI & ML",
      institution: "SIES GST, University of Mumbai",
      year: "2020 — 2024",
      grade: "CGPA 9.07 / 10",
    },
    {
      degree: "Foundation Programme in Data Science",
      institution: "Indian Institute of Technology Madras (IIT Madras)",
      year: "2022",
      grade: "Coursework Completed",
    },
  ],
  achievements: [
    "Promoted to Software Engineer / Analyst within 18 months at PibyThree.",
    "Multiple academic & enterprise hackathon awards across AI architecture.",
    "200+ Data Structures & Algorithms problems solved on LeetCode.",
    "Delivered 7 production systems across BFSI, retail, healthcare, and logistics.",
  ],
  skillRadials: [
    {
      name: "LangGraph & Multi-Agent Orchestration",
      shortName: "LangGraph",
      pct: 95,
      color: "#ff4d4d",
      category: "Agentic Systems",
      detail: "2+ yrs · 4 prod multi-agent systems",
    },
    {
      name: "FastAPI & Python 3.12+ Microservices",
      shortName: "FastAPI",
      pct: 96,
      color: "#ec4899",
      category: "Backend / API",
      detail: "Async SSE streaming · p95 < 2.4s",
    },
    {
      name: "LLM Guardrails & Observability",
      shortName: "Guardrails",
      pct: 93,
      color: "#22e5a8",
      category: "Evals & Infra",
      detail: "LangFuse · Phoenix · RAGAS · PII filters",
    },
    {
      name: "LiteLLM Multi-Provider Gateways",
      shortName: "LiteLLM",
      pct: 94,
      color: "#facc15",
      category: "Inference",
      detail: "4 LLM providers · -38% spend cut",
    },
    {
      name: "Graph RAG & Neo4j Multi-Hop",
      shortName: "Neo4j / Graph",
      pct: 90,
      color: "#3888ff",
      category: "Retrieval",
      detail: "1.2M nodes · +43% NDCG@10 lift",
    },
    {
      name: "Kubernetes, Helm & Cloud Infra",
      shortName: "K8s / Cloud",
      pct: 88,
      color: "#a855f7",
      category: "Platforms",
      detail: "AWS Bedrock · GCP Vertex · Terraform",
    },
    {
      name: "Demand Forecasting & Pricing ML",
      shortName: "TFT / ML",
      pct: 89,
      color: "#ff9f1c",
      category: "Forecasting",
      detail: "13% WAPE across 2,400 SKUs · R² 0.94",
    },
  ],
  skillCategories: [
    {
      category: "01 // AGENTIC SYSTEMS & LLM ORCHESTRATION",
      skills: [
        "LangGraph",
        "LangChain",
        "LlamaIndex",
        "Claude SDK",
        "Google ADK",
        "LiteLLM",
        "MCP Protocol",
        "CrewAI",
        "AutoGPT",
      ],
    },
    {
      category: "02 // KNOWLEDGE GRAPHS & RETRIEVAL (RAG)",
      skills: [
        "Neo4j Cypher",
        "Graph RAG",
        "Hybrid Search",
        "Pinecone",
        "FAISS",
        "OpenSearch",
        "pgvector",
        "Qdrant",
        "BM25",
        "RRF Fusion",
      ],
    },
    {
      category: "03 // EVALUATIONS, OBSERVABILITY & GUARDRAILS",
      skills: [
        "Celery Sidecars",
        "LangFuse",
        "Arize Phoenix",
        "LangSmith",
        "RAGAS",
        "Giskard",
        "OpenTelemetry",
        "PII Redaction",
        "DeepEval",
      ],
    },
    {
      category: "04 // CLOUD, CONTAINERS & LLMOPS",
      skills: [
        "Kubernetes",
        "Helm",
        "Terraform",
        "AWS Bedrock",
        "AWS SageMaker",
        "GCP Vertex AI",
        "Docker",
        "Redis",
        "FastAPI",
        "MLflow",
      ],
    },
    {
      category: "05 // MACHINE LEARNING & FORECASTING",
      skills: [
        "PyTorch",
        "Temporal Fusion Transformer (TFT)",
        "XGBoost",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Evidently AI",
        "ZenML",
      ],
    },
  ],
  activeLearning: [
    {
      title: "Advanced Multi-Agent Verification & Speculative Distillation",
      status: "ACTIVE_RESEARCH",
    },
    {
      title: "Self-Refining Neo4j Ontologies with Real-Time Embedding Synapses",
      status: "PROTOTYPING",
    },
  ],
  projects: [
    {
      id: "retail-intelligence",
      title: "Autonomous Retail Intelligence & Dynamic Promotion System",
      category: "AUTONOMOUS SYSTEMS",
      categoryColor: "#f59e0b",
      description:
        "Agentic forecasting and dynamic pricing system combining Temporal Fusion Transformer (TFT) demand forecasting and XGBoost/MLP pricing models with multi-step LLM validation.",
      metrics: "13% WAPE across 2,400 SKUs | R² 0.94 pricing | Pricing turnaround cut from 2 days to <15 min",
      stack: ["LangGraph", "PyTorch TFT", "XGBoost", "FastAPI", "Kubernetes", "AWS Bedrock"],
      archIcon: `⬡──[TFT_FORECAST]──➔[XGB_PRICING]──➔[AGENT_VALIDATION]──➔[API]`,
      githubUrl: "https://github.com/intragalactic-stranger",
      liveUrl: "https://ganeshan.dev",
    },
    {
      id: "graph-rag",
      title: "Graph RAG for Hyper-Personalized Product Recommendations",
      category: "GRAPH AI",
      categoryColor: "#ff4d4d",
      description:
        "Modeled 180K customers and 25K products as a 1.2M-node / 4.8M-edge Neo4j knowledge graph to enable multi-hop reasoning and dense vector traversal in a hybrid pipeline.",
      metrics: "+43% NDCG@10 relevancy lift | 0.89 precision & 0.92 answer relevancy on RAGAS benchmarks",
      stack: ["Neo4j", "Graph RAG", "Pinecone", "FastAPI", "RAGAS", "Claude 3.5 Sonnet"],
      archIcon: `[1.2M_NODES]──(MULTI-HOP)──➔[DENSE_VECTOR]──➔[RAGAS_EVAL: 0.92]`,
      githubUrl: "https://github.com/intragalactic-stranger",
      liveUrl: "https://ganeshan.dev",
    },
    {
      id: "pi-agent-idp",
      title: "Pi-Agent-IDP & Celery Asynchronous Evaluation Sidecar",
      category: "LLM INFRASTRUCTURE",
      categoryColor: "#3888ff",
      description:
        "Celery-based evaluation sidecar with isolated per-tenant queues, scaling asynchronous agent scoring across 6 tenants on 12 workers with strict safety and PII enforcement.",
      metrics: "~25,000 evals/day across 6 tenants | p95 scoring latency < 9s during batch spikes",
      stack: ["Celery", "Redis", "LangFuse", "Phoenix", "Docker", "FastAPI", "Python 3.12"],
      archIcon: `[TENANT_QUEUE]──➔[12_CELERY_WORKERS]──➔[PII_FILTER]──➔[LANGFUSE_TRACES]`,
      githubUrl: "https://github.com/intragalactic-stranger",
      liveUrl: "https://ganeshan.dev",
    },
    {
      id: "genai-in-a-box",
      title: "GenAI-in-a-Box & LiteLLM Multi-Provider Enterprise Gateway",
      category: "ML PLATFORMS",
      categoryColor: "#10b981",
      description:
        "Internal MLOps/LLMOps platform standardizing RAG and agent delivery across cloud and on-premise, paired with a LiteLLM gateway with per-tenant fallbacks and quality gates.",
      metrics: "Delivery time reduced 14w → 5w (-64%) | -38% LLM infrastructure spend reduction",
      stack: ["LiteLLM", "Kubernetes", "Helm", "Terraform", "FastAPI", "AWS", "GCP"],
      archIcon: `[LITELLM_GATEWAY]──➔[4_PROVIDERS]──➔[K8S_HELM_CLUSTER]──➔[-38%_COST]`,
      githubUrl: "https://github.com/intragalactic-stranger",
      liveUrl: "https://ganeshan.dev",
    },
  ],
  certifications: [
    {
      title: "Google Cloud Certified Professional Machine Learning Engineer",
      issuer: "Google Cloud",
      tag: "GCP_ML_PRO",
      tint: "blue",
      year: "2024",
    },
    {
      title: "AWS Certified Machine Learning Engineer – Associate",
      issuer: "Amazon Web Services",
      tag: "AWS_MLE_ASSOC",
      tint: "green",
      year: "2024",
    },
    {
      title: "Neo4j Certified Professional (Knowledge Graphs & Cypher)",
      issuer: "Neo4j",
      tag: "NEO4J_CERT_PRO",
      tint: "teal",
      year: "2024",
    },
    {
      title: "Anthropic Claude Certified Architect Foundations",
      issuer: "Anthropic",
      tag: "CLAUDE_ARCH",
      tint: "purple",
      year: "2024",
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      tag: "AWS_CCP",
      tint: "green",
      year: "2023",
    },
  ],
};
