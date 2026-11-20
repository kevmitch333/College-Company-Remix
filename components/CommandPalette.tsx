import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
  BookOpen,
  Trophy,
  DollarSign,
  ShieldCheck,
  Building2,
  Compass,
  Radio,
} from 'lucide-react';
import { PROGRAMS, DOOR_META, DoorKey, ProgramStatus } from '../src/data/programs';
import { RESEARCH_WIRE_ITEMS } from '../src/rssData';
import { useModalA11y } from './public/useModalA11y';

export interface SearchIndexItem {
  id: string;
  title: string;
  doorOrSection: 'Learn' | 'Compete' | 'Earn' | 'Trust' | 'About & Info' | 'Research Wire';
  description: string;
  status?: ProgramStatus;
  path: string;
  hash?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePath: (path: string, hash?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigatePath,
}) => {
  const [query, setQuery] = useState('');
  const [selectedDoor, setSelectedDoor] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useModalA11y(isOpen, onClose, dialogRef, inputRef);

  const allItems: SearchIndexItem[] = useMemo(() => {
    const list: SearchIndexItem[] = [];

    // 1. The 4 Doors
    (['learn', 'compete', 'earn', 'trust'] as DoorKey[]).forEach((key) => {
      const door = DOOR_META[key];
      list.push({
        id: `door-${key}`,
        title: `${door.label} Door Overview`,
        doorOrSection: door.label,
        description: door.headline,
        path: door.path,
      });
    });

    // 2. All 14 Real Program Pages
    PROGRAMS.forEach((p) => {
      list.push({
        id: `prog-${p.id}`,
        title: p.name,
        doorOrSection: p.doorLabel,
        description: p.oneLine,
        status: p.status,
        path: p.path,
      });
    });

    // 3. Key Site Pages
    list.push(
      {
        id: 'page-institutions',
        title: 'For Institutions & Partners',
        doorOrSection: 'About & Info',
        description: 'Micro-course cohorts, open club competitions, and campus pilot options.',
        path: '/institutions',
      },
      {
        id: 'page-investors',
        title: 'Investor Relations — Request Information',
        doorOrSection: 'About & Info',
        description: 'Secondary path for background information inquiries.',
        path: '/institutions/investors',
      },
      {
        id: 'page-about',
        title: 'About College Company',
        doorOrSection: 'About & Info',
        description: 'Founded and led by Kevin Mitchell in Boston, Massachusetts.',
        path: '/about',
      },
      {
        id: 'page-contact',
        title: 'Contact Us',
        doorOrSection: 'About & Info',
        description: 'Email kevin@collegeesportsx.com or send a message without an account.',
        path: '/contact',
      },
      {
        id: 'page-research-wire',
        title: 'Research Wire — Articles & Guides',
        doorOrSection: 'Research Wire',
        description: 'Plain-English guides on creator careers, NIL taxes, and Student-First sponsorships.',
        path: '/intelligence',
      },
      {
        id: 'page-market-wire',
        title: 'Market Wire — Policy & Program Updates',
        doorOrSection: 'Research Wire',
        description: 'Reference briefs on FTC disclosure rules, IRS thresholds, and campus clubs.',
        path: '/intelligence/market-wire',
      },
      {
        id: 'page-privacy',
        title: 'Privacy Policy',
        doorOrSection: 'About & Info',
        description: 'How College Company handles contact and update requests.',
        path: '/privacy',
      },
      {
        id: 'page-terms',
        title: 'Terms of Use',
        doorOrSection: 'About & Info',
        description: 'Educational disclaimers and development-preview terms.',
        path: '/terms',
      }
    );

    // 4. Individual Research Wire Items
    RESEARCH_WIRE_ITEMS.forEach((item) => {
      const targetPath = item.kind === 'article' ? '/intelligence' : '/intelligence/market-wire';
      list.push({
        id: `wire-${item.id}`,
        title: item.title,
        doorOrSection: 'Research Wire',
        description: item.subtitle,
        path: targetPath,
        hash: item.id,
      });
    });

    return list;
  }, []);

  const categories = ['All', 'Learn', 'Compete', 'Earn', 'Trust', 'About & Info', 'Research Wire'];

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      const matchesDoor = selectedDoor === 'All' || item.doorOrSection === selectedDoor;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.doorOrSection.toLowerCase().includes(q) ||
        (item.status && item.status.toLowerCase().includes(q));
      return matchesDoor && matchesQuery;
    });
  }, [allItems, query, selectedDoor]);

  const selectResult = (item: SearchIndexItem) => {
    onClose();
    onNavigatePath(item.path, item.hash);
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredItems.length === 0 ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length
      );
    } else if (e.key === 'Enter') {
      const activeEl = document.activeElement;
      if (activeEl === inputRef.current && filteredItems[selectedIndex]) {
        e.preventDefault();
        selectResult(filteredItems[selectedIndex]);
      }
    }
  };

  const getSectionIcon = (section: SearchIndexItem['doorOrSection']) => {
    switch (section) {
      case 'Learn':
        return <BookOpen size={16} className="text-[#C89B3C]" />;
      case 'Compete':
        return <Trophy size={16} className="text-[#38BDF8]" />;
      case 'Earn':
        return <DollarSign size={16} className="text-[#68D391]" />;
      case 'Trust':
        return <ShieldCheck size={16} className="text-[#E8C98B]" />;
      case 'Research Wire':
        return <Radio size={16} className="text-[#E8C98B]" />;
      default:
        return <Compass size={16} className="text-neutral-300" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search College Company"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleListKeyDown}
        className="w-full max-w-2xl bg-[#0F1218] border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[84vh]"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#131722]">
          <Search size={18} className="text-[#C89B3C] shrink-0" />
          <label htmlFor="site-search-input" className="sr-only">
            Search programs, courses, leagues, and guides
          </label>
          <input
            ref={inputRef}
            id="site-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search Learn, Compete, Earn, Trust, or pages..."
            className="w-full min-h-[44px] bg-transparent text-white text-base placeholder-neutral-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-white/10 rounded text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-4 py-2 border-b border-white/10 bg-[#0C0E14] flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedDoor(cat);
                setSelectedIndex(0);
              }}
              className={`min-h-[38px] px-3 py-1 rounded-sm text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                selectedDoor === cat
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div ref={listRef} className="overflow-y-auto divide-y divide-white/[0.06] p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-neutral-300 text-base">
              No programs or pages matched &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <a
                  key={item.id}
                  href={item.hash ? `${item.path}#${item.hash}` : item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    selectResult(item);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-white/[0.08] border border-white/15'
                      : 'hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded bg-[#161B26] border border-white/10 shrink-0 mt-0.5">
                      {getSectionIcon(item.doorOrSection)}
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display font-bold text-white text-base">
                          {item.title}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-[#E8C98B]">
                          {item.doorOrSection}
                        </span>
                        {item.status && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/10">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-300 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[#E8C98B] shrink-0" />
                </a>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-4 py-2.5 bg-[#0A0D12] border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>Use ↑↓ and Enter to navigate · Esc to close</span>
          <span>{filteredItems.length} pages &amp; programs</span>
        </div>
      </div>
    </div>
  );
};
