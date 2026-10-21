/**
 * Institutional Access Tier Management & Membership Approval System
 * Defines security boundaries, approval pipelines, permissions, and tool catalogs
 */

export type AccessTier = 0 | 1 | 2 | 3;

export type MembershipStatus = 'unregistered' | 'pending' | 'approved';

export interface AccessProfile {
  tier: AccessTier;
  roleTitle: string;
  roleCategory: 'public' | 'campus_partner' | 'athletic_director' | 'accredited_investor';
  displayName: string;
  organization: string;
  email: string;
  verified: boolean;
  avatarColor: string;
  clearanceCode: string;
  membershipStatus?: MembershipStatus;
  appliedDate?: string;
  approvedDate?: string;
  requestedTier?: AccessTier;
  verificationNotes?: string;
}

export const TIER_DEFINITIONS = [
  {
    tier: 0 as AccessTier,
    name: 'Public Visitor',
    badge: 'Open Access',
    subtitle: 'Public Overview & Consumer Digest',
    description: 'High-level holding company overview, 4 core operational pillars, public dispatches, and syndicated news wire.',
    color: '#94A3B8',
    allowedTabs: ['overview', 'editorial'],
    requiresAuth: false
  },
  {
    tier: 1 as AccessTier,
    name: 'Verified Campus & Brand Partner',
    badge: 'Tier 1 Clearance',
    subtitle: 'Network Member & Asset Access',
    description: 'Complete 43-brand portfolio directory, ecosystem topology, 400+ national campus impact map, and verified peer messaging.',
    color: '#38BDF8',
    allowedTabs: ['overview', 'holdings', 'strategy', 'editorial'],
    requiresAuth: true
  },
  {
    tier: 2 as AccessTier,
    name: 'Athletic Directorate & Legal Counsel',
    badge: 'Tier 2 Clearance',
    subtitle: 'Institutional Governance & Regulatory Repository',
    description: 'House v. NCAA antitrust compliance charters, Title IX gender equity standards, state-by-state NIL escrow bylaws, and risk factor matrices.',
    color: '#E8C98B',
    allowedTabs: ['overview', 'holdings', 'strategy', 'governance', 'editorial'],
    requiresAuth: true
  },
  {
    tier: 3 as AccessTier,
    name: 'Accredited Investor & Board Executive',
    badge: 'Tier 3 Clearance',
    subtitle: 'Confidential Fiduciary Data Room & AI Engine',
    description: 'Full financial models, DCF valuations, TAM scenario simulator, cap table disclosures, multi-agent AI fiduciary orchestrator, and PDF/CSV data room export.',
    color: '#68D391',
    allowedTabs: ['overview', 'holdings', 'strategy', 'governance', 'financials', 'editorial', 'orchestrator'],
    requiresAuth: true
  }
];

export interface MembershipTool {
  id: string;
  name: string;
  shortName: string;
  category: 'NIL & Athletics' | 'Compliance & Governance' | 'Portfolio & Network' | 'Financial & Board' | 'AI Intelligence';
  requiredTier: AccessTier;
  targetTab: 'overview' | 'holdings' | 'strategy' | 'financials' | 'governance' | 'editorial' | 'orchestrator';
  targetSubTab?: string;
  actionModal?: 'orchestrator' | 'nil-calculator' | 'nil-radar' | 'compliance-portal' | 'financial-report' | 'network';
  description: string;
  badge: string;
  highlights: string[];
}

export const MEMBERSHIP_TOOLS_CATALOG: MembershipTool[] = [
  {
    id: 'student-nil-calc',
    name: 'Student-Athlete NIL Valuation & Escrow Calculator',
    shortName: 'NIL Calculator',
    category: 'NIL & Athletics',
    requiredTier: 1,
    targetTab: 'strategy',
    targetSubTab: 'nil',
    actionModal: 'nil-calculator',
    description: 'Live interactive compensation simulator computing fair market value, NCAA statutory disclosures, and Title IX distribution parity.',
    badge: 'Tier 1 Clearance',
    highlights: [
      'Conference & Division market rate benchmarks',
      '100% pre-funded statutory brand escrow calculator',
      'Real-time automated state disclosure reports'
    ]
  },
  {
    id: 'holding-directory-map',
    name: '43-Brand Portfolio Directory & Interactive Campus Map',
    shortName: '43-Brand Directory & Map',
    category: 'Portfolio & Network',
    requiredTier: 1,
    targetTab: 'holdings',
    targetSubTab: 'directory',
    description: 'Searchable database of all 43 active holdings, ecosystem topology graphs, and geospatial footprint across 400+ national universities.',
    badge: 'Tier 1 Clearance',
    highlights: [
      'Filterable by 4 institutional clusters & division',
      'Interactive 3D topological connection graphs',
      'Campus stadium venue blueprints and specs'
    ]
  },
  {
    id: 'member-peer-network',
    name: 'Verified Athletic Director & Executive Directory',
    shortName: 'Peer Network & Messaging',
    category: 'Portfolio & Network',
    requiredTier: 1,
    targetTab: 'holdings',
    actionModal: 'network',
    description: 'Direct confidential messaging channel between university athletic directors, conference executives, and sanctioned partner brands.',
    badge: 'Tier 1 Clearance',
    highlights: [
      'Verified academic .edu credential directory',
      'Real-time bilateral institutional messaging',
      'Collegiate esports conference roundtables'
    ]
  },
  {
    id: 'nil-opportunity-radar',
    name: 'Real-Time NIL Opportunity Radar & Market Signals',
    shortName: 'NIL Opportunity Radar',
    category: 'NIL & Athletics',
    requiredTier: 1,
    targetTab: 'strategy',
    actionModal: 'nil-radar',
    description: 'Live broadcast feed tracking collegiate brand activation budgets, open RFP opportunities, and trending campus sponsorship segments.',
    badge: 'Tier 1 Clearance',
    highlights: [
      'Live sponsor bid tracking ($25k-$250k contracts)',
      'Immediate push notification alerts on matching criteria',
      'Escrow pre-funded verification seals'
    ]
  },
  {
    id: 'regulatory-audit-table',
    name: 'House v. NCAA & Title IX Compliance Audit Engine',
    shortName: 'Regulatory Audit Engine',
    category: 'Compliance & Governance',
    requiredTier: 2,
    targetTab: 'governance',
    targetSubTab: 'compliance-dashboard',
    description: 'Automated legal repository with statutory filings, federal antitrust defense briefs, and state-by-state NIL collective compliance charts.',
    badge: 'Tier 2 Clearance',
    highlights: [
      'Federal court injunction legal briefs & analysis',
      '50-State NIL legislative compliance matrix',
      'Automated university quarterly audit filings'
    ]
  },
  {
    id: 'dcf-financial-modeler',
    name: 'Institutional DCF Scenario Modeler & TAM Simulator',
    shortName: 'Financial Modeler & Data Room',
    category: 'Financial & Board',
    requiredTier: 3,
    targetTab: 'financials',
    actionModal: 'financial-report',
    description: 'Interactive financial workbench projecting EBITDA multiples, TAM penetration scenarios, and downloadable fiduciary data room reports.',
    badge: 'Tier 3 Clearance',
    highlights: [
      'Interactive Conservative / Baseline / Aggressive scenarios',
      'Dynamic WACC discount rate sensitivity curves',
      'Fiduciary PDF & CSV data room export engine'
    ]
  },
  {
    id: 'ai-orchestrator',
    name: 'Multi-Agent AI Fiduciary & Governance Orchestrator',
    shortName: 'AI Fiduciary Orchestrator',
    category: 'AI Intelligence',
    requiredTier: 3,
    targetTab: 'orchestrator',
    actionModal: 'orchestrator',
    description: 'Specialized 4-subagent AI engine synthesizing NCAA compliance, institutional valuation, corporate sponsorship, and facility expansion.',
    badge: 'Tier 3 Clearance',
    highlights: [
      '4 tailored roles: Athletic Director, Legal, Financial, Partner',
      'Multi-turn cross-holding portfolio synthesis',
      'Audited executive response citations'
    ]
  }
];

export const DEMO_PRESET_PROFILES: Record<AccessTier, AccessProfile> = {
  0: {
    tier: 0,
    roleTitle: 'Public Visitor',
    roleCategory: 'public',
    displayName: 'Public Guest',
    organization: 'Prospective Partner',
    email: 'visitor@collegiate-guest.org',
    verified: false,
    avatarColor: 'from-neutral-600 to-neutral-700',
    clearanceCode: 'PUB-GUEST',
    membershipStatus: 'unregistered'
  },
  1: {
    tier: 1,
    roleTitle: 'Executive Director of Digital Athletics',
    roleCategory: 'campus_partner',
    displayName: 'Derrick Chen',
    organization: 'University of Texas at Austin',
    email: 'dchen@austin.utexas.edu',
    verified: true,
    avatarColor: 'from-amber-600 to-orange-500',
    clearanceCode: 'PARTNER-T1-SEC',
    membershipStatus: 'approved',
    approvedDate: 'Verified 2026'
  },
  2: {
    tier: 2,
    roleTitle: 'Associate Athletic Director & Compliance Chair',
    roleCategory: 'athletic_director',
    displayName: 'Dr. Elena Rostova',
    organization: 'The Ohio State University Athletic Dept',
    email: 'rostova.84@osu.edu',
    verified: true,
    avatarColor: 'from-rose-600 to-red-500',
    clearanceCode: 'GOV-T2-ADIR',
    membershipStatus: 'approved',
    approvedDate: 'Verified 2026'
  },
  3: {
    tier: 3,
    roleTitle: 'Managing Partner & Fiduciary Lead',
    roleCategory: 'accredited_investor',
    displayName: 'Kevin Mitchell',
    organization: 'College Company Holding Group & Syndicate',
    email: 'kevin@collegeesportsx.com',
    verified: true,
    avatarColor: 'from-emerald-600 to-teal-500',
    clearanceCode: 'EXEC-T3-UNRESTRICTED',
    membershipStatus: 'approved',
    approvedDate: 'Verified 2026'
  }
};

export const PENDING_DEMO_PROFILE: AccessProfile = {
  tier: 0,
  roleTitle: 'Applicant (Under Review)',
  roleCategory: 'athletic_director',
  displayName: 'Marcus Sterling',
  organization: 'Penn State University Athletics',
  email: 'msterling@athletics.psu.edu',
  verified: false,
  membershipStatus: 'pending',
  avatarColor: 'from-amber-500 to-yellow-600',
  clearanceCode: 'APP-PENDING-9412',
  appliedDate: 'Today',
  requestedTier: 2,
  verificationNotes: 'Institutional .edu domain verified. Pending directorate committee clearance.'
};

const STORAGE_KEY_TIER = 'cc_user_access_tier';
const STORAGE_KEY_PROFILE = 'cc_user_access_profile';
const STORAGE_KEY_MODE = 'cc_navigation_mode'; // 'consumer' | 'portal'

export function getSavedTier(): AccessTier {
  try {
    const val = localStorage.getItem(STORAGE_KEY_TIER);
    if (val !== null) {
      const parsed = parseInt(val, 10);
      if (parsed >= 0 && parsed <= 3) return parsed as AccessTier;
    }
  } catch {
    // fallback
  }
  return 0; // Default to Public Visitor
}

export function saveTier(tier: AccessTier): void {
  try {
    localStorage.setItem(STORAGE_KEY_TIER, String(tier));
  } catch (err) {
    console.warn('Could not save tier to localStorage', err);
  }
}

export function getSavedProfile(): AccessProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  const defaultTier = getSavedTier();
  return DEMO_PRESET_PROFILES[defaultTier];
}

export function saveProfile(profile: AccessProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    saveTier(profile.tier);
  } catch (err) {
    console.warn('Could not save profile to localStorage', err);
  }
}

export function getSavedMode(): 'consumer' | 'portal' {
  try {
    const val = localStorage.getItem(STORAGE_KEY_MODE);
    if (val === 'portal' || val === 'consumer') return val;
  } catch {
    // fallback
  }
  return 'consumer'; // Default to clean, simplified consumer view
}

export function saveMode(mode: 'consumer' | 'portal'): void {
  try {
    localStorage.setItem(STORAGE_KEY_MODE, mode);
  } catch (err) {
    console.warn('Could not save mode to localStorage', err);
  }
}

/**
 * Check if the active tier has permission for a target tab
 */
export function isTabPermitted(tab: string, tier: AccessTier, status?: MembershipStatus): boolean {
  if (tab === 'overview' || tab === 'editorial') {
    return true; // accessible by all
  }
  // Gated tools and tabs require approved status and sufficient tier
  if (status === 'pending' || status === 'unregistered') {
    return false;
  }
  switch (tab) {
    case 'holdings':
    case 'strategy':
      return tier >= 1;
    case 'governance':
      return tier >= 2;
    case 'financials':
    case 'orchestrator':
      return tier >= 3;
    default:
      return true;
  }
}

/**
 * Returns minimum required tier for a given tab
 */
export function getRequiredTierForTab(tab: string): { tier: AccessTier; label: string } {
  switch (tab) {
    case 'holdings':
    case 'strategy':
      return { tier: 1, label: 'Tier 1 (Verified Campus & Brand Partner)' };
    case 'governance':
      return { tier: 2, label: 'Tier 2 (Athletic Directorate & Legal)' };
    case 'financials':
    case 'orchestrator':
      return { tier: 3, label: 'Tier 3 (Accredited Investor & Executive)' };
    default:
      return { tier: 0, label: 'Public Access' };
  }
}
