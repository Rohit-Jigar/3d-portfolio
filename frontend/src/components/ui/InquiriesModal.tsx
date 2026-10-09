import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  X,
  RefreshCw,
  Mail,
  Copy,
  Check,
  Search,
  Inbox,
  Clock,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Tag,
} from 'lucide-react';
import { API_ENDPOINTS } from '../../services/api';
import type { InquiryItem } from '../../types';

interface InquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_INQUIRIES: InquiryItem[] = [
  {
    ticket_id: 'MSG-8F2D1A',
    name: 'Sarah Chen',
    email: 'sarah.chen@techventures.io',
    subject: 'Senior MCP Architecture & AI Integration Discussion',
    message:
      'Hi Jigar, really impressed by your MCP server implementation and the dynamic model router architecture. We are currently architecting a high-throughput multi-agent backend and would love to discuss your experience scaling Python microservices.',
    timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    status: 'received',
  },
  {
    ticket_id: 'MSG-5E9B3C',
    name: 'Marcus Vance',
    email: 'mvance@cloudsystems.dev',
    subject: 'FastAPI Data Pipeline & ETL Consulting',
    message:
      'Saw your Alef Migration project handling ~2M records with automated validation. Would love to connect regarding optimization strategies for high-volume PostgreSQL and async worker tasks.',
    timestamp: new Date(Date.now() - 1000 * 60 * 185).toISOString(),
    status: 'received',
  },
  {
    ticket_id: 'MSG-3A7K9P',
    name: 'Elena Rostova',
    email: 'elena.rostova@quantumai.labs',
    subject: 'NamoGPT Multi-Model Gateway & LiteLLM Integration',
    message:
      'Great work on the NamoGPT dynamic routing implementation! The latency/cost trade-off matrix looks exceptionally well thought out. Are you open to speaking at our upcoming AI Systems panel?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    status: 'received',
  },
];

function formatTimestamp(iso: string): string {
  try {
    const date = new Date(iso);
    if (isNaN(date.getTime())) return iso;
    const now = Date.now();
    const diffMs = now - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default function InquiriesModal({ isOpen, onClose }: InquiriesModalProps) {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTicketId, setCopiedTicketId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'cache' | 'demo' | null>(null);

  // Read locally cached inquiries submitted through ContactSection
  const getLocalInquiries = (): InquiryItem[] => {
    try {
      const raw = localStorage.getItem('portfolio_local_inquiries');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  };

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError(null);

    const localList = getLocalInquiries();
    const endpoint = API_ENDPOINTS.inquiries || '/api/inquiries';

    try {
      const response = await fetch(endpoint, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API returned HTTP ${response.status}`);
      }

      const rawData = await response.json();
      let remoteItems: InquiryItem[] = [];

      if (Array.isArray(rawData)) {
        remoteItems = rawData;
      } else if (rawData && Array.isArray(rawData.inquiries)) {
        remoteItems = rawData.inquiries;
      } else if (rawData && Array.isArray(rawData.items)) {
        remoteItems = rawData.items;
      } else if (rawData && Array.isArray(rawData.data)) {
        remoteItems = rawData.data;
      }

      // Merge remote inquiries with any local submissions, deduplicating by ticket_id
      const mergedMap = new Map<string, InquiryItem>();
      remoteItems.forEach((item) => {
        const id = item.ticket_id || (item as any).id || (item as any).ticketId;
        const ts = item.timestamp || (item as any).created_at || (item as any).createdAt || new Date().toISOString();
        if (id) mergedMap.set(id, { ...item, ticket_id: id, timestamp: ts });
      });
      localList.forEach((item) => {
        if (!mergedMap.has(item.ticket_id)) {
          const ts = item.timestamp || (item as any).created_at || (item as any).createdAt || new Date().toISOString();
          mergedMap.set(item.ticket_id, { ...item, timestamp: ts });
        }
      });

      const mergedList = Array.from(mergedMap.values()).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setInquiries(mergedList);
      setDataSource('live');
    } catch {
      // Graceful offline fallback: if server is offline or in development, use local storage
      if (localList.length > 0) {
        setInquiries(localList);
        setDataSource('cache');
      } else {
        setInquiries([]);
        setDataSource('cache');
      }
      setError(
        localList.length > 0
          ? 'FastAPI Live Feed offline — displaying locally cached submissions.'
          : 'Backend feed unreachable. You can load demo inquiries or submit via the Contact section.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        void fetchInquiries();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, fetchInquiries]);

  // Keyboard shortcut ESC and body overflow locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Copy Ticket ID helper
  const handleCopyTicket = (ticketId: string) => {
    navigator.clipboard.writeText(ticketId).then(() => {
      setCopiedTicketId(ticketId);
      setTimeout(() => setCopiedTicketId(null), 2000);
    });
  };

  // Copy Message helper
  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    });
  };

  // Load sample demo inquiries
  const handleLoadDemo = () => {
    setInquiries(SAMPLE_INQUIRIES);
    setDataSource('demo');
    setError(null);
  };

  // Filtered inquiries by search query
  const filteredInquiries = useMemo(() => {
    if (!searchQuery.trim()) return inquiries;
    const q = searchQuery.toLowerCase();
    return inquiries.filter(
      (inq) =>
        inq.ticket_id.toLowerCase().includes(q) ||
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.subject.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q)
    );
  }, [inquiries, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Obsidian / Titanium Modal Dialog */}
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl shadow-black z-10 my-4 flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shadow-inner">
              <Inbox className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Inquiries Live Feed
                </h3>

                {/* Live Count Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {inquiries.length} {inquiries.length === 1 ? 'Inquiry' : 'Inquiries'}
                  </span>
                </div>

                {dataSource === 'live' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
                    FastAPI Live
                  </span>
                )}
                {dataSource === 'cache' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
                    Local Cache
                  </span>
                )}
                {dataSource === 'demo' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                    Preview Data
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 font-light mt-0.5">
                Real-time communications audit log from recruiters, colleagues, and visitors.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Refresh Button */}
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Refresh Inquiries Feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-white' : ''}`} />
              <span>{loading ? 'Fetching...' : 'Refresh'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Inquiries Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-5 sm:px-6 py-3 border-b border-white/5 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by sender, email, subject, ticket..."
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs text-zinc-400 font-mono">
            <span>Showing {filteredInquiries.length} of {inquiries.length}</span>
            {inquiries.length === 0 && (
              <button
                onClick={handleLoadDemo}
                className="text-xs text-zinc-300 hover:text-white underline cursor-pointer"
              >
                Load Preview Data
              </button>
            )}
          </div>
        </div>

        {/* Error Notice (if any) */}
        {error && (
          <div className="mx-5 sm:mx-6 mt-3 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between gap-2">
            <span>{error}</span>
            {inquiries.length === 0 && (
              <button
                onClick={handleLoadDemo}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] cursor-pointer"
              >
                Load Sample Feed
              </button>
            )}
          </div>
        )}

        {/* Modal Body: Cards List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {loading && inquiries.length === 0 ? (
            /* Skeleton Loading State */
            <div className="space-y-4 py-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 animate-pulse space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-32 h-4 bg-white/10 rounded" />
                    <div className="w-20 h-4 bg-white/10 rounded" />
                  </div>
                  <div className="w-48 h-5 bg-white/15 rounded" />
                  <div className="w-full h-12 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          ) : filteredInquiries.length === 0 ? (
            /* Empty State */
            <div className="py-12 sm:py-16 text-center max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 mx-auto flex items-center justify-center text-zinc-400 shadow-lg">
                <Inbox className="w-7 h-7 text-zinc-500" />
              </div>

              <div>
                <h4 className="text-base font-semibold text-white">
                  {searchQuery ? 'No matching inquiries found' : 'Inbox is currently clear'}
                </h4>
                <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                  {searchQuery
                    ? `No inquiries matched "${searchQuery}". Try searching by another keyword.`
                    : 'When visitors, recruiters, or colleagues send messages through the Contact terminal, their tickets will stream into this feed automatically.'}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleLoadDemo}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-zinc-200 text-black flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-white/5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Load Sample Preview Cards
                </button>
                <button
                  onClick={fetchInquiries}
                  className="px-3.5 py-2 rounded-xl text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 cursor-pointer"
                >
                  Check Live Backend Again
                </button>
              </div>
            </div>
          ) : (
            /* Inquiries Obsidian / Titanium Glass Cards */
            filteredInquiries.map((inq) => {
              const ticketId = inq.ticket_id || 'MSG-TICKET';
              const isTicketCopied = copiedTicketId === ticketId;
              const isMessageCopied = copiedMessageId === ticketId;

              return (
                <div
                  key={ticketId}
                  className="group relative p-5 sm:p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-md shadow-xl space-y-3.5"
                >
                  {/* Top Row: Ticket ID, Status Badge & Timestamp */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      {/* Ticket ID Pill */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black border border-white/15 font-mono text-xs text-zinc-200 font-bold">
                        <Tag className="w-3 h-3 text-zinc-400" />
                        {ticketId}
                      </span>

                      {/* Copy Ticket ID button */}
                      <button
                        onClick={() => handleCopyTicket(ticketId)}
                        className="p-1 rounded-md text-zinc-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        title="Copy Ticket ID"
                      >
                        {isTicketCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    </div>

                    {/* Timestamp */}
                    <div
                      className="flex items-center gap-1.5 text-xs font-mono text-zinc-400"
                      title={new Date(inq.timestamp).toLocaleString()}
                    >
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{formatTimestamp(inq.timestamp)}</span>
                    </div>
                  </div>

                  {/* Sender & Email Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {/* Sender Avatar Initials */}
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-950 border border-white/15 flex items-center justify-center text-xs font-extrabold text-white shadow-sm shrink-0">
                        {inq.name
                          ? inq.name
                              .split(' ')
                              .map((part) => part[0])
                              .join('')
                              .substring(0, 2)
                              .toUpperCase()
                          : 'IN'}
                      </div>

                      <div>
                        <div className="text-sm font-bold text-white tracking-wide">
                          {inq.name}
                        </div>
                        <a
                          href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors group-hover:text-zinc-300"
                        >
                          <Mail className="w-3 h-3 text-zinc-500" />
                          <span>{inq.email}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      </div>
                    </div>

                    {/* Subject Line Pill */}
                    <div className="sm:text-right">
                      <span className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 px-3 py-1 rounded-lg inline-block max-w-full truncate">
                        {inq.subject}
                      </span>
                    </div>
                  </div>

                  {/* Inquiry Message Box (Obsidian styled) */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-black/70 border border-white/5 text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap selection:bg-white selection:text-black">
                    {inq.message}
                  </div>

                  {/* Card Footer Toolbar */}
                  <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                        className="px-3 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors font-mono text-[11px]"
                      >
                        <MessageSquare className="w-3 h-3" />
                        Direct Reply
                      </a>

                      <button
                        onClick={() => handleCopyMessage(ticketId, inq.message)}
                        className="px-3 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors font-mono text-[11px] cursor-pointer"
                      >
                        {isMessageCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Text</span>
                          </>
                        )}
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500">
                      ID: {ticketId}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-zinc-950/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>FastAPI Pydantic Sanitized · Instant Admin Audit</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 transition-colors cursor-pointer"
            >
              Close Feed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
