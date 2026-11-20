import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Check,
  Share2,
  Rss,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { RESEARCH_WIRE_ITEMS, ResearchDispatchItem } from '../src/rssData';
import { MarkdownContent } from '../src/utils/markdown';
import { RssSubscriptionModal } from './RssSubscriptionModal';
import creatorStudioImg from '../src/assets/images/creator_studio_1791594557100.jpg';
import nilClearinghouseImg from '../src/assets/images/nil_clearinghouse_1791594540477.jpg';
import mediaBroadcastImg from '../src/assets/images/media_broadcast_center_1790396570502.jpg';

const ARTICLE_IMAGES: Record<string, { src: string; alt: string }> = {
  'art-01-creator-workforce-curriculum': {
    src: creatorStudioImg,
    alt: 'College students collaborating in a media and digital creator production workshop',
  },
  'art-02-nil-money-and-family-taxes': {
    src: nilClearinghouseImg,
    alt: 'Student financial planning and tax literacy checklist overview',
  },
  'art-03-student-first-charter-brand-match': {
    src: mediaBroadcastImg,
    alt: 'Student creators and brand partners planning transparent campaign deliverables',
  },
};

export const BlogEditorialSection: React.FC<{
  initialArticleId?: string;
  onSelectArticleId?: (id: string | null) => void;
}> = ({ initialArticleId, onSelectArticleId }) => {
  const articles: ResearchDispatchItem[] = useMemo(
    () => RESEARCH_WIRE_ITEMS.filter((item) => item.kind === 'article'),
    []
  );

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(articles.map((a) => a.category)))],
    [articles]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    initialArticleId || null
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [isRssModalOpen, setIsRssModalOpen] = useState(false);

  // Sync with URL hash if updated externally
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && articles.some((a) => a.id === hash)) {
        setSelectedArticleId(hash);
      } else if (!hash && !initialArticleId) {
        setSelectedArticleId(null);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [articles, initialArticleId]);

  useEffect(() => {
    if (initialArticleId && articles.some((a) => a.id === initialArticleId)) {
      setSelectedArticleId(initialArticleId);
    }
  }, [initialArticleId, articles]);

  const selectedArticle = useMemo(
    () => articles.find((a) => a.id === selectedArticleId) || null,
    [articles, selectedArticleId]
  );

  const openArticle = (id: string) => {
    setSelectedArticleId(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/intelligence#${id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onSelectArticleId?.(id);
  };

  const closeArticle = () => {
    setSelectedArticleId(null);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/intelligence');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onSelectArticleId?.(null);
  };

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articles.filter((art) => {
      const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesQuery =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.subtitle.toLowerCase().includes(q) ||
        art.content.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Show featured banner only on unfiltered view, and NEVER duplicate the featured article in the grid below
  const showFeaturedBanner = selectedCategory === 'All' && !searchQuery.trim() && articles.length > 0;
  const featuredArticle = showFeaturedBanner ? articles[0] : null;
  const gridArticles = featuredArticle
    ? filteredArticles.filter((a) => a.id !== featuredArticle.id)
    : filteredArticles;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {selectedArticle ? (
        <article className="max-w-3xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <button
              type="button"
              onClick={closeArticle}
              className="inline-flex items-center gap-2 min-h-[44px] px-3 py-2 text-sm font-mono text-[#E8C98B] hover:text-white transition-colors cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
            >
              <ArrowLeft size={16} />
              <span>All Research Wire Articles</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRssModalOpen(true)}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded bg-[#141822] hover:bg-[#1C2230] border border-[#C89B3C]/35 text-[#E8C98B] hover:text-white text-sm font-mono cursor-pointer"
              >
                <Rss size={14} />
                <span>RSS Feed</span>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded bg-[#141822] hover:bg-[#1C2230] border border-white/15 text-neutral-200 hover:text-white text-sm font-mono cursor-pointer"
              >
                {copiedLink ? <Check size={14} className="text-[#68D391]" /> : <Share2 size={14} />}
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-neutral-300">
              <span className="px-2.5 py-1 rounded bg-[#C89B3C]/15 border border-[#C89B3C]/40 text-[#E8C98B] font-semibold">
                {selectedArticle.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={14} /> {selectedArticle.publishedAtFormatted}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={14} /> {selectedArticle.readTime}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
              {selectedArticle.title}
            </h2>

            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
              {selectedArticle.subtitle}
            </p>

            <div className="text-sm font-mono text-neutral-300 pt-2 border-t border-white/10">
              By <strong className="text-white">{selectedArticle.author}</strong> · {selectedArticle.authorRole}
            </div>
          </header>

          {ARTICLE_IMAGES[selectedArticle.id] && (
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-[16/9] bg-[#10141D]">
              <img
                src={ARTICLE_IMAGES[selectedArticle.id].src}
                alt={ARTICLE_IMAGES[selectedArticle.id].alt}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {selectedArticle.keyTakeaways.length > 0 && (
            <div className="p-6 rounded-xl bg-[#10141D] border border-[#C89B3C]/35 space-y-3">
              <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#E8C98B] font-semibold">
                <Sparkles size={15} />
                <span>Key Takeaways</span>
              </div>
              <ul className="space-y-2 text-base text-neutral-200 list-disc pl-5">
                {selectedArticle.keyTakeaways.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Clean HTML Markdown Render */}
          <MarkdownContent content={selectedArticle.content} className="pt-2" />
        </article>
      ) : (
        <div className="space-y-8">
          {/* Search & Category Controls */}
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
                      : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-200 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:flex-none">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <label htmlFor="research-wire-search" className="sr-only">
                  Search articles
                </label>
                <input
                  id="research-wire-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dispatches..."
                  className="w-full sm:w-64 min-h-[44px] pl-9 pr-3 py-2 bg-[#10141D] border border-white/15 focus:border-[#C89B3C] rounded-sm text-base text-white placeholder-neutral-500 outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsRssModalOpen(true)}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-sm bg-[#141822] hover:bg-[#1C2230] border border-[#C89B3C]/40 text-[#E8C98B] hover:text-white text-sm font-mono cursor-pointer shrink-0"
              >
                <Rss size={15} />
                <span>RSS</span>
              </button>
            </div>
          </div>

          {/* Featured Banner (only when unfiltered; excluded from lower grid so zero duplication) */}
          {featuredArticle && (
            <article className="bg-[#10141D] border border-[#C89B3C]/35 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 aspect-[16/10] lg:aspect-auto bg-[#0A0D14]">
                <img
                  src={ARTICLE_IMAGES[featuredArticle.id]?.src || creatorStudioImg}
                  alt={ARTICLE_IMAGES[featuredArticle.id]?.alt || featuredArticle.title}
                  width={640}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#E8C98B]">
                    <span className="uppercase font-bold">{featuredArticle.category}</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-neutral-300">{featuredArticle.publishedAtFormatted}</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-neutral-300">{featuredArticle.readTime}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-base text-neutral-300 leading-relaxed">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
                  <span className="text-sm font-mono text-neutral-300">
                    By {featuredArticle.author}
                  </span>
                  <a
                    href={`/intelligence#${featuredArticle.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openArticle(featuredArticle.id);
                    }}
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-base rounded-sm transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          )}

          {/* Remaining Articles Grid */}
          {gridArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gridArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-[#10141D] border border-white/10 hover:border-[#C89B3C]/50 rounded-xl overflow-hidden flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="aspect-[16/9] bg-[#0A0D14] border-b border-white/10">
                      <img
                        src={ARTICLE_IMAGES[art.id]?.src || nilClearinghouseImg}
                        alt={ARTICLE_IMAGES[art.id]?.alt || art.title}
                        loading="lazy"
                        width={640}
                        height={360}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-[#E8C98B]">
                        <span className="font-bold uppercase">{art.category}</span>
                        <span className="text-neutral-400">{art.publishedAtFormatted}</span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-white leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-base text-neutral-300 leading-relaxed">{art.subtitle}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-mono text-neutral-400">{art.readTime}</span>
                    <a
                      href={`/intelligence#${art.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        openArticle(art.id);
                      }}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-sm bg-[#161B26] hover:bg-[#1E2636] border border-white/15 text-white text-base font-medium transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={15} className="text-[#E8C98B]" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            !featuredArticle && (
              <div className="p-10 rounded-xl bg-[#10141D] border border-white/10 text-center space-y-3">
                <BookOpen size={28} className="text-neutral-400 mx-auto" />
                <p className="text-base text-neutral-200">
                  No articles matched &ldquo;{searchQuery}&rdquo;.
                </p>
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
            )
          )}
        </div>
      )}

      <RssSubscriptionModal isOpen={isRssModalOpen} onClose={() => setIsRssModalOpen(false)} />
    </div>
  );
};

export default BlogEditorialSection;
