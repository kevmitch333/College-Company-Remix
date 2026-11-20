import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Loader2,
  X,
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, ensureAuthenticated } from '../src/firebase';

export interface NewsletterSignupProps {
  className?: string;
  variant?: 'banner' | 'card' | 'embedded';
  onSubscribed?: (email: string) => void;
}

const TOPIC_OPTIONS = [
  { id: 'learn-courses', label: 'College Creator Academy & Micro-Courses' },
  { id: 'nil-taxes', label: 'NIL Money 101 & Family Tax Guides' },
  { id: 'compete-leagues', label: 'Open Campus Competitions (CEX, CDRL, CRL)' },
  { id: 'earn-trust', label: 'Placement Desk & Compliance Updates' },
];

const LOCAL_STORAGE_KEY = 'college_company_newsletter_subscription';

export function validateEmailFormat(input: string): { isValid: boolean; error?: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter an email address to receive program updates.' };
  }
  if (/\s/.test(trimmed)) {
    return { isValid: false, error: 'Email addresses cannot contain spaces.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (for example, name@school.edu).' };
  }
  return { isValid: true };
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  className = '',
  onSubscribed,
}) => {
  const [email, setEmail] = useState('');
  const [confirmedEmail, setConfirmedEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [fullName, setFullName] = useState('');
  const [roleType, setRoleType] = useState('Student');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'learn-courses',
    'nil-taxes',
  ]);
  const [showOptions, setShowOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setConfirmedEmail(parsed.email);
          setIsSuccess(true);
        }
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((t) => t !== topicId) : [...prev, topicId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (honeypot.trim().length > 0) {
      setIsSuccess(true);
      setEmail('');
      return;
    }

    const check = validateEmailFormat(email);
    if (!check.isValid) {
      setEmailError(check.error || 'Please enter a valid email address.');
      return;
    }

    setEmailError(null);
    const cleanEmail = email.trim().toLowerCase();
    setIsSubmitting(true);

    try {
      // 1. Real POST submission to server endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          fullName: fullName.trim(),
          roleType,
          topics: selectedTopics,
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        setEmailError(errBody.error || 'Unable to register subscription right now.');
        setIsSubmitting(false);
        return;
      }

      // 2. Best-effort Firestore archive
      try {
        ensureAuthenticated();
        await addDoc(collection(db, 'newsletter_subscribers'), {
          email: cleanEmail,
          fullName: fullName.trim(),
          roleType,
          topics: selectedTopics,
          source: 'College Company Updates',
          status: 'active',
          subscribedAt: new Date().toISOString(),
          timestamp: serverTimestamp(),
        });
      } catch {
        // Non-blocking fallback
      }

      try {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ email: cleanEmail, topics: selectedTopics })
        );
      } catch {
        // Ignore
      }

      setConfirmedEmail(cleanEmail);
      setEmail('');
      setIsSuccess(true);
      setShowToast(true);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => setShowToast(false), 5000);
      onSubscribed?.(cleanEmail);
    } catch {
      setEmailError('Network error while subscribing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        id="newsletter-signup-form"
        className={`rounded-xl border border-[#C89B3C]/35 bg-[#10141D] p-6 sm:p-8 space-y-5 shadow-xl ${className}`}
      >
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#E8C98B] font-semibold">
            <Mail size={16} className="text-[#C89B3C]" />
            <span>Program &amp; Launch Updates</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Stay Informed on Cohorts, Clubs &amp; Tax Guides
          </h3>
          <p className="text-base text-neutral-300 leading-relaxed">
            Get notified when College Creator Academy tracks, NIL Money 101 resources, and open campus competitions launch. No spam, no account required.
          </p>
        </div>

        {isSuccess ? (
          <div
            role="status"
            aria-live="polite"
            className="p-6 rounded-lg bg-[#0D1A16] border border-[#68D391]/45 space-y-3"
          >
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <CheckCircle2 size={22} className="text-[#68D391]" />
              <span>You&rsquo;re subscribed</span>
            </div>
            <p className="text-base text-neutral-200 leading-relaxed">
              Updates and a confirmation note are directed to{' '}
              <span className="font-mono text-[#E8C98B]">{confirmedEmail}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setEmail('');
                setEmailError(null);
              }}
              className="min-h-[44px] px-4 py-2 rounded-sm bg-[#162620] hover:bg-[#1E332B] border border-white/15 text-white text-sm font-medium cursor-pointer"
            >
              Update email or preferences
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Honeypot */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="newsletter-hp">Leave empty</label>
              <input
                id="newsletter-hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
              <div className="md:col-span-8 space-y-1.5">
                <label htmlFor="newsletter-email-input" className="block text-sm font-medium text-neutral-200">
                  Email Address *
                </label>
                <input
                  id="newsletter-email-input"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'newsletter-email-error' : undefined}
                  placeholder="you@school.edu or name@example.com"
                  className={`w-full min-h-[48px] px-4 py-2.5 rounded-sm bg-[#090B10] text-base text-white placeholder-neutral-500 outline-none ${
                    emailError
                      ? 'border border-red-500 focus:border-red-400'
                      : 'border border-white/15 focus:border-[#C89B3C]'
                  }`}
                />
                {emailError && (
                  <div
                    id="newsletter-email-error"
                    role="alert"
                    className="flex items-start gap-2 text-sm text-red-300 pt-1"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
                    <span>{emailError}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-4 md:pt-7">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] px-5 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] disabled:opacity-60 text-[#090A0C] font-semibold text-base rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Updates</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowOptions(!showOptions)}
                className="min-h-[44px] text-sm font-mono text-[#E8C98B] hover:text-white underline underline-offset-4 cursor-pointer"
              >
                {showOptions ? 'Hide optional preferences' : 'Optional: choose topics & role'}
              </button>
            </div>

            {showOptions && (
              <div className="p-4 rounded-lg bg-[#090C12] border border-white/10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="newsletter-name-input" className="block text-sm text-neutral-300 mb-1">
                      Your Name (Optional)
                    </label>
                    <input
                      id="newsletter-name-input"
                      type="text"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="First and last name"
                      className="w-full min-h-[44px] px-3 py-2 rounded-sm bg-[#10141D] border border-white/15 text-base text-white placeholder-neutral-500 outline-none focus:border-[#C89B3C]"
                    />
                  </div>
                  <div>
                    <label htmlFor="newsletter-role-select" className="block text-sm text-neutral-300 mb-1">
                      Who is subscribing? (Optional)
                    </label>
                    <select
                      id="newsletter-role-select"
                      value={roleType}
                      onChange={(e) => setRoleType(e.target.value)}
                      className="w-full min-h-[44px] px-3 py-2 rounded-sm bg-[#10141D] border border-white/15 text-base text-white outline-none focus:border-[#C89B3C]"
                    >
                      <option value="Student">Student</option>
                      <option value="Parent or Guardian">Parent or Guardian</option>
                      <option value="School or Educator">School or Educator</option>
                      <option value="Brand or Sponsor">Brand or Sponsor</option>
                      <option value="Partner">Partner</option>
                    </select>
                  </div>
                </div>

                <fieldset className="space-y-2">
                  <legend className="text-sm font-medium text-neutral-200">Topics (Optional)</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TOPIC_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center gap-2.5 p-2.5 rounded bg-[#10141D] border border-white/10 text-sm text-neutral-200 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(opt.id)}
                          onChange={() => toggleTopic(opt.id)}
                          className="h-4 w-4 accent-[#C89B3C]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}
          </form>
        )}
      </div>

      {showToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm w-[calc(100vw-2.5rem)] p-4 rounded-xl bg-[#0F1420] border border-[#68D391]/60 text-white shadow-2xl flex items-start gap-3"
        >
          <CheckCircle2 size={20} className="text-[#68D391] shrink-0 mt-0.5" />
          <div className="flex-1 text-sm">
            <div className="font-bold">Subscribed to College Company updates</div>
            <div className="text-neutral-300 mt-0.5">{confirmedEmail}</div>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            aria-label="Dismiss notification"
            className="p-1 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </aside>
      )}
    </>
  );
};

export default NewsletterSignup;
