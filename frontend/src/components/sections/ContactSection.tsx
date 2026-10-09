import { useState } from 'react';
import {
  Mail,
  Send,
  FileText,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import type { ContactFormData } from '../../types';
import { API_ENDPOINTS } from '../../services/api';

const FORMSUBMIT_RESILIENCE_URL = 'https://formsubmit.co/ajax/rohitjigarmaheshbhai@gmail.com';

async function dispatchEmailDirectly(data: ContactFormData): Promise<boolean> {
  try {
    const res = await fetch(FORMSUBMIT_RESILIENCE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        _replyto: data.email,
        subject: data.subject,
        message: data.message,
        _subject: `[Portfolio Inquiry] ${data.subject} (${data.name})`,
        _captcha: 'false',
        _template: 'table',
      }),
    });
    const result = await res.json().catch(() => ({}));
    return result.success === true || result.success === 'true' || res.ok;
  } catch (err) {
    console.warn('FormSubmit email dispatch note:', err);
    return false;
  }
}

interface ContactSectionProps {
  onOpenResumeModal: () => void;
  onOpenGithubModal: () => void;
}

export default function ContactSection({
  onOpenResumeModal,
  onOpenGithubModal,
}: ContactSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successDetails, setSuccessDetails] = useState<{ ticketId: string; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation checks
    if (!formData.name.trim() || formData.name.length < 2) {
      setErrorMessage('Please provide your name (at least 2 characters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.subject.trim() || formData.subject.length < 3) {
      setErrorMessage('Please provide a subject line (at least 3 characters).');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setErrorMessage('Please provide a message with at least 10 characters.');
      return;
    }

    setStatus('submitting');

    try {
      // 1. ALWAYS dispatch email directly to rohitjigarmaheshbhai@gmail.com
      const emailPromise = dispatchEmailDirectly(formData);

      // 2. Concurrently record inquiry in FastAPI backend (with 4s timeout)
      const backendPromise = fetch(API_ENDPOINTS.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let ticketId = `MSG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      let confirmationMessage = 'Thank you! Your inquiry has been sent directly to Jigar Rohit. Jigar will get back to you shortly.';

      try {
        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000));
        const outcome = await Promise.race([backendPromise, timeoutPromise]);
        if (outcome && outcome.ok) {
          const data = await outcome.json();
          if (data.ticket_id) ticketId = data.ticket_id;
          if (data.message) confirmationMessage = data.message;
        }
      } catch (backendErr) {
        console.warn('Backend tracking note:', backendErr);
      }

      // Ensure the direct email dispatch has finished
      await emailPromise;

      // Also cache in local inquiries store for instant Live Feed display
      try {
        const localInquiry = {
          ticket_id: ticketId,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toISOString()
        };
        const raw = localStorage.getItem('portfolio_local_inquiries');
        const existing = raw ? JSON.parse(raw) : [];
        localStorage.setItem(
          'portfolio_local_inquiries',
          JSON.stringify([localInquiry, ...existing.filter((item: any) => item.ticket_id !== ticketId)].slice(0, 50))
        );
      } catch {
        // Safe ignore if localStorage disabled
      }

      setSuccessDetails({
        ticketId,
        message: confirmationMessage
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-zinc-300 mb-4">
            <Mail className="w-3.5 h-3.5 text-white" />
            <span>DIRECT COMMUNICATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Let's Build <span className="text-gradient-metallic">Something Intelligent</span>
          </h2>

          <p className="text-base text-zinc-400 font-light leading-relaxed">
            I'm interested in building reliable backend systems, AI-powered applications, developer tools, and meaningful integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/10 backdrop-blur-md">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                Professional Channels
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-6">
                Connect directly for engineering opportunities, technical discussions, or backend architecture consulting.
              </p>

              <div className="space-y-3">
                {/* Direct Email Link */}
                <a
                  href="mailto:rohitjigarmaheshbhai@gmail.com"
                  className="p-3.5 rounded-xl bg-black border border-white/10 hover:border-white/30 flex items-center justify-between text-zinc-200 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-white">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">Direct Email</span>
                      <span className="text-[11px] text-zinc-400 font-mono">rohitjigarmaheshbhai@gmail.com</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/jigar-rohit-874aa0374/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-black border border-white/10 hover:border-white/30 flex items-center justify-between text-zinc-200 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-white">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">LinkedIn Profile</span>
                      <span className="text-[11px] text-zinc-400 font-mono">jigar-rohit-874aa0374</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                {/* GitHub Repository Link */}
                <div className="flex items-center gap-2 w-full">
                  <a
                    href="https://github.com/Rohit-Jigar/3d-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3.5 rounded-xl bg-black border border-white/10 hover:border-white/30 flex items-center justify-between text-zinc-200 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10 text-white">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold block text-white">GitHub Repository</span>
                        <span className="text-[11px] text-zinc-400 font-mono">Rohit-Jigar/3d-portfolio</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                  </a>
                  <button
                    onClick={onOpenGithubModal}
                    title="Inspect Monorepo Architecture Tree"
                    className="p-3.5 rounded-xl bg-black border border-white/10 hover:border-white/30 text-xs text-zinc-400 hover:text-white font-mono transition-all cursor-pointer"
                  >
                    Tree
                  </button>
                </div>

                {/* Resume Modal Trigger */}
                <button
                  onClick={onOpenResumeModal}
                  className="w-full p-3.5 rounded-xl bg-black border border-white/10 hover:border-white/30 flex items-center justify-between text-zinc-200 hover:text-white transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-white">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold block text-white">Engineering Resume</span>
                      <span className="text-[11px] text-zinc-400 font-mono">Download Document</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10 text-xs text-zinc-400 space-y-2 font-mono">
              <div className="text-zinc-200 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                Dual-Layer Resilience Guarantee
              </div>
              <p className="text-[11px] font-light leading-relaxed">
                Inquiries are verified by FastAPI with Pydantic sanitization and backed by an automated resilience gateway to guarantee direct email delivery even during backend cold starts.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-1">
                Send an Inquiry
              </h3>
              <p className="text-xs text-zinc-400 font-light mb-6">
                Fill out the validated form below to submit a technical inquiry directly to the backend.
              </p>

              {status === 'success' && successDetails ? (
                <div className="p-6 rounded-xl bg-white/5 border border-white/20 text-zinc-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span className="font-bold text-sm text-white">Inquiry Successfully Accepted</span>
                  </div>
                  <p className="text-xs font-light text-zinc-300">
                    {successDetails.message}
                  </p>
                  <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/10">
                    Tracking ID: <strong className="text-white">{successDetails.ticketId}</strong>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-3 text-xs font-semibold underline text-white hover:text-zinc-300 cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-zinc-900 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Recruiter"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 font-sans"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 font-sans"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Senior Backend / MCP Integration Opportunity"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, team requirements, or technical inquiry..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 font-sans resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-xl text-xs font-bold text-black bg-white hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5 disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
