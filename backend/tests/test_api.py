import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "Jigar Rohit" in data["service"]


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "timestamp" in data
    assert "version" in data


def test_get_all_projects():
    response = client.get("/api/projects")
    assert response.status_code == 200
    projects = response.json()
    assert len(projects) == 3
    slugs = [p["slug"] for p in projects]
    assert "alef-migration" in slugs
    assert "ims-inventory-system" in slugs
    assert "namogpt-platform" in slugs


def test_get_project_by_slug_success():
    response = client.get("/api/projects/alef-migration")
    assert response.status_code == 200
    project = response.json()
    assert project["title"] == "Alef Migration"
    assert "two million records" in project["headline"].lower()
    assert len(project["architecture"]["flow_diagram"]) == 8


def test_get_project_by_slug_not_found():
    response = client.get("/api/projects/unknown-slug")
    assert response.status_code == 404


def test_contact_form_valid():
    from backend.app.routers.contact import _ip_requests
    from backend.app.database import get_inquiry_by_ticket_id

    _ip_requests.clear()
    payload = {
        "name": "Alex TechRecruiter",
        "email": "alex.recruiter@example.com",
        "subject": "Interview Opportunity: Senior Python / AI Engineer",
        "message": "Hi Jigar, we were thoroughly impressed by your portfolio and engineering experience."
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "ticket_id" in data
    assert data["ticket_id"].startswith("MSG-")

    # Verify inquiry was immediately saved to the SQLite database
    saved = get_inquiry_by_ticket_id(data["ticket_id"])
    assert saved is not None
    assert saved["ticket_id"] == data["ticket_id"]
    assert saved["name"] == "Alex TechRecruiter"
    assert saved["email"] == "alex.recruiter@example.com"
    assert saved["subject"] == "Interview Opportunity: Senior Python / AI Engineer"
    assert "thoroughly impressed" in saved["message"]
    assert saved["email_status"] == "pending"


def test_contact_form_invalid_email():
    payload = {
        "name": "Jane Doe",
        "email": "not-an-email",
        "subject": "Hello",
        "message": "Short message"
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 422  # Pydantic validation error


def test_contact_form_short_message():
    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "subject": "Hello",
        "message": "Too short"  # Min length is 10
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 422


def test_mcp_simulation():
    payload = {
        "client_prompt": "Check database table schema for migrated assets",
        "selected_tool": "validate_schema",
        "tool_arguments": {"table": "assets"}
    }
    response = client.post("/api/simulations/mcp", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["jsonrpc_request"]["method"] == "tools/call"
    assert len(data["audit_trace"]) == 5


def test_router_simulation():
    payload = {
        "prompt_type": "coding",
        "prompt_sample": "Write a FastAPI middleware for JWT RBAC validation"
    }
    response = client.post("/api/simulations/router", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "Groq" in data["selected_provider"] or "Anthropic" in data["selected_provider"]
    assert len(data["fallback_chain"]) > 0


def test_email_service_content_builder():
    from backend.app.services.email_service import build_email_content
    text_content, html_content = build_email_content(
        name="John Doe",
        email="john@example.com",
        subject="Technical Opportunity",
        message="We want to invite you to an interview.",
        ticket_id="MSG-TEST1234",
        timestamp="2026-10-09T10:00:00Z",
        client_ip="127.0.0.1"
    )
    assert "MSG-TEST1234" in text_content
    assert "john@example.com" in text_content
    assert "MSG-TEST1234" in html_content
    assert "Technical Opportunity" in html_content
    assert "<!DOCTYPE html>" in html_content


def test_send_via_formsubmit_success():
    from unittest.mock import patch, MagicMock
    from backend.app.services.email_service import send_via_formsubmit
    from backend.app.config import settings

    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {"success": "true", "message": "The form was submitted successfully."}

    with patch("httpx.post", return_value=mock_resp) as mock_post:
        result = send_via_formsubmit(
            name="Alice Candidate",
            email="alice@example.com",
            subject="Interview Request",
            message="Let's schedule a call.",
            ticket_id="MSG-FS001"
        )
        assert result is True
        mock_post.assert_called_once()
        args, kwargs = mock_post.call_args
        assert args[0] == f"https://formsubmit.co/ajax/{settings.NOTIFICATION_EMAIL}"
        headers = kwargs["headers"]
        assert headers["Referer"] == "https://rohit-jigar.github.io/3d-portfolio/"
        assert headers["Origin"] == "https://rohit-jigar.github.io/3d-portfolio/"
        assert headers["Content-Type"] == "application/json"
        assert kwargs["json"]["ticket_id"] == "MSG-FS001"
        assert kwargs["json"]["email"] == "alice@example.com"


def test_send_via_formsubmit_failure():
    from unittest.mock import patch, MagicMock
    from backend.app.services.email_service import send_via_formsubmit

    mock_resp = MagicMock()
    mock_resp.status_code = 500
    mock_resp.text = "Internal Server Error"

    with patch("httpx.post", return_value=mock_resp):
        result = send_via_formsubmit(
            name="Alice Candidate",
            email="alice@example.com",
            subject="Interview Request",
            message="Let's schedule a call.",
            ticket_id="MSG-FS002"
        )
        assert result is False


def test_send_inquiry_notification_falls_back_to_formsubmit():
    from unittest.mock import patch
    from backend.app.services.email_service import send_inquiry_notification

    with patch("backend.app.services.email_service.send_via_formsubmit", return_value=True) as mock_fs:
        result = send_inquiry_notification(
            name="Bob Recruiter",
            email="bob@example.com",
            subject="Senior Role",
            message="We have an opening for you.",
            ticket_id="MSG-FS003",
            timestamp="2026-10-09T12:00:00Z"
        )
        assert result is True
        mock_fs.assert_called_once()


def test_get_inquiries_endpoint():
    response = client.get("/api/inquiries")
    assert response.status_code == 200
    inquiries = response.json()
    assert isinstance(inquiries, list)
    assert len(inquiries) >= 1
    # Verify structure of inquiry records
    first = inquiries[0]
    assert "id" in first
    assert "ticket_id" in first
    assert "name" in first
    assert "email" in first
    assert "subject" in first
    assert "message" in first
    assert "created_at" in first
    assert "is_read" in first
    assert "email_status" in first or "status" in first


def test_get_inquiries_stats_endpoint():
    response = client.get("/api/inquiries/stats")
    assert response.status_code == 200
    stats = response.json()
    assert "total" in stats
    assert stats["total"] >= 1
    assert "unread" in stats
    assert "read" in stats
    assert "by_status" in stats
    assert isinstance(stats["by_status"], dict)
    assert "by_provider" in stats
    assert isinstance(stats["by_provider"], dict)


def test_inquiries_pagination_and_query_params():
    response = client.get("/api/inquiries?limit=1&offset=0")
    assert response.status_code == 200
    items = response.json()
    assert isinstance(items, list)
    assert len(items) <= 1


def test_database_direct_inquiry_lifecycle():
    import uuid
    from backend.app.database import (
        save_inquiry,
        get_inquiry_by_ticket_id,
        update_email_status,
        mark_inquiry_read,
        get_inquiry_stats
    )
    test_ticket = f"MSG-TEST-{uuid.uuid4().hex[:8].upper()}"
    saved = save_inquiry(
        ticket_id=test_ticket,
        name="Test Recruiter",
        email="test.recruiter@example.com",
        subject="Integration Verification",
        message="Checking database persistence pipeline directly.",
        client_ip="192.168.1.50",
        status="pending"
    )
    assert saved["ticket_id"] == test_ticket
    assert saved["name"] == "Test Recruiter"
    assert saved["email"] == "test.recruiter@example.com"
    assert saved["client_ip"] == "192.168.1.50"

    fetched = get_inquiry_by_ticket_id(test_ticket)
    assert fetched is not None
    assert fetched["ticket_id"] == test_ticket

    # Test updating status
    updated = update_email_status(test_ticket, "sent", provider="smtp")
    assert updated is True
    fetched_after = get_inquiry_by_ticket_id(test_ticket)
    assert fetched_after["email_status"] == "sent"

    # Test marking as read
    marked = mark_inquiry_read(test_ticket, 1)
    assert marked is True
    fetched_read = get_inquiry_by_ticket_id(test_ticket)
    assert fetched_read["is_read"] == 1

    stats = get_inquiry_stats()
    assert stats["total"] >= 1

