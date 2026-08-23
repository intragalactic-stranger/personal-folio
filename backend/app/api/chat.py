"""Chat API endpoint with Server-Sent Events streaming."""

from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import APIRouter, Depends
from sse_starlette.sse import EventSourceResponse

from app.config import Settings, get_settings
from app.schemas.chat import ChatRequest
from app.services.bedrock_service import BedrockService

router = APIRouter()


@router.post("/chat")
async def chat_endpoint(
    request: ChatRequest,
    settings: Annotated[Settings, Depends(get_settings)],
) -> EventSourceResponse:
    """Stream chat responses using Server-Sent Events (SSE)."""
    service = BedrockService(settings)

    async def event_generator() -> AsyncGenerator[dict[str, str], None]:
        async for chunk in service.stream_chat_response(request.messages):
            yield {
                "event": "message",
                "data": chunk.model_dump_json(),
            }

    return EventSourceResponse(event_generator())
