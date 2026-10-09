import { useState } from 'react';
import { PROJECTS_DATA, PIPELINE_STAGES, IMS_MODULES, NAMO_PROVIDERS_EXPLORED } from '../../data/projectsData';
import type { ProjectDetail } from '../../types';
import {
  Activity,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  KeyRound,
  Layers,
  ChevronRight
} from 'lucide-react';
import Modal from '../ui/Modal';

// ----------------------------------------------------
// 1. ALEF MIGRATION INTERACTIVE PIPELINE VISUALIZER (MONOCHROME)
// ----------------------------------------------------
function AlefPipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(1);
  const currentStage = PIPELINE_STAGES.find((s) => s.step === activeStep) || PIPELINE_STAGES[0];

  return (
    <div className="rounded-2xl bg-zinc-950 border border-white/10 p-6 backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-zinc-900">
        <div>
          <span className="text-xs font-mono text-white font-semibold tracking-wider uppercase flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" />
            Interactive 8-Stage Pipeline Explorer (~2M Records)
          </span>
          <h4 className="text-xs text-zinc-400 font-light mt-0.5">
            Click stages below to inspect record mutations and validation gates
          </h4>
        </div>
        <div className="px-3 py-1 rounded-full bg-zinc-900 border border-white/15 text-xs font-mono text-zinc-200">
          Scale: ~2,000,000 Records
        </div>
      </div>

      {/* Visual Pipeline Nodes Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
        {PIPELINE_STAGES.map((stage) => {
          const isSelected = activeStep === stage.step;
          return (
            <button
              key={stage.step}
              onClick={() => setActiveStep(stage.step)}
              className={`p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between h-20 ${
                isSelected
                  ? 'bg-white text-black border-white shadow-xl ring-1 ring-white'
                  : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-black' : 'text-zinc-500'}`}>
                  0{stage.step}
                </span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />}
              </div>
              <div className={`text-[11px] font-semibold leading-tight line-clamp-2 ${isSelected ? 'text-black' : 'text-zinc-300'}`}>
                {stage.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Inspection Details Panel */}
      <div className="rounded-xl bg-black border border-white/10 p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            <h5 className="text-base font-bold text-white tracking-tight">
              Stage {currentStage.step}: {currentStage.title}
            </h5>
            <span className="text-xs font-mono text-zinc-400">({currentStage.subtitle})</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            {currentStage.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                Input Payload State
              </span>
              <span className="font-mono text-zinc-300">{currentStage.inputSchema}</span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Output Payload State
              </span>
              <span className="font-mono text-white font-medium">{currentStage.outputSchema}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-2.5 font-bold tracking-wider">
              Pipeline Guarantees
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-light">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
                <span>Memory-safe chunked batching</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
                <span>Destination acceptance validation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-white" />
                <span>Isolated anomaly quarantine</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Stage {activeStep} of 8</span>
            <button
              onClick={() => setActiveStep((prev) => (prev % 8) + 1)}
              className="text-white hover:text-zinc-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              Next Stage <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. IMS ENTERPRISE DASHBOARD & RBAC VISUALIZER (MONOCHROME)
// ----------------------------------------------------
function ImsDashboardVisualizer() {
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Support' | 'Developer'>('Admin');
  const [activeModule, setActiveModule] = useState('assets');

  const rolePermissions = {
    Admin: {
      tag: 'Full Enterprise Governance',
      canManageUsers: true,
      canRunFlyway: true,
      canAssignAssets: true,
      canCloseTickets: true,
      scope: 'Global Read/Write, Flyway Migration Executor, RBAC Manager'
    },
    Support: {
      tag: 'Operations & Triage',
      canManageUsers: false,
      canRunFlyway: false,
      canAssignAssets: true,
      canCloseTickets: true,
      scope: 'Hardware Inventory Read/Update, Ticket Queue Triage & Resolution'
    },
    Developer: {
      tag: 'Self-Service & Requests',
      canManageUsers: false,
      canRunFlyway: false,
      canAssignAssets: false,
      canCloseTickets: false,
      scope: 'Personal Assigned Hardware View, Submit & Track IT Support Tickets'
    }
  };

  const currentRoleInfo = rolePermissions[selectedRole];

  return (
    <div className="rounded-2xl bg-zinc-950 border border-white/10 p-6 backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-900">
        <div>
          <span className="text-xs font-mono text-white font-semibold tracking-wider uppercase flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Interactive Enterprise Architecture & RBAC Matrix
          </span>
          <h4 className="text-xs text-zinc-400 font-light mt-0.5">
            FastAPI + PostgreSQL + Flyway Migrations + React UI
          </h4>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
          {(['Admin', 'Support', 'Developer'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedRole === role
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Role View Overview */}
      <div className="p-4 rounded-xl bg-black border border-white/10 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-zinc-300">Active Role:</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/15 text-white font-semibold">
              {selectedRole} — {currentRoleInfo.tag}
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-light">
            Enforced Scope: <span className="text-zinc-200">{currentRoleInfo.scope}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono">
          <span className={`px-2 py-0.5 rounded border ${currentRoleInfo.canRunFlyway ? 'bg-zinc-900 text-white border-white/20' : 'bg-black text-zinc-600 border-zinc-800'}`}>
            Flyway Migration: {currentRoleInfo.canRunFlyway ? 'Authorized' : 'Restricted'}
          </span>
          <span className={`px-2 py-0.5 rounded border ${currentRoleInfo.canAssignAssets ? 'bg-zinc-900 text-white border-white/20' : 'bg-black text-zinc-600 border-zinc-800'}`}>
            Asset Allocation: {currentRoleInfo.canAssignAssets ? 'Write' : 'Read-Only'}
          </span>
        </div>
      </div>

      {/* Six Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {IMS_MODULES.map((mod) => (
          <div
            key={mod.id}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeModule === mod.id
                ? 'bg-zinc-900 border-white/40 text-white shadow-lg'
                : 'bg-black/60 border-white/8 hover:border-white/20'
            }`}
            onClick={() => setActiveModule(mod.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">{mod.name}</span>
              <span className="text-[10px] font-mono text-zinc-400">REST API</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              {mod.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. NAMOGPT MULTI-MODEL ROUTER VISUALIZER (MONOCHROME)
// ----------------------------------------------------
function NamoRouterVisualizer() {
  const [selectedPromptType, setSelectedPromptType] = useState<'coding' | 'latency' | 'context' | 'reasoning'>('coding');

  const routerScenarios = {
    coding: {
      type: 'Code Generation & Refactoring',
      sample: 'Implement a thread-safe connection pool with exponential backoff in Python',
      routedProvider: 'Anthropic (Claude 3.5 Sonnet) / Groq Qwen-Coder',
      reason: 'Superior AST validation, complex multi-file logic, and minimal hallucination',
      latency: '~850ms',
      fallbackChain: ['Groq: DeepSeek Coder', 'Google: Gemini 1.5 Pro', 'Ollama: Local Coder'],
      securityNote: 'API Key stored exclusively in client memory session'
    },
    latency: {
      type: 'Real-Time Fast Query',
      sample: 'Format this JSON string and return the schema fields',
      routedProvider: 'Groq (Llama-3.1-8b-instant)',
      reason: 'Sub-150ms TTFT execution on specialized LPU hardware acceleration',
      latency: '~120ms',
      fallbackChain: ['Cloudflare Workers AI: Llama-3.1', 'Google: Gemini Flash'],
      securityNote: 'Direct streaming token pipe without persistent logs'
    },
    context: {
      type: 'Large Document / Multi-Repo Analysis',
      sample: 'Analyze full repository git log and cross-reference 500-page specification PDF',
      routedProvider: 'Google Gemini (1.5 Pro)',
      reason: 'Massive 2,000,000 token context window capacity for end-to-end document ingest',
      latency: '~1,100ms',
      fallbackChain: ['Anthropic: Claude 3.5 (200k)', 'LiteLLM Proxy'],
      securityNote: 'Multi-chunk streaming payload isolation'
    },
    reasoning: {
      type: 'Complex Synthetic Reasoning & Tool Use',
      sample: 'Plan an automated migration schema strategy across distributed databases',
      routedProvider: 'NVIDIA NIM / Nemotron (70B)',
      reason: 'High synthetic reasoning benchmark alignment and structured tool execution',
      latency: '~650ms',
      fallbackChain: ['Groq: Llama 3.3 70B', 'Google: Gemini 1.5 Flash', 'Ollama: Local 70B'],
      securityNote: 'Zero-trust credential authorization layer'
    }
  };

  const currentScenario = routerScenarios[selectedPromptType];

  return (
    <div className="rounded-2xl bg-zinc-950 border border-white/10 p-6 backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-900">
        <div>
          <span className="text-xs font-mono text-white font-semibold tracking-wider uppercase flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-white" />
            Intelligent Multi-Model Router & Gateway Architecture
          </span>
          <h4 className="text-xs text-zinc-400 font-light mt-0.5">
            Dynamic routing across 11+ providers, model families, and routing brokers
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-200 bg-zinc-900 border border-white/15 px-3 py-1 rounded-full">
          <KeyRound className="w-3.5 h-3.5 text-white" />
          <span>Client-Isolated API Key Security</span>
        </div>
      </div>

      {/* Prompt Scenario Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs text-zinc-400 self-center mr-1">Task Type:</span>
        {(['coding', 'latency', 'context', 'reasoning'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedPromptType(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              selectedPromptType === type
                ? 'bg-white text-black font-bold shadow-md'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Routing Flow Visualization */}
      <div className="p-5 rounded-xl bg-black border border-white/10 mb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="px-2 py-0.5 rounded bg-zinc-900 text-white font-semibold">PROMPT</span>
          <span className="text-zinc-300 italic">"{currentScenario.sample}"</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
              Selected Model
            </span>
            <span className="text-sm font-bold text-white block mb-1">
              {currentScenario.routedProvider}
            </span>
            <span className="text-[11px] text-zinc-400 font-light">
              Latency: <strong className="text-white font-mono">{currentScenario.latency}</strong>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
              Routing Heuristic Rationale
            </span>
            <p className="text-xs text-zinc-300 leading-snug font-light">
              {currentScenario.reason}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
              Failover Chain
            </span>
            <div className="space-y-1">
              {currentScenario.fallbackChain.map((fb, idx) => (
                <div key={idx} className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <span className="text-white">→</span>
                  <span>{fb}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Provider Matrix Preview */}
      <div>
        <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2.5 font-bold tracking-wider">
          Integrated Model Families, Providers & Routing Gateways
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {NAMO_PROVIDERS_EXPLORED.slice(0, 8).map((p, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/8 text-left">
              <span className="text-xs font-semibold text-white block truncate">{p.name}</span>
              <span className="text-[10px] text-zinc-400 block font-mono truncate">{p.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN PROJECTS SECTION (MONOCHROME)
// ----------------------------------------------------
export default function ProjectsSection() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectDetail | null>(null);

  return (
    <section id="projects" className="relative py-28 px-6 bg-black border-t border-zinc-900">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300 mb-4">
            <Layers className="w-3.5 h-3.5 text-white" />
            <span className="tracking-wider uppercase text-[11px]">PRODUCTION ENGINEERING SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Featured <span className="text-gradient-silver">Engineering Projects</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-light">
            Deep-dive technical showcases demonstrating high-volume data migration at ~2M record scale, enterprise RBAC platforms, and multi-provider AI model orchestration.
          </p>
        </div>

        {/* ---------------- PROJECT 1: ALEF MIGRATION ---------------- */}
        <div className="mb-20 rounded-3xl bg-zinc-950 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-white text-black font-bold">
                  PROJECT 01
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Data Engineering · Python Automation · Data Migration
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-900 border border-white/15 text-zinc-200 font-semibold">
                  ~2,000,000 Records Scale
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                Alef Migration
              </h3>

              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                "Engineered advanced Python scripts to prepare and migrate approximately two million records from a source server to a destination server with different acceptance criteria."
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {['Python', 'Data Engineering', 'Data Migration', 'Data Validation', 'Data Transformation', 'Automation'].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-white/8">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCaseStudy(PROJECTS_DATA[0])}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-white/15 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
            >
              Expand Full Case Study
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <AlefPipelineVisualizer />
        </div>

        {/* ---------------- PROJECT 2: IMS INVENTORY MANAGEMENT ---------------- */}
        <div className="mb-20 rounded-3xl bg-zinc-950 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-white text-black font-bold">
                  PROJECT 02
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Enterprise Application · Backend Engineering · RBAC
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-900 border border-white/15 text-zinc-200 font-semibold">
                  FastAPI + PostgreSQL + Flyway
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                IMS: Inventory Management System
              </h3>

              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                "Developed an inventory management and IT ticketing system that combines hardware asset tracking with structured IT support workflows."
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {['React', 'Tailwind CSS', 'Python', 'FastAPI', 'PostgreSQL', 'Flyway', 'RBAC', 'REST APIs'].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-white/8">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCaseStudy(PROJECTS_DATA[1])}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-white/15 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
            >
              Expand Full Case Study
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <ImsDashboardVisualizer />
        </div>

        {/* ---------------- PROJECT 3: NAMOGPT MULTI-MODEL PLATFORM ---------------- */}
        <div className="rounded-3xl bg-zinc-950 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-white text-black font-bold">
                  PROJECT 03
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  AI Engineering · Multi-Model Platform · LLM Integration
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-900 border border-white/15 text-zinc-200 font-semibold">
                  11+ Model Providers & Services
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                NamoGPT
              </h3>

              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                "Built a multi-provider GPT-style AI application that integrates multiple model providers and routing services, with an automatic model-selection mode and user-configurable API credentials."
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {['Python', 'AI/LLM Integration', 'Model Routing', 'API Integration', 'LiteLLM', 'Multi-Provider Architecture'].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-white/8">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCaseStudy(PROJECTS_DATA[2])}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-white/15 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
            >
              Expand Full Case Study
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <NamoRouterVisualizer />
        </div>
      </div>

      {/* Case Study Detail Modal (Monochrome) */}
      {selectedCaseStudy && (
        <Modal
          isOpen={!!selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          title={`${selectedCaseStudy.title} — Comprehensive Case Study`}
        >
          <div className="space-y-6 text-sm text-zinc-300">
            <div>
              <span className="text-xs font-mono text-zinc-400 block mb-1">
                {selectedCaseStudy.category}
              </span>
              <p className="text-base font-semibold text-white">
                {selectedCaseStudy.headline}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold tracking-wider">
                1. Problem Being Solved
              </h4>
              <p className="p-4 rounded-xl bg-black border border-zinc-800 text-zinc-300 leading-relaxed font-light">
                {selectedCaseStudy.problemStatement}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold tracking-wider">
                2. Key Engineering Contributions
              </h4>
              <ul className="space-y-2">
                {selectedCaseStudy.engineeringContributions.map((contrib, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-200">
                    <CheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span className="font-light">{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold tracking-wider">
                3. Architecture & Components
              </h4>
              <p className="text-xs text-zinc-400 mb-3">
                {selectedCaseStudy.architecture.overview}
              </p>
              <div className="p-4 rounded-xl bg-black border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedCaseStudy.architecture.components.map((comp, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold tracking-wider">
                4. Key Engineering Challenges
              </h4>
              <div className="space-y-2">
                {selectedCaseStudy.engineeringChallenges.map((challenge, i) => (
                  <div key={i} className="p-3 rounded-lg bg-black border border-zinc-800 text-xs text-zinc-300 font-light">
                    {challenge}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
              <span>Verified implementation based strictly on provided engineering notes.</span>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer font-sans"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
