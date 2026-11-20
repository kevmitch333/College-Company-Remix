import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  BookOpen,
  Trophy,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { SiteBreadcrumbs } from './SiteBreadcrumbs';

interface InstitutionsProps {
  onNavigate: (path: string) => void;
}

export const InstitutionsLandingPage: React.FC<InstitutionsProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <section className="py-10 sm:py-14 bg-[#090A0C]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-10">
        <SiteBreadcrumbs items={[{ label: 'For Institutions & Partners' }]} onNavigate={onNavigate} />

        <header className="max-w-3xl space-y-4">
          <div className="text-sm font-mono uppercase tracking-widest text-[#C89B3C] font-semibold">
            Schools, Campuses &amp; Partners
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            For Institutions &amp; Partners
          </h1>
          <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
            Partner with College Company to offer workforce micro-courses, open campus club competitions, and compliant earning literacy to your general collegiate student body.
          </p>

          <div className="pt-2">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-base rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Discuss a Campus Pilot</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </header>

        {/* Three Clear Offerings for Schools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#10141D] border border-white/10 space-y-3">
            <BookOpen size={24} className="text-[#C89B3C]" />
            <h2 className="text-xl font-display font-bold text-white">Micro-Course Cohorts</h2>
            <p className="text-base text-neutral-300 leading-relaxed">
              Structured career and entrepreneurship tracks via College Creator Academy and NIL Money 101 that complement campus career services and media departments.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#10141D] border border-white/10 space-y-3">
            <Trophy size={24} className="text-[#38BDF8]" />
            <h2 className="text-xl font-display font-bold text-white">Club Competitions</h2>
            <p className="text-base text-neutral-300 leading-relaxed">
              Open competition formats across CEX, CDRL (drone racing), and CRL (sim racing) built for general campus clubs, robotics teams, and student organizations.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#10141D] border border-white/10 space-y-3">
            <Users size={24} className="text-[#68D391]" />
            <h2 className="text-xl font-display font-bold text-white">Team-Building &amp; Trust</h2>
            <p className="text-base text-neutral-300 leading-relaxed">
              Every cohort weaves FTC disclosure rules, NIL reporting awareness, and plain-English financial literacy into student activities from day one.
            </p>
          </div>
        </div>

        {/* Pilot Terms & Cost Clarity */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#10141D] border border-white/10 space-y-4">
          <h2 className="text-2xl font-display font-bold text-white">
            How Campus Pilots Work &amp; What They Cost
          </h2>
          <p className="text-base text-neutral-200 leading-relaxed">
            <strong>Pilot terms on request.</strong> Because institutions vary by student enrollment, club structure, and semester calendar, we scope cohort pilots directly with campus leaders, advisors, or student affairs teams.
          </p>
          <ul className="space-y-2.5 text-base text-neutral-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={18} className="text-[#68D391] shrink-0 mt-1" />
              <span>Designed for the general collegiate population — no varsity sports department required.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={18} className="text-[#68D391] shrink-0 mt-1" />
              <span>Direct coordination with founder Kevin Mitchell (<a href="mailto:kevin@collegeesportsx.com" className="text-[#E8C98B] underline underline-offset-2">kevin@collegeesportsx.com</a>).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={18} className="text-[#68D391] shrink-0 mt-1" />
              <span>Honest scope: programs are currently in development and welcoming early campus pilot conversations.</span>
            </li>
          </ul>
        </div>

        {/* Clearly Labeled Secondary Path: Investor Relations */}
        <div className="p-6 rounded-xl bg-[#0D1017] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <Building2 size={14} className="text-[#C89B3C]" />
              <span>Secondary Path</span>
            </div>
            <h2 className="text-lg font-display font-bold text-white">
              Investor Relations &amp; Information Requests
            </h2>
            <p className="text-sm text-neutral-300">
              Looking for background documentation on College Company’s development roadmap and portfolio?
            </p>
          </div>
          <a
            href="/institutions/investors"
            onClick={(e) => handleLinkClick(e, '/institutions/investors')}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-white/15 text-white font-medium text-base transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
          >
            <span>Investor Relations</span>
            <ArrowRight size={16} className="text-[#E8C98B]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export const InvestorRelationsPage: React.FC<InstitutionsProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [roleType, setRoleType] = useState('Institutional Partner / Advisor');
  const [notes, setNotes] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false); // Never pre-checked!
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !organization.trim() || !email.trim()) {
      setErrorMsg('Please enter your name, organization, and email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address (for example, name@organization.com).');
      return;
    }
    if (!privacyAgreed) {
      setErrorMsg('Please confirm the acknowledgment box before submitting your request.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/request-information', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          organization: organization.trim(),
          email: email.trim(),
          roleType,
          notes: notes.trim(),
          acknowledged: privacyAgreed,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorMsg(data.error || 'Could not process your request right now. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMsg('Network issue submitting request. Please try again or email kevin@collegeesportsx.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-[#090A0C]">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 space-y-8">
        <SiteBreadcrumbs
          items={[
            { label: 'For Institutions & Partners', href: '/institutions' },
            { label: 'Investor Relations' },
          ]}
          onNavigate={onNavigate}
        />

        <header className="space-y-3">
          <div className="text-sm font-mono uppercase tracking-widest text-[#C89B3C] font-semibold">
            Investor Relations
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Request Information
          </h1>
          <p className="text-base text-neutral-200 leading-relaxed">
            College Company maintains a portfolio of college-focused properties and domains in development. Use the form below to request an overview conversation with founder Kevin Mitchell. Submitting this form is an informational inquiry only and does not constitute an offer to sell or a solicitation of an offer to buy any securities.
          </p>
        </header>

        <div className="p-6 sm:p-8 rounded-xl bg-[#10141D] border border-white/10">
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="py-6 space-y-4 text-left"
            >
              <div className="flex items-center gap-2.5 text-xl font-bold text-white">
                <CheckCircle2 size={24} className="text-[#68D391]" />
                <span>Information request received</span>
              </div>
              <p className="text-base text-neutral-200 leading-relaxed">
                Thank you, {name}. Your request from <strong>{organization}</strong> has been received, and a confirmation email note has been queued for <span className="font-mono text-[#E8C98B]">{email}</span>. Kevin Mitchell will follow up directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setOrganization('');
                  setEmail('');
                  setNotes('');
                  setPrivacyAgreed(false);
                }}
                className="min-h-[44px] px-5 py-2.5 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-white/15 text-white text-sm font-medium cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {errorMsg && (
                <div
                  role="alert"
                  className="p-4 rounded-lg bg-red-950/50 border border-red-500/50 text-red-200 text-base flex items-start gap-2.5"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label htmlFor="req-info-name" className="block text-sm font-medium text-neutral-200 mb-1.5">
                  Full Name *
                </label>
                <input
                  id="req-info-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                />
              </div>

              <div>
                <label htmlFor="req-info-org" className="block text-sm font-medium text-neutral-200 mb-1.5">
                  Organization or Firm *
                </label>
                <input
                  id="req-info-org"
                  name="organization"
                  type="text"
                  required
                  autoComplete="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Organization, school, or family office"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="req-info-email" className="block text-sm font-medium text-neutral-200 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="req-info-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="req-info-role" className="block text-sm font-medium text-neutral-200 mb-1.5">
                    Inquiry Context
                  </label>
                  <select
                    id="req-info-role"
                    name="roleType"
                    value={roleType}
                    onChange={(e) => setRoleType(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white outline-none"
                  >
                    <option value="Institutional Partner / Advisor">Institutional Partner / Advisor</option>
                    <option value="Strategic Corporate Partner">Strategic Corporate Partner</option>
                    <option value="University / Campus Leadership">University / Campus Leadership</option>
                    <option value="General Background Request">General Background Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="req-info-notes" className="block text-sm font-medium text-neutral-200 mb-1.5">
                  Questions or Topics of Interest (Optional)
                </label>
                <textarea
                  id="req-info-notes"
                  name="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share which programs or partnership questions you would like to discuss..."
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer text-base text-neutral-200">
                  <input
                    id="req-info-ack"
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-1 h-5 w-5 accent-[#C89B3C] shrink-0"
                  />
                  <span className="leading-relaxed">
                    I understand this is an informational inquiry only (not a securities offering) and consent to College Company contacting me at the email provided.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] disabled:opacity-60 text-[#090A0C] font-semibold text-base rounded-sm transition-colors cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Request Information</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="p-4 rounded-lg bg-[#0D1017] border border-white/10 flex items-center gap-2.5 text-sm text-neutral-300">
          <ShieldCheck size={16} className="text-[#68D391] shrink-0" />
          <span>
            Direct inquiries can also be emailed to{' '}
            <a href="mailto:kevin@collegeesportsx.com" className="text-[#E8C98B] underline underline-offset-2">
              kevin@collegeesportsx.com
            </a>
            .
          </span>
        </div>
      </div>
    </section>
  );
};
