"""Chat request and response schemas."""

from typing import Literal

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    """Single message in a chat history."""

    role: Literal["user", "assistant", "system"]
    content: str = Field(..., min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    """Payload for submitting a chat query."""

    messages: list[ChatMessage] = Field(..., min_length=1)
    stream: bool = True
    session_id: str | None = None


class ChatResponseChunk(BaseModel):
    """Single token chunk streamed back via SSE."""

    delta: str
    done: bool = False
    provider: str = "bedrock"
