import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  ChevronRight,
  ChevronLeft,
  Search,
  SlidersHorizontal,
  Building2,
  Shield,
  ShieldCheck,
  FileText,
  Download,
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
  Layers,
  Users,
  Tv,
  Scale,
  Sparkles,
  BarChart3,
  X,
  Menu,
  Settings,
  Filter,
  Briefcase,
  MessageSquare,
  User,
  BookOpen,
  FileSpreadsheet,
  Bell,
  DollarSign,
  Globe,
  Cpu,
  MapPin,
  Radio,
  Copy,
  Printer,
  Check,
  Zap,
  Command,
  Mail
} from 'lucide-react';
import { ScrollReveal } from './components/ScrollReveal';
import { AnimatedCounter } from './components/AnimatedCounter';
import { AdminPanel, HeroImageConfig } from './components/AdminPanel';
import { EcosystemRevenueChart } from './components/EcosystemRevenueChart';
import { InstitutionalHealthDashboard } from './components/InstitutionalHealthDashboard';
import { InstitutionalImpactMap } from './components/InstitutionalImpactMap';
import { GovernanceGrowthVelocityMap } from './components/GovernanceGrowthVelocityMap';
import { MemberProfileAndMessaging } from './components/MemberProfileAndMessaging';
import { ComplianceRepositoryPortal } from './components/ComplianceRepositoryPortal';
import { ComplianceDashboard } from './components/ComplianceDashboard';
import { InstitutionalRiskFactors } from './components/InstitutionalRiskFactors';
import { FinancialReportModal } from './components/FinancialReportModal';
import { NilOpportunityModal, NilOpportunityWidget } from './components/NilOpportunityNotifications';
import { NilAnalyticsSubView } from './components/NilAnalyticsSubView';
import { StudentAthleteNilCalculator } from './components/StudentAthleteNilCalculator';
import { MarketIntelligenceFeed } from './components/MarketIntelligenceFeed';
import { InvestorStrategyFaq } from './components/InvestorStrategyFaq';
import { resolveRouteState, pathForState, findRoute, type RouteState } from './src/routes';
import { BlogEditorialSection } from './components/BlogEditorialSection';
import { InstitutionalLegalModal, LegalModalType } from './components/InstitutionalLegalModal';
import { HoldingEcosystemTopology } from './components/HoldingEcosystemTopology';
import { StrategicCommercializationPlan } from './components/StrategicCommercializationPlan';
import { CommandPalette } from './components/CommandPalette';
import { NewsletterSignup } from './components/NewsletterSignup';
import { downloadFinancialPDF, downloadFinancialCSV, calculateFinancialMetrics } from './src/utils/exportFinancialReport';
import { motion, AnimatePresence } from 'framer-motion';

// Production Bundled Image Assets
import heroArenaImg from './src/assets/images/hero_collegiate_arena_1790396550961.jpg';
import holdingDroneImg from './src/assets/images/holding_drone_racing_1790396561471.jpg';
import mediaBroadcastImg from './src/assets/images/media_broadcast_center_1790396570502.jpg';
import executiveBoardroomImg from './src/assets/images/diverse_boardroom_1791594527458.jpg';
import nilClearinghouseImg from './src/assets/images/nil_clearinghouse_1791594540477.jpg';
import creatorStudioImg from './src/assets/images/creator_studio_1791594557100.jpg';

// --- BESPOKE SOVEREIGN LOGO ---
const SovereignLogo: React.FC<{ className?: string; compact?: boolean }> = ({ className = '', compact = false }) => (
  <div className={`flex items-center gap-3 select-none cursor-pointer ${className}`}>
    <div className="relative w-9 h-9 rounded-sm bg-[#161A22] border border-[#C89B3C]/40 flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
      {/* Monogram Seal */}
      <span className="font-display font-bold text-base tracking-tighter text-[#E6C387]">CC</span>
      <div className="absolute inset-0 border border-[#C89B3C]/10 rounded-sm pointer-events-none"></div>
    </div>
    {!compact && (
      <div className="flex flex-col">
        <span className="font-display text-sm md:text-base font-bold tracking-[0.2em] text-[#F5F5F3] leading-none">
          COLLEGE COMPANY
        </span>
        <span className="text-[9px] font-mono tracking-[0.25em] text-[#C89B3C] uppercase mt-1 leading-none">
          OPERATING HOLDING GROUP
        </span>
      </div>
    )}
  </div>
);

// --- TYPES ---
export interface PortfolioBrand {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  division: 'Competitive Leagues' | 'NIL & Creator Capital' | 'Media & Broadcast' | 'Campus Infrastructure';
  monetization: string;
  status: 'Operating' | 'Scaling' | 'Flagship Incubator';
  targetAudience: string;
  featured?: boolean;
  domain?: string;
  cluster?: string;
  platformConcept?: string;
  coreTechEngine?: string;
  businessModel?: string;
  primaryPlatformHook?: string;
  monetizationHook?: string;
  sourceRef?: string;
}

// --- CURATED PORTFOLIO DATA (43 BRANDS) ---
const PORTFOLIO_DATA: PortfolioBrand[] = [
  // FLAGSHIPS
  {
    id: "cex",
    name: "College Esports Expo (CEX)",
    domain: "collegeesportsexpo.com",
    cluster: "Competitive Leagues & Events",
    tagline: "The premier global collegiate esports and executive convocation.",
    desc: "Originating at Emerson College and scaled into an internationally recognized convening of university athletic directors, tech leaders, and varsity competitors. CEX serves as the institutional cornerstone for policy, broadcasting rights, and talent development.",
    division: "Competitive Leagues",
    platformConcept: "Annual executive intercollegiate convening and commercial rights symposium.",
    coreTechEngine: "Hybrid Convocation Engine & Rights Syndication Portal",
    businessModel: "Enterprise Sponsorships, Executive Passes, and Media Rights",
    primaryPlatformHook: "Exclusive closed-door summit pairing athletic directors with global tech CEOs.",
    monetization: "Executive Registration · Enterprise Sponsorships · Media Rights",
    monetizationHook: "Executive summit tiers ($1,250–$3,500) and title sponsorships up to $250K.",
    status: "Operating",
    targetAudience: "NCAA Athletic Directors, Varsity Directors, Fortune 500 Sponsors",
    featured: true
  },
  {
    id: "nil",
    name: "College Esports NIL",
    domain: "collegeesportsnil.com",
    cluster: "Esports NIL",
    tagline: "B2B roster management, group-licensing platform, and student-athlete liquidity clearinghouse.",
    desc: "B2B roster management, group-licensing platform, and dedicated commercial infrastructure empowering collegiate esports competitors and digital creators to commercialize their Name, Image, and Likeness (NIL). Combines compliance monitoring, smart roster group-licensing, and CPV tracking for collegiate esports programs, club varsity teams, and brand managers.",
    division: "NIL & Creator Capital",
    platformConcept: "B2B roster management and group-licensing platform for collegiate esports.",
    coreTechEngine: "Smart Roster Group-Licensing system & dynamic CPV tracker",
    businessModel: "B2B SaaS & Digital Goods Royalty Shares",
    primaryPlatformHook: "Centralized management of team skins, co-branded jerseys, and stream compliance.",
    monetization: "Annual B2B SaaS Licenses ($3K–$10K/yr) · 15%–20% Digital Royalty Shares",
    monetizationHook: "Annual B2B SaaS licenses ($3,000–$10,000/year) and 15%–20% royalty shares.",
    status: "Operating",
    targetAudience: "Varsity esports programs, university clubs, and program directors",
    sourceRef: "Sources 4, 8, 9, 11, 14, 21, 22 · Intercollegiate Esports Group IP",
    featured: true
  },

  // COMPETITIVE LEAGUES
  {
    id: "cen",
    name: "College Esports Network",
    tagline: "Intercollegiate digital athletic league framework.",
    desc: "Establishes unified conference architectures across college-themed domain real estate (USCEsports, NotreDameEsports, AlabamaEsports, NCAAEsports), cultivating permanent alumni engagement and campus rivalries.",
    division: "Competitive Leagues",
    monetization: "Institutional Licensing · Streaming Rights · Varsity Fees",
    status: "Scaling",
    targetAudience: "Collegiate Esports Programs, Alumni Networks, Student Gamers"
  },
  {
    id: "cgta",
    name: "College GTA",
    tagline: "Cross-platform intercollegiate decathlon league.",
    desc: "A pioneering structured competitive circuit for the Grand Theft Auto ecosystem, standardizing skill challenges, driving physics competitions, and team-based strategy in a compliant collegiate tournament environment.",
    division: "Competitive Leagues",
    monetization: "Tournament Sponsorship · Stream Advertising · Merchandising",
    status: "Scaling",
    targetAudience: "Collegiate Gamers, Community Streamers, Game Publishers"
  },
  {
    id: "cdrl",
    name: "College Drone Racing League (CDRL)",
    tagline: "NCAA-modeled nationwide collegiate drone sports circuit.",
    desc: "Brings the precision of high-speed FPV drone aeronautics to campuses nationwide. Blends STEM robotics, real-time telemetry, and high-adrenaline tournament broadcast across regional collegiate divisions.",
    division: "Competitive Leagues",
    monetization: "Corporate Engineering Sponsors · Broadcast Licensing · Equipment Licensing",
    status: "Flagship Incubator",
    targetAudience: "University Engineering Clubs, Aeronautics Departments, Drone Racers"
  },
  {
    id: "udrl",
    name: "University Drone League (UDRL)",
    tagline: "Foundational feeder league and development circuit for CDRL.",
    desc: "The preparatory feeder platform for undergraduate drone pilots and robotics teams to test hardware, refine autonomous algorithms, and qualify for national division competition.",
    division: "Competitive Leagues",
    monetization: "Affiliate Campus Dues · Hardware Partner Bundles",
    status: "Scaling",
    targetAudience: "Undergraduate Drone Pilots, STEM Student Societies"
  },
  {
    id: "crl",
    name: "College Racing League (CRL)",
    tagline: "High-fidelity collegiate sim-racing motorsport circuit.",
    desc: "The apex university-level sim-racing platform. Bridges automotive engineering students with aspiring professional motorsport drivers across competitive iRacing and telemetry simulators.",
    division: "Competitive Leagues",
    monetization: "Automotive Brand Alliances · Sim-Rig Hardware Sponsorships",
    status: "Scaling",
    targetAudience: "Sim Racers, Mechanical Engineering Students, Automotive Sponsors"
  },
  {
    id: "cec",
    name: "College Esports Champions",
    tagline: "March Madness-style national bracket tournament platform.",
    desc: "Structured single-elimination collegiate championship platform running cross-campus brackets with national prestige, trophy ceremonies, and prime broadcast timeframes.",
    division: "Competitive Leagues",
    monetization: "Broadcast Rights · Title Sponsorship · Digital Bracket Licensing",
    status: "Operating",
    targetAudience: "Varsity Teams, Intercollegiate Conferences, Nationwide Fans"
  },

  // NIL & CREATOR CAPITAL
  {
    id: "academy",
    name: "College Esports Academy",
    tagline: "Accredited player performance and executive coaching academy.",
    desc: "Structured training modules, tactical play review, and physical-mental conditioning designed to prepare student competitors for varsity scholarship retention and pro-tier drafts.",
    division: "NIL & Creator Capital",
    monetization: "Per-Seat Tuition · University Department Subscriptions",
    status: "Operating",
    targetAudience: "Collegiate Athletes, Club Captains, Aspiring Competitors"
  },
  {
    id: "creator-academy",
    name: "College Creator Academy",
    tagline: "Workforce incubator for the $230B digital creator economy.",
    desc: "Equips student creators with multi-platform audience growth tactics, brand negotiation mechanics, and media production expertise, bridging creative talent directly to revenue.",
    division: "NIL & Creator Capital",
    monetization: "Cohort Enrollment · Enterprise Partner Recruiting · Agency Fees",
    status: "Scaling",
    targetAudience: "Campus Influencers, Student Broadcasters, Digital Storytellers"
  },
  {
    id: "coach",
    name: "College Esports Coach",
    tagline: "Two-sided marketplace for vetted collegiate coaching talent.",
    desc: "Matches student teams with licensed collegiate and semi-pro coaches, providing secure escrow payments, tactical film review suites, and verified coaching credentials.",
    division: "NIL & Creator Capital",
    monetization: "15% Take Rate on Coaching Contracts · Certified Coach Badging",
    status: "Scaling",
    targetAudience: "Independent Coaches, Varsity Programs, Club Leadership"
  },
  {
    id: "innovation",
    name: "Esports Innovation",
    tagline: "Collegiate workforce training and brand hackathon platform.",
    desc: "Partners directly with corporate sponsors to host sponsored problem-solving challenges, gaming hackathons, and corporate fellowship recruiting pipelines.",
    division: "NIL & Creator Capital",
    monetization: "Corporate Challenge Retainers · Talent Placement Fees",
    status: "Operating",
    targetAudience: "Enterprise Employers, STEM Students, Collegiate Innovators"
  },
  {
    id: "guide",
    name: "College Esports Guide",
    tagline: "The definitive encyclopedia of varsity scholarships and programs.",
    desc: "Comprehensive database detailing scholarship allocations, practice facilities, academic requirements, and coaching staff for over 450 North American colleges.",
    division: "NIL & Creator Capital",
    monetization: "Premium University Profiles · Student Lead Generation",
    status: "Operating",
    targetAudience: "High School Recruits, Guidance Counselors, Parents"
  },

  // MEDIA & BROADCAST
  {
    id: "tv",
    name: "College Esports TV",
    tagline: "Linear and streaming broadcast hub for collegiate tournaments.",
    desc: "High-production streaming network featuring live multi-cam tournament feeds, post-game analysis desks, and syndicated student production crew opportunities.",
    division: "Media & Broadcast",
    monetization: "Advertising Inventory · FAST Channel Syndication · Live Production Fees",
    status: "Operating",
    targetAudience: "Digital Native Viewers, Campus Sports Fans, Broadcasters"
  },
  {
    id: "media",
    name: "College Esports Media",
    tagline: "Authoritative journalism and analytical trade publication.",
    desc: "In-depth investigative reports, transfer portal tracking, university program rankings, and commercial business intelligence for the collegiate esports sector.",
    division: "Media & Broadcast",
    monetization: "Corporate Content Sponsorships · Enterprise Newsletter Advertising",
    status: "Operating",
    targetAudience: "Industry Executives, Athletic Directors, Media Analysts"
  },
  {
    id: "online",
    name: "College Esports Online",
    tagline: "Centralized live tournament scores, schedules, and standings portal.",
    desc: "Real-time scores, API feeds, bracket trackers, and game replay archives providing zero-latency match status across all affiliated collegiate conferences.",
    division: "Media & Broadcast",
    monetization: "Programmatic Media · Live Sponsor Integration",
    status: "Scaling",
    targetAudience: "Competitors, Active Viewers, Fantasy Gaming Enthusiasts"
  },
  {
    id: "co",
    name: "College Esports CO",
    tagline: "Long-form investigative media and documentary studio.",
    desc: "Produces cinematic docuseries and high-impact investigative reporting examining collegiate program economics, student welfare, and program transformations.",
    division: "Media & Broadcast",
    monetization: "Documentary Licensing · Streaming Distribution Rights",
    status: "Flagship Incubator",
    targetAudience: "Documentary Audiences, Higher Education Regulators"
  },

  // CAMPUS INFRASTRUCTURE
  {
    id: "arena",
    name: "College Esports Arena",
    tagline: "Turnkey architectural venue design and tournament staging.",
    desc: "Advises universities on capital facility retrofits, acoustic staging, fiber network architectures, and dynamic spectator installations for varsity esports complexes.",
    division: "Campus Infrastructure",
    monetization: "Architectural Consulting Fees · Equipment Procurement Commissions",
    status: "Operating",
    targetAudience: "University Facilities Boards, Athletic Department Planners"
  },
  {
    id: "med",
    name: "College Esports Med",
    tagline: "Dedicated esports medicine and student-athlete health network.",
    desc: "Specialized telehealth network addressing repetitive strain injuries (RSI), vision strain, posture ergonomics, and sleep/cognitive optimization for digital competitors.",
    division: "Campus Infrastructure",
    monetization: "University Health Plan Per-Capita Subscriptions · Telehealth Billing",
    status: "Scaling",
    targetAudience: "Varsity Student Competitors, Campus Medical Centers"
  },
  {
    id: "biz",
    name: "College Esports Biz",
    tagline: "AI-driven athletic department analytics and monetization engine.",
    desc: "Equips university administrators with predictive analytics, merchandise sales forecasting, and roster ROI modeling to secure institutional budget approvals.",
    division: "Campus Infrastructure",
    monetization: "B2B SaaS Annual Subscriptions · Advisory Retainers",
    status: "Flagship Incubator",
    targetAudience: "Chief Financial Officers, Athletic Directors, Department Chairs"
  },
  {
    id: "branding",
    name: "College Esports Branding",
    tagline: "Brand strategy and visual identity studio for varsity programs.",
    desc: "Crafts iconic logos, uniform kits, mascot typography, and trademark assets for newly established or transitioning collegiate athletic programs.",
    division: "Campus Infrastructure",
    monetization: "Creative Design Fees · Trademark Royalties",
    status: "Operating",
    targetAudience: "Collegiate Athletic Departments, Club Programs"
  },
  {
    id: "group",
    name: "College Esports Group",
    tagline: "Consortium and advocacy council for university stakeholders.",
    desc: "Facilitates inter-institutional policy discussions, ethics boards, and governance standardizations across conference commissioners and legal counsels.",
    division: "Campus Infrastructure",
    monetization: "Institutional Membership Dues · Policy Research Grants",
    status: "Operating",
    targetAudience: "Conference Commissioners, University Provosts"
  },
  {
    id: "marketing",
    name: "College Esports Marketing",
    tagline: "Omnichannel growth agency targeting Gen Z collegiate demographics.",
    desc: "Executes on-campus experiential campaigns, collegiate influencer activations, and branded tournament takeovers for national consumer brands.",
    division: "Campus Infrastructure",
    monetization: "Agency Monthly Retainers · Performance Performance Bonuses",
    status: "Operating",
    targetAudience: "Consumer Brands, Tech Hardware OEMs, Beverage Companies"
  },
  {
    id: "promo",
    name: "College Esports Promo",
    tagline: "Targeted promotional distribution and ticket sales activation.",
    desc: "Drives attendance to live regional collegiate finals and digital streaming drops through campus ambassador teams and targeted social geo-fencing.",
    division: "Campus Infrastructure",
    monetization: "Ticketing Service Fee · Campaign Execution Fees",
    status: "Scaling",
    targetAudience: "Event Organizers, Local Campus Communities"
  },
  {
    id: "gear",
    name: "College Esports Gear",
    tagline: "Official technical apparel and high-performance equipment.",
    desc: "Equips student competitors with competition-grade jerseys, ergonomic compression sleeves, and varsity travel bags engineered specifically for esports.",
    division: "Campus Infrastructure",
    monetization: "Direct-to-Consumer Sales · University Team Volume Contracts",
    status: "Operating",
    targetAudience: "Collegiate Athletes, Program Staff, Alumni"
  },
  {
    id: "shop",
    name: "College Esports Shop",
    tagline: "Curated e-commerce destination for collegiate lifestyle fashion.",
    desc: "Fashion-forward streetwear and collegiate team merchandise designed for everyday campus wear, bridging gaming culture with traditional college pride.",
    division: "Campus Infrastructure",
    monetization: "Apparel Margins · Drop Shipping Infrastructure",
    status: "Operating",
    targetAudience: "General Student Body, Casual Gamers, Friends & Family"
  },
  {
    id: "store",
    name: "College Esports Store",
    tagline: "Official memorabilia, digital collectibles, and championship keepsakes.",
    desc: "Dedicated to commemorative varsity memorabilia, championship rings, banners, and verified match-worn gear for institutional collectors.",
    division: "Campus Infrastructure",
    monetization: "High-Margin Commemorative Memorabilia · Licensing Splits",
    status: "Scaling",
    targetAudience: "Alumni Donors, Program Benefactors, Avid Collectors"
  },
  {
    id: "in",
    name: "College Esports IN",
    tagline: "Gateway to the high-growth Indian collegiate gaming market.",
    desc: "Expands the College Company operational framework into premier universities across India, serving one of the world's most rapidly expanding digital youth populations.",
    division: "Campus Infrastructure",
    monetization: "International Joint Ventures · Regional Brand Partnerships",
    status: "Flagship Incubator",
    targetAudience: "Indian Universities, Telecommunications Providers, Regional Gamers"
  },

  // EXPANDED SCHOLASTIC, ENTERPRISE NIL & INSTITUTIONAL ASSETS
  {
    id: "highschool-nil",
    name: "High School NIL",
    domain: "highschoolnil.com",
    cluster: "High School NIL",
    tagline: "Flagship K-12 NIL clearinghouse and compliant brand matching network.",
    desc: "The nation's flagship K-12 Name, Image, and Likeness (NIL) clearinghouse and commercial marketplace for prep athletes. Built specifically for scholastic competitors aged 13–18, parents, athletic directors, and regional corporate sponsors. Features a proprietary State-Bylaw Parser dynamically mapping all 50 state high school athletic association (NFHS/state) eligibility rules, paired with automated statutory compliance analysis. Guarantees student-athletes can safely monetize community endorsements without jeopardizing high school championships or future collegiate NCAA standing.",
    division: "NIL & Creator Capital",
    platformConcept: "Flagship K-12 NIL clearinghouse and marketplace for safe, compliant local brand matching.",
    coreTechEngine: "Proprietary 50-State Bylaw Parsing & Statutory Compliance Engine",
    businessModel: "Marketplace Transaction Fees & B2B SaaS",
    primaryPlatformHook: "Parent/Guardian Co-Signing Portal and instant eligibility audits with real-time rule updates.",
    monetization: "10% Marketplace Take-Rate · District Licensing Dues · Enterprise Brand Escrow",
    monetizationHook: "10% transaction fee on completed deals and district licensing fees.",
    status: "Operating",
    targetAudience: "High school athletes (ages 13–18), parents/guardians, athletic directors, and regional brands",
    sourceRef: "Sources 1-16 · Scholastic NIL Clearinghouse Directive",
    featured: true
  },
  {
    id: "college-nil-hub",
    name: "College NIL Hub",
    domain: "collegenilhub.com",
    cluster: "College NIL",
    tagline: "Central enterprise operating system for collegiate NIL management and revenue-sharing tracking.",
    desc: "The central enterprise operating system purpose-built for university athletic directors, conference compliance desks, and third-party booster collectives. Features an automated institutional cap manager tracking active roster distributions against the landmark $20.5M–$22.5M/yr House v. NCAA settlement ceilings. Integrates Collegiate Sports Commission (CSC) Fair Market Value (FMV) appraisal algorithms to guarantee absolute antitrust, Title IX, and roster transparency across varsity athletic programs.",
    division: "NIL & Creator Capital",
    platformConcept: "Central enterprise operating system for collegiate NIL management and revenue-sharing tracking.",
    coreTechEngine: "Real-time NCAA/House settlement cap management & CSC FMV engine",
    businessModel: "B2B Enterprise SaaS Subscriptions ($15,000 to $100,000/year)",
    primaryPlatformHook: "Real-time data feed displaying active roster deals and institutional cap counters ($20.5M+).",
    monetization: "Annual Enterprise SaaS ($15K–$100K/yr) · Roster Cap Tracking Modules",
    monetizationHook: "Tiered annual SaaS licensing fees ranging from $15,000 to $100,000/year.",
    status: "Operating",
    targetAudience: "University athletic directors, compliance officers, and third-party collectives",
    sourceRef: "Sources 1-6, 9-11, 16, 17 · Enterprise Athletic Governance",
    featured: true
  },
  {
    id: "college-nil-shop",
    name: "College NIL Shop",
    domain: "collegenil.shop",
    cluster: "College NIL",
    tagline: "D2C collegiate merchandise powerhouse and interactive commerce hub.",
    desc: "Direct-to-consumer licensed merchandise powerhouse and interactive digital fan commerce destination. Powered by live 3D web product renderers and a generative AI print-on-demand (POD) manufacturing pipeline, the platform empowers fans and alumni to customize officially licensed jerseys, lifestyle streetwear, and signature athlete apparel on demand. Automatically allocates 25%–30% net gross profit margins across the student-athlete, university licensing desk, and holding company clearinghouse.",
    division: "NIL & Creator Capital",
    platformConcept: "D2C collegiate merchandise powerhouse and interactive commerce hub.",
    coreTechEngine: "Live 3D design renderers & Generative AI print-on-demand (POD) engine",
    businessModel: "D2C E-Commerce Margins & Transaction Revenue Share",
    primaryPlatformHook: "Roster-to-Revenue Simulator allowing fans to instantly customize officially licensed athlete gear.",
    monetization: "25%–30% D2C Merchandise Margins · On-Demand Customization Fees",
    monetizationHook: "25%–30% net margins shared between athlete, school, and NBG.",
    status: "Operating",
    targetAudience: "College sports fans, alumni, and student-athletes",
    sourceRef: "Sources 1-6, 8-14, 16-20 · Collegiate E-Commerce Infrastructure"
  },
  {
    id: "esports-nil",
    name: "Esports NIL",
    domain: "esportsnil.com",
    cluster: "Esports NIL",
    tagline: "Gaming and influencer marketplace connecting creators with global hardware and peripheral brands.",
    desc: "The dedicated commercial influencer marketplace and liquidity gateway connecting collegiate gamers, competitive esports athletes, and streamers directly with global PC hardware OEMs, peripheral makers, and consumer lifestyle brands. Utilizes a proprietary dynamic Cost-Per-Viewer (CPV) pricing algorithm synchronized with live streaming platform APIs to price micro-sponsorships, product unboxings, and live tournament overlays in real time.",
    division: "NIL & Creator Capital",
    platformConcept: "Gaming and influencer marketplace connecting creators with global hardware and peripheral brands.",
    coreTechEngine: "Dynamic CPV (Cost-Per-Viewer) algorithm & streamer API integration",
    businessModel: "Marketplace Transaction Fees & SaaS Subscriptions",
    primaryPlatformHook: "Instant integration with streamer portfolios pulling real-time viewer analytics across major live broadcasting platforms.",
    monetization: "12%–15% Escrow Transaction Fee · Creator Pro Tier ($9.99/mo)",
    monetizationHook: "12%–15% platform escrow fee and Creator Pro subscriptions at $9.99/month.",
    status: "Operating",
    targetAudience: "Professional and collegiate gamers, streamers, and gaming brand managers",
    sourceRef: "Sources 1-6, 8-11, 14, 19, 21, 22 · Digital Creator Market Index"
  },
  {
    id: "player-nil-org",
    name: "Player NIL Foundation",
    domain: "playernil.org",
    cluster: "Athlete Advocacy",
    tagline: "Non-profit advocacy engine providing athlete protection, education, and legal defense.",
    desc: "A dedicated 501(c)(3) non-profit athlete defense and fiduciary advocacy initiative engineered to safeguard high school and collegiate athletes from exploitative agents and predatory commercial contracts. Leverages proprietary contract parsing models and automated algorithmic pro-bono review triggers to analyze contract clauses, non-competes, and perpetual likeness grants. Provides free access to a nationwide network of volunteer sports attorneys and comprehensive financial literacy masterclasses.",
    division: "NIL & Creator Capital",
    platformConcept: "Non-profit advocacy engine providing athlete protection, education, and legal defense.",
    coreTechEngine: "Proprietary Contract Parsing Engine & automated pro-bono review triggers",
    businessModel: "501(c)(3) Charity (Grants & 1% flow-through fees)",
    primaryPlatformHook: "Access to national network of pro-bono contract lawyers and financial literacy modules.",
    monetization: "Philanthropic Corporate Grants · 1% Network Transaction Flow-Through",
    monetizationHook: "Funded by corporate grants and 1% of transaction fees routed from commercial activities.",
    status: "Operating",
    targetAudience: "High school and collegiate athletes, parents, and families",
    sourceRef: "Sources 1-4, 8, 10, 11, 13, 15, 17-20 · 501(c)(3) Athlete Defense Charter"
  },
  {
    id: "college-revenue-share",
    name: "College Revenue Share",
    domain: "collegerevenueshare.com",
    cluster: "Institutional & Compliance",
    tagline: "Institutional financial clearinghouse for managing direct university revenue-sharing payouts.",
    desc: "The enterprise financial clearinghouse and automated disbursement ledger engineered for university CFOs, athletic business directors, and conference treasurers managing direct athlete revenue-sharing distributions post-House v. NCAA settlement. Operates a proprietary Proportional Weighted Allocation (PWA) algorithmic engine that disbars up to $20.5M–$22.5M in annual athletic department disbursements across varsity rosters while ensuring strict mathematical Title IX parity, automated 1099/W-2 tax withholding, and audit-ready ledger reporting.",
    division: "Campus Infrastructure",
    platformConcept: "Institutional financial clearinghouse for managing direct university revenue-sharing payouts.",
    coreTechEngine: "Proportional Weighted Allocation (PWA) algorithm & automated ledger",
    businessModel: "Administrative Micro-transaction Fees (1.5%)",
    primaryPlatformHook: "Automated disbursement ledger managing $20.5M+ pools while ensuring Title IX compliance.",
    monetization: "1.5% Micro-Transaction Processing Fee on Automated Roster Payouts",
    monetizationHook: "1.5% micro-transaction processing fee on automated roster payouts.",
    status: "Operating",
    targetAudience: "University CFOs, athletic business managers, and varsity athletes",
    sourceRef: "Sources 1-3, 5, 6, 16 · House v. NCAA Institutional Disbursement Standard",
    featured: true
  },
  {
    id: "highschool-player-nil",
    name: "High School Player NIL",
    domain: "highschoolplayernil.com",
    cluster: "High School NIL",
    tagline: "Athlete-facing mobile launchpad and micro-deal management dashboard.",
    desc: "Consumer-grade mobile launchpad designed specifically for prep athletes, teenage creators, and their legal guardians. Integrates an AI Personal Brand Assistant that analyzes scholastic athletic achievements, sport schedules, and local community visibility to automatically generate compliant sponsorship pitches for neighborhood businesses and regional retailers. Mandates legal guardian co-signing protocols and interactive eligibility protection maps across all 50 states.",
    division: "NIL & Creator Capital",
    platformConcept: "Athlete-facing mobile launchpad and micro-deal management dashboard.",
    coreTechEngine: "AI Personal Brand Assistant & local business campaign matcher",
    businessModel: "B2C Freemium SaaS & Transaction Fees",
    primaryPlatformHook: "Mandatory parent co-signing workflows and eligibility protection maps.",
    monetization: "$9.99/mo Parent Guardian Tier · 8%–15% Micro-Deal Transaction Fees",
    monetizationHook: "$9.99/month Parent Guardian Tier and 8%–15% micro-deal transaction fees.",
    status: "Scaling",
    targetAudience: "High school athletes, parents, and guardians",
    sourceRef: "Sources 3-5, 7-9, 11, 13, 16 · Scholastic Creator Interface"
  },
  {
    id: "highschool-esports-nil-org",
    name: "High School Esports NIL",
    domain: "highschoolesportsnil.org",
    cluster: "Esports NIL",
    tagline: "Non-profit safety registry and eligibility tracker for secondary school esports.",
    desc: "The authoritative non-profit eligibility registry and compliance tracker for scholastic esports competitors and high school gaming clubs. Provides school districts, athletic directors, and parents with automated K-12 eligibility verification logic and AI State-Bylaw parsing, guaranteeing that tournament cash prizes, hardware gifts, and digital streaming sponsorships do not violate state high school athletic association bylaws or jeopardize upcoming collegiate varsity scholarship eligibility.",
    division: "NIL & Creator Capital",
    platformConcept: "Non-profit safety registry and eligibility tracker for secondary school esports.",
    coreTechEngine: "K-12 eligibility protection registry logic & AI State-Bylaw Parser",
    businessModel: "Freemium / Premium SaaS & Educational Grants",
    primaryPlatformHook: "Integrated eligibility checklist ensuring gamers do not void collegiate standing.",
    monetization: "$19/month Premium High School Club Tools · Co-Branded Awareness Grants",
    monetizationHook: "$19/month premium club tools and co-branded awareness grants.",
    status: "Scaling",
    targetAudience: "High school gamers, parents, and school districts",
    sourceRef: "Sources 1, 2, 4, 5, 7-11, 14, 15, 19, 20 · Scholastic Esports Eligibility Trust"
  },
  {
    id: "nil-fair-market-value",
    name: "NIL Fair Market Value (FMV)",
    domain: "nilfairmarketvalue.com",
    cluster: "Institutional & Compliance",
    tagline: "Fair Market Value (FMV) audit engine verifying contract compliance with CSC guidelines.",
    desc: "The industry-standard algorithmic appraisal engine and transaction registry providing certified Fair Market Value (FMV) audit reports for university athletic departments, sports attorneys, corporate sponsors, and collective operators. Grounded in a proprietary historical deal database spanning over 85,000 verified athlete transactions, the engine benchmarks real-world commercial deliverables against NCAA and Collegiate Sports Commission (CSC) guidelines to detect and prevent disguised booster pay-for-play violations.",
    division: "Campus Infrastructure",
    platformConcept: "Fair Market Value (FMV) audit engine verifying contract compliance with CSC guidelines.",
    coreTechEngine: "Algorithmic appraisal tool & historical collegiate deal database",
    businessModel: "Transactional Fee & Enterprise SaaS Subscriptions",
    primaryPlatformHook: "Instant verified FMV Audit Reports to prevent over-market booster payments.",
    monetization: "$150 Pay-Per-Audit Report Fee · Flat-Rate Annual Compliance SaaS",
    monetizationHook: "$150 pay-per-audit fee or flat-rate annual compliance SaaS subscription.",
    status: "Operating",
    targetAudience: "University compliance departments, sports agents, and corporate legal teams",
    sourceRef: "Sources 1-3 · CSC Compliance Audit Framework",
    featured: true
  },
  {
    id: "varsity-group-licensing",
    name: "Varsity Group Licensing",
    domain: "varsitygrouplicensing.com",
    cluster: "Institutional & Compliance",
    tagline: "Collegiate group license compiler for managing team-wide roster deals.",
    desc: "The comprehensive collegiate group license syndication clearinghouse designed to execute mass roster intellectual property agreements. Enables tier-one sports video game publishers, physical trading card manufacturers, and digital collectibles platforms to license entire athletic rosters through single-signature digital opt-ins. Features a 95/5 proportional split allocator algorithm that automatically reconciles and disburses royalties across hundreds of varsity athletes simultaneously.",
    division: "Campus Infrastructure",
    platformConcept: "Collegiate group license compiler for managing team-wide roster deals.",
    coreTechEngine: "95/5 proportional split allocator algorithm & digital opt-in compiler",
    businessModel: "Administrative Micro-transaction Fees (5%)",
    primaryPlatformHook: "Single-signature roster opt-ins allowing developers to license hundreds of athletes at once.",
    monetization: "5% Administrative Fee on Group-Licensing Commercial Royalty Pools",
    monetizationHook: "5% administrative fee on group-licensing pool allocations.",
    status: "Operating",
    targetAudience: "Video game developers, trading card publishers, and athletic collectives",
    sourceRef: "Sources 1-3 · Collective Group IP Clearinghouse"
  },
  {
    id: "nil-brand-match",
    name: "NIL Brand Match",
    domain: "nilbrandmatch.com / nilbrands.com",
    cluster: "Brand Marketplace",
    tagline: "B2B enterprise campaign matchmaker and self-service matchmaking engine.",
    desc: "High-volume B2B enterprise matchmaking engine connecting mid-market brands, corporate marketing agencies, and national sponsors with multi-sport collegiate athlete syndicates. Brands post detailed creative briefs and target demographic objectives; the platform’s Algorithmic Syndicate Matcher instantly assembles balanced, pre-cleared athlete portfolios. Enforces automated compliance reviews and escrow disbursement upon verified social media deliverable validation.",
    division: "NIL & Creator Capital",
    platformConcept: "B2B enterprise campaign matchmaker and self-service matchmaking engine.",
    coreTechEngine: "Algorithmic Syndicate Matcher & automated campaign builders",
    businessModel: "Marketplace Transaction Fees & Enterprise SaaS Tiers",
    primaryPlatformHook: "Brands post creative briefs and instantly receive matching multi-athlete portfolios.",
    monetization: "10%–15% Booking Fee on Campaign Budgets · Enterprise SaaS Tiers",
    monetizationHook: "10%–15% booking fee on final campaign budgets and premium SaaS tiers.",
    status: "Operating",
    targetAudience: "Mid-market brands, corporate sponsors, and high-volume athletes",
    sourceRef: "Sources 1-3, 16 · B2B Enterprise Match Engine"
  },
  {
    id: "nil-analytics",
    name: "NIL Analytics",
    domain: "nilanalytics.com / nilbrands.net",
    cluster: "Data & Analytics",
    tagline: "Market intelligence and data API feed providing NIL market rates and ROI trends.",
    desc: "The institutional data terminal and developer-facing API feed delivering real-time market intelligence, anonymized contract valuation indices, and commercial ROI metrics across the collegiate NIL landscape. Tracks transaction rates sorted by state, division, sport, and athlete demographic engagement. Empowers corporate sponsors, sports talent agencies, and private equity investors to scientifically price NIL campaigns and forecast return-on-ad-spend (ROAS).",
    division: "Campus Infrastructure",
    platformConcept: "Market intelligence and data API feed providing NIL market rates and ROI trends.",
    coreTechEngine: "Developer-Facing Data API Feeds & Institutional ROI tracker",
    businessModel: "B2B Data Subscriptions (Tiered API SaaS from $499/mo)",
    primaryPlatformHook: "Anonymized contract values sorted by state and sport to help price campaigns.",
    monetization: "Tiered Data API SaaS Subscriptions Starting at $499/Month",
    monetizationHook: "Tiered API SaaS subscriptions starting at $499/month.",
    status: "Scaling",
    targetAudience: "Enterprise sponsors, sports agencies, and venture capital investors",
    sourceRef: "Sources 1, 2, 16 · Institutional Sports Analytics Data Terminal"
  },
  {
    id: "college-nil-school",
    name: "College NIL School",
    domain: "collegenil.school",
    cluster: "College NIL",
    tagline: "Accredited NIL education, career prep, and agent certification portal.",
    desc: "Accredited digital academy, career development center, and agent certification portal designed to foster financial literacy and regulatory mastery among student-athletes, certified agents, and institutional advisors. Features an Interactive AI Tutor guiding users through modules on federal/state tax filing, LLC formation, commercial contract redlines, and personal brand longevity, awarding verifiable digital micro-credentials upon completion.",
    division: "NIL & Creator Capital",
    platformConcept: "Accredited NIL education, career prep, and agent certification portal.",
    coreTechEngine: "Interactive AI Tutor & Automated Credential Certification Engine",
    businessModel: "Academy Enrollment & Professional Certification Fees",
    primaryPlatformHook: "Verified credentials and interactive education on taxes, LLCs, and legal planning.",
    monetization: "Course-Based Enrollment Fees · Accredited Agent Certification Revenue",
    monetizationHook: "Course-based fees and accredited certification revenue.",
    status: "Operating",
    targetAudience: "Athletes, agents, and financial advisors",
    sourceRef: "Sources 4, 5, 11, 16, 17 · Collegiate Financial Literacy Academy"
  },
  {
    id: "esports-nil-tv",
    name: "Esports NIL TV",
    domain: "esportsnil.tv",
    cluster: "Esports NIL",
    tagline: "Real-time ad-serving tech and live broadcast overlay engine.",
    desc: "Real-time programmatic ad-serving technology and live broadcast graphics engine built for collegiate esports streamers and tournament production desks utilizing industry-standard broadcast production software suites. Driven by a proprietary Cost-Per-Viewer (CPV) algorithm, the engine dynamically inserts sponsor overlays, lower-third tickers, and interactive audience calls-to-action based on real-time broadcast viewership metrics, sharing ad revenues directly with student competitors.",
    division: "Media & Broadcast",
    platformConcept: "Real-time ad-serving tech and live broadcast overlay engine.",
    coreTechEngine: "Cost-Per-Viewer (CPV) ad-serving algorithm & live broadcast overlay engine",
    businessModel: "B2B SaaS & Ad Revenue Share ($29/mo + 15%)",
    primaryPlatformHook: "Dynamic insertion of sponsor graphics based on real-time viewer counts.",
    monetization: "$29/month Premium SaaS Subscription + 15% Ad Campaign Revenue Share",
    monetizationHook: "$29/month premium SaaS subscription plus 15% revenue share from ad campaigns.",
    status: "Operating",
    targetAudience: "Collegiate streamers, esports broadcast desks, and advertising agencies",
    sourceRef: "Sources 1-3, 5, 6, 9 · Connected Broadcast Overlay Technology"
  },
  {
    id: "athlete-brand-kit",
    name: "Athlete Brand Kit",
    domain: "athletebrandkit.com",
    cluster: "Athlete Branding & Media",
    tagline: "Centralized hub for athletes to create, manage, and share their media kits and personal brand portfolios.",
    desc: "The premier centralized digital portfolio hub and media kit generator for high school and collegiate student-athletes, certified agents, and brand managers. Leverages a proprietary Portfolio Builder to compile game stats, verified social media engagement metrics, rate cards, and sponsor testimonials into a sleek, professional digital dossier shareable via custom URL in seconds. Features real-time API synchronization with major collegiate social platforms and audience engagement analytics.",
    division: "NIL & Creator Capital",
    platformConcept: "Centralized hub for athletes to create, manage, and share their media kits and personal brand portfolios.",
    coreTechEngine: "Proprietary Athlete Portfolio Builder & automated media kit generator with live social engagement APIs",
    businessModel: "B2C Freemium SaaS ($9.99/mo)",
    primaryPlatformHook: "Instant generation of professional media kits with real-time social media analytics integration.",
    monetization: "$9.99/month Premium Tier for Advanced Analytics & Custom Domain Routing",
    monetizationHook: "$9.99/month premium tier for advanced analytics and custom domain routing.",
    status: "Scaling",
    targetAudience: "High school and collegiate athletes, sports agents, and brand managers",
    sourceRef: "Sources 1-5, 8, 16 · Athlete Portfolio Engine"
  }
];

// Institutional default hero visual carriers
const INSTITUTIONAL_DEFAULT_IMAGES: HeroImageConfig[] = [
  {
    src: heroArenaImg,
    label: "National Championship Pavilion",
    sublabel: "State-of-the-Art Varsity Broadcast Infrastructure",
    iconName: "Building2"
  },
  {
    src: holdingDroneImg,
    label: "College Drone Racing League (CDRL)",
    sublabel: "Nationwide STEM Aerobatics & High-Speed Circuit",
    iconName: "Rocket"
  },
  {
    src: mediaBroadcastImg,
    label: "College Esports TV & Media Studio",
    sublabel: "Syndicated Digital Distribution to 400+ Campuses",
    iconName: "Video"
  },
  {
    src: executiveBoardroomImg,
    label: "Strategic Governance & Institutional Capital",
    sublabel: "Diverse Board Mandate & Category IP Across Higher Ed",
    iconName: "Briefcase"
  },
  {
    src: nilClearinghouseImg,
    label: "College Esports NIL & Athlete Clearinghouse",
    sublabel: "B2B Roster Management & Student-Athlete Liquidity Hub",
    iconName: "Users"
  },
  {
    src: creatorStudioImg,
    label: "College Creator Network & Production Studio",
    sublabel: "Workforce Incubator & Multi-Platform Digital Media Engine",
    iconName: "Mic"
  }
];

// Initial view comes from the URL so that section links and crawled pages open the right section.
const INITIAL_ROUTE: RouteState = typeof window !== 'undefined'
  ? resolveRouteState(window.location.pathname)
  : resolveRouteState('/');

export const App: React.FC = () => {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<'overview' | 'holdings' | 'strategy' | 'financials' | 'governance' | 'editorial'>(INITIAL_ROUTE.tab);
  const [holdingsSubTab, setHoldingsSubTab] = useState<'directory' | 'map' | 'topology'>(INITIAL_ROUTE.holdingsSubTab);
  const [governanceSubTab, setGovernanceSubTab] = useState<'overview' | 'compliance-dashboard' | 'repository' | 'risks' | 'memo'>(INITIAL_ROUTE.governanceSubTab);
  const [intelligenceSubTab, setIntelligenceSubTab] = useState<'editorial' | 'market_wire' | 'newsletter'>(INITIAL_ROUTE.intelligenceSubTab);
  const [selectedAudience, setSelectedAudience] = useState<'all' | 'university' | 'brands' | 'investors' | 'athletes'>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>(INITIAL_ROUTE.selectedDivision);
  const [selectedCluster, setSelectedCluster] = useState<string>('All Clusters');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'bento' | 'table'>('bento');
  const [selectedBrand, setSelectedBrand] = useState<PortfolioBrand | null>(null);

  // Modals
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const [selectedDirectMessageUser, setSelectedDirectMessageUser] = useState<string | null>(null);
  const [isCompliancePortalOpen, setIsCompliancePortalOpen] = useState(false);
  const [isFinancialReportModalOpen, setIsFinancialReportModalOpen] = useState(false);
  const [isNilAlertsOpen, setIsNilAlertsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);

  // Global Command Palette Shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Financial Model Sliders
  const [campusCount, setCampusCount] = useState<number>(150);
  const [avgNilDeal, setAvgNilDeal] = useState<number>(3500);
  const [mediaRightsTier, setMediaRightsTier] = useState<number>(12000);
  const [growthScenario, setGrowthScenario] = useState<'Conservative' | 'Expected' | 'Aggressive'>('Expected');
  const [financialSubTab, setFinancialSubTab] = useState<'simulator' | 'nil_analytics' | 'athlete_calculator'>(INITIAL_ROUTE.financialSubTab);

  // Media Carousel
  const [heroImages, setHeroImages] = useState<HeroImageConfig[]>(() => {
    try {
      const savedVersion = localStorage.getItem('heroImagesVersion');
      const CURRENT_VERSION = 'v2_diverse_nil_creator';
      if (savedVersion !== CURRENT_VERSION) {
        localStorage.setItem('heroImagesVersion', CURRENT_VERSION);
        localStorage.setItem('heroImages', JSON.stringify(INSTITUTIONAL_DEFAULT_IMAGES));
        return INSTITUTIONAL_DEFAULT_IMAGES;
      }
      const saved = localStorage.getItem('heroImages');
      return saved ? JSON.parse(saved) : INSTITUTIONAL_DEFAULT_IMAGES;
    } catch {
      return INSTITUTIONAL_DEFAULT_IMAGES;
    }
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance slide
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // URL sync: keep the address bar, document title and back/forward buttons in step with the visible section.
  const currentRoutePath = pathForState({
    tab: activeTab,
    holdingsSubTab,
    governanceSubTab,
    intelligenceSubTab,
    financialSubTab,
    selectedDivision,
  });

  useEffect(() => {
    // The investor FAQ shares the overview state, so keep its own address until the visitor navigates away.
    const onInPageRoute = Boolean(findRoute(window.location.pathname)?.scrollTo);
    const keepInPageRoute = onInPageRoute && currentRoutePath === '/';
    if (window.location.pathname !== currentRoutePath && !keepInPageRoute) {
      window.history.pushState(null, '', currentRoutePath);
    }
    const route = findRoute(currentRoutePath);
    if (route) {
      document.title = route.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', route.description);
    }
  }, [currentRoutePath]);

  useEffect(() => {
    const handlePopState = () => {
      const next = resolveRouteState(window.location.pathname);
      setActiveTab(next.tab);
      setHoldingsSubTab(next.holdingsSubTab);
      setGovernanceSubTab(next.governanceSubTab);
      setIntelligenceSubTab(next.intelligenceSubTab);
      setFinancialSubTab(next.financialSubTab);
      setSelectedDivision(next.selectedDivision);
      if (!next.scrollTo) window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Deep links to an in-page section (for example /investors/faq) scroll to it once the page has rendered.
  useEffect(() => {
    if (!INITIAL_ROUTE.scrollTo) return;
    const timer = window.setTimeout(() => {
      document.getElementById(INITIAL_ROUTE.scrollTo as string)?.scrollIntoView({ block: 'start' });
    }, 300);
    return () => window.clearTimeout(timer);
  }, []);

  // Global ESC key listener to dismiss open modals smoothly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBrand(null);
        setIsInvestorModalOpen(false);
        setIsMemoOpen(false);
        setIsAdminOpen(false);
        setIsNetworkModalOpen(false);
        setIsCompliancePortalOpen(false);
        setIsFinancialReportModalOpen(false);
        setIsNilAlertsOpen(false);
        setLegalModalType(null);
        setIsMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Investor Request Form State
  const [investorForm, setInvestorForm] = useState({
    name: '',
    firm: '',
    email: '',
    investorClass: 'Venture Capital',
    allocation: '$500,000 - $1,000,000',
    ndaAgreed: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filtered portfolio brands with deep multi-field search and cluster matching
  const filteredBrands = useMemo(() => {
    return PORTFOLIO_DATA.filter((brand) => {
      const matchesDivision = selectedDivision === 'All' || brand.division === selectedDivision;
      const matchesCluster = selectedCluster === 'All' || selectedCluster === 'All Clusters' || brand.cluster === selectedCluster;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q ||
        brand.name.toLowerCase().includes(q) ||
        brand.tagline.toLowerCase().includes(q) ||
        brand.desc.toLowerCase().includes(q) ||
        (brand.domain && brand.domain.toLowerCase().includes(q)) ||
        (brand.cluster && brand.cluster.toLowerCase().includes(q)) ||
        (brand.coreTechEngine && brand.coreTechEngine.toLowerCase().includes(q)) ||
        (brand.platformConcept && brand.platformConcept.toLowerCase().includes(q)) ||
        (brand.monetizationHook && brand.monetizationHook.toLowerCase().includes(q)) ||
        (brand.targetAudience && brand.targetAudience.toLowerCase().includes(q));
      return matchesDivision && matchesCluster && matchesQuery;
    });
  }, [selectedDivision, selectedCluster, searchQuery]);

  // Financial Model Calculations
  const calculatedMetrics = useMemo(() => {
    return calculateFinancialMetrics({
      campusCount,
      avgNilDeal,
      mediaRightsTier,
      growthScenario
    });
  }, [campusCount, avgNilDeal, mediaRightsTier, growthScenario]);

  const handleInvestorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!investorForm.name || !investorForm.email || !investorForm.firm) return;
    setFormSubmitted(true);
  };

  const divisionsList = [
    'All',
    'Competitive Leagues',
    'NIL & Creator Capital',
    'Media & Broadcast',
    'Campus Infrastructure'
  ];

  const clustersList = [
    'All Clusters',
    'High School NIL',
    'College NIL',
    'Esports NIL',
    'Institutional & Compliance',
    'Brand Marketplace',
    'Data & Analytics',
    'Athlete Advocacy',
    'Athlete Branding & Media'
  ];

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F5F5F3] font-sans selection:bg-[#C89B3C]/25 selection:text-white flex flex-col antialiased">
      
      {/* ========================================================================= */}
      {/* 1. TOP BAR (Strict 3-Zone Top Bar Contract) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#090A0C]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-6 h-18 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark / iconic lockup */}
          <div 
            onClick={() => { setActiveTab('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center"
          >
            <SovereignLogo />
          </div>

          {/* Zone 2: 6 clean, organized text navigation links with subtle underline/state */}
          <nav className="hidden xl:flex items-center gap-7 text-xs uppercase tracking-[0.16em] font-medium text-neutral-400">
            <button
              onClick={() => { setActiveTab('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#F5F5F3] transition-colors pb-1.5 relative cursor-pointer ${activeTab === 'overview' ? 'text-[#C89B3C]' : ''}`}
            >
              Thesis
              {activeTab === 'overview' && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C89B3C]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('holdings'); setHoldingsSubTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#F5F5F3] transition-colors pb-1.5 relative cursor-pointer ${activeTab === 'holdings' ? 'text-[#C89B3C]' : ''}`}
            >
              Holdings & Campuses
              {activeTab === 'holdings' && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C89B3C]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('strategy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#F5F5F3] transition-colors pb-1.5 relative flex items-center gap-1.5 cursor-pointer ${activeTab === 'strategy' ? 'text-[#C89B3C]' : ''}`}
            >
              <span>Strategic Plan</span>
              <span className="px-1.5 py-0.2 rounded bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[9px] font-mono text-[#E8C98B]">v1.0</span>
              {activeTab === 'strategy' && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C89B3C]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('financials'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#F5F5F3] transition-colors pb-1.5 relative cursor-pointer ${activeTab === 'financials' ? 'text-[#C89B3C]' : ''}`}
            >
              Financial Model & NIL
              {activeTab === 'financials' && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C89B3C]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('governance'); setGovernanceSubTab('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#F5F5F3] transition-colors pb-1.5 relative cursor-pointer ${activeTab === 'governance' ? 'text-[#C89B3C]' : ''}`}
            >
              Governance & Legal
              {activeTab === 'governance' && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C89B3C]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('editorial'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#F5F5F3] transition-colors pb-1.5 relative cursor-pointer ${activeTab === 'editorial' ? 'text-[#C89B3C]' : ''}`}
            >
              Intelligence & News
              {activeTab === 'editorial' && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C89B3C]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions & quick find */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Find / Omni-Search Trigger (Cmd+K) */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-sm bg-[#131722] hover:bg-[#1A2030] border border-white/10 hover:border-[#C89B3C]/50 text-neutral-300 hover:text-white transition-all text-xs font-mono group shadow-sm cursor-pointer"
              title="Quick Find: 43 Holdings, TAM Models, NCAA Bylaws (⌘K)"
            >
              <Search size={13} className="text-[#C89B3C] group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-neutral-300">Quick Find</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-neutral-400 group-hover:text-white">
                ⌘K
              </kbd>
            </button>

            {/* NIL Opportunity Notifications Bell */}
            <button
              onClick={() => setIsNilAlertsOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-[#131722] hover:bg-[#1A2030] border border-white/10 hover:border-[#C89B3C]/50 text-neutral-300 hover:text-white transition-all text-xs font-mono group shadow-sm cursor-pointer"
              title="Real-Time NIL Opportunity Radar & Trending Sponsorship Categories"
            >
              <div className="relative">
                <Bell size={14} className="text-[#C89B3C] group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E8C98B] ring-2 ring-[#090A0C]"></span>
              </div>
              <span className="hidden xl:inline font-medium">NIL Radar</span>
              <span className="bg-[#C89B3C] text-[#090A0C] text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                {growthScenario === 'Aggressive' ? '4' : '3'}
              </span>
            </button>

            {/* Member Network & Messaging Trigger */}
            <button
              onClick={() => { setSelectedDirectMessageUser(null); setIsNetworkModalOpen(true); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#131722] hover:bg-[#1A2030] border border-white/10 hover:border-[#C89B3C]/50 text-neutral-300 hover:text-white transition-all text-xs font-mono group shadow-sm cursor-pointer"
              title="Accredited Member Directory & Secure Messaging"
            >
              <div className="relative">
                <MessageSquare size={14} className="text-[#C89B3C]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#68D391] ring-2 ring-[#090A0C]"></span>
              </div>
              <span className="hidden sm:inline font-medium">Network</span>
            </button>

            <button
              onClick={() => setIsInvestorModalOpen(true)}
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#090A0C] bg-[#C89B3C] hover:bg-[#D4AF37] rounded-sm transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              Request Deck
            </button>
            
            <button 
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="xl:hidden p-2 text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* CONTEXTUAL SUB-NAVIGATION BAR (For deep sections with sub-pages) */}
        {activeTab === 'holdings' && (
          <div className="bg-[#0D1017]/95 border-t border-b border-white/[0.06] backdrop-blur-md">
            <div className="max-w-[1360px] mx-auto px-6 py-2 flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2 font-mono text-neutral-400">
                <span className="text-[11px] uppercase tracking-wider text-[#C89B3C] font-semibold">Holdings Sub-Pages:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setHoldingsSubTab('directory')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                    holdingsSubTab === 'directory'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Asset Directory ({PORTFOLIO_DATA.length})
                </button>
                <button
                  onClick={() => setHoldingsSubTab('map')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    holdingsSubTab === 'map'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <MapPin size={12} className={holdingsSubTab === 'map' ? 'text-[#090A0C]' : 'text-[#C89B3C]'} />
                  <span>National Campus Map (400+)</span>
                </button>
                <button
                  onClick={() => setHoldingsSubTab('topology')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    holdingsSubTab === 'topology'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers size={12} className={holdingsSubTab === 'topology' ? 'text-[#090A0C]' : 'text-[#C89B3C]'} />
                  <span>Ecosystem Topology & Flow</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'governance' && (
          <div className="bg-[#0D1017]/95 border-t border-b border-white/[0.06] backdrop-blur-md">
            <div className="max-w-[1360px] mx-auto px-6 py-2 flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2 font-mono text-neutral-400">
                <span className="text-[11px] uppercase tracking-wider text-[#C89B3C] font-semibold">Governance Sub-Pages:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setGovernanceSubTab('overview')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    governanceSubTab === 'overview'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Building2 size={12} />
                  <span>Overview & Advisory</span>
                </button>
                <button
                  onClick={() => setGovernanceSubTab('compliance-dashboard')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    governanceSubTab === 'compliance-dashboard'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck size={12} />
                  <span>Compliance Dashboard</span>
                </button>
                <button
                  onClick={() => setGovernanceSubTab('repository')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    governanceSubTab === 'repository'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Scale size={12} />
                  <span>Codified Rules Repository</span>
                </button>
                <button
                  onClick={() => setGovernanceSubTab('risks')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    governanceSubTab === 'risks'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck size={12} />
                  <span>Institutional Risk Matrix</span>
                </button>
                <button
                  onClick={() => setGovernanceSubTab('memo')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    governanceSubTab === 'memo'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText size={12} />
                  <span>Executive Memorandum</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'editorial' && (
          <div className="bg-[#0D1017]/95 border-t border-b border-white/[0.06] backdrop-blur-md">
            <div className="max-w-[1360px] mx-auto px-6 py-2 flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2 font-mono text-neutral-400">
                <span className="text-[11px] uppercase tracking-wider text-[#C89B3C] font-semibold">Intelligence Sub-Pages:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setIntelligenceSubTab('editorial')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    intelligenceSubTab === 'editorial'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BookOpen size={12} />
                  <span>Thought Leadership & Articles</span>
                </button>
                <button
                  onClick={() => setIntelligenceSubTab('market_wire')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    intelligenceSubTab === 'market_wire'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Radio size={12} className={intelligenceSubTab === 'market_wire' ? 'text-[#090A0C]' : 'text-[#C89B3C]'} />
                  <span>Live Market Intelligence Wire</span>
                </button>
                <button
                  onClick={() => setIntelligenceSubTab('newsletter')}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    intelligenceSubTab === 'newsletter'
                      ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Mail size={12} className={intelligenceSubTab === 'newsletter' ? 'text-[#090A0C]' : 'text-[#C89B3C]'} />
                  <span>Weekly Intelligence Briefing</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {isMobileNavOpen && (
          <div className="xl:hidden bg-[#0D1016] border-b border-white/10 px-6 py-5 flex flex-col gap-4 text-xs tracking-wider uppercase max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono text-[#C89B3C] text-[11px] font-bold">NAVIGATION MENU</span>
              <button 
                onClick={() => setIsMobileNavOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Action Buttons on Mobile */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
              <button 
                onClick={() => { setIsNilAlertsOpen(true); setIsMobileNavOpen(false); }}
                className="p-2 rounded bg-[#131722] border border-white/10 text-[#E8C98B] flex items-center justify-between font-mono text-[11px]"
              >
                <div className="flex items-center gap-1.5">
                  <Bell size={13} className="text-[#C89B3C]" />
                  <span>NIL Radar</span>
                </div>
                <span className="bg-[#C89B3C] text-[#090A0C] text-[10px] font-bold px-1.5 rounded-full font-mono">
                  {growthScenario === 'Aggressive' ? '4' : '3'}
                </span>
              </button>
              <button 
                onClick={() => { setIsNetworkModalOpen(true); setIsMobileNavOpen(false); }}
                className="p-2 rounded bg-[#131722] border border-white/10 text-neutral-300 flex items-center gap-1.5 font-mono text-[11px]"
              >
                <MessageSquare size={13} className="text-[#68D391]" />
                <span>Messages</span>
              </button>
            </div>

            {/* Main Section Links with Sub-page Indents */}
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveTab('overview'); setIsMobileNavOpen(false); }}
                className={`w-full text-left py-2 font-semibold text-sm ${activeTab === 'overview' ? 'text-[#C89B3C]' : 'text-white'}`}
              >
                1. Investment Thesis & Overview
              </button>
            </div>

            <div className="space-y-1 border-t border-white/5 pt-2">
              <button 
                onClick={() => { setActiveTab('holdings'); setHoldingsSubTab('directory'); setIsMobileNavOpen(false); }}
                className={`w-full text-left py-1.5 font-semibold text-sm flex items-center justify-between ${activeTab === 'holdings' ? 'text-[#C89B3C]' : 'text-white'}`}
              >
                <span>2. Holdings & Campuses</span>
                <span className="text-[10px] font-mono text-neutral-500 font-normal">({PORTFOLIO_DATA.length})</span>
              </button>
              <div className="pl-4 space-y-1 text-neutral-400 font-mono text-[11px]">
                <button 
                  onClick={() => { setActiveTab('holdings'); setHoldingsSubTab('directory'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Asset Directory ({PORTFOLIO_DATA.length} Brands)
                </button>
                <button 
                  onClick={() => { setActiveTab('holdings'); setHoldingsSubTab('map'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ National Campus Map (400+ Footprint)
                </button>
                <button 
                  onClick={() => { setActiveTab('holdings'); setHoldingsSubTab('topology'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Holding Ecosystem Topology & Flow
                </button>
              </div>
            </div>

            <div className="space-y-1 border-t border-white/5 pt-2">
              <button 
                onClick={() => { setActiveTab('strategy'); setIsMobileNavOpen(false); }}
                className={`w-full text-left py-1.5 font-semibold text-sm flex items-center justify-between ${activeTab === 'strategy' ? 'text-[#C89B3C]' : 'text-white'}`}
              >
                <span>3. Strategic Plan</span>
                <span className="px-1.5 py-0.2 rounded bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[9px] font-mono text-[#E8C98B]">v1.0</span>
              </button>
            </div>

            <div className="space-y-1 border-t border-white/5 pt-2">
              <button 
                onClick={() => { setActiveTab('financials'); setFinancialSubTab('simulator'); setIsMobileNavOpen(false); }}
                className={`w-full text-left py-1.5 font-semibold text-sm ${activeTab === 'financials' ? 'text-[#C89B3C]' : 'text-white'}`}
              >
                4. Financial Model & NIL
              </button>
              <div className="pl-4 space-y-1 text-neutral-400 font-mono text-[11px]">
                <button 
                  onClick={() => { setActiveTab('financials'); setFinancialSubTab('simulator'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ TAM & Yield Simulator
                </button>
                <button 
                  onClick={() => { setActiveTab('financials'); setFinancialSubTab('nil_analytics'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ NIL Analytics & Trends
                </button>
                <button 
                  onClick={() => { setActiveTab('financials'); setFinancialSubTab('athlete_calculator'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Athlete NIL Calculator
                </button>
              </div>
            </div>

            <div className="space-y-1 border-t border-white/5 pt-2">
              <button 
                onClick={() => { setActiveTab('governance'); setGovernanceSubTab('overview'); setIsMobileNavOpen(false); }}
                className={`w-full text-left py-1.5 font-semibold text-sm ${activeTab === 'governance' ? 'text-[#C89B3C]' : 'text-white'}`}
              >
                5. Governance & Legal
              </button>
              <div className="pl-4 space-y-1 text-neutral-400 font-mono text-[11px]">
                <button 
                  onClick={() => { setActiveTab('governance'); setGovernanceSubTab('overview'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Overview & Advisory Board
                </button>
                <button 
                  onClick={() => { setActiveTab('governance'); setGovernanceSubTab('compliance-dashboard'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Compliance Dashboard
                </button>
                <button 
                  onClick={() => { setActiveTab('governance'); setGovernanceSubTab('repository'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Codified Rules Repository
                </button>
                <button 
                  onClick={() => { setActiveTab('governance'); setGovernanceSubTab('risks'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Institutional Risk Factors
                </button>
                <button 
                  onClick={() => { setActiveTab('governance'); setGovernanceSubTab('memo'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Executive Memorandum
                </button>
              </div>
            </div>

            <div className="space-y-1 border-t border-white/5 pt-2">
              <button 
                onClick={() => { setActiveTab('editorial'); setIntelligenceSubTab('editorial'); setIsMobileNavOpen(false); }}
                className={`w-full text-left py-1.5 font-semibold text-sm ${activeTab === 'editorial' ? 'text-[#C89B3C]' : 'text-white'}`}
              >
                6. Intelligence & News
              </button>
              <div className="pl-4 space-y-1 text-neutral-400 font-mono text-[11px]">
                <button 
                  onClick={() => { setActiveTab('editorial'); setIntelligenceSubTab('editorial'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Thought Leadership & Articles
                </button>
                <button 
                  onClick={() => { setActiveTab('editorial'); setIntelligenceSubTab('market_wire'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Live Market Intelligence Wire
                </button>
                <button 
                  onClick={() => { setActiveTab('editorial'); setIntelligenceSubTab('newsletter'); setIsMobileNavOpen(false); }}
                  className="block py-1 hover:text-[#C89B3C]"
                >
                  ↳ Weekly Newsletter Dispatch
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => { setIsInvestorModalOpen(true); setIsMobileNavOpen(false); }}
                className="w-full py-3 bg-[#C89B3C] text-[#090A0C] font-bold text-center rounded-sm uppercase tracking-wider"
              >
                Request Investor Deck
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTENT ROUTING */}
      {/* ========================================================================= */}
      <main className="flex-grow overflow-x-hidden">
        <AnimatePresence mode="wait">
          {/* VIEW 1: OVERVIEW / INVESTMENT THESIS */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* HERO SECTION */}
            <section className="relative pt-14 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden bg-grid-subtle">
              <div className="max-w-[1360px] mx-auto px-6">
                
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
                  
                  {/* Left Column: Thesis Proposition & Value Statement */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Eyebrow marker */}
                    <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#C89B3C] uppercase">
                      <span className="w-1.5 h-1.5 bg-[#C89B3C] rounded-full"></span>
                      <span>Institutional Venture Holding Group</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-neutral-400">Series A Mandate</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-display font-bold text-[#F5F5F3] leading-[1.12] tracking-tight">
                      Consolidating the Collegiate Digital Sports, Media Rights & NIL Economy.
                    </h1>

                    {/* Concrete Value Description */}
                    <p className="text-base sm:text-lg text-neutral-300/90 leading-relaxed font-light max-w-2xl">
                      College Company operates as the central holding company acquiring, scaling, and institutionalizing 
                      category-defining media properties, competitive circuits, and student-athlete NIL infrastructure 
                      across 400+ North American universities.
                    </p>

                    {/* Primary CTAs */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setIsInvestorModalOpen(true)}
                        className="px-6 py-3.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-2"
                      >
                        Request Institutional Prospectus
                        <ArrowUpRight size={15} />
                      </button>
                      
                      <button
                        onClick={() => { setActiveTab('holdings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="px-6 py-3.5 bg-[#14171E] hover:bg-[#1A1F29] border border-white/10 text-[#F5F5F3] font-medium text-xs uppercase tracking-wider rounded-sm transition-all"
                      >
                        Explore {PORTFOLIO_DATA.length} Strategic Holdings
                      </button>

                      <div className="inline-flex items-center gap-2.5">
                        <button
                          onClick={() => { setActiveTab('strategy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="group relative px-6 py-3.5 bg-[#C89B3C]/15 hover:bg-[#C89B3C]/25 border border-[#C89B3C]/40 hover:border-[#C89B3C] text-[#E8C98B] hover:text-[#FFF4D4] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(200,155,60,0.35)] flex items-center gap-2 cursor-pointer"
                        >
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C89B3C] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C89B3C]"></span>
                          </span>
                          <Sparkles size={14} className="text-[#C89B3C] group-hover:rotate-12 transition-transform duration-300" />
                          <span>Strategic Plan</span>
                        </button>

                        {/* Status Indicator Badge */}
                        <div 
                          onClick={() => { setActiveTab('strategy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          title="Roadmap Authority: v1.0 Active Commercial Mandate"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-[#C89B3C]/30 bg-[#121620]/90 hover:bg-[#181D2A] hover:border-[#C89B3C]/60 text-[#E8C98B] font-mono text-[10.5px] uppercase tracking-wider font-medium cursor-pointer transition-all shadow-xs select-none"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse"></span>
                          <span>v1.0 · Active</span>
                        </div>
                      </div>
                    </div>

                    {/* Institutional Trust Markers */}
                    <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6 max-w-xl text-neutral-300">
                      <div>
                        <div className="font-mono text-2xl font-bold text-white tabular-nums">{PORTFOLIO_DATA.length}</div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Proprietary Brands</div>
                      </div>
                      <div>
                        <div className="font-mono text-2xl font-bold text-white tabular-nums">400+</div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Target Campuses</div>
                      </div>
                      <div>
                        <div className="font-mono text-2xl font-bold text-white tabular-nums">100%</div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">Owned Network IP</div>
                      </div>
                    </div>

                    {/* Interactive Audience Navigator */}
                    <div className="pt-6 border-t border-white/[0.08] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C89B3C] font-semibold flex items-center gap-1.5">
                          <SlidersHorizontal size={11} /> Tailored Institutional Pathways
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">Select Stakeholder Role</span>
                      </div>

                      {/* Stakeholder Category Selector */}
                      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#10141B] border border-white/10 rounded-sm">
                        <button
                          onClick={() => setSelectedAudience('all')}
                          className={`px-2.5 py-1 text-[11px] font-mono rounded-sm transition-all cursor-pointer ${
                            selectedAudience === 'all'
                              ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          All Roles
                        </button>
                        <button
                          onClick={() => setSelectedAudience('university')}
                          className={`px-2.5 py-1 text-[11px] font-mono rounded-sm transition-all cursor-pointer ${
                            selectedAudience === 'university'
                              ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Universities & ADs
                        </button>
                        <button
                          onClick={() => setSelectedAudience('brands')}
                          className={`px-2.5 py-1 text-[11px] font-mono rounded-sm transition-all cursor-pointer ${
                            selectedAudience === 'brands'
                              ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Brands & Sponsors
                        </button>
                        <button
                          onClick={() => setSelectedAudience('investors')}
                          className={`px-2.5 py-1 text-[11px] font-mono rounded-sm transition-all cursor-pointer ${
                            selectedAudience === 'investors'
                              ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Investors
                        </button>
                        <button
                          onClick={() => setSelectedAudience('athletes')}
                          className={`px-2.5 py-1 text-[11px] font-mono rounded-sm transition-all cursor-pointer ${
                            selectedAudience === 'athletes'
                              ? 'bg-[#C89B3C] text-[#090A0C] font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Athletes & Creators
                        </button>
                      </div>

                      {/* Tailored Value Snapshot */}
                      <div className="p-4 rounded-lg bg-[#10131A] border border-white/10 text-xs text-neutral-300 space-y-3">
                        {selectedAudience === 'university' && (
                          <>
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
                              <span className="text-[#E8C98B] font-semibold">For Athletic Directors, Provosts & Campus Gaming Chairs:</span>
                              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                                <span className="text-[#68D391]">100% Amateur Shield</span>
                                <span>·</span>
                                <span>FERPA & Title IX Aligned</span>
                              </div>
                            </div>
                            <p className="text-neutral-300 leading-relaxed text-[11px]">
                              Deploy turn-key varsity leagues, intercollegiate tournaments, and verified educational production credit. Protected by strict amateur firewalls and zero university capex burdens.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                              <button 
                                onClick={() => { setActiveTab('holdings'); setHoldingsSubTab('map'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="px-3 py-1.5 bg-[#1A2030] hover:bg-[#222A40] text-[#E8C98B] border border-[#C89B3C]/30 rounded-sm cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                <MapPin size={11} className="text-[#C89B3C]" />
                                <span>Explore 400+ Campus Footprint Map →</span>
                              </button>
                              <button 
                                onClick={() => { setActiveTab('strategy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="px-3 py-1.5 bg-[#1A2030] hover:bg-[#222A40] text-neutral-200 border border-white/10 rounded-sm cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                <Zap size={11} className="text-[#C89B3C]" />
                                <span>Review 6-Week Validation Sprint →</span>
                              </button>
                            </div>
                          </>
                        )}
                        {selectedAudience === 'brands' && (
                          <>
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
                              <span className="text-[#E8C98B] font-semibold">For Fortune 500 Sponsors, Agencies & Media Buyers:</span>
                              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                                <span className="text-[#38BDF8]">14,000+ Verified Roster</span>
                                <span>·</span>
                                <span>Enterprise Escrow Clearing</span>
                              </div>
                            </div>
                            <p className="text-neutral-300 leading-relaxed text-[11px]">
                              Direct, verified access to 14,000+ collegiate student-athletes and varsity streamers with automated disclosure reporting, category exclusivity, and FAST linear television carriage.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                              <button 
                                onClick={() => setIsNilAlertsOpen(true)}
                                className="px-3 py-1.5 bg-[#1A2030] hover:bg-[#222A40] text-[#E8C98B] border border-[#C89B3C]/30 rounded-sm cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                <Radio size={11} className="text-[#C89B3C]" />
                                <span>Inspect NIL Opportunity Radar →</span>
                              </button>
                              <button 
                                onClick={() => { setActiveTab('holdings'); setSelectedDivision('Media & Broadcast'); setHoldingsSubTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="px-3 py-1.5 bg-[#1A2030] hover:bg-[#222A40] text-neutral-200 border border-white/10 rounded-sm cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                <Tv size={11} className="text-neutral-400" />
                                <span>View Broadcast & Media Assets →</span>
                              </button>
                            </div>
                          </>
                        )}
                        {selectedAudience === 'investors' && (
                          <>
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
                              <span className="text-[#E8C98B] font-semibold">For Institutional Venture & Private Equity Allocators:</span>
                              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                                <span className="text-[#C89B3C]">$1.4B TAM Moat</span>
                                <span>·</span>
                                <span>Series A Capital Allocation</span>
                              </div>
                            </div>
                            <p className="text-neutral-300 leading-relaxed text-[11px]">
                              Unprecedented structural moat anchored by {PORTFOLIO_DATA.length} generic category-defining digital assets, capital-efficient operating architecture, and multi-tier recurring cash flows.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                              <button 
                                onClick={() => { setActiveTab('financials'); setFinancialSubTab('simulator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="px-3 py-1.5 bg-[#1A2030] hover:bg-[#222A40] text-[#E8C98B] border border-[#C89B3C]/30 rounded-sm cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                <SlidersHorizontal size={11} className="text-[#C89B3C]" />
                                <span>Interactive TAM & Yield Simulator →</span>
                              </button>
                              <button 
                                onClick={() => setIsInvestorModalOpen(true)}
                                className="px-3 py-1.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-bold rounded-sm cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                <FileText size={11} />
                                <span>Request Series A Prospectus →</span>
                              </button>
                            </div>
                          </>
                        )}
                        {selectedAudience === 'athletes' && (
                          <>
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
                              <span className="text-[#E8C98B] font-semibold">For Rostered Competitors, Streamers & Campus Creators:</span>
                              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                                <span className="text-[#68D391]">Zero Eligibility Risk</span>
                                <span>·</span>
                                <span>Automated Escrow Disclosures</span>
                              </div>
                            </div>
                            <p className="text-neutral-300 leading-relaxed text-[11px]">
                              Monetize your collegiate gaming persona with automated escrow protection, vetted brand sponsors, and zero risk to collegiate scholarship eligibility.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                              <button 
                                onClick={() => { setActiveTab('financials'); setFinancialSubTab('athlete_calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="px-3 py-1.5 bg-[#1A2030] hover:bg-[#222A40] text-[#E8C98B] border border-[#C89B3C]/30 rounded-sm cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                <DollarSign size={11} className="text-[#68D391]" />
                                <span>Calculate Individual NIL Valuation →</span>
                              </button>
                              <button 
                                onClick={() => { setActiveTab('governance'); setGovernanceSubTab('repository'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="px-3 py-1.5 bg-[#1A2030] hover:bg-[#222A40] text-neutral-200 border border-white/10 rounded-sm cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                <ShieldCheck size={11} className="text-[#C89B3C]" />
                                <span>Review Athletic Compliance Safeguards →</span>
                              </button>
                            </div>
                          </>
                        )}
                        {selectedAudience === 'all' && (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                            <span>Consolidating 4,000+ collegiate gaming clubs, 450+ varsity departments, and brand sponsorships into one sovereign institutional platform.</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => setIsCommandPaletteOpen(true)}
                                className="text-[#C89B3C] hover:underline font-mono cursor-pointer flex items-center gap-1 text-[10px]"
                              >
                                <Search size={10} />
                                <span>Search anything (⌘K)</span>
                              </button>
                              <span className="text-neutral-500 font-mono">·</span>
                              <span className="text-[#C89B3C] font-mono">Explore below ↓</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Visual Anchor Carrier (16:9 Showcase) */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#10141B] shadow-2xl group">
                      
                      {/* Image Slide */}
                      <div className="aspect-[16/10] sm:aspect-[16/9] w-full relative overflow-hidden bg-[#0A0D12]">
                        {heroImages.map((img, idx) => (
                          <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                          >
                            <img
                              src={img.src}
                              alt={img.label}
                              className="w-full h-full object-cover object-center"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                // Fallback container
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            {/* Measured Scrim Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/40 to-transparent"></div>
                          </div>
                        ))}

                        {/* Slide Prev/Next Floating Controls */}
                        <button
                          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#090A0C]/75 hover:bg-[#090A0C] border border-white/10 hover:border-[#C89B3C]/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg z-10 hover:scale-105"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#090A0C]/75 hover:bg-[#090A0C] border border-white/10 hover:border-[#C89B3C]/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg z-10 hover:scale-105"
                          aria-label="Next slide"
                        >
                          <ChevronRight size={16} />
                        </button>

                        {/* Slide Caption Overlay */}
                        <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/80 to-transparent z-10">
                          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#C89B3C] uppercase mb-1">
                            <span>Asset {String(currentSlide + 1).padStart(2, '0')} of {String(heroImages.length).padStart(2, '0')}</span>
                            <span>·</span>
                            <span>{heroImages[currentSlide]?.sublabel || 'Infrastructure Asset'}</span>
                          </div>
                          <div className="text-base sm:text-lg font-display font-semibold text-white">
                            {heroImages[currentSlide]?.label}
                          </div>
                        </div>
                      </div>

                      {/* Navigation Dots Bar */}
                      <div className="px-5 py-3 bg-[#0D1016] border-t border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-neutral-400">Live Operating Footprint</span>
                          <span className="text-neutral-600 font-mono text-xs">·</span>
                          <span className="text-[10px] font-mono text-[#C89B3C] font-semibold">{heroImages.length} Portfolio Assets</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Previous slide"
                          >
                            <ChevronLeft size={13} />
                          </button>
                          <div className="flex items-center gap-1.5">
                            {heroImages.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                  idx === currentSlide ? 'w-6 bg-[#C89B3C]' : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
                                }`}
                                aria-label={`Slide ${idx + 1}`}
                              />
                            ))}
                          </div>
                          <button
                            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
                            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Next slide"
                          >
                            <ChevronRight size={13} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* ========================================================================= */}
            {/* 2. THE THREE CONVERGING MARKET WAVES (Institutional Thesis) */}
            {/* ========================================================================= */}
            <section className="py-20 md:py-24 border-b border-white/[0.08] bg-[#0C0E12]">
              <div className="max-w-[1360px] mx-auto px-6">
                
                <div className="max-w-3xl mb-16 space-y-3">
                  <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
                    Executive Summary · Market Dynamics
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                    The Collegiate Structural Transformation
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                    College sports and campus media are undergoing their most significant economic restructuring since the 1984 NCAA Supreme Court decision. Three structural tailwinds form our core investment moat.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  
                  {/* Pillar 01 */}
                  <div className="bg-[#11141A] p-7 rounded-lg border border-white/[0.07] flex flex-col justify-between hover:border-[#C89B3C]/30 transition-colors">
                    <div>
                      <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-wider mb-3">01. Sector Fragmentation</div>
                      <h3 className="text-xl font-semibold text-white font-display mb-3">
                        Consolidating 4,000+ Disconnected Campus Clubs
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        Collegiate gaming currently mirrors 1960s collegiate football: massive grassroots student passion, 
                        unprecedented engagement, yet virtually zero institutional commercialization or unified governance. 
                        College Company supplies the operating holding architecture.
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-neutral-500">
                      Market Status: <span className="text-neutral-300">Early M&A Window</span>
                    </div>
                  </div>

                  {/* Pillar 02 */}
                  <div className="bg-[#11141A] p-7 rounded-lg border border-white/[0.07] flex flex-col justify-between hover:border-[#C89B3C]/30 transition-colors">
                    <div>
                      <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-wider mb-3">02. NIL & Creator Capital</div>
                      <h3 className="text-xl font-semibold text-white font-display mb-3">
                        Institutional Student-Athlete Monetization
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        NIL rights have created a multi-billion dollar direct-to-student liquidity channel. Through 
                        our College Esports NIL and Creator Academy divisions, we connect Fortune 500 sponsors 
                        directly to verified collegiate creators with enterprise compliance.
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-neutral-500">
                      Sector TAM: <span className="text-neutral-300">$230.4B Creator Economy</span>
                    </div>
                  </div>

                  {/* Pillar 03 */}
                  <div className="bg-[#11141A] p-7 rounded-lg border border-white/[0.07] flex flex-col justify-between hover:border-[#C89B3C]/30 transition-colors">
                    <div>
                      <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-wider mb-3">03. Digital Real Estate Moat</div>
                      <h3 className="text-xl font-semibold text-white font-display mb-3">
                        {PORTFOLIO_DATA.length} Category-Defining Domains & Trademarks
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        Unlike fragmented tech point solutions, College Company owns the definitive category-defining 
                        generic properties (CEX, CDRL, College Esports TV, College NIL Hub, College Revenue Share). This eliminates customer 
                        acquisition overhead and anchors permanent organic authority.
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono text-neutral-500">
                      IP Defensibility: <span className="text-neutral-300">Unreplicable Asset Base</span>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* ========================================================================= */}
            {/* 3. FOUR SYNERGISTIC OPERATING DIVISIONS */}
            {/* ========================================================================= */}
            <section className="py-20 md:py-24 border-b border-white/[0.08] bg-[#090A0C]">
              <div className="max-w-[1360px] mx-auto px-6">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
                      Holding Company Architecture
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                      Four Integrated Operating Divisions
                    </h2>
                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                      Each division generates stand-alone operating cash flow while compounding value across the broader collegiate ecosystem.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => { setActiveTab('holdings'); setHoldingsSubTab('topology'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-3.5 py-2 rounded bg-[#151922] hover:bg-[#1D2330] border border-white/10 text-[#E8C98B] hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Layers size={13} className="text-[#C89B3C]" />
                      <span>Interactive Topology Diagram →</span>
                    </button>
                    <button
                      onClick={() => { setActiveTab('holdings'); setHoldingsSubTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-3.5 py-2 rounded bg-[#C89B3C]/10 hover:bg-[#C89B3C]/20 border border-[#C89B3C]/30 text-[#E8C98B] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>All {PORTFOLIO_DATA.length} Assets Directory →</span>
                    </button>
                  </div>
                </div>

                {/* Division Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* Division 1 */}
                  <div className="bg-[#101319] p-8 rounded-lg border border-white/[0.08] space-y-4 hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#171B24] rounded border border-white/10 text-[#C89B3C]">
                          <Trophy size={20} />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Division 01</div>
                          <h3 className="text-lg font-bold text-white font-display">Competitive Leagues & Global Events</h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#C89B3C] tabular-nums">7 Holdings</span>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Operates premier intercollegiate circuits including the College Esports Expo (CEX), 
                      College Drone Racing League (CDRL), College Racing League (CRL), and the College Esports Champions national tournament.
                    </p>
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span>Key Revenue: Media Rights & Sponsorships</span>
                      <button 
                        onClick={() => { setSelectedDivision('Competitive Leagues'); setActiveTab('holdings'); setHoldingsSubTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-[#C89B3C] hover:underline cursor-pointer"
                      >
                        Review Assets →
                      </button>
                    </div>
                  </div>

                  {/* Division 2 */}
                  <div className="bg-[#101319] p-8 rounded-lg border border-white/[0.08] space-y-4 hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#171B24] rounded border border-white/10 text-[#C89B3C]">
                          <Users size={20} />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Division 02</div>
                          <h3 className="text-lg font-bold text-white font-display">NIL & Creator Capital</h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#C89B3C] tabular-nums">5 Holdings</span>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Monetizes collegiate student talent through College Esports NIL, College Creator Academy, 
                      and Esports Innovation hackathons, capturing high-margin brand marketing budgets.
                    </p>
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span>Key Revenue: 15% Platform Liquidity Take-Rate</span>
                      <button 
                        onClick={() => { setSelectedDivision('NIL & Creator Capital'); setActiveTab('holdings'); setHoldingsSubTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-[#C89B3C] hover:underline cursor-pointer"
                      >
                        Review Assets →
                      </button>
                    </div>
                  </div>

                  {/* Division 3 */}
                  <div className="bg-[#101319] p-8 rounded-lg border border-white/[0.08] space-y-4 hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#171B24] rounded border border-white/10 text-[#C89B3C]">
                          <Tv size={20} />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Division 03</div>
                          <h3 className="text-lg font-bold text-white font-display">Broadcast, Media & Publishing Networks</h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#C89B3C] tabular-nums">4 Holdings</span>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Digital broadcast and journalistic trade distribution network anchored by College Esports TV, 
                      College Esports Media, and College Esports Online live tournament hubs.
                    </p>
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span>Key Revenue: Syndication & Advertising Inventory</span>
                      <button 
                        onClick={() => { setSelectedDivision('Media & Broadcast'); setActiveTab('holdings'); setHoldingsSubTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-[#C89B3C] hover:underline cursor-pointer"
                      >
                        Review Assets →
                      </button>
                    </div>
                  </div>

                  {/* Division 4 */}
                  <div className="bg-[#101319] p-8 rounded-lg border border-white/[0.08] space-y-4 hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#171B24] rounded border border-white/10 text-[#C89B3C]">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Division 04</div>
                          <h3 className="text-lg font-bold text-white font-display">Campus Infrastructure, Health & Enterprise AI</h3>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#C89B3C] tabular-nums">12 Holdings</span>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      Physical and technological solutions: College Esports Arena architectural planning, 
                      College Esports Med digital health, Biz AI institutional analytics, and branded merchandise gear.
                    </p>
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span>Key Revenue: Annual B2B SaaS & Venue Contracts</span>
                      <button 
                        onClick={() => { setSelectedDivision('Campus Infrastructure'); setActiveTab('holdings'); setHoldingsSubTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-[#C89B3C] hover:underline cursor-pointer"
                      >
                        Review Assets →
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* STRATEGIC OPERATING ARCHITECTURE v1.0 CALLOUT */}
            <section className="py-6 bg-[#090A0C]">
              <div className="max-w-[1360px] mx-auto px-6">
                <div className="p-6 md:p-8 rounded-xl bg-gradient-to-r from-[#121622] via-[#0E1118] to-[#121622] border border-[#C89B3C]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[10px] font-mono text-[#E8C98B] uppercase font-bold tracking-wider">
                        Strategy v1.0 Blueprint
                      </span>
                      <span className="text-neutral-400 text-xs font-mono">Adopted October 2026</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      The 4-Function Commercial Operating Engine & Rights Gateway
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed">
                      Explore our transition from speculative domain holding to an active commercialization engine: 
                      15-asset disposition matrix, 6-week campus validation unit economics, and our non-negotiable educational firewall.
                    </p>
                  </div>
                  <button
                    onClick={() => { setActiveTab('strategy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md whitespace-nowrap cursor-pointer shrink-0"
                  >
                    Open Strategic Architecture →
                  </button>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 4. NATIONAL CAMPUS FOOTPRINT & CONFERENCE REACH (Executive Showcase) */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-20 border-b border-white/[0.08] bg-[#0A0C10]">
              <div className="max-w-[1360px] mx-auto px-6">
                <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#121622] via-[#0E1117] to-[#141824] border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="lg:col-span-8 space-y-5">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
                        <MapPin size={13} className="text-[#C89B3C]" />
                        <span>National Geographic Presence · 400+ Campuses</span>
                      </div>
                      
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                        Active Collegiate Footprint Across Every Major Athletic Conference
                      </h2>
                      
                      <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-3xl">
                        From Atlantic coast varsity powerhouses (Boston / Emerson) to Pacific hubs (UCLA / USC) and 
                        Midwestern Big Ten campuses, College Company operates an integrated network of varsity leagues, 
                        tournament arenas, FAST broadcast carriages, and student-athlete NIL collectives.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 font-mono text-xs">
                        <div className="p-3 rounded bg-[#090B0E] border border-white/5">
                          <div className="text-[#C89B3C] font-bold text-lg">Power-4</div>
                          <div className="text-neutral-400 text-[11px] mt-0.5">SEC, Big Ten, ACC, Big 12</div>
                        </div>
                        <div className="p-3 rounded bg-[#090B0E] border border-white/5">
                          <div className="text-[#68D391] font-bold text-lg">400+</div>
                          <div className="text-neutral-400 text-[11px] mt-0.5">Participating Colleges</div>
                        </div>
                        <div className="p-3 rounded bg-[#090B0E] border border-white/5">
                          <div className="text-[#38BDF8] font-bold text-lg">4 Hubs</div>
                          <div className="text-neutral-400 text-[11px] mt-0.5">East, South, Midwest, West</div>
                        </div>
                        <div className="p-3 rounded bg-[#090B0E] border border-white/5">
                          <div className="text-amber-400 font-bold text-lg">100%</div>
                          <div className="text-neutral-400 text-[11px] mt-0.5">FERPA & NCAA Compliant</div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
                      <div className="text-left lg:text-right space-y-1">
                        <span className="text-xs font-mono text-neutral-400">Interactive Map Visualization</span>
                        <div className="text-sm font-semibold text-white">Explore State & Conference Footprint</div>
                      </div>
                      <button
                        onClick={() => { setActiveTab('holdings'); setHoldingsSubTab('map'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="w-full sm:w-auto px-6 py-3.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Globe size={15} />
                        <span>Launch Interactive Campus Map →</span>
                      </button>
                      <button
                        onClick={() => { setActiveTab('holdings'); setHoldingsSubTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-xs font-mono text-neutral-400 hover:text-white transition-colors underline"
                      >
                        Or browse the {PORTFOLIO_DATA.length} Assets Directory
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 5. QUANTIFIED PROOF & BY THE NUMBERS */}
            {/* ========================================================================= */}
            <section className="py-20 md:py-24 border-b border-white/[0.08] bg-[#0C0E13]">
              <div className="max-w-[1360px] mx-auto px-6">
                
                <div className="max-w-2xl mb-14 space-y-2">
                  <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
                    Macro Sector Benchmarks
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    Market Capitalization & Sector Velocity
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="bg-[#11141B] p-6 rounded-lg border border-white/[0.07]">
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-white tabular-nums mb-1">
                      <AnimatedCounter prefix="$" end={230.4} suffix="B" decimals={1} />
                    </div>
                    <div className="text-xs font-semibold text-[#C89B3C] uppercase tracking-wider mb-2">Creator Economy TAM</div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Directly addressable digital content and gaming creator spend by global brands.
                    </p>
                  </div>

                  <div className="bg-[#11141B] p-6 rounded-lg border border-white/[0.07]">
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-white tabular-nums mb-1">
                      <AnimatedCounter end={22.7} suffix="%" decimals={1} />
                    </div>
                    <div className="text-xs font-semibold text-[#C89B3C] uppercase tracking-wider mb-2">Five-Year Sector CAGR</div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Compound annual growth rate of collegiate digital sports sponsorships and live streaming.
                    </p>
                  </div>

                  <div className="bg-[#11141B] p-6 rounded-lg border border-white/[0.07]">
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-white tabular-nums mb-1">
                      <AnimatedCounter end={450} suffix="+" />
                    </div>
                    <div className="text-xs font-semibold text-[#C89B3C] uppercase tracking-wider mb-2">Varsity Program Target</div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      North American higher education institutions actively establishing varsity gaming departments.
                    </p>
                  </div>

                  <div className="bg-[#11141B] p-6 rounded-lg border border-white/[0.07]">
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-white tabular-nums mb-1">
                      <AnimatedCounter prefix="$" end={12.4} suffix="M" decimals={1} />
                    </div>
                    <div className="text-xs font-semibold text-[#C89B3C] uppercase tracking-wider mb-2">Media & Rights Pipeline</div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Projected 3-year aggregated tournament broadcast, corporate sponsorship, and licensing inventory.
                    </p>
                  </div>

                </div>

              </div>
            </section>

            {/* ========================================================================= */}
            {/* 6. COLLEGIATE INTELLIGENCE & MARKET SIGNALS (Executive Preview) */}
            {/* ========================================================================= */}
            <section className="py-20 md:py-24 border-b border-white/[0.08] bg-[#0A0D12]">
              <div className="max-w-[1360px] mx-auto px-6 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest flex items-center gap-1.5">
                      <Radio size={13} className="text-[#C89B3C]" />
                      <span>Collegiate Intelligence · Research Wire</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                      Grounding the Structural Shift in Higher Education
                    </h2>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Continuous monitoring of legal antitrust developments, NCAA revenue sharing directives, and national varsity expansion.
                    </p>
                  </div>

                  <button
                    onClick={() => { setActiveTab('editorial'); setIntelligenceSubTab('market_wire'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-2.5 bg-[#171C26] hover:bg-[#202735] border border-[#C89B3C]/30 text-[#E8C98B] hover:text-white text-xs font-mono rounded-sm transition-colors flex items-center gap-2 cursor-pointer self-start md:self-auto"
                  >
                    <span>Open Live Grounded Research Hub →</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg bg-[#11141B] border border-white/[0.08] space-y-3 hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#C89B3C]">House v. NCAA Settlement</span>
                      <span className="text-neutral-500">Sports Business Journal</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white font-display">
                      Landmark $2.8B Revenue-Sharing Framework Cleared for Power-4 Athletics
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">
                      Federal judge issues preliminary approval establishing the formalized mechanism for athletic departments 
                      to directly share up to $22M annually with rostered student-athletes starting 2025.
                    </p>
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Fiduciary Impact: Accelerated commercial consolidation</span>
                      <button 
                        onClick={() => { setActiveTab('editorial'); setIntelligenceSubTab('market_wire'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-[#C89B3C] hover:underline cursor-pointer"
                      >
                        Read Grounded Brief →
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-[#11141B] border border-white/[0.08] space-y-3 hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#68D391]">FAST Syndication</span>
                      <span className="text-neutral-500">Broadcasting & Cable</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white font-display">
                      Collegiate Esports TV and Conference Digital Circuits Expand Linear Carriage
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">
                      Multi-year expansion across connected TV ecosystems, establishing dedicated 24/7 student-athlete 
                      competition broadcasts and verified campus highlights.
                    </p>
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Fiduciary Impact: Syndicated advertising inventory monetization</span>
                      <button 
                        onClick={() => { setActiveTab('editorial'); setIntelligenceSubTab('editorial'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-[#C89B3C] hover:underline cursor-pointer"
                      >
                        Read Editorial Dispatch →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Newsletter Subscription Card embedded directly in Homepage Intelligence Preview */}
                <NewsletterSignup variant="card" className="mt-8" />

              </div>
            </section>

            {/* ========================================================================= */}
            {/* 7. INVESTOR STRATEGY FAQ (Collegiate Digital Sports Holding Strategy) */}
            {/* ========================================================================= */}
            <section id="investor-faq" className="py-20 md:py-24 border-b border-white/[0.08] bg-[#0C0E14]">
              <div className="max-w-[1360px] mx-auto px-6">
                <InvestorStrategyFaq 
                  onRequestMemorandum={() => setIsInvestorModalOpen(true)}
                  onOpenMemo={() => setIsMemoOpen(true)}
                />
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 8. CALL TO ACTION BLOCK */}
            {/* ========================================================================= */}
            <section className="py-20 md:py-24 bg-[#090A0C]">
              <div className="max-w-[1360px] mx-auto px-6">
                
                <div className="bg-gradient-to-r from-[#121620] via-[#151A24] to-[#121620] p-10 md:p-16 rounded-xl border border-white/10 text-center space-y-6 max-w-4xl mx-auto shadow-2xl">
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C89B3C]/10 border border-[#C89B3C]/20 text-[#C89B3C] text-[11px] font-mono uppercase tracking-widest">
                    Accredited Capital Inquiries
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                    Partner With the Foundation of Collegiate Digital Athletics
                  </h2>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
                    We are currently qualifying institutional venture funds, university endowment partners, 
                    and corporate strategic investors for our Series A allocation.
                  </p>

                  <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
                    <button
                      onClick={() => setIsInvestorModalOpen(true)}
                      className="px-7 py-3.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md"
                    >
                      Request Series A Confidential Memorandum
                    </button>
                    <button
                      onClick={() => setIsMemoOpen(true)}
                      className="px-7 py-3.5 bg-[#171B24] hover:bg-[#202532] border border-white/15 text-white font-medium text-xs uppercase tracking-wider rounded-sm transition-all"
                    >
                      Read Executive Thesis Brief
                    </button>
                  </div>

                </div>

              </div>
            </section>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: HOLDINGS DIRECTORY ({PORTFOLIO_DATA.length} Strategic Entities) */}
        {/* ========================================================================= */}
        {activeTab === 'holdings' && (
          <motion.div
            key="holdings"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <section className="py-12 md:py-16 bg-[#090A0C]">
            <div className="max-w-[1360px] mx-auto px-6 space-y-8">
              
              {/* Holdings Sub-View Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                  <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
                    Asset Portfolio & Geographic Reach
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight mt-1">
                    {holdingsSubTab === 'directory' && `Holding Asset Directory (${PORTFOLIO_DATA.length} Brands)`}
                    {holdingsSubTab === 'map' && 'National Campus Footprint & Conference Map'}
                    {holdingsSubTab === 'topology' && 'Operating Holding Ecosystem Topology'}
                  </h1>
                </div>

                {/* Sub-view buttons */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => setHoldingsSubTab('directory')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      holdingsSubTab === 'directory'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <Briefcase size={13} />
                    <span>Directory ({PORTFOLIO_DATA.length})</span>
                  </button>

                  <button
                    onClick={() => setHoldingsSubTab('map')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      holdingsSubTab === 'map'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <MapPin size={13} />
                    <span>Campus Map</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#C89B3C]/20 text-[#E8C98B] border border-[#C89B3C]/30">
                      400+
                    </span>
                  </button>

                  <button
                    onClick={() => setHoldingsSubTab('topology')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      holdingsSubTab === 'topology'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <Layers size={13} />
                    <span>Ecosystem Topology</span>
                  </button>
                </div>
              </div>

              {/* Sub-View 1: Interactive Campus Footprint Map */}
              {holdingsSubTab === 'map' && (
                <div className="pt-2">
                  <InstitutionalImpactMap />
                </div>
              )}

              {/* Sub-View 2: Holding Ecosystem Topology */}
              {holdingsSubTab === 'topology' && (
                <div className="pt-2">
                  <HoldingEcosystemTopology 
                    onSelectDivision={(divName) => { 
                      setSelectedDivision(divName); 
                      setHoldingsSubTab('directory'); 
                      window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    }} 
                  />
                </div>
              )}

              {/* Sub-View 3: Asset Directory */}
              {holdingsSubTab === 'directory' && (
                <div className="space-y-8">
                  {/* Directory Header Action Bar */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
                    <p className="text-neutral-400 text-sm max-w-2xl leading-relaxed">
                      Comprehensive inspection of the {PORTFOLIO_DATA.length} proprietary brands, competitive circuits, 
                      clearinghouses, media platforms, and collegiate infrastructure assets under management.
                    </p>

                    {/* Grid / Table Toggle & Strategic Plan Link */}
                    <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
                      <button
                        onClick={() => { setActiveTab('strategy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-[#E8C98B] hover:bg-[#C89B3C]/20 transition-all text-xs font-mono font-medium cursor-pointer"
                      >
                        <Layers size={13} className="text-[#C89B3C]" />
                        <span>Disposition Matrix (v1.0) →</span>
                      </button>

                      <div className="flex items-center gap-1 p-1 bg-[#12151B] border border-white/10 rounded-sm">
                        <button
                          onClick={() => setViewMode('bento')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                            viewMode === 'bento' ? 'bg-[#C89B3C] text-[#090A0C] font-semibold' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Bento Cards
                        </button>
                        <button
                          onClick={() => setViewMode('table')}
                          className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                            viewMode === 'table' ? 'bg-[#C89B3C] text-[#090A0C] font-semibold' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Directory Table
                        </button>
                      </div>
                    </div>
                  </div>

              {/* Filters & Search Control Bar */}
              <div className="space-y-3 bg-[#0F1218] p-4 rounded-lg border border-white/[0.07]">
                
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
                  {/* Division Tabs */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {divisionsList.map((div) => (
                      <button
                        key={div}
                        onClick={() => setSelectedDivision(div)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap cursor-pointer ${
                          selectedDivision === div
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {div}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative min-w-[280px]">
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search domain, cluster, tech engine, thesis..."
                      className="w-full bg-[#0A0C10] border border-white/10 rounded-sm pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-[#C89B3C] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Sub-Filter: Cluster Filter Pills */}
                <div className="pt-2 border-t border-white/[0.05] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 whitespace-nowrap flex items-center gap-1">
                    <Filter size={11} className="text-[#C89B3C]" />
                    Cluster:
                  </span>
                  {clustersList.map((cluster) => (
                    <button
                      key={cluster}
                      onClick={() => setSelectedCluster(cluster)}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                        selectedCluster === cluster
                          ? 'bg-[#C89B3C]/15 border-[#C89B3C] text-[#E8C98B] font-semibold'
                          : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/20 bg-[#0B0D12]'
                      }`}
                    >
                      {cluster}
                    </button>
                  ))}
                  {selectedCluster !== 'All Clusters' && (
                    <button
                      onClick={() => setSelectedCluster('All Clusters')}
                      className="text-[10px] font-mono text-neutral-500 hover:text-neutral-300 underline whitespace-nowrap ml-1 cursor-pointer"
                    >
                      Reset Cluster
                    </button>
                  )}
                </div>

              </div>

              {/* Results Count & Active Status */}
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Showing {filteredBrands.length} of {PORTFOLIO_DATA.length} Portfolio Brands</span>
                <span>Click any asset for complete executive due-diligence memo</span>
              </div>

              {/* VIEW MODE A: BENTO GRID */}
              {viewMode === 'bento' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBrands.map((brand) => (
                    <div
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand)}
                      className={`bg-[#101319] p-6 rounded-lg border transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5 ${
                        brand.featured
                          ? 'border-[#C89B3C]/50 bg-gradient-to-b from-[#141924] to-[#101319] shadow-lg'
                          : 'border-white/[0.08] hover:border-white/25'
                      }`}
                    >
                      <div>
                        {/* Monogram Seal & Division Badging */}
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-sm border flex items-center justify-center font-display font-bold text-[11px] tracking-wider shrink-0 shadow-sm ${
                              brand.division === 'Competitive Leagues'
                                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                                : brand.division === 'NIL & Creator Capital'
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                                : brand.division === 'Media & Broadcast'
                                ? 'bg-sky-950/40 border-sky-500/40 text-sky-300'
                                : 'bg-purple-950/40 border-purple-500/40 text-purple-300'
                            }`}>
                              {brand.name.split(' ').map(w => w[0]).filter(c => c && c.match(/[A-Z0-9]/i)).slice(0, 3).join('')}
                            </div>
                            <div>
                              <div className="text-[10px] font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
                                {brand.division}
                              </div>
                              <div className="text-[9px] font-mono text-neutral-500">
                                ID: CC-{brand.id.toUpperCase()}
                              </div>
                            </div>
                          </div>
                          
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                            brand.status === 'Operating'
                              ? 'text-[#68D391] bg-emerald-950/40 border-emerald-500/30'
                              : brand.status === 'Scaling'
                              ? 'text-[#38BDF8] bg-sky-950/40 border-sky-500/30'
                              : 'text-[#E8C98B] bg-amber-950/40 border-amber-500/30'
                          }`}>
                            {brand.status}
                          </span>
                        </div>

                        {/* Domain Tag & Cluster Pill */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {brand.domain && (
                            <span className="text-[11px] font-mono text-[#E8C98B] font-semibold flex items-center gap-1">
                              <Globe size={11} className="text-[#C89B3C]" />
                              {brand.domain}
                            </span>
                          )}
                          {brand.cluster && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-neutral-300">
                              {brand.cluster}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-white font-display group-hover:text-[#E8C98B] transition-colors mb-2">
                          {brand.name}
                        </h3>

                        <p className="text-xs text-neutral-400 leading-relaxed mb-3 line-clamp-3">
                          {brand.desc}
                        </p>

                        {/* Core Engine Preview */}
                        {brand.coreTechEngine && (
                          <div className="mb-3 text-[10px] font-mono text-neutral-400 bg-[#0A0D12] px-2.5 py-1.5 rounded border border-white/5 truncate">
                            <span className="text-neutral-500">Tech Engine:</span> {brand.coreTechEngine}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] space-y-2">
                        <div className="text-[11px] text-neutral-500">
                          <span className="font-mono text-neutral-400">Monetization:</span> {brand.monetization}
                        </div>
                        <div className="flex items-center justify-between text-xs text-[#C89B3C] font-semibold pt-1">
                          <span>Inspect Holding Dossier</span>
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW MODE B: DIRECTORY TABLE */}
              {viewMode === 'table' && (
                <div className="border border-white/10 rounded-lg overflow-hidden bg-[#101319]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0B0D12] text-neutral-400 font-mono uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="py-3.5 px-6">Brand IP & Domain</th>
                          <th className="py-3.5 px-6">Division & Cluster</th>
                          <th className="py-3.5 px-6">Status</th>
                          <th className="py-3.5 px-6">Revenue Engine</th>
                          <th className="py-3.5 px-6 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06] text-neutral-300">
                        {filteredBrands.map((brand) => (
                          <tr 
                            key={brand.id} 
                            onClick={() => setSelectedBrand(brand)}
                            className="hover:bg-white/[0.03] cursor-pointer transition-colors"
                          >
                            <td className="py-4 px-6">
                              <div className="font-semibold text-white font-display text-sm">{brand.name}</div>
                              {brand.domain && (
                                <div className="text-[11px] font-mono text-[#E8C98B] flex items-center gap-1 mt-0.5">
                                  <Globe size={11} className="text-[#C89B3C]" />
                                  <span>{brand.domain}</span>
                                </div>
                              )}
                              <div className="text-[11px] text-neutral-400 max-w-md truncate mt-0.5">{brand.tagline}</div>
                            </td>
                            <td className="py-4 px-6 text-neutral-300 font-medium whitespace-nowrap">
                              <div>{brand.division}</div>
                              {brand.cluster && (
                                <div className="text-[10px] font-mono text-neutral-500 mt-0.5">{brand.cluster}</div>
                              )}
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap">
                              <span className="font-mono text-neutral-400 text-[11px]">{brand.status}</span>
                            </td>
                            <td className="py-4 px-6 text-neutral-400 text-[11px] max-w-xs truncate">
                              {brand.monetization}
                            </td>
                            <td className="py-4 px-6 text-right whitespace-nowrap">
                              <button className="text-[#C89B3C] hover:underline font-mono text-[11px]">
                                Dossier →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

                </div>
              )}

            </div>
          </section>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: STRATEGIC PLAN & COMMERCIAL ENGINE (Strategy v1.0) */}
      {/* ========================================================================= */}
      {activeTab === 'strategy' && (
        <motion.div
          key="strategy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <section className="py-14 md:py-20 bg-[#090A0C]">
            <div className="max-w-[1360px] mx-auto px-6">
              <StrategicCommercializationPlan />
            </div>
          </section>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: INTERACTIVE FINANCIAL MODEL & TAM SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'financials' && (
        <motion.div
          key="financials"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <section className="py-14 md:py-20 bg-[#090A0C]">
            <div className="max-w-[1360px] mx-auto px-6 space-y-12">
              
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
                  Quantitative Analysis · Unit Economics
                </div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                  Collegiate Ecosystem TAM & Yield Simulator
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                  Interactive model projecting recurring ecosystem revenue, student-athlete NIL deal volume, 
                  and broadcast licensing fees based on active campus adoption milestones.
                </p>
              </div>

              {/* Financial Model Sub-View Navigation Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => setFinancialSubTab('simulator')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      financialSubTab === 'simulator'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <SlidersHorizontal size={13} />
                    <span>TAM & Yield Simulator</span>
                  </button>

                  <button
                    onClick={() => setFinancialSubTab('nil_analytics')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      financialSubTab === 'nil_analytics'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <BarChart3 size={13} />
                    <span>NIL Analytics & Trends</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      financialSubTab === 'nil_analytics'
                        ? 'bg-[#090A0C] text-[#C89B3C]'
                        : 'bg-[#C89B3C]/20 text-[#E8C98B] border border-[#C89B3C]/30'
                    }`}>
                      SIGNALS
                    </span>
                  </button>

                  <button
                    onClick={() => setFinancialSubTab('athlete_calculator')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      financialSubTab === 'athlete_calculator'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <DollarSign size={13} />
                    <span>Athlete NIL Calculator</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      financialSubTab === 'athlete_calculator'
                        ? 'bg-[#090A0C] text-[#C89B3C]'
                        : 'bg-[#68D391]/20 text-[#68D391] border border-[#68D391]/30'
                    }`}>
                      INTERACTIVE
                    </span>
                  </button>
                </div>

                <div className="text-xs font-mono text-neutral-400 hidden sm:flex items-center gap-2">
                  <span>Current Fiduciary Mode:</span>
                  <span className="text-white font-semibold">
                    {financialSubTab === 'simulator' 
                      ? 'Interactive Adoption Projections' 
                      : financialSubTab === 'nil_analytics' 
                      ? 'Historical Stacked Deal Growth (2021-2026)' 
                      : 'Individual Student-Athlete Liquidity Valuation'}
                  </span>
                </div>
              </div>

              {financialSubTab === 'athlete_calculator' ? (
                <StudentAthleteNilCalculator onInspectOpportunities={() => setIsNilAlertsOpen(true)} />
              ) : financialSubTab === 'nil_analytics' ? (
                <NilAnalyticsSubView 
                  onInspectRadar={() => setIsNilAlertsOpen(true)} 
                  onOpenCalculator={() => setFinancialSubTab('athlete_calculator')}
                />
              ) : (
                <>
                  {/* Top Institutional Health Dashboard Component */}
                  <InstitutionalHealthDashboard 
                    campusCount={campusCount}
                    annualRunRate={calculatedMetrics.annualRunRate}
                  />

              {/* Projection Variance Scenario Toggle */}
              <div className="bg-[#11141B] p-5 rounded-lg border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-semibold flex items-center gap-1.5">
                      <TrendingUp size={14} /> Projection Variance Scenario:
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      growthScenario === 'Conservative' 
                        ? 'text-amber-400 bg-amber-950/40 border-amber-500/30' 
                        : growthScenario === 'Aggressive' 
                        ? 'text-[#68D391] bg-emerald-950/40 border-emerald-500/30' 
                        : 'text-[#E8C98B] bg-[#C89B3C]/15 border-[#C89B3C]/40'
                    }`}>
                      {growthScenario.toUpperCase()} VARIANCE
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {growthScenario === 'Conservative' && 'Assumes cautious university rollout (2.1x terminal), 32% active roster NIL engagement, and strict compliance margin thresholds.'}
                    {growthScenario === 'Expected' && 'Consensus base case aligned with verified Power-4 conference expansion pipeline (3.0x terminal) and 40% active NIL monetization.'}
                    {growthScenario === 'Aggressive' && 'Accelerated national saturation (4.2x terminal), state-by-state high school-to-college feeder conversion, and 52% active NIL engagement.'}
                  </p>
                </div>

                <div className="flex items-center bg-[#080A0E] p-1 rounded-sm border border-white/10 text-xs font-mono shrink-0">
                  <button
                    onClick={() => setGrowthScenario('Conservative')}
                    className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                      growthScenario === 'Conservative'
                        ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>Conservative (2.1x)</span>
                  </button>
                  <button
                    onClick={() => setGrowthScenario('Expected')}
                    className={`px-3.5 py-1.5 rounded-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                      growthScenario === 'Expected'
                        ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>Expected Base (3.0x)</span>
                  </button>
                  <button
                    onClick={() => setGrowthScenario('Aggressive')}
                    className={`px-3.5 py-1.5 rounded-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                      growthScenario === 'Aggressive'
                        ? 'bg-emerald-500/20 text-[#68D391] font-bold border border-emerald-500/40 shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Sparkles size={12} />
                    <span>Aggressive (4.2x)</span>
                  </button>
                </div>
              </div>

              {/* Real-Time NIL Opportunity Radar Widget */}
              <NilOpportunityWidget
                growthScenario={growthScenario}
                onOpenModal={() => setIsNilAlertsOpen(true)}
              />

              {/* Simulator Grid */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Controls (Sliders) */}
                <div className="lg:col-span-6 bg-[#11141B] p-8 rounded-lg border border-white/[0.08] space-y-8">
                  <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-wider flex items-center gap-2">
                    <SlidersHorizontal size={14} /> Operational Assumptions
                  </div>

                  {/* Slider 1: Campuses */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-neutral-300">Active University Campuses</span>
                      <span className="font-mono text-base font-bold text-white tabular-nums">{campusCount} Universities</span>
                    </div>
                    <input
                      type="range"
                      min={25}
                      max={450}
                      step={25}
                      value={campusCount}
                      onChange={(e) => setCampusCount(Number(e.target.value))}
                      className="w-full accent-[#C89B3C] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                      <span>25 (Pilot Cohort)</span>
                      <span>225 (Division 1 Core)</span>
                      <span>450 (National Saturation)</span>
                    </div>
                  </div>

                  {/* Slider 2: NIL Average Deal */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-neutral-300">Annual NIL Deal Volume per Active Athlete</span>
                      <span className="font-mono text-base font-bold text-white tabular-nums">${avgNilDeal.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={15000}
                      step={500}
                      value={avgNilDeal}
                      onChange={(e) => setAvgNilDeal(Number(e.target.value))}
                      className="w-full accent-[#C89B3C] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                      <span>$1,000 (Micro Brand Deals)</span>
                      <span>$7,500 (Regional Sponsors)</span>
                      <span>$15,000 (Tier-1 Varsity NIL)</span>
                    </div>
                  </div>

                  {/* Slider 3: Media Rights Tier */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-neutral-300">Annual Campus League & Broadcast Rights Tier</span>
                      <span className="font-mono text-base font-bold text-white tabular-nums">${mediaRightsTier.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={5000}
                      max={40000}
                      step={1000}
                      value={mediaRightsTier}
                      onChange={(e) => setMediaRightsTier(Number(e.target.value))}
                      className="w-full accent-[#C89B3C] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                      <span>$5,000 (Basic Conference)</span>
                      <span>$20,000 (Syndicated Stream)</span>
                      <span>$40,000 (Full Media Package)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0A0D12] rounded border border-white/[0.06] text-xs text-neutral-400 leading-relaxed">
                    Note: Calculations assume 45 student-athletes per campus roster across varsity and academy circuits, 
                    with a standard 15% platform commission on processed NIL liquidity.
                  </div>
                </div>

                {/* Right Results Panel */}
                <div className="lg:col-span-6 bg-[#131720] p-8 rounded-lg border border-[#C89B3C]/30 space-y-6 shadow-xl">
                  
                  <div className="border-b border-white/10 pb-4 flex justify-between items-center">
                    <span className="text-xs font-mono text-[#C89B3C] uppercase tracking-wider">Projected Output Matrix</span>
                    <span className="text-xs font-mono text-neutral-400">Model v2.4</span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="text-xs text-neutral-400 font-mono uppercase mb-1">Projected Annual Ecosystem Run-Rate</div>
                      <div className="text-4xl sm:text-5xl font-mono font-bold text-[#E8C98B] tabular-nums">
                        ${(calculatedMetrics.annualRunRate / 1000000).toFixed(2)}M
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Student Competitor Reach</div>
                        <div className="text-xl font-mono font-bold text-white tabular-nums">
                          {calculatedMetrics.totalAthletes.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Total NIL Volume Processed</div>
                        <div className="text-xl font-mono font-bold text-white tabular-nums">
                          ${(calculatedMetrics.nilVolume / 1000000).toFixed(2)}M
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Annual Campus Dues & Rights</div>
                        <div className="text-xl font-mono font-bold text-white tabular-nums">
                          ${(calculatedMetrics.campusLicensing / 1000000).toFixed(2)}M
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Average Gross Margin</div>
                        <div className="text-xl font-mono font-bold text-[#68D391] tabular-nums">
                          {calculatedMetrics.grossMarginPct}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 space-y-3">
                    <button
                      onClick={() => setIsFinancialReportModalOpen(true)}
                      className="w-full py-3.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors text-center flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <FileText size={15} />
                      <span>Generate Executive Financial Report (PDF / CSV)</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                      <button
                        onClick={() => downloadFinancialPDF({ campusCount, avgNilDeal, mediaRightsTier, growthScenario })}
                        className="py-2.5 bg-[#171C26] hover:bg-[#1E2533] border border-white/10 hover:border-[#C89B3C]/50 text-neutral-200 rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Download formatted PDF report based on current slider assumptions"
                      >
                        <Download size={13} className="text-[#C89B3C]" />
                        <span>Download PDF</span>
                      </button>

                      <button
                        onClick={() => downloadFinancialCSV({ campusCount, avgNilDeal, mediaRightsTier, growthScenario })}
                        className="py-2.5 bg-[#171C26] hover:bg-[#1E2533] border border-white/10 hover:border-[#38BDF8]/50 text-neutral-200 rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Download structured CSV dataset based on current slider assumptions"
                      >
                        <FileSpreadsheet size={13} className="text-[#38BDF8]" />
                        <span>Export CSV</span>
                      </button>
                    </div>

                    <div className="text-center pt-1">
                      <button
                        onClick={() => setIsInvestorModalOpen(true)}
                        className="text-[11px] font-mono text-neutral-400 hover:text-[#C89B3C] transition-colors underline"
                      >
                        Request Institutional DCF & Cap Table Audit (XLSX / Memo)
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* D3 5-Year Bar Chart Visualization */}
              <div className="pt-4">
                <EcosystemRevenueChart
                  campusCount={campusCount}
                  avgNilDeal={avgNilDeal}
                  mediaRightsTier={mediaRightsTier}
                  scenario={growthScenario}
                />
              </div>
            </>
          )}

            </div>
          </section>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: INSTITUTIONAL GOVERNANCE & COMPLIANCE */}
      {/* ========================================================================= */}
      {activeTab === 'governance' && (
        <motion.div
          key="governance"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <section className="py-12 md:py-16 bg-[#090A0C]">
            <div className="max-w-[1360px] mx-auto px-6 space-y-8">
              
              {/* Governance Sub-View Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                  <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
                    Institutional Architecture · Fiduciary Responsibility
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight mt-1">
                    {governanceSubTab === 'overview' && 'Governance, Advisory & Athletic Trust'}
                    {governanceSubTab === 'compliance-dashboard' && 'Automated Compliance & Bylaw Alignment Dashboard'}
                    {governanceSubTab === 'repository' && 'Athletic Rules & Compliance Repository'}
                    {governanceSubTab === 'risks' && 'Operational Risk Factors & Mitigation Matrix'}
                    {governanceSubTab === 'memo' && 'Executive Summary Memorandum & Charter'}
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => setGovernanceSubTab('overview')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      governanceSubTab === 'overview'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <Building2 size={13} />
                    <span>Advisory & Overview</span>
                  </button>

                  <button
                    onClick={() => setGovernanceSubTab('compliance-dashboard')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      governanceSubTab === 'compliance-dashboard'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <ShieldCheck size={13} />
                    <span>Compliance Dashboard</span>
                  </button>

                  <button
                    onClick={() => setGovernanceSubTab('repository')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      governanceSubTab === 'repository'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <Scale size={13} />
                    <span>Rules Repository</span>
                  </button>

                  <button
                    onClick={() => setGovernanceSubTab('risks')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      governanceSubTab === 'risks'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <ShieldCheck size={13} />
                    <span>Risk Factors</span>
                  </button>

                  <button
                    onClick={() => setGovernanceSubTab('memo')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      governanceSubTab === 'memo'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <FileText size={13} />
                    <span>Executive Memo</span>
                  </button>
                </div>
              </div>

              {/* Sub-View 1: Overview & Advisory Board */}
              {governanceSubTab === 'overview' && (
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
                    <p className="text-neutral-400 text-sm max-w-2xl leading-relaxed">
                      Operating across higher education demands stringent adherence to university compliance, 
                      amateur status protection, student-athlete health, and transparent fiscal governance.
                    </p>

                    <button
                      onClick={() => { setActiveTab('strategy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-[#E8C98B] hover:bg-[#C89B3C]/20 transition-all text-xs font-mono font-medium cursor-pointer shrink-0 self-start md:self-auto"
                    >
                      <ShieldCheck size={14} className="text-[#C89B3C]" />
                      <span>Educational Firewall & Rights Matrix (v1.0) →</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-[#11141A] p-7 rounded-lg border border-white/[0.08] space-y-3">
                      <div className="p-2.5 bg-[#171B24] rounded w-max text-[#C89B3C] mb-4">
                        <Scale size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-white font-display">NCAA & NAIA Regulatory Alignment</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Continuous monitoring of intercollegiate amateur status regulations, Title IX equity considerations, 
                        and university legal counsels to ensure full institutional standing.
                      </p>
                    </div>

                    <div className="bg-[#11141A] p-7 rounded-lg border border-white/[0.08] space-y-3">
                      <div className="p-2.5 bg-[#171B24] rounded w-max text-[#C89B3C] mb-4">
                        <Shield size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-white font-display">Student-Athlete NIL Escrow</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Automated contractual escrow mechanics protecting student competitors from predatory brand agreements 
                        while fulfilling state-specific NIL disclosure mandates.
                      </p>
                      <button
                        onClick={() => { setSelectedDirectMessageUser('sarah_jenkins'); setIsNetworkModalOpen(true); }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E8C98B] hover:text-white pt-1 transition-colors cursor-pointer"
                      >
                        <MessageSquare size={12} />
                        <span>Message Compliance Directorate</span>
                      </button>
                    </div>

                    <div className="bg-[#11141A] p-7 rounded-lg border border-white/[0.08] space-y-3">
                      <div className="p-2.5 bg-[#171B24] rounded w-max text-[#C89B3C] mb-4">
                        <Building2 size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-white font-display">University Relations Advisory Board</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Guided by former athletic directors, university provosts, and digital media attorneys ensuring 
                        long-term harmony between collegiate mission and commercial sustainability.
                      </p>
                      <button
                        onClick={() => { setSelectedDirectMessageUser('elena_rostova'); setIsNetworkModalOpen(true); }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E8C98B] hover:text-white pt-1 transition-colors cursor-pointer"
                      >
                        <MessageSquare size={12} />
                        <span>Message Athletic Advisory Liaison</span>
                      </button>
                    </div>
                  </div>

                  {/* D3 Regional Growth Velocity Map & Partnership Pipeline */}
                  <GovernanceGrowthVelocityMap />

                  {/* Executive Summary Memo Callout */}
                  <div className="bg-[#121620] p-8 rounded-lg border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-white font-display mb-1">Explore Codified Rules & Whitepaper</h3>
                      <p className="text-xs text-neutral-400">
                        Review athletic amateur protections, state NIL laws, and our fiduciary governance charter.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setGovernanceSubTab('repository')}
                        className="px-5 py-2.5 bg-[#1C2230] hover:bg-[#252E40] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                      >
                        Rules Repository →
                      </button>
                      <button
                        onClick={() => setGovernanceSubTab('memo')}
                        className="px-5 py-2.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                      >
                        Read Memorandum →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-View: Unified Automated Compliance & Bylaw Dashboard */}
              {governanceSubTab === 'compliance-dashboard' && (
                <div className="space-y-4 pt-2">
                  <ComplianceDashboard embedded={true} />
                </div>
              )}

              {/* Sub-View 2: Codified Rules & Athletic Compliance Repository */}
              {governanceSubTab === 'repository' && (
                <div className="space-y-4 pt-2">
                  <ComplianceRepositoryPortal embedded={true} />
                </div>
              )}

              {/* Sub-View 3: Institutional Operational Risk Factors */}
              {governanceSubTab === 'risks' && (
                <div className="pt-2">
                  <InstitutionalRiskFactors />
                </div>
              )}

              {/* Sub-View 4: Executive Summary Memorandum Brief */}
              {governanceSubTab === 'memo' && (
                <div className="p-8 md:p-12 rounded-xl bg-[#10141B] border border-white/10 space-y-8 max-w-4xl mx-auto shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <div className="font-mono text-xs text-[#C89B3C] uppercase tracking-widest mb-1">
                        CONFIDENTIAL EXECUTIVE MEMORANDUM · SERIES A MANDATE
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                        Consolidating the Digital Collegiate Athletics Economy
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 bg-[#171C26] hover:bg-[#202735] border border-white/10 text-neutral-300 hover:text-white rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Printer size={13} />
                        <span>Print Memo</span>
                      </button>
                      <button
                        onClick={() => {
                          const text = "COLLEGE COMPANY EXECUTIVE MEMORANDUM\nSeries A Mandate: Consolidating Collegiate Digital Sports, Media Rights & NIL Economy across 400+ North American universities.\n\nKey Moat: 43 generic category-defining digital assets (CEX, CDRL, College Esports TV, College NIL Hub).\nMonetization: NIL Marketplace 15% take-rate, Media Rights FAST linear carriage, and Enterprise Campus SaaS.\nInquiries: investors@collegecompany.com";
                          navigator.clipboard.writeText(text);
                          alert("Executive Memorandum text copied to clipboard.");
                        }}
                        className="px-3 py-1.5 bg-[#171C26] hover:bg-[#202735] border border-white/10 text-neutral-300 hover:text-white rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Copy size={13} />
                        <span>Copy Brief</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-light">
                    <div className="space-y-2">
                      <h3 className="font-bold text-white font-display text-base">1. The Macro Inefficiency</h3>
                      <p>
                        Over the past decade, high school and collegiate sports have witnessed an undeniable demographic inflection point: 
                        over 84% of university students identify as active video game players, and varsity digital sports programs 
                        are growing at a 22.7% CAGR. Despite this demand, collegiate esports has remained hyper-fragmented across thousands 
                        of underfunded student clubs and regional organizers with no consolidated rights holder.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-white font-display text-base">2. The College Company Solution</h3>
                      <p>
                        College Company operates as an integrated operating holding company. By owning the definitive category-defining 
                        digital real estate—including the College Esports Expo (CEX), College Esports NIL, and nationwide leagues for drone racing and sim motorsports—the 
                        company commands immediate organic mindshare and bypasses traditional customer acquisition hurdles.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-white font-display text-base">3. Diversified Revenue Mechanics</h3>
                      <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                        <li><strong className="text-white">NIL Marketplace Escrow:</strong> 15% platform take-rate on student-athlete brand sponsorships with automated regulatory disclosure.</li>
                        <li><strong className="text-white">Media Rights & FAST Syndication:</strong> Advertising inventory and 24/7 tournament broadcast packages across connected linear TV networks.</li>
                        <li><strong className="text-white">Institutional Licensing:</strong> Annual campus dues for varsity league software, telehealth (College Esports Med), and AI analytics.</li>
                        <li><strong className="text-white">Direct Merchandising:</strong> Technical varsity apparel and commemorative hardware under exclusive collegiate brand licenses.</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-white font-display text-base">4. Capital Allocation & Expansion Mandate</h3>
                      <p>
                        Series A proceeds are allocated towards expanding active campus varsity deployments from 150 to 450 institutions, 
                        scaling linear FAST channel distribution for College Esports TV, and institutionalizing the proprietary NIL legal compliance clearinghouse.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs font-mono text-neutral-500">
                      Author: Kevin Mitchell, Managing Member · Cambridge, MA
                    </div>
                    <button
                      onClick={() => setIsInvestorModalOpen(true)}
                      className="px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      Request Formal Investor Term Sheet →
                    </button>
                  </div>
                </div>
              )}

            </div>
          </section>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 5: INSTITUTIONAL EDITORIAL & LIVE INTELLIGENCE HUB */}
      {/* ========================================================================= */}
      {activeTab === 'editorial' && (
        <motion.div
          key="editorial"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <section className="py-12 md:py-16 bg-[#090A0C]">
            <div className="max-w-[1360px] mx-auto px-6 space-y-8">
              
              {/* Intelligence Sub-View Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                  <div className="text-xs font-mono text-[#C89B3C] uppercase tracking-widest">
                    Research, Editorial & Grounded Market Wire
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight mt-1">
                    {intelligenceSubTab === 'editorial' 
                      ? 'Institutional Editorial & Thought Leadership' 
                      : intelligenceSubTab === 'market_wire'
                      ? 'Live Grounded Market Intelligence Wire'
                      : 'Weekly Institutional Market Intelligence Updates'}
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => setIntelligenceSubTab('editorial')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      intelligenceSubTab === 'editorial'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <BookOpen size={13} />
                    <span>Thought Leadership Articles</span>
                  </button>

                  <button
                    onClick={() => setIntelligenceSubTab('market_wire')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      intelligenceSubTab === 'market_wire'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <Radio size={13} />
                    <span>Live Market Wire</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#C89B3C]/20 text-[#E8C98B] border border-[#C89B3C]/30">
                      GROUNDED
                    </span>
                  </button>

                  <button
                    onClick={() => setIntelligenceSubTab('newsletter')}
                    className={`px-3.5 py-2 rounded-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      intelligenceSubTab === 'newsletter'
                        ? 'bg-[#C89B3C] text-[#090A0C] shadow-md'
                        : 'bg-[#121622] hover:bg-[#1A2030] text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <Mail size={13} />
                    <span>Weekly Intelligence Briefing</span>
                  </button>
                </div>
              </div>

              {/* Sub-View Content */}
              {intelligenceSubTab === 'newsletter' ? (
                <div className="space-y-6">
                  <NewsletterSignup variant="card" />
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Executive Newsletter Signup Form in Intelligence & News Section */}
                  <NewsletterSignup variant="banner" />

                  {intelligenceSubTab === 'editorial' ? (
                    <BlogEditorialSection />
                  ) : (
                    <MarketIntelligenceFeed />
                  )}
                </div>
              )}

            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  </main>

      {/* ========================================================================= */}
      {/* 5. FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-[#07080A] border-t border-white/[0.08] py-14 relative">
        <div className="max-w-[1360px] mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
            
            {/* Col 1: Wordmark & Statement */}
            <div className="md:col-span-5 space-y-4">
              <SovereignLogo />
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                The institutional operating holding company consolidating collegiate digital sports, 
                campus media rights, and student-athlete NIL infrastructure across North America.
              </p>
              <div className="text-[11px] font-mono text-neutral-500">
                Corporate Office: Boston, Massachusetts · Cambridge Innovation Hub
              </div>
            </div>

            {/* Col 2: Divisions */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#C89B3C]">Divisions</div>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><button onClick={() => { setSelectedDivision('Competitive Leagues'); setActiveTab('holdings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Competitive Leagues & Circuits</button></li>
                <li><button onClick={() => { setSelectedDivision('NIL & Creator Capital'); setActiveTab('holdings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">NIL & Creator Economy</button></li>
                <li><button onClick={() => { setSelectedDivision('Media & Broadcast'); setActiveTab('holdings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Broadcast & Media Networks</button></li>
                <li><button onClick={() => { setSelectedDivision('Campus Infrastructure'); setActiveTab('holdings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Campus Infrastructure & Health</button></li>
              </ul>
            </div>

            {/* Col 3: Institutional Links */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#C89B3C]">Investor Relations</div>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><button onClick={() => setIsInvestorModalOpen(true)} className="hover:text-white transition-colors">Prospectus Access</button></li>
                <li><button onClick={() => setIsMemoOpen(true)} className="hover:text-white transition-colors">Executive Memo</button></li>
                <li><button onClick={() => { setActiveTab('financials'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Financial Model</button></li>
                <li><button onClick={() => { setActiveTab('governance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Athletic Compliance</button></li>
                <li><button onClick={() => { setActiveTab('editorial'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Editorial & Articles</button></li>
                <li><button onClick={() => { setActiveTab('governance'); setGovernanceSubTab('compliance-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Compliance Dashboard</button></li>
                <li><button onClick={() => setIsCompliancePortalOpen(true)} className="hover:text-white transition-colors">Rules & Compliance Repository</button></li>
              </ul>
            </div>

            {/* Col 4: Inquiries */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#C89B3C]">Direct Inquiries</div>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><a href="mailto:kevin@collegeesportsx.com" className="hover:text-white transition-colors">investors@collegecompany.com</a></li>
                <li><span className="text-neutral-500">Institutional Line: +1 (617) 500-CEX0</span></li>
                <li><span className="text-neutral-500">EIN / C-Corp: Registered Delaware</span></li>
              </ul>
            </div>

          </div>

          {/* Bottom Legal & Admin Access */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div>
              &copy; {new Date().getFullYear()} College Company Holding Group Inc. All rights reserved. 
              Protected by US & International Trademark & Copyright Law.
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setLegalModalType('confidentiality')} 
                className="hover:text-neutral-400 cursor-pointer text-xs text-neutral-500 transition-colors"
              >
                Confidentiality Policy
              </button>
              <button 
                onClick={() => setLegalModalType('regulatory')} 
                className="hover:text-neutral-400 cursor-pointer text-xs text-neutral-500 transition-colors"
              >
                Regulatory Disclosures
              </button>

              {/* Discrete Admin Carousel Trigger */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-neutral-600 hover:text-[#C89B3C] transition-colors p-1"
                title="Visual Media Console"
              >
                <Settings size={14} />
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 6. MODAL: BRAND DOSSIER INSPECTOR */}
      {/* ========================================================================= */}
      {selectedBrand && (
        <div 
          onClick={() => setSelectedBrand(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#10141B] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          >
            
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b border-white/10 bg-[#141822]">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded border flex items-center justify-center font-display font-bold text-sm tracking-wider shrink-0 shadow-inner ${
                  selectedBrand.division === 'Competitive Leagues'
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                    : selectedBrand.division === 'NIL & Creator Capital'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : selectedBrand.division === 'Media & Broadcast'
                    ? 'bg-sky-950/40 border-sky-500/40 text-sky-300'
                    : 'bg-purple-950/40 border-purple-500/40 text-purple-300'
                }`}>
                  {selectedBrand.name.split(' ').map(w => w[0]).filter(c => c && c.match(/[A-Z0-9]/i)).slice(0, 3).join('')}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#C89B3C] font-semibold">
                      Holding Dossier · {selectedBrand.division}
                    </span>
                    {selectedBrand.cluster && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                        {selectedBrand.cluster}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                    <span>{selectedBrand.name}</span>
                  </h2>
                  {selectedBrand.domain && (
                    <div className="text-xs font-mono text-[#E8C98B] flex items-center gap-1.5 mt-0.5 font-medium">
                      <Globe size={12} className="text-[#C89B3C]" />
                      <span>{selectedBrand.domain}</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedBrand(null)}
                className="p-1.5 hover:bg-white/5 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto">
              
              {/* Platform Concept & Mandate */}
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">Operating Mandate & Platform Concept</div>
                <div className="bg-[#0A0D12] p-4 rounded border border-white/5 space-y-2">
                  {selectedBrand.platformConcept && (
                    <div className="text-xs font-semibold text-[#E8C98B] font-display flex items-center gap-1.5 pb-2 border-b border-white/5">
                      <Sparkles size={13} className="text-[#C89B3C]" />
                      {selectedBrand.platformConcept}
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    {selectedBrand.desc}
                  </p>
                </div>
              </div>

              {/* Core Technology Engine & Primary Hook */}
              {(selectedBrand.coreTechEngine || selectedBrand.primaryPlatformHook) && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedBrand.coreTechEngine && (
                    <div className="bg-[#0A0D12] p-4 rounded border border-white/5">
                      <div className="text-[10px] font-mono uppercase text-[#38BDF8] flex items-center gap-1.5 mb-1.5 font-semibold">
                        <Cpu size={12} />
                        Core Technology Engine
                      </div>
                      <div className="text-xs text-neutral-200 leading-relaxed font-mono">
                        {selectedBrand.coreTechEngine}
                      </div>
                    </div>
                  )}
                  {selectedBrand.primaryPlatformHook && (
                    <div className="bg-[#0A0D12] p-4 rounded border border-white/5">
                      <div className="text-[10px] font-mono uppercase text-[#68D391] flex items-center gap-1.5 mb-1.5 font-semibold">
                        <CheckCircle2 size={12} />
                        Primary Platform Hook
                      </div>
                      <div className="text-xs text-neutral-200 leading-relaxed">
                        {selectedBrand.primaryPlatformHook}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Monetization & Operational Metrics */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#0A0D12] p-4 rounded border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-neutral-500">Revenue Engine & Take-Rate</div>
                  <div className="text-xs font-semibold text-white">{selectedBrand.monetization}</div>
                  {selectedBrand.monetizationHook && (
                    <div className="text-[11px] text-neutral-400 font-mono pt-1 border-t border-white/5">
                      <span className="text-[#C89B3C]">Hook:</span> {selectedBrand.monetizationHook}
                    </div>
                  )}
                </div>
                <div className="bg-[#0A0D12] p-4 rounded border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-neutral-500">Operational Status & Compliance</div>
                  <div className="text-xs font-semibold text-[#C89B3C]">{selectedBrand.status}</div>
                  {selectedBrand.sourceRef && (
                    <div className="text-[10px] text-neutral-400 font-mono pt-1 border-t border-white/5">
                      <span className="text-neutral-500">Audit Authority:</span> {selectedBrand.sourceRef}
                    </div>
                  )}
                </div>
              </div>

              {/* Target Constituency */}
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">Target Audience & Market Stakeholders</div>
                <div className="text-xs text-neutral-300 bg-[#0A0D12] p-3 rounded border border-white/5 font-mono">
                  {selectedBrand.targetAudience}
                </div>
              </div>

              {/* Strategic Synergy */}
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">Strategic Synergy with College Company Holding Group</div>
                <p className="text-xs text-neutral-400 leading-relaxed bg-[#0A0D12] p-3 rounded border border-white/5">
                  Consolidated generic domain authority and rights ownership eliminate fragmented third-party agency take-rates. 
                  Enables friction-free campus marketing, syndicated live broadcasts across 400+ institutions, and automated student-athlete NIL contract reconciliation.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-[#0C0F15] flex justify-end gap-3">
              <button
                onClick={() => setSelectedBrand(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Close Dossier
              </button>
              <button
                onClick={() => { setSelectedBrand(null); setIsInvestorModalOpen(true); }}
                className="px-4 py-2 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors"
              >
                Request Asset Financials
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL: ACCREDITED INVESTOR DECK REQUEST */}
      {/* ========================================================================= */}
      {isInvestorModalOpen && (
        <div 
          onClick={() => setIsInvestorModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#10141B] border border-white/10 rounded-xl w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col shadow-2xl"
          >
            
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-[#141822]">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#C89B3C]">Institutional Allocation</div>
                <h2 className="text-lg font-bold text-white font-display">Series A Investment Prospectus</h2>
              </div>
              <button
                onClick={() => setIsInvestorModalOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded text-neutral-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#C89B3C]/20 border border-[#C89B3C] text-[#C89B3C] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">Inquiry Registered Under NDA</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                    Thank you, {investorForm.name}. A confidential access token and the Executive Prospectus deck have been dispatched to <span className="text-[#C89B3C]">{investorForm.email}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => { setFormSubmitted(false); setIsInvestorModalOpen(false); setIsMemoOpen(true); }}
                      className="px-6 py-2.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors"
                    >
                      Read Executive Summary Now
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInvestorSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-neutral-300 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={investorForm.name}
                      onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-[#0A0D12] border border-white/10 rounded-sm px-3.5 py-2.5 text-white placeholder-neutral-600 focus:border-[#C89B3C] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-300 mb-1">Firm / Institutional Entity</label>
                    <input
                      type="text"
                      required
                      value={investorForm.firm}
                      onChange={(e) => setInvestorForm({ ...investorForm, firm: e.target.value })}
                      placeholder="e.g. Cambridge Capital Partners"
                      className="w-full bg-[#0A0D12] border border-white/10 rounded-sm px-3.5 py-2.5 text-white placeholder-neutral-600 focus:border-[#C89B3C] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-300 mb-1">Institutional Email Address</label>
                    <input
                      type="email"
                      required
                      value={investorForm.email}
                      onChange={(e) => setInvestorForm({ ...investorForm, email: e.target.value })}
                      placeholder="name@firm.com"
                      className="w-full bg-[#0A0D12] border border-white/10 rounded-sm px-3.5 py-2.5 text-white placeholder-neutral-600 focus:border-[#C89B3C] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-neutral-300 mb-1">Investor Class</label>
                      <select
                        value={investorForm.investorClass}
                        onChange={(e) => setInvestorForm({ ...investorForm, investorClass: e.target.value })}
                        className="w-full bg-[#0A0D12] border border-white/10 rounded-sm px-3 py-2 text-white focus:border-[#C89B3C] outline-none"
                      >
                        <option>Venture Capital</option>
                        <option>Private Equity</option>
                        <option>Family Office</option>
                        <option>University Endowment</option>
                        <option>Strategic Corporate</option>
                        <option>Accredited Individual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-300 mb-1">Anticipated Check Size</label>
                      <select
                        value={investorForm.allocation}
                        onChange={(e) => setInvestorForm({ ...investorForm, allocation: e.target.value })}
                        className="w-full bg-[#0A0D12] border border-white/10 rounded-sm px-3 py-2 text-white focus:border-[#C89B3C] outline-none"
                      >
                        <option>$100,000 - $250,000</option>
                        <option>$250,000 - $500,000</option>
                        <option>$500,000 - $1,000,000</option>
                        <option>$1,000,000 - $3,000,000</option>
                        <option>$3,000,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2 cursor-pointer text-neutral-400">
                      <input
                        type="checkbox"
                        checked={investorForm.ndaAgreed}
                        onChange={(e) => setInvestorForm({ ...investorForm, ndaAgreed: e.target.checked })}
                        className="mt-0.5 accent-[#C89B3C]"
                      />
                      <span className="text-[11px] leading-tight">
                        I confirm accredited investor qualification under SEC Rule 501 and agree to standard mutual non-disclosure obligations for proprietary data.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors mt-2"
                  >
                    Authenticate & Access Prospectus
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. MODAL: EXECUTIVE SUMMARY MEMORANDUM */}
      {/* ========================================================================= */}
      {isMemoOpen && (
        <div 
          onClick={() => setIsMemoOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#10141B] border border-white/10 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          >
            
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-[#141822]">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#C89B3C]">Confidential Memorandum</div>
                <h2 className="text-lg font-bold text-white font-display">College Company Executive Thesis (Brief)</h2>
              </div>
              <button
                onClick={() => setIsMemoOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded text-neutral-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              <div className="border-b border-white/10 pb-4">
                <div className="font-mono text-[11px] text-[#C89B3C] uppercase mb-1">EXECUTIVE SUMMARY · SERIES A ROUND</div>
                <div className="text-xl font-bold font-display text-white">The Macro Thesis: Consolidating Digital Collegiate Athletics</div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-white font-display text-base">1. The Market Inefficiency</h4>
                <p>
                  Over the past decade, high school and collegiate sports have witnessed an undeniable demographic inflection point: 
                  over 84% of university students identify as active video game players, and varsity digital sports programs 
                  are growing at a 22.7% CAGR. Despite this demand, collegiate esports has remained hyper-fragmented across thousands 
                  of underfunded student clubs and regional organizers with no consolidated rights holder.
                </p>
                
                <h4 className="font-bold text-white font-display text-base">2. The College Company Solution</h4>
                <p>
                  College Company operates as an integrated holding group. By owning the definitive IP real estate—including the 
                  College Esports Expo (CEX), College Esports NIL, and nationwide leagues for drone racing and sim motorsports—the 
                  company commands immediate organic mindshare and bypasses traditional customer acquisition hurdles.
                </p>

                <h4 className="font-bold text-white font-display text-base">3. Revenue Mechanics & Capital Efficiency</h4>
                <p>
                  Revenue is diversified across four complementary engines:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                  <li><strong className="text-white">NIL Marketplace Fee:</strong> 15% take-rate on student-athlete brand sponsorships.</li>
                  <li><strong className="text-white">Media Rights & FAST Syndication:</strong> Advertising and tournament broadcast packages.</li>
                  <li><strong className="text-white">Institutional Licensing:</strong> Annual campus dues for varsity league software, telehealth, and AI analytics.</li>
                  <li><strong className="text-white">Direct Merchandising:</strong> Technical varsity apparel and commemorative hardware.</li>
                </ul>

                <h4 className="font-bold text-white font-display text-base">4. Capital Allocation & Expansion Roadmap</h4>
                <p>
                  Series A proceeds are earmarked for expanding campus varsity deployments from 150 to 450 institutions, 
                  scaling linear FAST channel distribution for College Esports TV, and expanding the proprietary NIL legal compliance network.
                </p>
              </div>

            </div>

            <div className="p-4 border-t border-white/10 bg-[#0C0F15] flex flex-wrap justify-between items-center gap-3 text-xs">
              <span className="text-neutral-500 font-mono">Confidential · For Authorized Discussion Only</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setIsMemoOpen(false); setActiveTab('strategy'); }}
                  className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold uppercase tracking-wider rounded-sm transition-colors text-xs"
                >
                  Explore Strategic Plan (v1.0)
                </button>
                <button
                  onClick={() => { setIsMemoOpen(false); setIsInvestorModalOpen(true); }}
                  className="px-4 py-2 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold uppercase tracking-wider rounded-sm transition-colors"
                >
                  Request Full Term Sheet
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. ADMIN PANEL (Media & Carousel Manager) */}
      {/* ========================================================================= */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        images={heroImages}
        setImages={setHeroImages}
      />

      {/* ========================================================================= */}
      {/* 10. INSTITUTIONAL SYNDICATE NETWORK & MESSAGING PORTAL */}
      {/* ========================================================================= */}
      <MemberProfileAndMessaging
        isOpen={isNetworkModalOpen}
        onClose={() => {
          setIsNetworkModalOpen(false);
          setSelectedDirectMessageUser(null);
        }}
        defaultRecipientId={selectedDirectMessageUser}
      />

      {/* ========================================================================= */}
      {/* 11. RULES & COMPLIANCE REPOSITORY PORTAL (MODAL) */}
      {/* ========================================================================= */}
      <ComplianceRepositoryPortal
        isOpen={isCompliancePortalOpen}
        onClose={() => setIsCompliancePortalOpen(false)}
      />

      {/* ========================================================================= */}
      {/* 12. PRO-FORMA FINANCIAL & TAM REPORT GENERATOR MODAL */}
      {/* ========================================================================= */}
      <FinancialReportModal
        isOpen={isFinancialReportModalOpen}
        onClose={() => setIsFinancialReportModalOpen(false)}
        inputs={{
          campusCount,
          avgNilDeal,
          mediaRightsTier,
          growthScenario
        }}
      />

      {/* ========================================================================= */}
      {/* 13. NIL OPPORTUNITY NOTIFICATIONS & MARKET MONITOR MODAL */}
      {/* ========================================================================= */}
      <NilOpportunityModal
        growthScenario={growthScenario}
        isOpen={isNilAlertsOpen}
        onClose={() => setIsNilAlertsOpen(false)}
      />

      {/* ========================================================================= */}
      {/* 14. INSTITUTIONAL LEGAL & REGULATORY DISCLOSURES MODAL */}
      {/* ========================================================================= */}
      <InstitutionalLegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* ========================================================================= */}
      {/* 15. INSTITUTIONAL COMMAND PALETTE & OMNI-SEARCH (⌘K) */}
      {/* ========================================================================= */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        portfolioData={PORTFOLIO_DATA}
        onSelectBrand={(brand) => {
          setSelectedBrand(brand);
        }}
        onNavigate={(tab, subTab) => {
          setActiveTab(tab);
          if (tab === 'holdings' && subTab) {
            setHoldingsSubTab(subTab as any);
          } else if (tab === 'financials' && subTab) {
            setFinancialSubTab(subTab as any);
          } else if (tab === 'governance' && subTab) {
            setGovernanceSubTab(subTab as any);
          } else if (tab === 'editorial' && subTab) {
            setIntelligenceSubTab(subTab as any);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenModal={(modal) => {
          if (modal === 'prospectus') setIsInvestorModalOpen(true);
          else if (modal === 'memo') setIsMemoOpen(true);
          else if (modal === 'nil_alerts') setIsNilAlertsOpen(true);
          else if (modal === 'network') setIsNetworkModalOpen(true);
          else if (modal === 'compliance') setIsCompliancePortalOpen(true);
        }}
      />

    </div>
  );
};

export default App;
