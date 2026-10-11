import React from 'react';
import { ShieldCheck, Lock, Scale, X, FileText, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react';

export type LegalModalType = 'confidentiality' | 'regulatory' | null;

interface InstitutionalLegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const InstitutionalLegalModal: React.FC<InstitutionalLegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150 font-sans">
      <div 
        className="bg-[#0E121A] border border-white/10 rounded-xl w-full max-w-2xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent */}
        <div className="h-1 bg-gradient-to-r from-amber-600 via-[#C89B3C] to-emerald-500 w-full" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-[#121622]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#181D2A] text-[#C89B3C] border border-[#C89B3C]/30">
              {type === 'confidentiality' ? <Lock size={18} /> : <Scale size={18} />}
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#C89B3C]">
                Institutional Fiduciary Governance
              </div>
              <h2 className="text-xl font-bold text-white font-display">
                {type === 'confidentiality' ? 'Confidentiality & Non-Disclosure Policy' : 'Regulatory & Securities Disclosures'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#181D2A] hover:bg-[#22293A] border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-neutral-300 leading-relaxed font-sans">
          
          {type === 'confidentiality' ? (
            <>
              <div className="p-3.5 bg-[#141824] rounded-lg border border-white/5 space-y-1 font-mono text-[11px]">
                <div className="text-[#C89B3C] font-bold uppercase tracking-wider">Document Classification: Tier-1 Proprietary</div>
                <div className="text-neutral-400">Restricted to verified syndicate partners, athletic directorates, and accredited investors.</div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white font-display">1. Information Proprietary Nature</h4>
                <p>
                  All materials, pro-forma unit economic models, member rosters, brand contracts, and technical diagrams provided by 
                  College Company Holding Group Inc. are confidential and proprietary intellectual property. Unauthorized dissemination, 
                  reproduction, or disclosure is strictly prohibited under Delaware corporate jurisprudence and applicable federal trade secret statutes.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white font-display">2. Non-Circumvention & University Relations</h4>
                <p>
                  Accredited parties agreeing to these terms covenant that they will not directly or indirectly circumvent 
                  College Company Holding Group Inc. in negotiating broadcast rights, collegiate sponsorships, or NIL escrow agreements 
                  with member athletic departments or student-athletes disclosed through our platform.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white font-display">3. Athlete Privacy & FERPA Compliance</h4>
                <p>
                  All student-athlete performance data, academic eligibility records, and NIL clearinghouse verifications 
                  are encrypted and processed in strict adherence to the Family Educational Rights and Privacy Act (FERPA) 
                  and applicable state-level student privacy frameworks.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3.5 bg-[#141824] rounded-lg border border-white/5 space-y-1 font-mono text-[11px]">
                <div className="text-[#68D391] font-bold uppercase tracking-wider">Securities & Compliance Standards</div>
                <div className="text-neutral-400">Rule 506(c) Private Placement · NCAA Bylaw 12 · Title IX Proportionality</div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white font-display">1. Accredited Investor Verification (Rule 506(c))</h4>
                <p>
                  Equity participations and convertible note instruments offered by College Company Holding Group Inc. 
                  are available exclusively to accredited investors as defined under Rule 501 of Regulation D under the Securities Act of 1933. 
                  This presentation does not constitute an offer to sell or the solicitation of an offer to buy securities in any jurisdiction.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white font-display">2. NCAA Bylaw 12 & Amateurism Compliance</h4>
                <p>
                  Our proprietary NIL escrow architecture operates strictly within the statutory boundaries established under 
                  NCAA Interim NIL Policy, NCAA Bylaw 12, and state-specific Name, Image, and Likeness enactments. Compensation is 
                  rendered strictly for verified commercial market value services and is explicitly decoupled from athletic performance or enrollment incentives.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white font-display">3. Title IX Equitable Resource Distribution</h4>
                <p>
                  College Company Holding Group Inc. collaborates with partner universities to uphold Title IX gender equity benchmarks. 
                  Platform algorithms monitor sponsor allocation to ensure equitable commercial opportunity distribution across varsity biological sports programs.
                </p>
              </div>
            </>
          )}

          <div className="p-3 bg-[#0A0D14] rounded border border-white/5 flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <ShieldCheck size={14} className="text-[#68D391] shrink-0" />
            <span>Fiduciary oversight validated by legal counsel and collegiate advisory committees.</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0A0D14] border-t border-white/[0.08] flex items-center justify-between font-mono text-xs">
          <span className="text-neutral-500 text-[10px]">College Company Holding Group Inc. · Fiduciary Directorate</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
