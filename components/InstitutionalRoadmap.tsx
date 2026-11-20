import React, { useState, useMemo } from 'react';
import {
  Compass,
  Building2,
  ShieldCheck,
  Tv,
  Briefcase,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Copy,
  Check,
  Target,
  Layers
} from 'lucide-react';

export type RoadmapYear = 'all' | 'Y1' | 'Y2' | 'Y3';
export type RoadmapTrack =
  | 'all'
  | 'leagues'
  | 'nil'
  | 'media'
  | 'governance';
export type MilestoneStatus = 'active' | 'scheduled' | 'gate';

export interface RoadmapMilestone {
  id: string;
  code: string;
  title: string;
  year: 'Y1' | 'Y2' | 'Y3';
  quarterLabel: string;
  startQ: number; // 0 to 11 across 12 quarters (Q4 2026 - Q3 2029)
  endQ: number;   // inclusive 0 to 11
  track: Exclude<RoadmapTrack, 'all'>;
  status: MilestoneStatus;
  owner: string;
  summary: string;
  deliverables: string[];
  exitGateMetric: string;
  assetsActivated: string[];
  campusTarget: number;
  capitalTranche: string;
}

const QUARTERS = [
  { index: 0, label: 'Q4 2026', year: 'Y1' as const, short: 'Y1 · Q1' },
  { index: 1, label: 'Q1 2027', year: 'Y1' as const, short: 'Y1 · Q2' },
  { index: 2, label: 'Q2 2027', year: 'Y1' as const, short: 'Y1 · Q3' },
  { index: 3, label: 'Q3 2027', year: 'Y1' as const, short: 'Y1 · Q4' },
  { index: 4, label: 'Q4 2027', year: 'Y2' as const, short: 'Y2 · Q1' },
  { index: 5, label: 'Q1 2028', year: 'Y2' as const, short: 'Y2 · Q2' },
  { index: 6, label: 'Q2 2028', year: 'Y2' as const, short: 'Y2 · Q3' },
  { index: 7, label: 'Q3 2028', year: 'Y2' as const, short: 'Y2 · Q4' },
  { index: 8, label: 'Q4 2028', year: 'Y3' as const, short: 'Y3 · Q1' },
  { index: 9, label: 'Q1 2029', year: 'Y3' as const, short: 'Y3 · Q2' },
  { index: 10, label: 'Q2 2029', year: 'Y3' as const, short: 'Y3 · Q3' },
  { index: 11, label: 'Q3 2029', year: 'Y3' as const, short: 'Y3 · Q4' }
];

const TRACK_META: Record<
  Exclude<RoadmapTrack, 'all'>,
  { label: string; color: string; barBg: string; border: string; icon: React.ReactNode }
> = {
  leagues: {
    label: 'Leagues & Campus Deployment',
    color: '#C89B3C',
    barBg: 'bg-[#C89B3C]/20',
    border: 'border-[#C89B3C]/45',
    icon: <Building2 size={14} className="text-[#C89B3C]" />
  },
  nil: {
    label: 'NIL Escrow & Compliance',
    color: '#68D391',
    barBg: 'bg-emerald-500/15',
    border: 'border-emerald-500/40',
    icon: <ShieldCheck size={14} className="text-[#68D391]" />
  },
  media: {
    label: 'Media & FAST Broadcast',
    color: '#38BDF8',
    barBg: 'bg-sky-500/15',
    border: 'border-sky-500/40',
    icon: <Tv size={14} className="text-[#38BDF8]" />
  },
  governance: {
    label: 'Governance, IP & Capital',
    color: '#E8C98B',
    barBg: 'bg-amber-300/15',
    border: 'border-amber-300/40',
    icon: <Briefcase size={14} className="text-[#E8C98B]" />
  }
};

const YEAR_SUMMARY: Record<
  RoadmapYear,
  {
    title: string;
    period: string;
    campuses: string;
    activeHoldings: string;
    escrowVolume: string;
    gateFocus: string;
  }
> = {
  all: {
    title: '36-Month Institutional Holding Roadmap',
    period: 'Q4 2026 – Q3 2029 (12 Quarters)',
    campuses: '150 → 450+',
    activeHoldings: '43 Consolidated Brands',
    escrowVolume: '$18.4M → $94.0M',
    gateFocus: 'Unit Margin >= 50% -> Series A -> Positive Holding EBITDA'
  },
  Y1: {
    title: 'Year 1: Validation Sprint & Fiduciary Foundation',
    period: 'Q4 2026 – Q3 2027',
    campuses: '150 Active Campuses',
    activeHoldings: '15 Core Commercial Units',
    escrowVolume: '$18.4M Run-Rate',
    gateFocus: 'Prove 45%+ Pilot Margin & Trademark Clearance'
  },
  Y2: {
    title: 'Year 2: Conference Consolidation & Linear FAST Scale',
    period: 'Q4 2027 – Q3 2028',
    campuses: '280 Active Campuses',
    activeHoldings: '28 Operating Units',
    escrowVolume: '$46.5M Cleared',
    gateFocus: 'Series A Close & National Connected-TV Distribution'
  },
  Y3: {
    title: 'Year 3: National Infrastructure & Operator Syndicate',
    period: 'Q4 2028 – Q3 2029',
    campuses: '450+ Active Campuses',
    activeHoldings: '43 Full Ecosystem IP',
    escrowVolume: '$94.0M+ Cleared',
    gateFocus: 'Self-Sustaining Margin & Institutional Data Room Liquidity'
  }
};

const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  // YEAR 1
  {
    id: 'm1-ip-audit',
    code: 'M1.1',
    title: 'Top-25 Portfolio Trademark Audit & Holding Charter',
    year: 'Y1',
    quarterLabel: 'Q4 2026',
    startQ: 0,
    endQ: 1,
    track: 'governance',
    status: 'active',
    owner: 'Chief Legal & IP Counsel',
    summary:
      'Execute comprehensive USPTO clearance and common-law diligence across top 25 collegiate domains, codifying asset disposition tiers.',
    deliverables: [
      'Complete trademark risk matrix across 43 portfolio domains',
      'Establish strict educational and publisher IP firewalls',
      'Ratify Board Strategy v1.0 governance charter'
    ],
    exitGateMetric: 'Zero unmitigated trademark exposure on flagship commercialization domains',
    assetsActivated: ['College Company Holding', 'College Esports Expo (CEX)', 'Collegiate Championships'],
    campusTarget: 150,
    capitalTranche: 'Seed Working Capital ($420K)'
  },
  {
    id: 'm1-validation-sprint',
    code: 'M1.2',
    title: '6-Week Campus Validation Sprint Cohort (Wave 1)',
    year: 'Y1',
    quarterLabel: 'Q4 2026 – Q1 2027',
    startQ: 0,
    endQ: 2,
    track: 'leagues',
    status: 'active',
    owner: 'Director of Campus Partnerships',
    summary:
      'Deploy initial 3–6 turnkey intercollegiate pilot programs with Power-4 and Atlantic corridor athletic departments at 45%+ net contribution margin.',
    deliverables: [
      'Close 3 paid university pilot contracts ($18.5K–$35K per cohort)',
      'Obtain publisher community tournament licenses (Rocket League / Valorant)',
      'Publish audited pilot ROI & student production stipend ledgers'
    ],
    exitGateMetric: 'Minimum 2 paid campus LOIs closed & >= 45% verified contribution margin',
    assetsActivated: ['College Esports Expo (CEX)', 'College Gaming League', 'College Tournament'],
    campusTarget: 165,
    capitalTranche: 'Self-Funded Contract Margin'
  },
  {
    id: 'm1-escrow-clearinghouse',
    code: 'M1.3',
    title: '50-State Statutory NIL Escrow & ARMS/Teamworks Sync',
    year: 'Y1',
    quarterLabel: 'Q1 – Q2 2027',
    startQ: 1,
    endQ: 3,
    track: 'nil',
    status: 'scheduled',
    owner: 'NIL Compliance Directorate',
    summary:
      'Operationalize pre-funded corporate sponsorship escrow accounts paired with geofenced state disclosure rules and Fair Market Value appraisals.',
    deliverables: [
      'Deploy automated 50-state disclosure parser for athletic directors',
      'Integrate House v. NCAA revenue-share compliance ledger templates',
      'Launch student-athlete NIL Fair Market Value audit portal'
    ],
    exitGateMetric: '100% automated AD disclosure parity & zero NCAA Bylaw 12 exceptions',
    assetsActivated: ['College Esports NIL', 'NIL Fair Market Value (FMV)', 'College NIL Hub'],
    campusTarget: 185,
    capitalTranche: 'Engineering & Compliance ($680K)'
  },
  {
    id: 'm1-fast-pilot',
    code: 'M1.4',
    title: 'College Esports TV Regional Streaming & Co-Stream Mesh',
    year: 'Y1',
    quarterLabel: 'Q2 – Q3 2027',
    startQ: 2,
    endQ: 4,
    track: 'media',
    status: 'scheduled',
    owner: 'VP of Media & Broadcast',
    summary:
      'Package championship finals from Wave 1 varsity circuits into standardized broadcast graphic overlays and collegiate co-streaming feeds.',
    deliverables: [
      'Deploy live CPV programmatic sponsor overlay tech across broadcast desks',
      'Accredited student journalism & broadcast internship pipeline on 25 campuses',
      'Deliver initial connected-TV FAST test programming block'
    ],
    exitGateMetric: '12M+ verified collegiate streaming minutes & positive sponsor CPM yield',
    assetsActivated: ['College Esports TV', 'Esports NIL TV', 'College Creator Academy'],
    campusTarget: 200,
    capitalTranche: 'Broadcast Production ($540K)'
  },

  // YEAR 2
  {
    id: 'm2-series-a',
    code: 'M2.1',
    title: 'Series A Institutional Data Room & Syndicate Close',
    year: 'Y2',
    quarterLabel: 'Q4 2027 – Q1 2028',
    startQ: 4,
    endQ: 6,
    track: 'governance',
    status: 'gate',
    owner: 'Managing Member & Capital Desk',
    summary:
      'Open formal Series A institutional financing anchored by audited Y1 campus cash flows, verified NIL take-rates, and 200-campus density.',
    deliverables: [
      'Issue GAAP-audited Y1 unit economic and contribution margin ledger',
      'Execute strategic JV & operator licensing terms for Tier-1 verticals',
      'Allocate growth capital toward conference-wide arena and FAST rollouts'
    ],
    exitGateMetric: 'Series A institutional close conditional on >= 50% Y1 validation margin',
    assetsActivated: ['College Company Holding', 'College Athletic Director', 'College Apparel'],
    campusTarget: 225,
    capitalTranche: 'Series A Tranche I ($6.5M)'
  },
  {
    id: 'm2-stem-circuits',
    code: 'M2.2',
    title: 'National CRL Sim Motorsports & CDRL Drone Circuits',
    year: 'Y2',
    quarterLabel: 'Q1 – Q2 2028',
    startQ: 5,
    endQ: 7,
    track: 'leagues',
    status: 'scheduled',
    owner: 'Commissioner of Technical Athletics',
    summary:
      'Scale intercollegiate motion simulator racing and indoor drone flight leagues across 280 engineering and Power-4 campuses.',
    deliverables: [
      'Install zero-capex motion rig & netted flight domes across 40 flagship hubs',
      'Onboard automotive & aerospace defense engineering recruitment sponsors',
      'Host inaugural televised National STEM Athletics Invitational'
    ],
    exitGateMetric: '280 active member universities & $8.5M+ multi-year sponsor commitments',
    assetsActivated: ['College Racing League (CRL)', 'College Drone Racing League (CDRL)', 'College Esports Arena'],
    campusTarget: 280,
    capitalTranche: 'Series A Infrastructure ($3.2M)'
  },
  {
    id: 'm2-fast-linear',
    code: 'M2.3',
    title: '24/7 Linear FAST Channel National Distribution',
    year: 'Y2',
    quarterLabel: 'Q1 – Q3 2028',
    startQ: 5,
    endQ: 8,
    track: 'media',
    status: 'scheduled',
    owner: 'VP of Media & Broadcast',
    summary:
      'Expand College Esports TV onto national ad-supported connected TV (FAST) lineups with centralized direct-sold Fortune 500 upfront inventory.',
    deliverables: [
      'Sign carriage agreements across 3+ national FAST connected-TV platforms',
      'Automate Title IX balanced spotlight programming across women’s varsity rosters',
      'Connect Nielsen-calibrated campus audience measurement to sponsor dashboards'
    ],
    exitGateMetric: '48M+ quarterly connected-TV viewing minutes & $4.2M annualized ad revenue',
    assetsActivated: ['College Esports TV', 'Athlete Brand Kit', 'College Streaming Network'],
    campusTarget: 310,
    capitalTranche: 'Series A Media Expansion ($2.1M)'
  },
  {
    id: 'm2-group-licensing',
    code: 'M2.4',
    title: 'Varsity Roster Group-Licensing & Telehealth SaaS',
    year: 'Y2',
    quarterLabel: 'Q2 – Q3 2028',
    startQ: 6,
    endQ: 8,
    track: 'nil',
    status: 'scheduled',
    owner: 'Head of NIL Clearinghouse & Health',
    summary:
      'Launch single-signature group IP licensing for video game publishers alongside collegiate athlete ergonomic/telehealth institutional SaaS.',
    deliverables: [
      'Process 14,000+ opted-in varsity competitors in unified group royalty pool',
      'Roll out 95/5 proportional split disbursement engine across member conferences',
      'Deploy College Esports Med preventative ergonomics across varsity labs'
    ],
    exitGateMetric: '$46.5M cumulative cleared NIL & group-royalty transaction volume',
    assetsActivated: ['Varsity Group Licensing', 'College Esports Med', 'NIL Brand Match'],
    campusTarget: 330,
    capitalTranche: 'Platform Scaling ($1.8M)'
  },

  // YEAR 3
  {
    id: 'm3-450-footprint',
    code: 'M3.1',
    title: '450+ North American Campus Network & Conference Parity',
    year: 'Y3',
    quarterLabel: 'Q4 2028 – Q2 2029',
    startQ: 8,
    endQ: 10,
    track: 'leagues',
    status: 'scheduled',
    owner: 'Chief Operating Officer',
    summary:
      'Complete Waves 3 and 4 expansion across NCAA Division I/II/III and Canadian U-Sports programs, unifying all 43 operating brands.',
    deliverables: [
      'Activate 450+ accredited university athletics and recreation partnerships',
      'Standardize CEX annual national festival as official collegiate digital championship',
      'Enable cross-conference alumni league retention & career placement portals'
    ],
    exitGateMetric: '450+ contracted campuses & 85%+ annual institutional renewal rate',
    assetsActivated: ['College Esports Expo (CEX)', 'College Esports Network', 'Collegiate Championships'],
    campusTarget: 450,
    capitalTranche: 'Operating Cash Flow Funded'
  },
  {
    id: 'm3-nil-api',
    code: 'M3.2',
    title: 'Enterprise NIL Valuation Data API & CSC Compliance Standard',
    year: 'Y3',
    quarterLabel: 'Q1 – Q3 2029',
    startQ: 9,
    endQ: 11,
    track: 'nil',
    status: 'scheduled',
    owner: 'NIL Analytics & Governance Desk',
    summary:
      'Commercialize institutional NIL Fair Market Value APIs for conferences, sports agencies, and corporate media buyers nationwide.',
    deliverables: [
      'Publish real-time anonymized contract index across 100,000+ cleared deals',
      'License Enterprise Compliance Terminal SaaS to conference compliance offices',
      'Surpass $90M cumulative escrow clearing with full Title IX audit certification'
    ],
    exitGateMetric: '$94M cumulative escrow throughput & 90+ Enterprise API subscribers',
    assetsActivated: ['NIL Analytics', 'College NIL School', 'High School Player NIL'],
    campusTarget: 450,
    capitalTranche: 'Recurring SaaS EBITDA'
  },
  {
    id: 'm3-syndicated-upfront',
    code: 'M3.3',
    title: 'Multi-Network Collegiate Upfronts & Original Docuseries',
    year: 'Y3',
    quarterLabel: 'Q1 – Q3 2029',
    startQ: 9,
    endQ: 11,
    track: 'media',
    status: 'scheduled',
    owner: 'VP of Media & Syndication',
    summary:
      'Transition from spot sponsorships to annual Fortune 500 media upfront commitments spanning linear FAST channels, campus arenas, and NIL rosters.',
    deliverables: [
      'Lock 12-month category-exclusive national upfront packages',
      'Syndicate varsity documentary & championship anthology series',
      'Generate $14M+ high-margin broadcast & sponsorship licensing net revenue'
    ],
    exitGateMetric: '>= 60% annual contracted media inventory sold prior to fall semester',
    assetsActivated: ['College Esports TV', 'College Creator Network', 'College Sports Media'],
    campusTarget: 450,
    capitalTranche: 'Media Margin Accretive'
  },
  {
    id: 'm3-holding-ebitda',
    code: 'M3.4',
    title: 'Consolidated Holding Profitability & Strategic Liquidity Gate',
    year: 'Y3',
    quarterLabel: 'Q3 2029',
    startQ: 10,
    endQ: 11,
    track: 'governance',
    status: 'gate',
    owner: 'Board of Directors & Syndicate Council',
    summary:
      'Achieve consolidated holding-group operating profitability across SaaS, NIL escrow take-rate, media carriage, and operator licenses.',
    deliverables: [
      'Reach consolidated positive EBITDA across all 4 operating divisions',
      'Deliver Series B / strategic institutional media syndication optionality',
      'Establish permanent university endowment revenue-share distributions'
    ],
    exitGateMetric: 'Consolidated holding group EBITDA > 28% with 450+ active campuses',
    assetsActivated: ['All 43 Portfolio IP Holdings'],
    campusTarget: 450,
    capitalTranche: 'Profitable Balance Sheet'
  }
];

export const InstitutionalRoadmap: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<RoadmapYear>('all');
  const [selectedTrack, setSelectedTrack] = useState<RoadmapTrack>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | MilestoneStatus>('all');
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(ROADMAP_MILESTONES[0].id);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const visibleQuarters = useMemo(() => {
    if (selectedYear === 'all') return QUARTERS;
    return QUARTERS.filter((q) => q.year === selectedYear);
  }, [selectedYear]);

  const filteredMilestones = useMemo(() => {
    return ROADMAP_MILESTONES.filter((m) => {
      const yearMatch = selectedYear === 'all' || m.year === selectedYear;
      const trackMatch = selectedTrack === 'all' || m.track === selectedTrack;
      const statusMatch = selectedStatus === 'all' || m.status === selectedStatus;
      return yearMatch && trackMatch && statusMatch;
    });
  }, [selectedYear, selectedTrack, selectedStatus]);

  const selectedMilestone = useMemo(() => {
    return (
      filteredMilestones.find((m) => m.id === activeMilestoneId) ||
      filteredMilestones[0] ||
      ROADMAP_MILESTONES[0]
    );
  }, [filteredMilestones, activeMilestoneId]);

  const yearStats = YEAR_SUMMARY[selectedYear];

  const minQ = visibleQuarters[0]?.index ?? 0;
  const maxQ = visibleQuarters[visibleQuarters.length - 1]?.index ?? 11;
  const totalCols = visibleQuarters.length;

  const handleCopyRoadmap = () => {
    const lines = [
      `COLLEGE COMPANY · ${yearStats.title.toUpperCase()} (${yearStats.period})`,
      `Campus Target: ${yearStats.campuses} | Active Holdings: ${yearStats.activeHoldings} | Escrow Volume: ${yearStats.escrowVolume}`,
      '',
      ...filteredMilestones.map(
        (m) =>
          `${m.code} [${m.quarterLabel}] ${m.title} (${TRACK_META[m.track].label}) — Exit Gate: ${m.exitGateMetric}`
      )
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="space-y-8 font-sans text-[#F5F5F3]">
      {/* ========================================================================= */}
      {/* 1. HEADER & TRAJECTORY KPI BAR                                            */}
      {/* ========================================================================= */}
      <div className="p-7 sm:p-8 rounded-xl bg-[#0E1118] border border-white/[0.08] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
              <Compass size={14} />
              <span>36-Month Capital & Operating Horizon · {yearStats.period}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              {yearStats.title}
            </h2>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              Multi-year execution blueprint mapping the holding group’s progression from initial 6-week campus pilot
              validation to 450+ university deployments, national FAST linear distribution, and consolidated EBITDA profitability.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
            <button
              type="button"
              onClick={handleCopyRoadmap}
              className="px-4 py-2 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-white/10 text-xs font-mono text-neutral-200 hover:text-white transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              {copiedSummary ? <Check size={13} className="text-[#68D391]" /> : <Copy size={13} className="text-[#C89B3C]" />}
              <span>{copiedSummary ? 'Copied Brief' : 'Copy Roadmap Brief'}</span>
            </button>
          </div>
        </div>

        {/* 4-Column Trajectory Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#111520] border border-white/[0.06]">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Campus Footprint</div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums mt-1">
              {yearStats.campuses}
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Accredited athletic & club hubs</div>
          </div>

          <div className="p-4 rounded-lg bg-[#111520] border border-white/[0.06]">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Portfolio Activation</div>
            <div className="text-xl sm:text-2xl font-bold text-[#E8C98B] font-mono tabular-nums mt-1">
              {yearStats.activeHoldings}
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Phased operating & JV rollout</div>
          </div>

          <div className="p-4 rounded-lg bg-[#111520] border border-white/[0.06]">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Escrow Throughput</div>
            <div className="text-xl sm:text-2xl font-bold text-[#68D391] font-mono tabular-nums mt-1">
              {yearStats.escrowVolume}
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Cleared NIL & royalty volume</div>
          </div>

          <div className="p-4 rounded-lg bg-[#111520] border border-white/[0.06]">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Primary Fiduciary Gate</div>
            <div className="text-xs sm:text-sm font-semibold text-white font-mono mt-1.5 leading-snug">
              {yearStats.gateFocus}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HORIZON, TRACK & STATUS FILTER TOOLBAR                                 */}
      {/* ========================================================================= */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-3 rounded-lg bg-[#0E1118] border border-white/[0.08]">
        {/* Year Segmented Control */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded bg-[#090A0C] border border-white/[0.06]">
          {(
            [
              { id: 'all', label: 'All 3 Years' },
              { id: 'Y1', label: 'Year 1 · 2026–27' },
              { id: 'Y2', label: 'Year 2 · 2027–28' },
              { id: 'Y3', label: 'Year 3 · 2028–29' }
            ] as const
          ).map((yr) => (
            <button
              key={yr.id}
              type="button"
              onClick={() => setSelectedYear(yr.id)}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                selectedYear === yr.id
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {yr.label}
            </button>
          ))}
        </div>

        {/* Track Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setSelectedTrack('all')}
            className={`px-3 py-1.5 rounded-sm border transition-colors cursor-pointer whitespace-nowrap ${
              selectedTrack === 'all'
                ? 'bg-[#182030] border-[#C89B3C]/50 text-[#E8C98B] font-semibold'
                : 'bg-[#090A0C] border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            All Tracks
          </button>
          {(Object.keys(TRACK_META) as Exclude<RoadmapTrack, 'all'>[]).map((trackKey) => {
            const meta = TRACK_META[trackKey];
            return (
              <button
                key={trackKey}
                type="button"
                onClick={() => setSelectedTrack(trackKey)}
                className={`px-3 py-1.5 rounded-sm border transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  selectedTrack === trackKey
                    ? 'bg-[#182030] border-[#C89B3C]/50 text-white font-semibold'
                    : 'bg-[#090A0C] border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {meta.icon}
                <span>{meta.label.split(' & ')[0]}</span>
              </button>
            );
          })}

          {/* Status Selector */}
          <select
            aria-label="Filter by milestone status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as 'all' | MilestoneStatus)}
            className="bg-[#090A0C] border border-white/10 rounded-sm px-2.5 py-1.5 text-xs font-mono text-neutral-300 focus:outline-none focus:border-[#C89B3C] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Now</option>
            <option value="scheduled">Scheduled</option>
            <option value="gate">Capital / Stop Gate</option>
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE GANTT MATRIX + MILESTONE DETAIL INSPECTOR                  */}
      {/* ========================================================================= */}
      {filteredMilestones.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0E1118] border border-white/[0.08] space-y-3">
          <Layers size={28} className="mx-auto text-neutral-500" />
          <h3 className="text-lg font-display font-bold text-white">No milestones match the active filters</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Adjust the selected year, operating track, or milestone status filter to inspect scheduled institutional phases.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedYear('all');
              setSelectedTrack('all');
              setSelectedStatus('all');
            }}
            className="px-4 py-2 rounded-sm bg-[#C89B3C] text-[#090A0C] font-mono text-xs font-bold cursor-pointer"
          >
            Reset Roadmap Filters
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Columns: Visual Multi-Quarter Timeline Matrix */}
          <div className="lg:col-span-7 rounded-xl bg-[#0E1118] border border-white/[0.08] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2 bg-[#111520]">
              <div>
                <h3 className="text-base font-display font-bold text-white">
                  Multi-Year Execution Timeline
                </h3>
                <p className="text-xs text-neutral-400">
                  Select any bar or milestone below to inspect deliverables, assets, and exit-gate criteria.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#E8C98B] tabular-nums">
                {filteredMilestones.length} Milestones Shown
              </span>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[640px] p-5 space-y-4">
                {/* Year Group Headers (only when All Years shown) */}
                {selectedYear === 'all' && (
                  <div className="grid grid-cols-12 gap-1 text-[10px] font-mono uppercase tracking-wider text-center">
                    <div className="col-span-4 py-1 border-b border-[#C89B3C]/40 text-[#E8C98B] font-semibold">
                      Year 1 · Validation (2026–27)
                    </div>
                    <div className="col-span-4 py-1 border-b border-sky-400/40 text-sky-300 font-semibold">
                      Year 2 · Consolidation (2027–28)
                    </div>
                    <div className="col-span-4 py-1 border-b border-emerald-400/40 text-emerald-300 font-semibold">
                      Year 3 · National Scale (2028–29)
                    </div>
                  </div>
                )}

                {/* Quarter Axis Row */}
                <div
                  className="grid gap-1 text-[10px] font-mono text-neutral-400 border-b border-white/[0.08] pb-2"
                  style={{ gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))` }}
                >
                  {visibleQuarters.map((q) => (
                    <div key={q.index} className="text-center truncate px-0.5 tabular-nums">
                      {q.label}
                    </div>
                  ))}
                </div>

                {/* Interactive Timeline Rows */}
                <div className="space-y-2.5">
                  {filteredMilestones.map((m) => {
                    const meta = TRACK_META[m.track];
                    const clampedStart = Math.max(m.startQ, minQ);
                    const clampedEnd = Math.min(m.endQ, maxQ);
                    const startOffsetCols = clampedStart - minQ;
                    const spanCols = Math.max(1, clampedEnd - clampedStart + 1);
                    const isSelected = selectedMilestone.id === m.id;

                    const leftPct = (startOffsetCols / totalCols) * 100;
                    const widthPct = (spanCols / totalCols) * 100;

                    return (
                      <div key={m.id} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <button
                            type="button"
                            onClick={() => setActiveMilestoneId(m.id)}
                            className={`text-left flex items-center gap-2 cursor-pointer transition-colors ${
                              isSelected ? 'text-[#E8C98B] font-semibold' : 'text-neutral-300 hover:text-white'
                            }`}
                          >
                            <span className="text-[#C89B3C] tabular-nums">{m.code}</span>
                            <span>·</span>
                            <span className="truncate max-w-[340px] sm:max-w-[440px] font-sans font-medium">
                              {m.title}
                            </span>
                          </button>

                          <span className="text-neutral-500 text-[10px] shrink-0 tabular-nums">
                            {m.quarterLabel} · {m.campusTarget} Campuses
                          </span>
                        </div>

                        {/* Gantt Bar Track */}
                        <div className="relative h-8 rounded bg-[#090B10] border border-white/[0.05] overflow-hidden">
                          {/* Vertical quarter grid hairlines */}
                          <div
                            className="absolute inset-0 grid pointer-events-none"
                            style={{ gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))` }}
                          >
                            {visibleQuarters.map((q) => (
                              <div key={q.index} className="border-r border-white/[0.04] last:border-r-0" />
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => setActiveMilestoneId(m.id)}
                            style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                            className={`absolute top-1 bottom-1 rounded-sm border px-2.5 flex items-center justify-between gap-2 text-[10px] font-mono transition-all cursor-pointer ${
                              meta.barBg
                            } ${
                              isSelected
                                ? 'border-[#C89B3C] ring-1 ring-[#C89B3C]/60 text-white font-semibold'
                                : `${meta.border} text-neutral-200 hover:brightness-125`
                            }`}
                          >
                            <span className="truncate flex items-center gap-1.5">
                              {m.status === 'active' ? (
                                <CheckCircle2 size={11} className="text-[#68D391] shrink-0" />
                              ) : m.status === 'gate' ? (
                                <AlertTriangle size={11} className="text-amber-400 shrink-0" />
                              ) : (
                                <Clock size={11} className="text-neutral-400 shrink-0" />
                              )}
                              <span className="truncate">{meta.label.split(' ')[0]}</span>
                            </span>
                            <ChevronRight size={11} className="shrink-0 opacity-75" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Clean Typographic Legend */}
            <div className="px-5 py-3 border-t border-white/[0.08] bg-[#0B0E14] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-[#68D391]" /> Active Phase
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-neutral-400" /> Scheduled Expansion
                </span>
                <span className="flex items-center gap-1.5">
                  <AlertTriangle size={12} className="text-amber-400" /> Fiduciary / Capital Gate
                </span>
              </div>
              <span className="text-neutral-500">All timelines gated by pilot margins</span>
            </div>
          </div>

          {/* Right 5 Columns: Selected Milestone Detail Inspector */}
          <div className="lg:col-span-5 rounded-xl bg-[#11141A] border border-white/[0.1] p-6 space-y-5 lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-400">
                  <span className="text-[#C89B3C] font-bold">{selectedMilestone.code}</span>
                  <span>·</span>
                  <span>{selectedMilestone.quarterLabel}</span>
                  <span>·</span>
                  <span style={{ color: TRACK_META[selectedMilestone.track].color }}>
                    {TRACK_META[selectedMilestone.track].label}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-white leading-snug">
                  {selectedMilestone.title}
                </h3>
                <div className="text-xs font-mono text-neutral-400">
                  Owner: <span className="text-neutral-200">{selectedMilestone.owner}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              {selectedMilestone.summary}
            </p>

            {/* Key Deliverables */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#E8C98B]">
                Execution Deliverables
              </div>
              <ul className="space-y-2 text-xs text-neutral-200">
                {selectedMilestone.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#C89B3C] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exit Gate Verification Criteria */}
            <div className="p-4 rounded-lg bg-[#0A0D12] border border-white/[0.08] space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#68D391] flex items-center gap-1.5">
                <Target size={13} />
                <span>Mandated Exit Gate Criterion</span>
              </div>
              <p className="text-xs text-neutral-200 font-mono leading-relaxed">
                {selectedMilestone.exitGateMetric}
              </p>
            </div>

            {/* Activated Holdings & Funding Tranche */}
            <div className="pt-3 border-t border-white/[0.08] grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block">Campus Milestone</span>
                <span className="text-white font-bold tabular-nums mt-0.5 block">
                  {selectedMilestone.campusTarget} Universities
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block">Capital Allocation</span>
                <span className="text-[#E8C98B] font-semibold mt-0.5 block">
                  {selectedMilestone.capitalTranche}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.08] space-y-1">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                Holdings Activated in Phase
              </span>
              <div className="text-xs font-mono text-neutral-300">
                {selectedMilestone.assetsActivated.join(' · ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
