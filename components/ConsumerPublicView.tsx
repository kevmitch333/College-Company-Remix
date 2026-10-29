import React, { useState } from 'react';
import { 
  Trophy, 
  Tv, 
  DollarSign, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowUpRight,
  Sparkles, 
  Lock, 
  KeyRound, 
  CheckCircle2, 
  Layers, 
  Users, 
  ChevronRight,
  BookOpen,
  Rss,
  SlidersHorizontal,
  Compass,
  FileText,
  Clock,
  Zap,
  BrainCircuit,
  Scale,
  Search,
  Bell,
  Radio
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AccessTier, 
  AccessProfile, 
  TIER_DEFINITIONS, 
  MEMBERSHIP_TOOLS_CATALOG, 
  MembershipTool 
} from '../src/utils/accessTiers';
import { NewsletterSignup } from './NewsletterSignup';
import { RssSubscriptionModal } from './RssSubscriptionModal';

// Bundled image assets
import heroArenaImg from '../src/assets/images/hero_collegiate_arena_1790396550961.jpg';
import mediaBroadcastImg from '../src/assets/images/media_broadcast_center_1790396570502.jpg';
import nilClearinghouseImg from '../src/assets/images/nil_clearinghouse_1791594540477.jpg';
import creatorStudioImg from '../src/assets/images/creator_studio_1791594557100.jpg';

interface ConsumerPublicViewProps {
  onOpenAccessModal: (targetToolId?: string) => void;
  onEnterPortal: (targetTab?: string, actionModal?: string) => void;
  currentTier?: AccessTier;
  currentProfile?: AccessProfile;
}

export const ConsumerPublicView: React.FC<ConsumerPublicViewProps> = ({
  onOpenAccessModal,
  onEnterPortal,
  currentTier = 0,
  currentProfile
}) => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [isRssModalOpen, setIsRssModalOpen] = useState<boolean>(false);
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>('All');

  const activeTier = currentProfile?.tier ?? currentTier;
  const isApproved = currentProfile?.membershipStatus === 'approved';
  const isPending = currentProfile?.membershipStatus === 'pending';

  const PILLARS = [
    {
      id: 0,
      title: 'Varsity Leagues & Competitions',
      shortTitle: 'Varsity Leagues',
      tagline: 'Sanctioned Intercollegiate Tournaments',
      icon: <Trophy className="text-[#C89B3C]" size={24} />,
      image: heroArenaImg,
      summary: 'We build and run official intercollegiate competitive circuits with varsity-level standards, campus broadcast support, and athletic director oversight.',
      bullets: [
        'National championships across PC, console, sim racing, and drone circuits',
        'Official university athletic department dual-enrollment verification',
        'Zero capital expenditures or hardware burdens required from schools'
      ],
      flagship: 'College Esports Expo (CEX) · Collegiate Sim Racing'
    },
    {
      id: 1,
      title: 'Collegiate Media & Broadcast Syndication',
      shortTitle: 'Media & Streaming',
      tagline: 'Live Campus Broadcast Networks',
      icon: <Tv className="text-[#38BDF8]" size={24} />,
      image: mediaBroadcastImg,
      summary: 'Delivering live campus sports broadcasts, student-run production credits, and linear FAST television syndication to nationwide digital audiences.',
      bullets: [
        'Linear FAST television distribution on national streaming services',
        'Pre-built broadcast graphic packages and remote production control',
        'Hands-on media training and accredited journalism internships for students'
      ],
      flagship: 'Collegiate Broadcast Network · Campus Live Studios'
    },
    {
      id: 2,
      title: 'Student-Athlete NIL & Endorsement Infrastructure',
      shortTitle: 'NIL & Athlete Growth',
      tagline: 'Clean Escrow & Automated Compliance',
      icon: <DollarSign className="text-[#68D391]" size={24} />,
      image: nilClearinghouseImg,
      summary: 'Enabling student-athletes and digital creators to monetize their talent safely with 100% pre-funded escrow accounts and NCAA compliance protection.',
      bullets: [
        'Pre-funded brand sponsorship escrow with zero payment default risk',
        'Automated state statutory filings and athletic department disclosures',
        'Protection against predatory contracts and amateur eligibility forfeiture'
      ],
      flagship: 'College Esports NIL · Collegiate Brand Escrow'
    },
    {
      id: 3,
      title: 'Turn-Key Campus Infrastructure & Tech Grants',
      shortTitle: 'Campus Infrastructure',
      tagline: 'Varsity Arenas & Motion Rigs',
      icon: <Building2 className="text-[#E8C98B]" size={24} />,
      image: creatorStudioImg,
      summary: 'Equipping university facilities with state-of-the-art competitive gaming labs, sim-racing motion rigs, and drone flight domes with zero debt.',
      bullets: [
        'Endowed facility construction and turn-key operational deployment',
        'Commercial monetization models returning shared revenue to athletic departments',
        'Integrated STEM curriculum labs for game development and aeronautics'
      ],
      flagship: 'Flight Dome Drone League · Apex Simulation Rigs'
    }
  ];

  const FLAGSHIP_HOLDINGS = [
    {
      name: "College Esports Expo (CEX)",
      division: "Competition & Events",
      tagline: "The Premier Intercollegiate Championship",
      desc: "Annual national festival uniting 400+ university varsity teams, industry career expos, and collegiate title deciders.",
      badge: "Flagship Event",
      color: "#C89B3C"
    },
    {
      name: "College Esports NIL",
      division: "NIL Clearinghouse",
      tagline: "Pre-Funded Brand Escrow Depository",
      desc: "Uniform athlete monetization protocol ensuring 100% on-time corporate disbursements with state statutory compliance.",
      badge: "Compliance Protocol",
      color: "#68D391"
    },
    {
      name: "Collegiate Sim Racing (CSR)",
      division: "Simulation Athletics",
      tagline: "NASCAR & IMSA Sanctioned Campus Circuit",
      desc: "High-fidelity motion simulator series bridging varsity athletic competition with automotive engineering departments.",
      badge: "Varsity League",
      color: "#38BDF8"
    },
    {
      name: "Flight Dome Drone League",
      division: "Aeronautics & Tech",
      tagline: "Intercollegiate First-Person View Drone Racing",
      desc: "Indoor netted arena competitions developing aerospace engineering and autonomous robotics talent across top universities.",
      badge: "STEM Athletic",
      color: "#E8C98B"
    }
  ];

  // Tool Categories
  const toolCategories = ['All', 'NIL & Athletics', 'Compliance & Governance', 'Portfolio & Network', 'Financial & Board', 'AI Intelligence'];

  const filteredTools = selectedToolCategory === 'All'
    ? MEMBERSHIP_TOOLS_CATALOG
    : MEMBERSHIP_TOOLS_CATALOG.filter(t => t.category === selectedToolCategory);

  return (
    <div className="w-full bg-[#090A0C] text-[#EDEDED] overflow-x-hidden selection:bg-[#C89B3C]/30 selection:text-[#E8C98B]">
      
      {/* ========================================================================= */}
      {/* 1. SIMPLIFIED HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 border-b border-white/[0.08] overflow-hidden bg-grid-subtle">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C89B3C]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Clear Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#161B26] border border-[#C89B3C]/30 text-xs font-mono text-[#E8C98B] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse"></span>
                <span className="tracking-widest uppercase">The Operating System for Collegiate Digital Sports</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-display font-bold text-white leading-[1.12] tracking-tight">
                Consolidating Collegiate Esports, Media Rights & Student-Athlete NIL.
              </h1>

              {/* Plain-English Explanation */}
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
                College Company operates as the central holding enterprise acquiring, scaling, and institutionalizing varsity leagues, broadcast syndication, and clean NIL infrastructure across 400+ North American universities.
              </p>

              {/* Primary Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('consumer-pillars');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-2 cursor-pointer font-mono"
                >
                  <span>Explore How It Works</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAccessModal()}
                  className="px-6 py-3.5 bg-[#141822] hover:bg-[#1C2230] border border-white/10 hover:border-[#C89B3C]/50 text-white font-medium text-xs uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm font-mono"
                >
                  <Lock size={13} className="text-[#C89B3C]" />
                  <span>{isApproved ? 'Manage Membership Clearance' : 'Apply for Institutional Membership'}</span>
                </button>
              </div>

              {/* 4 Instant Digestible Metrics */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
                <div className="p-3 rounded bg-[#10141D] border border-white/[0.06]">
                  <div className="font-mono text-2xl font-bold text-white">400+</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Campuses Reached</div>
                </div>
                <div className="p-3 rounded bg-[#10141D] border border-white/[0.06]">
                  <div className="font-mono text-2xl font-bold text-[#E8C98B]">43</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Proprietary Holdings</div>
                </div>
                <div className="p-3 rounded bg-[#10141D] border border-white/[0.06]">
                  <div className="font-mono text-2xl font-bold text-white">14,000+</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Varsity Athletes</div>
                </div>
                <div className="p-3 rounded bg-[#10141D] border border-white/[0.06]">
                  <div className="font-mono text-2xl font-bold text-[#68D391]">Zero</div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Campus Capex Required</div>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#121622] shadow-2xl p-2 group">
                <div className="relative aspect-[4/3] rounded overflow-hidden">
                  <img 
                    src={heroArenaImg} 
                    alt="Collegiate Esports Varsity Arena"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-black/40 to-transparent" />
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-sm bg-[#090A0C]/85 backdrop-blur-md border border-[#C89B3C]/40 text-xs font-mono text-[#E8C98B] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#68D391] animate-pulse"></span>
                    <span>400+ North American Campuses</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <p className="font-display font-bold text-base text-white">
                      The Next Era of Varsity Intercollegiate Athletics
                    </p>
                    <p className="text-xs text-neutral-300 font-light mt-1">
                      From fragmented dorm room clubs to sanctioned broadcast arenas and verified NIL student-athlete contracts.
                    </p>
                  </div>
                </div>

                {/* Quick Link bar */}
                <div className="p-3 flex items-center justify-between text-xs font-mono text-neutral-300">
                  <span className="text-[#C89B3C] font-semibold">Institutional Clearance:</span>
                  <button
                    onClick={() => onOpenAccessModal()}
                    className="text-white hover:text-[#C89B3C] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{isApproved ? 'View Member Clearance' : 'Request Membership Pass'}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 4 OPERATIONAL PILLARS (INTERACTIVE & DIGESTIBLE) */}
      {/* ========================================================================= */}
      <section id="consumer-pillars" className="py-20 md:py-28 border-b border-white/[0.08] bg-[#0A0D13]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C89B3C] uppercase">
              <Sparkles size={13} />
              <span>How College Company Operates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Four Pillars Unifying Collegiate Digital Sports
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              We streamline operations into four coordinated divisions that provide turn-key value to universities, student-athletes, and corporate partners.
            </p>
          </div>

          {/* Interactive Pillar Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8 bg-[#10141D] p-1.5 rounded-md border border-white/10">
            {PILLARS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActivePillar(idx)}
                className={`py-3 px-4 rounded-sm text-xs font-mono transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                  activePillar === idx
                    ? 'bg-[#182030] text-[#E8C98B] font-bold border border-[#C89B3C]/40 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="shrink-0">{p.icon}</div>
                <div className="truncate">
                  <div className="truncate text-white">{p.shortTitle}</div>
                  <div className="text-[10px] text-neutral-400 font-light truncate">Pillar 0{idx + 1}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Pillar Showcase Card */}
          <div className="rounded-lg bg-[#121622] border border-white/10 overflow-hidden shadow-xl grid lg:grid-cols-12 gap-8 items-center p-6 md:p-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#E8C98B]">
                <span>Pillar 0{activePillar + 1}</span>
                <span className="text-neutral-500">·</span>
                <span>{PILLARS[activePillar].tagline}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {PILLARS[activePillar].title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {PILLARS[activePillar].summary}
              </p>

              {/* Bullet Checklist */}
              <div className="space-y-2.5 pt-2">
                {PILLARS[activePillar].bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 size={16} className="text-[#C89B3C] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Flagship Callout */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-neutral-400">
                  Core Flagship Asset: <strong className="text-white">{PILLARS[activePillar].flagship}</strong>
                </span>
                <button
                  onClick={() => onEnterPortal('holdings')}
                  className="text-[#C89B3C] hover:text-[#E8C98B] flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <span>View in Private Holdings</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded overflow-hidden border border-white/10 aspect-[4/3] shadow-lg">
                <img 
                  src={PILLARS[activePillar].image} 
                  alt={PILLARS[activePillar].title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                    Verified Operating Asset
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {PILLARS[activePillar].title}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY IT MATTERS (THE PROBLEM VS. THE SOLUTION) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 border-b border-white/[0.08] bg-[#090A0C]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C89B3C] uppercase">
              <Compass size={13} />
              <span>The Institutional Transformation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Transforming Fragmented Gaming into a Sovereign Varsity Asset Class
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Why university athletic departments and corporate partners partner with College Company.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* The Fragmented Past */}
            <div className="rounded-lg p-8 bg-[#10131A] border border-red-500/20 space-y-5 text-left">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  The Fragmented Past
                </span>
                <span className="text-neutral-400 text-xs font-mono">Unorganized & Risky</span>
              </div>

              <h3 className="text-lg font-display font-bold text-neutral-200">
                Informal Student Clubs & Grey-Market Chaos
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm text-neutral-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Unsanctioned dorm tournaments with zero academic or athletic department oversight</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Predatory sponsor contracts putting student-athlete scholarships and amateur eligibility at risk</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Zero shared broadcast revenue or official licensing returning to the university</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>High hardware capex preventing athletic directors from creating safe varsity arenas</span>
                </li>
              </ul>
            </div>

            {/* The College Company Standard */}
            <div className="rounded-lg p-8 bg-[#121622] border border-[#C89B3C]/50 space-y-5 text-left shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C89B3C]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <span className="px-2.5 py-1 rounded bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C98B] font-mono text-xs uppercase tracking-wider font-semibold">
                  The College Company Standard
                </span>
                <span className="text-[#68D391] text-xs font-mono flex items-center gap-1 font-semibold">
                  <CheckCircle2 size={13} />
                  <span>Sovereign Moat</span>
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-white relative z-10">
                Legitimate Holding Governance & Universal Standards
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 relative z-10">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C89B3C] font-bold shrink-0">✓</span>
                  <span>Officially sanctioned varsity competitions verified by university registrars and athletic chairs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#68D391] font-bold shrink-0">✓</span>
                  <span>100% pre-funded escrow depository for student-athletes with automated state disclosures</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#38BDF8] font-bold shrink-0">✓</span>
                  <span>Turn-key arena hardware deployments with zero university capital expense</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#E8C98B] font-bold shrink-0">✓</span>
                  <span>National television broadcast distribution returning shared upside to campus programs</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FLAGSHIP HOLDINGS SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 border-b border-white/[0.08] bg-[#0B0E15]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C89B3C] uppercase">
                <Layers size={13} />
                <span>Proprietary Ecosystem Spotlight</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                Curated Marquee Holdings
              </h2>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                A public glimpse into our 43 category-defining operating brands across collegiate competition, media, and technology.
              </p>
            </div>

            <button
              onClick={() => onEnterPortal('holdings')}
              className="px-5 py-3 rounded-sm bg-[#161B26] hover:bg-[#1E2433] border border-white/10 hover:border-[#C89B3C]/50 text-white font-mono text-xs flex items-center gap-2 cursor-pointer transition-all shrink-0 self-start md:self-auto"
            >
              <span>View Full 43-Asset Directory</span>
              <ArrowRight size={13} className="text-[#C89B3C]" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FLAGSHIP_HOLDINGS.map((h, i) => (
              <div 
                key={i}
                className="rounded-lg p-6 bg-[#10141D] border border-white/10 hover:border-white/20 transition-all text-left flex flex-col justify-between group shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                      style={{ backgroundColor: `${h.color}20`, color: h.color, border: `1px solid ${h.color}40` }}
                    >
                      {h.division}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">0{i + 1}</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white group-hover:text-[#E8C98B] transition-colors">
                    {h.name}
                  </h3>

                  <p className="text-xs text-neutral-400 font-mono">
                    {h.tagline}
                  </p>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed pt-1">
                    {h.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-neutral-400">{h.badge}</span>
                  <button
                    onClick={() => onEnterPortal('holdings')}
                    className="text-[#C89B3C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Private Portfolio Teaser Banner */}
          <div className="mt-8 p-6 rounded-lg bg-[#141822] border border-[#C89B3C]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#090A0C] border border-[#C89B3C]/50 flex items-center justify-center text-[#E8C98B] shrink-0">
                <Lock size={18} />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">
                  39 Additional Specialized Properties Held in Private Portfolio
                </h4>
                <p className="text-xs text-neutral-400 font-light">
                  Domain assets, campus flight dome blueprints, and media valuation models are confidential for accredited members.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenAccessModal()}
              className="px-4 py-2.5 rounded-sm bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-sm"
            >
              Unlock Private Directory
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4.5 ROBUST TOOLS SUITE (PROTECTED BEHIND MEMBERSHIP WALL) */}
      {/* ========================================================================= */}
      <section id="robust-tools-catalog" className="py-20 md:py-28 border-b border-white/[0.08] bg-[#0E121B]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C89B3C] uppercase">
              <Lock size={13} className="text-[#C89B3C]" />
              <span>Permission-Based Institutional Instruments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Robust Analytical Tools Behind the Membership Wall
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              To prevent public data exposure and protect collegiate athletic fiduciary filings, our interactive calculators, regulatory audits, and AI engines are restricted to approved members.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {toolCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedToolCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  selectedToolCategory === cat
                    ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                    : 'bg-[#151A24] border border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {filteredTools.map((tool) => {
              const hasClearance = isApproved && activeTier >= tool.requiredTier;
              return (
                <div 
                  key={tool.id}
                  className={`rounded-lg p-6 bg-[#121622] border transition-all flex flex-col justify-between shadow-lg relative overflow-hidden group ${
                    hasClearance
                      ? 'border-emerald-500/40 hover:border-emerald-500/60'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Subtle Glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-full blur-xl group-hover:bg-[#C89B3C]/10 transition-colors pointer-events-none" />

                  <div className="space-y-4">
                    {/* Top status bar */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-neutral-300">
                        {tool.category}
                      </span>
                      
                      {hasClearance ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          Unlocked
                        </span>
                      ) : isPending ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/60 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                          <Clock size={11} className="animate-spin" />
                          Pending Review
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C98B] flex items-center gap-1">
                          <Lock size={11} />
                          {tool.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-[#E8C98B] transition-colors">
                      {tool.name}
                    </h3>

                    <p className="text-xs text-neutral-300 font-light leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Highlights bullet checklist */}
                    <div className="pt-2 space-y-1.5 text-xs font-mono text-neutral-300">
                      {tool.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-[#C89B3C] shrink-0 mt-0.5" />
                          <span className="text-[11px] text-neutral-300 font-light">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-5 mt-4 border-t border-white/[0.08]">
                    {hasClearance ? (
                      <button
                        onClick={() => onEnterPortal(tool.targetTab, tool.actionModal)}
                        className="w-full py-2.5 rounded-sm bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Launch Tool in Portal</span>
                        <ArrowRight size={13} />
                      </button>
                    ) : isPending ? (
                      <button
                        onClick={() => onOpenAccessModal(tool.id)}
                        className="w-full py-2.5 rounded-sm bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Clock size={13} />
                        <span>In Review (Fast-Track Approve)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenAccessModal(tool.id)}
                        className="w-full py-2.5 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-[#C89B3C]/40 text-[#E8C98B] hover:text-white font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Lock size={12} className="text-[#C89B3C]" />
                        <span>Sign Up for Access</span>
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Evaluator Demo Notice Bar */}
          <div className="mt-10 p-5 rounded-lg bg-[#141822] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C89B3C]/10 border border-[#C89B3C]/30 flex items-center justify-center text-[#C89B3C] shrink-0">
                <Zap size={15} />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white">
                  Evaluating the Platform?
                </div>
                <div className="text-[11px] text-neutral-400 font-light">
                  You can use our 1-click Fast-Track Evaluator Approval in the membership portal to simulate any tier instantly without waiting for manual verification.
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenAccessModal()}
              className="px-4 py-2 rounded-sm bg-[#1A202E] hover:bg-[#222A3E] border border-white/20 text-white font-mono text-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              Open Clearance Console →
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECURED INSTITUTIONAL TIERS SHOWCASE */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 border-b border-white/[0.08] bg-[#090A0C]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C89B3C] uppercase">
              <KeyRound size={13} />
              <span>Secured Access Control</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Institutional Clearance Tiers
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              To prevent information overload and safeguard confidential athletic, financial, and legal filings, deeper tools are compartmentalized by role.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            
            {/* Tier 1 Card */}
            <div className="rounded-lg p-6 bg-[#10141D] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] font-mono uppercase font-semibold">
                    Tier 1 Clearance
                  </span>
                  <span className="text-xs font-mono text-neutral-500">Free Verification</span>
                </div>

                <h3 className="font-display font-bold text-lg text-white">
                  Campus & Brand Partners
                </h3>

                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  For university gaming leads, brand sponsors, student-athletes, and campus media creators.
                </p>

                <div className="pt-2 space-y-2 text-xs font-mono text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#38BDF8] shrink-0" />
                    <span>Full 43-Brand Portfolio Directory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#38BDF8] shrink-0" />
                    <span>400+ Campus Impact Map & Footprint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#38BDF8] shrink-0" />
                    <span>Member Directory & Verified Messaging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#38BDF8] shrink-0" />
                    <span>Student-Athlete NIL Valuation Calculator</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAccessModal()}
                className="mt-6 w-full py-2.5 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-[#38BDF8]/40 text-[#38BDF8] hover:text-white font-mono text-xs font-semibold transition-all cursor-pointer text-center"
              >
                Apply for Tier 1 Clearance →
              </button>
            </div>

            {/* Tier 2 Card */}
            <div className="rounded-lg p-6 bg-[#121622] border border-[#E8C98B]/40 transition-all flex flex-col justify-between shadow-lg relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#E8C98B]/20 border border-[#E8C98B]/40 text-[#E8C98B] text-[10px] font-mono uppercase font-semibold">
                    Tier 2 Clearance
                  </span>
                  <span className="text-xs font-mono text-[#E8C98B]">Athletic Directorate</span>
                </div>

                <h3 className="font-display font-bold text-lg text-white">
                  Athletic Directors & Legal Counsel
                </h3>

                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  For university athletic directors, conference commissioners, Title IX coordinators, and legal counsel.
                </p>

                <div className="pt-2 space-y-2 text-xs font-mono text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#E8C98B] shrink-0" />
                    <span>Everything in Tier 1 Clearance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#E8C98B] shrink-0" />
                    <span>House v. NCAA Antitrust Compliance Charters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#E8C98B] shrink-0" />
                    <span>Title IX Digital Equity & Parity Standards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#E8C98B] shrink-0" />
                    <span>State-by-State NIL Statutory Escrow Charters</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAccessModal()}
                className="mt-6 w-full py-2.5 rounded-sm bg-[#E8C98B] hover:bg-[#D4AF37] text-[#090A0C] font-mono text-xs font-bold transition-all cursor-pointer text-center"
              >
                Apply for Tier 2 Clearance →
              </button>
            </div>

            {/* Tier 3 Card */}
            <div className="rounded-lg p-6 bg-[#10141D] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#68D391]/15 border border-[#68D391]/30 text-[#68D391] text-[10px] font-mono uppercase font-semibold">
                    Tier 3 Clearance
                  </span>
                  <span className="text-xs font-mono text-neutral-500">Board & Allocators</span>
                </div>

                <h3 className="font-display font-bold text-lg text-white">
                  Accredited Investors & Board
                </h3>

                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  For institutional venture partners, private equity allocators, family offices, and board executives.
                </p>

                <div className="pt-2 space-y-2 text-xs font-mono text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#68D391] shrink-0" />
                    <span>Everything in Tiers 1 & 2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#68D391] shrink-0" />
                    <span>Full DCF Financial Models & Valuations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#68D391] shrink-0" />
                    <span>Interactive TAM & Scenario Simulator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#68D391] shrink-0" />
                    <span>Multi-Agent AI Fiduciary Orchestrator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#68D391] shrink-0" />
                    <span>Data Room PDF & CSV Financial Export</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAccessModal()}
                className="mt-6 w-full py-2.5 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-[#68D391]/40 text-[#68D391] hover:text-white font-mono text-xs font-semibold transition-all cursor-pointer text-center"
              >
                Apply for Tier 3 Clearance →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DEDICATED RESEARCH WIRE & INTELLIGENCE DISPATCHES (SEPARATE PAGE CALLOUT) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-white/[0.08] bg-[#0A0D13]">
        <div className="max-w-[1240px] mx-auto px-6 text-left">
          
          <div className="rounded-xl p-8 md:p-10 bg-gradient-to-r from-[#10141F] via-[#141926] to-[#10141F] border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C89B3C]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-xs font-mono text-[#E8C98B]">
                <Radio size={13} className="text-[#C89B3C] animate-pulse" />
                <span>Dedicated Research Wire & Market Intelligence</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Collegiate Antitrust, Media Rights & NIL Analysis
              </h3>

              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                All legal analysis, House v. NCAA settlement models, FAST media syndication dispatches, and the syndicated RSS wire have been moved onto their own dedicated research page to keep this homepage streamlined and focused.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
              <button
                type="button"
                onClick={() => onEnterPortal('editorial')}
                className="px-6 py-3.5 rounded-sm bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md"
              >
                <Radio size={14} />
                <span>Open Dedicated Research Wire →</span>
              </button>

              <button
                type="button"
                onClick={() => setIsRssModalOpen(true)}
                className="px-4 py-3.5 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-white/10 hover:border-[#C89B3C]/40 text-neutral-300 hover:text-white font-mono text-xs transition-colors cursor-pointer flex items-center gap-2"
                title="Subscribe via RSS 2.0"
              >
                <Rss size={13} className="text-[#C89B3C]" />
                <span>RSS 2.0</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* RSS Subscription Modal */}
      <RssSubscriptionModal 
        isOpen={isRssModalOpen}
        onClose={() => setIsRssModalOpen(false)}
      />

    </div>
  );
};
