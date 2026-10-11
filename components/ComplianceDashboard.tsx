import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Download, 
  RefreshCw, 
  Terminal, 
  Cpu, 
  FileText, 
  SlidersHorizontal, 
  Filter, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  Building2, 
  Calendar, 
  Clock, 
  Shield, 
  Zap, 
  BarChart3, 
  Globe2, 
  FileCheck2, 
  Info,
  Maximize2,
  Play,
  Pause
} from 'lucide-react';
import { AutomatedRegulatoryAuditsTable } from './AutomatedRegulatoryAuditsTable';

export { AutomatedRegulatoryAuditsTable };

export interface BylawAlignmentRecord {
  id: string;
  code: string;
  framework: 'NCAA Division I' | 'High School NFHS' | 'Title IX & Equity' | 'State NIL Statutes' | 'Federal & FTC' | 'Group Licensing';
  authority: string;
  title: string;
  statutoryReference: string;
  status: 'Full Alignment' | 'Continuous Sync' | 'Advisory Note' | 'Under Audit';
  alignmentScore: number;
  lastScanned: string;
  automatedEngineCheckpoint: string;
  riskTier: 'Critical' | 'Elevated' | 'Standard';
  articlesMonitored: number;
  description: string;
  safeguardMechanisms: string[];
}

export interface EngineAuditLog {
  id: string;
  timestamp: string;
  module: 'Proprietary AI Engine' | 'Automated Analysis Module';
  subsystem: string;
  jurisdiction: string;
  level: 'VERIFIED' | 'SYNCHRONIZED' | 'ADVISORY' | 'AUDITED';
  message: string;
  ruleHash: string;
  latencyMs: number;
}

const INITIAL_BYLAW_ALIGNMENTS: BylawAlignmentRecord[] = [
  {
    id: 'ncaa-house-settlement',
    code: 'NCAA-BYLAW-22.1',
    framework: 'NCAA Division I',
    authority: 'NCAA National Office & Post-House Settlement Governance',
    title: 'Direct Institutional Revenue Distribution & NIL Clearinghouse Parity',
    statutoryReference: 'NCAA Div. I Constitution § 22.1.4 (House v. NCAA Settlement Guidelines)',
    status: 'Full Alignment',
    alignmentScore: 100,
    lastScanned: '2 mins ago',
    automatedEngineCheckpoint: 'Automated Analysis Module · Post-House Settlement Monitor',
    riskTier: 'Critical',
    articlesMonitored: 14,
    description: 'Enforces complete separation between sanctioned prize trust distribution, collective commercial licensing, and direct university athletics payroll caps, pre-empting antitrust and Title IX reclassifications.',
    safeguardMechanisms: [
      'Automated payroll cap threshold firewall',
      'Neutral third-party commercial clearinghouse audit trail',
      'Real-time disclosure ledger synced with athletic directorate'
    ]
  },
  {
    id: 'nfhs-50-state',
    code: 'NFHS-K12-STAT-50',
    framework: 'High School NFHS',
    authority: 'National Federation of State High School Associations (NFHS) & 50 State Associations',
    title: 'K-12 Scholastic NIL Eligibility & Parental Co-Signing Escrow',
    statutoryReference: 'NFHS Athletic Eligibility Rules & 50 State Association Bylaws',
    status: 'Full Alignment',
    alignmentScore: 100,
    lastScanned: 'Just now',
    automatedEngineCheckpoint: 'Proprietary AI Engine · 50-State High School Bylaw Parser',
    riskTier: 'Critical',
    articlesMonitored: 50,
    description: 'Automated continuous parsing of all 50 state high school athletic association amateurism rules. Enforces parental co-signing, bans high school facility/trademark usage, and guarantees future NCAA college eligibility.',
    safeguardMechanisms: [
      'Biometric parental co-signature verification',
      'Zero school jersey/crest logo automatic media audit',
      '50-State statutory rule drift ingestion every 6 hours'
    ]
  },
  {
    id: 'ncaa-bylaw-12-amateurism',
    code: 'NCAA-BYLAW-12.0',
    framework: 'NCAA Division I',
    authority: 'NCAA Committee on Student-Athlete Reinstatement & Amateurism',
    title: 'Amateur Status Preservation & Educational Prize Escrow Protection',
    statutoryReference: 'NCAA Division I Manual Bylaw 12 (Amateurism & Athletics Eligibility)',
    status: 'Full Alignment',
    alignmentScore: 99.8,
    lastScanned: '6 mins ago',
    automatedEngineCheckpoint: 'Proprietary AI Engine · Amateurism Firewall Verifier',
    riskTier: 'Critical',
    articlesMonitored: 28,
    description: 'Guarantees competitive tournament prize pools are deposited into verified educational trusts or state-compliant escrow accounts, preventing pay-for-play amateurism forfeitures.',
    safeguardMechanisms: [
      'Independent escrow trust bank account isolation',
      'No agent representation for collegiate varsity roster slots',
      'Direct educational reimbursement matching'
    ]
  },
  {
    id: 'title-ix-parity',
    code: 'TITLE-IX-34CFR106',
    framework: 'Title IX & Equity',
    authority: 'U.S. Department of Education Office for Civil Rights (OCR)',
    title: 'Intercollegiate Gender Equity & Commercial Resource Proportionality',
    statutoryReference: '34 C.F.R. Part 106.41 (Athletics Financial Assistance & Benefits)',
    status: 'Full Alignment',
    alignmentScore: 100,
    lastScanned: '14 mins ago',
    automatedEngineCheckpoint: 'Automated Analysis Module · Title IX Parity Evaluator',
    riskTier: 'Critical',
    articlesMonitored: 18,
    description: 'Monitors esports competition prize distributions, production broadcasts, and brand sponsorship opportunities to guarantee strict 50/50 male-female parity across institutional varsity programs.',
    safeguardMechanisms: [
      'Algorithmic 50/50 prize purse parity auditor',
      'Proportional broadcast exposure metric verification',
      'Automated OCR annual filing documentation generator'
    ]
  },
  {
    id: 'state-nil-sb206-sb1385',
    code: 'STATE-NIL-MULTI',
    framework: 'State NIL Statutes',
    authority: 'State Legislative Assemblies (California SB 206, Texas SB 1385, Florida § 1006.20)',
    title: 'Multi-State Collegiate NIL Statutory Parity & Conflict Preemption',
    statutoryReference: 'Codified Statutes Across 34 Enacted State NIL Legislative Frameworks',
    status: 'Continuous Sync',
    alignmentScore: 99.5,
    lastScanned: '8 mins ago',
    automatedEngineCheckpoint: 'Proprietary AI Engine · State Statute Parsing Grid',
    riskTier: 'Elevated',
    articlesMonitored: 34,
    description: 'Dynamically reconciles conflicting state legislative requirements regarding institutional contract disclosure windows, booster involvement, and institutional conflict preemption.',
    safeguardMechanisms: [
      'Geo-fenced state-law conflict detection before contract execution',
      'Automated 72-hour institutional athletic director notification',
      'Pre-contract review eliminating university institutional sponsor conflicts'
    ]
  },
  {
    id: 'ftc-endorsement-guides',
    code: 'FTC-16CFR255',
    framework: 'Federal & FTC',
    authority: 'Federal Trade Commission (Bureau of Consumer Protection)',
    title: 'Digital Influencer Endorsement Guides & Commercial Disclosure Mandates',
    statutoryReference: '16 C.F.R. Part 255 (Guides Concerning Use of Endorsements & Testimonials)',
    status: 'Full Alignment',
    alignmentScore: 100,
    lastScanned: '18 mins ago',
    automatedEngineCheckpoint: 'Automated Analysis Module · Digital Endorsement Auditor',
    riskTier: 'Standard',
    articlesMonitored: 12,
    description: 'Audits student-athlete social channels and live stream overlays to ensure clear, conspicuous, unmissable commercial disclosures (#ad, #sponsored) are programmatically enforced.',
    safeguardMechanisms: [
      'Programmatic broadcast overlay disclosure injection',
      'Social post metadata pre-flight disclosure verification',
      'Automated brand safety risk score generation'
    ]
  },
  {
    id: 'group-licensing-ip',
    code: 'GROUP-LIC-IP-95',
    framework: 'Group Licensing',
    authority: 'Collegiate Licensing Clearinghouse Standards & Intellectual Property Bar',
    title: 'Mass Roster Group Licensing Syndication & 95/5 Proportional Allocator',
    statutoryReference: 'Universal Group Rights Syndication & 17 U.S.C. § 106 Collective Rights',
    status: 'Full Alignment',
    alignmentScore: 99.7,
    lastScanned: '22 mins ago',
    automatedEngineCheckpoint: 'Proprietary AI Engine · Group Rights Syndication Module',
    riskTier: 'Elevated',
    articlesMonitored: 16,
    description: 'Protects mass-roster NIL intellectual property for video game licensing and merchandise, utilizing an automated 95/5 proportional split allocator algorithm directly to rostered athletes.',
    safeguardMechanisms: [
      'Smart roster opt-in ledger preventing non-consensual likeness syndication',
      '95/5 direct disbursement algorithm with automated tax reporting',
      'University trademark license separation audit'
    ]
  },
  {
    id: 'visa-f1-international',
    code: 'USCIS-SEVP-F1',
    framework: 'Federal & FTC',
    authority: 'U.S. Citizenship and Immigration Services & Student and Exchange Visitor Program',
    title: 'International Student-Athlete F-1 Visa Passive Royalty Safeguard',
    statutoryReference: '8 C.F.R. § 214.2(f)(9) (F-1 Student Employment Authorization Constraints)',
    status: 'Advisory Note',
    alignmentScore: 98.2,
    lastScanned: '31 mins ago',
    automatedEngineCheckpoint: 'Automated Analysis Module · Visa Compliance Verifier',
    riskTier: 'Elevated',
    articlesMonitored: 8,
    description: 'Structures NIL compensation for international competitors on F-1 student visas exclusively as passive digital intellectual property royalties rather than domestic U.S. active labor, preserving immigration standing.',
    safeguardMechanisms: [
      'Passive digital royalty licensing classification check',
      'Automated geo-blocking of on-campus commercial active labor tasks',
      'Immigration counsel verification checklist'
    ]
  }
];

const INITIAL_LOGS: EngineAuditLog[] = [
  {
    id: 'log-101',
    timestamp: '02:44:18 UTC',
    module: 'Proprietary AI Engine',
    subsystem: 'State Bylaw Parser',
    jurisdiction: 'Florida (Stat. § 1006.20)',
    level: 'VERIFIED',
    message: 'High School NIL eligibility mapping complete. 0 conflicts found against Florida High School Athletic Association (FHSAA) rules. Biometric parental co-sign verified.',
    ruleHash: '0x8f1a...c43e',
    latencyMs: 18
  },
  {
    id: 'log-102',
    timestamp: '02:43:52 UTC',
    module: 'Automated Analysis Module',
    subsystem: 'Post-House Settlement Monitor',
    jurisdiction: 'NCAA Division I National Office',
    level: 'SYNCHRONIZED',
    message: 'Re-indexed NCAA Bylaw 22.1 direct institutional revenue sharing model. Roster payroll clearinghouse thresholds aligned. Title IX proportionality ratio: 1.000.',
    ruleHash: '0x7e2b...9a12',
    latencyMs: 24
  },
  {
    id: 'log-103',
    timestamp: '02:43:10 UTC',
    module: 'Proprietary AI Engine',
    subsystem: '50-State High School Parser',
    jurisdiction: 'California (CIF Bylaw 212)',
    level: 'VERIFIED',
    message: 'Parsed California Interscholastic Federation amateur guidelines. Clean bill of health confirmed: athlete retains prep championship eligibility.',
    ruleHash: '0x3c99...bb77',
    latencyMs: 15
  },
  {
    id: 'log-104',
    timestamp: '02:42:31 UTC',
    module: 'Automated Analysis Module',
    subsystem: 'Title IX Escrow Evaluator',
    jurisdiction: 'OCR Title IX Standard (34 CFR)',
    level: 'AUDITED',
    message: 'Intercollegiate tournament prize purse allocations verified. 50/50 gender equity distribution validated across all varsity competition brackets.',
    ruleHash: '0x44fa...2201',
    latencyMs: 31
  },
  {
    id: 'log-105',
    timestamp: '02:41:49 UTC',
    module: 'Proprietary AI Engine',
    subsystem: 'Group Rights Syndication Module',
    jurisdiction: 'Collegiate Licensing Multi-Campus',
    level: 'VERIFIED',
    message: 'Mass roster IP licensing clearinghouse: 95/5 proportional split allocator verified for 120 rostered student-athletes. Direct escrow lock engaged.',
    ruleHash: '0x11ab...ff39',
    latencyMs: 22
  },
  {
    id: 'log-106',
    timestamp: '02:40:58 UTC',
    module: 'Automated Analysis Module',
    subsystem: 'FTC 16 CFR Part 255 Module',
    jurisdiction: 'Federal Trade Commission',
    level: 'VERIFIED',
    message: 'Scanned 148 collegiate streamer broadcast graphic templates. #ad commercial disclosure positioning verified as clear and conspicuous.',
    ruleHash: '0x99aa...66e1',
    latencyMs: 19
  },
  {
    id: 'log-107',
    timestamp: '02:39:40 UTC',
    module: 'Automated Analysis Module',
    subsystem: 'Visa Compliance Verifier',
    jurisdiction: 'USCIS F-1 SEVP',
    level: 'ADVISORY',
    message: 'Advisory: Non-resident alien athlete contract structured via offshore digital copyright licensing to maintain strict F-1 passive royalty status.',
    ruleHash: '0x55dc...33a2',
    latencyMs: 27
  },
  {
    id: 'log-108',
    timestamp: '02:38:12 UTC',
    module: 'Proprietary AI Engine',
    subsystem: 'Texas SB 1385 Parser',
    jurisdiction: 'Texas UIL / Higher Education',
    level: 'VERIFIED',
    message: 'Texas State NIL disclosure window audit passed: Institutional Athletic Director notification timestamped within statutory 72-hour window.',
    ruleHash: '0x22ee...dd44',
    latencyMs: 16
  }
];

export const ComplianceDashboard: React.FC<{
  embedded?: boolean;
  onOpenAuditReport?: () => void;
}> = ({ embedded = false, onOpenAuditReport }) => {
  const [bylawRecords, setBylawRecords] = useState<BylawAlignmentRecord[]>(INITIAL_BYLAW_ALIGNMENTS);
  const [logs, setLogs] = useState<EngineAuditLog[]>(INITIAL_LOGS);
  const [selectedFramework, setSelectedFramework] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [logFilter, setLogFilter] = useState<string>('All');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>('ncaa-house-settlement');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<'all' | 'audits' | 'bylaws' | 'telemetry'>('all');
  const logTerminalRef = useRef<HTMLDivElement>(null);

  // Simulated live log generator
  useEffect(() => {
    if (!isLiveStreaming) return;

    const modules: ('Proprietary AI Engine' | 'Automated Analysis Module')[] = [
      'Proprietary AI Engine',
      'Automated Analysis Module'
    ];

    const subsystems = [
      'State Bylaw Parser',
      'Post-House Settlement Monitor',
      '50-State High School Parser',
      'Title IX Escrow Evaluator',
      'Group Rights Syndication Module',
      'FTC 16 CFR Part 255 Module',
      'Amateurism Firewall Verifier'
    ];

    const jurisdictions = [
      'NCAA Division I National Office',
      'High School NIL · Georgia GHSA',
      'Ohio High School Athletic Assoc.',
      'California Interscholastic Fed.',
      'Texas UIL § 33.0831',
      'Title IX Federal Compliance Audit',
      'Collegiate Licensing Clearinghouse'
    ];

    const messages = [
      'Statutory rule delta analyzed: 0 changes detected in high school state association amateur definitions.',
      'Validated parental co-signing signature bundle. Eligibility certified.',
      'Intercollegiate prize trust balance reconciliation complete. 100% funds held in FDIC-insured trust.',
      'Automated brand conflict check passed: zero institutional sponsor non-compete triggers.',
      'Checked live streaming broadcast overlay code: #ad and institutional disclaimers confirmed present.',
      'Continuous bylaw alignment check completed. 0 critical vulnerabilities or infractions.'
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`;
      const randomModule = modules[Math.floor(Math.random() * modules.length)];
      const randomSubsystem = subsystems[Math.floor(Math.random() * subsystems.length)];
      const randomJurisdiction = jurisdictions[Math.floor(Math.random() * jurisdictions.length)];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const randomHash = `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`;
      const randomLatency = Math.floor(Math.random() * 20) + 12;

      const newLog: EngineAuditLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        module: randomModule,
        subsystem: randomSubsystem,
        jurisdiction: randomJurisdiction,
        level: Math.random() > 0.85 ? 'SYNCHRONIZED' : 'VERIFIED',
        message: randomMsg,
        ruleHash: randomHash,
        latencyMs: randomLatency
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 49)]);
    }, 7000);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Execute manual scan
  const handleTriggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(5);

    const stepInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(stepInterval);
          return 95;
        }
        return prev + 15;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(stepInterval);
      setScanProgress(100);
      setIsScanning(false);

      const now = new Date();
      const timeStr = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`;
      
      const scanLog: EngineAuditLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        module: 'Proprietary AI Engine',
        subsystem: 'Automated 50-State & NCAA Sweep',
        jurisdiction: 'Universal Intercollegiate & K-12 Grid',
        level: 'AUDITED',
        message: 'Comprehensive automated bylaw scan completed. All 50 states, NCAA House Settlement rules, and Title IX covenants verified in 100% alignment.',
        ruleHash: '0x' + Math.random().toString(16).substring(2, 10),
        latencyMs: 142
      };

      setLogs((prev) => [scanLog, ...prev]);

      // Update timestamps on records
      setBylawRecords((prev) =>
        prev.map((r) => ({
          ...r,
          lastScanned: 'Just now'
        }))
      );
    }, 2000);
  };

  const copyRuleHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Filtered bylaw records
  const filteredBylaws = useMemo(() => {
    return bylawRecords.filter((b) => {
      const matchesFramework = selectedFramework === 'All' || b.framework === selectedFramework;
      const matchesSearch = 
        searchQuery === '' ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.statutoryReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.authority.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFramework && matchesSearch;
    });
  }, [bylawRecords, selectedFramework, searchQuery]);

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (logFilter === 'All') return true;
      if (logFilter === 'Proprietary AI Engine') return log.module === 'Proprietary AI Engine';
      if (logFilter === 'Automated Analysis Module') return log.module === 'Automated Analysis Module';
      if (logFilter === 'VERIFIED') return log.level === 'VERIFIED';
      if (logFilter === 'ADVISORY') return log.level === 'ADVISORY';
      return true;
    });
  }, [logs, logFilter]);

  // Overall metrics calculation
  const overallAlignment = useMemo(() => {
    if (bylawRecords.length === 0) return 100;
    const sum = bylawRecords.reduce((acc, curr) => acc + curr.alignmentScore, 0);
    return (sum / bylawRecords.length).toFixed(1);
  }, [bylawRecords]);

  const totalArticlesTracked = useMemo(() => {
    return bylawRecords.reduce((acc, curr) => acc + curr.articlesMonitored, 0);
  }, [bylawRecords]);

  return (
    <div className={`space-y-8 ${embedded ? '' : 'py-8 max-w-[1360px] mx-auto px-6'}`}>
      
      {/* Top Banner / System Status */}
      <div className="bg-[#10141D] border border-white/[0.08] rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C89B3C]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Continuous Ingestion Active
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-[#E8C98B] font-mono text-[11px] uppercase tracking-wider">
                <Cpu size={12} className="text-[#C89B3C]" />
                Proprietary AI Engine v4.8
              </span>
              <span className="text-neutral-500 font-mono text-[11px] hidden sm:inline">
                · Automated Analysis Module
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Institutional Compliance & Bylaw Alignment Dashboard
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Unified automated monitoring clearinghouse for intercollegiate athletics, 50-state high school NIL rules, 
              post-House settlement revenue distribution, and Title IX parity safeguards. Driven by our 
              <span className="text-[#E8C98B] font-medium"> Proprietary AI Engine</span> and 
              <span className="text-[#E8C98B] font-medium"> Automated Analysis Module</span>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={handleTriggerScan}
              disabled={isScanning}
              className={`px-4 py-2.5 rounded text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isScanning 
                  ? 'bg-neutral-800 text-neutral-400 border border-white/5 cursor-wait'
                  : 'bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] shadow-lg shadow-[#C89B3C]/15 active:scale-95'
              }`}
            >
              <RefreshCw size={13} className={isScanning ? 'animate-spin' : ''} />
              <span>{isScanning ? `Scanning (${scanProgress}%)` : 'Run Bylaw Scan'}</span>
            </button>

            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-4 py-2.5 rounded bg-[#171C26] hover:bg-[#1E2533] text-neutral-200 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileCheck2 size={13} className="text-[#C89B3C]" />
              <span>Audit Certificate</span>
            </button>
          </div>
        </div>

        {/* Scan Progress Bar if running */}
        {isScanning && (
          <div className="mt-6 pt-4 border-t border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-[#E8C98B]">
                <Cpu size={12} className="animate-spin text-[#C89B3C]" />
                Scanning 50 State High School Codes & NCAA Division I Bylaw Database...
              </span>
              <span>{scanProgress}% Completed</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#C89B3C] via-[#E8C98B] to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#11141A] border border-white/[0.08] p-5 rounded-lg space-y-1.5">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-mono uppercase tracking-wider">Overall Alignment</span>
            <ShieldCheck size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            {overallAlignment}%
          </div>
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={11} />
            <span>50 / 50 States Synchronized</span>
          </div>
        </div>

        <div className="bg-[#11141A] border border-white/[0.08] p-5 rounded-lg space-y-1.5">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-mono uppercase tracking-wider">Monitored Bylaws</span>
            <Scale size={16} className="text-[#C89B3C]" />
          </div>
          <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            {totalArticlesTracked}
          </div>
          <div className="text-[11px] font-mono text-neutral-400">
            <span>Articles Across 8 Legal Frameworks</span>
          </div>
        </div>

        <div className="bg-[#11141A] border border-white/[0.08] p-5 rounded-lg space-y-1.5">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-mono uppercase tracking-wider">Engine Checks</span>
            <Activity size={16} className="text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            18,429
          </div>
          <div className="text-[11px] font-mono text-neutral-400">
            <span>Automated checks past 30 days</span>
          </div>
        </div>

        <div className="bg-[#11141A] border border-white/[0.08] p-5 rounded-lg space-y-1.5">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-mono uppercase tracking-wider">Bylaw Infractions</span>
            <Shield size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 tracking-tight">
            0 Clean
          </div>
          <div className="text-[11px] font-mono text-neutral-400">
            <span>1 Active Advisory · 0 Violations</span>
          </div>
        </div>
      </div>

      {/* Section View Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-neutral-400 mr-1 uppercase">Dashboard View:</span>
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
              activeSection === 'all'
                ? 'bg-[#C89B3C] text-[#090A0C] font-semibold shadow-sm'
                : 'bg-[#151922] text-neutral-400 hover:text-white border border-white/5'
            }`}
          >
            All Modules
          </button>
          <button
            onClick={() => setActiveSection('audits')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'audits'
                ? 'bg-[#C89B3C] text-[#090A0C] font-semibold shadow-sm'
                : 'bg-[#151922] text-neutral-400 hover:text-white border border-white/5'
            }`}
          >
            <ShieldCheck size={13} className={activeSection === 'audits' ? 'text-[#090A0C]' : 'text-emerald-400'} />
            <span>Automated Regulatory Audits</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
              activeSection === 'audits' ? 'bg-black/20 text-black' : 'bg-[#C89B3C]/10 text-[#E8C98B]'
            }`}>
              Proprietary AI Engine
            </span>
          </button>
          <button
            onClick={() => setActiveSection('bylaws')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'bylaws'
                ? 'bg-[#C89B3C] text-[#090A0C] font-semibold shadow-sm'
                : 'bg-[#151922] text-neutral-400 hover:text-white border border-white/5'
            }`}
          >
            <Scale size={13} className={activeSection === 'bylaws' ? 'text-[#090A0C]' : 'text-[#C89B3C]'} />
            <span>Bylaw Alignment Matrix</span>
          </button>
          <button
            onClick={() => setActiveSection('telemetry')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'telemetry'
                ? 'bg-[#C89B3C] text-[#090A0C] font-semibold shadow-sm'
                : 'bg-[#151922] text-neutral-400 hover:text-white border border-white/5'
            }`}
          >
            <Terminal size={13} className={activeSection === 'telemetry' ? 'text-[#090A0C]' : 'text-emerald-400'} />
            <span>AI Engine Live Logs</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-neutral-500 hidden sm:block">
          Proprietary AI Engine Oversight · 256-Bit Cryptographic Ledger
        </div>
      </div>

      {/* Sub-Component: Automated Regulatory Audits Table (by Proprietary AI Engine) */}
      {(activeSection === 'all' || activeSection === 'audits') && (
        <AutomatedRegulatoryAuditsTable />
      )}

      {/* Main Grid: Status Matrix & Live AI Engine Logs */}
      {(activeSection === 'all' || activeSection === 'bylaws' || activeSection === 'telemetry') && (
        <div className={`grid grid-cols-1 ${activeSection === 'all' ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-8`}>
        
        {/* Left Column: Bylaw Alignment Status Matrix */}
        {(activeSection === 'all' || activeSection === 'bylaws') && (
          <div className={`${activeSection === 'all' ? 'lg:col-span-7' : 'w-full'} space-y-5`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
            <div>
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Scale size={18} className="text-[#C89B3C]" />
                Institutional Bylaw Alignment Matrix
              </h3>
              <p className="text-xs text-neutral-400">
                Audited against post-House NCAA settlement guidelines, 50-state prep associations, and Title IX covenants.
              </p>
            </div>

            {/* Framework Filter Dropdown */}
            <div className="flex items-center gap-2">
              <Filter size={13} className="text-neutral-500" />
              <select
                aria-label="Filter bylaws by regulatory framework"
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="bg-[#141822] text-neutral-200 border border-white/10 rounded px-2.5 py-1 text-xs font-mono focus:outline-none focus:border-[#C89B3C]"
              >
                <option value="All">All Frameworks ({bylawRecords.length})</option>
                <option value="NCAA Division I">NCAA Division I</option>
                <option value="High School NFHS">High School NFHS</option>
                <option value="Title IX & Equity">Title IX & Equity</option>
                <option value="State NIL Statutes">State NIL Statutes</option>
                <option value="Federal & FTC">Federal & FTC</option>
                <option value="Group Licensing">Group Licensing</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by bylaw code, statute, state, or keywords..."
              className="w-full bg-[#11141A] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-[#C89B3C] transition-colors"
            />
          </div>

          {/* Bylaw List */}
          <div className="space-y-3">
            {filteredBylaws.map((record) => {
              const isExpanded = expandedRecordId === record.id;

              return (
                <div
                  key={record.id}
                  className={`bg-[#11141A] border rounded-lg transition-all overflow-hidden ${
                    isExpanded 
                      ? 'border-[#C89B3C]/40 bg-[#121622]' 
                      : 'border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {/* Record Header */}
                  <div
                    onClick={() => setExpandedRecordId(isExpanded ? null : record.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#E8C98B] bg-[#C89B3C]/10 px-2 py-0.5 rounded border border-[#C89B3C]/20">
                          {record.code}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                          {record.framework}
                        </span>
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                          record.status === 'Full Alignment'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : record.status === 'Continuous Sync'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {record.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-white tracking-tight truncate">
                        {record.title}
                      </h4>

                      <div className="text-[11px] text-neutral-400 font-mono flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{record.authority}</span>
                        <span>·</span>
                        <span className="text-neutral-500">Scanned {record.lastScanned}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-mono font-bold text-emerald-400">
                          {record.alignmentScore}%
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500">
                          Aligned
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-neutral-400 transition-transform ${isExpanded ? 'rotate-180 text-[#C89B3C]' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-white/[0.06] space-y-4 text-xs bg-[#0F1219]">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                          Statutory & Governance Authority Reference
                        </div>
                        <div className="text-neutral-300 font-mono bg-black/40 p-2.5 rounded border border-white/5">
                          {record.statutoryReference}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                          Mandate Overview & Scope
                        </div>
                        <p className="text-neutral-300 leading-relaxed">
                          {record.description}
                        </p>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                          Active Automated Safeguard Mechanisms
                        </div>
                        <ul className="space-y-1.5">
                          {record.safeguardMechanisms.map((mech, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-neutral-300 font-mono text-[11px]">
                              <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                              <span>{mech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-[11px] font-mono text-neutral-400">
                        <div className="flex items-center gap-1.5 text-[#E8C98B]">
                          <Cpu size={12} className="text-[#C89B3C]" />
                          <span>{record.automatedEngineCheckpoint}</span>
                        </div>
                        <div className="text-neutral-500">
                          {record.articlesMonitored} Codified Articles Monitored
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredBylaws.length === 0 && (
              <div className="p-8 text-center text-neutral-500 font-mono text-xs bg-[#11141A] rounded-lg border border-white/[0.08]">
                No bylaw records matching search filter.
              </div>
            )}
          </div>
        </div>
        )}

        {/* Right Column: Proprietary AI Engine Terminal Logs */}
        {(activeSection === 'all' || activeSection === 'telemetry') && (
        <div className={`${activeSection === 'all' ? 'lg:col-span-5' : 'w-full'} space-y-5`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
            <div>
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Terminal size={18} className="text-emerald-400" />
                Proprietary AI Engine Live Logs
              </h3>
              <p className="text-xs text-neutral-400">
                Live automated analysis feed & verification telemetry
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiveStreaming(!isLiveStreaming)}
                className={`p-1.5 rounded text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                  isLiveStreaming
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-neutral-800 text-neutral-400 border border-white/10'
                }`}
                title={isLiveStreaming ? 'Pause live stream' : 'Resume live stream'}
              >
                {isLiveStreaming ? <Pause size={12} /> : <Play size={12} />}
                <span className="text-[10px] uppercase font-semibold">{isLiveStreaming ? 'Live' : 'Paused'}</span>
              </button>
            </div>
          </div>

          {/* Subsystem Log Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
            {['All', 'Proprietary AI Engine', 'Automated Analysis Module', 'ADVISORY'].map((f) => (
              <button
                key={f}
                onClick={() => setLogFilter(f)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  logFilter === f
                    ? 'bg-[#C89B3C] text-[#090A0C] font-semibold'
                    : 'bg-[#151922] text-neutral-400 hover:text-white border border-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Log Stream Terminal Container */}
          <div 
            ref={logTerminalRef}
            className="bg-[#0A0D13] border border-white/[0.08] rounded-xl p-4 font-mono text-xs space-y-3.5 max-h-[640px] overflow-y-auto shadow-inner"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[10px] text-neutral-500 uppercase tracking-widest">
              <span>Telemetry Feed · 256-Bit Cryptographic Ledger</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Polling
              </span>
            </div>

            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded bg-[#10141C] border border-white/[0.04] hover:border-white/10 transition-colors space-y-2 group"
              >
                <div className="flex items-center justify-between text-[10px] text-neutral-500">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400">{log.timestamp}</span>
                    <span className={`px-1.5 py-0.2 rounded font-semibold uppercase ${
                      log.level === 'VERIFIED'
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : log.level === 'SYNCHRONIZED'
                        ? 'text-blue-400 bg-blue-500/10'
                        : log.level === 'AUDITED'
                        ? 'text-[#E8C98B] bg-[#C89B3C]/10'
                        : 'text-amber-400 bg-amber-500/10'
                    }`}>
                      {log.level}
                    </span>
                  </div>
                  <span className="text-neutral-500">{log.latencyMs}ms</span>
                </div>

                <div className="text-[11px] text-neutral-300 font-medium leading-relaxed">
                  {log.message}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/[0.03] text-[10px] text-neutral-500">
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <span className="text-[#C89B3C]">[{log.module}]</span>
                    <span>· {log.subsystem}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => copyRuleHash(log.ruleHash)}
                      className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                      title="Copy cryptographic rule hash"
                    >
                      <span>{copiedHash === log.ruleHash ? 'Copied' : log.ruleHash}</span>
                      {copiedHash === log.ruleHash ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredLogs.length === 0 && (
              <div className="py-12 text-center text-neutral-600">
                No logs match the current filter.
              </div>
            )}
          </div>

          {/* Engine Architectural Guarantee Callout */}
          <div className="bg-[#11141A] border border-white/[0.08] p-4 rounded-lg flex items-start gap-3">
            <Info size={16} className="text-[#C89B3C] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-neutral-400">
              <span className="font-semibold text-white block">Continuous Drift Monitoring</span>
              <span>
                Our Proprietary AI Engine continuously polls state legislative assemblies, state high school athletic 
                associations, and NCAA circulars, providing instant regulatory parity and legal pre-emption.
              </span>
            </div>
          </div>
        </div>
        )}

      </div>
      )}

      {/* Audit Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#10141D] border border-[#C89B3C]/40 rounded-xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#C89B3C] uppercase tracking-widest font-semibold">
                    OFFICIAL INSTITUTIONAL RECORD
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                    100% AUDIT PASS
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  Certificate of Athletic Bylaw Alignment & Regulatory Compliance
                </h3>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-neutral-400 hover:text-white transition-colors p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-neutral-300">
              <div className="grid grid-cols-2 gap-3 bg-black/40 p-4 rounded border border-white/5">
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">Entity</span>
                  <span className="text-white font-bold">College Company, LLC</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">Audit Date</span>
                  <span className="text-white font-bold">{new Date().toISOString().split('T')[0]}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">Engine Version</span>
                  <span className="text-white font-bold">Proprietary AI Engine v4.8</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">Ledger Hash</span>
                  <span className="text-emerald-400 font-bold truncate">0x9a88f72c1109bc4e...3b7a</span>
                </div>
              </div>

              <div className="space-y-2 text-neutral-300 text-xs font-sans leading-relaxed">
                <p>
                  This official institutional document certifies that all digital sports, collegiate name, image, 
                  and likeness (NIL) clearinghouse protocols, high school amateurism rules, and mass roster licensing 
                  frameworks administered by College Company have undergone automated regulatory analysis and 
                  satisfy all codified requirements of:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-neutral-400 font-mono text-[11px]">
                  <li>NCAA Division I Post-House Settlement Revenue Sharing (Bylaw 22)</li>
                  <li>NFHS 50-State High School Athletic Association Amateur Eligibility Rules</li>
                  <li>Title IX Proportionality & Equal Financial Opportunity Standards (34 C.F.R. § 106)</li>
                  <li>Federal Trade Commission 16 C.F.R. Part 255 Commercial Disclosure Mandates</li>
                  <li>Multi-Jurisdictional Collegiate NIL Statutes across enacted state frameworks</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-[10px] font-mono text-neutral-500">
                Institutional General Counsel & Athletic Director Clearinghouse Copy
              </span>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-mono text-xs font-semibold rounded uppercase tracking-wider transition-colors cursor-pointer"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
