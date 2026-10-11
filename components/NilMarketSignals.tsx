import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingUp, 
  Zap, 
  Target, 
  ArrowUpRight, 
  SlidersHorizontal, 
  Search, 
  Filter, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  X, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Building2, 
  Gamepad2, 
  Radio, 
  Layers, 
  BarChart2, 
  Activity,
  Flame,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type SignalCategory = 'All' | 'Gaming Genres' | 'Influencer Tiers' | 'Emerging Formats';

export interface MarketSignalItem {
  id: string;
  code: string;
  category: 'Gaming Genres' | 'Influencer Tiers' | 'Emerging Formats';
  title: string;
  subtitle: string;
  signalStrength: 'Strong Surge' | 'High Velocity' | 'Emerging Breakout' | 'Steady Expansion';
  momentumScore: number; // 0 - 100
  growthVelocityPct: number; // e.g. 168 = +168%
  timeframeLabel: string;
  avgDealYield: number; // in USD
  dealYieldRange: string;
  dealVolumeCount: number; // contracts logged
  totalPoolValue: string;
  complianceRating: number; // 0 - 100%
  primaryHoldingSynergy: string;
  primarySponsors: string[];
  trajectory: number[]; // 6 monthly normalized trend values (0-100)
  macroCatalyst: string;
  audienceProfile: string;
  sampleDeliverables: string[];
  fiduciaryTakeaway: string;
}

export const MARKET_SIGNALS_DATA: MarketSignalItem[] = [
  {
    id: 'sig-sim-motorsports',
    code: 'SIG-MOTO-01',
    category: 'Gaming Genres',
    title: 'Sim Motorsports & FPV Drone Aerobatics',
    subtitle: 'High-fidelity telemetry racing (CRL) & competitive STEM aeronautics (CDRL)',
    signalStrength: 'Strong Surge',
    momentumScore: 98,
    growthVelocityPct: 168,
    timeframeLabel: 'Last 180 Days',
    avgDealYield: 9400,
    dealYieldRange: '$6,500 – $22,000',
    dealVolumeCount: 840,
    totalPoolValue: '$7.89M',
    complianceRating: 99,
    primaryHoldingSynergy: 'Collegiate Racing League (CRL) · College Drone Racing (CDRL)',
    primarySponsors: ['Automotive OEMs', 'Defense & Aerospace Tech', 'Performance Fluids', 'Sim Hardware OEMs'],
    trajectory: [28, 42, 58, 75, 89, 100],
    macroCatalyst: 'Engineering and automotive brands are shifting high-ticket sponsorship dollars away from traditional motorsports into collegiate telemetry simulators, targeting prospective automotive engineering graduates and technical talent.',
    audienceProfile: 'Collegiate engineering, physics, and computer science majors with an 84% male-identifying skew and 72% household income over $100K.',
    sampleDeliverables: [
      'Can-bus telemetry overlay featuring sponsor branding during live broadcast',
      'Driver suit and sim-rig hardware badge integrations',
      'Campus engineering hackathon appearances featuring sponsor EV powertrains'
    ],
    fiduciaryTakeaway: 'Highest average deal size in collegiate digital sports due to enterprise technical recruitment budgets backing the sponsorship pools.'
  },
  {
    id: 'sig-campus-micro-creators',
    code: 'SIG-TIER-02',
    category: 'Influencer Tiers',
    title: 'Campus Micro-Creators (5K–25K Followers)',
    subtitle: 'Hyper-localized varsity athletes and dorm leaders driving unmatched conversion',
    signalStrength: 'Strong Surge',
    momentumScore: 96,
    growthVelocityPct: 194,
    timeframeLabel: 'Last 90 Days',
    avgDealYield: 3800,
    dealYieldRange: '$2,200 – $6,500',
    dealVolumeCount: 2450,
    totalPoolValue: '$9.31M',
    complianceRating: 98,
    primaryHoldingSynergy: 'College Esports NIL · College Creator Academy',
    primarySponsors: ['QSR & Fast Casual Food', 'Student Housing REITs', 'Regional Banking', 'Apparel Direct-to-Consumer'],
    trajectory: [32, 45, 60, 72, 86, 100],
    macroCatalyst: 'Fortune 500 brands have discovered that collegiate micro-creators generate 8.4% engagement rates compared to just 1.2% for celebrity mega-influencers. Brands deploy bulk regional allocations to activate entire conference dorms.',
    audienceProfile: 'Direct peer-to-peer campus student bodies (undergrads 18-22) with 94% on-campus residential density.',
    sampleDeliverables: [
      'Gameday dorm watch party catering promotion with exclusive campus promo link',
      'Weekly Instagram Stories and TikTok dorm study sessions featuring branded energy snacks',
      'On-campus pop-up booth activation at varsity student centers'
    ],
    fiduciaryTakeaway: 'Volume driver with the lowest transaction friction; smart-contract bulk clearinghouses capture a 15% platform liquidity take-rate with near-zero underwriting risk.'
  },
  {
    id: 'sig-tactical-fps',
    code: 'SIG-GEN-03',
    category: 'Gaming Genres',
    title: 'Tactical Team FPS (Valorant & Counter-Strike 2)',
    subtitle: 'Precision 5v5 varsity rosters anchoring premier broadcast viewership',
    signalStrength: 'High Velocity',
    momentumScore: 93,
    growthVelocityPct: 124,
    timeframeLabel: 'Last 180 Days',
    avgDealYield: 6200,
    dealYieldRange: '$3,800 – $14,500',
    dealVolumeCount: 1680,
    totalPoolValue: '$10.42M',
    complianceRating: 97,
    primaryHoldingSynergy: 'College Esports Expo (CEX) · College Esports TV',
    primarySponsors: ['PC Gaming Hardware', 'Energy Drinks', 'Telecommunications 5G', 'Pro Audio Tech'],
    trajectory: [40, 52, 64, 76, 85, 96],
    macroCatalyst: 'Varsity programs increasingly classify Tactical FPS as their flagship varsity sport due to established conference leagues (Big Ten, SEC digital divisions) and rigorous collegiate broadcasting parity.',
    audienceProfile: 'High-frequency digital sports viewers (18-24) watching 4.2 hours of competitive broadcasts weekly.',
    sampleDeliverables: [
      'In-game team naming rights and jersey emblem placement',
      'Post-match player MVP interview segment sponsored by telecommunications carriers',
      'High-refresh gaming monitor setup review posted across player TikTok and YouTube channels'
    ],
    fiduciaryTakeaway: 'Commands the highest broadcast viewer retention time (average watch session exceeds 52 minutes on College Esports TV FAST channels).'
  },
  {
    id: 'sig-dual-threat-athletes',
    code: 'SIG-TIER-04',
    category: 'Influencer Tiers',
    title: 'Dual-Threat Hybrid Athletes',
    subtitle: 'NCAA varsity athletes (Football/Basketball) with active gaming & streaming channels',
    signalStrength: 'High Velocity',
    momentumScore: 91,
    growthVelocityPct: 142,
    timeframeLabel: 'Last 90 Days',
    avgDealYield: 14500,
    dealYieldRange: '$8,000 – $45,000',
    dealVolumeCount: 420,
    totalPoolValue: '$6.09M',
    complianceRating: 96,
    primaryHoldingSynergy: 'College Esports NIL · College GTA · Esports Champions',
    primarySponsors: ['Global Athletic Footwear', 'Sports Nutrition & Hydration', 'Gaming Consoles', 'Consumer FinTech'],
    trajectory: [35, 48, 59, 70, 84, 95],
    macroCatalyst: 'Division 1 football and basketball roster athletes are livestreaming gaming sessions during off-hours, merging mainstream collegiate athletic prestige with digital gaming cultural credibility.',
    audienceProfile: 'Cross-over sports audience bridging traditional Saturday college football fans with Twitch/TikTok gaming enthusiasts.',
    sampleDeliverables: [
      'Co-branded gaming livestream from varsity athletic complex playing NCAA 25',
      'Footwear unboxing and tournament bracket prediction streams',
      'Dual-logo jersey capsule collection drop via College Esports Shop'
    ],
    fiduciaryTakeaway: 'Premium CPM tier yielding substantial multi-platform sponsor investments; requires strict NCAA Bylaw 12 and Title IX compliance clearing.'
  },
  {
    id: 'sig-fgc-grassroots',
    code: 'SIG-GEN-05',
    category: 'Gaming Genres',
    title: 'Fighting Game Community (FGC & Smash Brothers)',
    subtitle: 'Grassroots tournament circuits with intense collegiate regional followings',
    signalStrength: 'Emerging Breakout',
    momentumScore: 88,
    growthVelocityPct: 98,
    timeframeLabel: 'Last 180 Days',
    avgDealYield: 3200,
    dealYieldRange: '$1,800 – $7,200',
    dealVolumeCount: 1120,
    totalPoolValue: '$3.58M',
    complianceRating: 99,
    primaryHoldingSynergy: 'College Esports Tournaments · College Esports Expo',
    primarySponsors: ['Custom Fightstick OEMs', 'Beverage Brands', 'Casual Streetwear', 'Anime Streaming Services'],
    trajectory: [25, 38, 50, 68, 80, 91],
    macroCatalyst: 'In-person Friday night campus fight locals and regional brackets generate hyper-dense, passionate crowds with exceptional brand recall and zero corporate cynicism.',
    audienceProfile: 'Community-first collegiate competitors who travel regionally to LAN events and maintain high local peer influence.',
    sampleDeliverables: [
      'Custom arcade fightstick artwork featuring sponsor branding',
      'Exclusive tournament bracket naming rights for campus invitationals',
      'Community pizza and energy drink catering activation during double-elimination rounds'
    ],
    fiduciaryTakeaway: 'Grassroots authenticity prevents sponsor fatigue; yields the highest net sentiment score (+91 NPS) across all collegiate activations.'
  },
  {
    id: 'sig-broadcast-shoutcasters',
    code: 'SIG-TIER-06',
    category: 'Influencer Tiers',
    title: 'Collegiate Broadcast Talent & Shoutcasters',
    subtitle: 'Student on-air anchors, match analysts, and desk hosts securing commercial retainers',
    signalStrength: 'Emerging Breakout',
    momentumScore: 86,
    growthVelocityPct: 115,
    timeframeLabel: 'Last 180 Days',
    avgDealYield: 4500,
    dealYieldRange: '$2,500 – $9,000',
    dealVolumeCount: 580,
    totalPoolValue: '$2.61M',
    complianceRating: 100,
    primaryHoldingSynergy: 'College Esports TV · College Esports CO Documentary Studio',
    primarySponsors: ['Pro Audio Microphones', 'Studio Lighting', 'Corporate Apparel', 'Voice & AI Software'],
    trajectory: [30, 42, 54, 66, 78, 88],
    macroCatalyst: 'Collegiate journalism and communications students hosting varsity broadcasts are signing direct brand ambassador deals for studio gear, formal suits, and vocal health products.',
    audienceProfile: 'Collegiate broadcast viewers, aspiring media professionals, and collegiate athletics alumni.',
    sampleDeliverables: [
      'On-air studio headset and broadcast mic placement with verbal sponsor shoutout',
      'Pre-game desk segment: "Key Match Matchups presented by [Brand]"',
      'Behind-the-scenes broadcast production TikTok mini-series'
    ],
    fiduciaryTakeaway: 'Highly stable, repeatable monthly corporate contracts with zero amateurism friction and 100% regulatory compliance clearance.'
  },
  {
    id: 'sig-sandbox-creatives',
    code: 'SIG-GEN-07',
    category: 'Gaming Genres',
    title: 'Open-World Sandbox & Battle Royale',
    subtitle: 'Collegiate GTA roleplay communities, Minecraft architecture builds, and casual circuits',
    signalStrength: 'Steady Expansion',
    momentumScore: 84,
    growthVelocityPct: 82,
    timeframeLabel: 'Last 180 Days',
    avgDealYield: 4900,
    dealYieldRange: '$2,800 – $11,500',
    dealVolumeCount: 1350,
    totalPoolValue: '$6.61M',
    complianceRating: 95,
    primaryHoldingSynergy: 'College GTA · College Esports Media',
    primarySponsors: ['Cloud Server Hosting', 'Wireless Carriers', 'Consumer Snack Foods', 'Digital Collectibles'],
    trajectory: [45, 55, 65, 74, 82, 90],
    macroCatalyst: 'Collegiate dedicated custom servers (e.g. campus GTA RP networks and Minecraft campus 1:1 replicas) attract broad student participation beyond hardcore competitive esports.',
    audienceProfile: 'Mass-market college student body with balanced gender distribution (54% male, 46% female/non-binary).',
    sampleDeliverables: [
      'Virtual in-game billboards and sponsor branded storefronts inside custom campus servers',
      'Collegiate campus building speed-run sponsored competitions',
      'Branded digital cosmetic items distributed to all connected campus players'
    ],
    fiduciaryTakeaway: 'Broadest demographic reach across non-varsity students, making it ideal for mass-market consumer brands seeking campus-wide scale.'
  },
  {
    id: 'sig-gameday-creatives',
    code: 'SIG-TIER-08',
    category: 'Emerging Formats',
    title: 'Short-Form Gameday Production Guilds',
    subtitle: 'Student videographer & content creator squads capturing collegiate athletic culture',
    signalStrength: 'Strong Surge',
    momentumScore: 95,
    growthVelocityPct: 156,
    timeframeLabel: 'Last 90 Days',
    avgDealYield: 5600,
    dealYieldRange: '$3,200 – $12,800',
    dealVolumeCount: 780,
    totalPoolValue: '$4.37M',
    complianceRating: 98,
    primaryHoldingSynergy: 'College Creator Academy · College Esports Promo',
    primarySponsors: ['Smartphone OEMs', 'Gimbal & Camera Hardware', 'Cloud Storage Services', 'Music Streaming Platforms'],
    trajectory: [20, 36, 52, 70, 85, 99],
    macroCatalyst: 'Collegiate creator guilds produce cinematic 9:16 vertical reels recapping campus rivalry matches, tailgates, and arena finals. Brands sponsor the entire creator crew rather than individual athletes.',
    audienceProfile: 'Gen-Z mobile-first consumers with over 90% engagement occurring on Instagram Reels, TikTok, and YouTube Shorts.',
    sampleDeliverables: [
      'Cinematic vertical highlight reel tagged with "Shot on [Smartphone Flagship]"',
      'Exclusive sideline access content featuring sponsor apparel integration',
      'Collaborative carousel posts pinned to top of campus creator network feeds'
    ],
    fiduciaryTakeaway: 'Rapidly compounding format capturing high advertising CPMs ($28-$36 CPM) due to organic non-intrusive placement in student algorithm feeds.'
  }
];

export const NilMarketSignals: React.FC<{
  onInspectRadar?: () => void;
  externalSortOption?: 'Most Growth' | 'Highest Liquidity' | 'Alphabetical';
}> = ({ onInspectRadar, externalSortOption }) => {
  const [selectedCategory, setSelectedCategory] = useState<SignalCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'momentum' | 'growth' | 'yield' | 'alphabetical'>('growth');
  const [selectedSignal, setSelectedSignal] = useState<MarketSignalItem | null>(null);

  // Sync with external sort option from view header if provided
  useEffect(() => {
    if (!externalSortOption) return;
    if (externalSortOption === 'Most Growth') setSortBy('growth');
    else if (externalSortOption === 'Highest Liquidity') setSortBy('yield');
    else if (externalSortOption === 'Alphabetical') setSortBy('alphabetical');
  }, [externalSortOption]);

  // Filtered & Sorted Market Signals
  const filteredSignals = useMemo(() => {
    return MARKET_SIGNALS_DATA.filter((sig) => {
      const matchesCategory = selectedCategory === 'All' || sig.category === selectedCategory;
      const matchesSearch = 
        sig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sig.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sig.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sig.primarySponsors.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'growth') return b.growthVelocityPct - a.growthVelocityPct;
      if (sortBy === 'momentum') return b.momentumScore - a.momentumScore;
      if (sortBy === 'yield') return b.avgDealYield - a.avgDealYield;
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Aggregate Benchmark Analytics
  const aggregateMetrics = useMemo(() => {
    const totalSignals = MARKET_SIGNALS_DATA.length;
    const avgGrowth = Math.round(
      MARKET_SIGNALS_DATA.reduce((acc, s) => acc + s.growthVelocityPct, 0) / totalSignals
    );
    const avgYield = Math.round(
      MARKET_SIGNALS_DATA.reduce((acc, s) => acc + s.avgDealYield, 0) / totalSignals
    );
    const totalDeals = MARKET_SIGNALS_DATA.reduce((acc, s) => acc + s.dealVolumeCount, 0);

    return { totalSignals, avgGrowth, avgYield, totalDeals };
  }, []);

  return (
    <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-[#C89B3C]/5 blur-3xl pointer-events-none" />

      {/* Header & Feature Identification */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C89B3C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C89B3C]"></span>
            </span>
            <span>Market Signal Engine · Real-Time NIL Sector Growth Radar</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Emerging Growth Sectors & Inflow Momentum
          </h2>
          
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Algorithmic trend analysis isolating high-alpha collegiate digital niches, specific gaming disciplines, 
            and creator tiers where Fortune 500 capital allocations are expanding at 80%+ compound velocity.
          </p>
        </div>

        {/* Global Signal Aggregate Pill Bar */}
        <div className="flex items-center gap-3 bg-[#0A0D13] p-2.5 rounded-lg border border-white/5 font-mono text-xs shrink-0">
          <div className="px-3 py-1">
            <div className="text-[10px] text-neutral-500 uppercase">Tracked Sectors</div>
            <div className="text-base font-bold text-white">{aggregateMetrics.totalSignals} Signals</div>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="px-3 py-1">
            <div className="text-[10px] text-neutral-500 uppercase">Avg Growth Velocity</div>
            <div className="text-base font-bold text-[#68D391]">+{aggregateMetrics.avgGrowth}% YoY</div>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="px-3 py-1">
            <div className="text-[10px] text-neutral-500 uppercase">Logged Volume</div>
            <div className="text-base font-bold text-[#E8C98B]">{aggregateMetrics.totalDeals.toLocaleString()} Deals</div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {(['All', 'Gaming Genres', 'Influencer Tiers', 'Emerging Formats'] as SignalCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-md'
                  : 'bg-[#151922] text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2.5">
          {/* Keyword Search */}
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search genre or tier..."
              className="bg-[#0A0D13] border border-white/10 focus:border-[#C89B3C] focus:outline-none rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 w-44 sm:w-48 font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center bg-[#0A0D13] rounded border border-white/10 text-xs font-mono p-1">
            <span className="text-[11px] text-neutral-500 px-2">Sort:</span>
            <button
              onClick={() => setSortBy('growth')}
              className={`px-2 py-0.5 rounded transition-colors ${sortBy === 'growth' ? 'bg-[#222938] text-[#C89B3C] font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              Growth
            </button>
            <button
              onClick={() => setSortBy('momentum')}
              className={`px-2 py-0.5 rounded transition-colors ${sortBy === 'momentum' ? 'bg-[#222938] text-[#C89B3C] font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              Score
            </button>
            <button
              onClick={() => setSortBy('yield')}
              className={`px-2 py-0.5 rounded transition-colors ${sortBy === 'yield' ? 'bg-[#222938] text-[#C89B3C] font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              Yield
            </button>
            <button
              onClick={() => setSortBy('alphabetical')}
              className={`px-2 py-0.5 rounded transition-colors ${sortBy === 'alphabetical' ? 'bg-[#222938] text-[#C89B3C] font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              A–Z
            </button>
          </div>
        </div>

      </div>

      {/* Signal Cards Bento Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSignals.map((signal) => {
          return (
            <div
              key={signal.id}
              onClick={() => setSelectedSignal(signal)}
              className="bg-[#0C0F16] border border-white/[0.08] hover:border-[#C89B3C]/50 rounded-xl p-5 flex flex-col justify-between space-y-4 cursor-pointer transition-all hover:-translate-y-0.5 group shadow-lg"
            >
              {/* Card Top: Code & Momentum Badge */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-neutral-500 font-semibold tracking-wider">
                    {signal.code}
                  </span>
                  
                  {/* Dynamic Strength Pill */}
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                    signal.signalStrength === 'Strong Surge'
                      ? 'text-[#68D391] bg-emerald-950/40 border-emerald-500/30'
                      : signal.signalStrength === 'High Velocity'
                      ? 'text-[#E8C98B] bg-amber-950/40 border-amber-500/30'
                      : signal.signalStrength === 'Emerging Breakout'
                      ? 'text-[#38BDF8] bg-sky-950/40 border-sky-500/30'
                      : 'text-[#A855F7] bg-purple-950/40 border-purple-500/30'
                  }`}>
                    {signal.signalStrength}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-sm font-bold text-white font-display group-hover:text-[#E8C98B] transition-colors leading-snug line-clamp-1">
                    {signal.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                    {signal.subtitle}
                  </p>
                </div>

                {/* Miniature SVG Sparkline Trend Indicator */}
                <div className="bg-[#121622] p-2.5 rounded border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-400 flex items-center gap-1">
                      <TrendingUp size={11} className="text-[#68D391]" />
                      <span>Inflow Velocity:</span>
                    </span>
                    <span className="text-[#68D391] font-bold">+{signal.growthVelocityPct}%</span>
                  </div>

                  {/* SVG Trendline */}
                  <div className="h-8 w-full">
                    <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`grad-${signal.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#C89B3C" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#C89B3C" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Area Fill */}
                      <polygon
                        points={`0,30 ${signal.trajectory.map((val, idx) => `${(idx / (signal.trajectory.length - 1)) * 100},${30 - (val / 100) * 26}`).join(' ')} 100,30`}
                        fill={`url(#grad-${signal.id})`}
                      />
                      {/* Stroke Curve */}
                      <polyline
                        points={signal.trajectory.map((val, idx) => `${(idx / (signal.trajectory.length - 1)) * 100},${30 - (val / 100) * 26}`).join(' ')}
                        fill="none"
                        stroke="#C89B3C"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Key Metric Highlights */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-[#0A0D13] p-2 rounded border border-white/5">
                    <div className="text-[9px] text-neutral-500 uppercase">Avg Deal Size</div>
                    <div className="text-white font-bold mt-0.5">${signal.avgDealYield.toLocaleString()}</div>
                  </div>
                  <div className="bg-[#0A0D13] p-2 rounded border border-white/5">
                    <div className="text-[9px] text-neutral-500 uppercase">Signal Score</div>
                    <div className="text-[#E8C98B] font-bold mt-0.5">{signal.momentumScore}/100</div>
                  </div>
                </div>

                {/* Sponsor Inflow Tags */}
                <div className="flex flex-wrap gap-1">
                  {signal.primarySponsors.slice(0, 2).map((sp, idx) => (
                    <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#161B26] text-neutral-300 border border-white/5">
                      {sp}
                    </span>
                  ))}
                  {signal.primarySponsors.length > 2 && (
                    <span className="text-[9px] font-mono px-1 py-0.5 text-neutral-500">
                      +{signal.primarySponsors.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-neutral-500">{signal.dealVolumeCount} Contracts</span>
                <span className="text-[#C89B3C] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold text-[11px]">
                  <span>Analyze</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Signal Due-Diligence Drawer / Deep-Dive Modal */}
      {selectedSignal && (
        <div 
          onClick={() => setSelectedSignal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150 font-sans"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0D1017] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative"
          >
            {/* Top Accent Strip */}
            <div className="h-1 bg-gradient-to-r from-amber-600 via-[#C89B3C] to-emerald-500 w-full" />

            {/* Modal Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-start justify-between bg-[#11141E]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#C89B3C] font-semibold">{selectedSignal.code}</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-400">{selectedSignal.category}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ml-1 ${
                    selectedSignal.signalStrength === 'Strong Surge'
                      ? 'text-[#68D391] bg-emerald-950/40 border-emerald-500/30'
                      : 'text-[#E8C98B] bg-amber-950/40 border-amber-500/30'
                  }`}>
                    {selectedSignal.signalStrength}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white font-display">
                  {selectedSignal.title}
                </h2>
                <p className="text-xs text-neutral-400">
                  {selectedSignal.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedSignal(null)}
                className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-300">
              
              {/* Primary Quantitative Pulse Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="bg-[#121622] p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Growth Velocity</div>
                  <div className="text-lg font-bold text-[#68D391] mt-0.5">+{selectedSignal.growthVelocityPct}%</div>
                  <div className="text-[10px] text-neutral-400">{selectedSignal.timeframeLabel}</div>
                </div>
                <div className="bg-[#121622] p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Avg Deal Yield</div>
                  <div className="text-lg font-bold text-white mt-0.5">${selectedSignal.avgDealYield.toLocaleString()}</div>
                  <div className="text-[10px] text-neutral-400">{selectedSignal.dealYieldRange}</div>
                </div>
                <div className="bg-[#121622] p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Est. Sector Pool</div>
                  <div className="text-lg font-bold text-[#E8C98B] mt-0.5">{selectedSignal.totalPoolValue}</div>
                  <div className="text-[10px] text-neutral-400">{selectedSignal.dealVolumeCount} Verified Deals</div>
                </div>
                <div className="bg-[#121622] p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Compliance Grade</div>
                  <div className="text-lg font-bold text-white mt-0.5">{selectedSignal.complianceRating}%</div>
                  <div className="text-[10px] text-[#68D391]">Title IX Cleared</div>
                </div>
              </div>

              {/* Macro Growth Driver / Catalyst */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-semibold flex items-center gap-1.5">
                  <Zap size={13} />
                  <span>Macro Economic Catalyst</span>
                </div>
                <p className="text-neutral-300 leading-relaxed bg-[#0A0D13] p-4 rounded-lg border border-white/5">
                  {selectedSignal.macroCatalyst}
                </p>
              </div>

              {/* Audience Demographics & Conversion */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                  <Users size={13} className="text-[#38BDF8]" />
                  <span>Audience Profile & Consumer Skew</span>
                </div>
                <p className="text-neutral-400 leading-relaxed bg-[#0A0D13] p-3.5 rounded-lg border border-white/5">
                  {selectedSignal.audienceProfile}
                </p>
              </div>

              {/* Typical Contract Deliverables */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#68D391]" />
                  <span>Verified Contract Deliverables</span>
                </div>
                <div className="space-y-1.5">
                  {selectedSignal.sampleDeliverables.map((deliv, idx) => (
                    <div key={idx} className="bg-[#121620] p-2.5 rounded border border-white/5 flex items-start gap-2 text-xs">
                      <span className="text-[#C89B3C] font-mono font-bold mt-0.5">0{idx + 1}.</span>
                      <span className="text-neutral-200">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Holding Synergy & Fiduciary Capture */}
              <div className="bg-[#151A26] p-4 rounded-lg border border-[#C89B3C]/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#C89B3C] uppercase font-bold">College Company Capture Strategy</span>
                  <span className="text-neutral-400 text-[11px]">{selectedSignal.primaryHoldingSynergy}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {selectedSignal.fiduciaryTakeaway}
                </p>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-[#0A0D14] border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-500">
                Audited via Smart Contract Escrow Clearing
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSignal(null)}
                  className="px-4 py-2 rounded border border-white/10 text-neutral-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
                {onInspectRadar && (
                  <button
                    onClick={() => {
                      setSelectedSignal(null);
                      onInspectRadar();
                    }}
                    className="px-4 py-2 rounded bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-bold text-xs uppercase tracking-wider font-mono transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>View Live Inflow Opportunities</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
