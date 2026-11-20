import React from 'react';
import { ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { DOOR_META, DoorKey, getProgramsByDoor } from '../../src/data/programs';
import { SiteBreadcrumbs, ProgramStatusBadge } from './SiteBreadcrumbs';

interface DoorLandingPageProps {
  door: DoorKey;
  onNavigate: (path: string) => void;
}

export const DoorLandingPage: React.FC<DoorLandingPageProps> = ({ door, onNavigate }) => {
  const meta = DOOR_META[door];
  const programs = getProgramsByDoor(door);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(href);
  };

  const primaryCta =
    door === 'learn'
      ? { label: 'Explore College Creator Academy', href: '/learn/college-creator-academy' }
      : door === 'compete'
      ? { label: 'Explore College Esports Expo (CEX)', href: '/compete/college-esports-expo' }
      : door === 'earn'
      ? { label: 'Open Placement Desk & Brand Inquiry', href: '/earn/nil-brand-match' }
      : { label: 'Explore PlayerNIL.org Guides', href: '/trust/player-nil' };

  return (
    <section className="py-10 sm:py-14 bg-[#090A0C]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        <SiteBreadcrumbs items={[{ label: meta.label }]} onNavigate={onNavigate} />

        {/* Door Header */}
        <header className="max-w-3xl space-y-4">
          <div
            className="text-sm font-mono uppercase tracking-widest font-semibold"
            style={{ color: meta.accentColor }}
          >
            {meta.eyebrow}
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            {meta.headline}
          </h1>
          <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
            {meta.description}
          </p>

          <div className="pt-2">
            <a
              href={primaryCta.href}
              onClick={(e) => handleLinkClick(e, primaryCta.href)}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-base rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{primaryCta.label}</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </header>

        {/* Special Visible Callouts per Door */}
        {door === 'learn' && (
          <div className="p-6 rounded-xl bg-[#101520] border border-[#C89B3C]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#E8C98B] font-semibold">
                <Users size={16} />
                <span>For Parents &amp; Guardians</span>
              </div>
              <p className="text-base text-neutral-200 leading-relaxed">
                Evaluating creator or NIL opportunities with your student? Read our plain-English tax and safety guides directly — no account required.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="/learn/for-parents"
                onClick={(e) => handleLinkClick(e, '/learn/for-parents')}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#182032] hover:bg-[#222D45] border border-[#C89B3C]/50 text-[#E8C98B] hover:text-white font-semibold text-sm rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
              >
                <span>Open Parent Guide</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        )}

        {door === 'earn' && (
          <div className="p-6 rounded-xl bg-[#0F1816] border border-[#68D391]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#68D391] font-semibold">
                <ShieldCheck size={16} />
                <span>Student-First Charter &amp; Trust</span>
              </div>
              <p className="text-base text-neutral-200 leading-relaxed">
                Brands pay a clearly disclosed fee; students and learners pay zero commission. Every campaign pairs directly with our compliance and tax rules.
              </p>
            </div>
            <a
              href="/trust"
              onClick={(e) => handleLinkClick(e, '/trust')}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#152420] hover:bg-[#1B302A] border border-[#68D391]/50 text-[#68D391] hover:text-white font-semibold text-sm rounded-sm transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#68D391]"
            >
              <span>Read Trust &amp; Compliance Rules</span>
              <ArrowRight size={15} />
            </a>
          </div>
        )}

        {/* Consistent Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <article
              key={program.id}
              className="bg-[#10141D] border border-white/10 hover:border-[#C89B3C]/50 rounded-xl overflow-hidden flex flex-col justify-between transition-colors shadow-lg"
            >
              <div>
                <div className="aspect-[16/9] w-full bg-[#0A0D14] overflow-hidden border-b border-white/10">
                  <img
                    src={program.image}
                    alt={program.imageAlt}
                    loading="lazy"
                    width={640}
                    height={360}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E8C98B]">
                      {program.doorLabel}
                      {program.badge ? ` · ${program.badge}` : ''}
                      {program.flagship ? ' · Flagship' : ''}
                    </span>
                    <ProgramStatusBadge status={program.status} />
                  </div>

                  <h2 className="text-xl font-display font-bold text-white leading-snug">
                    {program.name}
                  </h2>

                  <p className="text-base text-neutral-300 leading-relaxed">
                    {program.oneLine}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <a
                  href={program.path}
                  onClick={(e) => handleLinkClick(e, program.path)}
                  className="inline-flex items-center justify-between w-full min-h-[44px] px-4 py-2.5 rounded-sm bg-[#161B26] hover:bg-[#1F2636] border border-white/15 hover:border-[#C89B3C]/50 text-white text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
                >
                  <span>View Program Details</span>
                  <ArrowRight size={16} className="text-[#E8C98B]" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Cross-Door Next Step */}
        <div className="p-6 rounded-xl bg-[#0D1017] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base text-neutral-200">
            Have a question for a school cohort, campus club, parent, or brand campaign?
          </p>
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-sm border border-[#C89B3C]/50 text-[#E8C98B] hover:bg-[#C89B3C] hover:text-[#090A0C] font-semibold text-base transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
          >
            <span>Contact Us</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
