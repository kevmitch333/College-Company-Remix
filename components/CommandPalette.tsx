import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  SlidersHorizontal, 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  BarChart3, 
  Radio, 
  Scale, 
  Layers, 
  MapPin, 
  Sparkles,
  Trophy,
  ExternalLink,
  BookOpen,
  Briefcase,
  Users,
  Mail
} from 'lucide-react';

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Holdings' | 'Financials' | 'Strategy' | 'Governance & Rules' | 'Intelligence' | 'Audience Pathways';
  action: () => void;
  badge?: string;
  icon: React.ReactNode;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: any[];
  onSelectBrand: (brand: any) => void;
  onNavigate: (tab: 'overview' | 'holdings' | 'strategy' | 'financials' | 'governance' | 'editorial', subTab?: string) => void;
  onOpenModal: (modal: 'prospectus' | 'memo' | 'nil_alerts' | 'network' | 'compliance') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  portfolioData,
  onSelectBrand,
  onNavigate,
  onOpenModal
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via parent or window event
        }
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build searchable index of all tools, holdings, rules, and chapters
  const allItems: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [];

    // 1. Audience Pathways
    items.push(
      {
        id: 'aud-universities',
        title: 'Pathway: Universities & Athletic Directors',
        subtitle: 'Amateurism shield, Title IX alignment, 400+ campus footprint & 6-week validation sprint',
        category: 'Audience Pathways',
        action: () => {
          onNavigate('holdings', 'map');
          onClose();
        },
        badge: 'Universities',
        icon: <Building2 size={16} className="text-[#C89B3C]" />
      },
      {
        id: 'aud-investors',
        title: 'Pathway: Institutional Investors & Allocators',
        subtitle: 'Series A mandate, $1.4B TAM simulator, capital structure & executive memorandum',
        category: 'Audience Pathways',
        action: () => {
          onNavigate('financials', 'simulator');
          onClose();
        },
        badge: 'Investors',
        icon: <DollarSign size={16} className="text-[#68D391]" />
      },
      {
        id: 'aud-brands',
        title: 'Pathway: Fortune 500 Brands & NIL Agencies',
        subtitle: '14,000+ rostered student-athletes, verified escrow clearinghouse & FAST television reach',
        category: 'Audience Pathways',
        action: () => {
          onOpenModal('nil_alerts');
          onClose();
        },
        badge: 'Brands',
        icon: <Trophy size={16} className="text-[#38BDF8]" />
      },
      {
        id: 'aud-athletes',
        title: 'Pathway: Student-Athletes & Creators',
        subtitle: 'Annual NIL monetization calculator, protected scholarship status & escrow payouts',
        category: 'Audience Pathways',
        action: () => {
          onNavigate('financials', 'athlete_calculator');
          onClose();
        },
        badge: 'Athletes',
        icon: <Sparkles size={16} className="text-[#F6AD55]" />
      }
    );

    // 2. Core Quantitative Tools & Simulators
    items.push(
      {
        id: 'tool-tam-sim',
        title: 'TAM & Yield Simulator',
        subtitle: 'Interactive quantitative model projecting campus licensing, NIL take-rate & FAST revenues',
        category: 'Financials',
        action: () => {
          onNavigate('financials', 'simulator');
          onClose();
        },
        badge: 'Interactive Tool',
        icon: <SlidersHorizontal size={16} className="text-[#C89B3C]" />
      },
      {
        id: 'tool-nil-analytics',
        title: 'NIL Analytics & Liquidity Trends',
        subtitle: 'Historical growth curves, deal volume trends & sport-by-sport sponsorship benchmarks',
        category: 'Financials',
        action: () => {
          onNavigate('financials', 'nil_analytics');
          onClose();
        },
        badge: 'Data Visual',
        icon: <BarChart3 size={16} className="text-[#68D391]" />
      },
      {
        id: 'tool-nil-calc',
        title: 'Student-Athlete NIL Valuation Calculator',
        subtitle: 'Interactive earnings model by conference, varsity tier, and social following engagement',
        category: 'Financials',
        action: () => {
          onNavigate('financials', 'athlete_calculator');
          onClose();
        },
        badge: 'Calculator',
        icon: <DollarSign size={16} className="text-[#38BDF8]" />
      }
    );

    // 3. Geographic Maps & Ecosystem Visualizations
    items.push(
      {
        id: 'vis-campus-map',
        title: 'National Campus Footprint & Conference Map',
        subtitle: 'Interactive D3 map of 400+ collegiate institutions, Big Ten, SEC, ACC & state metrics',
        category: 'Holdings',
        action: () => {
          onNavigate('holdings', 'map');
          onClose();
        },
        badge: 'Interactive Map',
        icon: <MapPin size={16} className="text-[#C89B3C]" />
      },
      {
        id: 'vis-topology',
        title: 'Operating Holding Ecosystem Topology',
        subtitle: 'Interactive hierarchical architecture map across all 4 synergistic operating divisions',
        category: 'Holdings',
        action: () => {
          onNavigate('holdings', 'topology');
          onClose();
        },
        badge: 'Architecture',
        icon: <Layers size={16} className="text-[#A78BFA]" />
      }
    );

    // 4. Strategic Plan Chapters (v1.0)
    items.push(
      {
        id: 'strat-engine',
        title: 'Strategic Plan: 4-Function Operating Engine',
        subtitle: 'Rights aggregation, production syndication, commercial clearinghouse & campus software',
        category: 'Strategy',
        action: () => {
          onNavigate('strategy');
          onClose();
        },
        badge: 'Strategy v1.0',
        icon: <Layers size={16} className="text-[#C89B3C]" />
      },
      {
        id: 'strat-disposition',
        title: '43-Asset Commercial Disposition Matrix',
        subtitle: 'Monetization posture, stage maturity, and operating priority across all 43 digital brands',
        category: 'Strategy',
        action: () => {
          onNavigate('strategy');
          onClose();
        },
        badge: 'Portfolio Matrix',
        icon: <Briefcase size={16} className="text-[#E8C98B]" />
      },
      {
        id: 'strat-campus-sprint',
        title: '6-Week Campus Program Sprint Unit Economics',
        subtitle: 'Phased rollout protocol from varsity charter to commercial sponsor integration',
        category: 'Strategy',
        action: () => {
          onNavigate('strategy');
          onClose();
        },
        badge: 'Unit Economics',
        icon: <Sparkles size={16} className="text-[#68D391]" />
      },
      {
        id: 'strat-firewall',
        title: 'Educational & Rights Firewall Protocol',
        subtitle: 'Fiduciary boundary isolating commercial brand deals from student academic records',
        category: 'Strategy',
        action: () => {
          onNavigate('strategy');
          onClose();
        },
        badge: 'Compliance Shield',
        icon: <ShieldCheck size={16} className="text-[#38BDF8]" />
      }
    );

    // 5. Governance & Institutional Fiduciary
    items.push(
      {
        id: 'gov-compliance-dashboard',
        title: 'Institutional Compliance & Bylaw Alignment Dashboard',
        subtitle: 'Automated regulatory monitoring, live Proprietary AI Engine telemetry & 50-state bylaw matrix',
        category: 'Governance & Rules',
        action: () => {
          onNavigate('governance', 'compliance-dashboard');
          onClose();
        },
        badge: 'Automated Engine',
        icon: <ShieldCheck size={16} className="text-emerald-400" />
      },
      {
        id: 'gov-rules-repo',
        title: 'Athletic Rules & Compliance Repository',
        subtitle: 'Codified NCAA Bylaw 14.2, NAIA Eligibility, Title IX equity protocols & state NIL mandates',
        category: 'Governance & Rules',
        action: () => {
          onNavigate('governance', 'repository');
          onClose();
        },
        badge: 'Legal Bylaws',
        icon: <Scale size={16} className="text-[#C89B3C]" />
      },
      {
        id: 'gov-risk-matrix',
        title: 'Institutional Risk Factors & Mitigation Matrix',
        subtitle: 'Analysis of publisher licensing, antitrust legislation, and macroeconomic mitigations',
        category: 'Governance & Rules',
        action: () => {
          onNavigate('governance', 'risks');
          onClose();
        },
        badge: 'Risk Matrix',
        icon: <ShieldCheck size={16} className="text-[#E53E3E]" />
      },
      {
        id: 'gov-memo',
        title: 'Executive Summary Memorandum & Charter',
        subtitle: 'Complete institutional briefing document authored by Kevin Mitchell, Managing Member',
        category: 'Governance & Rules',
        action: () => {
          onNavigate('governance', 'memo');
          onClose();
        },
        badge: 'Executive Brief',
        icon: <FileText size={16} className="text-[#E8C98B]" />
      }
    );

    // 6. Intelligence & Research
    items.push(
      {
        id: 'intel-market-wire',
        title: 'Live Grounded Market Intelligence Wire',
        subtitle: 'Real-time research wire tracking House v. NCAA, conference media deals & FAST expansion',
        category: 'Intelligence',
        action: () => {
          onNavigate('editorial', 'market_wire');
          onClose();
        },
        badge: 'Live Wire',
        icon: <Radio size={16} className="text-[#68D391]" />
      },
      {
        id: 'intel-articles',
        title: 'Thought Leadership Articles & Editorial',
        subtitle: 'Executive essays on the structural realignment of college athletics and creator capital',
        category: 'Intelligence',
        action: () => {
          onNavigate('editorial', 'editorial');
          onClose();
        },
        badge: 'Publications',
        icon: <BookOpen size={16} className="text-[#38BDF8]" />
      },
      {
        id: 'intel-newsletter',
        title: 'Subscribe to Weekly Market Intelligence Briefing',
        subtitle: 'Weekly institutional updates delivered Mondays at 7:00 AM EST to athletic directors & investors',
        category: 'Intelligence',
        action: () => {
          onNavigate('editorial', 'newsletter');
          onClose();
        },
        badge: 'Weekly Dispatch',
        icon: <Mail size={16} className="text-[#C89B3C]" />
      }
    );

    // 7. Modals & Quick Dialogs
    items.push(
      {
        id: 'modal-prospectus',
        title: 'Request Series A Institutional Prospectus',
        subtitle: 'Confidential capital allocation brief, DCF model & data room credentialing form',
        category: 'Audience Pathways',
        action: () => {
          onOpenModal('prospectus');
          onClose();
        },
        badge: 'Direct Action',
        icon: <FileText size={16} className="text-[#C89B3C]" />
      },
      {
        id: 'modal-nil-radar',
        title: 'Inspect NIL Opportunity Radar',
        subtitle: 'Real-time commercial sponsorship categories, brand bids & active deal requests',
        category: 'Financials',
        action: () => {
          onOpenModal('nil_alerts');
          onClose();
        },
        badge: 'Direct Action',
        icon: <Radio size={16} className="text-[#E8C98B]" />
      },
      {
        id: 'modal-network',
        title: 'Accredited Member Directory & Secure Messaging',
        subtitle: 'Direct communication portal with managing directors, advisors and partner campuses',
        category: 'Audience Pathways',
        action: () => {
          onOpenModal('network');
          onClose();
        },
        badge: 'Direct Action',
        icon: <Users size={16} className="text-[#68D391]" />
      }
    );

    // 8. All 43 Portfolio Brand Holdings
    portfolioData.forEach((brand) => {
      items.push({
        id: `brand-${brand.id}`,
        title: brand.name,
        subtitle: `${brand.division} · ${brand.tagline || brand.thesis?.slice(0, 75)}`,
        category: 'Holdings',
        action: () => {
          onSelectBrand(brand);
          onClose();
        },
        badge: brand.cluster || brand.status,
        icon: <Briefcase size={16} className="text-[#C89B3C]" />
      });
    });

    return items;
  }, [portfolioData, onNavigate, onSelectBrand, onOpenModal, onClose]);

  // Filter items based on query and category
  const filteredItems = useMemo(() => {
    let result = allItems;

    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
      );
    }

    return result;
  }, [allItems, query, selectedCategory]);

  // Handle keyboard navigation inside the list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const categories = ['All', 'Audience Pathways', 'Holdings', 'Financials', 'Strategy', 'Governance & Rules', 'Intelligence'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#0F1218] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/[0.08] flex items-center gap-3 bg-[#131722]">
          <Search size={18} className="text-[#C89B3C] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search 43 holdings, TAM models, NCAA bylaws, strategy chapters..."
            className="w-full bg-transparent text-white text-sm placeholder-neutral-500 focus:outline-none font-sans"
          />
          {query ? (
            <button 
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white transition-colors"
            >
              <X size={15} />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Filter Categories Horizontal Bar */}
        <div className="px-4 py-2 border-b border-white/[0.06] bg-[#0C0E14] flex items-center gap-1.5 overflow-x-auto text-xs font-mono no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-2.5 py-1 rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C89B3C] text-[#090A0C] font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div ref={listRef} className="overflow-y-auto divide-y divide-white/[0.04] p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-xs font-mono">
              No matching assets, tools, or bylaws found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-white/[0.08] border border-white/10' 
                      : 'hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded bg-[#161B26] border border-white/10 shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-xs truncate font-display">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-neutral-400 border border-white/10 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden md:inline text-[10px] font-mono text-neutral-500 uppercase">
                      {item.category}
                    </span>
                    <ArrowRight size={13} className={`transition-transform ${isSelected ? 'text-[#C89B3C] translate-x-0.5' : 'text-neutral-600'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2.5 bg-[#0A0D12] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/5 border border-white/10 rounded text-[9px]">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/5 border border-white/10 rounded text-[9px]">ENTER</kbd>
              <span>Select</span>
            </span>
          </div>
          <span>{filteredItems.length} indexed items</span>
        </div>
      </div>
    </div>
  );
};
