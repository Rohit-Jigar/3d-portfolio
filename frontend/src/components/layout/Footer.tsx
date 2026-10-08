import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface HealthStatus {
  status: string;
  version: string;
  timestamp?: string;
}

export default function Footer({
  onOpenGithubModal,
}: {
  onOpenGithubModal: () => void;
}) {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [isLive, setIsLive] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        setHealth(data);
        setIsLive(true);
      })
      .catch(() => {
        // Graceful offline fallback
        setIsLive(false);
      });
  }, []);

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950/90 py-12 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Headline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base font-bold text-gray-100 tracking-wide">Jigar Rohit</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono">
              MCP & Backend Engineer
            </span>
          </div>
          <p className="text-xs text-gray-400 max-w-md">
            Architecting intelligent systems connecting AI models, high-volume ETL data pipelines, and secure enterprise backend services.
          </p>
        </div>

        {/* Live System API Status */}
        <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isLive === true
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                  : isLive === false
                  ? 'bg-amber-400'
                  : 'bg-cyan-400 animate-pulse'
              }`}
            />
            <span className="text-xs font-mono text-gray-300">
              {isLive === true
                ? `FastAPI Backend: Online (${health?.version || 'v1.0.0'})`
                : isLive === false
                ? 'Backend: Offline (Client Cache Mode)'
                : 'Pinging API Status...'}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/jigar-rohit-874aa0374/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            LinkedIn
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/Rohit-Jigar/3d-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onOpenGithubModal}
            className="text-[11px] font-mono text-gray-500 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Inspect Monorepo Architecture"
          >
            [Tree]
          </button>
          <a
            href="#contact"
            className="text-xs text-gray-400 hover:text-cyan-300 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
        <span>© {new Date().getFullYear()} Jigar Rohit. All rights reserved.</span>
        <span className="font-mono">Python 3.11 · FastAPI · React · Three.js · MCP Standard</span>
      </div>
    </footer>
  );
}
