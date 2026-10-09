import React, { useState } from 'react';
import { Server, Network, Database, CheckCircle2, Layers } from 'lucide-react';

interface DimensionCardProps {
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  highlights: string[];
}

function DimensionCard({
  icon,
  title,
  category,
  description,
  highlights,
}: DimensionCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative rounded-2xl p-7 flex flex-col justify-between backdrop-blur-2xl bg-zinc-950/70 border border-white/10 hover:border-white/30 shadow-2xl group transition-all duration-300"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white shadow-inner group-hover:bg-white/10 transition-colors">
            {icon}
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-300 uppercase tracking-widest font-semibold">
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed font-light">
          {description}
        </p>

        {/* Feature bullets */}
        <div className="space-y-2.5 border-t border-zinc-900 pt-5">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
              <span className="font-light">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6 bg-black border-t border-zinc-900 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300 mb-4">
            <Layers className="w-3.5 h-3.5 text-white" />
            <span className="tracking-wider uppercase text-[11px]">CORE ARCHITECTURAL IDENTITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Engineering Systems <span className="text-gradient-silver">Beyond the Surface</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
            I'm Jigar Rohit, a developer focused on building reliable backend systems, integrating AI capabilities, and solving complex engineering problems. My work includes high-volume data migration and transformation, enterprise inventory and ticketing systems, and multi-provider AI platforms. I enjoy connecting technologies into practical, maintainable solutions.
          </p>
        </div>

        {/* Three Dimensional Focus Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <DimensionCard
            icon={<Server className="w-5 h-5 text-white" />}
            title="Backend Engineering"
            category="APIs & Architecture"
            description="Building robust RESTful APIs, high-throughput asynchronous services, and secure business logic with PostgreSQL and Flyway versioning."
            highlights={[
              'FastAPI & asynchronous request handlers',
              'Role-Based Access Control (RBAC) authorization models',
              'Strict Pydantic payload sanitization & validation',
              'PostgreSQL schema design & Flyway migration scripts'
            ]}
          />

          <DimensionCard
            icon={<Network className="w-5 h-5 text-white" />}
            title="AI & MCP Integration"
            category="Tool Calling & LLMs"
            description="Connecting autonomous AI models, Model Context Protocol (MCP) servers, multi-provider inference routing, and real-world tools."
            highlights={[
              'Model Context Protocol (MCP) server & client integration',
              'Multi-provider orchestration (Gemini, Groq, Anthropic, Ollama)',
              'Intelligent prompt routing & latency-aware fallbacks',
              'Client-isolated API key security architecture'
            ]}
          />

          <DimensionCard
            icon={<Database className="w-5 h-5 text-white" />}
            title="Data Engineering"
            category="High-Volume ETL"
            description="Cleaning, validating, transforming, and migrating large datasets between systems with differing schema rules and acceptance constraints."
            highlights={[
              'Pipelines engineered at ~2,000,000 records scale',
              'Source-to-target schema mutation & normalization',
              'Data cleansing, duplicate isolation & quarantine auditing',
              'Atomic batch ingestion with integrity reconciliation'
            ]}
          />
        </div>
      </div>
    </section>
  );
}
