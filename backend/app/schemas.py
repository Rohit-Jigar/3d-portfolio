from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field, field_validator
import html


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    environment: str
    timestamp: str


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Sender's full name")
    email: EmailStr = Field(..., description="Valid contact email address")
    subject: str = Field(..., min_length=3, max_length=150, description="Subject of the message")
    message: str = Field(..., min_length=10, max_length=2000, description="Inquiry or message text")

    @field_validator("name", "subject", "message")
    @classmethod
    def sanitize_text(cls, v: str) -> str:
        # Strip extraneous whitespace and escape HTML to prevent XSS
        cleaned = html.escape(v.strip())
        return cleaned


class ContactResponse(BaseModel):
    success: bool
    message: str
    ticket_id: str
    timestamp: str


class ProjectArchitecture(BaseModel):
    overview: str
    components: List[str]
    flow_diagram: List[str]


class ProjectDetail(BaseModel):
    id: str
    slug: str
    title: str
    subtitle: str
    category: str
    headline: str
    scale_label: Optional[str] = None
    problem_statement: str
    engineering_contributions: List[str]
    architecture: ProjectArchitecture
    technical_stack: List[str]
    engineering_challenges: List[str]
    tags: List[str]
    verified_links: Dict[str, Optional[str]] = Field(
        default_factory=lambda: {"github": None, "demo": None, "docs": None}
    )


class McpSimulateRequest(BaseModel):
    client_prompt: str = Field(..., min_length=3, max_length=200)
    selected_tool: str = Field(..., description="Tool name e.g. query_database, fetch_api, validate_schema")
    tool_arguments: Dict[str, Any] = Field(default_factory=dict)


class McpSimulateResponse(BaseModel):
    status: str
    protocol_version: str
    jsonrpc_request: Dict[str, Any]
    server_response: Dict[str, Any]
    audit_trace: List[str]


class RouterSimulateRequest(BaseModel):
    prompt_type: str = Field(..., description="coding | low_latency | large_context | reasoning")
    prompt_sample: str


class RouterSimulateResponse(BaseModel):
    selected_provider: str
    selected_model: str
    routing_reason: str
    estimated_latency_ms: int
    fallback_chain: List[str]
    cost_tier: str


class InquiryRecord(BaseModel):
    id: int
    ticket_id: str
    name: str
    email: str
    subject: str
    message: str
    client_ip: Optional[str] = None
    email_status: str = "pending"
    status: Optional[str] = "pending"
    provider: str = "direct"
    created_at: str
    is_read: int = 0


class InquiryStatsResponse(BaseModel):
    total: int
    total_inquiries: int
    unread: int
    unread_inquiries: int
    read: int
    read_inquiries: int
    by_status: Dict[str, int]
    by_provider: Dict[str, int]
    latest_inquiry_at: Optional[str] = None
