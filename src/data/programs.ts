import heroArenaImg from '../assets/images/hero_collegiate_arena_1790396550961.jpg';
import holdingDroneImg from '../assets/images/holding_drone_racing_1790396561471.jpg';
import mediaBroadcastImg from '../assets/images/media_broadcast_center_1790396570502.jpg';
import executiveBoardroomImg from '../assets/images/diverse_boardroom_1791594527458.jpg';
import nilClearinghouseImg from '../assets/images/nil_clearinghouse_1791594540477.jpg';
import creatorStudioImg from '../assets/images/creator_studio_1791594557100.jpg';

export type DoorKey = 'learn' | 'compete' | 'earn' | 'trust';
export type ProgramStatus = 'Live' | 'In development' | 'Concept';

export interface CourseTrack {
  trackNumber: number;
  title: string;
  summary: string;
  courses: string[];
}

export interface ProgramItem {
  id: string;
  slug: string;
  path: string;
  door: DoorKey;
  doorLabel: 'Learn' | 'Compete' | 'Earn' | 'Trust';
  name: string;
  badge?: string;
  domain?: string;
  flagship?: boolean;
  parentEntry?: boolean;
  status: ProgramStatus;
  oneLine: string;
  image: string;
  imageAlt: string;
  whatIsIt: string;
  whoIsItFor: string;
  whatDoIGet: string[];
  howDoIStart: string;
  cost: string;
  outboundUrl?: string;
  outboundLabel?: string;
  outboundNote?: string;
  tracks?: CourseTrack[];
  trustHighlights?: { title: string; detail: string }[];
  disclaimer?: string;
  extraSections?: { title: string; body: string; bullets?: string[] }[];
}

export const DOOR_META: Record<
  DoorKey,
  {
    key: DoorKey;
    label: 'Learn' | 'Compete' | 'Earn' | 'Trust';
    path: string;
    eyebrow: string;
    headline: string;
    description: string;
    accentColor: string;
  }
> = {
  learn: {
    key: 'learn',
    label: 'Learn',
    path: '/learn',
    eyebrow: '01 · Learn',
    headline: 'Micro-courses for real careers, creators, and families.',
    description:
      'Practical workshops and structured learning tracks built for the general collegiate population — from creator-economy job skills to plain-English NIL tax and rule literacy.',
    accentColor: '#C89B3C',
  },
  compete: {
    key: 'compete',
    label: 'Compete',
    path: '/compete',
    eyebrow: '02 · Compete',
    headline: 'Team building and competition open to every student, not just varsity.',
    description:
      'Clubs, casual players, engineers, drivers, and campus organizers can join leagues, events, and team formats without a varsity scholarship.',
    accentColor: '#38BDF8',
  },
  earn: {
    key: 'earn',
    label: 'Earn',
    path: '/earn',
    eyebrow: '03 · Earn',
    headline: 'Compliant ways to earn while you learn — zero student commission.',
    description:
      'Under our Student-First Charter, brands pay a disclosed fee for campaign placement and support; students and learners keep 100% of their agreed earnings with zero commission.',
    accentColor: '#68D391',
  },
  trust: {
    key: 'trust',
    label: 'Trust',
    path: '/trust',
    eyebrow: '04 · Trust',
    headline: 'Rules, disclosure, and financial clarity built into every step.',
    description:
      'The rules are part of the curriculum — NIL reporting, FTC disclosure, and taxes, taught in every program.',
    accentColor: '#E8C98B',
  },
};

export const PROGRAMS: ProgramItem[] = [
  // =========================================================================
  // 1. LEARN
  // =========================================================================
  {
    id: 'college-creator-academy',
    slug: 'college-creator-academy',
    path: '/learn/college-creator-academy',
    door: 'learn',
    doorLabel: 'Learn',
    name: 'College Creator Academy',
    badge: 'CCA',
    domain: 'collegecreatoracademy.com',
    flagship: true,
    status: 'In development',
    oneLine:
      'Flagship creator-economy workforce curriculum with 5 tracks taking students from content basics to compliance and paid career skills.',
    image: creatorStudioImg,
    imageAlt: 'Students collaborating inside a collegiate digital media and creator production lab',
    whatIsIt:
      'College Creator Academy (CCA) is College Company’s flagship micro-course curriculum for creative workforce readiness and digital entrepreneurship. Organized into five structured tracks, it moves students step by step from audience storytelling and studio production to brand deal compliance and career placement.',
    whoIsItFor:
      'Any college or incoming student who wants practical digital media, storytelling, audience, or brand-partnership skills — no prior creator following or varsity athletic status required.',
    whatDoIGet: [
      'Structured 5-track curriculum spanning foundations through compliance and career readiness',
      'Hands-on portfolio deliverables you can show to employers, clubs, or brand partners',
      'Plain-English training on FTC paid-partnership rules, contracts, and creator taxes',
      'Direct pathway to College Creator Lab workshops and the Earn Placement Desk',
    ],
    howDoIStart:
      'Visit the College Creator Academy site via the link below or submit a quick note on our Contact page to be notified when the next student cohort opens.',
    cost: 'Pricing announced at launch. Individual student micro-course rates and optional school cohort access will be published before enrollment opens.',
    outboundUrl: 'https://collegecreatoracademy.com',
    outboundLabel: 'Visit College Creator Academy',
    outboundNote: 'External academy portal (confirm live enrollment URL with Kevin Mitchell).',
    tracks: [
      {
        trackNumber: 1,
        title: 'Track 1 · Content & Storytelling Foundations',
        summary: 'Core narrative craft, short-form video structure, and ethical audience development.',
        courses: [
          '101: Defining Your Voice & Audience Without Burnout',
          '102: Short-Form Video Structure, Hooks & Editing Basics',
          '103: Visual Consistency, Thumbnails & Accessibility Captions',
        ],
      },
      {
        trackNumber: 2,
        title: 'Track 2 · Production, Audio & Live Broadcast Crafts',
        summary: 'Practical camera, lighting, microphone, and live streaming workflows on a student budget.',
        courses: [
          '201: Dorm & Studio Lighting, Audio & Camera Setup',
          '202: Live Broadcast Production & Commentary Fundamentals',
          '203: Portfolio Case Studies for Campus & Media Employers',
        ],
      },
      {
        trackNumber: 3,
        title: 'Track 3 · Business Models & Audience Growth',
        summary: 'Turning creative projects into sustainable media kits, newsletters, and community assets.',
        courses: [
          '301: Building an Owned Audience Beyond Social Algorithms',
          '302: Media Kits, Rate Cards & Deliverable Scoping',
          '303: Sponsorship Proposals for Local & National Brands',
        ],
      },
      {
        trackNumber: 4,
        title: 'Track 4 · Compliance, Disclosure & Taxes',
        summary: 'Protecting your eligibility, reputation, and finances on every deal.',
        courses: [
          '401: FTC Paid-Partnership Disclosure & Honest Advertising Rules',
          '402: Contract Redlines, Usage Rights & Avoiding Predatory Traps',
          '403: Creator Taxes, Recordkeeping & NIL Reporting Basics',
        ],
      },
      {
        trackNumber: 5,
        title: 'Track 5 · Workforce Readiness & Career Launch',
        summary: 'Translating creator and team-project experience into jobs, internships, or small businesses.',
        courses: [
          '501: Converting Creator Portfolios into Media & Marketing Resumes',
          '502: Agency, Campus Athletics & Brand-Side Career Paths',
          '503: Capstone Project Review & Peer Feedback Showcase',
        ],
      },
    ],
  },
  {
    id: 'nil-money-101',
    slug: 'nil-money-101',
    path: '/learn/nil-money-101',
    door: 'learn',
    doorLabel: 'Learn',
    name: 'NIL Money 101',
    badge: 'NM101',
    status: 'In development',
    oneLine:
      'Plain-language tax and financial planning micro-course covering the $400 filing trigger, NIL Go $600 reporting, scholarships, and family checklists.',
    image: nilClearinghouseImg,
    imageAlt: 'Financial planning and tax literacy materials for collegiate students and families',
    whatIsIt:
      'NIL Money 101 is a practical financial-planning and tax literacy micro-course designed for student-athletes, student creators, and parents. It strips away legal and accounting jargon so families understand what happens before, during, and after money or free gear changes hands.',
    whoIsItFor:
      'College students earning from NIL or creator work, high school families preparing for college, and parents who want straight answers before signing anything.',
    whatDoIGet: [
      'Module on the IRS $400 net self-employment earnings filing trigger',
      'Walkthrough of NIL Go / institutional $600 reporting rules and fair market value documentation',
      'Forms Season guide: W-9, 1099-NEC, 1099-K, and tracking business expenses (Schedule C basics)',
      'Quarterly estimated tax calendar and simple percentage reserve checklists',
      'Scholarship & financial aid interaction overview (FAFSA and need-based grant considerations)',
      'Dedicated cautions for multi-state competition/deals and F-1 international student-athletes',
    ],
    howDoIStart:
      'Read the curriculum breakdown on this page, share it with your parent or guardian, or join our updates list to get notified when cohorts open.',
    cost: 'Pricing announced at launch. Planned as an affordable micro-course accessible to individual students and families.',
    disclaimer:
      'Educational notice: NIL Money 101 provides general financial and tax education, not individualized tax, financial aid, immigration, or legal advice. Always consult a qualified CPA/tax professional, your campus financial aid office, or your designated school official (DSO) for personal decisions.',
    extraSections: [
      {
        title: 'What NIL Money 101 Covers in Detail',
        body: 'Six core lessons designed to prevent April tax surprises and eligibility headaches:',
        bullets: [
          'The $400 IRS Filing Trigger: Why earning $400 or more in net self-employment income (including cash and the fair market value of free products or services) generally requires filing a federal tax return and paying self-employment tax.',
          'NIL Go & the $600 Reporting Rule: How school, conference, and NIL Go reporting thresholds work once deals hit $600 or more, and why keeping dated deliverables and invoices protects your standing.',
          'Forms Season Explained: What a W-9 asks for before a brand pays you, what 1099-NEC and 1099-K forms mean in January, and how to track valid business receipts responsibly.',
          'Quarterly Estimated Taxes: How independent contractors pay federal and state taxes during the year (April, June, September, January) instead of facing underpayment penalties.',
          'Scholarships & Financial Aid: Why taxable NIL or creator income appears on future financial aid forms (FAFSA) and how families can plan ahead with their campus aid office.',
          'Multi-State & International Student-Athlete Cautions: Earning income in states other than your home or school state can create non-resident state filing rules; F-1 international students face strict federal work-authorization limits and must consult an immigration attorney and DSO before doing any active US NIL work.',
        ],
      },
    ],
  },
  {
    id: 'for-parents',
    slug: 'for-parents',
    path: '/learn/for-parents',
    door: 'learn',
    doorLabel: 'Learn',
    name: 'For Parents & Guardians',
    badge: 'PARENTS',
    parentEntry: true,
    status: 'In development',
    oneLine:
      'Clear answers for families on taxes, FTC rules, contracts, and student safety — no account required to read or get in touch.',
    image: executiveBoardroomImg,
    imageAlt: 'Families and educators reviewing student guidelines and financial safety plans',
    whatIsIt:
      'A dedicated starting point for parents and guardians evaluating how College Company programs work, what rules protect students, and how taxes, school aid, and disclosure obligations fit together.',
    whoIsItFor:
      'Parents and guardians of college students, club competitors, and prospective student creators looking for transparent safety and compliance standards.',
    whatDoIGet: [
      'Direct 1-click access to NIL Money 101 so families know the tax and FAFSA rules upfront',
      'Direct link to PlayerNIL.org for plain-language contract red-flag guides',
      'Confirmation of the Student-First Charter: students pay zero commission on brand deals',
      'Direct email access to founder Kevin Mitchell without creating any user account',
    ],
    howDoIStart:
      'Explore NIL Money 101 and PlayerNIL.org right from this page, subscribe to our newsletter below, or email kevin@collegeesportsx.com with any family question.',
    cost: 'Reading all parent and student Trust guides on this site is completely free and open without sign-in.',
  },
  {
    id: 'esports-education',
    slug: 'esports-education',
    path: '/learn/esports-education',
    door: 'learn',
    doorLabel: 'Learn',
    name: 'EsportsEducation.com',
    badge: 'EDU',
    domain: 'esportseducation.com',
    status: 'In development',
    oneLine:
      'Career pathways, event production, and team operations training using digital sports as a bridge into technology and media jobs.',
    image: mediaBroadcastImg,
    imageAlt: 'Student broadcast and production desk training setup',
    whatIsIt:
      'EsportsEducation.com focuses on the careers behind digital competition: tournament operations, live broadcast engineering, community management, sponsorship operations, and program leadership.',
    whoIsItFor:
      'College students, student club officers, and educators interested in turning gaming enthusiasm into transferable operations, production, and management skills.',
    whatDoIGet: [
      'Role guides covering broadcast production, tournament admin, marketing, and team management',
      'Foundational safety, sportsmanship, and inclusion standards for student organizations',
      'Practical project templates usable by campus clubs and media departments',
    ],
    howDoIStart:
      'Reach out through our Contact page for school workshops or join the newsletter for curriculum release dates.',
    cost: 'Pricing announced at launch.',
  },
  {
    id: 'college-creator-lab',
    slug: 'college-creator-lab',
    path: '/learn/college-creator-lab',
    door: 'learn',
    doorLabel: 'Learn',
    name: 'College Creator Lab',
    badge: 'LAB',
    domain: 'collegecreatorlab.com',
    status: 'Concept',
    oneLine:
      'Collaborative project workshops where students build real media reels, event broadcasts, and brand-safe creative portfolios together.',
    image: creatorStudioImg,
    imageAlt: 'Students reviewing video production footage in a campus creator lab',
    whatIsIt:
      'College Creator Lab is the applied workshop companion to College Creator Academy — structured team sprints where small groups of students shoot, edit, produce, and ship real creative projects.',
    whoIsItFor:
      'Students who learn best by building alongside peers: aspiring editors, designers, hosts, photographers, and student producers.',
    whatDoIGet: [
      'Guided project briefs simulating real studio, event, and brand deliverables',
      'Peer critique and structured portfolio pieces',
      'Integration with Compete events for live-event production practice',
    ],
    howDoIStart:
      'Join our updates list or reach out via For Institutions & Partners if your school wants to pilot a workshop.',
    cost: 'Pricing announced at launch.',
  },

  // =========================================================================
  // 2. COMPETE
  // =========================================================================
  {
    id: 'college-esports-expo',
    slug: 'college-esports-expo',
    path: '/compete/college-esports-expo',
    door: 'compete',
    doorLabel: 'Compete',
    name: 'College Esports Expo (CEX)',
    badge: 'CEX',
    domain: 'collegeesportsexpo.com',
    flagship: true,
    status: 'In development',
    oneLine:
      'Live competitions, student showcases, and career panels open to the general collegiate student body and campus clubs — not only varsity rosters.',
    image: heroArenaImg,
    imageAlt: 'Collegiate competition and showcase arena stage for College Esports Expo',
    whatIsIt:
      'College Esports Expo (CEX) brings together competitive tournaments, student production showcases, and workforce panels designed for everyday college students and campus clubs alongside competitive teams.',
    whoIsItFor:
      'General college students, campus clubs, aspiring shoutcasters and event organizers, and educators — no varsity letter required.',
    whatDoIGet: [
      'Open-entry club and student team competition brackets',
      'Student-run broadcast, hosting, and event production experience',
      'Workshops connecting digital competition skills to real creative and technical careers',
    ],
    howDoIStart:
      'Join our update list or email kevin@collegeesportsx.com if your campus club wants early schedule information.',
    cost: 'Pricing announced at launch.',
  },
  {
    id: 'college-drone-racing-league',
    slug: 'college-drone-racing-league',
    path: '/compete/college-drone-racing-league',
    door: 'compete',
    doorLabel: 'Compete',
    name: 'College Drone Racing League (CDRL)',
    badge: 'CDRL',
    domain: 'collegedroneracingleague.com',
    status: 'In development',
    oneLine:
      'Collegiate FPV drone racing and engineering team challenges built for general students, robotics clubs, and aviation hobbyists.',
    image: holdingDroneImg,
    imageAlt: 'Collegiate FPV drone racing course inside a campus event arena',
    whatIsIt:
      'College Drone Racing League (CDRL) is a structured collegiate competition format combining first-person-view (FPV) drone piloting with hands-on hardware tuning, safety protocols, and team engineering.',
    whoIsItFor:
      'General college students, aerospace and engineering clubs, drone hobbyists, and campus maker groups — open far beyond traditional athletics.',
    whatDoIGet: [
      'Standardized safety and competition rules for campus club events',
      'Hands-on hardware, telemetry, and flight-safety learning opportunities',
      'Collaborative team format welcoming pilots, mechanics, and race organizers',
    ],
    howDoIStart:
      'Contact us to share your campus club interest or subscribe for seasonal rulebooks and pilot dates.',
    cost: 'Pricing announced at launch.',
  },
  {
    id: 'college-racing-league',
    slug: 'college-racing-league',
    path: '/compete/college-racing-league',
    door: 'compete',
    doorLabel: 'Compete',
    name: 'College Racing League (CRL)',
    badge: 'CRL',
    domain: 'collegeracingleague.com',
    status: 'In development',
    oneLine:
      'Collegiate sim-motorsport racing league uniting student drivers, engineering clubs, and race engineers across campuses.',
    image: heroArenaImg,
    imageAlt: 'Collegiate sim-motorsports drivers competing in structured online and campus races',
    whatIsIt:
      'College Racing League (CRL) organizes structured sim-racing events where students compete as drivers, race strategists, and livery designers without the barrier of real-world track costs.',
    whoIsItFor:
      'Any college student interested in motorsport, sim racing, vehicle setup, or broadcast commentary.',
    whatDoIGet: [
      'Clean sportsmanship rulebooks and division structures for all skill levels',
      'Team roles for drivers, strategists, designers, and broadcasters',
      'Transparent compliance and conduct guidelines built into registration',
    ],
    howDoIStart:
      'Reach out through our Contact page or subscribe to updates to receive interest forms for upcoming seasons.',
    cost: 'Pricing announced at launch.',
  },
  {
    id: 'college-gta',
    slug: 'college-gta',
    path: '/compete/college-gta',
    door: 'compete',
    doorLabel: 'Compete',
    name: 'College GTA',
    badge: 'CGTA',
    status: 'In development',
    oneLine:
      'Structured team challenges, creator events, and campus decathlon play open to the general student body.',
    image: mediaBroadcastImg,
    imageAlt: 'Collegiate students participating in a structured team-based gaming challenge',
    whatIsIt:
      'College GTA reimagines popular open-world play into structured, moderated collegiate team challenges focused on coordination, creativity, and community building.',
    whoIsItFor:
      'Campus gaming clubs and everyday students looking for welcoming, organized team events outside varsity tryouts.',
    whatDoIGet: [
      'Moderated community rules prioritizing inclusive student participation',
      'Multi-skill team events mixing driving, strategy, and creative production',
      'Opportunities for student hosts and clip editors alongside competitors',
    ],
    howDoIStart:
      'Join the update list or reach out via Contact if your campus gaming club would like to participate.',
    cost: 'Pricing announced at launch.',
  },
  {
    id: 'agoniq',
    slug: 'agoniq',
    path: '/compete/agoniq',
    door: 'compete',
    doorLabel: 'Compete',
    name: 'AGONiQ',
    badge: 'AGONiQ',
    status: 'Concept',
    oneLine:
      'Team-building and skill-challenge competition concept designed to help general student cohorts collaborate and learn together.',
    image: creatorStudioImg,
    imageAlt: 'Students working together on strategy and team-building challenges',
    whatIsIt:
      'AGONiQ is a team-building and structured competitive concept pairing problem-solving, communication, and digital competition formats for broad campus groups.',
    whoIsItFor:
      'Student organizations, academic cohorts, and general-body competitors who enjoy strategy and team collaboration.',
    whatDoIGet: [
      'Cohort-friendly challenge formats that require minimal specialized equipment',
      'Focus on communication, teamwork, and transparent scoring',
    ],
    howDoIStart:
      'Register your interest through our Contact page or newsletter to be notified as concept pilots take shape.',
    cost: 'Pricing announced at launch.',
  },

  // =========================================================================
  // 3. EARN
  // =========================================================================
  {
    id: 'nil-brand-match',
    slug: 'nil-brand-match',
    path: '/earn/nil-brand-match',
    door: 'earn',
    doorLabel: 'Earn',
    name: 'NIL Brand Match / Placement Desk',
    badge: 'NBM',
    domain: 'nilbrandmatch.com',
    flagship: true,
    status: 'In development',
    oneLine:
      'Disclosed-fee brand placement desk where brands pay the platform fee and students and creators pay zero commission.',
    image: nilClearinghouseImg,
    imageAlt: 'Brand partnership placement and Student-First Charter workspace',
    whatIsIt:
      'NIL Brand Match is our Placement Desk for brand sponsorships and student-creator partnerships. Instead of taking a percentage cut out of a student’s paycheck, our Student-First Charter charges a clearly disclosed service fee to the brand — students and learners pay zero commission.',
    whoIsItFor:
      'Two groups: (1) vetted brands and local businesses seeking clear, compliant student creator campaigns, and (2) college students and student-athletes who want fair, transparent deliverables.',
    whatDoIGet: [
      'Student-First Charter: 0% commission taken from student or learner payouts',
      'Transparent, disclosed fee structure presented upfront to participating brands',
      'Standardized FTC disclosure, school-reporting, and tax literacy checklists from our Trust door',
      'Plain-language campaign briefs specifying deliverables, timelines, and usage rights upfront',
    ],
    howDoIStart:
      'Brands can submit a campaign inquiry directly on this page. Students can start in Learn (College Creator Academy & NIL Money 101) so your portfolio and compliance basics are ready.',
    cost: 'Free for students and learners (0% commission). Brands pay a clearly disclosed campaign placement fee quoted per brief.',
    extraSections: [
      {
        title: 'The Student-First Charter',
        body: 'Too many creator and NIL marketplaces bury 15%–25% cuts inside fine print or lock young creators into long-term agency exclusivities. We work differently:',
        bullets: [
          'Zero commission charged to students or learners — if a brand agrees to pay a student $500, the student receives $500.',
          'Brands pay a single, clearly disclosed platform placement fee agreed upon before any campaign launches.',
          'No perpetual likeness grabs or hidden auto-renewals in standardized Placement Desk briefs.',
          'Compliance education comes first: FTC disclosure rules and tax readiness are linked directly in every campaign checklist.',
        ],
      },
    ],
  },
  {
    id: 'college-nil-hub',
    slug: 'college-nil-hub',
    path: '/earn/college-nil-hub',
    door: 'earn',
    doorLabel: 'Earn',
    name: 'College NIL Hub',
    badge: 'CNH',
    domain: 'collegenilhub.com',
    status: 'In development',
    oneLine:
      'Central organizer connecting student portfolios, campaign checklists, and compliance resources under the Student-First Charter.',
    image: mediaBroadcastImg,
    imageAlt: 'Student campaign checklist and compliance resource desk',
    whatIsIt:
      'College NIL Hub brings together practical templates, campaign checklists, and earning guides so students and campus advisors can keep agreements, deliverables, and reporting reminders in one place.',
    whoIsItFor:
      'Student creators, student-athletes, and campus advisors looking for an organized home for earning documentation.',
    whatDoIGet: [
      'Deliverable and invoice checklists built to pair with NIL Money 101',
      'Direct integration with Trust compliance guides (FTC rules, disclosure templates)',
      'Zero commission to students under the Student-First Charter',
    ],
    howDoIStart:
      'Explore our Trust guides and NIL Money 101 today, or reach out via Contact for early access.',
    cost: 'Free educational hub access for students; institutional or brand tool pricing announced at launch.',
  },

  // =========================================================================
  // 4. TRUST
  // =========================================================================
  {
    id: 'nil-compliance-pro',
    slug: 'nil-compliance-pro',
    path: '/trust/nil-compliance-pro',
    door: 'trust',
    doorLabel: 'Trust',
    name: 'NIL Compliance Pro',
    badge: 'NCP',
    domain: 'nilcompliancepro.com',
    status: 'In development',
    oneLine:
      'Plain-English NIL reporting, FTC paid-partnership disclosure rules, and pre-campaign checks built directly into every program.',
    image: executiveBoardroomImg,
    imageAlt: 'Compliance and disclosure guidelines for student-athletes and brand sponsors',
    whatIsIt:
      'NIL Compliance Pro is our practical rules-and-disclosure framework. Rather than treating compliance as an afterthought or legal hurdle, we weave NIL reporting thresholds, FTC endorsement rules, and recordkeeping into every learning and earning step.',
    whoIsItFor:
      'Students, parents, campus administrators, and brands who want straightforward, verifiable compliance hygiene before launching campaigns.',
    whatDoIGet: [
      'FTC disclosure checklists (clear #ad / Paid Partnership placement across video, audio, and captions)',
      'NIL reporting timelines and fair market value documentation guides',
      'Campus-conflict and restricted-category screening questions for brand campaigns',
    ],
    howDoIStart:
      'Read the Trust guidelines here and pair them with NIL Money 101 and PlayerNIL.org. Reach out to kevin@collegeesportsx.com with institution-specific questions.',
    cost: 'Public guides are open without login; platform workflow pricing announced at launch.',
    disclaimer:
      'Educational and operational workflow support only — not legal representation. Students should confirm school-specific policies with their campus compliance office.',
  },
  {
    id: 'player-nil',
    slug: 'player-nil',
    path: '/trust/player-nil',
    door: 'trust',
    doorLabel: 'Trust',
    name: 'PlayerNIL.org',
    badge: 'PNIL',
    domain: 'playernil.org',
    flagship: true,
    status: 'In development',
    oneLine:
      'Student and family protection education covering contract red flags, fair rights, and tax literacy without legal jargon.',
    image: creatorStudioImg,
    imageAlt: 'Student athlete and family education resource PlayerNIL.org',
    whatIsIt:
      'PlayerNIL.org is our student- and family-facing protection initiative focused on plain-language education. It helps young athletes and creators read agreements carefully, avoid predatory exclusivity traps, and ask the right questions before signing.',
    whoIsItFor:
      'Students, parents, guardians, coaches, and high-school families preparing for collegiate opportunities.',
    whatDoIGet: [
      'Contract Red-Flag Checklist: perpetual likeness clauses, broad non-competes, and hidden agent fees',
      'Family discussion guides written for parents and first-year college students',
      'Direct connection to NIL Money 101 tax education and the Student-First Charter',
    ],
    howDoIStart:
      'All public guides are free to read with zero sign-up required. Share directly with your student or contact kevin@collegeesportsx.com.',
    cost: 'Free public educational resource for students and families.',
    disclaimer:
      'Educational information only, not legal advice. For binding contract review, consult a licensed attorney in your state.',
  },
];

export const getProgramsByDoor = (door: DoorKey): ProgramItem[] =>
  PROGRAMS.filter((p) => p.door === door);

export const findProgramByPath = (pathname: string): ProgramItem | undefined => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return PROGRAMS.find((p) => p.path === clean);
};
