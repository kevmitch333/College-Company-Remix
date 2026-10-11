import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  Trophy, 
  Scale, 
  DollarSign, 
  ArrowUpRight, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Share2,
  Copy,
  Check,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type FaqCategory = 
  | 'All' 
  | 'Holding Strategy & Moats' 
  | 'Publisher IP & Governance' 
  | 'House v. NCAA & NIL Economics' 
  | 'Financials & Exit Horizons';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  shortAnswer: string;
  fullAnswer: string[];
  fiduciaryKeyTakeaway: string;
  keyMetricBadge?: string;
  relatedHoldings: string[];
}

export const INVESTOR_FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-01',
    category: 'Holding Strategy & Moats',
    question: 'Why consolidate 43 entities under one holding company rather than backing a single esports platform?',
    shortAnswer: 'Fragmented collegiate esports mimics 1960s collegiate football: massive student enthusiasm with zero unified institutional infrastructure.',
    fullAnswer: [
      'Single-point esports tech platforms consistently fail because of exorbitant Customer Acquisition Cost (CAC) and cyclical video game publisher dependencies. When a platform depends on a single game title or single service, it is vulnerable to developer updates and community migrations.',
      'By consolidating 43 category-defining intellectual properties across Competitive Leagues (CEX, CRL, CDRL), Media Rights (College Esports TV), NIL Clearinghouses (High School NIL, College NIL Hub), and Campus AI Infrastructure (College Revenue Share, FMV Audits), College Company operates an integrated flywheel.',
      'Audience captured at competitive tournaments seamlessly flows into our linear FAST television network, our commercial NIL talent roster, and our collegiate campus events—driving near-zero organic customer acquisition and multiple diversified high-margin cash flow streams.'
    ],
    fiduciaryKeyTakeaway: 'The holding company structure extracts multi-entity operational synergies while eliminating single-title or single-platform obsolescence risk.',
    keyMetricBadge: 'Zero Paid CAC Organic Flywheel',
    relatedHoldings: ['College Esports Expo (CEX)', 'College Esports TV', 'College Esports NIL', 'College Racing League (CRL)']
  },
  {
    id: 'faq-02',
    category: 'Publisher IP & Governance',
    question: 'How does College Company monetize collegiate esports without owning the underlying video game publisher IP?',
    shortAnswer: 'We operate as the collegiate competitive infrastructure, media syndicator, and commercial clearinghouse—analogous to how Learfield, the NCAA, or ESPN monetize college sports.',
    fullAnswer: [
      'Neither the NCAA nor ESPN owns the sport of football or basketball, nor do they manufacture footballs or basketball shoes. Their enterprise value resides entirely in the collegiate competitive calendar, student-athlete rosters, campus rivalry narratives, live broadcast rights, and brand sponsorship packaging.',
      'Similarly, College Company does not seek to be a video game publisher. Major game publishers maintain publisher community guidelines that actively permit sanctioned third-party non-exclusive intercollegiate collegiate circuits and club tournaments.',
      'Corporate enterprise sponsors and national commercial brands do not pay to license the video game software—they pay College Company to access 400+ campus student bodies, stadium broadcast impressions, and verified collegiate student-athlete NIL brand integrations.'
    ],
    fiduciaryKeyTakeaway: 'Avoids multi-hundred-million-dollar game development CapEx while capturing 100% of collegiate corporate sponsorship, FAST advertising, and event ticket gross margin.',
    keyMetricBadge: 'Learfield / NCAA Operating Model',
    relatedHoldings: ['College Esports Champions', 'College Drone Racing League (CDRL)', 'College Esports Media']
  },
  {
    id: 'faq-03',
    category: 'Holding Strategy & Moats',
    question: 'What is the defensibility and tangible valuation of owning 43 category-defining generic domains?',
    shortAnswer: 'Generic category-defining digital real estate provides permanent organic search authority, unreplicable institutional credibility, and natural monopoly branding.',
    fullAnswer: [
      'In digital media, generic category-defining assets (such as CEX, CDRL, highschoolnil.com, collegenilhub.com, collegeesportsnil.com, collegerevenueshare.com) represent irreproducible digital real estate. They establish College Company as the default institutional standard across university athletic departments, sponsors, and search engines.',
      'A generic domain acts as an indestructible moat against competing venture-backed startups: any startup attempting to establish credibility among 4,000 university administrations must spend millions on pay-per-click advertising, whereas College Company commands direct type-in traffic and permanent organic domain authority.',
      'During secondary recapitalization or institutional buyout, these 43 generic trademark and domain assets form a pristine intellectual property foundation that sports and media conglomerates covet for defensive market dominance.'
    ],
    fiduciaryKeyTakeaway: 'Permanent organic search authority eliminates ongoing marketing CAC and establishes an institutional sovereign barrier to entry.',
    keyMetricBadge: '43 Generic Category Domains',
    relatedHoldings: ['College Esports Online', 'College Esports Promo', 'College Esports News', 'College Esports Camp']
  },
  {
    id: 'faq-04',
    category: 'House v. NCAA & NIL Economics',
    question: 'How does the historic $2.8B House v. NCAA revenue-sharing settlement impact College Company?',
    shortAnswer: 'The settlement accelerates athletic department budget strain, driving universities to outsource auxiliary digital sports and third-party NIL compliance.',
    fullAnswer: [
      'The landmark preliminary approval of the House v. NCAA settlement mandates that Power-4 university athletic departments begin directly distributing up to $20M–$22.5M annually in commercial revenue to varsity athletes starting in the 2025–26 academic calendar.',
      'This historic financial burden forces university athletic directors to streamline internal operations and cut non-revenue Olympic sports budgets. Athletic departments cannot afford to hire dedicated in-house personnel to manage emerging digital gaming divisions, esports arenas, or multi-platform NIL contracts.',
      'College Company provides the turnkey external operating partner: universities license our competitive circuits (CEX, CRL) and compliance-cleared clearinghouse (College Esports NIL) to deliver varsity digital athletics and commercial brand deals to students without burdening the university balance sheet.'
    ],
    fiduciaryKeyTakeaway: 'University athletic department budget compression under House v. NCAA makes external operating holding companies a structural necessity.',
    keyMetricBadge: '$20M–$22.5M/Yr Revenue Sharing Tailwind',
    relatedHoldings: ['College Esports NIL', 'College Esports Innovation', 'College Creator Academy']
  },
  {
    id: 'faq-05',
    category: 'House v. NCAA & NIL Economics',
    question: 'What is College Company’s clearinghouse take-rate and unit economics on commercial NIL contracts?',
    shortAnswer: 'College Esports NIL charges a standard 15% platform clearinghouse fee on corporate brand campaigns, passing 85% directly to student-athletes.',
    fullAnswer: [
      'Unlike predatory rogue booster collectives operating in regulatory gray zones, College Esports NIL operates as an audited institutional commercial marketplace backed by smart contracts and automated escrow accounts.',
      'Brands deposit campaign budgets into escrow; student-athletes complete verified deliverables (sponsored live streams, gameday broadcast overlays, social reels, campus appearances); upon automated compliance verification, 85% is disbursed to the athlete and College Company retains 15%.',
      'Because contract drafting, compliance auditing, and deliverable verification are automated via software, the gross margin on this 15% take-rate exceeds 68%, generating high-velocity cash flow that scales with macro NIL volume.'
    ],
    fiduciaryKeyTakeaway: 'High-margin 15% platform take-rate with near-zero marginal cost per transaction, insulated from regulatory compliance liability.',
    keyMetricBadge: '15% Clearinghouse Take-Rate · 68% Margin',
    relatedHoldings: ['College Esports NIL', 'College Esports Promo', 'College Creator Academy']
  },
  {
    id: 'faq-06',
    category: 'Publisher IP & Governance',
    question: 'How does the portfolio mitigate video game meta shifts and title obsolescence risk?',
    shortAnswer: 'Our operating architecture is publisher-agnostic across 4 diversified athletic disciplines with long-term commercial shelf-lives.',
    fullAnswer: [
      'Rather than tying our balance sheet to a single publisher’s release cycle, College Company’s portfolio spans 4 permanent athletic genres:',
      '1. Tactical FPS (Valorant, Counter-Strike 2): Core strategic collegiate rivalries with decade-long global league stability.',
      '2. Sim Motorsports & Telemetry Racing (CRL): Physics-based collegiate racing supported by automotive OEMs and engineering schools.',
      '3. Autonomous & FPV Drone Piloting (CDRL): Hardware-centric STEM competition attracting aerospace and defense corporate sponsorships.',
      '4. Mass-Market Sandbox Communities (College GTA, Minecraft): Campus custom servers driving broad student engagement beyond traditional esports.',
      'If student demographics rotate from one title to another, our tournament hardware, campus broadcast infrastructure, and sponsor packaging seamlessly transfer to the incoming game title without write-downs.'
    ],
    fiduciaryKeyTakeaway: 'Title-agnostic infrastructure ensures sustained sponsor retention regardless of individual video game release cycles.',
    keyMetricBadge: '4 Diversified Genre Verticals',
    relatedHoldings: ['College Racing League (CRL)', 'College Drone Racing League (CDRL)', 'College GTA', 'College Esports Expo']
  },
  {
    id: 'faq-07',
    category: 'Financials & Exit Horizons',
    question: 'What is the projected capital deployment plan and liquidity exit timeline for Series A investors?',
    shortAnswer: 'A disciplined 36–48 month horizon targeting secondary institutional private equity recapitalization or strategic sports conglomerate buyout.',
    fullAnswer: [
      'Series A capital ($15M target) is allocated across three high-ROI strategic pillars:',
      '• Campus Footprint Expansion (40%): Convert our existing 400+ grassroots campus gaming club relationships into 150 formal university athletic department varsity partnerships with multi-year facility licensing.',
      '• FAST Television & Linear Carriage (35%): Expand College Esports TV distribution across major connected-TV platforms (Samsung TV Plus, Roku Channel, Pluto TV), scaling high-CPM automated programmatic video advertising inventory.',
      '• Enterprise NIL Clearinghouse Software (25%): Deepen automated NCAA compliance reporting, institutional Title IX verification, and sponsor escrow processing throughput.',
      'Target Exit Horizons: Strategic acquisition by collegiate sports rights consolidators (e.g. Learfield, Playfly Sports, Endeavor / TKO, Warner Bros Discovery Sports) or a majority private equity recapitalization at a projected 6.5x–9.0x Enterprise Value / Forward Revenue multiple.'
    ],
    fiduciaryKeyTakeaway: 'Capital-efficient growth model designed for clear 3–4 year liquidity through strategic acquisition by incumbent sports media consolidators.',
    keyMetricBadge: '36–48 Month Liquidity Horizon',
    relatedHoldings: ['College Esports TV', 'College Esports Expo', 'College Esports NIL', 'College Company Holding']
  }
];

export const InvestorStrategyFaq: React.FC<{
  onRequestMemorandum?: () => void;
  onOpenMemo?: () => void;
}> = ({ onRequestMemorandum, onOpenMemo }) => {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-01');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered FAQ Items
  const filteredFaqs = useMemo(() => {
    return INVESTOR_FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery = 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fiduciaryKeyTakeaway.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.relatedHoldings.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleCopyAnswer = (e: React.MouseEvent, item: FaqItem) => {
    e.stopPropagation();
    const textToCopy = `Q: ${item.question}\n\nSummary: ${item.shortAnswer}\n\nKey Fiduciary Takeaway: ${item.fiduciaryKeyTakeaway}\n\nSource: College Company Institutional Due Diligence (Series A)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="bg-[#0E1118] border border-white/[0.08] rounded-xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-[#C89B3C]/5 blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
            <HelpCircle size={15} />
            <span>Institutional Due Diligence · Investor FAQ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Collegiate Digital Sports Holding Strategy: Investor FAQ
          </h2>

          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Direct, fiduciary answers to common inquiries from institutional venture partners, 
            university endowment boards, and sports media consolidators regarding our multi-entity 
            holding architecture, intellectual property rights, and macro monetization strategy.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onRequestMemorandum && (
            <button
              onClick={onRequestMemorandum}
              className="px-4 py-2 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <FileText size={13} />
              <span>Series A Due Diligence</span>
            </button>
          )}

          {onOpenMemo && (
            <button
              onClick={onOpenMemo}
              className="px-4 py-2 bg-[#171B24] hover:bg-[#202532] border border-white/15 text-white font-medium text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Thesis Brief</span>
              <ArrowUpRight size={13} className="text-neutral-400" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {([
            'All',
            'Holding Strategy & Moats',
            'Publisher IP & Governance',
            'House v. NCAA & NIL Economics',
            'Financials & Exit Horizons'
          ] as FaqCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-md'
                  : 'bg-[#141822] text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {category === 'All' ? 'All Inquiries' : category}
            </button>
          ))}
        </div>

        {/* In-View Search Input */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="bg-[#0A0D13] border border-white/10 focus:border-[#C89B3C] focus:outline-none rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 w-full sm:w-64 font-mono"
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

      {/* Accordion FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const isExpanded = expandedId === faq.id;
          const isCopied = copiedId === faq.id;

          return (
            <div
              key={faq.id}
              className={`border rounded-xl transition-all overflow-hidden ${
                isExpanded 
                  ? 'bg-[#121622] border-[#C89B3C]/50 shadow-xl' 
                  : 'bg-[#0E121A] border-white/[0.07] hover:border-white/20'
              }`}
            >
              {/* Question Header Accordion Trigger */}
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A2030] text-[#E8C98B] border border-white/5 font-semibold">
                      {faq.category}
                    </span>
                    {faq.keyMetricBadge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-[#68D391] border border-emerald-500/30 font-bold flex items-center gap-1">
                        <CheckCircle2 size={10} />
                        <span>{faq.keyMetricBadge}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-display leading-snug">
                    {faq.question}
                  </h3>

                  {!isExpanded && (
                    <p className="text-xs text-neutral-400 font-sans line-clamp-1 pt-0.5">
                      {faq.shortAnswer}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-1">
                  <div className={`p-1.5 rounded-full border transition-all ${
                    isExpanded 
                      ? 'bg-[#C89B3C] text-[#090A0C] border-[#C89B3C]' 
                      : 'bg-[#181C26] text-neutral-400 border-white/10'
                  }`}>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </button>

              {/* Expanded Answer Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-white/5 space-y-5">
                      
                      {/* Detailed Multi-Paragraph Answer */}
                      <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                        {faq.fullAnswer.map((para, pIdx) => (
                          <p key={pIdx} className="leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Institutional Fiduciary Takeaway Callout */}
                      <div className="bg-[#0A0D14] p-4 rounded-lg border border-[#C89B3C]/30 space-y-1.5">
                        <div className="text-[11px] font-mono text-[#C89B3C] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                          <TrendingUp size={13} />
                          <span>Fiduciary Due Diligence Takeaway:</span>
                        </div>
                        <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                          {faq.fiduciaryKeyTakeaway}
                        </p>
                      </div>

                      {/* Footer: Portfolio Synergy Links & Share Action */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs font-mono">
                        <div className="flex flex-wrap items-center gap-1.5 text-neutral-400">
                          <span className="text-[11px] text-neutral-500">Related Assets:</span>
                          {faq.relatedHoldings.map((holding, hIdx) => (
                            <span 
                              key={hIdx}
                              className="text-[10px] px-2 py-0.5 rounded bg-[#161B26] text-neutral-300 border border-white/5"
                            >
                              {holding}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={(e) => handleCopyAnswer(e, faq)}
                          className="self-start sm:self-auto px-3 py-1 rounded bg-[#161B26] hover:bg-[#1E2536] border border-white/10 text-neutral-300 hover:text-white text-[11px] font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Copy formal diligence answer for investment committee review"
                        >
                          {isCopied ? (
                            <>
                              <Check size={12} className="text-[#68D391]" />
                              <span className="text-[#68D391] font-semibold">Copied to Clipboard</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} className="text-[#C89B3C]" />
                              <span>Copy Diligence Summary</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12 space-y-3 bg-[#11141C] rounded-xl border border-white/5">
          <HelpCircle size={28} className="text-neutral-500 mx-auto" />
          <h4 className="text-base font-bold text-white font-display">No questions matched your search</h4>
          <p className="text-xs text-neutral-400 font-mono">Try adjusting your keyword or reset category filter.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-4 py-1.5 bg-[#161B26] hover:bg-[#1E2536] text-white rounded text-xs font-mono border border-white/10"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Bottom Diligence Direct Inquiry Box */}
      <div className="bg-[#111520] p-6 rounded-xl border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="text-[11px] font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
            Institutional Confidential Inquiry
          </div>
          <h4 className="text-lg font-bold text-white font-display">
            Have a specific regulatory or fiduciary question not covered here?
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Our founding managing directors and regulatory compliance counsel are available for 
            private confidential briefings with accredited venture partners, university regents, and athletic directors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onRequestMemorandum && (
            <button
              onClick={onRequestMemorandum}
              className="px-5 py-2.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer"
            >
              Schedule Confidential Briefing
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
