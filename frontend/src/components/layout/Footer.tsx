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
    <footer className="relative border-t border-white/10 bg-black py-12 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Headline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base font-bold text-white tracking-wide">Jigar Rohit</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-zinc-300 font-mono">
              MCP & Backend Engineer
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-md font-light">
            Architecting intelligent systems connecting AI models, high-volume ETL data pipelines, and secure enterprise backend services.
          </p>
        </div>

        {/* Live System API Status */}
        <div className="flex items-center gap-4 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isLive === true
                  ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                  : isLive === false
                  ? 'bg-zinc-600'
                  : 'bg-zinc-400 animate-pulse'
              }`}
            />
            <span className="text-xs font-mono text-zinc-300">
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
            className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            LinkedIn
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/Rohit-Jigar/3d-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onOpenGithubModal}
            className="text-[11px] font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer"
            title="Inspect Monorepo Architecture"
          >
            [Tree]
          </button>
          <a
            href="#contact"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-2">
        <span>© {new Date().getFullYear()} Jigar Rohit. All rights reserved.</span>
        <span className="font-mono">Python 3.11 · FastAPI · React · Three.js · MCP Standard</span>
      </div>
    </footer>
  );
}
