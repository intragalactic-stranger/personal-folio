"""Amazon Bedrock streaming service with robust fallback."""

import asyncio
import logging
from collections.abc import AsyncGenerator
from typing import Any

import boto3
from botocore.exceptions import BotoCoreError, ClientError

from app.config import Settings
from app.schemas.chat import ChatMessage, ChatResponseChunk
from app.services.persona_service import PersonaService

logger = logging.getLogger(__name__)


class BedrockService:
    """Service to interact with Amazon Bedrock streaming inference API."""

    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self._client: Any = None
        self._client_initialized = False

    def _get_client(self) -> Any:
        """Lazily initialize and return the Bedrock Runtime client."""
        if not self._client_initialized:
            try:
                client_kwargs: dict[str, Any] = {"region_name": self.settings.aws_region}
                if self.settings.aws_access_key_id and self.settings.aws_secret_access_key:
                    client_kwargs["aws_access_key_id"] = self.settings.aws_access_key_id
                    client_kwargs["aws_secret_access_key"] = self.settings.aws_secret_access_key
                    if self.settings.aws_session_token:
                        client_kwargs["aws_session_token"] = self.settings.aws_session_token

                self._client = boto3.client("bedrock-runtime", **client_kwargs)
            except Exception as e:
                logger.warning("Could not initialize Amazon Bedrock client: %s", e)
                self._client = None
            self._client_initialized = True
        return self._client

    async def stream_chat_response(
        self, messages: list[ChatMessage]
    ) -> AsyncGenerator[ChatResponseChunk, None]:
        """Stream chat tokens from Amazon Bedrock or simulated intelligent fallback."""
        client = self._get_client()

        if client is not None:
            try:
                async for chunk in self._stream_from_bedrock(client, messages):
                    yield chunk
                return
            except (BotoCoreError, ClientError, Exception) as e:
                logger.warning(
                    "Bedrock invocation failed (%s). Falling back to local responder.", e
                )

        # Fallback intelligent streaming generator
        async for chunk in self._stream_fallback(messages):
            yield chunk

    async def _stream_from_bedrock(
        self, client: Any, messages: list[ChatMessage]
    ) -> AsyncGenerator[ChatResponseChunk, None]:
        """Invoke Amazon Bedrock converse_stream API."""
        system_prompt = [{"text": PersonaService.get_system_prompt()}]
        converse_messages = [
            {
                "role": "user" if m.role == "user" else "assistant",
                "content": [{"text": m.content}],
            }
            for m in messages
            if m.role in ("user", "assistant")
        ]

        def _sync_call() -> Any:
            return client.converse_stream(
                modelId=self.settings.bedrock_model_id,
                messages=converse_messages,
                system=system_prompt,
                inferenceConfig={"maxTokens": 1024, "temperature": 0.7, "topP": 0.9},
            )

        response = await asyncio.to_thread(_sync_call)
        stream = response.get("stream")

        if stream:
            for event in stream:
                if "contentBlockDelta" in event:
                    text = event["contentBlockDelta"]["delta"].get("text", "")
                    if text:
                        yield ChatResponseChunk(delta=text, done=False, provider="bedrock")
                elif "messageStop" in event:
                    break

        yield ChatResponseChunk(delta="", done=True, provider="bedrock")

    async def _stream_fallback(
        self, messages: list[ChatMessage]
    ) -> AsyncGenerator[ChatResponseChunk, None]:
        """Simulate intelligent terminal AI response when Bedrock is in offline/demo mode."""
        last_user_message = messages[-1].content.lower() if messages else ""

        if any(w in last_user_message for w in ["hi", "hello", "who are you", "who is ganeshan"]):
            response_text = (
                "Greetings! I am the AI Assistant representing **Ganeshan Arumuganainar** "
                "— AI Software Engineer (Agentic Systems, Evaluations & LLM Infrastructure).\n\n"
                "Ganeshan designs and builds production multi-agent systems (LangGraph), "
                "evaluation sidecars (Celery, LangFuse, RAGAS), and hybrid Graph RAG pipelines "
                "deployed on Kubernetes across AWS, GCP, and on-premise. He has delivered 7 "
                "production systems for 6 clients across BFSI, retail, healthcare, and logistics."
                "\n\nHow can I assist you with Ganeshan's engineering background today?\n\n"
                "*(Tip: Type `/projects`, `/skills`, `/experience`, or `/contact`)*"
            )
        elif "project" in last_user_message or "/projects" in last_user_message:
            response_text = (
                "### Ganeshan's Featured Production Systems:\n\n"
                "1. **Autonomous Retail Intelligence & Dynamic Promotion System**\n"
                "   - TFT demand forecasting (13% WAPE) + XGBoost/MLP pricing (R² 0.94).\n"
                "   - LLM reasoning agents cut pricing turnaround from 2 days to <15 min.\n\n"
                "2. **Graph RAG for Hyper-Personalized Product Recommendations**\n"
                "   - 1.2M-node / 4.8M-edge Neo4j graph delivering +43% NDCG@10 lift.\n"
                "   - Evaluated with RAGAS (0.89 precision, 0.92 relevancy).\n\n"
                "3. **Pi-Agent-IDP & Celery Evaluation Sidecar**\n"
                "   - Asynchronous per-tenant agent evaluation (~25K evals/day, p95 < 9s).\n"
                "   - On-premise agent identity and safety guardrails across 6 deployments.\n\n"
                "4. **GenAI-in-a-Box & Multi-LLM Gateway**\n"
                "   - Standardized MLOps platform (cut SDLC from 14w to 5w).\n"
                "   - LiteLLM gateway with per-tenant fallbacks cutting spend 38%."
            )
        elif (
            "skill" in last_user_message
            or "stack" in last_user_message
            or "/skills" in last_user_message
        ):
            response_text = (
                "### Technical Arsenal & Certifications:\n\n"
                "- **Agents & Orchestration**: LangGraph, LangChain, LlamaIndex, "
                "LiteLLM Gateway, MCP, Claude SDK, Google ADK.\n"
                "- **Retrieval & Graphs**: Hybrid RAG, Graph RAG, Neo4j, Pinecone, FAISS, "
                "OpenSearch, pgvector.\n"
                "- **Eval & Guardrails**: LangFuse, Phoenix, LangSmith, RAGAS, Giskard, "
                "OpenTelemetry.\n"
                "- **Infra & Cloud**: Kubernetes, Helm, Terraform, Docker, Celery, Redis, "
                "AWS Bedrock, GCP Vertex AI.\n"
                "- **Languages & ML**: Python, C++, SQL, TypeScript, PyTorch, MLflow.\n\n"
                "**Certifications**: GCP Professional ML Engineer, AWS ML Engineer Associate, "
                "Neo4j Certified Professional, Anthropic Claude Certified Architect."
            )
        elif "experience" in last_user_message or "/experience" in last_user_message:
            response_text = (
                "### Production Experience:\n\n"
                "- **PibyThree Consulting Services Pvt. Ltd.** | Mumbai, India\n"
                "  * **Software Engineer / Analyst – AI** (Jan 2026 – Present)\n"
                "    - Scaled async agent scoring to ~25K evals/day with Celery sidecar.\n"
                "    - Built Pi-Agent-IDP core SDK and GenAI-in-a-Box MLOps platform.\n"
                "  * **Associate Software Engineer** (Jul 2024 – Dec 2025)\n"
                "    - Shipped LangGraph multi-agent sales platform (13% WAPE, saved 30 hrs/wk).\n"
                "    - Built hybrid RAG insurance domain assistant (+0.19 recall@5) & booking."
            )
        elif "contact" in last_user_message or "/contact" in last_user_message:
            response_text = (
                "### Direct Contact Channels:\n\n"
                "- **Email**: ganeshanarumuganainar@gmail.com\n"
                "- **Phone**: +91 8169956401\n"
                "- **LinkedIn**: linkedin.com/in/ganeshannainar\n"
                "- **GitHub**: github.com/intragalactic-stranger\n"
                "- **Website**: ganeshan.dev\n\n"
                "You can also use the terminal transmission form on the page!"
            )
        else:
            response_text = (
                f"Acknowledged query: `{messages[-1].content}`\n\n"
                "Ganeshan specializes in productionizing reliable multi-agent systems, "
                "evaluation pipelines (LangFuse, RAGAS, Celery), and hybrid Graph RAG. "
                "Feel free to ask about his work at PibyThree, retail forecasting models, "
                "or how to get in touch!"
            )

        words = response_text.split(" ")
        for i, word in enumerate(words):
            chunk = word + (" " if i < len(words) - 1 else "")
            yield ChatResponseChunk(delta=chunk, done=False, provider="offline-simulated")
            await asyncio.sleep(0.02)

        yield ChatResponseChunk(delta="", done=True, provider="offline-simulated")
