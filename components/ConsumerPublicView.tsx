import React from 'react';
import { ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { DOOR_META, getProgramsByDoor, ProgramItem } from '../src/data/programs';
import { RESEARCH_WIRE_ITEMS } from '../src/rssData';
import { ProgramStatusBadge } from './public/SiteBreadcrumbs';
import { NewsletterSignup } from './NewsletterSignup';
import heroArenaImg from '../src/assets/images/hero_collegiate_arena_1790396550961.jpg';

export interface ConsumerPublicViewProps {
  onNavigate: (path: string, hash?: string) => void;
}

export const ConsumerPublicView: React.FC<ConsumerPublicViewProps> = ({ onNavigate }) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    hash?: string
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(path, hash);
  };

  const scrollToLearn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' });
  };

  const learnPrograms = getProgramsByDoor('learn').filter((p) => !p.parentEntry);
  const forParentsProgram = getProgramsByDoor('learn').find((p) => p.parentEntry);
  const competePrograms = getProgramsByDoor('compete');
  const earnPrograms = getProgramsByDoor('earn');
  const trustPrograms = getProgramsByDoor('trust');
  const latestArticles = RESEARCH_WIRE_ITEMS.filter((item) => item.kind === 'article').slice(0, 3);

  const renderProgramCard = (program: ProgramItem) => (
    <article
      key={program.id}
      className="bg-[#10141D] border border-white/10 hover:border-[#C89B3C]/50 rounded-xl p-6 flex flex-col justify-between gap-4 transition-colors shadow-lg"
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#E8C98B]">
            {program.doorLabel}
            {program.badge ? ` · ${program.badge}` : ''}
            {program.flagship ? ' · Flagship' : ''}
          </span>
          <ProgramStatusBadge status={program.status} />
        </div>

        <h3 className="text-xl font-display font-bold text-white leading-snug">
          {program.name}
        </h3>

        <p className="text-base text-neutral-300 leading-relaxed">{program.oneLine}</p>
      </div>

      <a
        href={program.path}
        onClick={(e) => handleLinkClick(e, program.path)}
        className="inline-flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-sm bg-[#161B26] hover:bg-[#1E2636] border border-white/15 hover:border-[#C89B3C]/50 text-white text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
      >
        <span>Learn More</span>
        <ArrowRight size={16} className="text-[#E8C98B]" />
      </a>
    </article>
  );

  return (
    <div className="bg-[#090A0C] text-[#F5F5F3]">
      {/* ===================================================================== */}
      {/* 1. HERO SECTION */}
      {/* ===================================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-white/[0.08] bg-grid-subtle">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-sm font-mono uppercase tracking-widest text-[#E8C98B] font-semibold">
                College Company · Learn · Compete · Earn · Trust
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-display font-bold text-white tracking-tight leading-[1.1]">
                Learn a skill. Join a team. Earn from both.
              </h1>

              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl">
                College Company is the alternative institution for the general collegiate population — micro-courses for jobs and entrepreneurship, competitions beyond varsity, and compliant ways to earn while you learn.
              </p>

              {/* Hero CTAs: 1 Primary, 1 Secondary */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href="#learn"
                  onClick={scrollToLearn}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-base rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Explore Programs</span>
                  <ArrowRight size={18} />
                </a>

                <a
                  href="/institutions"
                  onClick={(e) => handleLinkClick(e, '/institutions')}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#141822] hover:bg-[#1C2232] border border-white/20 text-white font-semibold text-base rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
                >
                  <span>For Institutions &amp; Partners</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-white/15 aspect-[16/10] bg-[#10141D] shadow-2xl">
                <img
                  src={heroArenaImg}
                  alt="College students participating in a collegiate media production and live event arena"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. DOOR 1 — LEARN */}
      {/* ===================================================================== */}
      <section id="learn" className="py-12 sm:py-16 border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-sm font-mono uppercase tracking-widest text-[#C89B3C] font-semibold">
                {DOOR_META.learn.eyebrow}
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                {DOOR_META.learn.headline}
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed">
                {DOOR_META.learn.description}
              </p>
            </div>
            <a
              href="/learn"
              onClick={(e) => handleLinkClick(e, '/learn')}
              className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-[#E8C98B] hover:text-white shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] rounded px-1"
            >
              <span>All Learn Programs</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {learnPrograms.map(renderProgramCard)}
          </div>

          {/* Visible Entry Point for Parents & Guardians */}
          {forParentsProgram && (
            <div className="p-6 rounded-xl bg-[#101520] border border-[#C89B3C]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#E8C98B] font-semibold">
                  <Users size={16} />
                  <span>For Parents &amp; Guardians</span>
                </div>
                <p className="text-base text-neutral-200 leading-relaxed">
                  {forParentsProgram.oneLine}
                </p>
              </div>
              <a
                href={forParentsProgram.path}
                onClick={(e) => handleLinkClick(e, forParentsProgram.path)}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-sm bg-[#161E2E] hover:bg-[#1F2A40] border border-[#C89B3C]/50 text-[#E8C98B] hover:text-white font-semibold text-base transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
              >
                <span>Open For Parents</span>
                <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. DOOR 2 — COMPETE */}
      {/* ===================================================================== */}
      <section id="compete" className="py-12 sm:py-16 border-b border-white/[0.08] bg-[#0B0D12]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-sm font-mono uppercase tracking-widest text-[#38BDF8] font-semibold">
                {DOOR_META.compete.eyebrow}
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Open to every student, not just varsity.
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed">
                {DOOR_META.compete.description}
              </p>
            </div>
            <a
              href="/compete"
              onClick={(e) => handleLinkClick(e, '/compete')}
              className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-[#7DD3FC] hover:text-white shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded px-1"
            >
              <span>All Compete Programs</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {competePrograms.map(renderProgramCard)}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. DOOR 3 — EARN */}
      {/* ===================================================================== */}
      <section id="earn" className="py-12 sm:py-16 border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-sm font-mono uppercase tracking-widest text-[#68D391] font-semibold">
                {DOOR_META.earn.eyebrow}
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                {DOOR_META.earn.headline}
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed">
                {DOOR_META.earn.description}
              </p>
            </div>
            <a
              href="/earn"
              onClick={(e) => handleLinkClick(e, '/earn')}
              className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-[#68D391] hover:text-white shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#68D391] rounded px-1"
            >
              <span>Explore Earn &amp; Placement Desk</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="p-6 rounded-xl bg-[#0F1816] border border-[#68D391]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#68D391] font-semibold">
                <ShieldCheck size={16} />
                <span>Student-First Charter</span>
              </div>
              <p className="text-base text-neutral-100 leading-relaxed">
                Brands pay a clearly disclosed service fee; students and learners pay zero commission.
              </p>
            </div>
            <a
              href="/trust"
              onClick={(e) => handleLinkClick(e, '/trust')}
              className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-[#68D391] hover:text-white underline underline-offset-4 shrink-0"
            >
              <span>See how Trust protects students</span>
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {earnPrograms.map(renderProgramCard)}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. DOOR 4 — TRUST */}
      {/* ===================================================================== */}
      <section id="trust" className="py-12 sm:py-16 border-b border-white/[0.08] bg-[#0B0D12]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="text-sm font-mono uppercase tracking-widest text-[#E8C98B] font-semibold">
                {DOOR_META.trust.eyebrow}
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                The rules are part of the curriculum — NIL reporting, FTC disclosure, and taxes, taught in every program.
              </h2>
            </div>
            <a
              href="/trust"
              onClick={(e) => handleLinkClick(e, '/trust')}
              className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-[#E8C98B] hover:text-white shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C98B] rounded px-1"
            >
              <span>All Trust Resources</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trustPrograms.map(renderProgramCard)}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. RESEARCH WIRE PREVIEW (3 LATEST) */}
      {/* ===================================================================== */}
      <section id="research-wire" className="py-12 sm:py-16 border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-sm font-mono uppercase tracking-widest text-[#C89B3C] font-semibold">
                Research Wire
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Latest Guides &amp; Briefings
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed">
                Plain-English walkthroughs on creator career tracks, student &amp; parent NIL taxes, and Student-First brand partnerships.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="/intelligence"
                onClick={(e) => handleLinkClick(e, '/intelligence')}
                className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-[#E8C98B] hover:text-white transition-colors"
              >
                <span>Read All Dispatches</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="/intelligence/market-wire"
                onClick={(e) => handleLinkClick(e, '/intelligence/market-wire')}
                className="inline-flex items-center gap-2 min-h-[44px] text-base font-semibold text-neutral-300 hover:text-white transition-colors"
              >
                <span>Market Wire</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <article
                key={article.id}
                className="bg-[#10141D] border border-white/10 hover:border-[#C89B3C]/50 rounded-xl p-6 flex flex-col justify-between gap-4 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#E8C98B]">
                    <span>{article.category}</span>
                    <span className="text-neutral-400">{article.publishedAtFormatted}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-base text-neutral-300 leading-relaxed">{article.subtitle}</p>
                </div>

                <a
                  href={`/intelligence#${article.id}`}
                  onClick={(e) => handleLinkClick(e, '/intelligence', article.id)}
                  className="inline-flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-sm bg-[#161B26] hover:bg-[#1E2636] border border-white/15 text-white text-base font-medium transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight size={16} className="text-[#E8C98B]" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. NEWSLETTER SIGNUP */}
      {/* ===================================================================== */}
      <section id="newsletter" className="py-12 sm:py-16">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <NewsletterSignup variant="card" />
        </div>
      </section>
    </div>
  );
};

export default ConsumerPublicView;
