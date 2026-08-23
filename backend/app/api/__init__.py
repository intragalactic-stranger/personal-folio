"""API router package."""

from fastapi import APIRouter

from app.api.chat import router as chat_router
from app.api.contact import router as contact_router
from app.api.health import router as health_router

api_router = APIRouter(prefix="/api")
api_router.include_router(health_router, tags=["Health"])
api_router.include_router(chat_router, tags=["Chat"])
api_router.include_router(contact_router, tags=["Contact"])

__all__ = ["api_router"]
