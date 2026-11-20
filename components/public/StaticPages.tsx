import React, { useState } from 'react';
import {
  ArrowRight,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  User,
} from 'lucide-react';
import { SiteBreadcrumbs } from './SiteBreadcrumbs';
import { DOOR_META, DoorKey } from '../../src/data/programs';

interface StaticPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <section className="py-10 sm:py-14 bg-[#090A0C]">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-10">
        <SiteBreadcrumbs items={[{ label: 'About' }]} onNavigate={onNavigate} />

        <header className="space-y-4 max-w-3xl">
          <div className="text-sm font-mono uppercase tracking-widest text-[#C89B3C] font-semibold">
            About College Company
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            The alternative institution for the general collegiate population.
          </h1>
          <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
            College Company is building specialized micro-courses for job readiness and entrepreneurship, competitions beyond varsity sports, and compliant ways for college students to earn while they learn.
          </p>
        </header>

        {/* Four-Door Model Overview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-white">How Our Four Doors Work Together</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(['learn', 'compete', 'earn', 'trust'] as DoorKey[]).map((key) => {
              const door = DOOR_META[key];
              return (
                <a
                  key={key}
                  href={door.path}
                  onClick={(e) => handleLinkClick(e, door.path)}
                  className="p-6 rounded-xl bg-[#10141D] hover:bg-[#151B28] border border-white/10 hover:border-[#C89B3C]/50 space-y-2 transition-colors"
                >
                  <div className="text-sm font-mono uppercase tracking-wider font-semibold" style={{ color: door.accentColor }}>
                    {door.eyebrow}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">{door.label}</h3>
                  <p className="text-base text-neutral-300 leading-relaxed">{door.description}</p>
                </a>
              );
            })}
          </div>
        </div>

        {/* Founder & Honest Stage */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#10141D] border border-[#C89B3C]/30 space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-mono uppercase tracking-wider text-[#E8C98B] font-semibold">
            <User size={16} />
            <span>Leadership &amp; Location</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white">
            Founded and led by Kevin Mitchell
          </h2>
          <p className="text-base text-neutral-200 leading-relaxed">
            Kevin Mitchell is a music and entertainment executive and educator based in Boston, Massachusetts. Through College Company, he is uniting practical creator workforce training, open club competitions, and transparent NIL &amp; FTC education so everyday students and their families have clear tools to grow safely.
          </p>
          <p className="text-base text-neutral-300 leading-relaxed">
            College Company currently holds a portfolio of college-focused properties and domains in development, including College Creator Academy, NIL Money 101, College Esports Expo (CEX), College Drone Racing League (CDRL), College Racing League (CRL), NIL Brand Match, NIL Compliance Pro, and PlayerNIL.org.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-base rounded-sm transition-colors"
            >
              <span>Contact Kevin Mitchell</span>
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ContactPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [audience, setAudience] = useState('Student or Parent');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill out your name, email address, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please provide a valid email address (for example, name@school.edu).');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          audience,
          subject: subject.trim(),
          message: message.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorMsg(data.error || 'Unable to send your message right now. Please email kevin@collegeesportsx.com directly.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMsg('Network error sending your message. You can always write directly to kevin@collegeesportsx.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-[#090A0C]">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-10">
        <SiteBreadcrumbs items={[{ label: 'Contact' }]} onNavigate={onNavigate} />

        <header className="space-y-3 max-w-2xl">
          <div className="text-sm font-mono uppercase tracking-widest text-[#C89B3C] font-semibold">
            Direct Contact
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Contact College Company
          </h1>
          <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
            Questions from students, parents, campus clubs, educators, or brand sponsors are always welcome — no account required.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-xl bg-[#10141D] border border-white/10 space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-[#C89B3C] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-mono uppercase text-neutral-400">Email</div>
                  <a
                    href="mailto:kevin@collegeesportsx.com"
                    className="text-base font-semibold text-[#E8C98B] hover:text-white underline underline-offset-2 break-all"
                  >
                    kevin@collegeesportsx.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-white/10">
                <MapPin size={20} className="text-[#C89B3C] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-mono uppercase text-neutral-400">Location</div>
                  <div className="text-base text-white">Boston, Massachusetts</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-white/10">
                <User size={20} className="text-[#C89B3C] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-mono uppercase text-neutral-400">Founder</div>
                  <div className="text-base text-white">Kevin Mitchell</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-xl bg-[#10141D] border border-white/10">
            {submitted ? (
              <div role="status" aria-live="polite" className="py-6 space-y-4">
                <div className="flex items-center gap-2.5 text-xl font-bold text-white">
                  <CheckCircle2 size={24} className="text-[#68D391]" />
                  <span>Message sent</span>
                </div>
                <p className="text-base text-neutral-200 leading-relaxed">
                  Thank you, {name}. Your message has been received and a confirmation receipt is directed to{' '}
                  <span className="font-mono text-[#E8C98B]">{email}</span>. Kevin Mitchell will reply to your inquiry.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="min-h-[44px] px-5 py-2.5 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-white/15 text-white text-sm font-medium cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {errorMsg && (
                  <div
                    role="alert"
                    className="p-4 rounded-lg bg-red-950/50 border border-red-500/50 text-red-200 text-base flex items-start gap-2.5"
                  >
                    <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-200 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-200 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-audience" className="block text-sm font-medium text-neutral-200 mb-1.5">
                      I am a...
                    </label>
                    <select
                      id="contact-audience"
                      name="audience"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white outline-none"
                    >
                      <option value="Student or Parent">Student or Parent / Guardian</option>
                      <option value="School or Campus Organization">School, Club, or Educator</option>
                      <option value="Brand or Sponsor">Brand or Local Sponsor</option>
                      <option value="Partner or Advisor">Partner or Advisor</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-neutral-200 mb-1.5">
                      Subject (Optional)
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. College Creator Academy cohort"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-200 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#090B10] border border-white/15 focus:border-[#C89B3C] text-base text-white placeholder-neutral-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] disabled:opacity-60 text-[#090A0C] font-semibold text-base rounded-sm transition-colors cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const PrivacyPage: React.FC<StaticPageProps> = ({ onNavigate }) => (
  <section className="py-10 sm:py-14 bg-[#090A0C]">
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 space-y-6">
      <SiteBreadcrumbs items={[{ label: 'Privacy Policy' }]} onNavigate={onNavigate} />

      <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">Privacy Policy</h1>
      <p className="text-sm font-mono text-neutral-400">Last updated: October 2026 · College Company (Boston, Massachusetts)</p>

      <div className="space-y-6 text-base text-neutral-200 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-xl font-display font-bold text-white">1. Information You Choose to Share</h2>
          <p>
            You do not need an account to read any public page, guide, or program description on college.company. When you submit a newsletter signup, contact message, brand inquiry, or information request, we collect only the name, email address, organization, and message details you provide.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-display font-bold text-white">2. How We Use Submitted Information</h2>
          <p>
            We use submitted contact details solely to reply to your questions, share requested program updates, or coordinate campus and brand pilot discussions. We do not sell student, parent, or partner email addresses to third-party data brokers.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-display font-bold text-white">3. Your Choices &amp; Contact</h2>
          <p>
            You can ask to review, update, or delete any inquiry or newsletter preference you submitted at any time by writing to{' '}
            <a href="mailto:kevin@collegeesportsx.com" className="text-[#E8C98B] underline underline-offset-2">
              kevin@collegeesportsx.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </section>
);

export const TermsPage: React.FC<StaticPageProps> = ({ onNavigate }) => (
  <section className="py-10 sm:py-14 bg-[#090A0C]">
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 space-y-6">
      <SiteBreadcrumbs items={[{ label: 'Terms of Use' }]} onNavigate={onNavigate} />

      <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">Terms of Use</h1>
      <p className="text-sm font-mono text-neutral-400">Last updated: October 2026 · College Company (Boston, Massachusetts)</p>

      <div className="space-y-6 text-base text-neutral-200 leading-relaxed">
        <div className="p-5 rounded-xl bg-[#10141D] border border-[#E8C98B]/30 flex items-start gap-3">
          <ShieldCheck size={20} className="text-[#E8C98B] shrink-0 mt-0.5" />
          <p>
            <strong>Development preview:</strong> Development preview — programs, data, and commercial terms are illustrative and subject to verification.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-display font-bold text-white">1. Educational Content — Not Legal, Tax, or Financial Advice</h2>
          <p>
            Materials on NIL Money 101, NIL Compliance Pro, PlayerNIL.org, and the Research Wire are provided strictly for educational and informational purposes. They do not constitute personalized tax, legal, immigration, or financial aid advice. Always verify individual obligations with a qualified CPA, licensed attorney, your campus compliance or financial aid office, or a designated school official (DSO).
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-display font-bold text-white">2. No Securities Offering</h2>
          <p>
            Nothing on college.company, including the Investor Relations information-request form, constitutes an offer to sell or a solicitation of an offer to buy any securities in any jurisdiction.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-display font-bold text-white">3. Contact</h2>
          <p>
            Questions about these terms may be sent to Kevin Mitchell at{' '}
            <a href="mailto:kevin@collegeesportsx.com" className="text-[#E8C98B] underline underline-offset-2">
              kevin@collegeesportsx.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </section>
);
