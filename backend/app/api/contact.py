"""Contact form submission API endpoint."""

import logging
from datetime import UTC, datetime

from fastapi import APIRouter

from app.schemas.contact import ContactRequest, ContactResponse

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactRequest) -> ContactResponse:
    """Handle contact inquiry submissions."""
    now_iso = datetime.now(UTC).isoformat()
    logger.info(
        "Received contact inquiry from %s <%s>: %s", payload.name, payload.email, payload.subject
    )

    return ContactResponse(
        status="received",
        message=f"Thank you, {payload.name}! Your message has been received.",
        timestamp=now_iso,
    )
