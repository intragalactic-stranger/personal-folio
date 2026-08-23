"""Contact form schemas."""

from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    """Payload for submitting a contact message."""

    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(default="Portfolio Inquiry", max_length=150)
    message: str = Field(..., min_length=10, max_length=5000)


class ContactResponse(BaseModel):
    """Response returned upon contact message receipt."""

    status: str = "received"
    message: str
    timestamp: str
