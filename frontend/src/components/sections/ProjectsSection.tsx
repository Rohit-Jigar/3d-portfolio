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
// 1. ALEF MIGRATION INTERACTIVE PIPELINE VISUALIZER
// ----------------------------------------------------
function AlefPipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(1);
  const currentStage = PIPELINE_STAGES.find((s) => s.step === activeStep) || PIPELINE_STAGES[0];

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-cyan-500/30 p-6 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Interactive 8-Stage Pipeline Explorer (~2M Records)
          </span>
          <h4 className="text-sm text-gray-300 font-medium">
            Click stages below to inspect record mutations and verification gates
          </h4>
        </div>
        <div className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300">
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
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-100 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                  : 'bg-slate-900/40 border-slate-800 text-gray-400 hover:text-gray-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono font-bold text-cyan-400">
                  0{stage.step}
                </span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
              </div>
              <div className="text-[11px] font-semibold leading-tight line-clamp-2">
                {stage.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Inspection Details Panel */}
      <div className="rounded-xl bg-slate-900/70 border border-cyan-500/20 p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h5 className="text-base font-bold text-white">
              Stage {currentStage.step}: {currentStage.title}
            </h5>
            <span className="text-xs font-mono text-cyan-400/90">({currentStage.subtitle})</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-light">
            {currentStage.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">
                Input Payload State
              </span>
              <span className="font-mono text-gray-300">{currentStage.inputSchema}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 uppercase block mb-1">
                Output Payload State
              </span>
              <span className="font-mono text-cyan-300">{currentStage.outputSchema}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-400 block mb-2">
              Pipeline Guarantees
            </span>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Memory-safe chunked batching</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Destination acceptance validation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Isolated anomaly quarantine</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span>Stage {activeStep} of 8</span>
            <button
              onClick={() => setActiveStep((prev) => (prev % 8) + 1)}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              Next Node <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. IMS ENTERPRISE DASHBOARD & RBAC VISUALIZER
// ----------------------------------------------------
function ImsDashboardVisualizer() {
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Support' | 'Developer'>('Admin');
  const [activeModule, setActiveModule] = useState('assets');

  const rolePermissions = {
    Admin: {
      tag: 'Full Enterprise Governance',
      color: 'text-rose-400 border-rose-500/30 bg-rose-950/40',
      canManageUsers: true,
      canRunFlyway: true,
      canAssignAssets: true,
      canCloseTickets: true,
      scope: 'Global Read/Write, Flyway Migration Executor, RBAC Manager'
    },
    Support: {
      tag: 'Operations & Triage',
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
      canManageUsers: false,
      canRunFlyway: false,
      canAssignAssets: true,
      canCloseTickets: true,
      scope: 'Hardware Inventory Read/Update, Ticket Queue Triage & Resolution'
    },
    Developer: {
      tag: 'Self-Service & Requests',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
      canManageUsers: false,
      canRunFlyway: false,
      canAssignAssets: false,
      canCloseTickets: false,
      scope: 'Personal Assigned Hardware View, Submit & Track IT Support Tickets'
    }
  };

  const currentRoleInfo = rolePermissions[selectedRole];

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-violet-500/30 p-6 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-violet-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Interactive Enterprise Architecture & RBAC Matrix
          </span>
          <h4 className="text-sm text-gray-300 font-medium">
            FastAPI + PostgreSQL + Flyway Migrations + React UI
          </h4>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {(['Admin', 'Support', 'Developer'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedRole === role
                  ? 'bg-violet-600 text-white font-semibold shadow-md'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Role View Overview */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-violet-500/20 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-200">Current Role Tier:</span>
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${currentRoleInfo.color}`}>
              {selectedRole} — {currentRoleInfo.tag}
            </span>
          </div>
          <p className="text-xs text-gray-400 font-light">
            Enforced Scope: <span className="text-gray-200">{currentRoleInfo.scope}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono">
          <span className={`px-2 py-0.5 rounded ${currentRoleInfo.canRunFlyway ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-gray-500'}`}>
            Flyway Migration: {currentRoleInfo.canRunFlyway ? 'Authorized' : 'Restricted'}
          </span>
          <span className={`px-2 py-0.5 rounded ${currentRoleInfo.canAssignAssets ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-gray-500'}`}>
            Asset Allocation: {currentRoleInfo.canAssignAssets ? 'Write' : 'Read-Only'}
          </span>
        </div>
      </div>

      {/* Six Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {IMS_MODULES.map((mod) => (
          <div
            key={mod.id}
            className={`p-4 rounded-xl border transition-all ${
              activeModule === mod.id
                ? 'bg-violet-950/40 border-violet-400 text-violet-100 shadow-md'
                : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
            }`}
            onClick={() => setActiveModule(mod.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-200">{mod.name}</span>
              <span className="text-[10px] font-mono text-violet-400">REST API</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              {mod.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. NAMOGPT MULTI-MODEL ROUTER VISUALIZER
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
    <div className="rounded-2xl bg-slate-950/80 border border-blue-500/30 p-6 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-blue-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            Intelligent Multi-Model Router & Gateway Architecture
          </span>
          <h4 className="text-sm text-gray-300 font-medium">
            Dynamic routing across 11+ providers, model families, and routing brokers
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Client-Isolated API Key Security</span>
        </div>
      </div>

      {/* Prompt Scenario Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs text-gray-400 self-center mr-1">Test Task Type:</span>
        {(['coding', 'latency', 'context', 'reasoning'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedPromptType(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              selectedPromptType === type
                ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/30'
                : 'bg-slate-900 text-gray-400 hover:text-white border border-slate-800'
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Routing Flow Visualization */}
      <div className="p-5 rounded-xl bg-slate-900/70 border border-blue-500/20 mb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-gray-200">SAMPLE PROMPT</span>
          <span className="text-gray-300 italic">"{currentScenario.sample}"</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">
              Dynamic Model Selected
            </span>
            <span className="text-sm font-bold text-cyan-300 block mb-1">
              {currentScenario.routedProvider}
            </span>
            <span className="text-[11px] text-gray-400 font-light">
              Est. Latency: <strong className="text-white font-mono">{currentScenario.latency}</strong>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">
              Routing Heuristic Rationale
            </span>
            <p className="text-xs text-gray-300 leading-snug font-light">
              {currentScenario.reason}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">
              Failover Fallback Chain
            </span>
            <div className="space-y-1">
              {currentScenario.fallbackChain.map((fb, idx) => (
                <div key={idx} className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                  <span className="text-cyan-400">→</span>
                  <span>{fb}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Provider Matrix Preview */}
      <div>
        <span className="text-[11px] font-mono uppercase text-gray-400 block mb-2.5">
          Integrated Model Families, Providers & Routing Gateways
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {NAMO_PROVIDERS_EXPLORED.slice(0, 8).map((p, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800 text-left">
              <span className="text-xs font-semibold text-gray-200 block truncate">{p.name}</span>
              <span className="text-[10px] text-gray-400 block font-mono truncate">{p.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN PROJECTS SECTION
// ----------------------------------------------------
export default function ProjectsSection() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectDetail | null>(null);

  return (
    <section id="projects" className="relative py-28 px-6 bg-[#030712] border-t border-slate-900/80">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>PRODUCTION ENGINEERING PORTFOLIO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Featured <span className="text-gradient-cyan">Engineering Projects</span>
          </h2>

          <p className="text-base text-gray-300">
            Deep-dive technical showcases demonstrating high-volume data migration at ~2M record scale, enterprise RBAC platforms, and multi-provider AI model orchestration.
          </p>
        </div>

        {/* ---------------- PROJECT 1: ALEF MIGRATION ---------------- */}
        <div className="mb-20 rounded-3xl bg-slate-900/40 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold">
                  PROJECT 01
                </span>
                <span className="text-xs font-mono text-gray-400">
                  Data Engineering · Python Automation · Data Migration
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  ~2,000,000 Records Scale
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Alef Migration
              </h3>

              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-4">
                "Engineered advanced Python scripts to prepare and migrate approximately two million records from a source server to a destination server with different acceptance criteria."
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {['Python', 'Data Engineering', 'Data Migration', 'Data Validation', 'Data Transformation', 'Automation'].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800/80 text-cyan-200 border border-slate-700/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCaseStudy(PROJECTS_DATA[0])}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              Expand Full Case Study
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Pipeline Visualizer Component */}
          <AlefPipelineVisualizer />
        </div>

        {/* ---------------- PROJECT 2: IMS INVENTORY MANAGEMENT ---------------- */}
        <div className="mb-20 rounded-3xl bg-slate-900/40 border border-violet-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-violet-950/80 border border-violet-500/40 text-violet-300 font-semibold">
                  PROJECT 02
                </span>
                <span className="text-xs font-mono text-gray-400">
                  Enterprise Application · Backend Engineering · RBAC
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-violet-950/60 border border-violet-500/40 text-violet-300">
                  FastAPI + PostgreSQL + Flyway
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                IMS: Inventory Management System
              </h3>

              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-4">
                "Developed an inventory management and IT ticketing system that combines hardware asset tracking with structured IT support workflows."
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {['React', 'Tailwind CSS', 'Python', 'FastAPI', 'PostgreSQL', 'Flyway', 'RBAC', 'REST APIs'].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800/80 text-violet-200 border border-slate-700/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCaseStudy(PROJECTS_DATA[1])}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              Expand Full Case Study
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive IMS Visualizer Component */}
          <ImsDashboardVisualizer />
        </div>

        {/* ---------------- PROJECT 3: NAMOGPT MULTI-MODEL PLATFORM ---------------- */}
        <div className="rounded-3xl bg-slate-900/40 border border-blue-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-blue-950/80 border border-blue-500/40 text-blue-300 font-semibold">
                  PROJECT 03
                </span>
                <span className="text-xs font-mono text-gray-400">
                  AI Engineering · Multi-Model Platform · LLM Integration
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-950/60 border border-blue-500/40 text-blue-300">
                  11+ Model Providers & Services
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                NamoGPT
              </h3>

              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-4">
                "Built a multi-provider GPT-style AI application that integrates multiple model providers and routing services, with an automatic model-selection mode and user-configurable API credentials."
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {['Python', 'AI/LLM Integration', 'Model Routing', 'API Integration', 'LiteLLM', 'Multi-Provider Architecture'].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800/80 text-blue-200 border border-slate-700/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCaseStudy(PROJECTS_DATA[2])}
              className="px-5 py-2.5 rounded-xl text-xs font-medium text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              Expand Full Case Study
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Router Visualizer Component */}
          <NamoRouterVisualizer />
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedCaseStudy && (
        <Modal
          isOpen={!!selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          title={`${selectedCaseStudy.title} — Comprehensive Engineering Case Study`}
        >
          <div className="space-y-6 text-sm text-gray-300">
            <div>
              <span className="text-xs font-mono text-cyan-400 block mb-1">
                {selectedCaseStudy.category}
              </span>
              <p className="text-base font-semibold text-white">
                {selectedCaseStudy.headline}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-gray-400 mb-2 font-bold tracking-wider">
                1. Problem Being Solved
              </h4>
              <p className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-gray-300 leading-relaxed font-light">
                {selectedCaseStudy.problemStatement}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-gray-400 mb-2 font-bold tracking-wider">
                2. Key Engineering Contributions
              </h4>
              <ul className="space-y-2">
                {selectedCaseStudy.engineeringContributions.map((contrib, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-200">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-gray-400 mb-2 font-bold tracking-wider">
                3. Architecture & Components
              </h4>
              <p className="text-xs text-gray-400 mb-3">
                {selectedCaseStudy.architecture.overview}
              </p>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedCaseStudy.architecture.components.map((comp, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-gray-400 mb-2 font-bold tracking-wider">
                4. Key Engineering Challenges
              </h4>
              <div className="space-y-2">
                {selectedCaseStudy.engineeringChallenges.map((challenge, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-amber-500/20 text-xs text-gray-300">
                    {challenge}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 font-mono">
              <span>Verified implementation based strictly on provided engineering notes.</span>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
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
