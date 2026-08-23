/**
 * Portfolio profile content for Ganeshan Arumuganainar — AI Software Engineer.
 * Grounded in verified CV experience, projects, skills, and certifications.
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  metrics: string;
  githubUrl: string;
  liveUrl: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  summary?: string;
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  tag: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  grade: string;
}

export interface ProfileData {
  name: string;
  role: string;
  headline: string;
  tagline: string;
  nodeLocation: string;
  status: string;
  phone: string;
  bio: string[];
  projects: Project[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  certifications: Certification[];
  education: EducationItem[];
  achievements: string[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
    website: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  name: "Ganeshan Arumuganainar",
  role: "AI Software Engineer",
  headline: "Agentic Systems, Evaluations & LLM Infrastructure",
  tagline: "Engineering production-reliable multi-agent systems, evaluation sidecars, and hybrid graph retrieval pipelines deployed on Kubernetes.",
  nodeLocation: "MUMBAI, INDIA // ASIA-SOUTH1",
  status: "ONLINE // DELIVERING PRODUCTION AI",
  phone: "+91 8169956401",
  bio: [
    "AI Software Engineer (2+ yrs, promoted within 18 months) focused on making LLM agents reliable in production evaluations, guardrails, and observability.",
    "Build LangGraph-based multi-agent systems and hybrid/graph retrieval pipelines, deployed on Kubernetes across AWS, GCP, and on-premise.",
    "Own systems end-to-end: architecture, build, deployment, and client handover. Delivered 7 production systems for 6 clients across BFSI, retail, healthcare, and logistics.",
  ],
  projects: [
    {
      id: "retail-intelligence",
      title: "Autonomous Retail Intelligence & Dynamic Promotion System",
      category: "Autonomous Systems // Forecasting & Pricing",
      description: "Agentic forecasting and dynamic pricing system combining Temporal Fusion Transformer (TFT) demand forecasting (13% WAPE across 2,400 SKUs) and XGBoost/MLP pricing model (R² 0.94, MAE 4.1% of list price). Integrated LLM reasoning agents validating price recommendations against 10+ market signals.",
      stack: ["LangGraph", "Temporal Fusion Transformer", "XGBoost", "MLP", "Gemini", "MLflow"],
      metrics: "Turnaround cut from ~2 days to <15 min, 13% WAPE",
      githubUrl: "https://github.com/intragalactic-stranger",
      liveUrl: "https://ganeshan.dev",
    },
    {
      id: "graph-rag",
      title: "Graph RAG for Hyper-Personalized Product Recommendations",
      category: "Graph AI // Hybrid Retrieval",
      description: "Modeled 180K customers and 25K products as a 1.2M-node / 4.8M-edge Neo4j knowledge graph to enable multi-hop reasoning. Combined graph traversal with dense vector retrieval in a hybrid pipeline evaluated with RAGAS.",
      stack: ["Neo4j", "Vector Embeddings", "Hybrid Retrieval", "RAGAS", "FastAPI"],
      metrics: "+43% NDCG@10 lift, 0.89 precision & 0.92 relevancy",
      githubUrl: "https://github.com/intragalactic-stranger",
      liveUrl: "https://ganeshan.dev",
    },
    {
      id: "pi-agent-eval",
      title: "Pi-Agent-IDP & Evaluation Sidecar",
      category: "LLM Infrastructure // Observability & Guardrails",
      description: "Celery-based evaluation sidecar with isolated per-tenant queues, scaling asynchronous agent scoring. Built core SDK and scoring modules for an on-premise agentic identity platform with PII and safety guardrail enforcement.",
      stack: ["Python", "Celery", "Redis", "LangFuse", "Phoenix", "Kubernetes", "FastAPI"],
      metrics: "~25K evals/day across 6 tenants, p95 latency < 9s",
      githubUrl: "https://github.com/intragalactic-stranger",
      liveUrl: "https://ganeshan.dev",
    },
    {
      id: "genai-in-a-box",
      title: "GenAI-in-a-Box & Multi-LLM LiteLLM Gateway",
      category: "MLOps / LLMOps // Gateway Routing",
      description: "Internal MLOps platform standardizing RAG and agent delivery across cloud and on-premise. Routed traffic across 4 LLM providers through a LiteLLM gateway with per-tenant fallbacks, budget limits, and quality gates.",
      stack: ["LiteLLM", "FastAPI", "Kubernetes", "Helm", "Terraform", "AWS Bedrock", "GCP Vertex AI"],
      metrics: "SDLC cut from 14w to 5w, 38% LLM cost reduction",
      githubUrl: "https://github.com/intragalactic-stranger",
      liveUrl: "https://ganeshan.dev",
    },
  ],
  skillCategories: [
    {
      category: "01 // AGENTS & FRAMEWORKS",
      skills: ["LangGraph", "LangChain", "LlamaIndex", "FastAPI", "MCP", "LiteLLM Gateway", "Claude SDK", "Google ADK", "Fine-Tuning"],
    },
    {
      category: "02 // RETRIEVAL & VECTOR SEARCH",
      skills: ["Hybrid RAG", "Graph RAG", "Document Intelligence", "Neo4j", "Pinecone", "FAISS", "Chroma", "OpenSearch", "pgvector"],
    },
    {
      category: "03 // EVALUATIONS & GUARDRAILS",
      skills: ["LangFuse", "Phoenix", "LangSmith", "RAGAS", "Giskard", "LLM Guardrails", "OpenTelemetry", "Datadog"],
    },
    {
      category: "04 // CLOUD & INFRASTRUCTURE",
      skills: ["AWS (Bedrock, SageMaker AI, ECS Fargate, EKS, Lambda)", "GCP Vertex AI", "Databricks", "Kubernetes", "Helm", "Terraform", "Docker", "Celery", "Redis", "PostgreSQL", "MongoDB", "CI/CD"],
    },
    {
      category: "05 // LANGUAGES & MACHINE LEARNING",
      skills: ["Python", "C++", "SQL", "TypeScript", "PyTorch", "TensorFlow", "scikit-learn", "NLP", "MLflow", "ZenML", "Evidently"],
    },
  ],
  experience: [
    {
      period: "JAN 2026 — PRESENT",
      role: "Software Engineer / Analyst – AI",
      company: "PibyThree Consulting Services Pvt. Ltd.",
      location: "Mumbai, India",
      summary: "Promoted within 18 months. Leading agentic architecture, evaluation pipelines, and LLM infrastructure.",
      highlights: [
        "Designed Celery evaluation sidecar scaling asynchronous agent scoring to ~25K evals/day across 6 tenants on 12 workers with p95 < 9s.",
        "Pi-Agent-IDP: built core SDK and scoring modules for on-premise agentic identity & evaluation, with PII and safety guardrails across 6 deployments.",
        "GenAI-in-a-Box: co-built internal MLOps/LLMOps platform standardizing RAG and agent delivery across cloud and on-premise (cut SDLC from 14 to 5 weeks).",
        "Routed traffic across 4 LLM providers via LiteLLM gateway with per-tenant fallbacks and quality gates, cutting LLM spend 38% within 2% evaluation baseline.",
      ],
    },
    {
      period: "JUL 2024 — DEC 2025",
      role: "Associate Software Engineer",
      company: "PibyThree Consulting Services Pvt. Ltd.",
      location: "Mumbai, India",
      highlights: [
        "Built modular, decoupled RAG & agent pipelines (LangGraph, LangChain, LlamaIndex) serving ~40K req/day at p95 2.4s on Kubernetes.",
        "Shipped LangGraph multi-agent sales platform (forecasting, meeting transcription, market research) used by 12 reps, saving ~30 hrs/week with 13% WAPE.",
        "Domain agents: hybrid RAG insurance assistant lifting recall@5 from 0.62 to 0.81 on 1,200-q benchmark; booking agent completing 90% of ~1,800 monthly bookings.",
        "Multimodal GenAI: cash-flow analysis on Claude 3.5 Sonnet; VGG16 + Gemini diagnostic imaging in healthcare.",
      ],
    },
  ],
  certifications: [
    { title: "Google Cloud Professional ML Engineer", issuer: "Google Cloud", tag: "GCP_ML" },
    { title: "AWS Certified ML Engineer - Associate", issuer: "Amazon Web Services", tag: "AWS_MLE" },
    { title: "Neo4j Certified Professional", issuer: "Neo4j", tag: "GRAPH_AI" },
    { title: "Anthropic Claude Certified Architect - Foundations", issuer: "Anthropic", tag: "CLAUDE_ARCH" },
    { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", tag: "AWS_CCP" },
  ],
  education: [
    {
      degree: "B.E. Computer Engineering, Honours in AI & ML",
      institution: "SIES GST, University of Mumbai",
      year: "2024",
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
    "Multiple academic and enterprise awards across AI competitions and hackathons.",
    "200+ data structures & algorithms problems solved on LeetCode.",
  ],
  socials: {
    github: "https://github.com/intragalactic-stranger",
    linkedin: "https://linkedin.com/in/ganeshannainar",
    email: "ganeshanarumuganainar@gmail.com",
    website: "https://ganeshan.dev",
  },
};
