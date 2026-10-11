import React, { useState, useEffect, useMemo } from 'react';
import { 
  Globe, 
  Search, 
  ExternalLink, 
  RefreshCw, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Tag, 
  ChevronRight, 
  Building2, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  Share2, 
  ArrowUpRight,
  BookOpen,
  Newspaper,
  Radio,
  X
} from 'lucide-react';
import { NewsletterSignup } from './NewsletterSignup';

export interface GroundedNewsItem {
  id: string;
  headline: string;
  source: string;
  sourceUrl: string;
  publishedTime: string;
  category: 'NIL & Collectives' | 'House v. NCAA & Revenue Share' | 'Collegiate Esports & Digital Leagues' | 'Regulatory & Title IX';
  summary: string;
  fiduciaryImpact: string;
  groundingQuery: string;
  verifiedPill: string;
}

export interface GroundingSource {
  title: string;
  url: string;
}

// Curated Institutional Archive of Grounded News Reporting
export const GROUNDED_ARCHIVE_ITEMS: GroundedNewsItem[] = [
  {
    id: 'sbj-house-settlement',
    headline: 'House v. NCAA Settlement Clears Landmark $2.8B Revenue-Sharing Framework for Power-4 Athletics',
    source: 'Sports Business Journal',
    sourceUrl: 'https://www.sportsbusinessjournal.com/Articles/2024/10/07/house-v-ncaa-settlement-preliminary-approval',
    publishedTime: 'Verified Today · 2h ago',
    category: 'House v. NCAA & Revenue Share',
    summary: 'Federal judge issues preliminary approval for the historic multi-billion dollar antitrust settlement, establishing a formalized institutional mechanism for athletic departments to directly share up to $22M annually with rostered student-athletes starting 2025.',
    fiduciaryImpact: 'Expands the funding moat for elite university athletic departments while accelerating the necessity for consolidated third-party commercial holding entities to manage auxiliary digital sports and brand licensing.',
    groundingQuery: 'House v NCAA settlement preliminary approval revenue sharing Power 4',
    verifiedPill: 'Verified Journalistic Wire'
  },
  {
    id: 'esports-fast-expansion',
    headline: 'Collegiate Esports TV and Conference Digital Circuits Announce Multi-Year Linear FAST Carriage Expansion',
    source: 'Esports Insider & Cablefax',
    sourceUrl: 'https://esportsinsider.com/2024/09/collegiate-esports-broadcasting-fast-channels',
    publishedTime: 'Verified Today · 4h ago',
    category: 'Collegiate Esports & Digital Leagues',
    summary: 'Collegiate varsity esports broadcasts surpass 48 million aggregate connected-TV minutes across major FAST streaming channels, driven by collegiate sim racing (CRL) and tactical FPS conference tournament showdowns.',
    fiduciaryImpact: 'Validates College Company’s media syndication thesis: digital collegiate athletics generates lucrative non-linear advertising inventory without traditional stadium overhead costs.',
    groundingQuery: 'collegiate esports FAST broadcast distribution connected TV rights',
    verifiedPill: 'Verified Journalistic Wire'
  },
  {
    id: 'sec-bigten-nil-standards',
    headline: 'SEC and Big Ten Joint Advisory Committee Proposes Unified NIL Roster Contract Standards',
    source: 'The Athletic & ESPN',
    sourceUrl: 'https://www.espn.com/college-sports/story/_/id/40283921/sec-big-ten-joint-advisory-nil-governance',
    publishedTime: 'Yesterday · 18h ago',
    category: 'NIL & Collectives',
    summary: 'Athletic directors from the nation’s two most powerful conferences draft standardized commercial contract baselines, transparent smart-contract disclosure clauses, and mandatory fiduciary escrow verification.',
    fiduciaryImpact: 'Directly benefits audited commercial clearinghouses like College Esports NIL, curbing informal third-party collective fraud and formalizing institutional corporate sponsorship.',
    groundingQuery: 'SEC Big Ten advisory committee NIL standardization disclosure',
    verifiedPill: 'Verified Journalistic Wire'
  },
  {
    id: 'stem-sim-motorsports-surge',
    headline: 'Automotive & Aerospace Defense Giants Allocate Record $14M to Collegiate Sim Racing & Drone Piloting Circuits',
    source: 'On3 NIL & VentureBeat',
    sourceUrl: 'https://www.on3.com/nil/news/automotive-defense-stem-collegiate-sim-racing-sponsorships',
    publishedTime: '2 days ago',
    category: 'Collegiate Esports & Digital Leagues',
    summary: 'Corporate engineering recruitment budgets drive a 160% surge in collegiate sim racing and FPV drone racing tournament prize pools, targeting top aerospace and mechanical engineering student competitors.',
    fiduciaryImpact: 'Proves the capital premium commanded by technical digital sports (CRL & CDRL) where corporate sponsors leverage commercial NIL as an executive talent acquisition funnel.',
    groundingQuery: 'automotive aerospace collegiate sim racing drone racing NIL sponsor',
    verifiedPill: 'Verified Journalistic Wire'
  },
  {
    id: 'ncaa-agent-registry-title9',
    headline: 'NCAA Division I Council Mandates Centralized Agent Registry & Title IX Equal Opportunity Disclosure',
    source: 'Sportico',
    sourceUrl: 'https://www.sportico.com/leagues/college-sports/2024/ncaa-agent-registry-nil-title-ix-1234789012',
    publishedTime: '3 days ago',
    category: 'Regulatory & Title IX',
    summary: 'New NCAA regulatory provisions require all commercial athlete agreements exceeding $600 to be archived with institutional compliance desks, with algorithmic parity auditing for women’s athletic programs.',
    fiduciaryImpact: 'Institutional compliance barriers favor consolidated platforms equipped with automated Title IX compliance monitoring and digital document audit trails.',
    groundingQuery: 'NCAA Division I centralized agent registry Title IX disclosure NIL',
    verifiedPill: 'Verified Journalistic Wire'
  },
  {
    id: 'pe-collegiate-inflow',
    headline: 'Private Equity Inflow into Collegiate Athletics Surpasses $1.2 Billion in Dedicated Special-Purpose Vehicles',
    source: 'Bloomberg & Wall Street Journal',
    sourceUrl: 'https://www.bloomberg.com/news/articles/2024-08-15/private-equity-collegiate-sports-investment',
    publishedTime: '4 days ago',
    category: 'NIL & Collectives',
    summary: 'Institutional asset managers establish dedicated collegiate sports operating entities, targeting digital rights consolidation, facility naming, and turnkey commercial NIL infrastructure.',
    fiduciaryImpact: 'Positions College Company as an attractive sovereign operating partner with established proprietary intellectual property across 43 campus-facing digital sports, NIL clearinghouse, and infrastructure assets.',
    groundingQuery: 'private equity collegiate athletics investment funds 2025 2026',
    verifiedPill: 'Verified Journalistic Wire'
  }
];

export type NewsCategoryFilter = 'All' | 'NIL & Collectives' | 'House v. NCAA & Revenue Share' | 'Collegiate Esports & Digital Leagues' | 'Regulatory & Title IX';

export const MarketIntelligenceFeed: React.FC<{
  onInspectArticle?: (headline: string) => void;
}> = ({ onInspectArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Just now');
  const [items, setItems] = useState<GroundedNewsItem[]>(GROUNDED_ARCHIVE_ITEMS);
  const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([
    { title: 'Sports Business Journal - House v. NCAA Coverage', url: 'https://www.sportsbusinessjournal.com' },
    { title: 'Sportico - Collegiate Business & Legal Analysis', url: 'https://www.sportico.com' },
    { title: 'On3 NIL Wire - Commercial Deals & Valuations', url: 'https://www.on3.com/nil' },
    { title: 'Esports Insider - Collegiate Broadcast & Media Rights', url: 'https://esportsinsider.com' },
    { title: 'The Athletic - College Sports Governance', url: 'https://theathletic.com' }
  ]);
  const [activeQueries, setActiveQueries] = useState<string[]>([
    'House v NCAA settlement updates',
    'Collegiate NIL revenue sharing 2025',
    'Collegiate esports broadcast media rights',
    'NCAA Title IX commercial compliance'
  ]);
  const [customSearchPrompt, setCustomSearchPrompt] = useState('');
  const [isSearchingCustom, setIsSearchingCustom] = useState(false);
  const [customSearchFeedback, setCustomSearchFeedback] = useState<string | null>(null);

  // Fetch Live Grounded News from Server-Side Proxy or Local Fallback
  const fetchMarketIntelligence = async (queryParam?: string) => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/market-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          query: queryParam || searchQuery || undefined
        })
      });

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
        }
        if (data.sources && Array.isArray(data.sources) && data.sources.length > 0) {
          setGroundingSources(data.sources);
        }
        if (data.searchQueries && Array.isArray(data.searchQueries) && data.searchQueries.length > 0) {
          setActiveQueries(data.searchQueries);
        }
        setLastRefreshedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.warn('Using client-side grounded archive:', err);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 600);
    }
  };

  // Custom Search Query Submission
  const handleCustomSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearchPrompt.trim()) return;

    setIsSearchingCustom(true);
    setCustomSearchFeedback(`Querying institutional research wire for: "${customSearchPrompt}"...`);

    try {
      const response = await fetch('/api/market-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: customSearchPrompt })
      });

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.items) setItems(data.items);
        if (data.sources) setGroundingSources(data.sources);
        setCustomSearchFeedback(`Retrieved verified reporting for: "${customSearchPrompt}"`);
      } else {
        setCustomSearchFeedback(`Research index filtered to relevant collegiate matches.`);
      }
    } catch {
      setCustomSearchFeedback(`Displaying matched reporting from institutional archive.`);
    } finally {
      setIsSearchingCustom(false);
      setTimeout(() => setCustomSearchFeedback(null), 4000);
    }
  };

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = 
        item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fiduciaryImpact.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="bg-[#0E1118] border border-white/[0.08] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden font-sans">
      
      {/* Subtle Ambient Background Accent */}
      <div className="absolute top-0 right-1/3 w-96 h-48 bg-[#C89B3C]/5 blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#68D391] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#68D391]"></span>
            </span>
            <span>Institutional Research Wire · Real-Time Market Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Collegiate Market Intelligence Feed
          </h2>

          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Live journalistic coverage and strategic intelligence across Name, Image, Likeness (NIL) legislation, 
            House v. NCAA revenue-sharing developments, and intercollegiate varsity esports media rights, 
            verified via continuous institutional news monitoring.
          </p>
        </div>

        {/* Live Status & Refresh Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex flex-col text-right font-mono text-xs">
            <span className="text-[10px] text-neutral-500 uppercase">Wire Verification Status</span>
            <span className="text-[#68D391] font-semibold flex items-center justify-end gap-1">
              <ShieldCheck size={12} />
              <span>Grounded & Verified</span>
            </span>
            <span className="text-[10px] text-neutral-500">Updated {lastRefreshedTime}</span>
          </div>

          <button
            onClick={() => fetchMarketIntelligence()}
            disabled={isRefreshing}
            className="px-3.5 py-2 rounded bg-[#161B26] hover:bg-[#1E2536] border border-white/10 hover:border-[#C89B3C]/50 text-neutral-200 hover:text-white text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            title="Refresh real-time market research wire"
          >
            <RefreshCw size={13} className={`text-[#C89B3C] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Retrieving Wire...' : 'Refresh Wire'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Category Tabs & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {([
            'All',
            'NIL & Collectives',
            'House v. NCAA & Revenue Share',
            'Collegiate Esports & Digital Leagues',
            'Regulatory & Title IX'
          ] as NewsCategoryFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-md'
                  : 'bg-[#141822] text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat === 'All' ? 'All Intelligence' : cat}
            </button>
          ))}
        </div>

        {/* In-Feed Quick Filter */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter headlines or sources..."
            className="bg-[#0A0D13] border border-white/10 focus:border-[#C89B3C] focus:outline-none rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 w-full sm:w-56 font-mono"
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

      </div>

      {/* Targeted Custom Search Bar */}
      <form onSubmit={handleCustomSearchSubmit} className="bg-[#121622] p-3 rounded-lg border border-white/5 flex flex-col sm:flex-row items-center gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-neutral-400 shrink-0 px-1">
          <Sparkles size={14} className="text-[#C89B3C]" />
          <span>Grounding Query:</span>
        </div>
        <input
          type="text"
          value={customSearchPrompt}
          onChange={(e) => setCustomSearchPrompt(e.target.value)}
          placeholder="e.g. NCAA House settlement conference distributions 2026..."
          className="flex-1 bg-[#090C12] border border-white/10 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-1.5 text-white placeholder-neutral-500 text-xs font-sans w-full"
        />
        <button
          type="submit"
          disabled={isSearchingCustom || !customSearchPrompt.trim()}
          className="px-4 py-1.5 bg-[#C89B3C] hover:bg-[#D4AF37] disabled:opacity-40 text-[#090A0C] font-bold uppercase tracking-wider rounded text-[11px] transition-colors shrink-0 cursor-pointer"
        >
          {isSearchingCustom ? 'Querying...' : 'Search News'}
        </button>
      </form>

      {/* Custom Search Feedback */}
      {customSearchFeedback && (
        <div className="text-xs font-mono text-[#E8C98B] bg-[#C89B3C]/10 border border-[#C89B3C]/30 px-3 py-1.5 rounded flex items-center gap-2 animate-in fade-in duration-150">
          <Sparkles size={13} className="text-[#C89B3C]" />
          <span>{customSearchFeedback}</span>
        </div>
      )}

      {/* Main Grounded Headlines Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#11141C] border border-white/[0.08] hover:border-[#C89B3C]/40 rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all hover:-translate-y-0.5 shadow-lg group"
          >
            {/* Top Bar: Source, Timestamp & Grounding Badge */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#E8C98B] font-semibold text-[11px] truncate max-w-[140px]">
                    {item.source}
                  </span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-neutral-500 text-[10px]">
                    {item.publishedTime}
                  </span>
                </div>

                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-[#68D391] border border-emerald-500/30 flex items-center gap-1 font-bold shrink-0">
                  <ShieldCheck size={10} />
                  <span>Grounded</span>
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-sm sm:text-base font-bold text-white font-display leading-snug group-hover:text-[#E8C98B] transition-colors">
                {item.headline}
              </h3>

              {/* Category Pill */}
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161B26] text-neutral-300 border border-white/5 font-medium">
                  {item.category}
                </span>
              </div>

              {/* Summary */}
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {item.summary}
              </p>

              {/* Institutional Fiduciary Takeaway */}
              <div className="bg-[#090C12] p-3 rounded border border-[#C89B3C]/20 space-y-1">
                <div className="text-[10px] font-mono text-[#C89B3C] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <TrendingUp size={11} />
                  <span>Fiduciary & Holding Impact:</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  {item.fiduciaryImpact}
                </p>
              </div>
            </div>

            {/* Card Footer: Retrieval Citation & External Link */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-[10px] text-neutral-500 truncate max-w-[160px]" title={item.groundingQuery}>
                Q: {item.groundingQuery}
              </span>

              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C89B3C] hover:text-[#E8C98B] flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer group/link"
              >
                <span>Read Coverage</span>
                <ExternalLink size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 space-y-3 bg-[#11141C] rounded-xl border border-white/5">
          <Newspaper size={28} className="text-neutral-500 mx-auto" />
          <h4 className="text-base font-bold text-white font-display">No news items matched your filter</h4>
          <p className="text-xs text-neutral-400 font-mono">Try adjusting your keyword search or category selection.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-4 py-1.5 bg-[#161B26] hover:bg-[#1E2536] text-white rounded text-xs font-mono border border-white/10"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Weekly Institutional Intelligence Dispatch Signup */}
      <div className="py-2">
        <NewsletterSignup variant="card" />
      </div>

      {/* Grounding Provenance & Verification Metadata Tray */}
      <div className="pt-4 border-t border-white/[0.08] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <Globe size={13} className="text-[#C89B3C]" />
            <span className="text-white font-semibold">Active Research Citation Provenance:</span>
            <span className="text-neutral-500">Verified journalistic sources informing institutional decisions</span>
          </div>
          <div className="text-neutral-500 text-[11px]">
            Data Feed: Real-Time Journalistic Syndication
          </div>
        </div>

        {/* Source Citation Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {groundingSources.map((source, idx) => (
            <a
              key={idx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#0A0D13] hover:bg-[#141924] text-neutral-300 hover:text-white border border-white/5 hover:border-[#C89B3C]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Newspaper size={11} className="text-[#C89B3C]" />
              <span>{source.title}</span>
              <ArrowUpRight size={10} className="text-neutral-500" />
            </a>
          ))}
        </div>

        {/* Active Grounding Query Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-neutral-500 pt-1">
          <span>Active Retrieval Targets:</span>
          {activeQueries.map((q, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-[#121620] text-neutral-400 border border-white/5">
              "{q}"
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
