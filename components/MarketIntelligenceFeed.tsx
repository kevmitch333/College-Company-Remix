import React, { useState, useMemo, useEffect } from 'react';
import { Search, ExternalLink, ShieldCheck, Rss, X } from 'lucide-react';
import { RESEARCH_WIRE_ITEMS, ResearchDispatchItem } from '../src/rssData';
import { NewsletterSignup } from './NewsletterSignup';
import { RssSubscriptionModal } from './RssSubscriptionModal';

export const MarketIntelligenceFeed: React.FC = () => {
  const canonicalWireItems: ResearchDispatchItem[] = useMemo(
    () => RESEARCH_WIRE_ITEMS.filter((item) => item.kind === 'wire'),
    []
  );

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(canonicalWireItems.map((i) => i.category)))],
    [canonicalWireItems]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [isRssModalOpen, setIsRssModalOpen] = useState(false);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && canonicalWireItems.some((item) => item.id === hash)) {
        setHighlightedId(hash);
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [canonicalWireItems]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return canonicalWireItems.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        (item.sourceName && item.sourceName.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [canonicalWireItems, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#10141D] border border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#C89B3C] font-semibold">
              <ShieldCheck size={16} className="text-[#68D391]" />
              <span>Market Wire · Synced with RSS 2.0 Feed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Rules, Taxes &amp; Campus Program Updates
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed">
              Verified reference briefs on FTC disclosure rules, IRS self-employment thresholds, and open collegiate club programming — matching our syndicated RSS feed entry for entry.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsRssModalOpen(true)}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-sm bg-[#161B26] hover:bg-[#1E2636] border border-[#C89B3C]/40 text-[#E8C98B] hover:text-white text-sm font-mono cursor-pointer shrink-0"
          >
            <Rss size={15} />
            <span>Subscribe via RSS</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[44px] px-4 py-2 rounded-sm text-sm font-mono transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                    : 'bg-[#141824] hover:bg-[#1D2333] text-neutral-200 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <label htmlFor="market-wire-filter" className="sr-only">
              Filter Market Wire entries
            </label>
            <input
              id="market-wire-filter"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter wire entries..."
              className="w-full sm:w-64 min-h-[44px] pl-9 pr-9 py-2 bg-[#090B10] border border-white/15 focus:border-[#C89B3C] rounded-sm text-base text-white placeholder-neutral-500 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear filter"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Wire Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isHighlighted = highlightedId === item.id;
            return (
              <article
                id={item.id}
                key={item.id}
                className={`rounded-xl p-6 flex flex-col justify-between gap-4 border transition-colors ${
                  isHighlighted
                    ? 'bg-[#151B28] border-[#C89B3C]'
                    : 'bg-[#0C0F17] border-white/10 hover:border-[#C89B3C]/45'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[#E8C98B] font-semibold uppercase">{item.category}</span>
                    <span className="text-neutral-400">{item.publishedAtFormatted}</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-base text-neutral-300 leading-relaxed">{item.subtitle}</p>
                  <p className="text-base text-neutral-200 leading-relaxed pt-1 border-t border-white/10">
                    {item.content}
                  </p>

                  {item.keyTakeaways.length > 0 && (
                    <ul className="space-y-1.5 text-sm text-neutral-300 list-disc pl-5">
                      {item.keyTakeaways.map((kt, idx) => (
                        <li key={idx}>{kt}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-sm font-mono">
                  <span className="text-neutral-400 truncate">{item.author}</span>
                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 min-h-[44px] text-[#E8C98B] hover:text-white underline underline-offset-2 shrink-0"
                    >
                      <span>{item.sourceName || 'Source'}</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="p-8 rounded-lg bg-[#0C0F17] border border-white/10 text-center space-y-3">
            <p className="text-base text-neutral-200">No Market Wire entries match your filter.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="min-h-[44px] px-4 py-2 rounded-sm bg-[#161B26] border border-white/15 text-white text-sm font-mono cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <NewsletterSignup variant="card" />
      <RssSubscriptionModal isOpen={isRssModalOpen} onClose={() => setIsRssModalOpen(false)} />
    </div>
  );
};

export default MarketIntelligenceFeed;
