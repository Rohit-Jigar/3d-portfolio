"""
backend.app.database
====================
Thread-safe SQLite database manager for inquiries storage and metrics.
Stores persistent data in backend/data/inquiries.db.
"""

import os
import sqlite3
import threading
import logging
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Dict, Any, Optional

logger = logging.getLogger("portfolio.database")

# Database path resolution: backend/data/inquiries.db
BACKEND_DIR = Path(__file__).resolve().parent.parent
DEFAULT_DATA_DIR = BACKEND_DIR / "data"
DEFAULT_DB_PATH = DEFAULT_DATA_DIR / "inquiries.db"

_db_lock = threading.Lock()
_initialized = False


def get_db_path() -> Path:
    """Returns the configured database file path."""
    env_path = os.getenv("DATABASE_PATH")
    if env_path:
        return Path(env_path)
    return DEFAULT_DB_PATH


@contextmanager
def get_db_connection():
    """
    Context manager providing a thread-safe connection to the SQLite database.
    Ensures the parent directory exists, acquires a threading lock,
    sets row_factory to sqlite3.Row for dict access, and safely closes the connection.
    """
    db_path = get_db_path()
    db_path.parent.mkdir(parents=True, exist_ok=True)

    with _db_lock:
        conn = sqlite3.connect(
            str(db_path),
            timeout=30.0,
            check_same_thread=False
        )
        conn.row_factory = sqlite3.Row
        try:
            yield conn
        finally:
            conn.close()


def init_db() -> None:
    """
    Initializes the SQLite database and ensures the inquiries table and indexes exist.
    Thread-safe and idempotent.
    """
    global _initialized
    db_path = get_db_path()
    db_path.parent.mkdir(parents=True, exist_ok=True)

    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS inquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ticket_id TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT NOT NULL,
                message TEXT NOT NULL,
                client_ip TEXT,
                email_status TEXT DEFAULT 'pending',
                provider TEXT DEFAULT 'direct',
                created_at TEXT NOT NULL,
                is_read INTEGER DEFAULT 0
            )
            """
        )
        cursor.execute(
            "CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC)"
        )
        cursor.execute(
            "CREATE INDEX IF NOT EXISTS idx_inquiries_ticket_id ON inquiries(ticket_id)"
        )
        cursor.execute(
            "CREATE INDEX IF NOT EXISTS idx_inquiries_is_read ON inquiries(is_read)"
        )
        conn.commit()

    _initialized = True
    logger.info("Database initialized successfully at: %s", db_path)


def _ensure_db_initialized() -> None:
    """Ensures database tables are created before queries if not already initialized."""
    global _initialized
    if not _initialized:
        init_db()


def save_inquiry(
    ticket_id: str,
    name: str,
    email: str,
    subject: str,
    message: str,
    client_ip: Optional[str] = None,
    email_status: str = "pending",
    provider: str = "direct",
    created_at: Optional[str] = None,
    is_read: int = 0,
    status: Optional[str] = None
) -> Dict[str, Any]:
    """
    Inserts a new inquiry record into the inquiries table.
    Returns the newly created inquiry record as a dictionary.
    """
    _ensure_db_initialized()

    if status is not None:
        email_status = status

    if not created_at:
        created_at = datetime.now(timezone.utc).isoformat()

    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO inquiries (
                ticket_id, name, email, subject, message,
                client_ip, email_status, provider, created_at, is_read
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                ticket_id,
                name,
                email,
                subject,
                message,
                client_ip,
                email_status,
                provider,
                created_at,
                is_read
            )
        )
        conn.commit()
        inserted_id = cursor.lastrowid

        cursor.execute("SELECT * FROM inquiries WHERE id = ?", (inserted_id,))
        row = cursor.fetchone()
        if row:
            res = dict(row)
            res["status"] = res.get("email_status", email_status)
            return res
        return {
            "id": inserted_id,
            "ticket_id": ticket_id,
            "name": name,
            "email": email,
            "subject": subject,
            "message": message,
            "client_ip": client_ip,
            "email_status": email_status,
            "status": email_status,
            "provider": provider,
            "created_at": created_at,
            "is_read": is_read
        }


def get_all_inquiries(limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
    """
    Retrieves recent inquiries ordered by id descending (newest first).
    """
    _ensure_db_initialized()

    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, ticket_id, name, email, subject, message,
                   client_ip, email_status, provider, created_at, is_read
            FROM inquiries
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            """,
            (limit, offset)
        )
        rows = cursor.fetchall()
        results = []
        for r in rows:
            item = dict(r)
            item["status"] = item.get("email_status", "pending")
            results.append(item)
        return results


def get_inquiry_stats() -> Dict[str, Any]:
    """
    Computes inquiry metrics including total count, read/unread counts,
    email delivery statuses, and provider distribution.
    """
    _ensure_db_initialized()

    with get_db_connection() as conn:
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM inquiries")
        total_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM inquiries WHERE is_read = 0")
        unread_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM inquiries WHERE is_read = 1")
        read_count = cursor.fetchone()[0]

        cursor.execute(
            "SELECT email_status, COUNT(*) FROM inquiries GROUP BY email_status"
        )
        by_status = {str(row[0]): int(row[1]) for row in cursor.fetchall()}

        cursor.execute(
            "SELECT provider, COUNT(*) FROM inquiries GROUP BY provider"
        )
        by_provider = {str(row[0]): int(row[1]) for row in cursor.fetchall()}

        cursor.execute("SELECT MAX(created_at) FROM inquiries")
        latest_row = cursor.fetchone()
        latest_inquiry_at = latest_row[0] if latest_row and latest_row[0] else None

        return {
            "total": total_count,
            "total_inquiries": total_count,
            "unread": unread_count,
            "unread_inquiries": unread_count,
            "read": read_count,
            "read_inquiries": read_count,
            "by_status": by_status,
            "by_provider": by_provider,
            "latest_inquiry_at": latest_inquiry_at
        }


def get_inquiry_by_ticket_id(ticket_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieves a single inquiry record by ticket ID.
    """
    _ensure_db_initialized()

    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM inquiries WHERE ticket_id = ?", (ticket_id,))
        row = cursor.fetchone()
        if row:
            res = dict(row)
            res["status"] = res.get("email_status", "pending")
            return res
        return None


def update_email_status(
    ticket_id: str,
    email_status: str,
    provider: Optional[str] = None
) -> bool:
    """
    Updates the email delivery status (and optionally provider) for an inquiry.
    """
    _ensure_db_initialized()

    with get_db_connection() as conn:
        cursor = conn.cursor()
        if provider:
            cursor.execute(
                """
                UPDATE inquiries
                SET email_status = ?, provider = ?
                WHERE ticket_id = ?
                """,
                (email_status, provider, ticket_id)
            )
        else:
            cursor.execute(
                """
                UPDATE inquiries
                SET email_status = ?
                WHERE ticket_id = ?
                """,
                (email_status, ticket_id)
            )
        conn.commit()
        return cursor.rowcount > 0


def mark_inquiry_read(ticket_id: str, is_read: int = 1) -> bool:
    """
    Updates the is_read status for an inquiry.
    """
    _ensure_db_initialized()

    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE inquiries SET is_read = ? WHERE ticket_id = ?",
            (is_read, ticket_id)
        )
        conn.commit()
        return cursor.rowcount > 0
