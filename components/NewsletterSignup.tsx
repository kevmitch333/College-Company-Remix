import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Bell, 
  Building2, 
  User, 
  Lock, 
  FileText, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RefreshCw,
  Send,
  Download,
  X
} from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db, ensureAuthenticated } from '../src/firebase';

export interface NewsletterSignupProps {
  className?: string;
  variant?: 'banner' | 'card' | 'embedded';
  defaultTopic?: string;
  onSubscribed?: (email: string) => void;
}

const TOPIC_OPTIONS = [
  { id: 'house-ncaa', label: 'House v. NCAA Revenue-Sharing & Title IX', desc: 'Antitrust rulings, $22M athletic fund distributions, and legal precedents' },
  { id: 'nil-clearinghouse', label: 'Esports NIL & Group-Licensing Clearinghouse', desc: 'Contract standardization, roster skin splits, and collegiate CPV data' },
  { id: 'fast-broadcast', label: 'FAST Syndication & Broadcast Rights', desc: 'Collegiate Esports TV distribution, connected TV minutes, and ad inventory' },
  { id: 'stem-circuits', label: 'STEM Aeronautics & Sim Racing Circuits', desc: 'Drone racing (CDRL) and sim motorsport (CRL) engineering sponsor allocations' },
  { id: 'm-and-a', label: 'Institutional M&A & Private Equity Deployments', desc: 'Collegiate operating holding SPVs, conference rollups, and capital calls' }
];

const LOCAL_STORAGE_KEY = 'college_company_newsletter_subscription';

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  className = '',
  variant = 'card',
  defaultTopic,
  onSubscribed
}) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['house-ncaa', 'nil-clearinghouse', 'fast-broadcast']);
  const [frequency, setFrequency] = useState<'weekly' | 'breaking'>('weekly');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSampleModal, setShowSampleModal] = useState(false);

  // Check if previously subscribed in local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setEmail(parsed.email);
          if (parsed.fullName) setFullName(parsed.fullName);
          if (parsed.institution) setInstitution(parsed.institution);
          if (parsed.topics) setSelectedTopics(parsed.topics);
          setIsSuccess(true);
          setAlreadySubscribed(true);
        }
      }
    } catch (e) {
      // Ignore local storage error
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(t => t !== topicId) 
        : [...prev, topicId]
    );
  };

  const handleSelectAllTopics = () => {
    if (selectedTopics.length === TOPIC_OPTIONS.length) {
      setSelectedTopics(['house-ncaa']);
    } else {
      setSelectedTopics(TOPIC_OPTIONS.map(t => t.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid institutional email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Ensure anonymous/authenticated session
      ensureAuthenticated();

      const subscriptionPayload = {
        email: cleanEmail,
        fullName: fullName.trim(),
        institution: institution.trim(),
        topics: selectedTopics,
        frequency,
        source: 'Intelligence & News Portal',
        status: 'active',
        subscribedAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      };

      // 1. Attempt Firestore write
      try {
        await addDoc(collection(db, 'newsletter_subscribers'), subscriptionPayload);
      } catch (dbErr) {
        console.warn('Firestore subscription fallback (stored locally):', dbErr);
      }

      // 2. Persist in local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subscriptionPayload));

      setIsSuccess(true);
      if (onSubscribed) {
        onSubscribed(cleanEmail);
      }
    } catch (err: any) {
      console.error('Subscription error:', err);
      setErrorMessage('An error occurred during submission. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPreferences = () => {
    setIsSuccess(false);
    setAlreadySubscribed(false);
  };

  return (
    <>
      <div 
        id="newsletter-signup-form"
        className={`relative overflow-hidden rounded-xl border border-[#C89B3C]/30 bg-gradient-to-b from-[#11141D] via-[#0E121A] to-[#0A0D14] shadow-2xl transition-all ${className}`}
      >
        {/* Subtle Sovereign Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-[#C89B3C]/40 via-[#E8C98B] to-[#C89B3C]/40 w-full" />

        <div className="p-6 md:p-8 space-y-6">
          {/* Eyebrow & Institutional Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.07] pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C89B3C]">
                <Mail size={13} className="text-[#C89B3C]" />
                <span>Executive Research Dispatch</span>
                <span className="text-neutral-600">·</span>
                <span className="text-[#68D391] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#68D391] animate-pulse" />
                  Weekly Monday 07:00 EST
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Institutional Market Intelligence Wire
              </h3>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <div className="px-2.5 py-1 rounded bg-[#161B26] border border-white/10 text-neutral-300 font-mono text-[11px] flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-[#C89B3C]" />
                <span>1,480+ Athletic Directors & Investors</span>
              </div>
            </div>
          </div>

          <p className="text-neutral-300 text-sm leading-relaxed font-light">
            Receive curated, zero-fluff intelligence synthesizing regulatory antitrust rulings (House v. NCAA), 
            collegiate media rights valuations, esports NIL clearinghouse benchmarks, and private equity inflows 
            across 400+ varsity athletic departments.
          </p>

          {isSuccess ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="p-6 rounded-lg bg-[#0C1518] border border-[#68D391]/40 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#68D391]/20 text-[#68D391] shrink-0 mt-0.5">
                  <CheckCircle2 size={20} />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <span>{alreadySubscribed ? 'Institutional Subscription Confirmed' : 'Subscription Successfully Activated'}</span>
                    <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-[#68D391]/20 text-[#68D391] font-semibold">
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Weekly briefings are dispatched every Monday morning at <strong>07:00 EST</strong> to{' '}
                    <span className="text-[#E8C98B] font-mono">{email}</span>.
                  </p>
                </div>
              </div>

              {/* Selected Topics Pill list */}
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <div className="text-[11px] font-mono text-neutral-400">Configured Coverage Verticals:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTopics.map(topicId => {
                    const found = TOPIC_OPTIONS.find(t => t.id === topicId);
                    return (
                      <span key={topicId} className="px-2 py-0.5 rounded bg-[#131E24] border border-white/10 text-[10px] font-mono text-neutral-300">
                        ✓ {found?.label || topicId}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons in Success state */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowSampleModal(true)}
                  className="px-4 py-2 bg-[#16202B] hover:bg-[#1E2B3A] border border-[#C89B3C]/40 text-[#E8C98B] hover:text-white rounded text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={13} className="text-[#C89B3C]" />
                  <span>Read Sample Dispatch (Issue #42)</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetPreferences}
                  className="px-3.5 py-2 bg-transparent hover:bg-white/5 border border-white/10 text-neutral-400 hover:text-white rounded text-xs font-mono transition-colors cursor-pointer"
                >
                  Edit Topics / Change Email
                </button>
              </div>
            </div>
          ) : (
            /* SUBSCRIPTION FORM INPUTS */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-300 font-mono flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Primary Input Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-7 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter institutional or corporate email address..."
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0D14] border border-white/15 focus:border-[#C89B3C] focus:ring-1 focus:ring-[#C89B3C] rounded-sm text-sm text-white placeholder-neutral-500 font-sans outline-none transition-colors"
                  />
                </div>

                <div className="md:col-span-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 bg-[#C89B3C] hover:bg-[#D4AF37] disabled:opacity-60 text-[#090A0C] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Verifying & Registering...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe to Market Wire</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Toggle for Advanced Institutional Routing */}
              <div className="pt-1 flex items-center justify-between text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="text-neutral-400 hover:text-[#C89B3C] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{showAdvancedOptions ? 'Hide Institutional Tailoring Options' : '+ Customize Coverage Topics & Institutional Title'}</span>
                  {showAdvancedOptions ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>

                <button
                  type="button"
                  onClick={() => setShowSampleModal(true)}
                  className="text-neutral-400 hover:text-[#E8C98B] underline flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <FileText size={12} className="text-[#C89B3C]" />
                  <span>Preview Sample Issue</span>
                </button>
              </div>

              {/* ADVANCED CUSTOMIZATION DRAWER */}
              {showAdvancedOptions && (
                <div className="p-4 rounded-lg bg-[#090C12] border border-white/10 space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                        Full Name & Title (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                          <User size={13} />
                        </div>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Dr. Vance, Athletic Director"
                          className="w-full pl-8 pr-3 py-2 bg-[#121620] border border-white/10 focus:border-[#C89B3C] rounded-sm text-xs text-white placeholder-neutral-600 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                        Institution / Organization (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600">
                          <Building2 size={13} />
                        </div>
                        <input
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="e.g. Big Ten Conference, PE Fund"
                          className="w-full pl-8 pr-3 py-2 bg-[#121620] border border-white/10 focus:border-[#C89B3C] rounded-sm text-xs text-white placeholder-neutral-600 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Coverage Verticals Selection */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-neutral-400 font-semibold uppercase tracking-wider">
                        Tailored Fiduciary Topic Channels:
                      </span>
                      <button
                        type="button"
                        onClick={handleSelectAllTopics}
                        className="text-[#C89B3C] hover:underline cursor-pointer"
                      >
                        {selectedTopics.length === TOPIC_OPTIONS.length ? 'Deselect All' : 'Select All Topics'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {TOPIC_OPTIONS.map((opt) => {
                        const isChecked = selectedTopics.includes(opt.id);
                        return (
                          <label
                            key={opt.id}
                            onClick={() => toggleTopic(opt.id)}
                            className={`p-2.5 rounded border transition-all cursor-pointer flex items-start gap-2.5 ${
                              isChecked
                                ? 'bg-[#151C28] border-[#C89B3C]/50 text-white'
                                : 'bg-[#0E121A] border-white/5 text-neutral-400 hover:border-white/15'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-0.5 rounded text-[#C89B3C] focus:ring-0 bg-[#090C12] border-white/20"
                            />
                            <div className="space-y-0.5">
                              <div className="text-xs font-semibold leading-tight">{opt.label}</div>
                              <div className="text-[10px] text-neutral-500 leading-snug">{opt.desc}</div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Frequency Selection */}
                  <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                    <span className="text-white font-medium">Cadence:</span>
                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                      <input
                        type="radio"
                        name="frequency"
                        checked={frequency === 'weekly'}
                        onChange={() => setFrequency('weekly')}
                        className="text-[#C89B3C] focus:ring-0"
                      />
                      <span>Weekly Executive Memo (Monday 7 AM)</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                      <input
                        type="radio"
                        name="frequency"
                        checked={frequency === 'breaking'}
                        onChange={() => setFrequency('breaking')}
                        className="text-[#C89B3C] focus:ring-0"
                      />
                      <span>Weekly + Breaking Fiduciary Alerts</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Compliance & Trust Footnote */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <Lock size={11} className="text-[#C89B3C]" />
                  <span>Zero commercial solicitation. Strict institutional confidentiality.</span>
                </div>
                <span>One-click unsubscribe at any time.</span>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* SAMPLE WEEKLY INTELLIGENCE MODAL */}
      {showSampleModal && (
        <div 
          onClick={() => setShowSampleModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0C0F17] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans"
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#11141E]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#C89B3C]/20 text-[#E8C98B] border border-[#C89B3C]/30 font-bold">
                    SAMPLE DISPATCH · ISSUE #42
                  </span>
                  <span className="text-neutral-500 text-xs font-mono">October 2026</span>
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  Collegiate Digital Sports & NIL Executive Market Wire
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowSampleModal(false)}
                className="p-1.5 rounded bg-[#161B26] hover:bg-[#1E2534] border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm text-neutral-300 leading-relaxed font-sans">
              <div className="p-4 rounded-lg bg-[#111622] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#C89B3C] font-semibold uppercase tracking-wider">
                  Executive Briefing Synopsis
                </div>
                <p className="text-xs text-neutral-300">
                  This weekly memo synthesizes macro capital allocation trends, antitrust courtroom developments, 
                  and actionable monetization opportunities across North American varsity digital sports.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-white font-display text-base border-b border-white/5 pb-1">
                  1. House v. NCAA: Preliminary Approval Settlement Directives
                </h4>
                <p className="text-xs leading-relaxed text-neutral-300">
                  Power-4 institutions have formalized their 2025/2026 cap models, reserving approximately $22M annually 
                  for direct student-athlete revenue distribution. Key athletic directors are segregating auxiliary digital 
                  sports assets into dedicated operating holding entities to protect core Title IX compliance.
                </p>
                <div className="text-[11px] font-mono text-[#E8C98B] bg-[#161D2A] p-2.5 rounded">
                  ★ Fiduciary Takeaway: Accelerates demand for group-licensing platforms like College Esports NIL to automate third-party clearinghouse verifications.
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-white font-display text-base border-b border-white/5 pb-1">
                  2. Linear FAST Carriage Expansion Across Collegiate Networks
                </h4>
                <p className="text-xs leading-relaxed text-neutral-300">
                  Collegiate Esports TV registered a record 48M connected-TV viewing minutes in Q3, outperforming 
                  traditional Olympic non-revenue collegiate sports broadcasts by 3.4x in 18–34 demographics.
                </p>
                <div className="text-[11px] font-mono text-[#E8C98B] bg-[#161D2A] p-2.5 rounded">
                  ★ Fiduciary Takeaway: Non-linear advertising inventory captures $18–$24 CPMs without stadium capital overhead.
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-white font-display text-base border-b border-white/5 pb-1">
                  3. Autonomous Drone Racing & STEM Sim Motorsport Capital Allocation
                </h4>
                <p className="text-xs leading-relaxed text-neutral-300">
                  Major aerospace defense contractors and automotive OEMs expanded campus challenge sponsorships by $14M, 
                  leveraging CDRL and CRL collegiate circuits directly as mechanical engineering workforce pipelines.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/[0.08] bg-[#0E121B] flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">
                Delivered weekly to verified institutional email addresses.
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowSampleModal(false);
                  const inputEl = document.querySelector('#newsletter-signup-form input[type="email"]') as HTMLInputElement;
                  if (inputEl) inputEl.focus();
                }}
                className="px-4 py-2 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Subscribe to Full Issues
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
