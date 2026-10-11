import React, { useState, useMemo, useEffect } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  FileText, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Download, 
  BookOpen, 
  ExternalLink, 
  Sliders, 
  Building2, 
  Users, 
  Award, 
  Sparkles, 
  FileCheck2, 
  Filter, 
  X, 
  Send, 
  Clock, 
  Check, 
  Printer, 
  HelpCircle,
  Cpu,
  Flag,
  Tv,
  HeartPulse,
  Lock
} from 'lucide-react';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../src/firebase';

export interface RegulatoryCharter {
  id: string;
  code: string;
  title: string;
  category: 'NCAA & Eligibility' | 'NIL & Financial' | 'Division Rulebooks' | 'Health & Equity' | 'Broadcast & IP';
  authority: string;
  effectiveDate: string;
  revision: string;
  summary: string;
  riskSeverity: 'Critical Mandate' | 'High Compliance' | 'Standard Protocol';
  articles: {
    section: string;
    heading: string;
    text: string;
    enforcement: string;
  }[];
  keyChecklistItems: string[];
}

export const COMPLIANCE_CHARTERS: RegulatoryCharter[] = [
  {
    id: 'ncaa-dual-eligibility',
    code: 'BYLAW-ATH-14.2',
    title: 'NCAA & NAIA Dual-Eligibility Bylaws & Amateurism Shield',
    category: 'NCAA & Eligibility',
    authority: 'Intercollegiate Athletic Regulatory Council & Faculty Senate Committee',
    effectiveDate: 'Academic Year 2025-2026',
    revision: 'Rev 4.2 (Codified)',
    riskSeverity: 'Critical Mandate',
    summary: 'Codifies the strict legal firewall ensuring student-athletes competing in College Company sanctioned digital sports retain 100% NCAA/NAIA scholarship standing and intercollegiate amateur eligibility.',
    articles: [
      {
        section: 'Section 1.1',
        heading: 'Separation of Tournament Prize Purses vs Direct Institutional Compensation',
        text: 'All tournament prize monies won by rostered collegiate competitors are directed into institutionally monitored educational trusts or distributed via approved state NIL escrow mechanisms, preventing direct pay-for-play reclassification under NCAA amateurism guidelines.',
        enforcement: 'Mandatory annual audit of roster prize accounts by independent collegiate CPA.'
      },
      {
        section: 'Section 1.2',
        heading: 'Academic Progress Rate (APR) & Scholastic Standing',
        text: 'All varsity competitors must maintain full-time enrollment (minimum 12 credit hours per semester) and maintain a cumulative scholastic grade point average of 2.0 or higher. Academic probation triggers immediate suspension from sanctioned varsity matches.',
        enforcement: 'Bi-semester registrar verification submitted to League Commissioner.'
      },
      {
        section: 'Section 1.3',
        heading: 'Non-Interference with NCAA Core Varsity Obligations',
        text: 'No College Company sanctioned match, regional flight dome drone race, or sim racing tournament may be scheduled in conflict with an athlete’s official NCAA/NAIA varsity travel, practice, or academic exam blackout window.',
        enforcement: 'Automatic match reschedule upon 48-hour athletic director notification.'
      }
    ],
    keyChecklistItems: [
      'Athletic director verified dual-enrollment roster filings',
      'Cumulative 2.0+ GPA registrar certification for all active competitors',
      'Prize purse educational trust escrow account designation on file'
    ]
  },
  {
    id: 'title-ix-digital-equity',
    code: 'REG-T9-2026',
    title: 'Title IX Digital Athletic Equity & Gender Parity Standard',
    category: 'Health & Equity',
    authority: 'Collegiate Civil Rights & Intercollegiate Athletic Equity Directorate',
    effectiveDate: 'Academic Year 2025-2026',
    revision: 'Rev 3.0',
    riskSeverity: 'Critical Mandate',
    summary: 'Universal compliance standard mandating gender roster equity, equal high-performance PC/motion rig allocation, co-ed varsity scholarship disbursement, and zero-tolerance voice comm harassment.',
    articles: [
      {
        section: 'Section 2.1',
        heading: 'Proportional Facility & Hardware Allocation',
        text: 'Member campuses must ensure equal access to on-campus varsity gaming arenas, broadcast suites, and sim racing pods for women’s and co-ed teams, maintaining a minimum 50% reserved training window priority during peak hours.',
        enforcement: 'Facility booking log audits conducted semi-annually by Title IX coordinator.'
      },
      {
        section: 'Section 2.2',
        heading: 'Zero-Tolerance Anti-Harassment & Voice Comm Moderation',
        text: 'All intercollegiate tournament voice and text communications are recorded and monitored by automated sentiment and profanity filtration. Any gender-based harassment, hate speech, or targeted griefing incurs immediate match forfeiture and minimum 1-year league disqualification.',
        enforcement: 'Immediate referral to university Title IX office and permanent player ban.'
      },
      {
        section: 'Section 2.3',
        heading: 'Female & Non-Binary Leadership in Coaching & Operations',
        text: 'Campus athletic departments are incentivized through league grant subsidies to recruit and maintain qualified female coaching, athletic training, and broadcast engineering personnel across all sponsored divisions.',
        enforcement: 'Annual diversity, equity, and inclusion report card filed with league office.'
      }
    ],
    keyChecklistItems: [
      'On-campus arena training hours logged with equal gender parity',
      'League automated anti-harassment voice monitoring activated',
      'Campus Title IX officer registered in league compliance dispatch'
    ]
  },
  {
    id: 'nil-uniform-escrow',
    code: 'NIL-ESC-88',
    title: 'Uniform Student-Athlete NIL Escrow & State Statutory Disclosure Standard',
    category: 'NIL & Financial',
    authority: 'College Esports NIL Governance Directorate & General Counsel Advisory',
    effectiveDate: 'Spring 2025 (Active)',
    revision: 'Rev 2.8',
    riskSeverity: 'Critical Mandate',
    summary: 'National operating standard for collegiate digital athlete commercial endorsements, automated state disclosure filings, pre-funded escrow accounts, and predatory contract shielding.',
    articles: [
      {
        section: 'Section 3.1',
        heading: '100% Pre-Funded Escrow Depository Requirement',
        text: 'All commercial brands and corporate sponsors contracting with student-athletes on the College Esports NIL platform must deposit 100% of agreed compensation into bonded institutional escrow prior to campaign activation.',
        enforcement: 'Automated smart-contract escrow release contingent on verified deliverable.'
      },
      {
        section: 'Section 3.2',
        heading: 'Categorical Product Prohibitions',
        text: 'Student-athletes are strictly prohibited from entering into NIL agreements featuring sports gambling, casino wagering, alcoholic beverages, cannabis/tobacco, predatory payday loans, or unregulated athletic supplements.',
        enforcement: 'Contract nullification, forfeiture of compensation, and 90-day suspension.'
      },
      {
        section: 'Section 3.3',
        heading: 'Automated 72-Hour Athletic Directorate Notification',
        text: 'Every executed student-athlete agreement triggers an immediate digital filing delivered to the university’s compliance director, fulfilling statutory disclosure requirements across all 50 states.',
        enforcement: 'Automated digital API transmission with cryptographic timestamp.'
      }
    ],
    keyChecklistItems: [
      'University NIL compliance officer endpoint configured in dispatch',
      'Student competitors signed acknowledgment of prohibited brand categories',
      '100% escrow pre-funding policy ratified by campus athletics board'
    ]
  },
  {
    id: 'cdrl-drone-faa-airspace',
    code: 'AERO-CDRL-501',
    title: 'Collegiate Drone Racing (CDRL) FAA Part 107 Airspace & Safety Code',
    category: 'Division Rulebooks',
    authority: 'National Aeronautics Intercollegiate Flight Board & FAA Liaison Taskforce',
    effectiveDate: 'Fall 2025',
    revision: 'Rev 5.1',
    riskSeverity: 'High Compliance',
    summary: 'FAA-compliant airspace containment standards, 5.8 GHz video frequency management, tethered fail-safe kill switches, and campus flight dome barrier engineering specifications.',
    articles: [
      {
        section: 'Section 4.1',
        heading: 'High-Impact Kevlar & Polycarbonate Containment Barrier',
        text: 'Any drone race conducted on university grounds must take place inside an approved containment enclosure capable of withstanding 120 mph direct impacts without perforation, utilizing high-tensile dyneema netting.',
        enforcement: 'Pre-flight safety inspection certificate signed by FAA Part 107 pilot.'
      },
      {
        section: 'Section 4.2',
        heading: 'Licensed Remote Pilot in Command (RPIC) Mandatory Presence',
        text: 'A certified FAA Part 107 Remote Pilot in Command must be physically present at the flight line during all armed battery operations, holding master override authority over the central RF kill-switch.',
        enforcement: 'Pilot license verification and emergency shutoff testing prior to heat.'
      },
      {
        section: 'Section 4.3',
        heading: 'Video Transmission Frequency Coordination (5.8 GHz)',
        text: 'All FPV drone transmitters must operate on certified Raceband frequencies with power output strictly capped at 25mW indoors and 200mW in outdoor domes to eliminate interference with campus public safety networks.',
        enforcement: 'Spectrum analyzer inspection conducted prior to gate assignment.'
      }
    ],
    keyChecklistItems: [
      'Certified FAA Part 107 safety officer designated for campus dome',
      'Flight containment netting rated for 120 mph projectile impacts',
      'Radio frequency spectrum authorization filed with campus IT infrastructure'
    ]
  },
  {
    id: 'crl-sim-racing-telemetry',
    code: 'MOTO-CRL-302',
    title: 'CRL Sim Motorsports Technical Scrutineering & Hardware Calibrations',
    category: 'Division Rulebooks',
    authority: 'Collegiate Racing League Technical Scrutineering Division',
    effectiveDate: 'Academic Year 2025-2026',
    revision: 'Rev 2.4',
    riskSeverity: 'Standard Protocol',
    summary: 'Hardware parity standards for direct-drive wheelbases (capped at 15 Nm), pedal load cell calibrations, centralized server physics parity, and CAN-bus telemetry incident review.',
    articles: [
      {
        section: 'Section 5.1',
        heading: 'Direct-Drive Torque Ceiling & Safety Cutout',
        text: 'To guarantee athletic parity and protect competitor wrists, all direct-drive wheelbases must be software-governed to a maximum peak torque of 15 Nm, with emergency e-stop switches accessible within arm’s reach.',
        enforcement: 'Automated telemetry query verifies force feedback limits during warm-up lap.'
      },
      {
        section: 'Section 5.2',
        heading: 'Physics Server Parity & Fixed Setup Scrutineering',
        text: 'All sanctioned collegiate races utilize centrally locked setup baselines. Tire pressures, aerodynamic downforce angles, and fuel loads are synchronized across all chassis to isolate driver skill.',
        enforcement: 'Checksum verification on garage configuration prior to grid formation.'
      },
      {
        section: 'Section 5.3',
        heading: 'Post-Race Incident Telemetry Arbitrations',
        text: 'Contested on-track collisions are adjudicated by the CRL Stewards Office using steering angle, brake pressure, and lateral acceleration telemetry logs. Penalties range from 5-second time additions to grid demotions.',
        enforcement: 'Official stewards ruling published within 2 hours of checkered flag.'
      }
    ],
    keyChecklistItems: [
      'Direct-drive wheelbases calibrated with physical e-stop switches',
      'Official league fixed setup baselines loaded on varsity simulation rigs',
      'Telemetry data logging connection verified with central league server'
    ]
  },
  {
    id: 'media-fast-syndication',
    code: 'MEDIA-FAST-77',
    title: 'Campus Tournament Media Rights & Broadcast Syndication Charter',
    category: 'Broadcast & IP',
    authority: 'College Esports TV Broadcast Governance Council',
    effectiveDate: 'Spring 2025',
    revision: 'Rev 3.6',
    riskSeverity: 'Standard Protocol',
    summary: 'Guidelines for student broadcast engineers, 1080p60 SRT/NDI uplink parameters, 60-second anti-ghosting delays, university trademark licensing, and clean feed carriage on College Esports TV.',
    articles: [
      {
        section: 'Section 6.1',
        heading: 'Student Production Crew Accreditation & Educational Hours',
        text: 'All campus live stream broadcasts must incorporate student directors, camera operators, and shoutcasters, earning accredited practical media hours toward university journalism degrees.',
        enforcement: 'Educational hour certification issued by College Company media division.'
      },
      {
        section: 'Section 6.2',
        heading: 'Broadcast Delay & Match Integrity Feed Isolation',
        text: 'All live outgoing tournament video transmissions must maintain an unalterable minimum 60-second broadcast delay to prevent competitive espionage or spectator information sharing.',
        enforcement: 'Uplink server latency audit verified prior to pre-match broadcast.'
      },
      {
        section: 'Section 6.3',
        heading: 'University Trademark & Crest Co-Branding Guidelines',
        text: 'Use of official university athletics crests, mascot typography, and institutional colors in broadcast overlays must strictly comply with campus brand style guides and non-exclusive commercial licenses.',
        enforcement: 'Automated visual graphic package review by campus licensing director.'
      }
    ],
    keyChecklistItems: [
      'Broadcast delay software calibrated to 60-second minimum buffer',
      'Campus trademark license clearance on file with league broadcast desk',
      'Student production crew enrolled in certified educational accreditation'
    ]
  },
  {
    id: 'college-esports-med-health',
    code: 'HLTH-MED-104',
    title: 'Student-Athlete Ergonomics, Screen Hygiene & Health Protocol',
    category: 'Health & Equity',
    authority: 'Collegiate Sports Medicine & Neuroergonomics Taskforce',
    effectiveDate: 'Academic Year 2025-2026',
    revision: 'Rev 1.9',
    riskSeverity: 'High Compliance',
    summary: 'Institutional health standard mandating eye-strain reset intervals, repetitive strain injury (RSI) prevention, orthopedic hand screenings, and mental performance counselor accessibility.',
    articles: [
      {
        section: 'Section 7.1',
        heading: 'Maximum Continuous Roster Training Caps',
        text: 'Varsity rosters are restricted to a maximum of 4 continuous hours of competitive in-game scrimmage per 24-hour cycle. Mandatory 15-minute ergonomic stretch and ophthalmological rest breaks must occur every 90 minutes.',
        enforcement: 'Campus facility managers must enforce arena lighting and rest rotations.'
      },
      {
        section: 'Section 7.2',
        heading: 'Annual Carpal Tunnel & Postural Ergonomic Screenings',
        text: 'All varsity rostered athletes must receive an annual orthopedic wrist/hand screening and biomechanical posture evaluation through the university sports medicine department or College Esports Med clinic network.',
        enforcement: 'Medical clearance slip signed prior to competitive tournament roster submission.'
      },
      {
        section: 'Section 7.3',
        heading: 'Mental Health & High-Performance Cognitive Support',
        text: 'Member campuses must provide rostered digital athletes with dedicated access to licensed collegiate sports psychologists to address performance anxiety, burnout, and academic balance.',
        enforcement: 'University wellness liaison designated in athletic department filing.'
      }
    ],
    keyChecklistItems: [
      'Ergonomic 90-minute break timer implemented in varsity gaming arena',
      'Annual orthopedic hand & wrist clearance completed for active roster',
      'Collegiate mental performance counseling resource assigned to team'
    ]
  },
  {
    id: 'anti-cheat-integrity-tribunal',
    code: 'INTEG-CODE-09',
    title: 'Intercollegiate Anti-Cheating, Match Integrity & Arbitral Sanctions Code',
    category: 'NCAA & Eligibility',
    authority: 'Collegiate Esports Integrity & Disciplinary Tribunal',
    effectiveDate: 'Academic Year 2025-2026',
    revision: 'Rev 4.0',
    riskSeverity: 'Critical Mandate',
    summary: 'Zero-tolerance sports betting prohibitions, kernel-level client integrity verification, tournament memory inspection protocols, and arbitral tribunal appellate proceedings.',
    articles: [
      {
        section: 'Section 8.1',
        heading: 'Absolute Prohibition of Sports Wagering & Match Collusion',
        text: 'Rostered student-athletes, varsity coaches, tournament administrators, and broadcast personnel are strictly prohibited from placing any wager on any collegiate digital competition worldwide, directly or through third-party intermediaries.',
        enforcement: 'Immediate lifetime ban from all intercollegiate digital athletics and NCAA notice.'
      },
      {
        section: 'Section 8.2',
        heading: 'Mandatory Device Telemetry & Memory Inspection Consent',
        text: 'All competitive machines connected to the tournament arena network must execute sanctioned anti-cheat software with kernel-level memory monitoring to identify injected DLLs, macros, or unauthorized external overlays.',
        enforcement: 'Refusal of inspection or positive detection triggers immediate match disqualification.'
      },
      {
        section: 'Section 8.3',
        heading: 'Due Process & Three-Member Arbitral Appeal Tribunal',
        text: 'Any athlete or university facing sanctions has the right to a formal expedited evidentiary hearing before a three-member appellate tribunal comprising an athletic director, an independent gaming attorney, and a student-athlete representative.',
        enforcement: 'Final binding arbitration ruling delivered within 7 business days.'
      }
    ],
    keyChecklistItems: [
      'All active roster athletes signed annual sports wagering prohibition oath',
      'Kernel-level anti-cheat client verified on all campus competition rigs',
      'Campus athletic director designated for arbitral tribunal notifications'
    ]
  }
];

export const ComplianceRepositoryPortal: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
  embedded?: boolean;
}> = ({ isOpen = true, onClose, embedded = false }) => {
  // Navigation & View States: 'charters' | 'self_audit' | 'ruling_request'
  const [activeTab, setActiveTab] = useState<'charters' | 'self_audit' | 'ruling_request'>('charters');
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCharter, setSelectedCharter] = useState<RegulatoryCharter>(COMPLIANCE_CHARTERS[0]);

  // Self-Audit Checklist State (stored in localStorage for persistence)
  const [checkedAuditItems, setCheckedAuditItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cc_compliance_audit');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Ruling Request Form State
  const [inquiryForm, setInquiryForm] = useState({
    institution: '',
    submitterName: '',
    submitterTitle: 'Associate Athletic Director',
    submitterEmail: '',
    bylawCategory: 'NCAA & Amateur Eligibility',
    subject: '',
    inquiryDetails: '',
    urgency: 'Standard (3-5 Days)'
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [submittedInquiries, setSubmittedInquiries] = useState<any[]>([]);

  // Filtered Charters
  const filteredCharters = useMemo(() => {
    return COMPLIANCE_CHARTERS.filter((c) => {
      const matchesSearch = 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.authority.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Calculate Overall Institutional Compliance Audit Score
  const allChecklistItems = useMemo(() => {
    const items: { charterId: string; charterTitle: string; item: string }[] = [];
    COMPLIANCE_CHARTERS.forEach((c) => {
      c.keyChecklistItems.forEach((item) => {
        items.push({ charterId: c.id, charterTitle: c.title, item });
      });
    });
    return items;
  }, []);

  const auditScore = useMemo(() => {
    const total = allChecklistItems.length;
    const completed = allChecklistItems.filter((it) => checkedAuditItems[`${it.charterId}__${it.item}`]).length;
    return {
      total,
      completed,
      percentage: Math.round((completed / (total || 1)) * 100)
    };
  }, [allChecklistItems, checkedAuditItems]);

  const toggleAuditItem = (charterId: string, item: string) => {
    const key = `${charterId}__${item}`;
    setCheckedAuditItems((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('cc_compliance_audit', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectAllAudit = () => {
    const allChecked: Record<string, boolean> = {};
    allChecklistItems.forEach(it => {
      allChecked[`${it.charterId}__${it.item}`] = true;
    });
    setCheckedAuditItems(allChecked);
    localStorage.setItem('cc_compliance_audit', JSON.stringify(allChecked));
  };

  const handleResetAudit = () => {
    setCheckedAuditItems({});
    localStorage.removeItem('cc_compliance_audit');
  };

  // Handle Formal Ruling Request Submission (writes to Firestore)
  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.institution || !inquiryForm.submitterEmail || !inquiryForm.subject) return;

    setIsSubmittingInquiry(true);
    const trackingTicket = `TICK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInquiry = {
      id: trackingTicket,
      institution: inquiryForm.institution,
      submitterName: inquiryForm.submitterName,
      submitterTitle: inquiryForm.submitterTitle,
      submitterEmail: inquiryForm.submitterEmail,
      bylawCategory: inquiryForm.bylawCategory,
      subject: inquiryForm.subject,
      inquiryDetails: inquiryForm.inquiryDetails,
      urgency: inquiryForm.urgency,
      status: 'Under Review by Rules Committee',
      submittedAt: new Date().toISOString()
    };

    try {
      const colRef = collection(db, 'compliance_inquiries');
      await addDoc(colRef, {
        ...newInquiry,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn("Could not save to Firestore, saving to local state:", err);
    }

    setSubmittedInquiries(prev => [newInquiry, ...prev]);
    setIsSubmittingInquiry(false);
    setInquirySubmitted(true);
  };

  // Download / Print Codified Charter Summary
  const handleDownloadCharter = (charter: RegulatoryCharter) => {
    const content = `
=============================================================================
COLLEGE COMPANY · INTERCOLLEGIATE REGULATORY REPOSITORY
OFFICIAL CODIFIED REGULATORY CHARTER & COMPLIANCE MANDATE
=============================================================================
DOCUMENT CODE: ${charter.code}
DOCUMENT TITLE: ${charter.title}
REGULATORY CATEGORY: ${charter.category}
GOVERNING AUTHORITY: ${charter.authority}
EFFECTIVE DATE: ${charter.effectiveDate} | REVISION: ${charter.revision}
CLASSIFICATION: ${charter.riskSeverity}

EXECUTIVE SUMMARY:
${charter.summary}

-----------------------------------------------------------------------------
CODIFIED ARTICLES & ENFORCEMENT PROVISIONS:
-----------------------------------------------------------------------------
${charter.articles.map(a => `
[${a.section}] ${a.heading}
PROVISION: ${a.text}
ENFORCEMENT: ${a.enforcement}
`).join('\n')}

-----------------------------------------------------------------------------
MANDATORY INSTITUTIONAL COMPLIANCE CHECKLIST:
-----------------------------------------------------------------------------
${charter.keyChecklistItems.map((item, idx) => `[  ] ${idx + 1}. ${item}`).join('\n')}

=============================================================================
CERTIFIED BY THE INTERCOLLEGIATE RULES COMMISSION · BOSTON MASSACHUSETTS
FOR AUTHORIZED UNIVERSITY ATHLETIC DEPARTMENT ARCHIVAL ONLY
=============================================================================
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${charter.code}_Official_Codified_Charter.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!embedded && !isOpen) return null;

  const contentMarkup = (
    <div className="bg-[#0B0E14] border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-2xl relative font-sans text-neutral-200">
      
      {/* Portal Top Header */}
      <div className="bg-[#0F131B] border-b border-white/10 px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#161B24] border border-[#C89B3C]/50 flex items-center justify-center text-[#E8C98B] shadow-md shrink-0">
            <Scale size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C89B3C]">
                Institutional Governance Archive
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#68D391]/10 text-[#68D391] border border-[#68D391]/20">
                <CheckCircle2 size={10} /> Codified 2025-2026
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
              Rules & Athletic Compliance Repository
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Authoritative charters, amateurism bylaws, Title IX equity standards, and division rulebooks for member institutions.
            </p>
          </div>
        </div>

        {/* Portal Action Navigation */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center bg-[#07090D] p-1 rounded-sm border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('charters')}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'charters' 
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <BookOpen size={13} />
              <span>Charters ({COMPLIANCE_CHARTERS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('self_audit')}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'self_audit' 
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileCheck2 size={13} />
              <span>Self-Audit ({auditScore.percentage}%)</span>
            </button>
            <button
              onClick={() => setActiveTab('ruling_request')}
              className={`px-3 py-1.5 rounded-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'ruling_request' 
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-sm' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <HelpCircle size={13} />
              <span>Ruling Request</span>
            </button>
          </div>

          {!embedded && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/10 transition-colors ml-2"
              title="Close portal"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Main Body View Switching */}
      <div className="flex-1 overflow-hidden flex flex-col">
        
        {/* ========================================================================= */}
        {/* VIEW 1: REGULATORY CHARTERS & CODIFIED INSPECTOR */}
        {/* ========================================================================= */}
        {activeTab === 'charters' && (
          <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
            
            {/* Left Sidebar: Charter Directory & Search */}
            <div className="w-full lg:w-96 border-r border-white/10 bg-[#090C10] flex flex-col shrink-0">
              
              {/* Search & Filter Header */}
              <div className="p-4 border-b border-white/10 space-y-3 bg-[#0D1016]">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bylaws, Title IX, FAA drone..."
                    className="w-full bg-[#121620] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 font-mono"
                  />
                </div>

                <div className="flex flex-wrap gap-1 text-[11px] font-mono">
                  {['All', 'NCAA & Eligibility', 'NIL & Financial', 'Division Rulebooks', 'Health & Equity'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-0.5 rounded transition-all ${
                        selectedCategory === cat 
                          ? 'bg-[#C89B3C] text-[#090A0C] font-bold' 
                          : 'text-neutral-400 hover:text-white bg-[#141822]'
                      }`}
                    >
                      {cat.replace(' & ', '/')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Charters List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredCharters.map((charter) => {
                  const isSelected = selectedCharter.id === charter.id;
                  return (
                    <button
                      key={charter.id}
                      onClick={() => setSelectedCharter(charter)}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all flex flex-col gap-1.5 ${
                        isSelected 
                          ? 'bg-[#151A24] border-[#C89B3C]/60 text-white shadow-md' 
                          : 'bg-[#0E1118] border-white/5 text-neutral-300 hover:border-white/20 hover:bg-[#121620]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="font-semibold text-[#E8C98B] bg-[#C89B3C]/10 px-1.5 py-0.5 rounded border border-[#C89B3C]/20">
                          {charter.code}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded ${
                          charter.riskSeverity === 'Critical Mandate' 
                            ? 'text-red-400 bg-red-950/40' 
                            : 'text-[#68D391] bg-emerald-950/40'
                        }`}>
                          {charter.riskSeverity}
                        </span>
                      </div>

                      <div className="text-xs font-bold font-display line-clamp-2 leading-snug">
                        {charter.title}
                      </div>

                      <div className="text-[11px] text-neutral-400 font-mono line-clamp-1">
                        {charter.authority}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Quick Footer */}
              <div className="p-3 bg-[#0C0F15] border-t border-white/10 text-[10px] font-mono text-neutral-500 flex justify-between items-center">
                <span>Showing {filteredCharters.length} of {COMPLIANCE_CHARTERS.length} Codified Charters</span>
                <span>Updated Daily</span>
              </div>
            </div>

            {/* Right Main Panel: Codified Charter Inspector & Articles */}
            <div className="flex-1 bg-[#0E1118] overflow-y-auto p-6 lg:p-8 space-y-8">
              
              {/* Header Card for Selected Charter */}
              <div className="bg-[#121622] border border-white/10 rounded-xl p-6 lg:p-7 space-y-4 shadow-xl relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#C89B3C]/15 text-[#E8C98B] border border-[#C89B3C]/30">
                      {selectedCharter.code}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {selectedCharter.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">·</span>
                    <span className="text-xs font-mono text-neutral-400">
                      {selectedCharter.revision}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadCharter(selectedCharter)}
                      className="px-3 py-1.5 bg-[#1B202D] hover:bg-[#23293A] border border-white/10 text-white rounded text-xs font-mono transition-colors flex items-center gap-1.5"
                      title="Download Codified Charter"
                    >
                      <Download size={13} className="text-[#C89B3C]" />
                      <span>Export Charter</span>
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                  {selectedCharter.title}
                </h3>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                  {selectedCharter.summary}
                </p>

                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Building2 size={13} className="text-[#C89B3C]" />
                    <span>Authority: <strong>{selectedCharter.authority}</strong></span>
                  </div>
                  <div>
                    <span>Effective: <strong className="text-white">{selectedCharter.effectiveDate}</strong></span>
                  </div>
                </div>
              </div>

              {/* Codified Articles Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-base font-bold font-display text-white flex items-center gap-2">
                    <FileText size={16} className="text-[#C89B3C]" />
                    <span>Codified Regulatory Articles & Statutory Sections</span>
                  </h4>
                  <span className="text-xs font-mono text-neutral-500">
                    {selectedCharter.articles.length} Enforceable Sections
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedCharter.articles.map((article, index) => (
                    <div
                      key={index}
                      className="bg-[#121620] border border-white/10 rounded-lg p-5 space-y-2.5 transition-all hover:border-white/20"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#E8C98B] font-bold">{article.section}</span>
                        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Statutory Provision</span>
                      </div>

                      <h5 className="text-sm font-bold font-display text-white">
                        {article.heading}
                      </h5>

                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {article.text}
                      </p>

                      <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-neutral-400 bg-[#0A0D12] p-2.5 rounded">
                        <ShieldCheck size={13} className="text-[#68D391] shrink-0" />
                        <span>Enforcement: <strong className="text-neutral-200">{article.enforcement}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mandatory Self-Audit Items for this Charter */}
              <div className="bg-[#141924] border border-[#C89B3C]/30 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-semibold flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    <span>Campus Verification Checklist for this Bylaw</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('self_audit')}
                    className="text-xs font-mono text-[#E8C98B] hover:text-white flex items-center gap-1 underline"
                  >
                    <span>View Full 24-Point Audit</span>
                    <ChevronRight size={12} />
                  </button>
                </div>

                <div className="space-y-2">
                  {selectedCharter.keyChecklistItems.map((item, idx) => {
                    const isChecked = !!checkedAuditItems[`${selectedCharter.id}__${item}`];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleAuditItem(selectedCharter.id, item)}
                        className={`p-3 rounded border text-xs font-mono cursor-pointer transition-all flex items-center gap-3 ${
                          isChecked 
                            ? 'bg-[#121B17] border-[#68D391]/40 text-neutral-200' 
                            : 'bg-[#0E1118] border-white/10 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-[#68D391] border-[#68D391] text-[#090A0C]' : 'border-white/30'
                        }`}>
                          {isChecked && <Check size={11} className="stroke-[3]" />}
                        </div>
                        <span className={isChecked ? 'line-through text-neutral-400' : ''}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: INTERACTIVE SELF-AUDIT & READINESS CHECKLIST */}
        {/* ========================================================================= */}
        {activeTab === 'self_audit' && (
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 bg-[#0E1118]">
            
            {/* Audit Score Banner */}
            <div className="bg-[#121622] border border-white/10 rounded-xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 max-w-xl text-center md:text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C89B3C]">
                  Athletic Director Compliance Verification
                </span>
                <h3 className="text-2xl font-bold font-display text-white">
                  Institutional Readiness Audit Score
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  Evaluate your campus standing across dual-eligibility amateurism, Title IX equity, state NIL disclosures, and drone/sim racing division protocols.
                </p>
              </div>

              {/* Dynamic Meter Circle / Score Box */}
              <div className="flex items-center gap-6 bg-[#0A0D12] p-5 rounded-xl border border-white/10 shrink-0">
                <div className="text-center">
                  <div className="text-4xl font-bold font-mono text-[#E8C98B] tracking-tight">
                    {auditScore.percentage}%
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase mt-0.5">
                    {auditScore.completed} of {auditScore.total} Verified
                  </div>
                </div>

                <div className="w-[1px] h-12 bg-white/10"></div>

                <div className="space-y-1.5 text-xs font-mono">
                  <button
                    onClick={handleSelectAllAudit}
                    className="px-3 py-1 bg-[#1A202C] hover:bg-[#252E3E] text-white rounded text-[11px] block w-full text-center transition-colors"
                  >
                    Check All Verified
                  </button>
                  <button
                    onClick={handleResetAudit}
                    className="px-3 py-1 bg-transparent hover:bg-white/5 text-neutral-400 text-[11px] block w-full text-center transition-colors"
                  >
                    Reset Checklist
                  </button>
                </div>
              </div>
            </div>

            {/* Checklist Categorized Sections */}
            <div className="space-y-6">
              {COMPLIANCE_CHARTERS.map((charter) => (
                <div key={charter.id} className="bg-[#11141D] border border-white/10 rounded-xl p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#E8C98B] bg-[#C89B3C]/10 px-2 py-0.5 rounded border border-[#C89B3C]/20">
                        {charter.code}
                      </span>
                      <h4 className="text-sm font-bold font-display text-white">
                        {charter.title}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {charter.category}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3">
                    {charter.keyChecklistItems.map((item, idx) => {
                      const isChecked = !!checkedAuditItems[`${charter.id}__${item}`];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleAuditItem(charter.id, item)}
                          className={`p-3.5 rounded-lg border text-xs font-mono cursor-pointer transition-all flex items-start gap-3 select-none ${
                            isChecked 
                              ? 'bg-[#121B17] border-[#68D391]/40 text-neutral-200 shadow-sm' 
                              : 'bg-[#0E1118] border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-[#68D391] border-[#68D391] text-[#090A0C]' : 'border-white/30'
                          }`}>
                            {isChecked && <Check size={11} className="stroke-[3]" />}
                          </div>
                          <span className={`leading-relaxed ${isChecked ? 'line-through text-neutral-400' : ''}`}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: FORMAL COMPLIANCE RULING & VARIANCE REQUEST */}
        {/* ========================================================================= */}
        {activeTab === 'ruling_request' && (
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 bg-[#0E1118]">
            
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="bg-[#121622] border border-white/10 rounded-xl p-6 lg:p-7 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C89B3C]">
                  Official Regulatory Petition
                </span>
                <h3 className="text-2xl font-bold font-display text-white">
                  Request Interpretative Ruling or Variance
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  Member athletic directors, compliance attorneys, and varsity leads may submit formal petitions to the Intercollegiate Rules Commission for expedited ruling on student amateurism, facility variances, or NIL brand clearance.
                </p>
              </div>

              {inquirySubmitted ? (
                <div className="bg-[#121A16] border border-[#68D391]/40 rounded-xl p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#68D391]/20 border border-[#68D391] text-[#68D391] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">
                    Compliance Petition Docketed
                  </h4>
                  <p className="text-xs text-neutral-300 font-mono max-w-md mx-auto leading-relaxed">
                    Your request has been filed in the Intercollegiate Regulatory Docket. The Secretariat will issue a formal written ruling within the requested timeframe.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setInquirySubmitted(false)}
                      className="px-4 py-2 bg-[#C89B3C] text-[#090A0C] font-mono text-xs font-bold uppercase rounded"
                    >
                      Submit Another Ruling Petition
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="bg-[#121620] border border-white/10 rounded-xl p-6 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="space-y-1.5">
                      <label className="text-neutral-400">Member Institution / University</label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.institution}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, institution: e.target.value })}
                        placeholder="e.g. The Ohio State University"
                        className="w-full bg-[#0A0D12] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-neutral-400">Athletic Director / Submitter Name</label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.submitterName}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, submitterName: e.target.value })}
                        placeholder="e.g. Dr. Arthur Pendelton"
                        className="w-full bg-[#0A0D12] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-neutral-400">Institutional Email</label>
                      <input
                        type="email"
                        required
                        value={inquiryForm.submitterEmail}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, submitterEmail: e.target.value })}
                        placeholder="e.g. compliance@osu.edu"
                        className="w-full bg-[#0A0D12] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-neutral-400">Target Bylaw / Regulatory Category</label>
                      <select
                        value={inquiryForm.bylawCategory}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, bylawCategory: e.target.value })}
                        className="w-full bg-[#0A0D12] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                      >
                        <option>NCAA Dual-Eligibility & Amateurism</option>
                        <option>Title IX Digital Athletic Equity</option>
                        <option>NIL Escrow & Prohibited Brand Review</option>
                        <option>CDRL Drone Flight Safety Variance</option>
                        <option>CRL Sim Motorsport Hardware Calibrations</option>
                        <option>Broadcast Carriage & Delay Variance</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <label className="text-neutral-400">Petition Subject</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.subject}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, subject: e.target.value })}
                      placeholder="e.g. Petition for Educational Trust Disbursement Variance for Dual-Sport Athlete"
                      className="w-full bg-[#0A0D12] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded px-3 py-2 text-white"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <label className="text-neutral-400">Detailed Legal & Factual Grounds</label>
                    <textarea
                      rows={4}
                      required
                      value={inquiryForm.inquiryDetails}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, inquiryDetails: e.target.value })}
                      placeholder="Provide specific factual circumstances, student-athlete IDs (anonymized), and relevant contract provisions..."
                      className="w-full bg-[#0A0D12] border border-white/15 focus:border-[#C89B3C] focus:outline-none rounded p-3 text-white text-xs font-sans"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="text-[11px] font-mono text-neutral-500">
                      Standard review: 3-5 business days · Docketed in Firestore
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmittingInquiry}
                      className="px-6 py-2.5 bg-[#C89B3C] hover:bg-[#D4AF37] disabled:opacity-40 text-[#090A0C] font-bold font-mono text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                    >
                      <Send size={13} />
                      <span>{isSubmittingInquiry ? 'Docketing...' : 'File Official Petition'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Portal Institutional Footer */}
      <div className="p-3.5 bg-[#090C10] border-t border-white/10 px-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck size={13} className="text-[#C89B3C]" />
          <span>Intercollegiate Regulatory Secretariat · Fiduciary Document Integrity Verified</span>
        </div>
        <div>
          <span>National Sanctioning Protocol · 428 Affiliated Campuses</span>
        </div>
      </div>

    </div>
  );

  if (embedded) {
    return contentMarkup;
  }

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl h-[90vh] max-h-[860px]"
      >
        {contentMarkup}
      </div>
    </div>
  );
};
