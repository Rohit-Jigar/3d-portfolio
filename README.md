# Jigar Rohit — Premium 3D Developer Portfolio

> **MCP Integration Developer | Python Backend Engineer | AI & LLM Systems**  
> *"I build intelligent systems that connect AI, data, and software."*

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org)
[![React](https://img.shields.io/badge/React-19.0+-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=flat&logo=three.js&logoColor=white)](https://threejs.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Tests](https://img.shields.io/badge/Tests-10%2F10%20Passing-brightgreen?style=flat)](backend/tests/)

A high-performance, production-grade 3D developer portfolio and engineering showcase designed to present deep engineering capabilities in Model Context Protocol (MCP) integrations, Python backend microservices, multi-model AI routing, and high-volume data engineering.

---

## 🚀 Key Highlights & Capabilities

- **Cinematic 3D Hero Experience:** Real-time Three.js / React Three Fiber interactive scene with a pulsing holographic geometric core, orbiting interactive capability nodes, 240+ glowing particles, and mouse parallax camera tracking with graceful WebGL fallback.
- **Project 01 — Alef Migration (~2M Records Scale):** High-volume data engineering showcase featuring an interactive 8-stage pipeline explorer (`Source Server` → `Extraction` → `Cleaning` → `Validation` → `Transformation` → `Compatibility Check` → `Migration` → `Verification`).
- **Project 02 — IMS: Inventory Management System:** Enterprise hardware inventory and Jira-style IT ticketing platform with an interactive Role-Based Access Control (RBAC) matrix (Admin, Support Engineer, Developer), FastAPI REST backend, and PostgreSQL managed by Flyway migrations.
- **Project 03 — NamoGPT:** Multi-provider AI gateway with dynamic model routing, LiteLLM proxying, and client-isolated API key security across 11+ model providers and services (Google Gemini, Groq, Anthropic, Ollama, Cloudflare, NVIDIA NIM, Nemotron, etc.).
- **Dedicated MCP Integration Showcase:** "Connecting AI to Real-World Tools" highlighting Model Context Protocol client-server topology with an interactive JSON-RPC 2.0 tool-calling handshake simulator.
- **Interactive Engineering Lab:** Client and API-backed interactive simulations (batch record cleansing, RBAC authorization validator, model routing engine).
- **Production FastAPI Backend:** Asynchronous Python REST API with Pydantic request sanitization, rate-limiting, and 100% passing automated test suite.

---

## 📁 Repository Structure

```
portfolio/
├── frontend/                     # Interactive 3D Client Application
│   ├── public/                   # Static assets & resume storage (resume.pdf)
│   ├── src/
│   │   ├── components/
│   │   │   ├── canvas/           # HeroScene3D.tsx (Three.js / R3F Canvas)
│   │   │   ├── layout/           # Navbar.tsx, Footer.tsx
│   │   │   ├── sections/         # Hero, About, Skills, Projects, MCP, Journey, Lab, Contact
│   │   │   └── ui/               # Modal.tsx, custom UI primitives
│   │   ├── data/                 # Projects, Skills, and MCP technical data
│   │   ├── types/                # Strict TypeScript domain interfaces
│   │   ├── App.tsx               # Root application coordinator
│   │   ├── index.css             # Tailwind v4 styles, glassmorphism, animations
│   │   └── main.tsx              # React DOM entry
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts            # Vite 8 + Tailwind v4 + manual vendor chunking
│
├── backend/                      # Production Python 3.11 FastAPI Backend
│   ├── app/
│   │   ├── routers/
│   │   │   ├── health.py         # GET /api/health (Service status & version)
│   │   │   ├── projects.py       # GET /api/projects (Verified case studies)
│   │   │   ├── contact.py        # POST /api/contact (Rate-limited inquiry handler)
│   │   │   └── simulations.py    # POST /api/simulations/* (MCP & Router simulations)
│   │   ├── schemas.py            # Pydantic v2 schemas with XSS sanitization
│   │   ├── config.py             # Pydantic BaseSettings environment manager
│   │   └── main.py               # FastAPI application with CORS middleware
│   ├── tests/
│   │   └── test_api.py           # Pytest test suite (10/10 automated tests passing)
│   ├── requirements.txt          # Python dependencies
│   └── .env.example              # Environment variable template
│
├── docs/
│   └── ARCHITECTURE.md           # In-depth architectural & protocol specifications
├── render.yaml                   # Infrastructure-as-Code for Render deployment
├── .gitignore
└── README.md
```

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- **Node.js:** v18+ (v24 recommended)
- **Python:** 3.10+ (3.11 recommended)
- **Git**

### 2. Backend Setup (FastAPI)
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment (optional but recommended)
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run automated tests
pytest tests/ -v

# Start FastAPI server on port 8000
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation will be live at: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend Setup (React + Vite)
```bash
# In a separate terminal, navigate to frontend directory
cd frontend

# Install npm dependencies
npm install

# Start Vite development server on port 5173
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. Requests to `/api/*` are automatically proxied to `http://localhost:8000`.

---

## 🧪 Automated Testing

### Backend Unit & Integration Tests (10 Passed)
```bash
python -m pytest backend/tests/test_api.py -v
```
**Test Coverage:**
- `test_root_endpoint`: Verifies root metadata and service identification.
- `test_health_endpoint`: Verifies health status, uptime timestamp, and versioning.
- `test_get_all_projects`: Validates full project list structure.
- `test_get_project_by_slug_success`: Confirms slug retrieval and pipeline data.
- `test_get_project_by_slug_not_found`: Ensures standard 404 responses.
- `test_contact_form_valid`: Validates contact inquiry submission and ticket ID generation.
- `test_contact_form_invalid_email`: Ensures malformed emails are blocked with 422.
- `test_contact_form_short_message`: Enforces minimum message length validation.
- `test_mcp_simulation`: Tests JSON-RPC 2.0 tool-calling execution and audit traces.
- `test_router_simulation`: Verifies dynamic LLM prompt routing and fallback chains.

### Frontend Production Build Verification
```bash
cd frontend
npm run build
```
Build output compiles cleanly into optimized chunks:
- `index.html`: ~2.8 kB
- `index.css`: ~63 kB (Tailwind v4 optimized)
- `index.js`: ~113 kB (Gzipped: ~27 kB)
- `three-vendor.js`: Isolated Three.js/R3F bundle for performance.

---

## 🌐 Deployment Guide (GitHub & Render)

### 1. Initialize Git and Push to GitHub
```bash
# Initialize git repository
git init
git add .
git commit -m "feat: initial commit of premium 3D engineering portfolio"

# Connect your GitHub remote repository
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/portfolio.git
git branch -M main
git push -u origin main
```

### 2. Deploy with Render (Blueprint Mode)
This repository includes a production-ready `render.yaml` configuration.

1. Log into your [Render Dashboard](https://dashboard.render.com/).
2. Click **Blueprints** → **New Blueprint Instance**.
3. Connect your GitHub repository.
4. Render will automatically detect `render.yaml` and configure both services:
   - **`jigar-portfolio-api`:** Python Web Service running FastAPI (`pip install -r backend/requirements.txt`, start command: `python -m uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`).
   - **`jigar-portfolio-frontend`:** Static Site running Vite build (`npm install && npm run build`, publish path: `./frontend/dist`).
5. Click **Apply**. Render will automatically build, test, and deploy both components.

---

## 🔐 Environment Variables

Create `.env` in `backend/` for local overrides (never commit secrets to version control):

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `ENVIRONMENT` | `development` | Environment mode (`development` or `production`) |
| `PORT` | `8000` | Port for the ASGI server |
| `HOST` | `0.0.0.0` | Host binding interface |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | Allowed CORS frontend origins |
| `ADDITIONAL_CORS_ORIGINS` | `""` | Comma-separated extra production URLs |
| `RATE_LIMIT_CONTACT` | `5/minute` | Rate limit window for inquiry submissions |

---

## 👤 Personal Assets & Next Steps for Jigar

1. **Resume PDF:** Place your official `resume.pdf` file into `frontend/public/resume.pdf` to enable instant 1-click downloads via the navigation bar and hero CTA.
2. **GitHub Handle:** When you push this repository to your GitHub profile, your project repository link will be live at `https://github.com/<YOUR_USERNAME>/3d-portfolio`.
3. **LinkedIn Profile:** Connected to [https://www.linkedin.com/in/jigar-rohit-874aa0374/](https://www.linkedin.com/in/jigar-rohit-874aa0374/).

---

## 📄 License
This project is authored by Jigar Rohit. All rights reserved.
