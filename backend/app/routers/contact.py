import logging
import uuid
from datetime import datetime, timezone
from collections import defaultdict
from fastapi import APIRouter, HTTPException, Request, BackgroundTasks
from backend.app.schemas import ContactRequest, ContactResponse
from backend.app.services.email_service import send_inquiry_notification

logger = logging.getLogger("portfolio.contact")
router = APIRouter(prefix="/api", tags=["Contact"])

# Simple thread-safe in-memory rate limiter per IP: max 5 requests per 60 seconds
_ip_requests = defaultdict(list)
RATE_LIMIT_SECONDS = 60
MAX_REQUESTS_PER_WINDOW = 5


def check_rate_limit(client_ip: str):
    now = datetime.now(timezone.utc).timestamp()
    timestamps = _ip_requests[client_ip]
    # Filter timestamps within current window
    valid_timestamps = [t for t in timestamps if now - t < RATE_LIMIT_SECONDS]
    _ip_requests[client_ip] = valid_timestamps

    if len(valid_timestamps) >= MAX_REQUESTS_PER_WINDOW:
        logger.warning("Rate limit exceeded for IP %s", client_ip)
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Please wait a minute before submitting another message."
        )
    _ip_requests[client_ip].append(now)


@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(
    payload: ContactRequest,
    request: Request,
    background_tasks: BackgroundTasks
):
    """
    Submits an inquiry message.
    Validates payload structure, enforces rate limiting, dispatches email notification
    to rohitjigarmaheshbhai@gmail.com, and records the request.
    Does not expose sensitive credentials in code or response.
    """
    client_ip = request.client.host if request.client else "unknown"
    check_rate_limit(client_ip)

    ticket_id = f"MSG-{uuid.uuid4().hex[:8].upper()}"
    timestamp_str = datetime.now(timezone.utc).isoformat()

    # Log safe metadata (sanitized name and subject, without storing raw sensitive credentials)
    logger.info(
        "Contact form message accepted. Ticket: %s | From: %s | Subject: %s",
        ticket_id,
        payload.name[:30],
        payload.subject[:40]
    )

    # Queue asynchronous email notification to Jigar Rohit's inbox
    background_tasks.add_task(
        send_inquiry_notification,
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        ticket_id=ticket_id,
        timestamp=timestamp_str,
        client_ip=client_ip
    )

    return ContactResponse(
        success=True,
        message="Thank you! Your message has been received. Jigar will get back to you shortly.",
        ticket_id=ticket_id,
        timestamp=timestamp_str
    )
