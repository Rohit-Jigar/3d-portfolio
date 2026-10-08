from typing import List
from fastapi import APIRouter, HTTPException
from backend.app.schemas import ProjectDetail

router = APIRouter(prefix="/api/projects", tags=["Projects"])

PROJECTS_DATA: List[ProjectDetail] = [
    ProjectDetail(
        id="alef-migration",
        slug="alef-migration",
        title="Alef Migration",
        subtitle="Data Engineering & High-Volume ETL Automation",
        category="Data Engineering | Python Automation | Data Migration",
        headline="Engineered advanced Python scripts to prepare and migrate approximately two million records from a source server to a destination server with different acceptance criteria.",
        scale_label="~2,000,000 Records Scale",
        problem_statement=(
            "The source data required substantial preparation before it could be accepted by the destination system. "
            "Records exhibited incompatible schemas, missing non-null constraints, and legacy format inconsistencies. "
            "They needed to be extracted, cleansed, validated, and aligned precisely with the target system's strict requirements "
            "without corrupting transactional integrity."
        ),
        engineering_contributions=[
            "Developed advanced, modular Python migration scripts for batch processing.",
            "Handled large-scale data transformation workflows at approximately two-million-record scale.",
            "Implemented data cleansing, normalization, and payload sanitization routines.",
            "Constructed schema transformation logic to satisfy destination acceptance criteria.",
            "Engineered robust validation routines and granular migration error handling.",
            "Assisted the end-to-end data transfer mechanism from Server A to Server B.",
            "Investigated duplicate record anomalies, invalid payload structures, and edge-case migration failures."
        ],
        architecture={
            "overview": "A resilient multi-stage pipeline designed for batch processing, verification, and transactional transfer.",
            "components": [
                "Source Database Connector (Server A)",
                "Batch Streaming & Ingestion Engine",
                "Normalization & Data Cleansing Layer",
                "Schema Validation & Constraint Checker",
                "Target Adapter & Format Converter",
                "Destination Ingestion Gateway (Server B)",
                "Audit Logging & Reconciliation Ledger"
            ],
            "flow_diagram": [
                "SOURCE SERVER",
                "DATA EXTRACTION",
                "DATA CLEANING",
                "VALIDATION",
                "SCHEMA TRANSFORMATION",
                "DESTINATION COMPATIBILITY CHECK",
                "DATA MIGRATION",
                "RESULT VERIFICATION"
            ]
        },
        technical_stack=[
            "Python 3.11",
            "Data Extraction Scripts",
            "Custom ETL Validation Workflows",
            "Batch Processing Logic",
            "Relational Database Connectors",
            "Error Logging & Audit Tracking"
        ],
        engineering_challenges=[
            "Schema Discrepancies: Target system enforced strict field formats differing from legacy structures.",
            "Volume Management: Designing batch sizes that maximized transfer throughput while maintaining process stability.",
            "Anomaly Isolation: Categorizing failures into non-fatal warnings vs blocking errors to prevent pipeline stalls.",
            "Traceability: Ensuring every migrated record could be audited and reconciled between Source and Target."
        ],
        tags=["Python", "Data Engineering", "Data Migration", "Data Validation", "Data Transformation", "Automation"],
        verified_links={"github": None, "demo": None, "docs": None}
    ),
    ProjectDetail(
        id="ims-inventory-system",
        slug="ims-inventory-system",
        title="IMS: Inventory Management System",
        subtitle="Enterprise Asset Tracking & IT Ticketing Platform",
        category="Enterprise Application | Backend Engineering | RBAC",
        headline="Developed an inventory management and IT ticketing system that combines hardware asset tracking with structured IT support workflows.",
        scale_label="Enterprise Multi-Role Platform",
        problem_statement=(
            "Growing organizations require a single pane of glass to track hardware assets, map assigned employees, "
            "audit workstation specs, and manage support tickets with granular role-based permissions rather than "
            "relying on fragmented spreadsheets and ad-hoc chat channels."
        ),
        engineering_contributions=[
            "Architected Role-Based Access Control (RBAC) supporting distinct access tiers for Admins, Support Engineers, and Developers.",
            "Built responsive enterprise frontend user interface using React and Tailwind CSS.",
            "Engineered high-performance RESTful backend APIs utilizing FastAPI.",
            "Designed and optimized relational PostgreSQL schemas for assets, users, and ticket lifecycles.",
            "Configured and maintained Flyway for version-controlled, reproducible database migrations.",
            "Implemented asset inventory, assignment, checkout, and deprecation lifecycle workflows.",
            "Constructed Jira-style IT support ticket triage, assignment, priority queuing, and resolution tracking.",
            "Enforced strict request validation, permission middleware, and structured API error handling."
        ],
        architecture={
            "overview": "Layered enterprise micro-architecture with React client, FastAPI REST layer, Flyway-migrated PostgreSQL, and granular RBAC authorization guards.",
            "components": [
                "React + Tailwind Client UI",
                "JWT & Role Validation Middleware",
                "FastAPI REST Endpoints (Assets, Tickets, Users)",
                "Service & Repository Business Logic Layer",
                "PostgreSQL Relational Storage",
                "Flyway Migration Management Versioning Engine"
            ],
            "flow_diagram": [
                "CLIENT APP (React)",
                "AUTH & RBAC GATEWAY",
                "FASTAPI ROUTERS",
                "SERVICE WORKFLOWS",
                "POSTGRESQL (Flyway Migrations)",
                "AUDIT & STATE MACHINE"
            ]
        },
        technical_stack=[
            "React",
            "Tailwind CSS",
            "Python",
            "FastAPI",
            "PostgreSQL",
            "Flyway",
            "RBAC Security",
            "REST APIs"
        ],
        engineering_challenges=[
            "Granular RBAC Enforcement: Ensuring Developers can only view their assigned hardware and tickets, Support Engineers can manage tickets, and Admins retain full audit capability.",
            "Database Schema Evolution: Maintaining zero-downtime database updates using versioned SQL migrations via Flyway.",
            "State Machine Integrity: Enforcing strict transition states for IT tickets (Open -> In Progress -> Escalated -> Resolved -> Closed)."
        ],
        tags=["React", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "Flyway", "RBAC", "REST APIs"],
        verified_links={"github": None, "demo": None, "docs": None}
    ),
    ProjectDetail(
        id="namogpt-platform",
        slug="namogpt-platform",
        title="NamoGPT",
        subtitle="Multi-Provider AI Gateway & Intelligent Model Orchestrator",
        category="AI Engineering | Multi-Model Platform | LLM Integration",
        headline="Built a multi-provider GPT-style AI application that integrates multiple model providers and routing services, with an automatic model-selection mode and user-configurable API credentials.",
        scale_label="Multi-Model LLM Gateway",
        problem_statement=(
            "Relying on a single AI provider creates vendor lock-in, latency bottlenecks, and vulnerability to downtime. "
            "Developers and teams require a unified platform that intelligently routes prompts across diverse models, "
            "allows users to securely bring their own API keys, and dynamically selects the best provider based on task context."
        ),
        engineering_contributions=[
            "Designed multi-provider AI integration architecture supporting unified prompt dispatch.",
            "Implemented heuristic-based automatic model selection routing based on task characteristics (coding, low latency, reasoning, large context).",
            "Constructed provider and model selection dropdowns with real-time capability descriptions.",
            "Built secure user-configurable API key architecture with client-isolated memory storage and zero server-side credential exposure.",
            "Integrated unified interfaces for diverse services, providers, and model families.",
            "Engineered provider failover routines and clear error surfaces for API rate limits and token exhaustion."
        ],
        architecture={
            "overview": "Unified proxy and orchestration layer abstracting disparate model APIs behind a standardized schema.",
            "components": [
                "Unified Chat & Configuration UI",
                "Request Inspector & Heuristic Classifier",
                "Model Router & Provider Registry",
                "Provider Adapters (Google, Groq, Anthropic, Ollama, Cloudflare, etc.)",
                "Secure Key Isolation Layer",
                "Streaming Response Dispatcher"
            ],
            "flow_diagram": [
                "USER PROMPT",
                "REQUEST ANALYSIS",
                "MODEL ROUTER",
                "PROVIDER / MODEL SELECTION",
                "RESPONSE GENERATION",
                "RESPONSE TO USER"
            ]
        },
        technical_stack=[
            "Python",
            "AI/LLM Integration",
            "LiteLLM",
            "Multi-Provider Gateway",
            "Model Routing Algorithms",
            "API Security & Secret Isolation",
            "FastAPI / Async I/O"
        ],
        engineering_challenges=[
            "API Normalization: Unifying differing payload formats, streaming protocols, and stop sequences across multiple providers.",
            "Credential Isolation: Guaranteeing that user-provided API credentials never leak across sessions or persist unencrypted.",
            "Graceful Degradation: Handling unexpected provider outages by triggering seamless fallback chains without losing session context."
        ],
        tags=["Python", "AI/LLM Integration", "Model Routing", "API Integration", "LiteLLM", "Multi-Provider Architecture"],
        verified_links={"github": None, "demo": None, "docs": None}
    )
]


@router.get("", response_model=List[ProjectDetail])
def get_all_projects():
    """Retrieve all documented engineering project case studies."""
    return PROJECTS_DATA


@router.get("/{slug}", response_model=ProjectDetail)
def get_project_by_slug(slug: str):
    """Retrieve in-depth case study information for a specific project."""
    for proj in PROJECTS_DATA:
        if proj.slug == slug:
            return proj
    raise HTTPException(status_code=404, detail=f"Project with slug '{slug}' not found.")
