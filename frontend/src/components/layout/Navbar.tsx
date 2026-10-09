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
        className={`pointer-events-auto w-full max-w-6xl transition-all duration-300 rounded-2xl px-5 py-2.5 flex items-center justify-between ${
          isScrolled
            ? 'backdrop-blur-2xl bg-black/85 border border-white/15 shadow-2xl shadow-black/80'
            : 'backdrop-blur-md bg-zinc-950/40 border border-white/8'
        }`}
        aria-label="Main Navigation"
      >
        {/* Logo / Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-1 focus:ring-white rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-white text-black font-extrabold text-xs flex items-center justify-center tracking-tighter shadow-sm transition-transform group-hover:scale-105">
            JR
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold tracking-wider text-white uppercase">
              Jigar Rohit
            </span>
            <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
              MCP · BACKEND · AI
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white ${
                  isActive
                    ? 'text-white bg-white/10 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-[2px] bg-white rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenResumeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 transition-all focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            Resume
          </button>

          <a
            href="https://www.linkedin.com/in/jigar-rohit-874aa0374/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg text-black bg-white hover:bg-zinc-200 transition-all focus:outline-none focus:ring-1 focus:ring-white"
          >
            LinkedIn
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-white"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden fixed inset-x-4 top-20 rounded-2xl p-6 backdrop-blur-2xl bg-zinc-950/95 border border-white/15 shadow-2xl z-50">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.href.substring(1)
                    ? 'text-white bg-white/10 border border-white/15'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2.5 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-white/10"
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </button>
              <a
                href="https://www.linkedin.com/in/jigar-rohit-874aa0374/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 text-sm font-medium rounded-lg bg-white text-black font-semibold hover:bg-zinc-200"
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
