import React, { useState, useMemo, useEffect } from 'react';
import { 
  Bell, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Building2, 
  ShieldCheck, 
  ChevronRight, 
  X, 
  Filter, 
  RefreshCw, 
  ExternalLink, 
  Send, 
  Check, 
  AlertCircle,
  Zap,
  Tag,
  Radio,
  Share2,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type GrowthScenario = 'Conservative' | 'Expected' | 'Aggressive';

export interface NilOpportunity {
  id: string;
  title: string;
  brand: string;
  category: string;
  targetScenarios: GrowthScenario[];
  dealValuePerAthlete: number;
  totalPoolValue: number;
  openRosterSpots: number;
  targetDivisions: string[];
  trendingVelocity: string; // e.g. "+58% Demand Surge"
  matchScore: number; // percentage
  status: 'Surging' | 'New Allocation' | 'Closing Soon' | 'Institutional Pool';
  complianceCertified: boolean;
  deliverables: string[];
  description: string;
  timestamp: string;
  isRead?: boolean;
  applied?: boolean;
}

const DEFAULT_OPPORTUNITIES: NilOpportunity[] = [
  // --- CONSERVATIVE SCENARIO DEALS ---
  {
    id: 'nil-con-1',
    title: 'Financial Literacy & Campus Banking Ambassador Initiative',
    brand: 'First Collegiate Federal Credit Union',
    category: 'Banking & Financial Services',
    targetScenarios: ['Conservative'],
    dealValuePerAthlete: 3800,
    totalPoolValue: 570000,
    openRosterSpots: 150,
    targetDivisions: ['Division 1', 'Group of 5', 'Club'],
    trendingVelocity: '+24% Steady Growth',
    matchScore: 96,
    status: 'Institutional Pool',
    complianceCertified: true,
    deliverables: [
      'Host 1x campus financial wellness workshop for student competitors',
      '2x Co-branded social disclosures on state-compliant NIL platforms',
      'Zero-fee student banking ambassador badge on tournament overlays'
    ],
    description: 'Fully vetted regional credit union partnership providing guaranteed escrow clearing, 1099 compliant stipends, and financial coaching for roster athletes.',
    timestamp: '12m ago'
  },
  {
    id: 'nil-con-2',
    title: 'STEM & Digital Esports Workstation Grant Program',
    brand: 'Axiom Computing & Academic Solutions',
    category: 'Academic Tech & Hardware',
    targetScenarios: ['Conservative', 'Expected'],
    dealValuePerAthlete: 4200,
    totalPoolValue: 630000,
    openRosterSpots: 120,
    targetDivisions: ['Division 1', 'High School Feeder'],
    trendingVelocity: '+31% Inflow',
    matchScore: 92,
    status: 'Institutional Pool',
    complianceCertified: true,
    deliverables: [
      'Hardware unboxing & campus lab testing demo stream',
      'Feedback submission to university academic computing department',
      'Permanent retention of workstation rig post-academic year'
    ],
    description: 'Compliant institutional technology grant providing high-performance gaming rigs with direct university provost approval and zero amateur status risk.',
    timestamp: '35m ago'
  },
  {
    id: 'nil-con-3',
    title: 'Orthopedic Health & Athletic Recovery Ambassadorship',
    brand: 'BioFlex Sports Medicine Network',
    category: 'Healthcare & Wellness',
    targetScenarios: ['Conservative'],
    dealValuePerAthlete: 3200,
    totalPoolValue: 480000,
    openRosterSpots: 100,
    targetDivisions: ['Division 1', 'Club'],
    trendingVelocity: '+18% Steady Yield',
    matchScore: 89,
    status: 'New Allocation',
    complianceCertified: true,
    deliverables: [
      'Ergonomic posture recovery case study feature',
      'Physical therapy clinic ambassador appearance on campus',
      'Product testing of certified compression sleeves'
    ],
    description: 'State-certified athletic healthcare network supporting dual-sport varsity athletes with physical wellness support and compliance-cleared compensation.',
    timestamp: '1h ago'
  },

  // --- EXPECTED (BASE) SCENARIO DEALS ---
  {
    id: 'nil-exp-1',
    title: 'Precision Esports Peripherals & Mechanical Switch Endorsement',
    brand: 'Vanguard Gaming Hardware',
    category: 'Gaming Hardware & Gear',
    targetScenarios: ['Expected', 'Conservative'],
    dealValuePerAthlete: 6500,
    totalPoolValue: 1300000,
    openRosterSpots: 200,
    targetDivisions: ['Power-4', 'Division 1 Core', 'Academy'],
    trendingVelocity: '+48% Demand Surge',
    matchScore: 98,
    status: 'Surging',
    complianceCertified: true,
    deliverables: [
      'Primary peripheral partner placement on match broadcast stream overlays',
      'Exclusive mouse/keyboard usage during sanctioned conference tournaments',
      'Quarterly unboxing clip shared across verified student handles'
    ],
    description: 'Tier-1 gaming peripheral sponsor expanding across collegiate conferences with smart-contract escrow clearing and tournament performance bonuses.',
    timestamp: '4m ago'
  },
  {
    id: 'nil-exp-2',
    title: 'Campus Gameday Delivery & Watch-Party Activation Campaign',
    brand: 'QuickBite Campus Logistics',
    category: 'QSR & Food Delivery',
    targetScenarios: ['Expected', 'Aggressive'],
    dealValuePerAthlete: 8200,
    totalPoolValue: 1640000,
    openRosterSpots: 180,
    targetDivisions: ['Power-4', 'Group of 5'],
    trendingVelocity: '+62% Market Shift',
    matchScore: 94,
    status: 'Surging',
    complianceCertified: true,
    deliverables: [
      'Exclusive campus promo code for collegiate conference championship weekend',
      'Student lounge watch party catering activation with photo submission',
      'Short-form TikTok/Reels clip featuring dorm gameday prep'
    ],
    description: 'High-volume QSR food delivery campaign targeting varsity campus captains with monthly food credits and direct revenue share on redeemed discount codes.',
    timestamp: '18m ago'
  },
  {
    id: 'nil-exp-3',
    title: 'Clean Energy & Nootropic Hydration Collegiate Circuit Partner',
    brand: 'HydroPulse Clean Performance',
    category: 'Energy Drinks & Hydration',
    targetScenarios: ['Expected'],
    dealValuePerAthlete: 7500,
    totalPoolValue: 1500000,
    openRosterSpots: 160,
    targetDivisions: ['Division 1 Core', 'Club'],
    trendingVelocity: '+55% Brand Inflow',
    matchScore: 91,
    status: 'New Allocation',
    complianceCertified: true,
    deliverables: [
      'Branded hydration can placement during official league twitch/youtube streams',
      'Campus recreation center sampling booth during tournament week',
      'Monthly athlete wellness log confirming zero banned NCAA stimulant ingredients'
    ],
    description: 'NSF-certified clean energy beverage brand targeting competitive varsity athletes with non-caffeine hydration products and state-filing assistance.',
    timestamp: '42m ago'
  },

  // --- AGGRESSIVE SCENARIO DEALS ---
  {
    id: 'nil-agg-1',
    title: 'National Next-Gen Electric Mobility & Campus EV Ambassador',
    brand: 'VoltDynamics Automotive Group',
    category: 'Automotive & EV Mobility',
    targetScenarios: ['Aggressive'],
    dealValuePerAthlete: 28500,
    totalPoolValue: 4275000,
    openRosterSpots: 150,
    targetDivisions: ['Power-4 Tier-1', 'National Championship Roster'],
    trendingVelocity: '+114% Hyper-Spike',
    matchScore: 99,
    status: 'Surging',
    complianceCertified: true,
    deliverables: [
      'Semester-long lease of branded campus EV vehicle for varsity captain',
      'Featured segment in national FAST syndicated tournament broadcast',
      'Quarterly homecoming showcase event on university campus grounds'
    ],
    description: 'Blue-chip national automotive campaign targeting top-ranked intercollegiate digital sports stars under accelerated national media syndication.',
    timestamp: 'Just now'
  },
  {
    id: 'nil-agg-2',
    title: 'Global Streetwear & Limited Varsity Apparel Capsule Drop',
    brand: 'KINETIC Athletics x Tokyo Streetwear',
    category: 'Apparel & Streetwear Collabs',
    targetScenarios: ['Aggressive', 'Expected'],
    dealValuePerAthlete: 22000,
    totalPoolValue: 3300000,
    openRosterSpots: 120,
    targetDivisions: ['Power-4 Tier-1', 'Division 1 Core'],
    trendingVelocity: '+88% Volume Surge',
    matchScore: 97,
    status: 'Surging',
    complianceCertified: true,
    deliverables: [
      'Design consultation input on limited-edition university team jersey capsule',
      'Commercial modeling shoot for national digital billboard campaign',
      '15% royalty on all merchandise sold through official campus bookstore channels'
    ],
    description: 'High-fashion collegiate sportswear capsule combining athletic identity with gaming lifestyle apparel, featuring direct royalty splits for signed athletes.',
    timestamp: '8m ago'
  },
  {
    id: 'nil-agg-3',
    title: 'Ultra-Low Latency 5G Collegiate Fiber Network Brand Face',
    brand: 'Aether 5G & Fiber Networks',
    category: 'Telecommunications & 5G',
    targetScenarios: ['Aggressive'],
    dealValuePerAthlete: 26000,
    totalPoolValue: 3900000,
    openRosterSpots: 90,
    targetDivisions: ['Power-4 Tier-1'],
    trendingVelocity: '+92% Institutional Surge',
    matchScore: 95,
    status: 'New Allocation',
    complianceCertified: true,
    deliverables: [
      'Live ping speed benchmark demonstration broadcast during national playoffs',
      'National television commercial appearance with varsity team squad',
      'Co-branded digital media banner campaign across campus Wi-Fi login portals'
    ],
    description: 'National telecom carrier partnering with top collegiate varsity programs to highlight sub-millisecond edge latency and gigabit campus connections.',
    timestamp: '22m ago'
  },
  {
    id: 'nil-agg-4',
    title: 'Student-Athlete Wealth Management & Micro-Investing Platform',
    brand: 'Apex Capital Student Ecosystem',
    category: 'Fintech & Wealth Management',
    targetScenarios: ['Aggressive'],
    dealValuePerAthlete: 18500,
    totalPoolValue: 2775000,
    openRosterSpots: 140,
    targetDivisions: ['Power-4 Tier-1', 'Group of 5'],
    trendingVelocity: '+76% Market Demand',
    matchScore: 93,
    status: 'Closing Soon',
    complianceCertified: true,
    deliverables: [
      'Interactive financial planning app walkthrough for team teammates',
      'Keynote speaker at campus athletics business development banquet',
      'Participation in annual NCAA Student-Athlete Financial Summit'
    ],
    description: 'Series-B fintech firm promoting student savings and investment literacy with pre-approved university athletic board sign-off.',
    timestamp: '55m ago'
  }
];

interface NilOpportunityNotificationsProps {
  growthScenario: GrowthScenario;
  isOpen: boolean;
  onClose: () => void;
  onSelectDeal?: (deal: NilOpportunity) => void;
}

export const NilOpportunityModal: React.FC<NilOpportunityNotificationsProps> = ({
  growthScenario,
  isOpen,
  onClose,
  onSelectDeal
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Trending' | 'Applied'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDeal, setSelectedDeal] = useState<NilOpportunity | null>(null);
  const [appliedDealIds, setAppliedDealIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('appliedNilDeals');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // Filter deals matching current scenario
  const scenarioDeals = useMemo(() => {
    return DEFAULT_OPPORTUNITIES.filter((deal) => 
      deal.targetScenarios.includes(growthScenario)
    );
  }, [growthScenario]);

  // Extract categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    scenarioDeals.forEach((d) => cats.add(d.category));
    return Array.from(cats);
  }, [scenarioDeals]);

  const filteredDeals = useMemo(() => {
    return scenarioDeals.filter((deal) => {
      const isApplied = appliedDealIds.includes(deal.id);
      if (activeTab === 'Applied' && !isApplied) return false;
      if (activeTab === 'Trending' && deal.status !== 'Surging') return false;
      if (selectedCategory !== 'All' && deal.category !== selectedCategory) return false;
      return true;
    });
  }, [scenarioDeals, activeTab, selectedCategory, appliedDealIds]);

  const handleApply = (deal: NilOpportunity) => {
    if (appliedDealIds.includes(deal.id)) return;
    const next = [...appliedDealIds, deal.id];
    setAppliedDealIds(next);
    try {
      localStorage.setItem('appliedNilDeals', JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
    setApplicationSuccess(true);
    setTimeout(() => setApplicationSuccess(false), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        className="bg-[#0D1017] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Horizon Line */}
        <div className="h-1 bg-gradient-to-r from-amber-600 via-[#C89B3C] to-emerald-500 w-full" />

        {/* Modal Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#11141E]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-sm bg-[#1A202E] text-[#C89B3C] border border-[#C89B3C]/30">
                <Bell size={16} />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-semibold">
                NIL Opportunity Radar & Market Monitor
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
                growthScenario === 'Conservative'
                  ? 'text-amber-400 bg-amber-950/40 border-amber-500/30'
                  : growthScenario === 'Aggressive'
                  ? 'text-[#68D391] bg-emerald-950/40 border-emerald-500/30'
                  : 'text-[#E8C98B] bg-[#C89B3C]/15 border-[#C89B3C]/40'
              }`}>
                {growthScenario.toUpperCase()} MARKET STATE
              </span>
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              Real-Time Sponsorship Inflow & Category Alerts
            </h2>
            <p className="text-xs text-neutral-400">
              Monitoring verified brand allocations, university-cleared escrow pools, and state statutory compliance matching.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded bg-[#161B26] hover:bg-[#1E2534] border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh live market signals"
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-[#C89B3C]' : ''} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded bg-[#161B26] hover:bg-[#1E2534] border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Live Scenario Market Signal Strip */}
        <div className="bg-[#0A0C12] px-6 py-3 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <Radio size={13} className="text-[#68D391] animate-pulse" />
            <span>Scenario Liquidity Velocity:</span>
            <strong className="text-white">
              {growthScenario === 'Conservative' && '$3,200 - $4,200 / athlete avg'}
              {growthScenario === 'Expected' && '$6,500 - $8,200 / athlete avg'}
              {growthScenario === 'Aggressive' && '$18,500 - $28,500 / athlete avg'}
            </strong>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-400">
              Open Allocations: <strong className="text-[#E8C98B]">{filteredDeals.length} Deal Pools</strong>
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-400">
              Aggregated Capital: <strong className="text-[#68D391]">
                ${(filteredDeals.reduce((acc, d) => acc + d.totalPoolValue, 0) / 1000000).toFixed(2)}M
              </strong>
            </span>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="px-6 py-3 bg-[#11141C] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-1 bg-[#090C12] p-1 rounded-sm border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('All')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'All'
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Alerts ({scenarioDeals.length})
            </button>
            <button
              onClick={() => setActiveTab('Trending')}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                activeTab === 'Trending'
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Zap size={11} />
              <span>Surge Only</span>
            </button>
            <button
              onClick={() => setActiveTab('Applied')}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                activeTab === 'Applied'
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <CheckCircle2 size={11} />
              <span>Claimed / Applied ({appliedDealIds.length})</span>
            </button>
          </div>

          {/* Category Dropdown/Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono max-w-full">
            <Filter size={12} className="text-neutral-500 shrink-0" />
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-sm text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white/10 text-white font-semibold border border-white/20'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Opportunity Card List & Detail Split View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {applicationSuccess && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-xs text-[#68D391] font-mono flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} />
                <span>Roster expression of interest officially registered with compliance escrow clearinghouse!</span>
              </div>
              <span className="text-[10px] text-neutral-400">Audit ID: ESC-{Math.floor(Math.random() * 90000 + 10000)}</span>
            </div>
          )}

          {filteredDeals.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <AlertCircle size={28} className="mx-auto text-neutral-500" />
              <div className="text-sm font-semibold text-neutral-300">No opportunities match the current filter.</div>
              <div className="text-xs text-neutral-500">Switch scenarios or reset category filters to view active alerts.</div>
            </div>
          ) : (
            filteredDeals.map((deal) => {
              const isApplied = appliedDealIds.includes(deal.id);
              const isSelected = selectedDeal?.id === deal.id;

              return (
                <div
                  key={deal.id}
                  className={`p-5 rounded-lg border transition-all ${
                    isSelected 
                      ? 'bg-[#141926] border-[#C89B3C]' 
                      : 'bg-[#10131B] border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    
                    {/* Left Info */}
                    <div className="space-y-2 flex-1">
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          deal.status === 'Surging'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : deal.status === 'New Allocation'
                            ? 'bg-emerald-500/20 text-[#68D391] border border-emerald-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {deal.status.toUpperCase()}
                        </span>

                        <span className="text-neutral-400">{deal.brand}</span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-neutral-400">{deal.category}</span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-[#68D391] font-semibold">{deal.trendingVelocity}</span>
                      </div>

                      <h3 className="text-base font-bold text-white font-display">
                        {deal.title}
                      </h3>

                      <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                        {deal.description}
                      </p>

                      {/* Key Parameters Matrix */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-mono">
                        <div className="bg-[#090C12] p-2.5 rounded border border-white/5">
                          <div className="text-[10px] text-neutral-500 uppercase">Per-Athlete Yield</div>
                          <div className="text-[#E8C98B] font-bold text-sm mt-0.5">
                            ${deal.dealValuePerAthlete.toLocaleString()}
                          </div>
                        </div>

                        <div className="bg-[#090C12] p-2.5 rounded border border-white/5">
                          <div className="text-[10px] text-neutral-500 uppercase">Gross Pool Value</div>
                          <div className="text-white font-bold text-sm mt-0.5">
                            ${(deal.totalPoolValue / 1000000).toFixed(2)}M
                          </div>
                        </div>

                        <div className="bg-[#090C12] p-2.5 rounded border border-white/5">
                          <div className="text-[10px] text-neutral-500 uppercase">Target Roster Cap</div>
                          <div className="text-white font-bold text-sm mt-0.5">
                            {deal.openRosterSpots} Athletes
                          </div>
                        </div>

                        <div className="bg-[#090C12] p-2.5 rounded border border-white/5">
                          <div className="text-[10px] text-neutral-500 uppercase">Roster Match</div>
                          <div className="text-[#68D391] font-bold text-sm mt-0.5">
                            {deal.matchScore}% Parity
                          </div>
                        </div>
                      </div>

                      {/* Deliverables Checklist (if expanded or selected) */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                          <div className="text-[11px] font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
                            Mandatory Deliverables & Compliance Checklist:
                          </div>
                          <div className="space-y-1.5 text-xs text-neutral-300">
                            {deal.deliverables.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <Check size={12} className="text-[#68D391] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                          <div className="text-[10px] font-mono text-neutral-500 pt-1">
                            Eligibility: Pre-cleared for dual-enrollment varsity rosters under NCAA Bylaw 12 & State Disclosure Rules.
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Right Actions */}
                    <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 pt-2 md:pt-0">
                      
                      <div className="text-right text-[10px] font-mono text-neutral-500 hidden md:block">
                        Updated {deal.timestamp}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDeal(isSelected ? null : deal)}
                          className="px-3 py-1.5 rounded bg-[#181E2B] hover:bg-[#202737] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        >
                          {isSelected ? 'Hide Details' : 'View Terms'}
                        </button>

                        <button
                          onClick={() => handleApply(deal)}
                          disabled={isApplied}
                          className={`px-4 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                            isApplied
                              ? 'bg-emerald-950/80 text-[#68D391] border border-emerald-500/40 cursor-default'
                              : 'bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C]'
                          }`}
                        >
                          {isApplied ? (
                            <>
                              <CheckCircle2 size={13} />
                              <span>Allocated</span>
                            </>
                          ) : (
                            <>
                              <Send size={12} />
                              <span>Claim Allocation</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })
          )}

        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-[#0A0D14] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#68D391]" />
            <span>100% of NIL allocations cleared via institutional escrow; zero university brand conflicts permitted.</span>
          </div>
          <div className="text-[11px] text-neutral-500">
            Current Active Scenario: <strong className="text-white">{growthScenario}</strong>
          </div>
        </div>

      </div>
    </div>
  );
};

/**
 * Embedded Live NIL Radar Widget for the Financial Model View
 */
export const NilOpportunityWidget: React.FC<{
  growthScenario: GrowthScenario;
  onOpenModal: () => void;
}> = ({ growthScenario, onOpenModal }) => {
  const scenarioDeals = useMemo(() => {
    return DEFAULT_OPPORTUNITIES.filter((deal) => 
      deal.targetScenarios.includes(growthScenario)
    );
  }, [growthScenario]);

  const topDeal = scenarioDeals[0] || DEFAULT_OPPORTUNITIES[0];

  return (
    <div className="bg-[#10141D] rounded-lg border border-white/[0.08] p-5 space-y-4 shadow-lg relative overflow-hidden font-sans">
      
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-[#C89B3C]/5 blur-3xl pointer-events-none" />

      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-sm bg-[#1A202E] text-[#C89B3C] border border-[#C89B3C]/30 relative">
            <Bell size={15} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#68D391] animate-ping absolute top-0.5 right-0.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-semibold">
                NIL Opportunity Radar
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border font-bold text-[#68D391] bg-emerald-950/40 border-emerald-500/25">
                LIVE MARKET FEED
              </span>
            </div>
            <div className="text-xs text-neutral-400">
              Trending sponsorship categories mapped to <strong>{growthScenario} Growth Scenario</strong>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenModal}
          className="px-3 py-1.5 bg-[#171C26] hover:bg-[#202736] border border-white/10 hover:border-[#C89B3C]/40 text-neutral-200 hover:text-white rounded text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <span>Explore All {scenarioDeals.length} Deals</span>
          <ChevronRight size={13} className="text-[#C89B3C]" />
        </button>
      </div>

      {/* Trending Opportunities Quick Strip */}
      <div className="grid sm:grid-cols-3 gap-3">
        {scenarioDeals.slice(0, 3).map((deal) => (
          <div
            key={deal.id}
            onClick={onOpenModal}
            className="p-3.5 bg-[#0C0F16] rounded-md border border-white/[0.06] hover:border-[#C89B3C]/40 transition-all cursor-pointer group space-y-2 relative"
          >
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-[#C89B3C] font-semibold">{deal.category}</span>
              <span className="text-[#68D391] font-bold">{deal.trendingVelocity}</span>
            </div>

            <div className="text-xs font-bold text-white group-hover:text-[#E8C98B] transition-colors line-clamp-1">
              {deal.title}
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-white/5">
              <span className="text-neutral-400">Per Athlete:</span>
              <span className="text-[#E8C98B] font-bold">${deal.dealValuePerAthlete.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>{deal.brand}</span>
              <span>{deal.openRosterSpots} slots</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Insights Note */}
      <div className="text-[11px] font-mono text-neutral-400 flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <TrendingUp size={13} className="text-[#C89B3C]" />
          <span>
            {growthScenario === 'Conservative' && 'Local credit unions, academic SaaS, and healthcare sponsors commanding safe 1099 compliance.'}
            {growthScenario === 'Expected' && 'Peripheral brands, QSR gameday delivery, and clean hydration leading collegiate esports activations.'}
            {growthScenario === 'Aggressive' && 'National automotive, streetwear fashion drops, and 5G network partnerships driving 6-figure campus pools.'}
          </span>
        </div>
        <button
          onClick={onOpenModal}
          className="text-[#E8C98B] hover:underline cursor-pointer hidden md:inline shrink-0 ml-2"
        >
          View Full Allocation Board →
        </button>
      </div>

    </div>
  );
};
