import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  X, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  Users, 
  DollarSign, 
  Copy, 
  Check, 
  ShieldCheck, 
  Printer, 
  SlidersHorizontal,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { 
  FinancialModelInputs, 
  calculateFinancialMetrics, 
  generateFiveYearProjections, 
  downloadFinancialPDF, 
  downloadFinancialCSV,
  SCENARIO_CONFIG
} from '../src/utils/exportFinancialReport';

interface FinancialReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: FinancialModelInputs;
}

export const FinancialReportModal: React.FC<FinancialReportModalProps> = ({
  isOpen,
  onClose,
  inputs
}) => {
  const [copied, setCopied] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingCsv, setIsExportingCsv] = useState(false);

  const scenario = inputs.growthScenario || 'Expected';
  const scenarioConfig = SCENARIO_CONFIG[scenario];

  const metrics = calculateFinancialMetrics(inputs);
  const projections = generateFiveYearProjections(inputs);

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const summary = `
College Company Holding Group Inc. - Executive Financial Model Report
---------------------------------------------------------------------
Projection Scenario: ${scenario.toUpperCase()} (${scenarioConfig.tagline})
Active University Campuses: ${inputs.campusCount}
Avg NIL Volume per Athlete: $${inputs.avgNilDeal.toLocaleString()}
Campus Broadcast Rights Tier: $${inputs.mediaRightsTier.toLocaleString()}

Projected Annual Ecosystem Run-Rate: $${(metrics.annualRunRate / 1000000).toFixed(2)}M
Total Student Competitors: ${metrics.totalAthletes.toLocaleString()}
Total Processed NIL Volume: $${(metrics.nilVolume / 1000000).toFixed(2)}M
Campus Licensing Dues: $${(metrics.campusLicensing / 1000000).toFixed(2)}M
National Sponsor Pool: $${(metrics.mediaSponsorship / 1000000).toFixed(2)}M
Gross Margin: ${metrics.grossMarginPct}% ($${(metrics.grossProfit / 1000000).toFixed(2)}M)

5-Year Target Trajectory (${scenario} Case):
${projections.map(p => `${p.yearLabel} (${p.calendarYear}): ${p.campuses} campuses -> $${(p.totalRevenue / 1000000).toFixed(2)}M revenue (${p.growthRatePct > 0 ? '+' + p.growthRatePct.toFixed(1) + '%' : 'Base'})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    try {
      downloadFinancialPDF(inputs);
    } catch (e) {
      console.error("PDF export error", e);
    } finally {
      setTimeout(() => setIsExportingPdf(false), 600);
    }
  };

  const handleExportCsv = () => {
    setIsExportingCsv(true);
    try {
      downloadFinancialCSV(inputs);
    } catch (e) {
      console.error("CSV export error", e);
    } finally {
      setTimeout(() => setIsExportingCsv(false), 600);
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      
      {/* Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0B0E14] border border-white/15 w-full max-w-4xl max-h-[90vh] rounded-xl flex flex-col shadow-2xl overflow-hidden relative font-sans text-neutral-200"
      >
        
        {/* Top Header Bar */}
        <div className="bg-[#0F131B] border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#161B24] border border-[#C89B3C]/50 flex items-center justify-center text-[#E8C98B] shadow-md">
              <FileText size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C89B3C]">
                  Executive Document Generator
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.2 rounded bg-[#68D391]/10 text-[#68D391] border border-[#68D391]/20">
                  <CheckCircle2 size={10} /> Active Dynamic State
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white tracking-tight">
                Pro-Forma Financial & TAM Report Export
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/10 transition-colors"
              title="Close window"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Action Export Command Bar */}
        <div className="bg-[#121622] border-b border-white/10 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <span>Model State:</span>
            <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${scenarioConfig.badgeColor}`}>
              {scenario} Variance ({scenarioConfig.multipliers[4]}x Terminal)
            </span>
            <span className="hidden md:inline text-neutral-500">· {inputs.campusCount} campuses @ ${inputs.avgNilDeal.toLocaleString()} NIL</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 bg-[#1B202D] hover:bg-[#23293A] border border-white/10 text-neutral-300 hover:text-white rounded text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check size={13} className="text-[#68D391]" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy Brief'}</span>
            </button>

            <button
              onClick={handleExportCsv}
              disabled={isExportingCsv}
              className="px-3.5 py-1.5 bg-[#1A2535] hover:bg-[#223147] border border-[#38BDF8]/30 text-[#38BDF8] rounded text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <FileSpreadsheet size={13} />
              <span>{isExportingCsv ? 'Generating...' : 'Export CSV Dataset'}</span>
            </button>

            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="px-4 py-1.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Download size={13} />
              <span>{isExportingPdf ? 'Rendering PDF...' : 'Download Official PDF'}</span>
            </button>
          </div>
        </div>

        {/* Document Printable Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#090C12]">
          
          {/* Executive Document Paper Frame */}
          <div className="bg-[#11151F] border border-white/10 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            {/* Header Letterhead */}
            <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#C89B3C] tracking-widest uppercase font-semibold">
                    COLLEGE COMPANY HOLDING GROUP INC.
                  </span>
                  <span className={`px-2 py-0.5 rounded border text-[10px] font-mono font-semibold ${scenarioConfig.badgeColor}`}>
                    {scenario} Scenario
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight mt-1">
                  Confidential TAM Pro-Forma & Expansion Yield Report
                </h3>
                <div className="text-xs text-neutral-400 font-mono mt-1">
                  Document ID: REP-TAM-{inputs.campusCount}-{scenario.toUpperCase()}-{new Date().getFullYear()} · Boston HQ Fiduciary Ledger
                </div>
              </div>

              <div className="bg-[#0A0D14] px-4 py-3 rounded-lg border border-white/10 text-right font-mono shrink-0">
                <div className="text-[10px] text-neutral-500 uppercase">Projected Annual Run-Rate</div>
                <div className="text-2xl font-bold text-[#E8C98B]">
                  ${(metrics.annualRunRate / 1000000).toFixed(2)}M
                </div>
                <div className="text-[10px] text-[#68D391]">
                  68.4% Average Gross Margin
                </div>
              </div>
            </div>

            {/* Section 1: Active Assumptions Matrix */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <SlidersHorizontal size={13} className="text-[#C89B3C]" />
                <span>1. Active Operational Assumptions</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-[#0D1016] p-3 rounded border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Active Campuses</div>
                  <div className="text-base font-bold text-white mt-0.5">{inputs.campusCount} Universities</div>
                  <div className="text-[10px] text-neutral-500">Tier-1 Network</div>
                </div>

                <div className="bg-[#0D1016] p-3 rounded border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Avg NIL Deal</div>
                  <div className="text-base font-bold text-[#E8C98B] mt-0.5">${inputs.avgNilDeal.toLocaleString()}</div>
                  <div className="text-[10px] text-neutral-500">Per Active Athlete/Yr</div>
                </div>

                <div className="bg-[#0D1016] p-3 rounded border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Broadcast Rights</div>
                  <div className="text-base font-bold text-white mt-0.5">${inputs.mediaRightsTier.toLocaleString()}</div>
                  <div className="text-[10px] text-neutral-500">Annual Campus Dues</div>
                </div>

                <div className="bg-[#0D1016] p-3 rounded border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase">Athletes Reach</div>
                  <div className="text-base font-bold text-white mt-0.5">{metrics.totalAthletes.toLocaleString()}</div>
                  <div className="text-[10px] text-neutral-500">45 Roster Depth</div>
                </div>
              </div>
            </div>

            {/* Section 2: Revenue Composition Breakdown */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <DollarSign size={13} className="text-[#C89B3C]" />
                <span>2. Annualized Revenue Engine Breakdown</span>
              </div>

              <div className="bg-[#0D1016] rounded-lg border border-white/10 overflow-hidden text-xs font-mono">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#141822] text-[#E8C98B] text-[11px] border-b border-white/10">
                      <th className="p-3 font-semibold">Revenue Stream</th>
                      <th className="p-3 font-semibold hidden sm:table-cell">Basis of Calculation</th>
                      <th className="p-3 font-semibold text-right">Annual Run-Rate</th>
                      <th className="p-3 font-semibold text-right">% Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300 text-xs">
                    <tr>
                      <td className="p-3 font-semibold text-white">Campus League & Media Rights</td>
                      <td className="p-3 text-neutral-400 hidden sm:table-cell">{inputs.campusCount} campuses @ ${inputs.mediaRightsTier.toLocaleString()}/yr tier</td>
                      <td className="p-3 text-right font-bold text-white">${(metrics.campusLicensing / 1000000).toFixed(2)}M</td>
                      <td className="p-3 text-right text-neutral-400">{((metrics.campusLicensing / metrics.annualRunRate) * 100).toFixed(1)}%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Student-Athlete NIL Platform Fee</td>
                      <td className="p-3 text-neutral-400 hidden sm:table-cell">15% take-rate on ${(metrics.nilVolume / 1000000).toFixed(2)}M processed liquidity</td>
                      <td className="p-3 text-right font-bold text-[#E8C98B]">${(metrics.platformNilRevenue / 1000000).toFixed(2)}M</td>
                      <td className="p-3 text-right text-neutral-400">{((metrics.platformNilRevenue / metrics.annualRunRate) * 100).toFixed(1)}%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">National Aggregate Sponsor Pool</td>
                      <td className="p-3 text-neutral-400 hidden sm:table-cell">Tournament packages ($18,500 base per member campus)</td>
                      <td className="p-3 text-right font-bold text-white">${(metrics.mediaSponsorship / 1000000).toFixed(2)}M</td>
                      <td className="p-3 text-right text-neutral-400">{((metrics.mediaSponsorship / metrics.annualRunRate) * 100).toFixed(1)}%</td>
                    </tr>
                    <tr className="bg-[#141822]/80 font-bold border-t border-white/10">
                      <td className="p-3 text-[#E8C98B]">TOTAL ANNUAL ECOSYSTEM RUN-RATE</td>
                      <td className="p-3 text-neutral-400 hidden sm:table-cell font-normal">Consolidated enterprise run-rate across 4 divisions</td>
                      <td className="p-3 text-right text-xl text-[#E8C98B]">${(metrics.annualRunRate / 1000000).toFixed(2)}M</td>
                      <td className="p-3 text-right text-white">100.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: 5-Year Pro-Forma Forecast Table */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <TrendingUp size={13} className="text-[#C89B3C]" />
                  <span>3. Five-Year Expansion & Monetization Trajectory (2026 - 2030)</span>
                </span>
                <span className="text-[10px] text-neutral-500">Capped at 450 National Campuses</span>
              </div>

              <div className="bg-[#0D1016] rounded-lg border border-white/10 overflow-hidden text-xs font-mono">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#141822] text-[#E8C98B] text-[11px] border-b border-white/10">
                      <th className="p-3 font-semibold">Period</th>
                      <th className="p-3 font-semibold text-center">Campuses</th>
                      <th className="p-3 font-semibold text-right">Athletes</th>
                      <th className="p-3 font-semibold text-right">Gross NIL ($M)</th>
                      <th className="p-3 font-semibold text-right">Total Revenue ($M)</th>
                      <th className="p-3 font-semibold text-right">YoY Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {projections.map((p) => (
                      <tr key={p.yearLabel} className="hover:bg-white/[0.02]">
                        <td className="p-3 font-bold text-white">{p.yearLabel} ({p.calendarYear})</td>
                        <td className="p-3 text-center text-neutral-300">{p.campuses}</td>
                        <td className="p-3 text-right text-neutral-400">{p.athletes.toLocaleString()}</td>
                        <td className="p-3 text-right text-[#E8C98B]">${(p.nilVolume / 1000000).toFixed(2)}M</td>
                        <td className="p-3 text-right font-bold text-white">${(p.totalRevenue / 1000000).toFixed(2)}M</td>
                        <td className="p-3 text-right">
                          <span className={p.growthRatePct > 0 ? 'text-[#68D391] font-semibold' : 'text-neutral-500'}>
                            {p.growthRatePct > 0 ? `+${p.growthRatePct.toFixed(1)}%` : 'Base Year'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: Fiduciary Unit Economics Footer */}
            <div className="bg-[#0A0D12] p-4 rounded-lg border border-white/5 text-xs font-mono text-neutral-400 flex flex-col sm:flex-row justify-between gap-3">
              <div>
                <span className="text-white font-semibold">Average Revenue per Campus: </span>
                <span className="text-[#E8C98B]">${Math.round(metrics.revenuePerCampus).toLocaleString()} / yr</span>
              </div>
              <div>
                <span className="text-white font-semibold">Regulatory Framework: </span>
                <span>NCAA Bylaw 14.2 & Title IX Equity Verified</span>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-[#0C0F15] border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
            <ShieldCheck size={14} className="text-[#C89B3C]" />
            <span>Fiduciary Certified · Prepared for Accredited Investors and Athletic Councils</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="px-4 py-2 bg-[#171C26] hover:bg-[#1E2533] border border-white/10 text-white rounded transition-colors flex items-center gap-1.5"
            >
              <FileSpreadsheet size={13} className="text-[#38BDF8]" />
              <span>CSV Spreadsheet</span>
            </button>

            <button
              onClick={handleExportPdf}
              className="px-5 py-2 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Download size={13} />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
