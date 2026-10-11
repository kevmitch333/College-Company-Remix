import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Scale, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  HeartPulse, 
  FileText, 
  Layers, 
  DollarSign, 
  ExternalLink,
  Info,
  SlidersHorizontal,
  Download,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type RiskCategory = 'All' | 'Regulatory' | 'Title IX' | 'Infrastructure' | 'NIL & Escrow' | 'Student Health';

export interface RiskFactorItem {
  id: string;
  category: 'Regulatory' | 'Title IX' | 'Infrastructure' | 'NIL & Escrow' | 'Student Health';
  title: string;
  summary: string;
  inherentRisk: 'High' | 'Moderate-High' | 'Moderate';
  residualRisk: 'Very Low' | 'Low (Mitigated)';
  auditQuarter: string;
  governingBody: string;
  operationalImpact: string;
  mitigationStrategies: string[];
  monitoringMetrics: string;
}

const RISK_ITEMS: RiskFactorItem[] = [
  {
    id: 'risk-regulatory',
    category: 'Regulatory',
    title: 'Intercollegiate Regulatory Shifts & Amateur Eligibility Ring-Fencing',
    summary: 'Evolving NCAA, NAIA, and conference bylaws regarding varsity categorization, dual-eligibility, and amateur prize eligibility.',
    inherentRisk: 'Moderate-High',
    residualRisk: 'Low (Mitigated)',
    auditQuarter: 'Q3 2026 Audit',
    governingBody: 'NCAA Bylaw 14.2 & NAIA Council of Presidents',
    operationalImpact: 'Risk of amateur disqualification or retroactive sanctions if tournament payouts or collegiate brand endorsements overlap with varsity athletic payroll restrictions.',
    mitigationStrategies: [
      'Dual-Track Separation: Varsity campus play is ring-fenced as official institutional competition, while prize liquidity is structured purely as independent NIL commercial agreements.',
      'Retained Regulatory Counsel: Former NCAA compliance directors conduct quarterly reviews of all platform contracts, bylaws, and prize delivery mechanisms.',
      'Athletic Director Direct Disclosure: Real-time automated roster audit logs delivered to member university compliance officers prior to every sanctioned tournament.'
    ],
    monitoringMetrics: '0 amateur status inquiries across 150+ onboarded athletic directorates since inception.'
  },
  {
    id: 'risk-title-ix',
    category: 'Title IX',
    title: 'Title IX Gender Equity & Roster Proportionality Mandates',
    summary: 'Federal Title IX mandates requiring equitable participation opportunities, facilities, and scholarship allocations across biological genders.',
    inherentRisk: 'High',
    residualRisk: 'Very Low',
    auditQuarter: 'Q3 2026 Audit',
    governingBody: 'U.S. Dept of Education Office for Civil Rights (OCR)',
    operationalImpact: 'University institutional partners face federal civil rights exposure and funding reviews if collegiate digital sports rosters skew disproportionately male.',
    mitigationStrategies: [
      'Mandatory 50/50 Programmatic Parity: All member university chapters must sponsor co-ed or dedicated female-division competitive circuits (e.g., collegiate Valorant, Rocket League).',
      'Endowed Female Scholar-Athlete Grants: Dedicated 35% revenue carve-out from national sponsorship pools reserved for female student-athlete technology & academic scholarships.',
      'Automated Demographic Dashboards: Real-time demographic reporting embedded directly in campus provost dashboards to document compliance with OCR 3-prong proportionality tests.'
    ],
    monitoringMetrics: '41.8% active female roster representation across varsity programs, exceeding traditional collegiate digital sports benchmarks (18%).'
  },
  {
    id: 'risk-infrastructure',
    category: 'Infrastructure',
    title: 'Campus IT Infrastructure Scaling, Latency & Network Security',
    summary: 'Bandwidth saturation on campus LAN backbones, DDoS targeting during national championship broadcasts, and inter-regional latency disparity.',
    inherentRisk: 'Moderate',
    residualRisk: 'Very Low',
    auditQuarter: 'Q2 2026 Audit',
    governingBody: 'Internet2 Higher Ed Consortium & NIST 800-53',
    operationalImpact: 'Disrupted championship streams, broadcast downtime, latency imbalances that compromise competitive integrity, or campus IT department resistance to on-campus events.',
    mitigationStrategies: [
      'Dedicated Edge PoP Deployments: Low-latency Anycast routing maintaining sub-12ms ping guarantees across university fiber backbones and Internet2 research networks.',
      'Zero-Trust DDoS Scrubbing: Enterprise Cloudflare Magic Transit and hardware anti-cheat validation running at match ingress points without campus network penetration.',
      'Academic Bandwidth Isolation: Intelligent QOS (Quality of Service) rate-limiting ensuring tournament stream feeds never exceed 4% of total university perimeter bandwidth.'
    ],
    monitoringMetrics: '99.98% tournament match uptime recorded across 2,400+ intercollegiate fixtures in 2025-2026.'
  },
  {
    id: 'risk-nil-escrow',
    category: 'NIL & Escrow',
    title: 'State-Level NIL Legislative Fragmentation & Prohibited Category Filtering',
    summary: 'Patchwork of 32+ differing state NIL statutes governing mandatory disclosure timelines, prohibited commercial categories, and collective affiliations.',
    inherentRisk: 'High',
    residualRisk: 'Low (Mitigated)',
    auditQuarter: 'Q3 2026 Audit',
    governingBody: 'State Athletic Commissions & Uniform NIL Escrow Standards',
    operationalImpact: 'Student-athlete suspension resulting from untimely contract filings, or institutional brand damage caused by sponsorships from prohibited categories (sports gambling, alcohol, payday loans).',
    mitigationStrategies: [
      'Geofenced Smart Contract Escrow: Automated algorithmic validation verifies athlete state jurisdiction rules before releasing funds into athlete accounts.',
      'Strict Category Blacklist: Permanent architectural prohibition on sports wagering, adult entertainment, tobacco/vape, alcohol, and predatory financial products.',
      'API Integration with University Portals: Real-time synchronization with institutional compliance systems (ARMS, Teamworks, JumpForward) within 48 hours of deal execution.'
    ],
    monitoringMetrics: '100% of processed NIL disbursements ($14.2M+) cleared through automated compliance audit with zero state reporting violations.'
  },
  {
    id: 'risk-student-health',
    category: 'Student Health',
    title: 'Student-Athlete Academic Standing, Workload Burnout & Wellness',
    summary: 'Intense training regimens, late-night inter-regional matches, and commercial creator demands impacting academic GPA standing and mental wellness.',
    inherentRisk: 'Moderate',
    residualRisk: 'Low (Mitigated)',
    auditQuarter: 'Q3 2026 Audit',
    governingBody: 'Institutional Academic Oversight Committees & NCAA Student Health',
    operationalImpact: 'Academic ineligibility under university 2.0 GPA threshold mandates, student burnout, or athletic department resistance over balance with degree completion.',
    mitigationStrategies: [
      'Mandatory Academic First Lockouts: Automated registrar API checks; athletes dropping below 2.5 term GPA are automatically placed on competitive match hiatus.',
      'Rigid Match Curfews: Hard cutoff limiting official weekday competition fixtures to 9:30 PM local campus time to preserve student sleep schedules.',
      'Tele-Health Wellness Partnership: 24/7 access to licensed collegiate sports psychologists and certified orthopedic/ergonomic workstation consultation.'
    ],
    monitoringMetrics: 'Average network student-athlete cumulative GPA stands at 3.42, outperforming general undergraduate student bodies (3.15).'
  }
];

export const InstitutionalRiskFactors: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<RiskCategory>('All');
  const [expandedIds, setExpandedIds] = useState<string[]>(['risk-regulatory', 'risk-title-ix']);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const categories: RiskCategory[] = ['All', 'Regulatory', 'Title IX', 'Infrastructure', 'NIL & Escrow', 'Student Health'];

  const filteredRisks = useMemo(() => {
    if (selectedCategory === 'All') return RISK_ITEMS;
    return RISK_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const toggleAccordion = (id: string) => {
    setExpandedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setExpandedIds(filteredRisks.map((item) => item.id));
  };

  const handleCollapseAll = () => {
    setExpandedIds([]);
  };

  const handleCopyRiskBrief = () => {
    const text = `
COLLEGE COMPANY HOLDING GROUP INC. - INSTITUTIONAL RISK FACTORS & MITIGATION BRIEF
-----------------------------------------------------------------------------------
Fiduciary Audit Date: Q3 2026 | Board Governance Committee

${RISK_ITEMS.map((r, i) => `
${i + 1}. ${r.title}
   - Category: ${r.category} | Governing Body: ${r.governingBody}
   - Inherent Risk: ${r.inherentRisk} | Residual Risk: ${r.residualRisk}
   - Potential Impact: ${r.operationalImpact}
   - Key Mitigations:
     ${r.mitigationStrategies.map(m => `* ${m}`).join('\n     ')}
   - Track Record: ${r.monitoringMetrics}
`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  return (
    <div className="bg-[#0D1017] rounded-xl border border-white/[0.08] p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden font-sans">
      
      {/* Decorative Top Accent Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-[#C89B3C] to-emerald-500 opacity-60" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C89B3C] uppercase tracking-wider font-semibold">
            <ShieldAlert size={15} />
            <span>Fiduciary Risk Governance · Form 10-K Parity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
            Institutional Risk Factors & Mitigation Strategies
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Detailed operational, regulatory, and technological risk disclosures audited under collegiate athletic standards. 
            All mitigation protocols are supervised by external university counsel and the Athletic Advisory Directorate.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs shrink-0">
          <button
            onClick={handleCopyRiskBrief}
            className="px-3 py-1.5 bg-[#171C26] hover:bg-[#1E2533] border border-white/10 text-neutral-300 hover:text-white rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            {copiedBrief ? <Check size={13} className="text-[#68D391]" /> : <FileText size={13} className="text-[#E8C98B]" />}
            <span>{copiedBrief ? 'Brief Copied' : 'Copy Risk Brief'}</span>
          </button>

          <button
            onClick={expandedIds.length === filteredRisks.length ? handleCollapseAll : handleExpandAll}
            className="px-3 py-1.5 bg-[#131720] hover:bg-[#1A202C] border border-white/10 text-neutral-400 hover:text-white rounded transition-colors cursor-pointer"
          >
            {expandedIds.length === filteredRisks.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Category Filter Pills & Summary Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        
        {/* Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C89B3C] text-[#090A0C] font-bold shadow-md'
                  : 'bg-[#141822] text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Audit Status Pill */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-[#68D391] animate-pulse" />
          <span>Active Audit: <strong className="text-white">Q3 2026 Verified</strong></span>
        </div>
      </div>

      {/* Accordion Items List */}
      <div className="space-y-3.5 pt-2">
        {filteredRisks.map((risk) => {
          const isExpanded = expandedIds.includes(risk.id);

          return (
            <div 
              key={risk.id}
              className={`rounded-lg border transition-all duration-200 overflow-hidden ${
                isExpanded 
                  ? 'bg-[#11151E] border-[#C89B3C]/40 shadow-lg' 
                  : 'bg-[#10131A] border-white/[0.06] hover:border-white/15'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleAccordion(risk.id)}
                className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 text-left cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1">
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#181D28] text-neutral-300 border border-white/5 text-[10px] font-semibold">
                      {risk.category}
                    </span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-[10px] text-neutral-400">{risk.governingBody}</span>

                    {/* Risk Severity Badges */}
                    <span className="ml-auto sm:ml-0 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-red-950/40 text-red-300 border border-red-500/25">
                      Inherent: {risk.inherentRisk}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-950/40 text-[#68D391] border border-emerald-500/25">
                      Residual: {risk.residualRisk}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    {risk.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-sans line-clamp-1">
                    {risk.summary}
                  </p>
                </div>

                <div className="p-1.5 rounded-sm bg-[#161B26] border border-white/5 text-[#E8C98B] shrink-0 mt-1 sm:mt-0">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Accordion Expanded Detail Panel */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="border-t border-white/[0.06] bg-[#0C0F15] px-5 py-5 sm:p-6 space-y-5"
                  >
                    
                    {/* Operational Impact Box */}
                    <div className="p-3.5 bg-[#141822] rounded-md border border-red-500/20 text-xs space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                        <AlertTriangle size={12} />
                        <span>Potential Operational Impact & Threat Vector</span>
                      </div>
                      <p className="text-neutral-300 leading-relaxed font-sans">
                        {risk.operationalImpact}
                      </p>
                    </div>

                    {/* Codified Mitigation Strategies */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#C89B3C] font-semibold flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-[#68D391]" />
                        <span>Enforced Mitigation Protocols & Structural Controls</span>
                      </div>

                      <div className="grid gap-2 text-xs">
                        {risk.mitigationStrategies.map((strategy, idx) => (
                          <div 
                            key={idx}
                            className="p-3 bg-[#11151E] rounded border border-white/[0.05] flex items-start gap-2.5 text-neutral-200"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#181F2C] border border-[#C89B3C]/30 flex items-center justify-center text-[10px] font-mono text-[#E8C98B] shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <span className="leading-relaxed font-sans">{strategy}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Verified Historical Track Record & Metrics */}
                    <div className="p-3 bg-[#0A0D12] rounded border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#68D391] shrink-0" />
                        <span className="text-neutral-400">Audit Proof / Track Record:</span>
                        <span className="text-white font-semibold">{risk.monitoringMetrics}</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 shrink-0">
                        {risk.auditQuarter} Verified
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>

      {/* Fiduciary Footnote Box */}
      <div className="bg-[#11151E] p-4 rounded-lg border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <Info size={14} className="text-[#C89B3C]" />
          <span>Risk register reviewed semi-annually by the Institutional Compliance & Athletic Relations Subcommittee.</span>
        </div>
        <div className="text-neutral-500 text-[11px] whitespace-nowrap">
          Securities Exchange Act Rule 10b-5 Parity
        </div>
      </div>

    </div>
  );
};
