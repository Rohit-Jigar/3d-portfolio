# System Architecture & Technical Specifications

**Developer:** Jigar Rohit  
**Focus Disciplines:** MCP Integration · Python Backend Engineering · AI/LLM Systems · Data Engineering

---

## 1. High-Level Architecture Overview

The system is organized as a production monorepo containing:
- **Interactive 3D Client (`frontend/`):** React 19, TypeScript, Three.js, React Three Fiber (R3F), Drei, Tailwind CSS v4, and Vite.
- **Microservice REST Backend (`backend/`):** Python 3.11, FastAPI, Pydantic v2, Slowapi rate-limiting, and Uvicorn ASGI server.
- **Automated Deployment Blueprint (`render.yaml`):** Declarative infrastructure-as-code for Render Static Sites and Web Services.

```
[ Browser / Technical Recruiter ]
               │
               ▼
   [ React 19 + Three.js Client ]
   ├── Interactive 3D Holographic Core
   ├── Alef 8-Stage Pipeline Explorer
   ├── IMS RBAC Module Inspector
   ├── NamoGPT Multi-Model Router Simulator
   └── MCP JSON-RPC 2.0 Tool Handshake Console
               │
               ▼ (JSON over HTTPS / CORS-restricted)
   [ FastAPI REST Backend (Python 3.11) ]
   ├── GET  /api/health (Service status & versioning)
   ├── GET  /api/projects (Verified case studies)
   ├── GET  /api/projects/{slug} (Deep-dive specifications)
   ├── POST /api/contact (Validated & rate-limited inquiries)
   └── POST /api/simulations/* (MCP & Router simulations)
```

---

## 2. Key Engineering Case Studies

### 2.1 Project 01 — Alef Migration (~2,000,000 Records Scale)
- **Domain:** Data Engineering | Python Automation | Data Migration
- **Core Challenge:** Source data required substantial cleansing and format transformation before conforming to destination server acceptance criteria.
- **Pipeline Architecture:**
  1. `SOURCE SERVER`: Ingestion stream connector.
  2. `DATA EXTRACTION`: Chunked batch processing with cursor tracking to prevent memory exhaustion.
  3. `DATA CLEANING`: Stripping null bytes, unescaped characters, and normalizing encodings.
  4. `VALIDATION`: Field constraint enforcement and quarantine logging.
  5. `SCHEMA TRANSFORMATION`: Mapping legacy tables into modern target schema.
  6. `DESTINATION COMPATIBILITY CHECK`: Pre-flight dry-run validation.
  7. `DATA MIGRATION`: Atomic batch transfer to Server B.
  8. `RESULT VERIFICATION`: Post-migration ledger reconciliation.

### 2.2 Project 02 — IMS: Inventory Management System
- **Domain:** Enterprise Application | Backend Engineering | RBAC
- **Core Challenge:** Centralizing hardware asset allocation, specification auditing, and IT ticketing while enforcing strict role segregation.
- **Roles:**
  - `Admin`: Global governance, Flyway database migration executor, user management.
  - `Support Engineer`: Hardware inventory assignment, ticket queue triage, and resolution.
  - `Developer`: Self-service view of assigned workstations, ticket submission and status tracking.
- **Database Versioning:** PostgreSQL relational schemas evolved deterministically using version-controlled Flyway SQL migration scripts.

### 2.3 Project 03 — NamoGPT
- **Domain:** AI Engineering | Multi-Model Platform | LLM Integration
- **Core Challenge:** Bridging 11+ model providers and routing brokers under a unified interface with intelligent heuristic routing and strict credential privacy.
- **Model Providers & Services Explored:** Google Gemini, Groq, Anthropic, Ollama, Cloudflare Workers AI, LiteLLM, NVIDIA NIM, Nemotron, GPT-OSS 120B, 9Router, OmniRoute.
- **Routing Heuristic Engine:**
  - *Coding tasks:* Routed to Claude 3.5 Sonnet / Groq Qwen-Coder for precise AST adherence.
  - *Low-latency tasks:* Routed to Groq LPU (Llama-3.1-8b-instant) for sub-150ms TTFT.
  - *Large documents:* Routed to Google Gemini 1.5 Pro for 2,000,000 token context window.
  - *Complex reasoning:* Routed to NVIDIA NIM / Nemotron for structured tool synthesis.

---

## 3. Model Context Protocol (MCP) Integration

Model Context Protocol is an open standard that decouples AI reasoning from tool execution:
- **Client-Server Boundary:** AI applications communicate with MCP servers over JSON-RPC 2.0.
- **Schema Discovery:** MCP servers expose registered tool capabilities and schemas.
- **Security Sandboxing:** Tools execute only with validated parameters, insulating protected databases and external services from unvetted agent operations.

---

## 4. Security & Production Controls

1. **Zero Secret Leakage:** No API keys, database credentials, or email server secrets are bundled into client code.
2. **Input Sanitization:** Contact payloads and search queries are stripped of malicious HTML and unescaped characters via Pydantic validators.
3. **Strict CORS Policy:** FastAPI only accepts origin headers from explicitly allowed domains.
4. **Rate Limiting:** Protects write endpoints against automated flooding.
5. **Accessible & Responsive:** Supports reduced-motion preferences with seamless 2D fallbacks and full keyboard operability.
