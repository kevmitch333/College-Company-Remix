import React, { useState } from 'react';
import {
  Trophy,
  Tv,
  DollarSign,
  Building2,
  ArrowRight,
  Lock,
  CheckCircle2,
  Layers,
  Clock,
  Search,
  Radio,
  Rss,
  Compass,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import {
  AccessTier,
  AccessProfile,
  MEMBERSHIP_TOOLS_CATALOG,
  TIER_DEFINITIONS
} from '../src/utils/accessTiers';
import { RssSubscriptionModal } from './RssSubscriptionModal';

// Bundled image assets
import heroArenaImg from '../src/assets/images/hero_collegiate_arena_1790396550961.jpg';
import mediaBroadcastImg from '../src/assets/images/media_broadcast_center_1790396570502.jpg';
import nilClearinghouseImg from '../src/assets/images/nil_clearinghouse_1791594540477.jpg';
import creatorStudioImg from '../src/assets/images/creator_studio_1791594557100.jpg';

interface ConsumerPublicViewProps {
  onOpenAccessModal: (targetToolId?: string) => void;
  onEnterPortal: (targetTab?: string, actionModal?: string, subTab?: string) => void;
  onOpenSearch: () => void;
  onSelectSpotlightBrand: (brandName: string) => void;
  currentTier?: AccessTier;
  currentProfile?: AccessProfile;
}

type PersonaKey = 'all' | 'university' | 'brands' | 'athletes' | 'investors';

export const ConsumerPublicView: React.FC<ConsumerPublicViewProps> = ({
  onOpenAccessModal,
  onEnterPortal,
  onOpenSearch,
  onSelectSpotlightBrand,
  currentTier = 0,
  currentProfile
}) => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [selectedPersona, setSelectedPersona] = useState<PersonaKey>('all');
  const [isRssModalOpen, setIsRssModalOpen] = useState<boolean>(false);

  const activeTier = currentProfile?.tier ?? currentTier;
  const isApproved = currentProfile?.membershipStatus === 'approved' && activeTier >= 1;
  const isPending = currentProfile?.membershipStatus === 'pending';

  const PERSONAS: Record<PersonaKey, {
    label: string;
    headline: string;
    summary: string;
    ctaLabel: string;
    requiredTier: AccessTier;
    toolId?: string;
    targetTab: string;
    targetSubTab?: string;
  }> = {
    all: {
      label: 'All Stakeholders',
      headline: 'One central operating system for 400+ university campuses.',
      summary: 'Browse our 4 operational pillars and 4 flagship spotlight brands below, or apply for membership to unlock all 43 holdings, compliance tools, and financial models.',
      ctaLabel: isApproved ? 'Open Member Workspace' : 'Apply for Membership',
      requiredTier: 1,
      toolId: 'holding-directory-map',
      targetTab: 'holdings'
    },
    university: {
      label: 'Universities & ADs',
      headline: 'Zero-capex varsity esports, Title IX parity & amateur protection.',
      summary: 'Deploy turn-key collegiate leagues, academic media labs, and 50-state statutory NIL safeguards governed under Tier 2 Athletic Directorate clearance.',
      ctaLabel: isApproved && activeTier >= 2 ? 'Open Compliance Dashboard' : 'Request Athletic Directorate Access (Tier 2)',
      requiredTier: 2,
      toolId: 'regulatory-audit-table',
      targetTab: 'governance',
      targetSubTab: 'compliance-dashboard'
    },
    brands: {
      label: 'Brands & Sponsors',
      headline: 'Reach 14,000+ verified student-athletes with pre-funded escrow.',
      summary: 'Access live campus sponsorship RFPs, automated disclosure filings, and linear FAST broadcast inventory under Tier 1 Brand Partner clearance.',
      ctaLabel: isApproved && activeTier >= 1 ? 'Explore 43 Holdings & NIL Radar' : 'Unlock Brand Partner Portal (Tier 1)',
      requiredTier: 1,
      toolId: 'nil-opportunity-radar',
      targetTab: 'holdings'
    },
    athletes: {
      label: 'Student-Athletes',
      headline: 'Calculate fair-market NIL value without risking scholarship eligibility.',
      summary: 'Estimate sponsorship valuation across divisions and access vetted, escrow-backed brand opportunities under free Tier 1 verified clearance.',
      ctaLabel: isApproved && activeTier >= 1 ? 'Launch Athlete NIL Calculator' : 'Unlock NIL Calculator (Tier 1)',
      requiredTier: 1,
      toolId: 'student-nil-calc',
      targetTab: 'strategy',
      targetSubTab: 'nil_calculator'
    },
    investors: {
      label: 'Investors & Board',
      headline: '43 category-defining digital assets unified in a Series A holding group.',
      summary: 'Inspect interactive DCF models, TAM yield projections, and our multi-agent fiduciary orchestrator inside the Tier 3 Accredited Data Room.',
      ctaLabel: isApproved && activeTier >= 3 ? 'Open Financial Data Room' : 'Request Investor Clearance (Tier 3)',
      requiredTier: 3,
      toolId: 'dcf-financial-modeler',
      targetTab: 'financials'
    }
  };

  const activePersona = PERSONAS[selectedPersona];

  const handlePersonaCta = () => {
    if (isApproved && activeTier >= activePersona.requiredTier) {
      onEnterPortal(activePersona.targetTab, undefined, activePersona.targetSubTab);
    } else {
      onOpenAccessModal(activePersona.toolId);
    }
  };

  const PILLARS = [
    {
      id: 0,
      title: 'Varsity Leagues & Competitions',
      shortTitle: 'Varsity Leagues',
      tagline: 'Sanctioned Intercollegiate Tournaments',
      icon: <Trophy className="text-[#C89B3C]" size={22} />,
      image: heroArenaImg,
      summary: 'Official intercollegiate competitive circuits built with varsity standards, campus broadcast support, and athletic department oversight.',
      bullets: [
        'National championships across PC, console, sim racing, and drone circuits',
        'University athletic department eligibility & dual-enrollment verification',
        'Zero capital expenditures or hardware burdens required from schools'
      ],
      flagship: 'College Esports Expo (CEX) · College Racing League (CRL)'
    },
    {
      id: 1,
      title: 'Collegiate Media & Broadcast Syndication',
      shortTitle: 'Media & Streaming',
      tagline: 'Live Campus Broadcast Networks',
      icon: <Tv className="text-[#38BDF8]" size={22} />,
      image: mediaBroadcastImg,
      summary: 'Live campus sports broadcasts, student-run production credits, and linear FAST television syndication reaching nationwide audiences.',
      bullets: [
        'Linear FAST television distribution across national streaming platforms',
        'Pre-built broadcast graphic packages and remote production workflows',
        'Hands-on media training and accredited journalism internships for students'
      ],
      flagship: 'College Esports TV · College Creator Academy'
    },
    {
      id: 2,
      title: 'Student-Athlete NIL & Escrow Infrastructure',
      shortTitle: 'NIL & Compliance',
      tagline: 'Clean Escrow & Automated Disclosures',
      icon: <DollarSign className="text-[#68D391]" size={22} />,
      image: nilClearinghouseImg,
      summary: 'Safe talent monetization with 100% pre-funded escrow accounts, automated state filings, and NCAA eligibility protection.',
      bullets: [
        'Pre-funded brand sponsorship escrow with zero payment default risk',
        'Automated state statutory filings and athletic department disclosures',
        'Strict safeguards against predatory contracts and eligibility forfeiture'
      ],
      flagship: 'College Esports NIL · College NIL Hub'
    },
    {
      id: 3,
      title: 'Turn-Key Campus Infrastructure & Tech Labs',
      shortTitle: 'Campus Arenas',
      tagline: 'Varsity Arenas & Motion Rigs',
      icon: <Building2 className="text-[#E8C98B]" size={22} />,
      image: creatorStudioImg,
      summary: 'Equipping university facilities with competitive gaming labs, sim-racing motion rigs, and indoor drone flight domes with zero campus debt.',
      bullets: [
        'Endowed facility buildout and turn-key operational deployment',
        'Commercial revenue sharing returning direct upside to athletic departments',
        'Integrated STEM curriculum labs for broadcasting and aeronautics'
      ],
      flagship: 'College Drone Racing League · College Esports Arena'
    }
  ];

  const FLAGSHIP_HOLDINGS = [
    {
      name: 'College Esports Expo (CEX)',
      division: 'Competitive Leagues',
      tagline: 'The Premier Intercollegiate Championship',
      desc: 'Annual national festival uniting 400+ university varsity teams, career expos, and collegiate championship finals.',
      badge: 'Flagship Event',
      color: '#C89B3C'
    },
    {
      name: 'College Esports NIL',
      division: 'NIL & Creator Capital',
      tagline: 'Pre-Funded Brand Escrow Depository',
      desc: 'Uniform athlete monetization protocol ensuring 100% on-time corporate disbursements with automated statutory compliance.',
      badge: 'Compliance Protocol',
      color: '#68D391'
    },
    {
      name: 'College Racing League (CRL)',
      division: 'Competitive Leagues',
      tagline: 'Sanctioned Collegiate Sim Motorsports',
      desc: 'High-fidelity motion simulator series bridging varsity athletic competition with engineering and automotive sponsors.',
      badge: 'Varsity Circuit',
      color: '#38BDF8'
    },
    {
      name: 'College Drone Racing League (CDRL)',
      division: 'Competitive Leagues',
      tagline: 'Intercollegiate FPV Drone Racing',
      desc: 'Indoor netted arena competitions developing aerospace engineering and autonomous robotics talent across top universities.',
      badge: 'STEM Athletics',
      color: '#E8C98B'
    }
  ];

  return (
    <div className="w-full bg-[#090A0C] text-[#EDEDED] overflow-x-hidden selection:bg-[#C89B3C]/30 selection:text-[#E8C98B]">

      {/* ========================================================================= */}
      {/* 1. STREAMLINED HERO WITH PERSONA INTENT SELECTOR */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-white/[0.08] overflow-hidden bg-grid-subtle">
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Core Thesis + Persona Router */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="text-xs font-mono tracking-[0.2em] uppercase text-[#C89B3C]">
                Collegiate Digital Sports · Media · NIL Infrastructure
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-[1.1] tracking-tight">
                Consolidating Collegiate Esports, Broadcast Rights & Student-Athlete NIL.
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
                College Company is the holding enterprise acquiring, scaling, and governing varsity competitions, FAST media syndication, and compliant NIL infrastructure across 400+ North American universities.
              </p>

              {/* Quick Persona / Intent Navigator */}
              <div className="p-4 rounded-lg bg-[#10141D] border border-white/10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E8C98B]">
                    I am exploring as:
                  </span>
                  <button
                    type="button"
                    onClick={onOpenSearch}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Search size={12} className="text-[#C89B3C]" />
                    <span>Search holdings & tools</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">⌘K</kbd>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(PERSONAS) as PersonaKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedPersona(key)}
                      className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                        selectedPersona === key
                          ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                          : 'bg-[#161B26] text-neutral-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {PERSONAS[key].label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-white">{activePersona.headline}</div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{activePersona.summary}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePersonaCta}
                    className="px-4 py-2.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-mono text-xs font-bold rounded-sm transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-center"
                  >
                    <span>{activePersona.ctaLabel}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Clean Stat Strip */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/[0.08] max-w-2xl">
                <div>
                  <div className="font-mono text-2xl font-bold text-white tabular-nums">400+</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Campuses</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-[#E8C98B] tabular-nums">43</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Owned Brands</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-white tabular-nums">14,000+</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Varsity Athletes</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-[#68D391] tabular-nums">Zero</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Campus Capex</div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Visual Anchor */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#10141D] shadow-2xl group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={heroArenaImg}
                    alt="Collegiate Esports Varsity Arena"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#C89B3C]">
                      North American Varsity Footprint
                    </div>
                    <p className="font-display font-bold text-base text-white">
                      Sanctioned Leagues, Broadcast Studios & Escrow NIL
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-300">
                  <span className="text-neutral-400">
                    {isApproved ? `Member · Tier ${activeTier}` : isPending ? 'Application In Review' : 'Public Overview'}
                  </span>
                  <button
                    type="button"
                    onClick={() => isApproved ? onEnterPortal('holdings') : onOpenAccessModal()}
                    className="text-[#E8C98B] hover:text-white flex items-center gap-1 transition-colors cursor-pointer font-semibold"
                  >
                    <span>{isApproved ? 'Open Member Portal' : 'Member Sign In / Apply'}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 4 OPERATIONAL PILLARS */}
      {/* ========================================================================= */}
      <section id="consumer-pillars" className="py-16 md:py-24 border-b border-white/[0.08] bg-[#0A0D13]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-left">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono tracking-widest text-[#C89B3C] uppercase">
                How College Company Operates
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                Four Coordinated Operating Divisions
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-light">
                Built to deliver turn-key value to universities, student-athletes, media networks, and corporate sponsors.
              </p>
            </div>
          </div>

          {/* 4-Tab Selector */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6 bg-[#10141D] p-1.5 rounded-md border border-white/10">
            {PILLARS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePillar(idx)}
                className={`py-3 px-4 rounded-sm text-xs font-mono transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                  activePillar === idx
                    ? 'bg-[#182030] text-[#E8C98B] font-bold border border-[#C89B3C]/40'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="shrink-0">{p.icon}</div>
                <div className="truncate">
                  <div className="truncate text-white">{p.shortTitle}</div>
                  <div className="text-[10px] text-neutral-400 font-light truncate">0{idx + 1} · Division</div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <div className="rounded-lg bg-[#121622] border border-white/10 overflow-hidden grid lg:grid-cols-12 gap-8 items-center p-6 md:p-10">
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="text-xs font-mono uppercase tracking-wider text-[#E8C98B]">
                Pillar 0{activePillar + 1} · {PILLARS[activePillar].tagline}
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {PILLARS[activePillar].title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {PILLARS[activePillar].summary}
              </p>

              <div className="space-y-2.5 pt-1">
                {PILLARS[activePillar].bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 size={16} className="text-[#C89B3C] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-neutral-400">
                  Flagship Properties: <strong className="text-white">{PILLARS[activePillar].flagship}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => isApproved ? onEnterPortal('holdings') : onOpenAccessModal('holding-directory-map')}
                  className="text-[#C89B3C] hover:text-[#E8C98B] flex items-center gap-1 font-semibold cursor-pointer"
                >
                  {!isApproved && <Lock size={12} />}
                  <span>{isApproved ? 'Open 43-Asset Directory' : 'Sign Up to Explore All 43 Assets'}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded overflow-hidden border border-white/10 aspect-[4/3]">
                <img
                  src={PILLARS[activePillar].image}
                  alt={PILLARS[activePillar].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-xs font-semibold text-white">{PILLARS[activePillar].title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY IT MATTERS (CONCISE PROBLEM VS. STANDARD) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#090A0C]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="max-w-2xl mb-10 text-left space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C89B3C] uppercase">
              <Compass size={13} />
              <span>Institutional Transformation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              From Fragmented Campus Clubs to Sovereign Infrastructure
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg p-7 bg-[#10131A] border border-white/10 space-y-4 text-left">
              <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
                The Fragmented Past
              </div>
              <h3 className="text-lg font-display font-bold text-neutral-200">
                Unsanctioned Clubs & Eligibility Risk
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
                <li className="flex items-start gap-2.5"><span className="text-red-400 font-bold">✕</span><span>Informal dorm tournaments without athletic department oversight</span></li>
                <li className="flex items-start gap-2.5"><span className="text-red-400 font-bold">✕</span><span>Unvetted sponsor contracts risking student-athlete eligibility</span></li>
                <li className="flex items-start gap-2.5"><span className="text-red-400 font-bold">✕</span><span>No shared broadcast revenue or high-cost hardware budgets</span></li>
              </ul>
            </div>

            <div className="rounded-lg p-7 bg-[#121622] border border-[#C89B3C]/40 space-y-4 text-left">
              <div className="text-xs font-mono uppercase tracking-wider text-[#E8C98B] font-semibold flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C89B3C]" />
                <span>The College Company Standard</span>
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                Sanctioned Governance & Zero-Capex Deployment
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                <li className="flex items-start gap-2.5"><span className="text-[#68D391] font-bold">✓</span><span>Varsity competitions verified by university registrars & athletic chairs</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#68D391] font-bold">✓</span><span>100% pre-funded escrow accounts with automated state disclosures</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#68D391] font-bold">✓</span><span>Turn-key arena buildouts & FAST media syndication sharing upside</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CURATED PUBLIC SPOTLIGHT (4 MARQUEE BRANDS + PRIVATE PORTFOLIO TEASER) */}
      {/* ========================================================================= */}
      <section id="public-spotlight" className="py-16 md:py-24 border-b border-white/[0.08] bg-[#0B0E15]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C89B3C] uppercase">
                <Layers size={13} />
                <span>Public Portfolio Spotlight</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                4 Flagship Operating Properties
              </h2>
              <p className="text-sm text-neutral-300 font-light">
                Inspect 4 public showcase brands below. The remaining 39 specialized holdings are accessible to approved members.
              </p>
            </div>

            <button
              type="button"
              onClick={() => isApproved ? onEnterPortal('holdings') : onOpenAccessModal('holding-directory-map')}
              className="px-5 py-3 rounded-sm bg-[#161B26] hover:bg-[#1E2433] border border-white/10 hover:border-[#C89B3C]/50 text-white font-mono text-xs flex items-center gap-2 cursor-pointer transition-all shrink-0 self-start md:self-auto"
            >
              {!isApproved && <Lock size={12} className="text-[#C89B3C]" />}
              <span>{isApproved ? 'View Full 43-Asset Directory' : 'Unlock All 43 Holdings'}</span>
              <ArrowRight size={13} className="text-[#C89B3C]" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FLAGSHIP_HOLDINGS.map((h, i) => (
              <div
                key={h.name}
                className="rounded-lg p-6 bg-[#10141D] border border-white/10 hover:border-white/25 transition-all text-left flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span style={{ color: h.color }} className="font-semibold uppercase tracking-wider">
                      {h.division}
                    </span>
                    <span className="text-neutral-500">0{i + 1}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-[#E8C98B] transition-colors">
                    {h.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">{h.tagline}</p>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">{h.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-neutral-400">{h.badge}</span>
                  <button
                    type="button"
                    onClick={() => onSelectSpotlightBrand(h.name)}
                    className="text-[#C89B3C] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <span>Inspect Spotlight</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. UNIFIED MEMBERSHIP WALL & CLEARANCE TIERS */}
      {/* ========================================================================= */}
      <section id="membership-tiers" className="py-16 md:py-24 border-b border-white/[0.08] bg-[#090A0C]">
        <div className="max-w-[1240px] mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C89B3C] uppercase">
              <KeyRound size={13} />
              <span>Permission-Based Member Access</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Institutional Clearance Tiers & Tools
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Sign up once to verify your campus, brand, or investor credentials. Robust analytics, compliance repositories, and financial models unlock by approved tier.
            </p>
          </div>

          {/* 3 Clean Tier Cards */}
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {TIER_DEFINITIONS.filter((t) => t.tier > 0).map((def) => {
              const unlockedThisTier = isApproved && activeTier >= def.tier;
              const tierTools = MEMBERSHIP_TOOLS_CATALOG.filter((tool) => tool.requiredTier === def.tier);
              return (
                <div
                  key={def.tier}
                  className={`rounded-lg p-6 border flex flex-col justify-between transition-all ${
                    unlockedThisTier
                      ? 'bg-[#11191D] border-emerald-500/40'
                      : def.tier === 2
                      ? 'bg-[#121622] border-[#E8C98B]/40'
                      : 'bg-[#10141D] border-white/10'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold uppercase tracking-wider" style={{ color: def.color }}>
                        {def.badge}
                      </span>
                      {unlockedThisTier ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 size={12} /> Unlocked
                        </span>
                      ) : (
                        <span className="text-neutral-500">Approval Required</span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg text-white">{def.name}</h3>
                    <p className="text-xs text-neutral-300 font-light leading-relaxed">{def.description}</p>

                    <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs font-mono text-neutral-300">
                      <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                        {def.tier > 1 ? `Includes Tier ${def.tier - 1} +` : 'Included Tools:'}
                      </div>
                      {tierTools.map((tool) => (
                        <div key={tool.id} className="flex items-center gap-2">
                          <CheckCircle2 size={13} style={{ color: def.color }} className="shrink-0" />
                          <span>{tool.shortName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      unlockedThisTier
                        ? onEnterPortal(tierTools[0]?.targetTab || 'holdings', tierTools[0]?.actionModal, tierTools[0]?.targetSubTab)
                        : onOpenAccessModal(tierTools[0]?.id)
                    }
                    className={`mt-6 w-full py-2.5 rounded-sm font-mono text-xs font-semibold transition-all cursor-pointer text-center ${
                      unlockedThisTier
                        ? 'bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-300'
                        : def.tier === 2
                        ? 'bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-bold'
                        : 'bg-[#161B26] hover:bg-[#1E2536] border border-white/15 text-white'
                    }`}
                  >
                    {unlockedThisTier
                      ? `Open Tier ${def.tier} Tools →`
                      : isPending
                      ? 'Application Pending Review'
                      : `Apply for Tier ${def.tier} →`}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Concise Tool Directory Index */}
          <div className="rounded-lg border border-white/10 bg-[#0D1119] overflow-hidden text-left">
            <div className="px-6 py-4 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#111622]">
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Protected Member Tools Directory
                </h3>
                <p className="text-xs text-neutral-400">
                  Direct status of every interactive calculator, legal audit engine, and financial data room.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#E8C98B]">
                {isApproved ? `Active Clearance: Tier ${activeTier}` : 'Sign up & verify to unlock'}
              </span>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {MEMBERSHIP_TOOLS_CATALOG.map((tool) => {
                const hasClearance = isApproved && activeTier >= tool.requiredTier;
                return (
                  <div
                    key={tool.id}
                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display font-semibold text-sm text-white">{tool.name}</span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                          · {tool.badge}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-light">{tool.description}</p>
                    </div>

                    <div className="shrink-0">
                      {hasClearance ? (
                        <button
                          type="button"
                          onClick={() => onEnterPortal(tool.targetTab, tool.actionModal, tool.targetSubTab)}
                          className="px-4 py-2 rounded-sm bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Launch</span>
                          <ArrowRight size={12} />
                        </button>
                      ) : isPending ? (
                        <button
                          type="button"
                          onClick={() => onOpenAccessModal(tool.id)}
                          className="px-4 py-2 rounded-sm bg-amber-950/50 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Clock size={12} />
                          <span>Pending</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenAccessModal(tool.id)}
                          className="px-4 py-2 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-[#C89B3C]/35 text-[#E8C98B] font-mono text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Lock size={12} />
                          <span>Unlock (Tier {tool.requiredTier})</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SEPARATE RESEARCH WIRE PAGE CALLOUT */}
      {/* ========================================================================= */}
      <section className="py-14 md:py-18 bg-[#0A0D13]">
        <div className="max-w-[1240px] mx-auto px-6 text-left">
          <div className="rounded-lg p-8 bg-[#10141F] border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E8C98B] uppercase tracking-wider">
                <Radio size={13} className="text-[#C89B3C]" />
                <span>Separate Research & Editorial Page</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Market Intelligence Wire & Institutional Briefings
              </h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Collegiate antitrust dispatches, House v. NCAA updates, media rights briefs, and the weekly newsletter live on their own dedicated page.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onEnterPortal('editorial')}
                className="px-5 py-3 rounded-sm bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <Radio size={14} />
                <span>Open Research Wire →</span>
              </button>

              <button
                type="button"
                onClick={() => setIsRssModalOpen(true)}
                className="px-4 py-3 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-white/10 text-neutral-300 hover:text-white font-mono text-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <Rss size={13} className="text-[#C89B3C]" />
                <span>RSS 2.0</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <RssSubscriptionModal
        isOpen={isRssModalOpen}
        onClose={() => setIsRssModalOpen(false)}
      />
    </div>
  );
};
