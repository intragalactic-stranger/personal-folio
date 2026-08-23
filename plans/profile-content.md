# Profile Content: Ganeshan Arumuganainar

## Identity
- **Name**: Ganeshan Arumuganainar
- **Role**: AI Software Engineer — Agentic Systems, Evaluations & LLM Infrastructure
- **Location**: Mumbai, India
- **Contact Email**: ganeshanarumuganainar@gmail.com
- **Phone**: +91 8169956401
- **GitHub**: https://github.com/intragalactic-stranger
- **LinkedIn**: https://linkedin.com/in/ganeshannainar
- **Website**: https://ganeshan.dev

## Summary / Bio
AI Software Engineer (2+ yrs, promoted within 18 months) focused on making LLM agents reliable in production evaluations, guardrails, and observability. Build LangGraph-based multi-agent systems and hybrid/graph retrieval pipelines, deployed on Kubernetes across AWS, GCP, and on-premise. Own systems end to end: architecture, build, deployment, and handover to client teams. Delivered 7 production systems for 6 clients across BFSI, retail, healthcare, and logistics.

## Work Experience
### PibyThree Consulting Services Pvt. Ltd. | Mumbai, India (Jul 2024 – Present)
*Enterprise AI consultancy. Delivered 7 production systems for 6 clients across BFSI, retail, healthcare, and logistics.*

#### Software Engineer / Analyst – AI (Jan 2026 – Present)
- **Celery Evaluation Sidecar**: Designed a Celery-based evaluation sidecar with isolated per-tenant queues, scaling asynchronous agent scoring to ~25K evaluations/day across 6 tenants on 12 workers; held p95 scoring latency under 9s during batch spikes.
- **Pi-Agent-IDP**: Built core SDK and scoring modules for an on-premise agentic identity and evaluation platform, plus PII and safety guardrail enforcement; adopted by 4 internal teams across 6 client deployments.
- **GenAI-in-a-Box**: Co-built an internal MLOps/LLMOps platform standardizing RAG and agent delivery across cloud and on-premise (FastAPI, Kubernetes, Helm, Terraform); cut delivery SDLC from ~12–16 weeks to ~5–6 weeks across 7 engagements.
- **LiteLLM Gateway**: Routed traffic across 4 LLM providers through a LiteLLM gateway with per-tenant fallbacks and quality gates, cutting LLM spend 38% with evaluation scores held within 2% of baseline.

#### Associate Software Engineer (Jul 2024 – Dec 2025)
- **Production RAG & Agents**: Built modular, decoupled RAG and agent pipelines (LangGraph, LangChain, LlamaIndex) serving ~40K requests/day at p95 2.4s on Kubernetes, across cloud and on-premise.
- **LangGraph Sales Platform**: Shipped a multi-agent sales platform (forecasting, meeting transcription, market research agents) used by 12 reps, removing ~30 hrs/week of manual work over a 3-month rollout; forecasting agent at 13% WAPE across 2,400 SKUs.
- **Domain Agents**: Hybrid RAG insurance assistant lifting recall@5 from 0.62 to 0.81 on a 1,200-question benchmark (BM25 + dense + cross-encoder reranker); booking agent completing 90% of ~1,800 monthly bookings without human handoff.
- **Multimodal GenAI**: Cash-flow analysis on Claude 3.5 Sonnet; VGG16 + Gemini diagnostic imaging in healthcare.

## Featured Projects
1. **Autonomous Retail Intelligence & Dynamic Promotion System**
   - *Stack*: LangGraph · Temporal Fusion Transformer (TFT) · XGBoost · MLP · Gemini · MLflow
   - *Impact*: TFT demand model at 13% WAPE across 2,400 SKUs, and XGBoost/MLP pricing model at $R^2$ 0.94 (MAE 4.1% of list price). Added LLM reasoning agents validating price recommendations against 10+ market signals, cutting pricing turnaround from ~2 days to under 15 minutes.
2. **Graph RAG for Hyper-Personalized Product Recommendations**
   - *Stack*: Neo4j · Vector Embeddings · Hybrid Retrieval · RAGAS · FastAPI
   - *Impact*: Modeled 180K customers and 25K products as a 1.2M-node / 4.8M-edge Neo4j graph for multi-hop reasoning (+43% NDCG@10). Scored 0.89 context precision and 0.92 answer relevancy on RAGAS.
3. **Pi-Agent-IDP & Evaluation Sidecar**
   - *Stack*: Python · Celery · Redis · LangFuse · Phoenix · FastAPI · Kubernetes
   - *Impact*: Scaled asynchronous agent scoring to ~25K evaluations/day with p95 < 9s across 6 tenants; comprehensive PII and safety guardrail enforcement.
4. **GenAI-in-a-Box & Multi-LLM Gateway**
   - *Stack*: LiteLLM · FastAPI · Kubernetes · Helm · Terraform · AWS Bedrock · GCP Vertex AI
   - *Impact*: Cut delivery SDLC from 14 weeks to 5 weeks and reduced LLM spend by 38% with per-tenant fallbacks and quality gates.

## Technical Skills
- **Languages**: Python, C++, SQL, TypeScript
- **Agents & Frameworks**: LangGraph, LangChain, LlamaIndex, FastAPI, MCP, LiteLLM Gateway, Claude SDK, Google ADK, fine-tuning
- **Retrieval**: Hybrid RAG, Graph RAG, Document Intelligence, Neo4j, Pinecone, FAISS, Chroma, OpenSearch, pgvector
- **Eval & Guardrails**: LangFuse, Phoenix, LangSmith, RAGAS, Giskard, LLM guardrails, OpenTelemetry, Datadog
- **Infra & Backend**: Docker, Kubernetes, Helm, Terraform, Celery, message queues, Redis, PostgreSQL, MongoDB, CI/CD, pytest
- **Cloud**: AWS (Bedrock, SageMaker AI, ECS Fargate, EKS, Lambda), GCP Vertex AI, Databricks, on-premise
- **ML**: PyTorch, TensorFlow, scikit-learn, NLP, MLflow, ZenML, Evidently

## Certifications
- Google Cloud Professional ML Engineer
- AWS Certified ML Engineer - Associate
- Neo4j Certified Professional
- Anthropic Claude Certified Architect - Foundations
- AWS Certified Cloud Practitioner

## Education
- **B.E. Computer Engineering, Honours in AI & ML** | SIES GST, University of Mumbai, 2024 (CGPA 9.07 / 10)
- **Foundation Programme in Data Science** | Indian Institute of Technology Madras (IIT Madras), 2022 Coursework
