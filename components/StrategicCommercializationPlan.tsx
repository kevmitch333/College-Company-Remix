import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  TrendingUp,
  Layers,
  FileCheck2,
  AlertTriangle,
  Building2,
  Scale,
  Award,
  Users,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  Sparkles,
  Briefcase,
  Workflow,
  Clock,
  Printer,
  Copy,
  Check,
  Compass,
  ArrowUpRight,
  HelpCircle,
  FileText,
  BadgeCheck,
  Eye,
  Crosshair,
  Lock,
  Cpu
} from 'lucide-react';

export type DispositionTier = 'All' | 'Flagship Proof' | 'Operator License' | 'Conditional Hold' | 'Under Review';

export interface AssetDispositionItem {
  id: string;
  name: string;
  domain: string;
  family: string;
  tier: 'Flagship Proof' | 'Operator License' | 'Conditional Hold' | 'Under Review';
  archetype: string;
  commercialRationale: string;
  rightsClearance: {
    institutionalMarks: 'Exempt / Neutral' | 'Licensing Required' | 'Editorial Fair-Use';
    nilConsents: 'Not Required' | 'Direct Opt-In' | 'Escrow Cleared';
    publisherIp: 'Compliant' | 'Direct Sanction Needed' | 'Title Neutral';
    aiLikeness: 'Strict Ban' | 'Guarded Opt-In';
  };
  resourceAllocation: 'High (Core Capital)' | 'Moderate (Partner-Led)' | 'Minimal (Holding Maintenance)';
  nextMilestone: string;
  riskRating: 'Low' | 'Medium' | 'High (Trademark Sensitive)';
}

export const ASSET_DISPOSITION_DATA: AssetDispositionItem[] = [
  {
    id: 'college-company',
    name: 'College Company Core Gateway',
    domain: 'collegecompany.com',
    family: 'Corporate & Infrastructure',
    tier: 'Flagship Proof',
    archetype: 'Holding Parent & Governance Node',
    commercialRationale: 'Central trust anchor, corporate administration, compliance clearinghouse, and capital allocation engine for all collegiate initiatives.',
    rightsClearance: {
      institutionalMarks: 'Editorial Fair-Use',
      nilConsents: 'Not Required',
      publisherIp: 'Compliant',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'High (Core Capital)',
    nextMilestone: 'Establish centralized legal charter and Delaware holding corporate governance bylaws.',
    riskRating: 'Low'
  },
  {
    id: 'college-esports-x',
    name: 'College Esports X (CEX)',
    domain: 'collegeesportsx.com',
    family: 'Varsity & Club Competition',
    tier: 'Flagship Proof',
    archetype: 'Sanctioned Collegiate League Operator',
    commercialRationale: 'Flagship competitive athletics circuit connecting 450+ campus varsity programs, certified collegiate tournaments, and broadcast syndication.',
    rightsClearance: {
      institutionalMarks: 'Licensing Required',
      nilConsents: 'Direct Opt-In',
      publisherIp: 'Direct Sanction Needed',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'High (Core Capital)',
    nextMilestone: 'Deploy Fall Invitational across 16 pilot universities with publisher community licenses.',
    riskRating: 'Medium'
  },
  {
    id: 'college-disability',
    name: 'College Disability & Adaptive Athletics',
    domain: 'collegedisability.com',
    family: 'Accessibility & Adaptive Sports',
    tier: 'Flagship Proof',
    archetype: 'Inclusion Athletics & Grant-Funded Programs',
    commercialRationale: 'National pioneer in adaptive collegiate gaming, accessible campus facilities, Title IX/ADA compliance consulting, and philanthropic foundation grants.',
    rightsClearance: {
      institutionalMarks: 'Editorial Fair-Use',
      nilConsents: 'Direct Opt-In',
      publisherIp: 'Compliant',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'High (Core Capital)',
    nextMilestone: 'Secure initial 3 campus ADA-accessible esports lab pilot partnerships.',
    riskRating: 'Low'
  },
  {
    id: 'collegiate-championships',
    name: 'Collegiate Championships Hub',
    domain: 'collegiatechampionships.com',
    family: 'National Postseason Tournaments',
    tier: 'Flagship Proof',
    archetype: 'National Championship Sanctioning Body',
    commercialRationale: 'Unifying postseason championship destination aggregating cross-conference title bouts, national trophies, and tier-1 broadcast sponsorship.',
    rightsClearance: {
      institutionalMarks: 'Licensing Required',
      nilConsents: 'Direct Opt-In',
      publisherIp: 'Direct Sanction Needed',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'High (Core Capital)',
    nextMilestone: 'Execute broadcast syndication LOI with digital streaming partners for Spring Finals.',
    riskRating: 'Medium'
  },
  {
    id: 'college-athletic-director',
    name: 'College Athletic Director Executive Network',
    domain: 'collegeathleticdirector.com',
    family: 'Executive Leadership & Administration',
    tier: 'Operator License',
    archetype: 'Executive Network & B2B Advisory SaaS',
    commercialRationale: 'High-value executive peer community, athletic director search intelligence, governance benchmarking, and vendor matchmaking portal.',
    rightsClearance: {
      institutionalMarks: 'Editorial Fair-Use',
      nilConsents: 'Not Required',
      publisherIp: 'Compliant',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Moderate (Partner-Led)',
    nextMilestone: 'Structure joint venture or executive franchise license with veteran collegiate athletics search firm.',
    riskRating: 'Low'
  },
  {
    id: 'college-tournament',
    name: 'College Tournament Bracket & Engine',
    domain: 'collegetournament.com',
    family: 'SaaS & Tournament Ops',
    tier: 'Operator License',
    archetype: 'White-Label Software Licensing & B2B SaaS',
    commercialRationale: 'Automated campus tournament orchestration engine, custom bracketing, API match-reporting, and campus intramural director dashboard.',
    rightsClearance: {
      institutionalMarks: 'Editorial Fair-Use',
      nilConsents: 'Not Required',
      publisherIp: 'Compliant',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Moderate (Partner-Led)',
    nextMilestone: 'Package self-serve SaaS trial tier for intramural sports coordinators.',
    riskRating: 'Low'
  },
  {
    id: 'college-apparel',
    name: 'College Apparel Co.',
    domain: 'collegeapparel.com',
    family: 'Merchandise & Campus Lifestyle',
    tier: 'Operator License',
    archetype: 'Curated Licensing & Campus Lifestyle Commerce',
    commercialRationale: 'Licensed campus streetwear, co-branded esports varsity apparel, and athlete capsule drops without carrying dead inventory.',
    rightsClearance: {
      institutionalMarks: 'Licensing Required',
      nilConsents: 'Direct Opt-In',
      publisherIp: 'Title Neutral',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Moderate (Partner-Led)',
    nextMilestone: 'Formalize print-on-demand fulfillment partner with existing CLC collegiate licensing credentials.',
    riskRating: 'High (Trademark Sensitive)'
  },
  {
    id: 'nil-creator-clearinghouse',
    name: 'College NIL Clearinghouse',
    domain: 'collegenil.com',
    family: 'NIL & Creator Capital',
    tier: 'Operator License',
    archetype: 'NIL Verification, Escrow & Compliance Exchange',
    commercialRationale: 'Marketplace matching campus athletes with vetted regional brands under automated state-by-state compliance disclosure rules.',
    rightsClearance: {
      institutionalMarks: 'Editorial Fair-Use',
      nilConsents: 'Direct Opt-In',
      publisherIp: 'Compliant',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Moderate (Partner-Led)',
    nextMilestone: 'Integrate automated state compliance filing generator for athletic departments.',
    riskRating: 'Medium'
  },
  {
    id: 'college-drone-racing',
    name: 'College Drone Racing League (CDRL)',
    domain: 'collegedrone.com',
    family: 'Emerging STEM Athletics',
    tier: 'Conditional Hold',
    archetype: 'STEM Aeronautical Athletic League',
    commercialRationale: 'FPV drone obstacle racing circuit tapping university engineering, robotics, and aerospace departments.',
    rightsClearance: {
      institutionalMarks: 'Licensing Required',
      nilConsents: 'Direct Opt-In',
      publisherIp: 'Compliant',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Minimal (Holding Maintenance)',
    nextMilestone: 'Hold domain maintenance until 10 university engineering clubs form a regional collective.',
    riskRating: 'Low'
  },
  {
    id: 'college-robotics-league',
    name: 'College Robotics Circuit',
    domain: 'collegerobotics.com',
    family: 'Emerging STEM Athletics',
    tier: 'Conditional Hold',
    archetype: 'Intercollegiate Robotics Combat & Autonomous Circuit',
    commercialRationale: 'Autonomous navigation and combat robotics tournaments sponsored by national aerospace and defense technology contractors.',
    rightsClearance: {
      institutionalMarks: 'Editorial Fair-Use',
      nilConsents: 'Not Required',
      publisherIp: 'Compliant',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Minimal (Holding Maintenance)',
    nextMilestone: 'Gated until corporate defense contractor sponsorship commitments reach $100k threshold.',
    riskRating: 'Low'
  },
  {
    id: 'college-sim-racing',
    name: 'College Sim Racing Championship',
    domain: 'collegesimracing.com',
    family: 'Motorsport & Virtual Simulation',
    tier: 'Conditional Hold',
    archetype: 'Virtual Motorsport Varsity Circuit',
    commercialRationale: 'High-end sim racing leagues (iRacing / Assetto Corsa) targeting automotive engineering and varsity motorsport enthusiasts.',
    rightsClearance: {
      institutionalMarks: 'Licensing Required',
      nilConsents: 'Direct Opt-In',
      publisherIp: 'Direct Sanction Needed',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Minimal (Holding Maintenance)',
    nextMilestone: 'Validate hardware rig sponsorships with sim hardware manufacturers.',
    riskRating: 'Medium'
  },
  {
    id: 'collegiate-nil-network',
    name: 'Regional NIL Creator Network',
    domain: 'collegiatenilnetwork.com',
    family: 'Regional Creator Syndicates',
    tier: 'Conditional Hold',
    archetype: 'Conference-by-Conference Talent Agency',
    commercialRationale: 'Regional media talent syndication across SEC, Big Ten, ACC, and Big 12 creator athletes.',
    rightsClearance: {
      institutionalMarks: 'Editorial Fair-Use',
      nilConsents: 'Direct Opt-In',
      publisherIp: 'Compliant',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Minimal (Holding Maintenance)',
    nextMilestone: 'Activate once College NIL Clearinghouse reaches 500 active campus roster profiles.',
    riskRating: 'Medium'
  },
  {
    id: 'college-recruiting-portal',
    name: 'Collegiate Esports Scouting & Recruiting',
    domain: 'collegerecruiting.com',
    family: 'Talent Acquisition & High School Feeder',
    tier: 'Under Review',
    archetype: 'Verified Player Scouting & Scholarship Pipeline',
    commercialRationale: 'Scouting combine connecting high school esports champions with collegiate scholarship opportunities.',
    rightsClearance: {
      institutionalMarks: 'Editorial Fair-Use',
      nilConsents: 'Direct Opt-In',
      publisherIp: 'Direct Sanction Needed',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Minimal (Holding Maintenance)',
    nextMilestone: 'Conduct FERPA & minor student-athlete privacy audit prior to any software deployment.',
    riskRating: 'High (Trademark Sensitive)'
  },
  {
    id: 'varsity-merch-collective',
    name: 'Varsity Brand Registry',
    domain: 'varsitybrands.org',
    family: 'Trademark Boundary Assets',
    tier: 'Under Review',
    archetype: 'Trademark Gating & Name Clearance',
    commercialRationale: 'Protective defensive holding to ensure zero confusion with institutional trademark owners or existing commercial rights agencies.',
    rightsClearance: {
      institutionalMarks: 'Licensing Required',
      nilConsents: 'Not Required',
      publisherIp: 'Compliant',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Minimal (Holding Maintenance)',
    nextMilestone: 'Complete legal trademark counsel clearance review; maintain non-infringing defensive posture.',
    riskRating: 'High (Trademark Sensitive)'
  },
  {
    id: 'collegiate-press-syndicate',
    name: 'Collegiate Press Syndicate',
    domain: 'collegiatepress.com',
    family: 'Journalism & Student Media',
    tier: 'Under Review',
    archetype: 'Independent Student Journalism Syndicate',
    commercialRationale: 'Student-run campus sports reporting network operating under pure First Amendment journalistic fair-use principles.',
    rightsClearance: {
      institutionalMarks: 'Editorial Fair-Use',
      nilConsents: 'Not Required',
      publisherIp: 'Compliant',
      aiLikeness: 'Strict Ban'
    },
    resourceAllocation: 'Minimal (Holding Maintenance)',
    nextMilestone: 'Establish strict editorial firewall separating journalism from sponsor commercial agreements.',
    riskRating: 'Low'
  }
];

export const StrategicCommercializationPlan: React.FC = () => {
  // Sub-tabs within the Strategic Plan
  const [activeStrategyView, setActiveStrategyView] = useState<
    'engine' | 'ledger' | 'firstOffer' | 'rightsFirewall' | 'roadmap' | 'briefing'
  >('engine');

  // Asset Ledger State
  const [selectedTier, setSelectedTier] = useState<DispositionTier>('All');
  const [searchLedger, setSearchLedger] = useState('');
  const [selectedAssetModal, setSelectedAssetModal] = useState<AssetDispositionItem | null>(null);

  // First Commercial Offer Scoper Interactive State
  const [campusCount, setCampusCount] = useState<number>(3);
  const [publisherTier, setPublisherTier] = useState<'standard' | 'tier1'>('tier1');
  const [studentCohortSize, setStudentCohortSize] = useState<number>(15);
  const [sponsorTier, setSponsorTier] = useState<'title' | 'categoryExclusive' | 'presenting'>('categoryExclusive');
  const [copiedMemo, setCopiedMemo] = useState(false);

  // Scoper Unit Economics Calculations
  const scoperEconomics = useMemo(() => {
    // Base gross revenue per campus sprint
    let basePricePerCampus = 18500;
    if (publisherTier === 'tier1') basePricePerCampus += 4500;
    if (sponsorTier === 'categoryExclusive') basePricePerCampus += 6000;
    if (sponsorTier === 'title') basePricePerCampus += 12000;

    const grossRevenue = basePricePerCampus * campusCount;

    // Delivery Costs
    const onCampusOps = campusCount * 3800; // Staffing, on-site broadcast tech
    const studentStipendPool = campusCount * (studentCohortSize * 350); // $350 honorarium per student production member
    const publisherSanctionFees = campusCount * (publisherTier === 'tier1' ? 1800 : 600);
    const sharedPlatformOverhead = 2500 + (campusCount * 900); // NBG shared infra & legal clearance

    const totalDeliveryCost = onCampusOps + studentStipendPool + publisherSanctionFees + sharedPlatformOverhead;
    const netContribution = grossRevenue - totalDeliveryCost;
    const contributionMarginPct = Math.round((netContribution / grossRevenue) * 100);

    return {
      grossRevenue,
      onCampusOps,
      studentStipendPool,
      publisherSanctionFees,
      sharedPlatformOverhead,
      totalDeliveryCost,
      netContribution,
      contributionMarginPct
    };
  }, [campusCount, publisherTier, studentCohortSize, sponsorTier]);

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return ASSET_DISPOSITION_DATA.filter((asset) => {
      const matchesTier = selectedTier === 'All' || asset.tier === selectedTier;
      const q = searchLedger.toLowerCase().trim();
      const matchesQuery =
        !q ||
        asset.name.toLowerCase().includes(q) ||
        asset.domain.toLowerCase().includes(q) ||
        asset.family.toLowerCase().includes(q) ||
        asset.archetype.toLowerCase().includes(q);
      return matchesTier && matchesQuery;
    });
  }, [selectedTier, searchLedger]);

  const copyBriefingToClipboard = () => {
    const text = `COLLEGE COMPANY - STRATEGY & OPERATING ARCHITECTURE v1.0
Executive Summary:
- Fundamental pivot from speculative domain accumulation to a disciplined 4-Function Operating & Commercialization Engine.
- 4 Operating Functions: Infrastructure & Shared Services, Asset Incubation & Proof Engine, Rights & Commercial Gateway, Corporate Governance & Capital Allocation.
- 15 Asset Families classified into 4 Disposition Tiers: Flagship Proof, Operator License, Conditional Hold, Under Review.
- First Commercial Offer: 6-Week Campus Program Validation Sprint ($18,500 - $35,000 per campus with 45-55% contribution margin).
- 4-Tier Rights Clearance: Institutional Marks, Student NIL Escrow, Publisher IP Sanctioning, AI/Synthetic Likeness Prohibition.
- Independent Educational Firewall: Strict legal and operational segregation between student academic evaluations and commercial deliverables.
- 30/60/90-Day Execution Roadmap with explicit stop-rules for capital discipline.`;

    navigator.clipboard.writeText(text);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2500);
  };

  return (
    <div className="space-y-12 py-10">
      {/* ========================================================================= */}
      {/* STRATEGIC PLAN HERO BANNER */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-b from-[#121620] via-[#0E1118] to-[#0A0C10] p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C89B3C]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C98B] text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles size={12} /> Strategic Operating Architecture v1.0
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-400 text-xs font-mono">
              Adopted: October 2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <BadgeCheck size={12} /> Board Approved Transition
            </span>
          </div>

          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              The Commercial Operating Engine & Rights Gateway
            </h1>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
              College Company’s definitive blueprint transitioning from a portfolio of speculative collegiate domains into a 
              <span className="text-[#E8C98B] font-medium"> disciplined, 4-function commercialization platform</span>. 
              Anchored by verified institutional trust, publisher clearance, compliant student NIL honoraria, and capital-efficient operator licensing.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08]">
            <div className="p-3 bg-white/[0.02] rounded border border-white/[0.05]">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Operating Functions</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-0.5">4 Engines</div>
              <div className="text-[11px] text-neutral-500">Shared Services · Incubation · Rights · Governance</div>
            </div>
            <div className="p-3 bg-white/[0.02] rounded border border-white/[0.05]">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Asset Families</div>
              <div className="text-xl sm:text-2xl font-bold text-[#E8C98B] font-mono mt-0.5">15 Holdings</div>
              <div className="text-[11px] text-neutral-500">Mapped across 4 disposition tiers</div>
            </div>
            <div className="p-3 bg-white/[0.02] rounded border border-white/[0.05]">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Validation Sprint</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-0.5">6-Week Pilot</div>
              <div className="text-[11px] text-neutral-500">$18.5k–$35k unit model with 50%+ margin</div>
            </div>
            <div className="p-3 bg-white/[0.02] rounded border border-white/[0.05]">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Rights Firewall</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-0.5">4 Tier Strict</div>
              <div className="text-[11px] text-neutral-500">Marks · NIL · Publisher · Zero Synthetic AI</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STRATEGIC NAVIGATION TABS */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#0F1218] border border-white/[0.08] rounded-lg">
        <button
          onClick={() => setActiveStrategyView('engine')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            activeStrategyView === 'engine'
              ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Workflow size={14} />
          <span>4-Function Operating Engine</span>
        </button>

        <button
          onClick={() => setActiveStrategyView('ledger')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            activeStrategyView === 'ledger'
              ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers size={14} />
          <span>Asset Ledger & Disposition (15)</span>
        </button>

        <button
          onClick={() => setActiveStrategyView('firstOffer')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            activeStrategyView === 'firstOffer'
              ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <DollarSign size={14} />
          <span>First Offer Scoper & Economics</span>
        </button>

        <button
          onClick={() => setActiveStrategyView('rightsFirewall')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            activeStrategyView === 'rightsFirewall'
              ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <ShieldCheck size={14} />
          <span>Rights & Educational Firewall</span>
        </button>

        <button
          onClick={() => setActiveStrategyView('roadmap')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            activeStrategyView === 'roadmap'
              ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Compass size={14} />
          <span>30/60/90-Day Execution Gates</span>
        </button>

        <button
          onClick={() => setActiveStrategyView('briefing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            activeStrategyView === 'briefing'
              ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText size={14} />
          <span>Executive Memo & Briefing</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: THE 4-FUNCTION OPERATING ENGINE */}
      {/* ========================================================================= */}
      {activeStrategyView === 'engine' && (
        <motion.div
          key="engine-view"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
              Institutional Framework · Operational Discipline
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              The Four-Function Operating Architecture
            </h2>
            <p className="text-neutral-400 text-sm max-w-3xl leading-relaxed">
              To escape the valuation trap of a passive domain portfolio, College Company operates as a lean, four-function engine. 
              Each function has explicit capital allocations, strict fiduciary firewalls, and non-overlapping mandates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Function 1 */}
            <div className="p-7 rounded-lg bg-[#11141A] border border-white/[0.08] hover:border-[#C89B3C]/30 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-[#C89B3C]/10 text-[#C89B3C] rounded border border-[#C89B3C]/20">
                  <Building2 size={22} />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 uppercase">
                  Function 1 · Core Holding
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Shared Corporate & Digital Infrastructure</h3>
                <p className="text-xs font-mono text-[#E8C98B] mt-0.5">Central Services, IP Defense & Shared Tech Stack</p>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Provides group-wide legal holding structures, trademark registry protection, financial reporting, 
                and unified campus API integrations across all subsidiaries. Ensures that no single vertical duplicates backend overhead.
              </p>
              <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>Mandate:</span>
                  <span className="text-white">IP Defense, Compliance, Treasury</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Profile:</span>
                  <span className="text-emerald-400">Fixed Corporate Overhead (Shared)</span>
                </div>
                <div className="flex justify-between">
                  <span>Key Deliverable:</span>
                  <span className="text-white">Master Campus Partnership Registry</span>
                </div>
              </div>
            </div>

            {/* Function 2 */}
            <div className="p-7 rounded-lg bg-[#11141A] border border-white/[0.08] hover:border-[#C89B3C]/30 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                  <Sparkles size={22} />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 uppercase">
                  Function 2 · Incubation
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Asset Incubation & Proof Engine</h3>
                <p className="text-xs font-mono text-blue-300 mt-0.5">Rapid Prototyping, MVP Testing & Campus Pilots</p>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Designs and tests minimum viable campus programs before committing long-term capital. 
                Deploys pilot tournaments, surveys university athletic directors, and validates demand before building complex software systems.
              </p>
              <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>Mandate:</span>
                  <span className="text-white">6-Week Campus Program Sprints</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Profile:</span>
                  <span className="text-blue-300">Variable / Self-Funded Pilot Sprints</span>
                </div>
                <div className="flex justify-between">
                  <span>Stop-Rule Gate:</span>
                  <span className="text-amber-400">Kill or hold concepts failing pilot LOIs</span>
                </div>
              </div>
            </div>

            {/* Function 3 */}
            <div className="p-7 rounded-lg bg-[#11141A] border border-white/[0.08] hover:border-[#C89B3C]/30 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                  <ShieldCheck size={22} />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 uppercase">
                  Function 3 · Rights Gateway
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Rights, Compliance & Commercial Gateway</h3>
                <p className="text-xs font-mono text-emerald-300 mt-0.5">Publisher Licensing, NIL Escrow & Brand Sponsorship</p>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                The institutional clearinghouse managing legal relationships with game publishers (Riot, Valve, EA), 
                university licensing consortiums (CLC/Learfield), and brand partners. Enforces the strict educational firewall.
              </p>
              <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>Mandate:</span>
                  <span className="text-white">Multi-party clearance & sponsor deals</span>
                </div>
                <div className="flex justify-between">
                  <span>Protection:</span>
                  <span className="text-emerald-400">Independent Educational Firewall</span>
                </div>
                <div className="flex justify-between">
                  <span>NIL Integrity:</span>
                  <span className="text-white">State-by-state compliant escrow</span>
                </div>
              </div>
            </div>

            {/* Function 4 */}
            <div className="p-7 rounded-lg bg-[#11141A] border border-white/[0.08] hover:border-[#C89B3C]/30 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded border border-purple-500/20">
                  <Scale size={22} />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10 uppercase">
                  Function 4 · Capital Allocation
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Corporate Governance & Capital Allocation</h3>
                <p className="text-xs font-mono text-purple-300 mt-0.5">Operator Licenses, Joint Ventures & Holding Management</p>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Licenses high-yield domains and operational rights to specialized third-party operators under strict quality control. 
                Manages equity joint ventures, spinouts, and capital reallocation from mature cashflows to new proofs.
              </p>
              <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>Mandate:</span>
                  <span className="text-white">Franchise agreements & capital deployment</span>
                </div>
                <div className="flex justify-between">
                  <span>Margin Profile:</span>
                  <span className="text-purple-300">High-margin licensing royalties</span>
                </div>
                <div className="flex justify-between">
                  <span>Fiduciary Standard:</span>
                  <span className="text-white">Independent advisory review</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: ASSET LEDGER & 4 DISPOSITION TIERS (15 HOLDINGS) */}
      {/* ========================================================================= */}
      {activeStrategyView === 'ledger' && (
        <motion.div
          key="ledger-view"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
                Holding Group Ledger · 15 Asset Families
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Asset Disposition & Commercial Gating Matrix
              </h2>
              <p className="text-neutral-400 text-sm max-w-2xl leading-relaxed">
                Rather than treating all domains equally, each asset is assigned to one of four disciplined tiers 
                with explicit commercial mandates, rights clearance criteria, and resource limits.
              </p>
            </div>

            {/* Disposition Tier Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#12151B] border border-white/10 rounded-sm">
              {(['All', 'Flagship Proof', 'Operator License', 'Conditional Hold', 'Under Review'] as DispositionTier[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                    selectedTier === tier
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Search input */}
          <div className="flex items-center gap-3 p-3 bg-[#11141A] rounded-lg border border-white/[0.08]">
            <input
              type="text"
              placeholder="Filter ledger by asset name, domain, archetype, or operational family..."
              value={searchLedger}
              onChange={(e) => setSearchLedger(e.target.value)}
              className="bg-transparent border-none text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
            />
            <span className="text-[11px] font-mono text-neutral-500 whitespace-nowrap">
              Showing {filteredAssets.length} of {ASSET_DISPOSITION_DATA.length} Assets
            </span>
          </div>

          {/* Asset Ledger Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAssets.map((asset) => {
              const tierBadgeClass =
                asset.tier === 'Flagship Proof'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : asset.tier === 'Operator License'
                  ? 'bg-[#C89B3C]/15 text-[#E8C98B] border-[#C89B3C]/30'
                  : asset.tier === 'Conditional Hold'
                  ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30';

              return (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAssetModal(asset)}
                  className="p-6 rounded-lg bg-[#11141A] border border-white/[0.08] hover:border-[#C89B3C]/40 transition-all flex flex-col justify-between cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${tierBadgeClass}`}>
                        {asset.tier}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 truncate max-w-[140px]">
                        {asset.family}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#E8C98B] transition-colors flex items-center justify-between">
                        <span>{asset.name}</span>
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E8C98B]" />
                      </h3>
                      <div className="text-xs font-mono text-neutral-400 mt-0.5">{asset.domain}</div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed font-light line-clamp-3">
                      {asset.commercialRationale}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Archetype:</span>
                      <span className="text-white truncate max-w-[160px]">{asset.archetype}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Next Gate:</span>
                      <span className="text-neutral-300 truncate max-w-[160px]">{asset.nextMilestone}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Modal for Asset Inspection */}
          <AnimatePresence>
            {selectedAssetModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#121620] border border-white/15 rounded-xl max-w-2xl w-full p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-wider mb-1">
                        Asset Disposition Dossier · {selectedAssetModal.tier}
                      </div>
                      <h2 className="text-2xl font-display font-bold text-white">{selectedAssetModal.name}</h2>
                      <div className="text-sm font-mono text-neutral-400">{selectedAssetModal.domain}</div>
                    </div>
                    <button
                      onClick={() => setSelectedAssetModal(null)}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-4 rounded bg-white/[0.03] border border-white/[0.06] space-y-2">
                    <div className="text-xs font-mono text-neutral-400 uppercase">Commercial Archetype & Mandate</div>
                    <div className="text-sm text-white font-medium">{selectedAssetModal.archetype}</div>
                    <p className="text-xs text-neutral-300 leading-relaxed">{selectedAssetModal.commercialRationale}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-mono text-[#E8C98B] uppercase tracking-wider">
                      Rights Clearance & Compliance Profile
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 bg-[#0A0C10] rounded border border-white/[0.05]">
                        <span className="text-neutral-500 block text-[10px]">Institutional Marks:</span>
                        <span className="text-white font-semibold">{selectedAssetModal.rightsClearance.institutionalMarks}</span>
                      </div>
                      <div className="p-3 bg-[#0A0C10] rounded border border-white/[0.05]">
                        <span className="text-neutral-500 block text-[10px]">Student NIL Consents:</span>
                        <span className="text-white font-semibold">{selectedAssetModal.rightsClearance.nilConsents}</span>
                      </div>
                      <div className="p-3 bg-[#0A0C10] rounded border border-white/[0.05]">
                        <span className="text-neutral-500 block text-[10px]">Publisher Game IP:</span>
                        <span className="text-white font-semibold">{selectedAssetModal.rightsClearance.publisherIp}</span>
                      </div>
                      <div className="p-3 bg-[#0A0C10] rounded border border-white/[0.05]">
                        <span className="text-neutral-500 block text-[10px]">AI Likeness Policy:</span>
                        <span className="text-emerald-400 font-semibold">{selectedAssetModal.rightsClearance.aiLikeness}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0A0C10] rounded border border-white/[0.05] space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-400">Resource Allocation:</span>
                      <span className="text-white font-bold">{selectedAssetModal.resourceAllocation}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-400">Legal Risk Rating:</span>
                      <span className="text-amber-400 font-bold">{selectedAssetModal.riskRating}</span>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06] text-xs">
                      <span className="text-neutral-400 block text-[10px] font-mono">Next Milestone Gate:</span>
                      <span className="text-neutral-200 mt-0.5 block">{selectedAssetModal.nextMilestone}</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setSelectedAssetModal(null)}
                      className="px-6 py-2.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors"
                    >
                      Close Dossier
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: FIRST COMMERCIAL OFFER SCOPER & UNIT ECONOMICS CALCULATOR */}
      {/* ========================================================================= */}
      {activeStrategyView === 'firstOffer' && (
        <motion.div
          key="first-offer-view"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
              Commercial Engine · B2B Campus Validation
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              First Commercial Offer: 6-Week Campus Program Validation Sprint
            </h2>
            <p className="text-neutral-400 text-sm max-w-3xl leading-relaxed">
              Instead of unpriced partnerships, College Company goes to market with a turnkey, fixed-price 6-week engagement 
              sold to university athletics, campus recreation, or student affairs. Test the unit economics below.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Parameters */}
            <div className="lg:col-span-5 bg-[#11141A] p-7 rounded-lg border border-white/[0.08] space-y-6">
              <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal size={14} /> Scope Parameters
              </div>

              {/* Slider 1: Campus Count */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-neutral-300">Partner Campuses in Cohort</span>
                  <span className="font-mono text-base font-bold text-white">{campusCount} Universities</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={campusCount}
                  onChange={(e) => setCampusCount(Number(e.target.value))}
                  className="w-full accent-[#C89B3C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>1 Campus (Pilot)</span>
                  <span>4 Campuses (Conference Pod)</span>
                  <span>8 Campuses (Regional Circuit)</span>
                </div>
              </div>

              {/* Publisher Tier Select */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-300">Publisher Sanctioning Level</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    onClick={() => setPublisherTier('standard')}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                      publisherTier === 'standard'
                        ? 'bg-[#C89B3C]/15 border-[#C89B3C] text-white font-bold'
                        : 'bg-[#0A0C10] border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div>Club Standard</div>
                    <div className="text-[10px] text-neutral-500">Community license (Rocket League / SSBM)</div>
                  </button>
                  <button
                    onClick={() => setPublisherTier('tier1')}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                      publisherTier === 'tier1'
                        ? 'bg-[#C89B3C]/15 border-[#C89B3C] text-white font-bold'
                        : 'bg-[#0A0C10] border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div>Tier-1 Sanctioned</div>
                    <div className="text-[10px] text-neutral-500">Direct Riot/Valve tournament permit (+$4.5k)</div>
                  </button>
                </div>
              </div>

              {/* Student Cohort Size */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-neutral-300">Student Production & Broadcast Crew</span>
                  <span className="font-mono text-base font-bold text-white">{studentCohortSize} Students / campus</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={5}
                  value={studentCohortSize}
                  onChange={(e) => setStudentCohortSize(Number(e.target.value))}
                  className="w-full accent-[#C89B3C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>5 (Core Broadcast)</span>
                  <span>15 (Broadcast + NIL Media)</span>
                  <span>30 (Full Event Cohort)</span>
                </div>
              </div>

              {/* Commercial Sponsor Level */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-300">Commercial Sponsor Integration</label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {(['presenting', 'categoryExclusive', 'title'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSponsorTier(tier)}
                      className={`p-2 rounded border text-center capitalize cursor-pointer transition-colors ${
                        sponsorTier === tier
                          ? 'bg-[#C89B3C] text-[#090A0C] font-bold border-[#C89B3C]'
                          : 'bg-[#0A0C10] border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs truncate">{tier === 'categoryExclusive' ? 'Category' : tier}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Financial Breakdown & Margin */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#11141A] p-7 rounded-lg border border-white/[0.08] space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <div className="text-xs font-mono text-neutral-400 uppercase">Gross Contract Value</div>
                    <div className="text-3xl font-display font-bold text-white font-mono mt-1">
                      ${scoperEconomics.grossRevenue.toLocaleString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono text-neutral-400 uppercase">Contribution Margin</div>
                    <div className="text-3xl font-display font-bold text-emerald-400 font-mono mt-1">
                      {scoperEconomics.contributionMarginPct}%
                    </div>
                  </div>
                </div>

                {/* Direct Cost Itemization */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-[#E8C98B] uppercase tracking-wider">
                    Transparent Cost Breakdown (Per Engagement)
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center p-2.5 rounded bg-[#0A0C10] border border-white/[0.05]">
                      <span className="text-neutral-300 flex items-center gap-2">
                        <Users size={14} className="text-[#C89B3C]" />
                        Student Production Honoraria Pool ({studentCohortSize * campusCount} Students @ $350)
                      </span>
                      <span className="text-white font-bold">${scoperEconomics.studentStipendPool.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center p-2.5 rounded bg-[#0A0C10] border border-white/[0.05]">
                      <span className="text-neutral-300 flex items-center gap-2">
                        <Building2 size={14} className="text-blue-400" />
                        On-Campus Broadcast Ops & Equipment Dispatch
                      </span>
                      <span className="text-white font-bold">${scoperEconomics.onCampusOps.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center p-2.5 rounded bg-[#0A0C10] border border-white/[0.05]">
                      <span className="text-neutral-300 flex items-center gap-2">
                        <ShieldCheck size={14} className="text-purple-400" />
                        Publisher Licensing, Compliance & Title Escrow
                      </span>
                      <span className="text-white font-bold">${scoperEconomics.publisherSanctionFees.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center p-2.5 rounded bg-[#0A0C10] border border-white/[0.05]">
                      <span className="text-neutral-300 flex items-center gap-2">
                        <Cpu size={14} className="text-emerald-400" />
                        College Company Central Platform Infrastructure
                      </span>
                      <span className="text-white font-bold">${scoperEconomics.sharedPlatformOverhead.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Net Contribution */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-neutral-400 uppercase">Net Commercial Contribution:</span>
                    <div className="text-2xl font-bold text-white font-mono mt-0.5">
                      ${scoperEconomics.netContribution.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right text-xs text-neutral-400 max-w-[220px]">
                    Reinvested into campus software development and legal clearance.
                  </div>
                </div>
              </div>

              {/* 6-Week Delivery Schedule */}
              <div className="bg-[#11141A] p-6 rounded-lg border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-wider">
                  6-Week Sprint Deliverable Timeline
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded bg-[#0A0C10] border border-white/[0.05] space-y-1">
                    <span className="font-mono text-[#C89B3C] font-bold">Weeks 1 – 2</span>
                    <div className="text-white font-semibold">Campus Intake & Compliance</div>
                    <p className="text-neutral-400 text-[11px]">Clear athletic marks, obtain publisher license, execute FERPA firewalls.</p>
                  </div>

                  <div className="p-3 rounded bg-[#0A0C10] border border-white/[0.05] space-y-1">
                    <span className="font-mono text-[#C89B3C] font-bold">Weeks 3 – 4</span>
                    <div className="text-white font-semibold">Student Cohort & Roster Launch</div>
                    <p className="text-neutral-400 text-[11px]">Deploy student production staff, disburse stipends, host qualifying rounds.</p>
                  </div>

                  <div className="p-3 rounded bg-[#0A0C10] border border-white/[0.05] space-y-1">
                    <span className="font-mono text-[#C89B3C] font-bold">Weeks 5 – 6</span>
                    <div className="text-white font-semibold">Broadcast & Data Dossier</div>
                    <p className="text-neutral-400 text-[11px]">Deliver multi-cam campus stream, viewer engagement analytics, and ROI audit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: RIGHTS & LEGAL FIREWALL ARCHITECTURE */}
      {/* ========================================================================= */}
      {activeStrategyView === 'rightsFirewall' && (
        <motion.div
          key="rights-view"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
              Legal Integrity · Four Rights Tiers
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Rights Clearance Architecture & Educational Firewall
            </h2>
            <p className="text-neutral-400 text-sm max-w-3xl leading-relaxed">
              Holding a premium collegiate domain does not grant rights to university trademarks, student likenesses, or publisher games. 
              College Company enforces four distinct legal clearance tiers to safeguard institutional trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Tier 1: Marks */}
            <div className="p-6 rounded-lg bg-[#11141A] border border-white/[0.08] space-y-3">
              <div className="p-2.5 bg-red-500/10 text-red-400 rounded w-max border border-red-500/20">
                <Lock size={18} />
              </div>
              <h3 className="text-base font-bold text-white font-display">1. Institutional Marks & Names</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Strict separation between editorial fair-use and commercial apparel. No unauthorized collegiate logos, seal marks, or protected trade dress.
              </p>
              <div className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/[0.06]">
                Protocol: Requires explicit licensing charter or CLC consortium contract.
              </div>
            </div>

            {/* Tier 2: NIL */}
            <div className="p-6 rounded-lg bg-[#11141A] border border-white/[0.08] space-y-3">
              <div className="p-2.5 bg-[#C89B3C]/10 text-[#C89B3C] rounded w-max border border-[#C89B3C]/20">
                <BadgeCheck size={18} />
              </div>
              <h3 className="text-base font-bold text-white font-display">2. Student-Athlete NIL</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                All student commercial participation is voluntary, opt-in, and governed by written agreement. Transparent escrow and state disclosure filings.
              </p>
              <div className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/[0.06]">
                Protocol: 100% FERPA protection; student academic standing never tied to NIL.
              </div>
            </div>

            {/* Tier 3: Publisher */}
            <div className="p-6 rounded-lg bg-[#11141A] border border-white/[0.08] space-y-3">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded w-max border border-blue-500/20">
                <Workflow size={18} />
              </div>
              <h3 className="text-base font-bold text-white font-display">3. Publisher & Title IP</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Full compliance with community competition guidelines and commercial license thresholds set by Riot Games, Valve, Epic Games, and EA.
              </p>
              <div className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/[0.06]">
                Protocol: Prize pools and sponsor broadcasts capped to publisher limits.
              </div>
            </div>

            {/* Tier 4: AI Likeness */}
            <div className="p-6 rounded-lg bg-[#11141A] border border-white/[0.08] space-y-3">
              <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded w-max border border-purple-500/20">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-base font-bold text-white font-display">4. AI & Likeness Guardrail</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Zero synthetic generation of student likeness, voice cloning, or avatar training. Strict opt-in prohibition protects collegiate privacy.
              </p>
              <div className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/[0.06]">
                Protocol: AI used exclusively for tournament analytics and schedule matching.
              </div>
            </div>
          </div>

          {/* The Educational Firewall Callout */}
          <div className="p-8 rounded-xl bg-gradient-to-r from-[#141926] via-[#10141E] to-[#0D1017] border border-[#C89B3C]/30 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-wider">
              <Scale size={16} /> Non-Negotiable Fiduciary Standard
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              The Independent Educational Firewall
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed max-w-4xl font-light">
              Under College Company governance bylaws, a strict, legally enforceable firewall segregates all 
              commercial sponsor entitlements from university academic and educational evaluations. 
              Sponsors cannot purchase student grades, academic judgment, or private educational records. 
              Student involvement in commercial activations is completely independent of their collegiate varsity roster eligibility.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 pt-2 text-xs font-mono text-neutral-400">
              <div className="p-3 bg-black/30 rounded border border-white/5">
                <span className="text-emerald-400 font-bold block mb-1">✓ Privacy Guaranteed</span>
                Zero disclosure of student GPA, coursework, or confidential campus records.
              </div>
              <div className="p-3 bg-black/30 rounded border border-white/5">
                <span className="text-emerald-400 font-bold block mb-1">✓ Voluntary Consent</span>
                Students retain the absolute right to opt out of any commercial branding.
              </div>
              <div className="p-3 bg-black/30 rounded border border-white/5">
                <span className="text-emerald-400 font-bold block mb-1">✓ Advisory Oversight</span>
                Monitored by former collegiate athletic directors and university ombudspersons.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 5: 30 / 60 / 90-DAY ROADMAP & STOP-RULES */}
      {/* ========================================================================= */}
      {activeStrategyView === 'roadmap' && (
        <motion.div
          key="roadmap-view"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
              Execution Discipline · Milestone Gates
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              30 / 60 / 90-Day Execution Plan & Explicit Stop-Rules
            </h2>
            <p className="text-neutral-400 text-sm max-w-3xl leading-relaxed">
              Every phase has predetermined validation gates. If milestone metrics are not met, College Company invokes 
              explicit stop-rules rather than burning capital on speculative software development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 30 Days */}
            <div className="p-7 rounded-lg bg-[#11141A] border border-white/[0.08] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/20 font-bold">
                  Days 1 – 30
                </span>
                <span className="text-xs font-mono text-neutral-500">Foundation</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">Charter, Audit & Scoper Packaging</h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#C89B3C] shrink-0 mt-0.5" />
                  <span>Execute trademark and legal audit across top 25 portfolio holdings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#C89B3C] shrink-0 mt-0.5" />
                  <span>Package the 6-Week Campus Program Validation Sprint sales collateral.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#C89B3C] shrink-0 mt-0.5" />
                  <span>Initiate introductory outreach to 12 target collegiate athletic directors.</span>
                </li>
              </ul>
              <div className="p-3 rounded bg-[#0A0C10] border border-amber-500/20 text-xs font-mono text-amber-300">
                <span className="font-bold block text-[10px] uppercase text-amber-400">Stop-Rule Gate 1:</span>
                If legal audit reveals trademark friction on any domain, freeze domain commercialization immediately.
              </div>
            </div>

            {/* 60 Days */}
            <div className="p-7 rounded-lg bg-[#11141A] border border-white/[0.08] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                  Days 31 – 60
                </span>
                <span className="text-xs font-mono text-neutral-500">Validation</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">Pilot Delivery & Unit Economics</h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>Sign initial 2–3 university pilot contracts for the 6-Week Sprint.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>Clear publisher community tournament licenses for Rocket League & Valorant.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>Validate 45%+ net contribution margin across live pilot delivery.</span>
                </li>
              </ul>
              <div className="p-3 rounded bg-[#0A0C10] border border-red-500/20 text-xs font-mono text-red-300">
                <span className="font-bold block text-[10px] uppercase text-red-400">Stop-Rule Gate 2:</span>
                If fewer than 2 campus LOIs close by Day 60, freeze bespoke software dev; maintain lean incubator mode.
              </div>
            </div>

            {/* 90 Days */}
            <div className="p-7 rounded-lg bg-[#11141A] border border-white/[0.08] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Days 61 – 90
                </span>
                <span className="text-xs font-mono text-neutral-500">Scale & Syndicate</span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">Operator Licensing & Capital Syndication</h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Package Operator License terms for College Athletic Director and College Apparel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Issue audited Q4 strategic report to advisory council and capital partners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Open Series A institutional data room based on verified contract cash flows.</span>
                </li>
              </ul>
              <div className="p-3 rounded bg-[#0A0C10] border border-emerald-500/20 text-xs font-mono text-emerald-300">
                <span className="font-bold block text-[10px] uppercase text-emerald-400">Expansion Trigger:</span>
                Only greenlight secondary domain builds once initial 3 pilots produce verified client case studies.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 6: EXECUTIVE STRATEGY MEMORANDUM & BRIEFING */}
      {/* ========================================================================= */}
      {activeStrategyView === 'briefing' && (
        <motion.div
          key="briefing-view"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
                Executive Document · Strategy v1.0
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Executive Strategic Memorandum: College Company
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyBriefingToClipboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono border border-white/10 transition-colors"
              >
                {copiedMemo ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedMemo ? 'Copied' : 'Copy Summary'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono border border-white/10 transition-colors"
              >
                <Printer size={13} />
                <span>Print Memo</span>
              </button>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-[#11141A] border border-white/[0.08] space-y-6 text-sm text-neutral-300 leading-relaxed font-light">
            <div className="border-b border-white/[0.08] pb-4 flex flex-wrap justify-between gap-4 text-xs font-mono text-neutral-400">
              <div><strong className="text-white">TO:</strong> College Company Board, Investors & Campus Directorate</div>
              <div><strong className="text-white">FROM:</strong> Office of the Chief Strategy Officer</div>
              <div><strong className="text-white">DATE:</strong> October 2026</div>
              <div><strong className="text-white">STATUS:</strong> Strategic Architecture v1.0</div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-white font-display">1. The Strategic Imperative</h3>
              <p>
                College Company controls an irreplaceable portfolio of premium collegiate digital assets. However, in intercollegiate athletics, 
                holding names without institutional trust, publisher clearance, or compliance frameworks invites legal challenge and limits enterprise valuation. 
                Strategy v1.0 moves College Company from passive asset speculation to an active commercial engine with four distinct functions.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-white font-display">2. Four-Function Operating Model</h3>
              <p>
                We do not build 200 distinct companies simultaneously. We operate one centralized infrastructure holding company that provisions shared legal, 
                treasury, and compliance capabilities. Vertical holdings are grouped into:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-300">
                <li><strong className="text-white">Flagship Proofs (Direct Operations):</strong> collegecompany.com, collegeesportsx.com, collegedisability.com, collegiatechampionships.com.</li>
                <li><strong className="text-white">Operator Licenses (Franchise / JV):</strong> collegeathleticdirector.com, collegetournament.com, collegeapparel.com.</li>
                <li><strong className="text-white">Conditional Holds:</strong> Stem athletics and specialized niche portals maintained at minimal carrying costs until campus density justifies activation.</li>
                <li><strong className="text-white">Under Review:</strong> Defensive assets requiring trademark audits or strict editorial firewalls.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-white font-display">3. Commercial Validation Engine</h3>
              <p>
                Our core B2B commercial entry product is the <strong className="text-white">6-Week Campus Program Validation Sprint</strong> ($18,500 – $35,000). 
                This package delivers turnkey varsity tournament sanctioning, publisher title clearance, verified student production stipends, and an executive ROI analytics dossier. 
                Unit economics generate a healthy 45%–55% contribution margin, proving real market willingness-to-pay before custom software is engineered.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-white font-display">4. Fiduciary & Educational Safeguards</h3>
              <p>
                To maintain the trust of university chancellors and athletic directors, College Company codifies an unbreakable educational firewall. 
                Commercial sponsorships are strictly partitioned from academic evaluations. All student NIL engagements are voluntary and FERPA-compliant. 
                We maintain an absolute prohibition on synthetic likeness generation and voice cloning.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
              <div>Authorized by: College Company Governance Council</div>
              <div className="text-[#C89B3C]">Verification ID: CC-STRAT-V1-OCT26</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
