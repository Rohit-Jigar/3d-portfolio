import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import McpSection from './components/sections/McpSection';
import JourneySection from './components/sections/JourneySection';
import LabSection from './components/sections/LabSection';
import ContactSection from './components/sections/ContactSection';
import Modal from './components/ui/Modal';
import InquiriesModal from './components/ui/InquiriesModal';
import { Download, CheckCircle, Terminal } from 'lucide-react';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [githubModalOpen, setGithubModalOpen] = useState(false);
  const [inquiriesModalOpen, setInquiriesModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Top Floating Navigation */}
      <Navbar
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenInquiriesModal={() => setInquiriesModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        <HeroSection onOpenResumeModal={() => setResumeModalOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <McpSection />
        <JourneySection />
        <LabSection />
        <ContactSection
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onOpenGithubModal={() => setGithubModalOpen(true)}
        />
      </main>

      {/* Footer with Live System Health */}
      <Footer
        onOpenGithubModal={() => setGithubModalOpen(true)}
        onOpenInquiriesModal={() => setInquiriesModalOpen(true)}
      />

      {/* Resume Download / Information Modal */}
      <Modal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        title="Jigar Rohit — Engineering Resume"
      >
        <div className="space-y-5 text-sm text-zinc-300">
          <div className="p-4 rounded-xl bg-black border border-white/10 space-y-2">
            <span className="text-xs font-mono text-white font-semibold block">
              MCP Integration Developer · Python Backend Engineer
            </span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Curriculum vitae covering high-volume Python data pipelines (~2M records), FastAPI enterprise microservices, PostgreSQL with Flyway migrations, and multi-model AI system orchestration.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-white">Engineering Highlights in Resume:</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
                <span>Alef Migration: Advanced Python ETL scripts (~2M records)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
                <span>IMS: FastAPI, PostgreSQL, Flyway, RBAC architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
                <span>NamoGPT: Multi-model AI gateway with LiteLLM & dynamic router</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <a
              href="/resume.pdf"
              download="Jigar_Rohit_Resume.pdf"
              onClick={() => {
                // If static resume file is not yet dropped in public directory, give a clean notice
                fetch('/resume.pdf', { method: 'HEAD' }).then((res) => {
                  if (!res.ok) {
                    alert('Note: Place your official resume.pdf file into the frontend/public folder to enable instant 1-click downloads.');
                  }
                }).catch(() => {});
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-zinc-200 text-black flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-white/5"
            >
              <Download className="w-4 h-4" />
              Download Resume (PDF)
            </a>

            <button
              onClick={() => setResumeModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* GitHub Repository Modal */}
      <Modal
        isOpen={githubModalOpen}
        onClose={() => setGithubModalOpen(false)}
        title="GitHub Repository Structure"
      >
        <div className="space-y-5 text-sm text-zinc-300">
          <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <Terminal className="w-4 h-4" />
              <span>Production Monorepo Repository Tree</span>
            </div>
            <pre className="text-zinc-300 text-[11px] leading-relaxed overflow-x-auto p-2 bg-zinc-950 rounded border border-white/5">
{`portfolio/
├── frontend/             # React 19 + TypeScript + Vite + Tailwind CSS + Three.js
│   ├── src/
│   │   ├── components/   # 3D Canvas, Sections, Modals, Navbar, Footer
│   │   ├── data/         # Projects data, Skills data, MCP schemas
│   │   └── types/        # TypeScript strict domain interfaces
│   └── vite.config.ts
├── backend/              # FastAPI Python 3.11 High-Throughput REST API
│   ├── app/
│   │   ├── routers/      # Health, Projects, Contact, Simulations
│   │   ├── schemas.py    # Pydantic models with input sanitization
│   │   └── main.py       # CORS & FastAPI entry point
│   ├── tests/            # Automated Pytest suite (10/10 passing)
│   └── requirements.txt
├── .github/workflows/    # CI/CD Pipeline (Pytest + Vite Build + Pages Deploy)
├── render.yaml           # Automated Render Web Service & Static Site Spec
└── README.md             # Architecture, Local Run & Deployment Guide`}
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-black border border-white/10 text-xs text-zinc-400">
            <p className="mb-2">
              GitHub repository URL:
            </p>
            <code className="text-white block bg-zinc-950 p-2.5 rounded text-[11px] font-mono border border-white/5">
              https://github.com/Rohit-Jigar/3d-portfolio
            </code>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setGithubModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Inquiries Live Feed Admin Modal */}
      <InquiriesModal
        isOpen={inquiriesModalOpen}
        onClose={() => setInquiriesModalOpen(false)}
      />
    </div>
  );
}
