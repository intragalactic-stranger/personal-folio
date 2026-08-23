import { PROFILE_DATA } from "../data/profile";

export class PersonaService {
  public static generateResponse(userInput: string): string {
    const q = userInput.toLowerCase().trim();

    if (q === "/projects" || q.includes("project") || q.includes("build") || q.includes("work")) {
      return (
        "### Ganeshan's Featured Production Systems:\n\n" +
        "1. **Autonomous Retail Intelligence & Dynamic Promotion System**\n" +
        "   - TFT demand forecasting (13% WAPE across 2,400 SKUs) + XGBoost/MLP pricing (R² 0.94).\n" +
        "   - Reasoning agents cut pricing turnaround from 2 days to <15 min.\n\n" +
        "2. **Graph RAG for Hyper-Personalized Product Recommendations**\n" +
        "   - 1.2M-node / 4.8M-edge Neo4j graph (+43% NDCG@10 lift, 0.89 precision on RAGAS).\n\n" +
        "3. **Pi-Agent-IDP & Celery Evaluation Sidecar**\n" +
        "   - Asynchronous per-tenant agent evaluation (~25K evals/day, p95 < 9s).\n" +
        "   - Safety guardrails & identity SDK across 6 enterprise client deployments.\n\n" +
        "4. **GenAI-in-a-Box & LiteLLM Gateway**\n" +
        "   - Standardized MLOps platform (SDLC cut from 14w to 5w) with -38% LLM spend."
      );
    }

    if (q === "/skills" || q.includes("skill") || q.includes("stack") || q.includes("tech")) {
      return (
        "### Technical Arsenal & Verified Certifications:\n\n" +
        "- **Agentic Frameworks**: LangGraph, LangChain, LlamaIndex, LiteLLM Gateway, Claude SDK, Google ADK, MCP.\n" +
        "- **Retrieval & Graphs**: Neo4j (Certified), Hybrid RAG, Graph RAG, Pinecone, FAISS, OpenSearch, pgvector.\n" +
        "- **Evals & Guardrails**: Celery, LangFuse, Phoenix, LangSmith, RAGAS, Giskard, OpenTelemetry.\n" +
        "- **Cloud & Infra**: AWS (Bedrock, SageMaker, EKS, ECS), GCP Vertex AI, Kubernetes, Helm, Terraform, Docker, Redis.\n" +
        "- **Languages & ML**: Python, C++, SQL, TypeScript, PyTorch, MLflow, Evidently.\n\n" +
        "**Certifications**: GCP Professional ML Engineer, AWS ML Engineer Associate, Neo4j Certified Pro, Claude Certified Architect."
      );
    }

    if (q === "/experience" || q.includes("experience") || q.includes("pibythree") || q.includes("career")) {
      return (
        "### Production Experience:\n\n" +
        "- **PibyThree Consulting Services Pvt. Ltd.** | Mumbai, India\n" +
        "  * **Software Engineer / Analyst – AI** (Jan 2026 – Present)\n" +
        "    - Promoted within 18 months. Leading agentic architecture and eval infrastructure.\n" +
        "    - Scaled async scoring to ~25K evals/day with Celery sidecar (p95 < 9s).\n" +
        "    - Built Pi-Agent-IDP core SDK and GenAI-in-a-Box MLOps platform.\n" +
        "  * **Associate Software Engineer** (Jul 2024 – Dec 2025)\n" +
        "    - Shipped LangGraph multi-agent sales platform (13% WAPE, saved 30 hrs/wk).\n" +
        "    - Shipped hybrid RAG insurance assistant (+0.19 recall@5) and booking agent."
      );
    }

    if (q === "/contact" || q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
      return (
        "### Direct Transmission Channels:\n\n" +
        `- **Email**: [${PROFILE_DATA.socials.email}](mailto:${PROFILE_DATA.socials.email})\n` +
        `- **Phone**: ${PROFILE_DATA.phone}\n` +
        `- **LinkedIn**: [linkedin.com/in/ganeshannainar](${PROFILE_DATA.socials.linkedin})\n` +
        `- **GitHub**: [github.com/intragalactic-stranger](${PROFILE_DATA.socials.github})\n` +
        `- **Website**: [ganeshan.dev](${PROFILE_DATA.socials.website})\n\n` +
        "You can also use the interactive terminal form on this site to send an inquiry directly."
      );
    }

    if (q.includes("sidecar") || q.includes("eval") || q.includes("celery")) {
      return (
        "### Celery-Based Evaluation Sidecar Architecture:\n\n" +
        "Ganeshan architected a decoupled evaluation sidecar using Celery with isolated per-tenant queues:\n" +
        "- **Throughput**: ~25,000 asynchronous agent evaluations/day across 6 tenants on 12 workers.\n" +
        "- **Latency**: Held p95 scoring latency strictly under 9s even during large batch ingestion spikes.\n" +
        "- **Guardrails**: Integrated real-time PII redaction, safety checks, and hallucination evaluations via LangFuse & Phoenix."
      );
    }

    if (q.includes("graph") || q.includes("neo4j") || q.includes("rag")) {
      return (
        "### Graph RAG Recommendation Engine:\n\n" +
        "Ganeshan modeled 180K customers and 25K products as a 1.2M-node / 4.8M-edge Neo4j knowledge graph:\n" +
        "- **Reasoning**: Enabled multi-hop graph traversal combined with dense vector retrieval.\n" +
        "- **Performance**: Delivered a **+43% NDCG@10 lift** over collaborative-filtering baselines.\n" +
        "- **Validation**: Scored 0.89 context precision and 0.92 answer relevancy on RAGAS benchmarks."
      );
    }

    if (q.includes("hello") || q.includes("hi") || q.includes("who are you") || q.includes("who is")) {
      return (
        `Greetings! I am the Chrome Gemini AI Assistant for **${PROFILE_DATA.name}** ` +
        `— AI Software Engineer (Agentic Systems, Evaluations & LLM Infrastructure).\n\n` +
        `Ganeshan specializes in productionizing reliable multi-agent systems (LangGraph), ` +
        `evaluation sidecars (Celery), and Graph RAG architectures (Neo4j) on Kubernetes.\n\n` +
        `Ask me anything about Ganeshan's 7 production deliveries, system architectures, or certifications!`
      );
    }

    return (
      `Acknowledged query: \`${userInput}\`\n\n` +
      `Ganeshan focuses on building production-resilient AI systems, evaluation pipelines ` +
      `(LangFuse, RAGAS, Celery), and hybrid Graph RAG on Kubernetes. ` +
      `Feel free to ask about his work at PibyThree Consulting, retail pricing models, or technical stack!`
    );
  }
}
