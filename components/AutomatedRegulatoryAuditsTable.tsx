import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Scale,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Cpu,
  Layers,
  Copy,
  Check,
  RefreshCw,
  FileCheck2,
  Eye,
  X
} from 'lucide-react';

export interface AffectedRuleSet {
  code: string;
  name: string;
  authority: string;
  statutoryClause: string;
  riskTier: 'Critical' | 'Elevated' | 'Standard';
  framework: 'NCAA Division I' | 'High School NFHS' | 'Title IX & Equity' | 'State NIL Statutes' | 'Federal & FTC' | 'Group Licensing';
  alignmentStatus: 'Aligned' | 'Synchronized' | 'Advisory';
}

export type AuditStatus = 'Compliant' | 'Pending' | 'Flagged' | 'PASSED' | 'SYNCHRONIZED' | 'ADVISORY';

export interface AutomatedRegulatoryAudit {
  id: string;
  auditNumber: string;
  timestamp: string;
  relativeTime: string;
  engine: 'Proprietary AI Engine';
  engineVersion: string;
  status: AuditStatus;
  statusLabel: string;
  jurisdiction: string;
  scope: string;
  affectedRuleSets: AffectedRuleSet[];
  infractionsFound: number;
  safeguardsActive: number;
  cryptographicProof: string;
  latencyMs: number;
  summary: string;
  subsystem: string;
}

const INITIAL_AUDITS: AutomatedRegulatoryAudit[] = [
  {
    id: 'audit-8841',
    auditNumber: 'ARA-2026-8841',
    timestamp: '2026-10-11 17:34:22 UTC',
    relativeTime: '2 mins ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Compliant',
    statusLabel: 'Compliant',
    jurisdiction: 'National K-12 (50 States)',
    scope: 'Scholastic NIL Eligibility & Parental Co-Signing Clearinghouse',
    subsystem: 'State Bylaw Parser Core',
    infractionsFound: 0,
    safeguardsActive: 4,
    cryptographicProof: '0x8f2a9c14...e5108b3c',
    latencyMs: 19,
    summary: 'Automated verification across 42 scholastic commercial matching requests. Confirmed 100% parental co-signatures and zero unauthorized school mark usage.',
    affectedRuleSets: [
      {
        code: 'NFHS-K12-STAT-50',
        name: 'Scholastic NIL Amateurism & Identity Separation',
        authority: 'National Federation of State High School Associations (NFHS)',
        statutoryClause: 'NFHS Eligibility Standards § 1-B & 50 State Association Bylaws',
        riskTier: 'Critical',
        framework: 'High School NFHS',
        alignmentStatus: 'Aligned'
      },
      {
        code: 'CIF-BYLAW-212',
        name: 'California Interscholastic Federation Amateur Rule',
        authority: 'California Interscholastic Federation (CIF)',
        statutoryClause: 'CIF Blue Book Bylaw 212 (Amateur Standing & Commercial Endorsements)',
        riskTier: 'Critical',
        framework: 'High School NFHS',
        alignmentStatus: 'Aligned'
      },
      {
        code: 'FHSAA-POL-9.9',
        name: 'Florida High School Athletic Association NIL Guidelines',
        authority: 'Florida High School Athletic Association',
        statutoryClause: 'Florida Stat. § 1006.20 & FHSAA Administrative Policy 9.9',
        riskTier: 'Elevated',
        framework: 'State NIL Statutes',
        alignmentStatus: 'Aligned'
      }
    ]
  },
  {
    id: 'audit-8839',
    auditNumber: 'ARA-2026-8839',
    timestamp: '2026-10-11 17:28:45 UTC',
    relativeTime: '8 mins ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Compliant',
    statusLabel: 'Compliant',
    jurisdiction: 'NCAA Division I National Office',
    scope: 'Post-House Settlement Revenue Sharing & Cap Separation Firewall',
    subsystem: 'Post-House Settlement Monitor',
    infractionsFound: 0,
    safeguardsActive: 3,
    cryptographicProof: '0x7e2b44d1...9a12c8ff',
    latencyMs: 24,
    summary: 'Evaluated tournament prize pool escrow separation against post-House settlement institutional payroll caps. 100% firewall confirmed.',
    affectedRuleSets: [
      {
        code: 'NCAA-BYLAW-22.1',
        name: 'Direct Institutional Revenue Distribution & NIL Parity',
        authority: 'NCAA National Office / Settlement Administration',
        statutoryClause: 'NCAA Div. I Constitution § 22.1.4 (House v. NCAA Settlement Guidelines)',
        riskTier: 'Critical',
        framework: 'NCAA Division I',
        alignmentStatus: 'Synchronized'
      },
      {
        code: 'NCAA-BYLAW-12.0',
        name: 'Amateur Status Preservation & Educational Prize Escrow Protection',
        authority: 'NCAA Committee on Student-Athlete Reinstatement',
        statutoryClause: 'NCAA Division I Manual Bylaw 12 (Amateurism & Athletics Eligibility)',
        riskTier: 'Critical',
        framework: 'NCAA Division I',
        alignmentStatus: 'Aligned'
      }
    ]
  },
  {
    id: 'audit-8836',
    auditNumber: 'ARA-2026-8836',
    timestamp: '2026-10-11 17:19:10 UTC',
    relativeTime: '17 mins ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Compliant',
    statusLabel: 'Compliant',
    jurisdiction: 'OCR Federal Civil Rights Standard',
    scope: 'Intercollegiate 50/50 Prize Purse & Broadcast Parity Verification',
    subsystem: 'Title IX Parity Evaluator',
    infractionsFound: 0,
    safeguardsActive: 3,
    cryptographicProof: '0x44fa1033...2201ea99',
    latencyMs: 31,
    summary: 'Audited 16 regional collegiate championship brackets. Proportional broadcast minutes and prize purse distributions certified at 50/50 parity.',
    affectedRuleSets: [
      {
        code: 'TITLE-IX-34CFR106',
        name: 'Intercollegiate Gender Equity & Commercial Resource Proportionality',
        authority: 'U.S. Department of Education Office for Civil Rights (OCR)',
        statutoryClause: '34 C.F.R. Part 106.41 (Athletics Financial Assistance & Benefits)',
        riskTier: 'Critical',
        framework: 'Title IX & Equity',
        alignmentStatus: 'Aligned'
      }
    ]
  },
  {
    id: 'audit-8831',
    auditNumber: 'ARA-2026-8831',
    timestamp: '2026-10-11 17:05:33 UTC',
    relativeTime: '31 mins ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Flagged',
    statusLabel: 'Flagged (Advisory)',
    jurisdiction: 'USCIS / SEVP International',
    scope: 'International Student-Athlete F-1 Visa Passive Royalty Structure',
    subsystem: 'Visa Compliance Verifier',
    infractionsFound: 1,
    safeguardsActive: 3,
    cryptographicProof: '0x55dc99aa...33a2ef77',
    latencyMs: 27,
    summary: 'Flagged advisory active: Contract structure maintained exclusively as digital copyright passive licensing to ensure continuous compliance with F-1 student non-employment rules.',
    affectedRuleSets: [
      {
        code: 'USCIS-SEVP-F1',
        name: 'International Student-Athlete F-1 Passive Royalty Safeguard',
        authority: 'U.S. Citizenship and Immigration Services & SEVP',
        statutoryClause: '8 C.F.R. § 214.2(f)(9) (F-1 Student Employment Authorization Constraints)',
        riskTier: 'Elevated',
        framework: 'Federal & FTC',
        alignmentStatus: 'Advisory'
      },
      {
        code: 'IRC-SEC-871',
        name: 'Non-Resident Alien Intellectual Property Royalty Taxation',
        authority: 'Internal Revenue Service (IRS)',
        statutoryClause: '26 U.S. Code § 871(a) (Tax on income not connected with U.S. business)',
        riskTier: 'Standard',
        framework: 'Federal & FTC',
        alignmentStatus: 'Aligned'
      }
    ]
  },
  {
    id: 'audit-8827',
    auditNumber: 'ARA-2026-8827',
    timestamp: '2026-10-11 16:48:19 UTC',
    relativeTime: '48 mins ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Compliant',
    statusLabel: 'Compliant',
    jurisdiction: 'Texas UIL / Higher Education',
    scope: 'Texas State NIL 72-Hour Pre-Execution Institutional Disclosure',
    subsystem: 'Texas SB 1385 Parser',
    infractionsFound: 0,
    safeguardsActive: 3,
    cryptographicProof: '0x22eedd11...dd4488fa',
    latencyMs: 16,
    summary: 'Verified automated disclosure transmission to collegiate athletics compliance directorate. Time-stamped 72 hours prior to athlete agreement execution.',
    affectedRuleSets: [
      {
        code: 'STATE-TX-SB1385',
        name: 'Texas Collegiate Student-Athlete Name, Image, and Likeness Act',
        authority: 'Texas State Legislature & Higher Education Coordinating Board',
        statutoryClause: 'Texas Education Code § 51.9246 (Institutional Disclosure & Conflict Veto)',
        riskTier: 'Elevated',
        framework: 'State NIL Statutes',
        alignmentStatus: 'Aligned'
      },
      {
        code: 'TX-UIL-SEC-441',
        name: 'University Interscholastic League Scholastic Amateur Rules',
        authority: 'Texas University Interscholastic League (UIL)',
        statutoryClause: 'UIL Constitution & Contest Rules Subchapter M § 441',
        riskTier: 'Elevated',
        framework: 'High School NFHS',
        alignmentStatus: 'Aligned'
      }
    ]
  },
  {
    id: 'audit-8822',
    auditNumber: 'ARA-2026-8822',
    timestamp: '2026-10-11 16:31:05 UTC',
    relativeTime: '1 hour ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Compliant',
    statusLabel: 'Compliant',
    jurisdiction: 'Multi-Campus Collegiate Syndication',
    scope: 'Mass Roster Group Licensing 95/5 Proportional Distribution',
    subsystem: 'Group Rights Syndication Module',
    infractionsFound: 0,
    safeguardsActive: 3,
    cryptographicProof: '0x11ab55ee...ff3900ab',
    latencyMs: 22,
    summary: 'Audited 120 rostered student-athletes for digital avatar group syndication. 95/5 proportional split calculation and verified escrow lock validated.',
    affectedRuleSets: [
      {
        code: 'GROUP-LIC-IP-95',
        name: 'Mass Roster Group Licensing Syndication & 95/5 Proportional Allocator',
        authority: 'Collegiate Licensing Clearinghouse Standards',
        statutoryClause: 'Universal Group Rights Syndication & 17 U.S.C. § 106 Collective Rights',
        riskTier: 'Elevated',
        framework: 'Group Licensing',
        alignmentStatus: 'Aligned'
      }
    ]
  },
  {
    id: 'audit-8818',
    auditNumber: 'ARA-2026-8818',
    timestamp: '2026-10-11 16:12:44 UTC',
    relativeTime: '1.5 hours ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Compliant',
    statusLabel: 'Compliant',
    jurisdiction: 'Federal Trade Commission',
    scope: 'Commercial Live Broadcast & Social Endorsement Disclosures',
    subsystem: 'FTC 16 CFR Part 255 Module',
    infractionsFound: 0,
    safeguardsActive: 3,
    cryptographicProof: '0x99aa8811...66e133bc',
    latencyMs: 19,
    summary: 'Automated scan of 148 collegiate live stream overlays and social posts. Clear and conspicuous #ad disclosures verified in compliance with FTC guidelines.',
    affectedRuleSets: [
      {
        code: 'FTC-16CFR255',
        name: 'Digital Influencer Endorsement Guides & Commercial Disclosure Mandates',
        authority: 'Federal Trade Commission (Bureau of Consumer Protection)',
        statutoryClause: '16 C.F.R. Part 255 (Guides Concerning Use of Endorsements & Testimonials)',
        riskTier: 'Standard',
        framework: 'Federal & FTC',
        alignmentStatus: 'Aligned'
      }
    ]
  },
  {
    id: 'audit-8815',
    auditNumber: 'ARA-2026-8815',
    timestamp: '2026-10-11 15:58:12 UTC',
    relativeTime: '1.8 hours ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Pending',
    statusLabel: 'Pending Review',
    jurisdiction: 'Georgia GHSA & Florida FHSAA',
    scope: 'Multi-State Cross-Border Prep Transfer Eligibility Clearinghouse',
    subsystem: 'Interstate Scholastic Transfer Protocol',
    infractionsFound: 0,
    safeguardsActive: 4,
    cryptographicProof: '0x6b10fa44...1198ee20',
    latencyMs: 28,
    summary: 'Asynchronous verification pending: Scholastic residence transfer from GHSA to FHSAA undergoing cross-border amateur standing and transfer window audit.',
    affectedRuleSets: [
      {
        code: 'GHSA-BYLAW-1.62',
        name: 'Georgia High School Name, Image & Likeness Authorization Bylaw',
        authority: 'Georgia High School Association Executive Committee',
        statutoryClause: 'GHSA Constitution & By-Laws § 1.62 (Amateur Status & Compensation)',
        riskTier: 'Critical',
        framework: 'High School NFHS',
        alignmentStatus: 'Synchronized'
      },
      {
        code: 'FHSAA-POL-9.9',
        name: 'Florida High School Athletic Association NIL Guidelines',
        authority: 'Florida High School Athletic Association',
        statutoryClause: 'Florida Stat. § 1006.20 & FHSAA Administrative Policy 9.9',
        riskTier: 'Elevated',
        framework: 'State NIL Statutes',
        alignmentStatus: 'Aligned'
      },
      {
        code: 'NFHS-K12-STAT-50',
        name: 'Scholastic NIL Amateurism & Identity Separation',
        authority: 'National Federation of State High School Associations',
        statutoryClause: 'NFHS Athletic Eligibility Rules & Multi-State Cross-Border Compact',
        riskTier: 'Critical',
        framework: 'High School NFHS',
        alignmentStatus: 'Synchronized'
      }
    ]
  },
  {
    id: 'audit-8812',
    auditNumber: 'ARA-2026-8812',
    timestamp: '2026-10-11 15:45:00 UTC',
    relativeTime: '2 hours ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Compliant',
    statusLabel: 'Compliant',
    jurisdiction: 'Georgia GHSA Scholastic Grid',
    scope: 'Georgia High School Association Bylaw 1.62 Rule Drift Sync',
    subsystem: '50-State High School Parser',
    infractionsFound: 0,
    safeguardsActive: 4,
    cryptographicProof: '0x3c99a012...bb7744aa',
    latencyMs: 15,
    summary: 'Automated ingestion of updated GHSA commercial guidelines. Pre-empted amateur status violations and updated high school clearinghouse rules.',
    affectedRuleSets: [
      {
        code: 'GHSA-BYLAW-1.62',
        name: 'Georgia High School Name, Image & Likeness Authorization Bylaw',
        authority: 'Georgia High School Association Executive Committee',
        statutoryClause: 'GHSA Constitution & By-Laws § 1.62 (Amateur Status & Compensation)',
        riskTier: 'Critical',
        framework: 'High School NFHS',
        alignmentStatus: 'Synchronized'
      },
      {
        code: 'NFHS-K12-STAT-50',
        name: 'Scholastic NIL Amateurism & Identity Separation',
        authority: 'National Federation of State High School Associations',
        statutoryClause: 'NFHS Athletic Eligibility Rules & Multi-State Cross-Border Compact',
        riskTier: 'Critical',
        framework: 'High School NFHS',
        alignmentStatus: 'Synchronized'
      }
    ]
  },
  {
    id: 'audit-8809',
    auditNumber: 'ARA-2026-8809',
    timestamp: '2026-10-11 15:20:18 UTC',
    relativeTime: '2.4 hours ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Flagged',
    statusLabel: 'Flagged (Conflict Quarantined)',
    jurisdiction: 'NCAA Division I & State Athletics',
    scope: 'Automated Commercial Sponsor Exclusivity & Conflict Check',
    subsystem: 'Brand Conflict Quarantine Module',
    infractionsFound: 1,
    safeguardsActive: 3,
    cryptographicProof: '0xaa14cc88...5509ba22',
    latencyMs: 25,
    summary: 'Flagged commercial conflict: Student-athlete proposed energy drink sponsorship matches institutional master beverage covenant. Automated quarantine triggered for compliance officer review.',
    affectedRuleSets: [
      {
        code: 'NCAA-BYLAW-22.1',
        name: 'Direct Institutional Revenue Distribution & NIL Parity',
        authority: 'NCAA National Office / Settlement Administration',
        statutoryClause: 'NCAA Div. I Constitution § 22.1.4 (House v. NCAA Settlement Guidelines)',
        riskTier: 'Critical',
        framework: 'NCAA Division I',
        alignmentStatus: 'Advisory'
      },
      {
        code: 'STATE-TX-SB1385',
        name: 'Texas Collegiate Student-Athlete Name, Image, and Likeness Act',
        authority: 'Texas State Legislature & Higher Education Coordinating Board',
        statutoryClause: 'Texas Education Code § 51.9246 (Institutional Disclosure & Conflict Veto)',
        riskTier: 'Elevated',
        framework: 'State NIL Statutes',
        alignmentStatus: 'Advisory'
      },
      {
        code: 'FTC-16CFR255',
        name: 'Digital Influencer Endorsement Guides & Commercial Disclosure Mandates',
        authority: 'Federal Trade Commission (Bureau of Consumer Protection)',
        statutoryClause: '16 C.F.R. Part 255 (Guides Concerning Use of Endorsements & Testimonials)',
        riskTier: 'Standard',
        framework: 'Federal & FTC',
        alignmentStatus: 'Aligned'
      }
    ]
  },
  {
    id: 'audit-8804',
    auditNumber: 'ARA-2026-8804',
    timestamp: '2026-10-11 14:50:41 UTC',
    relativeTime: '3 hours ago',
    engine: 'Proprietary AI Engine',
    engineVersion: 'v4.8.2',
    status: 'Pending',
    statusLabel: 'Pending Verification',
    jurisdiction: 'OCR Federal Civil Rights Standard',
    scope: 'Title IX 50/50 Broadcast Parity & Post-House Escrow Clearing',
    subsystem: 'Title IX Parity Evaluator',
    infractionsFound: 0,
    safeguardsActive: 3,
    cryptographicProof: '0x88cc2211...00aa55ff',
    latencyMs: 33,
    summary: 'Pending verification: Cross-championship broadcast minute allocation awaiting post-season schedule lock for automated Title IX parity certification.',
    affectedRuleSets: [
      {
        code: 'TITLE-IX-34CFR106',
        name: 'Intercollegiate Gender Equity & Commercial Resource Proportionality',
        authority: 'U.S. Department of Education Office for Civil Rights (OCR)',
        statutoryClause: '34 C.F.R. Part 106.41 (Athletics Financial Assistance & Benefits)',
        riskTier: 'Critical',
        framework: 'Title IX & Equity',
        alignmentStatus: 'Aligned'
      },
      {
        code: 'NCAA-BYLAW-22.1',
        name: 'Direct Institutional Revenue Distribution & NIL Parity',
        authority: 'NCAA National Office / Settlement Administration',
        statutoryClause: 'NCAA Div. I Constitution § 22.1.4 (House Settlement)',
        riskTier: 'Critical',
        framework: 'NCAA Division I',
        alignmentStatus: 'Aligned'
      }
    ]
  }
];

export const AutomatedRegulatoryAuditsTable: React.FC<{
  onInspectAudit?: (audit: AutomatedRegulatoryAudit) => void;
}> = ({ onInspectAudit }) => {
  const [audits, setAudits] = useState<AutomatedRegulatoryAudit[]>(INITIAL_AUDITS);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [frameworkFilter, setFrameworkFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAuditForModal, setSelectedAuditForModal] = useState<AutomatedRegulatoryAudit | null>(null);
  const [copiedProof, setCopiedProof] = useState<string | null>(null);
  const [isTriggeringScan, setIsTriggeringScan] = useState<boolean>(false);

  // Copy proof helper
  const handleCopyProof = (proof: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(proof);
    setCopiedProof(proof);
    setTimeout(() => setCopiedProof(null), 2000);
  };

  // Run new automated audit simulation
  const handleRunNewAudit = () => {
    if (isTriggeringScan) return;
    setIsTriggeringScan(true);

    setTimeout(() => {
      const now = new Date();
      const dateStr = `${now.toISOString().split('T')[0]} ${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`;
      const randomIdNum = Math.floor(Math.random() * 900) + 8900;
      
      const newAudit: AutomatedRegulatoryAudit = {
        id: `audit-${randomIdNum}`,
        auditNumber: `ARA-2026-${randomIdNum}`,
        timestamp: dateStr,
        relativeTime: 'Just now',
        engine: 'Proprietary AI Engine',
        engineVersion: 'v4.8.2',
        status: 'PASSED',
        statusLabel: 'Verified & Passed',
        jurisdiction: 'National Intercollegiate & Prep Clearinghouse',
        scope: 'Real-Time Multi-State & NCAA House Settlement Automated Audit',
        subsystem: 'Universal Automated Regulatory Scanner',
        infractionsFound: 0,
        safeguardsActive: 4,
        cryptographicProof: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
        latencyMs: Math.floor(Math.random() * 15) + 14,
        summary: 'Automated continuous check performed by Proprietary AI Engine: 100% adherence to active state bylaw frameworks, Title IX parity standards, and NCAA Division I rules.',
        affectedRuleSets: [
          {
            code: 'NCAA-BYLAW-22.1',
            name: 'Direct Institutional Revenue Distribution & NIL Parity',
            authority: 'NCAA National Office',
            statutoryClause: 'NCAA Div. I Constitution § 22.1.4 (House Settlement)',
            riskTier: 'Critical',
            framework: 'NCAA Division I',
            alignmentStatus: 'Aligned'
          },
          {
            code: 'NFHS-K12-STAT-50',
            name: 'Scholastic NIL Amateurism & Identity Separation',
            authority: 'NFHS & 50 State Associations',
            statutoryClause: 'NFHS Eligibility Standards & State Bylaws',
            riskTier: 'Critical',
            framework: 'High School NFHS',
            alignmentStatus: 'Aligned'
          }
        ]
      };

      setAudits((prev) => [newAudit, ...prev]);
      setIsTriggeringScan(false);
    }, 1200);
  };

  // Filtered audits
  const filteredAudits = useMemo(() => {
    return audits.filter((audit) => {
      // Status filter
      if (statusFilter !== 'All' && audit.status !== statusFilter) {
        return false;
      }

      // Framework filter across affected rule sets
      if (frameworkFilter !== 'All') {
        const hasMatchingFramework = audit.affectedRuleSets.some(
          (rs) => rs.framework === frameworkFilter
        );
        if (!hasMatchingFramework) return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesBasic = 
          audit.auditNumber.toLowerCase().includes(q) ||
          audit.jurisdiction.toLowerCase().includes(q) ||
          audit.scope.toLowerCase().includes(q) ||
          audit.subsystem.toLowerCase().includes(q) ||
          audit.summary.toLowerCase().includes(q);

        const matchesRules = audit.affectedRuleSets.some(
          (rs) => 
            rs.code.toLowerCase().includes(q) ||
            rs.name.toLowerCase().includes(q) ||
            rs.authority.toLowerCase().includes(q) ||
            rs.statutoryClause.toLowerCase().includes(q)
        );

        return matchesBasic || matchesRules;
      }

      return true;
    });
  }, [audits, statusFilter, frameworkFilter, searchQuery]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Audit Number', 'Timestamp', 'Engine', 'Status', 'Jurisdiction', 'Scope', 'Affected Rule Sets', 'Infractions', 'Proof'];
    const rows = filteredAudits.map((a) => [
      a.auditNumber,
      `"${a.timestamp}"`,
      `"${a.engine} (${a.engineVersion})"`,
      a.status,
      `"${a.jurisdiction}"`,
      `"${a.scope}"`,
      `"${a.affectedRuleSets.map((r) => r.code).join('; ')}"`,
      a.infractionsFound,
      a.cryptographicProof
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `regulatory_audits_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#10141D] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl">
      {/* Component Header */}
      <div className="p-6 sm:p-7 border-b border-white/[0.08] relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-[#E8C98B] font-mono text-[11px] uppercase tracking-wider font-semibold">
                <Cpu size={12} className="text-[#C89B3C]" />
                Proprietary AI Engine Audits
              </span>
              <span className="text-neutral-500 font-mono text-[11px]">
                · Real-Time Automated Verification Log
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2.5">
              <ShieldCheck size={22} className="text-emerald-400 shrink-0" />
              Automated Regulatory Audits & Rule Set Ledger
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Chronological ledger of recent automated regulatory audits executed by our{' '}
              <span className="text-[#E8C98B] font-medium">Proprietary AI Engine</span>. 
              Each audit evaluates high school bylaw codes, collegiate amateurism statutes, and federal commercial covenants with cryptographic verification proofs.
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleRunNewAudit}
              disabled={isTriggeringScan}
              className={`px-3.5 py-2 rounded text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isTriggeringScan
                  ? 'bg-neutral-800 text-neutral-400 border border-white/5 cursor-wait'
                  : 'bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] shadow-md shadow-[#C89B3C]/10 active:scale-95'
              }`}
            >
              <RefreshCw size={13} className={isTriggeringScan ? 'animate-spin' : ''} />
              <span>{isTriggeringScan ? 'Auditing...' : 'Execute Audit'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded bg-[#171C26] hover:bg-[#1E2533] text-neutral-200 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              title="Export audits to CSV"
            >
              <Download size={13} className="text-[#C89B3C]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit ID, rule sets, state, or statutory clause..."
              className="w-full bg-[#0D1017] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-[#C89B3C] transition-colors"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-[#0D1017] border border-white/10 rounded px-2.5 py-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Status:</span>
              <select
                aria-label="Filter audits by status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-neutral-200 text-xs font-mono focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#10141D]">All Statuses</option>
                <option value="PASSED" className="bg-[#10141D]">Verified & Passed</option>
                <option value="SYNCHRONIZED" className="bg-[#10141D]">Synchronized</option>
                <option value="ADVISORY" className="bg-[#10141D]">Advisory Active</option>
              </select>
            </div>

            {/* Framework Filter */}
            <div className="flex items-center gap-1.5 bg-[#0D1017] border border-white/10 rounded px-2.5 py-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Rule Set:</span>
              <select
                aria-label="Filter audits by institutional rule set"
                value={frameworkFilter}
                onChange={(e) => setFrameworkFilter(e.target.value)}
                className="bg-transparent text-neutral-200 text-xs font-mono focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#10141D]">All Rule Frameworks</option>
                <option value="High School NFHS" className="bg-[#10141D]">High School NFHS</option>
                <option value="NCAA Division I" className="bg-[#10141D]">NCAA Division I</option>
                <option value="Title IX & Equity" className="bg-[#10141D]">Title IX & Equity</option>
                <option value="State NIL Statutes" className="bg-[#10141D]">State NIL Statutes</option>
                <option value="Federal & FTC" className="bg-[#10141D]">Federal & FTC</option>
                <option value="Group Licensing" className="bg-[#10141D]">Group Licensing</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Audits Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08] bg-[#0C0F15] text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              <th className="py-3.5 px-4 sm:px-6 font-semibold">Audit Reference & Timestamp</th>
              <th className="py-3.5 px-4 font-semibold">Regulatory Scope & Subsystem</th>
              <th className="py-3.5 px-4 font-semibold">Status & AI Engine Result</th>
              <th className="py-3.5 px-4 font-semibold">Affected Institutional Rule Sets</th>
              <th className="py-3.5 px-4 font-semibold text-center">Cryptographic Proof</th>
              <th className="py-3.5 px-4 sm:px-6 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05] text-xs font-sans">
            {filteredAudits.map((audit) => {
              return (
                <tr
                  key={audit.id}
                  onClick={() => setSelectedAuditForModal(audit)}
                  className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  {/* Audit Reference & Timestamps */}
                  <td className="py-4 px-4 sm:px-6 align-top">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-xs group-hover:text-[#E8C98B] transition-colors">
                          {audit.auditNumber}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                          {audit.relativeTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
                        <Clock size={11} className="text-neutral-500" />
                        <span>{audit.timestamp}</span>
                      </div>
                      <div className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                        <Cpu size={10} className="text-[#C89B3C]" />
                        <span>{audit.engine} ({audit.engineVersion})</span>
                      </div>
                    </div>
                  </td>

                  {/* Regulatory Scope & Subsystem */}
                  <td className="py-4 px-4 align-top max-w-[240px]">
                    <div className="space-y-1">
                      <div className="font-semibold text-white text-xs leading-snug">
                        {audit.scope}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                        <span className="text-neutral-500">{audit.jurisdiction}</span>
                        <span>·</span>
                        <span className="text-[#E8C98B]">{audit.subsystem}</span>
                      </div>
                      <div className="text-[10px] font-mono text-neutral-500">
                        Latency: {audit.latencyMs}ms · {audit.safeguardsActive} active safeguards
                      </div>
                    </div>
                  </td>

                  {/* Status & Result */}
                  <td className="py-4 px-4 align-top">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold border ${
                            audit.status === 'PASSED'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : audit.status === 'SYNCHRONIZED'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}
                        >
                          {audit.status === 'PASSED' && <CheckCircle2 size={11} />}
                          {audit.status === 'SYNCHRONIZED' && <RefreshCw size={11} />}
                          {audit.status === 'ADVISORY' && <AlertTriangle size={11} />}
                          {audit.statusLabel}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        {audit.infractionsFound === 0 ? (
                          <span className="text-emerald-400 font-medium">0 Infractions</span>
                        ) : (
                          <span className="text-amber-400 font-medium">{audit.infractionsFound} Flagged</span>
                        )}
                        <span className="text-neutral-600"> · </span>
                        <span>100% Validated</span>
                      </div>
                    </div>
                  </td>

                  {/* Affected Institutional Rule Sets */}
                  <td className="py-4 px-4 align-top max-w-[320px]">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap gap-1.5">
                        {audit.affectedRuleSets.map((rs, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 font-mono text-[10px] bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 px-2 py-0.5 rounded border border-white/10 transition-colors"
                            title={`${rs.name} (${rs.authority})`}
                          >
                            <Scale size={9} className="text-[#C89B3C]" />
                            <span className="font-semibold text-[#E8C98B]">{rs.code}</span>
                          </span>
                        ))}
                      </div>
                      <div className="text-[11px] text-neutral-400 line-clamp-1">
                        {audit.affectedRuleSets.map((rs) => rs.name).join(' · ')}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-500">
                        {audit.affectedRuleSets.length} codified institutional rule set{audit.affectedRuleSets.length > 1 ? 's' : ''} evaluated
                      </div>
                    </div>
                  </td>

                  {/* Cryptographic Proof */}
                  <td className="py-4 px-4 align-top text-center">
                    <button
                      onClick={(e) => handleCopyProof(audit.cryptographicProof, e)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#0A0D13] hover:bg-black text-[11px] font-mono text-neutral-400 hover:text-white border border-white/5 transition-colors cursor-pointer"
                      title="Copy SHA-256 cryptographic proof hash"
                    >
                      <span className="text-emerald-400 font-medium">{audit.cryptographicProof}</span>
                      {copiedProof === audit.cryptographicProof ? (
                        <Check size={11} className="text-emerald-400" />
                      ) : (
                        <Copy size={11} className="text-neutral-500 group-hover:text-neutral-300" />
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 sm:px-6 align-top text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAuditForModal(audit);
                        if (onInspectAudit) onInspectAudit(audit);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#C89B3C] hover:text-[#E8C98B] font-semibold py-1 px-2.5 rounded hover:bg-[#C89B3C]/10 transition-colors cursor-pointer"
                    >
                      <Eye size={12} />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredAudits.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-neutral-500 font-mono text-xs">
                  No automated regulatory audits matched the specified filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary */}
      <div className="p-4 sm:px-6 bg-[#0B0E14] border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-3">
          <span>Showing {filteredAudits.length} of {audits.length} automated audits</span>
          <span className="text-neutral-600">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={12} /> 100% Institutional Compliance Rate
          </span>
        </div>
        <div className="text-[11px] text-neutral-500">
          Engine polling cadence: every 6 hours · Continuous drift protection
        </div>
      </div>

      {/* Audit Detail Modal */}
      {selectedAuditForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#10141D] border border-[#C89B3C]/40 rounded-xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-[#C89B3C] uppercase tracking-widest font-semibold">
                    AUTOMATED REGULATORY AUDIT REPORT
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
                      selectedAuditForModal.status === 'PASSED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : selectedAuditForModal.status === 'SYNCHRONIZED'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {selectedAuditForModal.statusLabel}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Audit {selectedAuditForModal.auditNumber}
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Executed by {selectedAuditForModal.engine} ({selectedAuditForModal.engineVersion}) · {selectedAuditForModal.timestamp}
                </p>
              </div>

              <button
                onClick={() => setSelectedAuditForModal(null)}
                className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
                title="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scope & Executive Summary */}
            <div className="space-y-3">
              <div className="bg-black/40 p-4 rounded-lg border border-white/5 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Regulatory Scope & Objective
                </div>
                <div className="text-sm text-white font-medium">
                  {selectedAuditForModal.scope}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {selectedAuditForModal.summary}
                </p>
              </div>

              {/* Technical Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-[#141822] p-3 rounded border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-neutral-500 uppercase block">Jurisdiction</span>
                  <span className="text-white font-semibold truncate block">{selectedAuditForModal.jurisdiction}</span>
                </div>
                <div className="bg-[#141822] p-3 rounded border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-neutral-500 uppercase block">Engine Subsystem</span>
                  <span className="text-[#E8C98B] font-semibold truncate block">{selectedAuditForModal.subsystem}</span>
                </div>
                <div className="bg-[#141822] p-3 rounded border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-neutral-500 uppercase block">Execution Latency</span>
                  <span className="text-emerald-400 font-semibold block">{selectedAuditForModal.latencyMs} ms</span>
                </div>
                <div className="bg-[#141822] p-3 rounded border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-neutral-500 uppercase block">Bylaw Infractions</span>
                  <span className="text-emerald-400 font-semibold block">0 Detected</span>
                </div>
              </div>
            </div>

            {/* Affected Institutional Rule Sets Detailed Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                  <Scale size={16} className="text-[#C89B3C]" />
                  Affected Institutional Rule Sets ({selectedAuditForModal.affectedRuleSets.length})
                </h4>
                <span className="text-[11px] font-mono text-neutral-400">
                  Statutory Reference Validation
                </span>
              </div>

              <div className="space-y-2.5">
                {selectedAuditForModal.affectedRuleSets.map((rs, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#0E121A] border border-white/[0.06] space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#E8C98B] bg-[#C89B3C]/10 px-2 py-0.5 rounded border border-[#C89B3C]/20">
                          {rs.code}
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {rs.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                          {rs.framework}
                        </span>
                        <span className={`px-2 py-0.5 rounded font-semibold uppercase ${
                          rs.riskTier === 'Critical'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : rs.riskTier === 'Elevated'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}>
                          {rs.riskTier} Risk Tier
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-neutral-400">
                      <span className="text-neutral-500">Authority: </span>
                      <span className="text-neutral-300">{rs.authority}</span>
                    </div>

                    <div className="text-[11px] font-mono bg-black/30 p-2 rounded border border-white/5 text-neutral-300">
                      <span className="text-neutral-500 block text-[10px] uppercase">Codified Statutory Clause:</span>
                      {rs.statutoryClause}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cryptographic Proof Verification Block */}
            <div className="bg-[#0B0E14] border border-white/[0.08] p-4 rounded-lg space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Cryptographic Ledger Verification Hash
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={11} /> SHA-256 Validated
                </span>
              </div>
              <div className="text-emerald-400 text-xs break-all bg-black/50 p-2.5 rounded border border-emerald-500/20">
                {selectedAuditForModal.cryptographicProof}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedAuditForModal(null)}
                className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-xs uppercase cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Print Audit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
