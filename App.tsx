import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Radio,
  Mail,
  Rss,
  Lock,
  MessageSquare,
} from 'lucide-react';
import { findRoute, isKnownRoute, normalizePath, RouteDefinition } from './src/routes';
import { findProgramByPath } from './src/data/programs';
import { ConsumerPublicView } from './components/ConsumerPublicView';
import { DoorLandingPage } from './components/public/DoorLandingPage';
import { ProgramPage } from './components/public/ProgramPage';
import { InstitutionsLandingPage, InvestorRelationsPage } from './components/public/InstitutionsPages';
import { AboutPage, ContactPage, PrivacyPage, TermsPage } from './components/public/StaticPages';
import { SiteBreadcrumbs } from './components/public/SiteBreadcrumbs';
import { BlogEditorialSection } from './components/BlogEditorialSection';
import { MarketIntelligenceFeed } from './components/MarketIntelligenceFeed';
import { NewsletterSignup } from './components/NewsletterSignup';
import { CommandPalette } from './components/CommandPalette';
import { RssSubscriptionModal } from './components/RssSubscriptionModal';
import { PrivateAccessGateModal } from './components/PrivateAccessGateModal';
import {
  AccessProfile,
  AccessTier,
  DEMO_PRESET_PROFILES,
  getSavedProfile,
  saveProfile,
  saveMode,
} from './src/utils/accessTiers';

const NAV_ITEMS = [
  { label: 'Learn', path: '/learn' },
  { label: 'Compete', path: '/compete' },
  { label: 'Earn', path: '/earn' },
  { label: 'Trust', path: '/trust' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'For Institutions & Partners', path: '/institutions' },
];

const BrandLogo: React.FC = () => (
  <span className="inline-flex items-center gap-2.5 select-none">
    <span className="w-9 h-9 rounded-sm bg-[#161A22] border border-[#C89B3C]/45 flex items-center justify-center shrink-0 font-display font-bold text-base tracking-tighter text-[#E6C387]">
      CC
    </span>
    <span className="font-display text-base sm:text-lg font-bold tracking-[0.14em] text-[#F5F5F3] whitespace-nowrap">
      COLLEGE COMPANY
    </span>
  </span>
);

function updateDocumentMeta(route: RouteDefinition, notFound: boolean) {
  if (typeof document === 'undefined') return;
  document.title = notFound ? 'Page Not Found | College Company' : route.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute(
      'content',
      notFound
        ? 'College Company — the alternative institution: micro-courses, beyond-varsity competitions, and compliant earning for the general collegiate population.'
        : route.description
    );
  }
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://college.company${route.path === '/' ? '/' : route.path}`);
  }
}

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return normalizePath(window.location.pathname);
  });
  const [currentHash, setCurrentHash] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return window.location.hash.replace(/^#/, '');
  });

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRssModalOpen, setIsRssModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<AccessProfile>(() => getSavedProfile());

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const known = isKnownRoute(currentPath);
  const activeRoute = findRoute(currentPath);

  useEffect(() => {
    updateDocumentMeta(activeRoute, !known);
  }, [activeRoute, known]);

  // Listen to browser back / forward & hashchange
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      setCurrentHash(window.location.hash.replace(/^#/, ''));
      setIsMobileNavOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Global Cmd+K / Ctrl+K shortcut for search + Escape for mobile nav
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isMobileNavOpen) {
        e.preventDefault();
        setIsMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isMobileNavOpen]);

  const navigateToPath = useCallback((path: string, hash?: string) => {
    const cleanPath = normalizePath(path);
    const fullUrl = hash ? `${cleanPath}#${hash}` : cleanPath;

    if (typeof window !== 'undefined') {
      const currentFull = `${normalizePath(window.location.pathname)}${window.location.hash}`;
      if (currentFull !== fullUrl) {
        window.history.pushState({}, '', fullUrl);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setCurrentPath(cleanPath);
    setCurrentHash(hash || '');
    setIsMobileNavOpen(false);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    hash?: string
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigateToPath(path, hash);
  };

  const handleSelectTier = (tier: AccessTier, customProfile?: Partial<AccessProfile>) => {
    const base = DEMO_PRESET_PROFILES[tier] || DEMO_PRESET_PROFILES[0];
    const updated: AccessProfile = {
      ...base,
      membershipStatus: tier > 0 ? 'approved' : 'unregistered',
      ...(customProfile || {}),
      tier,
    };
    setUserProfile(updated);
    saveProfile(updated);
  };

  const handleSwitchMode = (mode: 'consumer' | 'portal') => {
    saveMode(mode);
  };

  const renderMainContent = () => {
    if (!known) {
      return (
        <section className="py-16 bg-[#090A0C]">
          <div className="max-w-[780px] mx-auto px-4 sm:px-6 space-y-6">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Page not found
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              We couldn&rsquo;t find a page at <code className="font-mono text-[#E8C98B]">{currentPath}</code>. Explore any of our four doors or return to the homepage.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-base rounded-sm"
              >
                <span>Back to Home</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="/learn"
                onClick={(e) => handleLinkClick(e, '/learn')}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#141822] hover:bg-[#1C2232] border border-white/15 text-white text-base rounded-sm"
              >
                <span>Explore Learn</span>
              </a>
            </div>
          </div>
        </section>
      );
    }

    switch (activeRoute.view) {
      case 'home':
        return <ConsumerPublicView onNavigate={navigateToPath} />;

      case 'door':
        return (
          <DoorLandingPage
            door={activeRoute.door || 'learn'}
            onNavigate={navigateToPath}
          />
        );

      case 'program': {
        const program = findProgramByPath(activeRoute.path);
        if (!program) return <ConsumerPublicView onNavigate={navigateToPath} />;
        return <ProgramPage program={program} onNavigate={navigateToPath} />;
      }

      case 'institutions':
        return <InstitutionsLandingPage onNavigate={navigateToPath} />;

      case 'investors':
        return <InvestorRelationsPage onNavigate={navigateToPath} />;

      case 'about':
        return <AboutPage onNavigate={navigateToPath} />;

      case 'contact':
        return <ContactPage onNavigate={navigateToPath} />;

      case 'privacy':
        return <PrivacyPage onNavigate={navigateToPath} />;

      case 'terms':
        return <TermsPage onNavigate={navigateToPath} />;

      case 'intelligence': {
        const subTab = activeRoute.intelligenceSubTab || 'editorial';
        return (
          <section className="py-10 sm:py-14 bg-[#090A0C]">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
              <SiteBreadcrumbs
                items={
                  subTab === 'editorial'
                    ? [{ label: 'Research Wire' }]
                    : [
                        { label: 'Research Wire', href: '/intelligence' },
                        { label: subTab === 'market_wire' ? 'Market Wire' : 'Newsletter' },
                      ]
                }
                onNavigate={navigateToPath}
              />

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="text-sm font-mono uppercase tracking-widest text-[#C89B3C] font-semibold">
                    Guides, Briefings &amp; Feed
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                    {subTab === 'editorial'
                      ? 'Research Wire'
                      : subTab === 'market_wire'
                      ? 'Market Wire'
                      : 'Newsletter Updates'}
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="/intelligence"
                    onClick={(e) => handleLinkClick(e, '/intelligence')}
                    className={`inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-sm text-sm font-mono transition-colors ${
                      subTab === 'editorial'
                        ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-200 border border-white/15'
                    }`}
                  >
                    <BookOpen size={15} />
                    <span>Articles</span>
                  </a>

                  <a
                    href="/intelligence/market-wire"
                    onClick={(e) => handleLinkClick(e, '/intelligence/market-wire')}
                    className={`inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-sm text-sm font-mono transition-colors ${
                      subTab === 'market_wire'
                        ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-200 border border-white/15'
                    }`}
                  >
                    <Radio size={15} />
                    <span>Market Wire</span>
                  </a>

                  <a
                    href="/intelligence/newsletter"
                    onClick={(e) => handleLinkClick(e, '/intelligence/newsletter')}
                    className={`inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-sm text-sm font-mono transition-colors ${
                      subTab === 'newsletter'
                        ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-200 border border-white/15'
                    }`}
                  >
                    <Mail size={15} />
                    <span>Newsletter</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsRssModalOpen(true)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-sm text-sm font-mono bg-[#141824] hover:bg-[#1D2232] text-[#E8C98B] border border-[#C89B3C]/40 cursor-pointer"
                  >
                    <Rss size={15} />
                    <span>RSS</span>
                  </button>
                </div>
              </div>

              {subTab === 'editorial' && (
                <BlogEditorialSection initialArticleId={currentHash || undefined} />
              )}
              {subTab === 'market_wire' && <MarketIntelligenceFeed />}
              {subTab === 'newsletter' && <NewsletterSignup variant="card" />}
            </div>
          </section>
        );
      }

      case 'login':
        return (
          <section className="py-12 sm:py-16 bg-[#090A0C]">
            <div className="max-w-[680px] mx-auto px-4 sm:px-6 space-y-6">
              <SiteBreadcrumbs items={[{ label: 'Member Sign In' }]} onNavigate={navigateToPath} />

              <div className="p-6 sm:p-8 rounded-xl bg-[#10141D] border border-white/15 space-y-4">
                <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#E8C98B]">
                  <Lock size={15} className="text-[#C89B3C]" />
                  <span>Partner &amp; Coordinator Workspace</span>
                </div>
                <h1 className="text-3xl font-display font-bold text-white">Member Sign In</h1>
                <p className="text-base text-neutral-200 leading-relaxed">
                  All public guides, courses, programs, and contact forms on College Company are open without an account. Sign in here only if you have an authorized partner or coordinator workspace credential.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setIsLoginModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-base rounded-sm transition-colors cursor-pointer"
                  >
                    <span>Open Sign-In Dialog</span>
                    <ArrowRight size={17} />
                  </button>
                  <a
                    href="/"
                    onClick={(e) => handleLinkClick(e, '/')}
                    className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 bg-[#161B26] hover:bg-[#1E2636] border border-white/15 text-white font-medium text-base rounded-sm transition-colors"
                  >
                    Return to Public Site
                  </a>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return <ConsumerPublicView onNavigate={navigateToPath} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F5F5F3] font-sans selection:bg-[#C89B3C]/25 selection:text-white flex flex-col antialiased">
      {/* Skip to Main Content Link for Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#C89B3C] focus:text-[#090A0C] focus:font-bold focus:rounded"
      >
        Skip to main content
      </a>

      {/* =================================================================== */}
      {/* PERSISTENT HEADER (Clean at 320px through 1440px, zero overlap) */}
      {/* =================================================================== */}
      <header className="sticky top-0 z-40 bg-[#090A0C]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-3">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="inline-flex items-center min-h-[44px] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] rounded"
            aria-label="College Company Home"
          >
            <BrandLogo />
          </a>

          {/* Desktop Navigation (lg: 1024px+ fits cleanly on 1 line) */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-4 xl:gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive =
                currentPath === item.path ||
                (item.path !== '/' && currentPath.startsWith(`${item.path}/`));
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex items-center min-h-[44px] text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] rounded px-1 ${
                    isActive ? 'text-[#E8C98B] font-semibold' : 'text-neutral-200 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Search + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search programs and pages"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 rounded-sm bg-[#141822] hover:bg-[#1C2232] border border-white/15 hover:border-[#C89B3C]/50 text-neutral-200 hover:text-white text-sm font-mono transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
            >
              <Search size={16} className="text-[#C89B3C]" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-sm bg-[#141822] border border-white/15 text-neutral-200 hover:text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
            >
              {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer — exact same items and order as desktop */}
        {isMobileNavOpen && (
          <nav
            id="mobile-navigation-drawer"
            ref={mobileMenuRef}
            aria-label="Mobile navigation"
            className="lg:hidden bg-[#0D1017] border-t border-white/10 px-4 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                currentPath === item.path ||
                (item.path !== '/' && currentPath.startsWith(`${item.path}/`));
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center min-h-[44px] px-3 py-2.5 rounded-sm text-base font-medium border-b border-white/[0.06] last:border-b-0 ${
                    isActive ? 'text-[#E8C98B] bg-white/[0.04]' : 'text-neutral-100 hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        )}
      </header>

      {/* =================================================================== */}
      {/* MAIN CONTENT */}
      {/* =================================================================== */}
      <main id="main-content" className="flex-grow overflow-x-hidden">
        {renderMainContent()}
      </main>

      {/* =================================================================== */}
      {/* PERSISTENT FOOTER */}
      {/* =================================================================== */}
      <footer className="bg-[#07080B] border-t border-white/10 py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
            {/* Brand & Location */}
            <div className="md:col-span-5 space-y-4">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="inline-flex items-center min-h-[44px]"
              >
                <BrandLogo />
              </a>
              <p className="text-base text-neutral-300 max-w-md leading-relaxed">
                The alternative institution for the general collegiate population — micro-courses for jobs and entrepreneurship, competitions beyond varsity, and compliant ways to earn while you learn.
              </p>
              <div className="text-sm text-neutral-300 space-y-1">
                <div>Boston, Massachusetts</div>
                <div>
                  <a
                    href="mailto:kevin@collegeesportsx.com"
                    className="text-[#E8C98B] hover:text-white underline underline-offset-2"
                  >
                    kevin@collegeesportsx.com
                  </a>
                </div>
              </div>
            </div>

            {/* Four Doors */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#E8C98B] font-semibold">
                Programs
              </div>
              <ul className="space-y-1">
                {[
                  { label: 'Learn', path: '/learn' },
                  { label: 'Compete', path: '/compete' },
                  { label: 'Earn', path: '/earn' },
                  { label: 'Trust', path: '/trust' },
                ].map((link) => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleLinkClick(e, link.path)}
                      className="inline-flex items-center min-h-[44px] text-base text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info & Legal */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#E8C98B] font-semibold">
                Organization
              </div>
              <ul className="space-y-1">
                {[
                  { label: 'About', path: '/about' },
                  { label: 'Contact', path: '/contact' },
                  { label: 'For Institutions & Partners', path: '/institutions' },
                  { label: 'Investor Relations', path: '/institutions/investors' },
                  { label: 'Privacy', path: '/privacy' },
                  { label: 'Terms', path: '/terms' },
                ].map((link) => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleLinkClick(e, link.path)}
                      className="inline-flex items-center min-h-[44px] text-base text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wire & Feedback */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#E8C98B] font-semibold">
                Updates
              </div>
              <ul className="space-y-1">
                <li>
                  <a
                    href="/intelligence"
                    onClick={(e) => handleLinkClick(e, '/intelligence')}
                    className="inline-flex items-center min-h-[44px] text-base text-neutral-300 hover:text-white transition-colors"
                  >
                    Research Wire
                  </a>
                </li>
                <li>
                  <a
                    href="/intelligence/market-wire"
                    onClick={(e) => handleLinkClick(e, '/intelligence/market-wire')}
                    className="inline-flex items-center min-h-[44px] text-base text-neutral-300 hover:text-white transition-colors"
                  >
                    Market Wire
                  </a>
                </li>
                <li>
                  <a
                    href="/rss.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[44px] text-base text-neutral-300 hover:text-white transition-colors"
                  >
                    <Rss size={15} className="text-[#C89B3C]" />
                    <span>RSS</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:kevin@collegeesportsx.com?subject=Feedback%20on%20College%20Company%20Site"
                    className="inline-flex items-center gap-1.5 min-h-[44px] text-base text-[#E8C98B] hover:text-white transition-colors"
                  >
                    <MessageSquare size={15} />
                    <span>Was this page helpful?</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Mandatory Development Preview Notice & Copyright */}
          <div className="space-y-2 text-sm text-neutral-300">
            <p className="font-medium text-neutral-200">
              Development preview — programs, data, and commercial terms are illustrative and subject to verification.
            </p>
            <p className="text-neutral-400">
              &copy; 2026 College Company. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* =================================================================== */}
      {/* ACCESSIBLE SEARCH & MODALS */}
      {/* =================================================================== */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigatePath={navigateToPath}
      />

      <RssSubscriptionModal
        isOpen={isRssModalOpen}
        onClose={() => setIsRssModalOpen(false)}
      />

      <PrivateAccessGateModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentProfile={userProfile}
        onSelectTier={handleSelectTier}
        onSwitchMode={handleSwitchMode}
      />
    </div>
  );
};

export default App;
