import React, { useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Loader2,
  BookOpen,
  DollarSign,
  Users,
  Info,
} from 'lucide-react';
import { DOOR_META, ProgramItem, getProgramsByDoor } from '../../src/data/programs';
import { SiteBreadcrumbs, ProgramStatusBadge } from './SiteBreadcrumbs';

interface ProgramPageProps {
  program: ProgramItem;
  onNavigate: (path: string) => void;
}

export const ProgramPage: React.FC<ProgramPageProps> = ({ program, onNavigate }) => {
  const doorMeta = DOOR_META[program.door];
  const siblingPrograms = getProgramsByDoor(program.door).filter((p) => p.id !== program.id);

  // Brand Inquiry state (specifically for /earn/nil-brand-match)
  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [budgetNote, setBudgetNote] = useState('');
  const [brandSubmitting, setBrandSubmitting] = useState(false);
  const [brandError, setBrandError] = useState<string | null>(null);
  const [brandSuccess, setBrandSuccess] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(href);
  };

  const handleBrandInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBrandError(null);

    if (!brandName.trim() || !contactName.trim() || !contactEmail.trim() || !campaignGoal.trim()) {
      setBrandError('Please complete your brand name, contact name, email address, and campaign summary.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      setBrandError('Please enter a valid work email address (for example, name@company.com).');
      return;
    }

    setBrandSubmitting(true);
    try {
      const response = await fetch('/api/brand-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: brandName.trim(),
          contactName: contactName.trim(),
          email: contactEmail.trim(),
          campaignGoal: campaignGoal.trim(),
          budgetNote: budgetNote.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setBrandError(data.error || 'Could not submit inquiry right now. Please try again or email kevin@collegeesportsx.com.');
      } else {
        setBrandSuccess(true);
      }
    } catch {
      setBrandError('Network issue while sending your inquiry. Please try again or write directly to kevin@collegeesportsx.com.');
    } finally {
      setBrandSubmitting(false);
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-[#090A0C]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-10">
        <SiteBreadcrumbs
          items={[
            { label: doorMeta.label, href: doorMeta.path },
            { label: program.name },
          ]}
          onNavigate={onNavigate}
        />

        {/* Top Program Header + Hero Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="text-sm font-mono uppercase tracking-wider font-semibold"
                style={{ color: doorMeta.accentColor }}
              >
                {program.doorLabel}
                {program.badge ? ` · ${program.badge}` : ''}
                {program.flagship ? ' · Flagship Program' : ''}
              </span>
              <ProgramStatusBadge status={program.status} />
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              {program.name}
            </h1>

            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
              {program.oneLine}
            </p>

            {/* Primary Action Area (strictly 1 primary CTA per page) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {program.outboundUrl ? (
                <a
                  href={program.outboundUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-base rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{program.outboundLabel || `Visit ${program.name}`}</span>
                  <ExternalLink size={17} />
                </a>
              ) : program.id === 'nil-brand-match' ? (
                <a
                  href="#brand-inquiry-form"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-base rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Submit a Brand Inquiry</span>
                  <ArrowRight size={17} />
                </a>
              ) : (
                <a
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-base rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Join Updates / Ask a Question</span>
                  <ArrowRight size={17} />
                </a>
              )}

              {program.domain && (
                <span className="text-sm font-mono text-neutral-300">
                  Domain: <strong className="text-white">{program.domain}</strong>
                </span>
              )}
            </div>

            {program.outboundNote && (
              <p className="text-sm text-neutral-400">
                {program.outboundNote}
              </p>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-[16/10] bg-[#10141D] shadow-xl">
              <img
                src={program.image}
                alt={program.imageAlt}
                width={640}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Special 1-Click Parent Resource Panel (/learn/for-parents) */}
        {program.id === 'for-parents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#10141D] border border-[#C89B3C]/40 space-y-3">
              <div className="flex items-center gap-2 text-sm font-mono uppercase text-[#E8C98B] font-semibold">
                <BookOpen size={16} />
                <span>Tax &amp; Financial Aid Guide</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-white">NIL Money 101</h2>
              <p className="text-base text-neutral-300 leading-relaxed">
                Covers the $400 IRS filing trigger, NIL Go $600 reporting, W-9 / 1099 forms season, quarterly estimated taxes, scholarships/FAFSA, and multi-state rules.
              </p>
              <a
                href="/learn/nil-money-101"
                onClick={(e) => handleLinkClick(e, '/learn/nil-money-101')}
                className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-[#E8C98B] hover:text-white transition-colors"
              >
                <span>Open NIL Money 101</span>
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="p-6 rounded-xl bg-[#10141D] border border-[#68D391]/40 space-y-3">
              <div className="flex items-center gap-2 text-sm font-mono uppercase text-[#68D391] font-semibold">
                <ShieldCheck size={16} />
                <span>Family &amp; Contract Protection</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-white">PlayerNIL.org</h2>
              <p className="text-base text-neutral-300 leading-relaxed">
                Free plain-language protection checklists helping students and families spot contract red flags and confirm disclosure obligations before signing.
              </p>
              <a
                href="/trust/player-nil"
                onClick={(e) => handleLinkClick(e, '/trust/player-nil')}
                className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-[#68D391] hover:text-white transition-colors"
              >
                <span>Open PlayerNIL.org</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}

        {/* Five Mandatory Customer Questions (What / Who / What you get / How to start / Cost) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#10141D] border border-white/10 space-y-3">
            <h2 className="text-xl font-display font-bold text-white">What is it?</h2>
            <p className="text-base text-neutral-200 leading-relaxed">{program.whatIsIt}</p>
          </div>

          <div className="p-6 rounded-xl bg-[#10141D] border border-white/10 space-y-3">
            <h2 className="text-xl font-display font-bold text-white">Who is it for?</h2>
            <p className="text-base text-neutral-200 leading-relaxed">{program.whoIsItFor}</p>
          </div>

          <div className="p-6 rounded-xl bg-[#10141D] border border-white/10 space-y-3">
            <h2 className="text-xl font-display font-bold text-white">What do I get?</h2>
            <ul className="space-y-2.5 text-base text-neutral-200">
              {program.whatDoIGet.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-[#68D391] shrink-0 mt-1" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-[#10141D] border border-white/10 space-y-3">
              <h2 className="text-xl font-display font-bold text-white">How do I start?</h2>
              <p className="text-base text-neutral-200 leading-relaxed">{program.howDoIStart}</p>
            </div>

            <div className="p-6 rounded-xl bg-[#10141D] border border-[#C89B3C]/30 space-y-2">
              <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#E8C98B] font-semibold">
                <DollarSign size={15} />
                <span>What does it cost?</span>
              </div>
              <p className="text-base text-neutral-100 leading-relaxed">{program.cost}</p>
            </div>
          </div>
        </div>

        {/* College Creator Academy 5-Track Course List */}
        {program.tracks && program.tracks.length > 0 && (
          <div className="space-y-6 pt-2">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                5-Track Course Curriculum
              </h2>
              <p className="text-base text-neutral-300">
                From content and storytelling foundations through live production, business skills, compliance, and workforce launch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {program.tracks.map((track) => (
                <div
                  key={track.trackNumber}
                  className="p-6 rounded-xl bg-[#10141D] border border-white/10 space-y-3"
                >
                  <h3 className="text-xl font-display font-bold text-[#E8C98B]">
                    {track.title}
                  </h3>
                  <p className="text-base text-neutral-200 leading-relaxed">{track.summary}</p>
                  <ul className="space-y-2 pt-2 border-t border-white/10 text-base text-neutral-300">
                    {track.courses.map((course, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-[#C89B3C] font-bold mt-0.5">
                          ·
                        </span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extra Detailed Modules (NIL Money 101 & Student-First Charter) */}
        {program.extraSections &&
          program.extraSections.map((sec, sIdx) => (
            <div key={sIdx} className="p-6 sm:p-8 rounded-xl bg-[#10141D] border border-white/10 space-y-4">
              <h2 className="text-2xl font-display font-bold text-white">{sec.title}</h2>
              <p className="text-base text-neutral-200 leading-relaxed">{sec.body}</p>
              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="space-y-3 pt-2">
                  {sec.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-base text-neutral-200 leading-relaxed">
                      <CheckCircle2 size={18} className="text-[#C89B3C] shrink-0 mt-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {program.door === 'earn' && (
                <div className="pt-4 border-t border-white/10">
                  <a
                    href="/trust"
                    onClick={(e) => handleLinkClick(e, '/trust')}
                    className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-[#68D391] hover:text-white transition-colors"
                  >
                    <ShieldCheck size={18} />
                    <span>Trust is the product: Review NIL Reporting, FTC Disclosure &amp; Taxes →</span>
                  </a>
                </div>
              )}
            </div>
          ))}

        {/* Educational / Non-Advice Disclaimer */}
        {program.disclaimer && (
          <div className="p-5 rounded-xl bg-[#131822] border border-[#E8C98B]/30 flex items-start gap-3">
            <Info size={20} className="text-[#E8C98B] shrink-0 mt-0.5" />
            <p className="text-base text-neutral-200 leading-relaxed">{program.disclaimer}</p>
          </div>
        )}

        {/* Brand Inquiry POST Form on /earn/nil-brand-match */}
        {program.id === 'nil-brand-match' && (
          <div id="brand-inquiry-form" className="p-6 sm:p-8 rounded-xl bg-[#10141D] border border-[#68D391]/40 space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-mono uppercase tracking-wider text-[#68D391] font-semibold">
                Placement Desk · Brand Campaign Inquiry
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Request Student-First Placement Details
              </h2>
              <p className="text-base text-neutral-200 leading-relaxed">
                Tell us what your brand wants to build with college creators or student teams. We reply with transparent disclosed-fee options — zero student commission.
              </p>
            </div>

            {brandSuccess ? (
              <div
                role="status"
                aria-live="polite"
                className="p-6 rounded-lg bg-[#0D1A16] border border-[#68D391]/50 space-y-3"
              >
                <div className="flex items-center gap-2 text-lg font-bold text-white">
                  <CheckCircle2 size={22} className="text-[#68D391]" />
                  <span>Brand inquiry received</span>
                </div>
                <p className="text-base text-neutral-200 leading-relaxed">
                  Thank you, {contactName}. Your campaign brief from <strong>{brandName}</strong> has been logged, and confirmation has been routed for <span className="font-mono text-[#E8C98B]">{contactEmail}</span>. Kevin Mitchell will respond directly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBrandSuccess(false);
                    setBrandName('');
                    setContactName('');
                    setContactEmail('');
                    setCampaignGoal('');
                    setBudgetNote('');
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-sm bg-[#172620] hover:bg-[#1F352C] text-white text-sm font-medium border border-white/15 cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleBrandInquirySubmit} noValidate className="space-y-4">
                {brandError && (
                  <div
                    role="alert"
                    className="p-4 rounded-lg bg-red-950/50 border border-red-500/50 text-red-200 text-base flex items-start gap-2.5"
                  >
                    <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
                    <span>{brandError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="brand-org-input" className="block text-sm font-medium text-neutral-200 mb-1.5">
                      Brand or Company Name *
                    </label>
                    <input
                      id="brand-org-input"
                      name="organization"
                      type="text"
                      required
                      autoComplete="organization"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. Acme Hardware"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="brand-contact-input" className="block text-sm font-medium text-neutral-200 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="brand-contact-input"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your name"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="brand-email-input" className="block text-sm font-medium text-neutral-200 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      id="brand-email-input"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="brand-scope-input" className="block text-sm font-medium text-neutral-200 mb-1.5">
                      Timeline or Campaign Scope (Optional)
                    </label>
                    <input
                      id="brand-scope-input"
                      name="scope"
                      type="text"
                      value={budgetNote}
                      onChange={(e) => setBudgetNote(e.target.value)}
                      placeholder="e.g. Fall semester student creator pilot"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="brand-goal-input" className="block text-sm font-medium text-neutral-200 mb-1.5">
                    What would you like to run? *
                  </label>
                  <textarea
                    id="brand-goal-input"
                    name="campaignGoal"
                    required
                    rows={4}
                    value={campaignGoal}
                    onChange={(e) => setCampaignGoal(e.target.value)}
                    placeholder="Describe your target student audience, deliverables, and compliance questions..."
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={brandSubmitting}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] disabled:opacity-60 text-[#090A0C] font-semibold text-base rounded-sm transition-colors cursor-pointer"
                  >
                    {brandSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Brand Inquiry</span>
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>

                  <a
                    href="/trust"
                    onClick={(e) => handleLinkClick(e, '/trust')}
                    className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-mono text-[#68D391] hover:text-white underline underline-offset-4"
                  >
                    <ShieldCheck size={15} />
                    <span>Review Trust &amp; Disclosure Standards</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Sibling Programs in Same Door */}
        {siblingPrograms.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-4">
            <h2 className="text-xl font-display font-bold text-white">
              More in {doorMeta.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblingPrograms.map((sib) => (
                <a
                  key={sib.id}
                  href={sib.path}
                  onClick={(e) => handleLinkClick(e, sib.path)}
                  className="p-4 rounded-lg bg-[#10141D] hover:bg-[#161C28] border border-white/10 hover:border-[#C89B3C]/50 transition-colors flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-[#E8C98B] uppercase">
                        {sib.badge || sib.doorLabel}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">{sib.status}</span>
                    </div>
                    <div className="text-lg font-display font-bold text-white">{sib.name}</div>
                    <p className="text-sm text-neutral-300 line-clamp-2">{sib.oneLine}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#E8C98B]">
                    <span>Read page</span>
                    <ArrowRight size={14} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
