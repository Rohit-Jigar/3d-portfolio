import { useState } from 'react';
import { Sparkles, ChevronRight, FileText } from 'lucide-react';
import HeroScene3D from '../canvas/HeroScene3D';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

export default function HeroSection({ onOpenResumeModal }: HeroSectionProps) {
  const [activeNodeHighlight, setActiveNodeHighlight] = useState<string | null>(null);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 overflow-hidden bg-black"
    >
      {/* 3D Canvas Architectural Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene3D onHoverNode={setActiveNodeHighlight} />
      </div>

      {/* Minimalist Architectural Grid & Vignette */}
      <div className="absolute inset-0 bg-architect-grid opacity-25 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-vignette pointer-events-none z-[1]" />
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-[2]" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Identity Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-xl bg-zinc-950/80 border border-white/15 text-xs font-mono text-zinc-300 mb-6 shadow-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="tracking-wider uppercase text-[11px]">MCP INTEGRATION DEVELOPER · PYTHON BACKEND ENGINEER</span>
        </div>

        {/* Primary Name */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white mb-4">
          JIGAR <span className="text-gradient-silver">ROHIT</span>
        </h1>

        {/* Main Headline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-200 max-w-3xl mb-4 leading-snug">
          "I build intelligent systems that connect{' '}
          <span className="text-white font-semibold">AI</span>,{' '}
          <span className="text-zinc-300 font-semibold">data</span>, and{' '}
          <span className="text-zinc-400 font-semibold">software</span>."
        </h2>

        {/* Supporting Text */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mb-8 font-light leading-relaxed">
          Python Backend Engineering · AI/LLM Integration · Model Context Protocol · High-Volume Data Engineering
        </p>

        {/* Dynamic 3D Node Status Bar */}
        <div className="h-8 mb-8 flex items-center justify-center">
          {activeNodeHighlight ? (
            <div className="px-4 py-1 rounded-full bg-zinc-900 border border-white/30 text-xs font-mono text-white transition-all duration-200 shadow-md">
              Target Architecture: <span className="font-bold uppercase tracking-wider">{activeNodeHighlight}</span>
            </div>
          ) : (
            <div className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
              <span>Hover orbiting monolithic nodes to inspect core architectural capabilities</span>
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
          <button
            onClick={scrollToProjects}
            className="group px-7 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-black bg-white hover:bg-zinc-200 transition-all duration-200 shadow-xl shadow-white/10 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            Explore My Work
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={scrollToContact}
            className="px-6 py-3.5 rounded-xl font-medium text-xs tracking-wider uppercase text-zinc-200 backdrop-blur-md bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/15 hover:border-white/30 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            Contact Me
          </button>

          <button
            onClick={onOpenResumeModal}
            className="px-5 py-3.5 rounded-xl font-medium text-xs tracking-wider uppercase text-zinc-400 hover:text-white backdrop-blur-md bg-transparent hover:bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-zinc-400" />
            Resume
          </button>
        </div>

        {/* Minimalist Scroll Indicator */}
        <div
          onClick={scrollToProjects}
          className="flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to Inspect</span>
          <div className="w-5 h-9 rounded-full border border-zinc-700 group-hover:border-white/50 flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-1.5 rounded-full bg-white animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
