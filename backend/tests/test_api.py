"""Integration and unit tests for the FastAPI backend API."""

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.asyncio
async def test_health_endpoint() -> None:
    """Test health check endpoint returns OK."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert data["service"] == "personal-folio-backend"


@pytest.mark.asyncio
async def test_contact_endpoint_valid() -> None:
    """Test contact submission with valid data."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        payload = {
            "name": "Jane Developer",
            "email": "jane@example.com",
            "subject": "Collaboration Opportunity",
            "message": "Hello Ganeshan, I would like to discuss an AI project.",
        }
        response = await client.post("/api/contact", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "received"
        assert "Jane Developer" in data["message"]


@pytest.mark.asyncio
async def test_contact_endpoint_invalid() -> None:
    """Test contact submission fails with invalid payload."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        payload = {
            "name": "J",
            "email": "invalid-email",
            "message": "short",
        }
        response = await client.post("/api/contact", json=payload)
        assert response.status_code == 422


@pytest.mark.asyncio
async def test_chat_streaming_endpoint() -> None:
    """Test chat endpoint returns SSE stream."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        payload = {
            "messages": [
                {"role": "user", "content": "Hello Ganeshan, what are your featured projects?"}
            ],
            "stream": True,
        }
        response = await client.post("/api/chat", json=payload)
        assert response.status_code == 200
        assert "text/event-stream" in response.headers.get("content-type", "")
        content = response.text
        assert "data:" in content


@pytest.mark.asyncio
async def test_root_serves_static() -> None:
    """Test root endpoint serves built frontend index.html when dist exists."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/")
        assert response.status_code == 200
        assert "GANESHAN_ARUMUGANAINAR" in response.text
