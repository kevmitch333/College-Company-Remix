import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  PenTool, 
  Edit3, 
  Trash2, 
  Share2, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  FileText, 
  Image as ImageIcon, 
  Eye, 
  Send, 
  X, 
  User, 
  Building2, 
  Shield, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Tag,
  AlertCircle
} from 'lucide-react';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc,
  updateDoc,
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { db, ensureAuthenticated } from '../src/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsletterSignup } from './NewsletterSignup';

export type ArticleCategory = 
  | 'All Dispatches' 
  | 'Holding Strategy' 
  | 'NIL & Economics' 
  | 'Athletic Compliance' 
  | 'Media Rights' 
  | 'Campus Infrastructure';

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ArticleCategory, 'All Dispatches'>;
  authorName: string;
  authorRole: string;
  coverImage: string;
  readTime: string;
  content: string;
  keyTakeaways?: string[];
  createdAt: any;
  publishedAtFormatted: string;
  featured?: boolean;
}

// Preset Institutional Imagery for Article Covers
const PRESET_COVERS = [
  {
    name: 'Varsity Arena Arena Broadcast',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Collegiate Campus Innovation Hub',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Executive Boardroom Diligence',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Broadcast Production Truck & Feeds',
    url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=80'
  }
];

// Initial Institutional Articles Seed Data
const SEED_ARTICLES: Omit<Article, 'id' | 'createdAt'>[] = [
  {
    title: 'The Great Collegiate Consolidation: Why Digital Sports Are Higher Education’s Next Linear Media Frontier',
    subtitle: 'An analysis of shifting Gen-Z student demographics, campus athletic budgets, and how digital sports consolidation mirrors the 1980s CFA linear television revolution.',
    category: 'Holding Strategy',
    authorName: 'Elena Rostova',
    authorRole: 'Managing Director, Sovereign Capital & Collegiate Media',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80',
    readTime: '6 min read',
    publishedAtFormatted: 'October 2026',
    featured: true,
    keyTakeaways: [
      'Gen-Z and Gen-Alpha undergraduate engagement has shifted 73% towards non-traditional broadcast formats and interactive digital sports circuits.',
      'Fragmented collegiate clubs represent untapped enterprise IP; centralized roll-ups drive 4.2x media rights valuation premiums.',
      'Sovereign multi-campus infrastructure amortizes tournament overhead across 150+ university programs.'
    ],
    content: `
### The Structural Transformation of Campus Athletics

Over the past four decades, intercollegiate athletics was defined by the democratization and subsequent monetization of linear broadcast rights. Following the landmark 1984 Supreme Court ruling in *NCAA v. Board of Regents of the University of Oklahoma*, universities wrested control of their television properties, creating the multi-billion-dollar conference ecosystems that dominate collegiate sports today.

In 2026, higher education stands at an identical inflection point—not on cable airwaves, but across decentralized digital channels, interactive gaming leagues, and regional student streaming networks.

### The Fragmented Campus Dilemma

Today, more than 85% of North American four-year universities host competitive digital sports organizations. Yet historically, over 90% of these programs have operated in operational silos:
- Student leaders negotiate disconnected local sponsorship deals that fail to monetize regional scale.
- Campus IT departments grapple with ad-hoc bandwidth saturation and security vulnerabilities.
- Student competitors navigate opaque state NIL regulations without institutional fiduciary protection.

By rolling up campus media rights, tournament infrastructure, and athlete escrow under a unified holding architecture, College Company Holding Group eliminates these friction points.

### Institutional Enterprise Value Creation

Our thesis centers on three foundational pillars:
1. **Consolidated Commercial Leverage**: Negotiating master brand partnerships across 150+ campuses simultaneously yields a 3.8x revenue premium compared to individual campus negotiations.
2. **Standardized Fiduciary Compliance**: Housing NIL deal distribution in programmatic escrow safeguards amateur status and Title IX equity benchmarks.
3. **Syndicated Broadcast Packaging**: Converting thousands of weekly collegiate matches into polished FAST channels and live feeds unlocks national brand budgets previously out of reach for individual athletic departments.

Higher education institutions that embrace structured digital sports governance today are not merely funding student extracurriculars—they are building the bedrock of collegiate media for the next half-century.
    `
  },
  {
    title: 'NIL Escrow Architecture: Algorithmic Compliance Under Evolving NCAA Bylaw 12 and Title IX',
    subtitle: 'How automated geofenced smart contracts protect student-athlete amateur status while providing athletic directors with 100% transparent audit trails.',
    category: 'Athletic Compliance',
    authorName: 'Sarah Jenkins, J.D.',
    authorRole: 'Chief Regulatory Counsel, Collegiate Compliance Directorate',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    readTime: '5 min read',
    publishedAtFormatted: 'September 2026',
    featured: false,
    keyTakeaways: [
      'State-by-state NIL disclosure deadlines vary between 72 hours and 30 days; automated API synchronization eliminates human error.',
      'Title IX proportionality requires equal commercial support mechanisms across biological genders in university-sponsored activations.',
      'Algorithmic category filtering guarantees zero exposure to prohibited booster collectives, sports gambling, or predatory lenders.'
    ],
    content: `
### Navigating the 32-State Statutory Labyrinth

Since the inception of the Name, Image, and Likeness era, university compliance directors have faced a daunting compliance puzzle. With more than thirty distinct state statutes governing disclosure timelines, permitted commercial categories, and mandatory institutional reporting, manual review processes have reached a breaking point.

A student-athlete residing in California, competing in a tournament held in Texas, while enrolled in an institution governed by Ohio law, is subject to overlapping and sometimes conflicting statutory mandates.

### The Smart-Contract Escrow Solution

Our platform addresses this friction through a proprietary multi-tier clearinghouse:
1. **Geofenced Statutory Validation**: Every brand agreement uploaded to the platform is automatically parsed by algorithmic compliance filters calibrated to the specific legal jurisdictions of the athlete, campus, and sponsor.
2. **Permanent Category Blacklisting**: Deals involving sports wagering, alcohol, adult content, or predatory payday lending are automatically rejected at the gateway level before reaching student competitors.
3. **Direct Athletic Director Synchronicity**: Signed disclosures are pushed in real time via secure API into campus athletic management software (ARMS, Teamworks, JumpForward), guaranteeing that compliance officers are never blindsided by undisclosed agreements.

### Preserving Institutional Trust

Compliance is not an afterthought; it is our primary moat. By providing athletic directors with ironclad audit certainty, we empower student-athletes to maximize their commercial potential without ever putting their scholarships or varsity eligibility at risk.
    `
  },
  {
    title: 'From Dorm LANs to Varsity Arenas: Campus Infrastructure ROI for Division 1 Athletic Directorates',
    subtitle: 'Evaluating the capital expenditure and multi-year yield of dedicated university esports arenas, broadcast labs, and high-performance STEM training hubs.',
    category: 'Campus Infrastructure',
    authorName: 'Marcus Vance',
    authorRole: 'Head of Campus Infrastructure & Facility Design',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
    readTime: '4 min read',
    publishedAtFormatted: 'August 2026',
    featured: false,
    keyTakeaways: [
      'Campus digital sports facilities yield an average 26% higher undergraduate recruitment conversion rate among STEM prospective students.',
      'Enterprise fiber backbones and Anycast low-latency routing prevent tournament match traffic from congesting university academic networks.',
      'Multi-use facility architecture enables collegiate arenas to serve as lecture halls, hackathon venues, and corporate conference centers during off-peak hours.'
    ],
    content: `
### Beyond the Traditional Rec Center

When university provosts and athletic directors evaluate capital investments in campus facilities, digital sports arenas frequently outperform traditional physical fitness expansions on a cost-per-student-impact basis.

A state-of-the-art 60-seat varsity digital sports arena requires roughly 15% of the capital expenditure demanded by a modest basketball training court, yet generates disproportionate admissions, corporate partnership, and donor interest.

### The Triple-Bottom-Line Return on Investment

1. **Admissions & Yield Acceleration**: High school seniors pursuing computer science, data analytics, and interactive media view varsity gaming labs as tangible proof of institutional technological commitment.
2. **Corporate Tech Sponsorships**: Enterprise hardware and cloud providers actively underwrite facility naming rights to establish brand loyalty with top engineering undergraduates.
3. **Multi-Disciplinary Academic Utilization**: The same workstations utilized by varsity digital athletes in the evening function as AI workstation clusters, 3D rendering labs, and media production suites during academic morning hours.

Investing in campus digital sports infrastructure is an investment in modern higher education retention, technological readiness, and student community.
    `
  },
  {
    title: 'Valuing Conference Digital Broadcast Rights: Beyond the Traditional Linear Cable Bundle',
    subtitle: 'A quantitative framework for valuing digital sports match streams, FAST distribution deals, and viewer engagement in the post-cord-cutting collegiate economy.',
    category: 'Media Rights',
    authorName: 'David Kim',
    authorRole: 'VP of Media Syndication & Rights Valuations',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=80',
    readTime: '5 min read',
    publishedAtFormatted: 'July 2026',
    featured: false,
    keyTakeaways: [
      'Average viewing duration during intercollegiate championship matches exceeds 48 minutes per session, surpassing traditional linear non-revenue sports.',
      'Ad CPMs for authenticated collegiate digital broadcasts command a 2.4x premium over standard programmatic web display.',
      'Syndicated distribution across free ad-supported television (FAST) platforms delivers national reach with zero linear carrier fees.'
    ],
    content: `
### The Linear Erosion and the Digital Surge

As traditional cable subscriptions decline across domestic households, collegiate conferences face contracting distribution fees for second- and third-tier athletic programming. Regional sports networks that previously paid robust rights fees for Olympic sports are rapidly retreating.

Conversely, digital sports broadcasts attract the most coveted demographic in advertising: digital natives aged 18 to 34 who do not subscribe to traditional linear television packages.

### Monetizing Attention: The 2026 Playbook

Our media rights framework monetizes intercollegiate digital competitions through three unified streams:
1. **Interactive Overlay Sponsorships**: Dynamic digital court/field signage and Twitch/YouTube chat integrations deliver verified brand click-through rates that linear TV spots cannot replicate.
2. **Linear & FAST Hybrid Syndication**: Packaging premier conference finals for FAST platforms like Pluto TV, Samsung TV Plus, and Prime Video unlocks tens of millions of connected television households.
3. **Student Creator Co-Streaming**: Allowing enrolled student creators to broadcast and commentate match feeds exponentially expands organic reach across collegiate alumni networks.

By modernizing collegiate media rights packaging, we transform raw tournament broadcasts into premium commercial assets that sustainably fund university programs.
    `
  }
];

export const BlogEditorialSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('All Dispatches');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(true);

  // Editor Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState<Exclude<ArticleCategory, 'All Dispatches'>>('Holding Strategy');
  const [formAuthorName, setFormAuthorName] = useState('Kevin Brooks');
  const [formAuthorRole, setFormAuthorRole] = useState('Principal, Collegiate Acquisitions');
  const [formCoverImage, setFormCoverImage] = useState(PRESET_COVERS[0].url);
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formContent, setFormContent] = useState('');
  const [formTakeaways, setFormTakeaways] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Categories list
  const categories: ArticleCategory[] = [
    'All Dispatches',
    'Holding Strategy',
    'NIL & Economics',
    'Athletic Compliance',
    'Media Rights',
    'Campus Infrastructure'
  ];

  // Initialize and Sync with Firestore
  useEffect(() => {
    ensureAuthenticated();

    try {
      const articlesRef = collection(db, 'articles');
      const q = query(articlesRef, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        if (!snapshot.empty) {
          const fetched: Article[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              title: data.title || 'Untitled Dispatch',
              subtitle: data.subtitle || '',
              category: data.category || 'Holding Strategy',
              authorName: data.authorName || 'Staff Editorial',
              authorRole: data.authorRole || 'Institutional Analyst',
              coverImage: data.coverImage || PRESET_COVERS[0].url,
              readTime: data.readTime || '4 min read',
              content: data.content || '',
              keyTakeaways: data.keyTakeaways || [],
              createdAt: data.createdAt,
              publishedAtFormatted: data.publishedAtFormatted || 'October 2026',
              featured: data.featured || false
            };
          });
          setArticles(fetched);
          setLoading(false);
        } else {
          // Collection is empty, seed initial articles into Firestore for persistence
          console.log('Seeding initial institutional articles into Firestore...');
          const initialPromises = SEED_ARTICLES.map((art) => 
            addDoc(collection(db, 'articles'), {
              ...art,
              createdAt: serverTimestamp()
            })
          );
          await Promise.all(initialPromises);
          // Snapshot listener will update state automatically
        }
      }, (error) => {
        console.warn('Firestore articles listener warning (falling back to initial seed):', error);
        // Fallback to in-memory seeds if offline
        setArticles(SEED_ARTICLES.map((art, idx) => ({ ...art, id: `seed-${idx}`, createdAt: null })));
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore initialization fallback:', err);
      setArticles(SEED_ARTICLES.map((art, idx) => ({ ...art, id: `seed-${idx}`, createdAt: null })));
      setLoading(false);
    }
  }, []);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = selectedCategory === 'All Dispatches' || art.category === selectedCategory;
      const matchesSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Featured Article
  const featuredArticle = useMemo(() => {
    return articles.find((a) => a.featured) || articles[0];
  }, [articles]);

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingArticleId(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormCategory('Holding Strategy');
    setFormAuthorName('Kevin Brooks');
    setFormAuthorRole('Principal, Collegiate Acquisitions');
    setFormCoverImage(PRESET_COVERS[0].url);
    setFormReadTime('5 min read');
    setFormContent(`### Executive Summary

Detail your strategic analysis, institutional observations, or quantitative data points here.

### Strategic Observations

1. First key institutional observation regarding collegiate digital sports consolidation.
2. Second key metric regarding roster monetization or state-level athletic compliance.

### Conclusion & Outlook

Concluding thoughts for university partners, athletic directors, and accredited institutional syndicate members.`);
    setFormTakeaways('Institutional point 1\nTitle IX compliance alignment\nCapital allocation efficiency');
    setIsPreviewMode(false);
    setIsEditorOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (article: Article) => {
    setEditingArticleId(article.id);
    setFormTitle(article.title);
    setFormSubtitle(article.subtitle);
    setFormCategory(article.category);
    setFormAuthorName(article.authorName);
    setFormAuthorRole(article.authorRole);
    setFormCoverImage(article.coverImage);
    setFormReadTime(article.readTime);
    setFormContent(article.content);
    setFormTakeaways(article.keyTakeaways ? article.keyTakeaways.join('\n') : '');
    setIsPreviewMode(false);
    setIsEditorOpen(true);
  };

  // Handle Publish / Save
  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    setPublishing(true);

    try {
      const takeawaysList = formTakeaways
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      // Auto compute read time if not set
      const wordCount = formContent.split(/\s+/).length;
      const computedReadTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;

      const articlePayload = {
        title: formTitle.trim(),
        subtitle: formSubtitle.trim(),
        category: formCategory,
        authorName: formAuthorName.trim() || 'Staff Editorial',
        authorRole: formAuthorRole.trim() || 'Institutional Analyst',
        coverImage: formCoverImage,
        readTime: formReadTime || computedReadTime,
        content: formContent.trim(),
        keyTakeaways: takeawaysList,
        publishedAtFormatted: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        updatedAt: serverTimestamp()
      };

      if (editingArticleId) {
        // Update existing
        const docRef = doc(db, 'articles', editingArticleId);
        await updateDoc(docRef, articlePayload);
        // If viewing this article, update selected
        if (selectedArticle && selectedArticle.id === editingArticleId) {
          setSelectedArticle({
            ...selectedArticle,
            ...articlePayload
          });
        }
      } else {
        // Create new
        const docRef = await addDoc(collection(db, 'articles'), {
          ...articlePayload,
          featured: false,
          createdAt: serverTimestamp()
        });
        
        // Auto open the new article
        setSelectedArticle({
          id: docRef.id,
          ...articlePayload,
          createdAt: Timestamp.now(),
          featured: false
        });
      }

      setPublishSuccess(true);
      setTimeout(() => {
        setPublishSuccess(false);
        setIsEditorOpen(false);
        setPublishing(false);
      }, 900);
    } catch (err) {
      console.error('Error saving article to Firestore:', err);
      setPublishing(false);
      alert('Unable to save article to Firestore. Please check connection and try again.');
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Are you sure you wish to delete this published dispatch from the institutional register?')) return;

    try {
      await deleteDoc(doc(db, 'articles', id));
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
      }
    } catch (err) {
      console.error('Error deleting article:', err);
      // Fallback local remove
      setArticles((prev) => prev.filter((a) => a.id !== id));
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
      }
    }
  };

  // Copy Article Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="py-14 md:py-20 bg-[#090A0C] font-sans min-h-[85vh]">
      <div className="max-w-[1360px] mx-auto px-6 space-y-10">

        {/* ========================================================================= */}
        {/* CASE A: FULL ARTICLE READER MODE */}
        {/* ========================================================================= */}
        {selectedArticle ? (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
            
            {/* Top Navigation & Controls */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-[#C89B3C]" />
                <span>Return to All Dispatches</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-[#141822] hover:bg-[#1C2230] border border-white/10 text-neutral-300 hover:text-white rounded text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check size={13} className="text-[#68D391]" /> : <Share2 size={13} className="text-[#C89B3C]" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                </button>

                <button
                  onClick={() => handleOpenEditModal(selectedArticle)}
                  className="px-3 py-1.5 bg-[#141822] hover:bg-[#1C2230] border border-white/10 text-neutral-300 hover:text-white rounded text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 size={13} className="text-[#38BDF8]" />
                  <span>Edit Dispatch</span>
                </button>

                <button
                  onClick={(e) => handleDeleteArticle(selectedArticle.id, e)}
                  className="px-3 py-1.5 bg-red-950/30 hover:bg-red-950/50 border border-red-500/20 text-red-300 hover:text-red-200 rounded text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Article Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C98B] font-bold">
                  {selectedArticle.category.toUpperCase()}
                </span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400 flex items-center gap-1">
                  <Calendar size={12} /> {selectedArticle.publishedAtFormatted}
                </span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400 flex items-center gap-1">
                  <Clock size={12} /> {selectedArticle.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                {selectedArticle.title}
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans font-light">
                {selectedArticle.subtitle}
              </p>

              {/* Author Byline Lockup */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <div className="w-10 h-10 rounded-full bg-[#181D29] border border-[#C89B3C]/40 flex items-center justify-center text-[#E8C98B] font-mono font-bold text-sm">
                  {selectedArticle.authorName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-sans">{selectedArticle.authorName}</div>
                  <div className="text-xs text-neutral-400 font-mono">{selectedArticle.authorRole}</div>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-[16/9] max-h-[460px] relative shadow-2xl">
              <img 
                src={selectedArticle.coverImage} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Key Takeaways Callout Box */}
            {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
              <div className="p-6 rounded-lg bg-[#11141D] border border-[#C89B3C]/30 space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-semibold">
                  <Sparkles size={14} />
                  <span>Executive Fiduciary Takeaways</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-200">
                  {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] mt-2 shrink-0" />
                      <span className="leading-relaxed">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Formatted Article Body */}
            <div className="prose prose-invert max-w-none space-y-5 text-neutral-300 text-sm sm:text-base leading-relaxed font-sans pt-2">
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-bold font-display text-white pt-4 tracking-tight">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl sm:text-3xl font-bold font-display text-white pt-6 tracking-tight border-b border-white/10 pb-2">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n- ');
                  return (
                    <ul key={idx} className="space-y-2 list-disc list-inside pl-2 text-neutral-300">
                      {items.map((it, itemIdx) => (
                        <li key={itemIdx}>{it.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('1. ')) {
                  const items = paragraph.split(/\n\d+\.\s+/);
                  return (
                    <ol key={idx} className="space-y-2 list-decimal list-inside pl-2 text-neutral-300">
                      {items.map((it, itemIdx) => (
                        <li key={itemIdx}>{it.replace(/^\d+\.\s+/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* In-Article Newsletter Subscription Capture */}
            <div className="pt-6">
              <NewsletterSignup variant="card" />
            </div>

            {/* Bottom Institutional Disclaimer & Back Button */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-neutral-500">
                Published by College Company Holding Group Inc. · Sovereign Research Division
              </div>
              <button
                onClick={() => { setSelectedArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-4 py-2 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Back to Dispatches
              </button>
            </div>

          </div>
        ) : (

        /* ========================================================================= */
        /* CASE B: ARTICLE FEED & EDITORIAL CATALOG */
        /* ========================================================================= */
        <div className="space-y-12">
          
          {/* Header Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="max-w-3xl space-y-3">
              <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                <BookOpen size={14} />
                <span>Institutional Research · Thought Leadership & Dispatches</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                Collegiate Market Intelligence & Editorial
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Strategic perspectives on higher education digital sports consolidation, conference media rights, 
                Title IX governance, and student-athlete NIL capital dynamics.
              </p>
            </div>

            {/* Create & Publish Button */}
            <button
              onClick={handleOpenCreateModal}
              className="px-5 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-auto"
            >
              <PenTool size={15} />
              <span>Draft & Publish Article</span>
            </button>
          </div>

          {/* Search Bar & Category Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 text-xs font-mono">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-md'
                      : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Search articles, keywords, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#11141E] border border-white/10 rounded-sm pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C89B3C] font-mono transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>

          </div>

          {/* Featured Hero Article (if on 'All Dispatches' and no search filter) */}
          {selectedCategory === 'All Dispatches' && !searchQuery && featuredArticle && (
            <div 
              onClick={() => setSelectedArticle(featuredArticle)}
              className="bg-[#11141F] rounded-xl border border-white/10 overflow-hidden shadow-2xl hover:border-[#C89B3C]/50 transition-all cursor-pointer group grid lg:grid-cols-12 items-stretch"
            >
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-[#C89B3C] text-[#090A0C] font-bold uppercase text-[10px]">
                      Featured Lead Dispatch
                    </span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-[#E8C98B] font-semibold">{featuredArticle.category}</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-neutral-400">{featuredArticle.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-[#E8C98B] transition-colors tracking-tight leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans line-clamp-3">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#181D29] border border-[#C89B3C]/40 flex items-center justify-center text-[#E8C98B] font-mono font-bold text-xs">
                      {featuredArticle.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white font-sans">{featuredArticle.authorName}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{featuredArticle.authorRole}</div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono text-[#C89B3C] group-hover:translate-x-1 transition-transform">
                    <span>Read Full Dispatch</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#11141F] via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-[#11141D] rounded-xl border border-white/[0.08] hover:border-[#C89B3C]/40 transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-lg"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#0A0D14]">
                  <img 
                    src={article.coverImage} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded bg-[#090C12]/90 backdrop-blur-md text-[10px] font-mono text-[#E8C98B] border border-white/10 font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-3 text-[10px] font-mono text-neutral-300 bg-black/70 px-2 py-0.5 rounded">
                    {article.readTime}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-neutral-400">
                      {article.publishedAtFormatted}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#E8C98B] transition-colors font-display line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                      {article.subtitle}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <div className="w-5 h-5 rounded-full bg-[#181D29] border border-white/10 flex items-center justify-center text-[10px] font-bold text-[#E8C98B] shrink-0">
                        {article.authorName.charAt(0)}
                      </div>
                      <span className="text-neutral-300 truncate text-[11px]">{article.authorName}</span>
                    </div>

                    <span className="text-[#C89B3C] text-[11px] group-hover:translate-x-1 transition-transform shrink-0">
                      Read →
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 space-y-3 bg-[#11141D] rounded-xl border border-white/5">
              <AlertCircle size={32} className="mx-auto text-neutral-500" />
              <div className="text-base font-bold text-white">No articles matched your criteria</div>
              <div className="text-xs text-neutral-400 max-w-sm mx-auto">
                Try searching with different terms or select 'All Dispatches' to view published pieces.
              </div>
            </div>
          )}

          {/* Catalog Newsletter Signup */}
          <div className="pt-6">
            <NewsletterSignup variant="card" />
          </div>

        </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 2. DRAFT & PUBLISH ARTICLE STUDIO MODAL */}
      {/* ========================================================================= */}
      {isEditorOpen && (
        <div 
          onClick={() => setIsEditorOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            className="bg-[#0D1017] border border-white/10 rounded-xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gold Accent */}
            <div className="h-1 bg-gradient-to-r from-amber-600 via-[#C89B3C] to-emerald-500 w-full" />

            {/* Modal Header */}
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#11141E]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-[#1A202E] text-[#C89B3C] border border-[#C89B3C]/30">
                    <PenTool size={14} />
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-semibold">
                    Editorial Studio & Publishing Portal
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white font-display">
                  {editingArticleId ? 'Edit Published Article' : 'Draft New Institutional Dispatch'}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer border ${
                    isPreviewMode
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold border-[#C89B3C]'
                      : 'bg-[#161B26] hover:bg-[#1E2534] text-neutral-300 border-white/10'
                  }`}
                >
                  <Eye size={13} />
                  <span>{isPreviewMode ? 'Edit Mode' : 'Live Preview'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1.5 rounded bg-[#161B26] hover:bg-[#1E2534] border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handlePublishArticle} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {publishSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-xs text-[#68D391] font-mono flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Article successfully synchronized with Firestore and published to live dispatches!</span>
                </div>
              )}

              {isPreviewMode ? (
                /* LIVE PREVIEW TAB */
                <div className="space-y-6 p-4 bg-[#090C12] rounded-lg border border-white/5">
                  <div className="text-[10px] font-mono uppercase text-[#C89B3C] font-bold tracking-widest flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>Real-Time Publishing Preview</span>
                  </div>

                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C98B] font-mono text-[10px] font-bold">
                      {formCategory.toUpperCase()}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      {formTitle || 'Untitled Article'}
                    </h1>
                    <p className="text-sm text-neutral-300 font-sans">
                      {formSubtitle || 'Article subtitle and overview synopsis.'}
                    </p>
                    <div className="text-xs font-mono text-neutral-400 pt-2 border-t border-white/5">
                      By {formAuthorName} ({formAuthorRole}) · {formReadTime}
                    </div>
                  </div>

                  {formCoverImage && (
                    <div className="rounded-lg overflow-hidden aspect-[16/9] max-h-60 border border-white/10">
                      <img src={formCoverImage} alt="Cover preview" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="prose prose-invert max-w-none text-xs text-neutral-300 space-y-3 font-sans border-t border-white/5 pt-4">
                    {formContent.split('\n\n').map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              ) : (
                /* FORM INPUTS */
                <div className="space-y-5 text-xs font-sans">
                  
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-neutral-300 uppercase tracking-wider text-[11px] font-semibold flex items-center gap-1.5">
                      <FileText size={12} className="text-[#C89B3C]" /> Article Headline / Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Next Frontier of Collegiate Digital Sports Media Rights..."
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full bg-[#11141E] border border-white/10 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C89B3C] font-display"
                    />
                  </div>

                  {/* Subtitle */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-neutral-300 uppercase tracking-wider text-[11px] font-semibold">
                      Executive Summary / Subtitle *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="A 1-2 sentence high-level synopsis of the dispatch..."
                      value={formSubtitle}
                      onChange={(e) => setFormSubtitle(e.target.value)}
                      className="w-full bg-[#11141E] border border-white/10 rounded-sm px-3.5 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#C89B3C]"
                    />
                  </div>

                  {/* Category & Read Time Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-300 uppercase tracking-wider text-[11px] font-semibold">
                        Primary Category *
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as any)}
                        className="w-full bg-[#11141E] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C89B3C] font-mono cursor-pointer"
                      >
                        <option value="Holding Strategy">Holding Strategy</option>
                        <option value="NIL & Economics">NIL & Economics</option>
                        <option value="Athletic Compliance">Athletic Compliance</option>
                        <option value="Media Rights">Media Rights</option>
                        <option value="Campus Infrastructure">Campus Infrastructure</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-300 uppercase tracking-wider text-[11px] font-semibold">
                        Estimated Read Time
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 5 min read"
                        value={formReadTime}
                        onChange={(e) => setFormReadTime(e.target.value)}
                        className="w-full bg-[#11141E] border border-white/10 rounded-sm px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C89B3C] font-mono"
                      />
                    </div>
                  </div>

                  {/* Author Lockup */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-300 uppercase tracking-wider text-[11px] font-semibold flex items-center gap-1">
                        <User size={12} className="text-[#C89B3C]" /> Author Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formAuthorName}
                        onChange={(e) => setFormAuthorName(e.target.value)}
                        className="w-full bg-[#11141E] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C89B3C]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-neutral-300 uppercase tracking-wider text-[11px] font-semibold flex items-center gap-1">
                        <Building2 size={12} className="text-[#C89B3C]" /> Author Institutional Role
                      </label>
                      <input
                        type="text"
                        value={formAuthorRole}
                        onChange={(e) => setFormAuthorRole(e.target.value)}
                        className="w-full bg-[#11141E] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C89B3C]"
                      />
                    </div>
                  </div>

                  {/* Cover Image Selector */}
                  <div className="space-y-2">
                    <label className="font-mono text-neutral-300 uppercase tracking-wider text-[11px] font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <ImageIcon size={12} className="text-[#C89B3C]" /> Cover Image Asset
                      </span>
                      <span className="text-[10px] text-neutral-500 lowercase">select a curated preset or paste URL</span>
                    </label>

                    {/* Curated Presets */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PRESET_COVERS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormCoverImage(preset.url)}
                          className={`relative rounded overflow-hidden aspect-[16/9] border transition-all cursor-pointer ${
                            formCoverImage === preset.url
                              ? 'border-[#C89B3C] ring-2 ring-[#C89B3C]/50'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-end p-1 text-[9px] font-mono text-white truncate">
                            {preset.name}
                          </div>
                        </button>
                      ))}
                    </div>

                    <input
                      type="url"
                      placeholder="Custom Image URL (https://...)"
                      value={formCoverImage}
                      onChange={(e) => setFormCoverImage(e.target.value)}
                      className="w-full bg-[#11141E] border border-white/10 rounded-sm px-3 py-1.5 text-xs text-neutral-300 font-mono placeholder-neutral-600 focus:outline-none focus:border-[#C89B3C]"
                    />
                  </div>

                  {/* Key Takeaways */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-neutral-300 uppercase tracking-wider text-[11px] font-semibold flex items-center gap-1">
                      <Sparkles size={12} className="text-[#C89B3C]" /> Executive Key Takeaways (One per line)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Takeaway bullet point 1&#10;Takeaway bullet point 2&#10;Takeaway bullet point 3"
                      value={formTakeaways}
                      onChange={(e) => setFormTakeaways(e.target.value)}
                      className="w-full bg-[#11141E] border border-white/10 rounded-sm p-3 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#C89B3C] font-mono leading-relaxed"
                    />
                  </div>

                  {/* Content Body */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-neutral-300 uppercase tracking-wider text-[11px] font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <FileText size={12} className="text-[#C89B3C]" /> Dispatch Body Content (Supports Markdown) *
                      </span>
                      <span className="text-[10px] text-neutral-500">Supports ### Headers, bullet lists, bold text</span>
                    </label>
                    <textarea
                      required
                      rows={12}
                      placeholder="Write your article body here... Use ### for section headers."
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      className="w-full bg-[#11141E] border border-white/10 rounded-sm p-3.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-[#C89B3C] font-mono leading-relaxed"
                    />
                  </div>

                </div>
              )}

              {/* Form Action Buttons */}
              <div className="p-4 bg-[#0A0D14] border-t border-white/[0.08] flex items-center justify-between gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded bg-[#161B26] hover:bg-[#1E2534] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={publishing}
                    className="px-6 py-2 rounded bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {publishing ? (
                      <span>Synchronizing...</span>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>{editingArticleId ? 'Update & Publish' : 'Publish Dispatch'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};
