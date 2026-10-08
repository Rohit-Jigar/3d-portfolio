import { useState, useEffect } from 'react';
import { Menu, X, FileText, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'MCP', href: '#mcp' },
  { label: 'Journey', href: '#journey' },
  { label: 'Lab', href: '#lab' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenResumeModal }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 transition-all duration-300 pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-6xl transition-all duration-300 rounded-2xl px-5 py-3 flex items-center justify-between ${
          isScrolled
            ? 'backdrop-blur-xl bg-slate-950/80 border border-cyan-500/20 shadow-2xl shadow-cyan-950/30'
            : 'backdrop-blur-md bg-slate-900/40 border border-white/5'
        }`}
        aria-label="Main Navigation"
      >
        {/* Logo / Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            JR
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold tracking-wide text-gray-100 group-hover:text-cyan-400 transition-colors">
              JIGAR ROHIT
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 tracking-wider">
              MCP & BACKEND
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-slate-800/40'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenResumeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg text-gray-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            Resume
          </button>

          <a
            href="https://www.linkedin.com/in/jigar-rohit-874aa0374/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            LinkedIn
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden fixed inset-x-4 top-20 rounded-2xl p-6 backdrop-blur-2xl bg-slate-950/95 border border-cyan-500/30 shadow-2xl z-50">
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.href.substring(1)
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg bg-slate-800 text-gray-200 hover:bg-slate-700"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                Download Resume
              </button>
              <a
                href="https://www.linkedin.com/in/jigar-rohit-874aa0374/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 text-sm font-medium rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
              >
                LinkedIn Profile
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
