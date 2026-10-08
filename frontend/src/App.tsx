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
import { Download, CheckCircle, Terminal } from 'lucide-react';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [githubModalOpen, setGithubModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Floating Navigation */}
      <Navbar onOpenResumeModal={() => setResumeModalOpen(true)} />

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
      <Footer onOpenGithubModal={() => setGithubModalOpen(true)} />

      {/* Resume Download / Information Modal */}
      <Modal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        title="Jigar Rohit — Engineering Resume"
      >
        <div className="space-y-5 text-sm text-gray-300">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
            <span className="text-xs font-mono text-cyan-400 font-semibold block">
              MCP Integration Developer · Python Backend Engineer
            </span>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Curriculum vitae covering high-volume Python data pipelines (~2M records), FastAPI enterprise microservices, PostgreSQL with Flyway migrations, and multi-model AI system orchestration.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-white">Engineering Highlights in Resume:</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Alef Migration: Advanced Python ETL scripts (~2M records)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>IMS: FastAPI, PostgreSQL, Flyway, RBAC architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>NamoGPT: Multi-model AI gateway with LiteLLM & dynamic router</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
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
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              Download Resume (PDF)
            </a>

            <button
              onClick={() => setResumeModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
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
        <div className="space-y-5 text-sm text-gray-300">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>Production Monorepo Repository Tree</span>
            </div>
            <pre className="text-gray-300 text-[11px] leading-relaxed overflow-x-auto p-2 bg-black/40 rounded">
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
├── render.yaml           # Automated Render Web Service & Static Site Spec
└── README.md             # Architecture, Local Run & Deployment Guide`}
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-gray-400">
            <p className="mb-2">
              To connect your GitHub account:
            </p>
            <code className="text-cyan-300 block bg-black/60 p-2 rounded text-[11px] font-mono">
              git remote add origin https://github.com/&lt;YOUR_GITHUB_USERNAME&gt;/portfolio.git
            </code>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setGithubModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
