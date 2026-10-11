import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Award, 
  Sparkles, 
  Share2, 
  Download, 
  Check, 
  Copy, 
  SlidersHorizontal, 
  ShieldCheck, 
  Gamepad2, 
  Trophy, 
  Smartphone, 
  ArrowRight, 
  RotateCcw, 
  Info, 
  Percent, 
  Calendar,
  Layers,
  CheckCircle2,
  Tv,
  ShoppingBag,
  Zap,
  Target,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SportTypeOption {
  id: string;
  name: string;
  category: 'Digital Sports' | 'Traditional Athletics' | 'STEM & Sim';
  baseCpmMultiplier: number;
  dealCadenceModifier: number;
  description: string;
  typicalSponsors: string[];
}

export const SPORT_OPTIONS: SportTypeOption[] = [
  {
    id: 'digital_fps',
    name: 'Tactical FPS (Valorant / CS2 / Apex)',
    category: 'Digital Sports',
    baseCpmMultiplier: 1.35,
    dealCadenceModifier: 1.25,
    description: 'Premier collegiate viewership, high-frequency Twitch streaming and tech hardware sponsorships.',
    typicalSponsors: ['PC Hardware OEMs', 'Energy Drinks', '5G Telecom', 'Gaming Peripherals']
  },
  {
    id: 'sim_motorsports',
    name: 'Sim Motorsports & Drone Racing (CRL / CDRL)',
    category: 'STEM & Sim',
    baseCpmMultiplier: 1.55,
    dealCadenceModifier: 1.15,
    description: 'Highest average deal yield backed by automotive OEMs and corporate engineering talent recruitment.',
    typicalSponsors: ['Automotive Brands', 'Aerospace Tech', 'Sim Gear', 'Industrial Robotics']
  },
  {
    id: 'moba_strategy',
    name: 'MOBA & Sports Esports (LoL / Rocket League)',
    category: 'Digital Sports',
    baseCpmMultiplier: 1.28,
    dealCadenceModifier: 1.20,
    description: 'Mass campus fanbases, high tournament engagement, and fast-casual food delivery partnerships.',
    typicalSponsors: ['QSR Food Delivery', 'Snack Foods', 'Apparel', 'Streaming Platforms']
  },
  {
    id: 'football_fbs',
    name: 'College Football (FBS / FCS Varsity)',
    category: 'Traditional Athletics',
    baseCpmMultiplier: 1.45,
    dealCadenceModifier: 1.30,
    description: 'Mass-market regional fame, gameday weekend activations, and premium consumer brand visibility.',
    typicalSponsors: ['Athletic Footwear', 'Sports Nutrition', 'Auto Dealerships', 'Consumer Banking']
  },
  {
    id: 'basketball_d1',
    name: "Men's / Women's Basketball (Division 1)",
    category: 'Traditional Athletics',
    baseCpmMultiplier: 1.40,
    dealCadenceModifier: 1.25,
    description: 'High individual athlete star power, March tournament spotlights, and lifestyle streetwear partnerships.',
    typicalSponsors: ['Sneaker Apparel', 'Hydration Drinks', 'Headphones Tech', 'Regional Retail']
  },
  {
    id: 'womens_olympic',
    name: "Women's Volleyball & Olympic Sports",
    category: 'Traditional Athletics',
    baseCpmMultiplier: 1.30,
    dealCadenceModifier: 1.10,
    description: 'Exceptionally high authentic engagement rates, wellness brands, and campus community endorsement.',
    typicalSponsors: ['Athleisure Apparel', 'Skin & Sun Care', 'Fitness Tech', 'Local Services']
  },
  {
    id: 'fgc_community',
    name: 'Fighting Game Community (FGC / Smash)',
    category: 'Digital Sports',
    baseCpmMultiplier: 1.20,
    dealCadenceModifier: 1.15,
    description: 'Hyper-engaged local collegiate scene with peer influence and high merchandise conversion.',
    typicalSponsors: ['Custom Fightsticks', 'Anime Apparel', 'Energy Bars', 'Community Events']
  },
  {
    id: 'creator_hybrid',
    name: 'Campus Content Creator / Multi-Sport Lead',
    category: 'Digital Sports',
    baseCpmMultiplier: 1.25,
    dealCadenceModifier: 1.35,
    description: 'Cross-over campus personality bridging university athletics with viral student lifestyle content.',
    typicalSponsors: ['Student Housing', 'Mobile Apps', 'Fashion DTC', 'Campus Dining']
  }
];

export interface ConferenceOption {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

export const CONFERENCE_OPTIONS: ConferenceOption[] = [
  { id: 'power_4', name: 'Power-4 Varsity Tier-1 (SEC, Big Ten, Big 12, ACC)', multiplier: 1.35, description: 'National broadcast exposure and premier collective donor pools.' },
  { id: 'group_of_5', name: 'Group of 5 / D1 Mid-Major (Mountain West, AAC, Sun Belt)', multiplier: 1.15, description: 'Strong regional loyalties and active local sponsor pools.' },
  { id: 'national_esports', name: 'National Varsity Digital League (CEX / CRL / NACE)', multiplier: 1.25, description: 'Sanctioned collegiate circuits with dedicated OTT and FAST carriage.' },
  { id: 'club_division', name: 'Campus Club & Grassroots Circuit', multiplier: 1.0, description: 'Direct campus community reach and peer-to-peer engagement.' }
];

export interface AthleticStandingOption {
  id: string;
  name: string;
  multiplier: number;
}

export const STANDING_OPTIONS: AthleticStandingOption[] = [
  { id: 'all_american', name: 'Conference MVP / All-American Standout (+45%)', multiplier: 1.45 },
  { id: 'starter_captain', name: 'Team Captain / Primary Varsity Starter (+25%)', multiplier: 1.25 },
  { id: 'varsity_roster', name: 'Active Varsity Rostered Competitor (Baseline)', multiplier: 1.0 },
  { id: 'developmental', name: 'Developmental / Academy Roster (-10%)', multiplier: 0.90 }
];

export interface AthletePreset {
  id: string;
  label: string;
  tagline: string;
  sportId: string;
  conferenceId: string;
  standingId: string;
  instagramFollowers: number;
  tiktokFollowers: number;
  streamingFollowers: number;
  engagementRatePct: number;
  monthlyCadenceDeals: number;
}

export const ATHLETE_PRESETS: AthletePreset[] = [
  {
    id: 'preset-fps-igl',
    label: 'Varsity Tactical FPS Captain',
    tagline: 'Valorant IGL streaming scrims with 45K combined reach',
    sportId: 'digital_fps',
    conferenceId: 'power_4',
    standingId: 'starter_captain',
    instagramFollowers: 14000,
    tiktokFollowers: 28000,
    streamingFollowers: 3800,
    engagementRatePct: 7.8,
    monthlyCadenceDeals: 3
  },
  {
    id: 'preset-sim-racer',
    label: 'CRL Sim Motorsports Pilot',
    tagline: 'Engineering student competing in collegiate telemetry racing',
    sportId: 'sim_motorsports',
    conferenceId: 'national_esports',
    standingId: 'all_american',
    instagramFollowers: 8500,
    tiktokFollowers: 16000,
    streamingFollowers: 2200,
    engagementRatePct: 8.5,
    monthlyCadenceDeals: 2
  },
  {
    id: 'preset-dual-threat',
    label: 'D1 Football Hybrid Streamer',
    tagline: 'Starting safety with gaming channel and lifestyle presence',
    sportId: 'football_fbs',
    conferenceId: 'power_4',
    standingId: 'starter_captain',
    instagramFollowers: 65000,
    tiktokFollowers: 110000,
    streamingFollowers: 12500,
    engagementRatePct: 5.6,
    monthlyCadenceDeals: 4
  },
  {
    id: 'preset-campus-micro',
    label: 'Campus Micro-Creator Leader',
    tagline: 'High-engagement dorm leader and club president',
    sportId: 'creator_hybrid',
    conferenceId: 'club_division',
    standingId: 'starter_captain',
    instagramFollowers: 6200,
    tiktokFollowers: 14500,
    streamingFollowers: 900,
    engagementRatePct: 10.4,
    monthlyCadenceDeals: 2
  }
];

export const StudentAthleteNilCalculator: React.FC<{
  onInspectOpportunities?: () => void;
}> = ({ onInspectOpportunities }) => {
  // --- STATE ---
  const [selectedSportId, setSelectedSportId] = useState<string>('digital_fps');
  const [selectedConferenceId, setSelectedConferenceId] = useState<string>('power_4');
  const [selectedStandingId, setSelectedStandingId] = useState<string>('starter_captain');

  // Social Reach Sliders
  const [instagramFollowers, setInstagramFollowers] = useState<number>(18000);
  const [tiktokFollowers, setTiktokFollowers] = useState<number>(34000);
  const [streamingFollowers, setStreamingFollowers] = useState<number>(4500); // Twitch/YT concurrent/subscriber equivalent
  const [engagementRatePct, setEngagementRatePct] = useState<number>(7.2);
  const [monthlyCadenceDeals, setMonthlyCadenceDeals] = useState<number>(3); // Number of commercial activations per month

  const [copiedLink, setCopiedLink] = useState(false);

  // Selected Option Objects
  const currentSport = useMemo(() => {
    return SPORT_OPTIONS.find(s => s.id === selectedSportId) || SPORT_OPTIONS[0];
  }, [selectedSportId]);

  const currentConference = useMemo(() => {
    return CONFERENCE_OPTIONS.find(c => c.id === selectedConferenceId) || CONFERENCE_OPTIONS[0];
  }, [selectedConferenceId]);

  const currentStanding = useMemo(() => {
    return STANDING_OPTIONS.find(st => st.id === selectedStandingId) || STANDING_OPTIONS[1];
  }, [selectedStandingId]);

  // Aggregate Reach
  const totalCombinedReach = useMemo(() => {
    return instagramFollowers + tiktokFollowers + streamingFollowers;
  }, [instagramFollowers, tiktokFollowers, streamingFollowers]);

  // Valuation Calculation Engine
  const valuation = useMemo(() => {
    // 1. Effective Engaged Reach
    // IG: $28 base CPM on engaged impressions
    // TikTok: $22 base CPM on engaged impressions
    // Streaming (Twitch/YT): $65 CPM on active viewership
    const igEngagedAudience = instagramFollowers * (engagementRatePct / 100);
    const ttEngagedAudience = tiktokFollowers * ((engagementRatePct * 0.9) / 100);
    const streamEngagedAudience = streamingFollowers * 1.5; // High value attention

    const baseMonthlySocialValue = 
      ((igEngagedAudience * 32) / 1000) +
      ((ttEngagedAudience * 24) / 1000) +
      ((streamEngagedAudience * 65) / 1000);

    // 2. Multipliers
    const sportMultiplier = currentSport.baseCpmMultiplier;
    const confMultiplier = currentConference.multiplier;
    const standingMultiplier = currentStanding.multiplier;

    const aggregateMultiplier = sportMultiplier * confMultiplier * standingMultiplier;

    // 3. Cadence scaling (base assumption is 2 deals, scales with cadence)
    const cadenceFactor = 0.5 + (monthlyCadenceDeals * 0.25);

    // 4. Gross Projected Monthly Commercial Inflow
    const grossMonthlyLiquidity = Math.max(
      450,
      Math.round(baseMonthlySocialValue * aggregateMultiplier * cadenceFactor)
    );

    // 5. Streams Breakdown (approximate distribution)
    const sponsoredPosts = Math.round(grossMonthlyLiquidity * 0.42);
    const liveStreams = Math.round(grossMonthlyLiquidity * 0.26);
    const gamedayAppearances = Math.round(grossMonthlyLiquidity * 0.16);
    const merchAffiliate = Math.round(grossMonthlyLiquidity * 0.16);

    // 6. Platform Take-Rate & Escrow
    const platformFeePct = 15; // College Company standard 15% smart-contract clearing take-rate
    const platformFee = Math.round(grossMonthlyLiquidity * (platformFeePct / 100));
    const netAthleteMonthly = grossMonthlyLiquidity - platformFee;

    // 7. Annual Run-Rates
    const grossAnnual = grossMonthlyLiquidity * 12;
    const netAnnual = netAthleteMonthly * 12;

    // 8. Benchmark comparisons
    const nationalAverageNCAA = 2850; // Annual average for non-Power-4 baseline
    const peerIndexRatio = (grossAnnual / (nationalAverageNCAA || 1)).toFixed(1);

    return {
      grossMonthlyLiquidity,
      netAthleteMonthly,
      platformFee,
      grossAnnual,
      netAnnual,
      streams: {
        sponsoredPosts,
        liveStreams,
        gamedayAppearances,
        merchAffiliate
      },
      peerIndexRatio
    };
  }, [
    instagramFollowers,
    tiktokFollowers,
    streamingFollowers,
    engagementRatePct,
    monthlyCadenceDeals,
    currentSport,
    currentConference,
    currentStanding
  ]);

  // Load Preset
  const handleLoadPreset = (preset: AthletePreset) => {
    setSelectedSportId(preset.sportId);
    setSelectedConferenceId(preset.conferenceId);
    setSelectedStandingId(preset.standingId);
    setInstagramFollowers(preset.instagramFollowers);
    setTiktokFollowers(preset.tiktokFollowers);
    setStreamingFollowers(preset.streamingFollowers);
    setEngagementRatePct(preset.engagementRatePct);
    setMonthlyCadenceDeals(preset.monthlyCadenceDeals);
  };

  // Copy Valuation Summary
  const handleCopyValuation = () => {
    const summary = `
College Company · Student-Athlete NIL Valuation Audit
--------------------------------------------------------
Sport Discipline: ${currentSport.name}
Competition Level: ${currentConference.name}
Athletic Standing: ${currentStanding.name}
Combined Social Reach: ${totalCombinedReach.toLocaleString()} followers
Verified Engagement Rate: ${engagementRatePct.toFixed(1)}%
Monthly Campaign Cadence: ${monthlyCadenceDeals} activations/month

PROJECTED MONTHLY LIQUIDITY:
Gross Monthly Commercial Value: $${valuation.grossMonthlyLiquidity.toLocaleString()}
Smart-Contract Clearing Fee (15%): $${valuation.platformFee.toLocaleString()}
NET DIRECT ATHLETE PAYOUT: $${valuation.netAthleteMonthly.toLocaleString()} / month

ANNUALIZED PROJECTION (12-Month Run-Rate):
Net Annual Athlete Earnings: $${valuation.netAnnual.toLocaleString()} / year
NCAA Benchmark Index: ${valuation.peerIndexRatio}x national baseline

REVENUE STREAM BREAKDOWN:
- Sponsored Social Posts: $${valuation.streams.sponsoredPosts.toLocaleString()}/mo
- Live Broadcast & Stream Overlays: $${valuation.streams.liveStreams.toLocaleString()}/mo
- Gameday & Campus Appearances: $${valuation.streams.gamedayAppearances.toLocaleString()}/mo
- Merch Royalties & Promo Affiliate: $${valuation.streams.merchAffiliate.toLocaleString()}/mo

Audited via Certified Collegiate Smart-Contract Escrow Clearing
--------------------------------------------------------
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Context Banner */}
      <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-48 bg-[#68D391]/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#68D391] uppercase tracking-wider font-semibold">
              <Zap size={14} />
              <span>Student-Athlete Commercial Diligence · Proprietary Valuation Engine</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Individual NIL Earnings Projection Calculator
            </h2>
            
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Estimate your monthly and annual commercial earning potential across collegiate digital sports, 
              varsity leagues, and traditional athletic circuits using verified brand deal multipliers, 
              social reach conversion, and Title IX smart-contract clearinghouse parameters.
            </p>
          </div>

          {/* Quick Presets Bar */}
          <div className="space-y-2 shrink-0">
            <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#C89B3C]" />
              <span>Load Verified Athlete Archetype:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ATHLETE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleLoadPreset(preset)}
                  className="bg-[#0B0E14] hover:bg-[#161B26] border border-white/10 hover:border-[#C89B3C]/50 p-2.5 rounded text-left transition-all cursor-pointer group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-[#E8C98B] transition-colors line-clamp-1">
                    {preset.label}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono line-clamp-1">
                    {preset.tagline}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Calculator Grid (Inputs vs Projected Outputs) */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: INTERACTIVE INPUT CONTROLS (7 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Sport & Athletic Profile */}
          <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-6 space-y-5 shadow-lg">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 text-xs font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
              <Trophy size={14} />
              <span>1. Collegiate Sport & Athletic Standing</span>
            </div>

            {/* Sport Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-300 flex items-center justify-between">
                <span>Select Primary Sport Discipline</span>
                <span className="text-neutral-500 text-[11px]">{currentSport.category}</span>
              </label>
              
              <div className="grid sm:grid-cols-2 gap-2">
                {SPORT_OPTIONS.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => setSelectedSportId(sport.id)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedSportId === sport.id
                        ? 'bg-[#181F2E] border-[#C89B3C] text-white shadow-sm'
                        : 'bg-[#0B0D13] border-white/5 text-neutral-400 hover:text-neutral-200 hover:border-white/15'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold font-sans line-clamp-1">{sport.name}</div>
                      <div className="text-[10px] text-neutral-500 line-clamp-2 mt-0.5">{sport.description}</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#C89B3C] mt-2 font-semibold">
                      +{Math.round((sport.baseCpmMultiplier - 1) * 100)}% CPM Premium
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conference & Standing Selection */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-300">Competition Tier</label>
                <select
                  value={selectedConferenceId}
                  onChange={(e) => setSelectedConferenceId(e.target.value)}
                  className="w-full bg-[#0B0D13] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded-lg p-2.5 text-xs text-white font-mono"
                >
                  {CONFERENCE_OPTIONS.map((conf) => (
                    <option key={conf.id} value={conf.id}>{conf.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-300">Roster Standing</label>
                <select
                  value={selectedStandingId}
                  onChange={(e) => setSelectedStandingId(e.target.value)}
                  className="w-full bg-[#0B0D13] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded-lg p-2.5 text-xs text-white font-mono"
                >
                  {STANDING_OPTIONS.map((st) => (
                    <option key={st.id} value={st.id}>{st.name}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Card 2: Social Reach & Audience Metrics */}
          <div className="bg-[#11141B] border border-white/[0.08] rounded-xl p-6 space-y-6 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
                <Smartphone size={14} />
                <span>2. Verified Social Reach & Audience Density</span>
              </div>
              <div className="text-xs font-mono text-neutral-400">
                Combined Reach: <strong className="text-white font-bold">{totalCombinedReach.toLocaleString()}</strong>
              </div>
            </div>

            {/* Slider 1: Instagram Reach */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  <span>Instagram Followers</span>
                </span>
                <span className="text-white font-bold">{instagramFollowers.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={500}
                max={250000}
                step={500}
                value={instagramFollowers}
                onChange={(e) => setInstagramFollowers(Number(e.target.value))}
                className="w-full accent-[#C89B3C] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>500</span>
                <span>100K</span>
                <span>250K+</span>
              </div>
            </div>

            {/* Slider 2: TikTok Reach */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>TikTok Followers</span>
                </span>
                <span className="text-white font-bold">{tiktokFollowers.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={500000}
                step={1000}
                value={tiktokFollowers}
                onChange={(e) => setTiktokFollowers(Number(e.target.value))}
                className="w-full accent-[#C89B3C] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>1,000</span>
                <span>250K</span>
                <span>500K+</span>
              </div>
            </div>

            {/* Slider 3: Live Stream (Twitch / YouTube) Reach */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Twitch / YouTube Live Followers / Subscribers</span>
                </span>
                <span className="text-white font-bold">{streamingFollowers.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={100}
                max={50000}
                step={100}
                value={streamingFollowers}
                onChange={(e) => setStreamingFollowers(Number(e.target.value))}
                className="w-full accent-[#C89B3C] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>100</span>
                <span>25,000</span>
                <span>50,000+</span>
              </div>
            </div>

            {/* Engagement Rate & Deal Frequency Sliders */}
            <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-white/[0.06]">
              {/* Engagement Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-300">Audience Engagement Rate</span>
                  <span className="text-[#68D391] font-bold">{engagementRatePct.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={15.0}
                  step={0.1}
                  value={engagementRatePct}
                  onChange={(e) => setEngagementRatePct(Number(e.target.value))}
                  className="w-full accent-[#68D391] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>1.0% (Average)</span>
                  <span>7.5% (High)</span>
                  <span>15.0% (Viral)</span>
                </div>
              </div>

              {/* Monthly Campaign Cadence */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-300">Monthly Brand Campaigns</span>
                  <span className="text-[#E8C98B] font-bold">{monthlyCadenceDeals} activations</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={monthlyCadenceDeals}
                  onChange={(e) => setMonthlyCadenceDeals(Number(e.target.value))}
                  className="w-full accent-[#E8C98B] bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>1 deal/mo</span>
                  <span>4 deals/mo</span>
                  <span>8 deals/mo</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: VALUATION RESULT & LIQUIDITY BREAKDOWN (5 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Earnings Projection Card */}
          <div className="bg-[#11141B] border border-[#C89B3C]/40 rounded-xl p-6 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-32 bg-[#C89B3C]/10 blur-2xl pointer-events-none" />

            {/* Eyebrow & Status */}
            <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.08] pb-3">
              <span className="text-[#C89B3C] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <ShieldCheck size={14} /> Fiduciary NIL Valuation
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-[#68D391] border border-emerald-500/30 font-bold">
                AUDIT READY
              </span>
            </div>

            {/* Highlight Metric: Net Monthly Direct Payout */}
            <div className="space-y-1">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Estimated Net Direct Athlete Payout
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
                  ${valuation.netAthleteMonthly.toLocaleString()}
                </span>
                <span className="text-sm font-mono text-[#68D391] font-semibold">/ month</span>
              </div>
              <div className="text-[11px] font-mono text-neutral-500">
                Gross commercial contract value: ${valuation.grossMonthlyLiquidity.toLocaleString()}/mo
              </div>
            </div>

            {/* Annual Run-Rate Banner */}
            <div className="bg-[#0B0E14] p-4 rounded-lg border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Projected 12-Month Annual Run-Rate:</span>
                <strong className="text-lg text-[#E8C98B] font-display font-bold">
                  ${valuation.netAnnual.toLocaleString()}
                </strong>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>NCAA National Benchmark:</span>
                <span className="text-[#68D391] font-bold">+{valuation.peerIndexRatio}x higher than baseline</span>
              </div>
            </div>

            {/* Detailed Payout Stream Breakdown */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold">
                Monthly Inflow by Commercial Stream:
              </div>

              <div className="space-y-2 text-xs font-mono">
                {/* Stream 1: Sponsored Social Posts */}
                <div className="bg-[#151922] p-2.5 rounded border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone size={13} className="text-pink-400" />
                    <span className="text-neutral-200">Sponsored Social Campaigns</span>
                  </div>
                  <span className="text-white font-bold">${valuation.streams.sponsoredPosts.toLocaleString()}</span>
                </div>

                {/* Stream 2: Live Streams & Overlays */}
                <div className="bg-[#151922] p-2.5 rounded border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tv size={13} className="text-purple-400" />
                    <span className="text-neutral-200">Live Broadcast & Stream Overlays</span>
                  </div>
                  <span className="text-white font-bold">${valuation.streams.liveStreams.toLocaleString()}</span>
                </div>

                {/* Stream 3: Gameday & Campus Appearances */}
                <div className="bg-[#151922] p-2.5 rounded border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy size={13} className="text-[#E8C98B]" />
                    <span className="text-neutral-200">Gameday & Campus Appearances</span>
                  </div>
                  <span className="text-white font-bold">${valuation.streams.gamedayAppearances.toLocaleString()}</span>
                </div>

                {/* Stream 4: Merchandise & Affiliate */}
                <div className="bg-[#151922] p-2.5 rounded border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={13} className="text-[#68D391]" />
                    <span className="text-neutral-200">Merch Royalties & Promo Affiliate</span>
                  </div>
                  <span className="text-white font-bold">${valuation.streams.merchAffiliate.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Smart-Contract Escrow & Clearinghouse Note */}
            <div className="bg-[#090C12] p-3 rounded border border-white/5 text-[11px] font-mono text-neutral-400 space-y-1">
              <div className="flex items-center justify-between text-neutral-300 font-semibold">
                <span>Smart-Contract Clearing:</span>
                <span>85% Net Payout / 15% Platform</span>
              </div>
              <p className="text-neutral-500 text-[10px] leading-relaxed">
                Clearinghouse guarantees automated tax withholding prep, Title IX compliance logging, 
                and escrow distribution into athlete accounts within 48 hours of deliverable verification.
              </p>
            </div>

            {/* Actions: Copy Summary & Route to NIL Radar */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCopyValuation}
                className="w-full py-2.5 bg-[#161B26] hover:bg-[#1E2536] border border-white/10 hover:border-[#C89B3C]/40 text-neutral-200 hover:text-white rounded text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedLink ? <Check size={14} className="text-[#68D391]" /> : <Copy size={14} className="text-[#C89B3C]" />}
                <span>{copiedLink ? 'Valuation Copied to Clipboard' : 'Copy Formal Valuation Summary'}</span>
              </button>

              {onInspectOpportunities && (
                <button
                  onClick={onInspectOpportunities}
                  className="w-full py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-bold text-xs uppercase tracking-wider rounded font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Explore Matching Deals in NIL Radar</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

          </div>

          {/* Institutional Compliance & Guidance Callout */}
          <div className="bg-[#0D1016] border border-white/[0.06] rounded-xl p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#C89B3C] font-semibold">
              <Info size={14} />
              <span>NCAA Bylaw 12 & State Compliance Notice</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              All commercial projections generated by College Company utilize audited, fair-market value (FMV) benchmarks. 
              Contracts are structured to ensure non-pay-for-play status, compliance with university licensing protocols, 
              and disclosure through official campus compliance portals.
            </p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500">
              <span>Clearinghouse Node: CC-NIL-VAL-2026</span>
              <span className="text-[#68D391]">Delaware C-Corp Protected</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
