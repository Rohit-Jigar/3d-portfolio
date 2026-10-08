import React from 'react';
import {
  Compass,
  Shield,
  Layers,
  KeyRound,
  FileCheck2,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface PrincipleCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function PrincipleCard({ number, title, description, icon }: PrincipleCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-bold text-cyan-400/80">{number}</span>
        <div className="p-2 rounded-lg bg-slate-800/80 text-gray-300 group-hover:text-cyan-300 transition-colors">
          {icon}
        </div>
      </div>
      <h4 className="text-sm font-bold text-gray-200 mb-1.5 group-hover:text-white transition-colors">
        {title}
      </h4>
      <p className="text-xs text-gray-400 font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
}

const MILESTONES = [
  {
    category: 'Data Engineering & Pipeline Automation',
    title: 'High-Scale Migration Workflows (~2M Records)',
    description:
      'Engineered modular Python batch scripts to extract, sanitize, transform, and transfer approximately two million records from a source server to a destination server with different acceptance criteria. Built validation logic and error isolation.',
    tags: ['Python 3.11', 'Batch Processing', 'ETL', 'Error Quarantine']
  },
  {
    category: 'Enterprise Backend Engineering',
    title: 'IMS: Role-Governed Hardware Inventory & Ticketing',
    description:
      'Developed FastAPI REST backend, React frontend, and PostgreSQL database layer with Flyway migrations. Enforced Role-Based Access Control (Admin, Support Engineer, Developer) across hardware assignment and IT ticket queues.',
    tags: ['FastAPI', 'PostgreSQL', 'Flyway Migrations', 'RBAC']
  },
  {
    category: 'AI / LLM Systems Architecture',
    title: 'NamoGPT: Multi-Model Gateway & Intelligent Routing',
    description:
      'Engineered multi-provider GPT-style platform unifying 11+ model providers and routing brokers. Implemented heuristic prompt routing (coding, latency, reasoning, large context) and client-isolated API key security.',
    tags: ['LiteLLM', 'Model Routing', 'API Isolation', 'Async I/O']
  },
  {
    category: 'Model Context Protocol (MCP)',
    title: 'Standardized Tool Integration & Protocol Handshakes',
    description:
      'Integrated MCP architectures bridging AI reasoning models to structured database schemas, external REST APIs, and automated validation gates via JSON-RPC 2.0 interfaces.',
    tags: ['MCP Standard', 'JSON-RPC 2.0', 'Tool Binding', 'Schema Discovery']
  }
];

export default function JourneySection() {
  return (
    <section id="journey" className="relative py-28 px-6 bg-[#030712] border-t border-slate-900/80">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENGINEERING PATH & PRINCIPLES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Selected <span className="text-gradient-cyan">Engineering Work</span>
          </h2>

          <p className="text-base text-gray-400 font-light">
            A track record grounded in real system implementations: high-volume data transformation, enterprise backend design, multi-model AI routing, and protocol integrations.
          </p>
        </div>

        {/* Selected Engineering Work Timeline */}
        <div className="mb-20 space-y-6">
          {MILESTONES.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/30 backdrop-blur-md transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  {item.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-gray-300 border border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* 6 Engineering Principles Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              Engineering Principles
            </h3>
            <p className="text-xs text-gray-400">
              The foundational tenets that guide my backend design, integration architecture, and data pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PrincipleCard
              number="01"
              title="Reliability Before Unnecessary Complexity"
              description="Prioritizing simple, auditable, and resilient architectures over speculative abstractions that increase failure modes."
              icon={<Shield className="w-4 h-4 text-cyan-400" />}
            />
            <PrincipleCard
              number="02"
              title="Clear Separation of Concerns"
              description="Decoupling data access, API routing, business logic, and presentation layers for independent scalability and testability."
              icon={<Layers className="w-4 h-4 text-violet-400" />}
            />
            <PrincipleCard
              number="03"
              title="Secure Handling of Credentials"
              description="Zero secrets in client code or repositories. Environment-based injection, client-isolated sessions, and strict principle of least privilege."
              icon={<KeyRound className="w-4 h-4 text-emerald-400" />}
            />
            <PrincipleCard
              number="04"
              title="Maintainable & Testable Code"
              description="Writing clean, typed, modular code backed by automated unit tests, strict validation schemas, and reproducible migrations."
              icon={<FileCheck2 className="w-4 h-4 text-blue-400" />}
            />
            <PrincipleCard
              number="05"
              title="Explicit Validation & Error Handling"
              description="Never assuming input sanity. Enforcing strict non-null checks, Pydantic type validation, and graceful failure isolation."
              icon={<AlertTriangle className="w-4 h-4 text-amber-400" />}
            />
            <PrincipleCard
              number="06"
              title="Performance-Aware Architecture"
              description="Designing memory-conscious generators, database connection pools, async non-blocking I/O, and latency-optimized routing."
              icon={<Zap className="w-4 h-4 text-rose-400" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
