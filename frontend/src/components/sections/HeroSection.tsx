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
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#030712]"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene3D onHoverNode={setActiveNodeHighlight} />
      </div>

      {/* Cyber Grid & Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-radial-glow pointer-events-none z-[1]" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none z-[2]" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Identity Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 shadow-lg shadow-cyan-950/40 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>MCP INTEGRATION DEVELOPER · PYTHON BACKEND ENGINEER</span>
        </div>

        {/* Primary Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 drop-shadow-md">
          JIGAR <span className="text-gradient-cyan">ROHIT</span>
        </h1>

        {/* Main Headline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200 max-w-3xl mb-4 leading-snug">
          "I build intelligent systems that connect{' '}
          <span className="text-gradient-violet">AI</span>,{' '}
          <span className="text-cyan-400">data</span>, and{' '}
          <span className="text-blue-400">software</span>."
        </h2>

        {/* Supporting Pillar Text */}
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mb-8 font-light">
          Python Backend Engineering · AI/LLM Integration · Model Context Protocol · High-Volume Data Engineering
        </p>

        {/* Dynamic 3D Node Status Bar */}
        <div className="h-8 mb-8 flex items-center justify-center">
          {activeNodeHighlight ? (
            <div className="px-4 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-xs font-mono text-cyan-200 transition-all duration-300">
              Active Focus: <span className="text-cyan-400 font-bold uppercase">{activeNodeHighlight}</span>
            </div>
          ) : (
            <div className="text-xs font-mono text-gray-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Hover over orbiting nodes in the 3D core to inspect core capabilities</span>
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={scrollToProjects}
            className="group relative px-6 py-3.5 rounded-xl font-medium text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            Explore My Work
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={scrollToContact}
            className="px-6 py-3.5 rounded-xl font-medium text-sm text-gray-200 backdrop-blur-md bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/50 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            Contact Me
          </button>

          <button
            onClick={onOpenResumeModal}
            className="px-5 py-3.5 rounded-xl font-medium text-sm text-gray-300 backdrop-blur-md bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            Download Resume
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={scrollToProjects}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer group"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">Scroll to Explore</span>
          <div className="w-6 h-10 rounded-full border border-gray-700 group-hover:border-cyan-500/60 flex items-start justify-center p-1.5 transition-colors">
            <div className="w-1.5 h-2 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
