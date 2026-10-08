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
