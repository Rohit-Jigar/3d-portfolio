import pytest
import concurrent.futures
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.database import (
    init_db,
    save_inquiry,
    get_all_inquiries,
    get_inquiry_stats,
    get_inquiry_by_ticket_id,
    update_email_status,
    mark_inquiry_read,
    get_db_connection
)

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_test_db(tmp_path, monkeypatch):
    """Use a temporary database for each test to keep tests isolated."""
    test_db = tmp_path / "test_inquiries.db"
    monkeypatch.setenv("DATABASE_PATH", str(test_db))
    init_db()
    yield


def test_init_db_creates_table_and_indexes():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='inquiries'")
        assert cursor.fetchone() is not None

        cursor.execute("SELECT name FROM sqlite_master WHERE type='index'")
        indices = [row[0] for row in cursor.fetchall()]
        assert "idx_inquiries_created_at" in indices
        assert "idx_inquiries_ticket_id" in indices
        assert "idx_inquiries_is_read" in indices


def test_save_and_retrieve_inquiry():
    record = save_inquiry(
        ticket_id="MSG-TEST01",
        name="Jane Doe",
        email="jane@example.com",
        subject="Project Collaboration",
        message="I would like to discuss a potential system architecture role.",
        client_ip="192.168.1.1",
        email_status="sent",
        provider="resend",
        is_read=0
    )
    assert record["id"] is not None
    assert record["ticket_id"] == "MSG-TEST01"
    assert record["email"] == "jane@example.com"
    assert record["is_read"] == 0

    fetched = get_inquiry_by_ticket_id("MSG-TEST01")
    assert fetched is not None
    assert fetched["name"] == "Jane Doe"
    assert fetched["provider"] == "resend"


def test_get_all_inquiries_and_pagination():
    for i in range(5):
        save_inquiry(
            ticket_id=f"MSG-PAG-{i}",
            name=f"User {i}",
            email=f"user{i}@example.com",
            subject=f"Subject {i}",
            message=f"Message body {i}"
        )

    all_records = get_all_inquiries(limit=10)
    assert len(all_records) == 5
    # Order should be newest first (id descending)
    assert all_records[0]["ticket_id"] == "MSG-PAG-4"

    paged = get_all_inquiries(limit=2, offset=1)
    assert len(paged) == 2
    assert paged[0]["ticket_id"] == "MSG-PAG-3"


def test_get_inquiry_stats():
    save_inquiry(
        ticket_id="MSG-S1",
        name="User A",
        email="a@example.com",
        subject="Sub A",
        message="Body A",
        email_status="sent",
        provider="resend",
        is_read=1
    )
    save_inquiry(
        ticket_id="MSG-S2",
        name="User B",
        email="b@example.com",
        subject="Sub B",
        message="Body B",
        email_status="pending",
        provider="direct",
        is_read=0
    )

    stats = get_inquiry_stats()
    assert stats["total"] == 2
    assert stats["read"] == 1
    assert stats["unread"] == 1
    assert stats["by_status"]["sent"] == 1
    assert stats["by_status"]["pending"] == 1
    assert stats["by_provider"]["resend"] == 1
    assert stats["by_provider"]["direct"] == 1
    assert stats["latest_inquiry_at"] is not None


def test_update_status_and_mark_read():
    save_inquiry(
        ticket_id="MSG-UPDATE",
        name="User Update",
        email="update@example.com",
        subject="Status Test",
        message="Testing status updates"
    )

    updated = update_email_status("MSG-UPDATE", "sent", "formsubmit")
    assert updated is True

    marked = mark_inquiry_read("MSG-UPDATE", 1)
    assert marked is True

    rec = get_inquiry_by_ticket_id("MSG-UPDATE")
    assert rec["email_status"] == "sent"
    assert rec["provider"] == "formsubmit"
    assert rec["is_read"] == 1


def test_api_get_inquiries_endpoint():
    save_inquiry(
        ticket_id="MSG-API01",
        name="API User",
        email="api@example.com",
        subject="API Test",
        message="Testing via API client"
    )

    response = client.get("/api/inquiries")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert data[0]["ticket_id"] == "MSG-API01"


def test_api_get_inquiry_stats_endpoint():
    save_inquiry(
        ticket_id="MSG-API-STAT",
        name="Stats User",
        email="stats@example.com",
        subject="Stats Test",
        message="Testing stats endpoint",
        is_read=0
    )

    response = client.get("/api/inquiries/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "unread" in data
    assert "by_status" in data
    assert "by_provider" in data
    assert data["unread"] >= 1


def test_concurrent_writes_thread_safety():
    """Verify thread-safety when multiple threads concurrently write inquiries."""
    def worker(idx):
        return save_inquiry(
            ticket_id=f"MSG-CONC-{idx}",
            name=f"Concurrent User {idx}",
            email=f"user{idx}@example.com",
            subject=f"Concurrent Sub {idx}",
            message=f"Concurrent body content {idx}",
            client_ip="127.0.0.1"
        )

    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(worker, i) for i in range(20)]
        results = [f.result() for f in concurrent.futures.as_completed(futures)]

    assert len(results) == 20
    all_inquiries = get_all_inquiries(limit=50)
    assert len(all_inquiries) == 20
