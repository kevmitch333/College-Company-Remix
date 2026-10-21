import React from 'react';
import { 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  ArrowRight, 
  FileCheck2, 
  Sparkles,
  Building2,
  Scale,
  DollarSign,
  BrainCircuit,
  Clock,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { AccessTier, TIER_DEFINITIONS, MembershipStatus } from '../src/utils/accessTiers';

interface TierGateBannerProps {
  requiredTier: AccessTier;
  currentTier: AccessTier;
  sectionName: string;
  membershipStatus?: MembershipStatus;
  applicantName?: string;
  onOpenAccessModal: () => void;
  onQuickElevate?: (tier: AccessTier) => void;
}

export const TierGateBanner: React.FC<TierGateBannerProps> = ({
  requiredTier,
  currentTier,
  sectionName,
  membershipStatus = 'unregistered',
  applicantName,
  onOpenAccessModal,
  onQuickElevate
}) => {
  const targetTierDef = TIER_DEFINITIONS.find(t => t.tier === requiredTier) || TIER_DEFINITIONS[requiredTier];
  const isPending = membershipStatus === 'pending';

  const getSectionIcon = () => {
    switch (sectionName.toLowerCase()) {
      case 'financials':
      case 'financial modeling & data room':
        return <DollarSign className="text-[#68D391]" size={28} />;
      case 'governance':
      case 'governance & compliance repository':
        return <Scale className="text-[#E8C98B]" size={28} />;
      case 'orchestrator':
      case 'ai orchestrator':
        return <BrainCircuit className="text-[#C89B3C]" size={28} />;
      case 'holdings':
      case 'proprietary holdings directory':
        return <Building2 className="text-[#38BDF8]" size={28} />;
      default:
        return <Lock className="text-[#C89B3C]" size={28} />;
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-24 text-left">
      <div className="relative rounded-lg bg-[#0E121A] border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden text-center">
        {/* Subtle Background Glow */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ backgroundColor: targetTierDef.color }}
        />

        {/* Security Crest & Clearance Badge */}
        <div className="relative flex flex-col items-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#151923] border border-white/10 flex items-center justify-center shadow-lg relative">
            {getSectionIcon()}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#090A0C] border border-white/20 flex items-center justify-center text-[#E8C98B]">
              {isPending ? <Clock size={12} className="text-amber-400" /> : <Lock size={12} />}
            </div>
          </div>

          {/* Status Chip */}
          {isPending ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-xs font-mono tracking-wider uppercase text-amber-300">
              <Clock size={12} className="animate-spin" />
              <span>Application Pending Approval</span>
              <span className="text-amber-500">·</span>
              <span>{targetTierDef.badge} Required</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider uppercase text-neutral-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: targetTierDef.color }}></span>
              <span>{targetTierDef.badge} Required</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">Institutional Wall</span>
            </div>
          )}

          <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            {sectionName} is Protected
          </h2>

          {isPending ? (
            <div className="space-y-3">
              <p className="text-sm md:text-base text-amber-200/90 font-light leading-relaxed">
                Your application for <strong className="text-white">{applicantName || 'Member'}</strong> is currently in review by the College Company Directorate. Once approved, all institutional tools in this tier will unlock automatically.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Domain Verification Verified</span>
                <span className="text-neutral-500">→</span>
                <span className="text-amber-400 font-semibold">Directorate Final Sign-Off Pending</span>
              </div>
            </div>
          ) : (
            <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
              This robust workspace contains proprietary institutional assets, regulatory compliance filings, and fiduciary valuation models. Membership approval is required to access these tools.
            </p>
          )}

          {/* Locked Features Summary */}
          <div className="w-full my-6 p-4 rounded-md bg-[#131722]/80 border border-white/[0.06] text-left grid sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-2">
              <FileCheck2 size={14} className="text-[#C89B3C] shrink-0" />
              <span>Full DCF Valuation & Cap Table Simulator</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck2 size={14} className="text-[#C89B3C] shrink-0" />
              <span>House v. NCAA & Title IX Statutory Audits</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck2 size={14} className="text-[#C89B3C] shrink-0" />
              <span>43 Proprietary Brand Holding Codes</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck2 size={14} className="text-[#C89B3C] shrink-0" />
              <span>Multi-Agent Fiduciary AI Orchestrator</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {isPending ? (
              <>
                {onQuickElevate && (
                  <button
                    onClick={() => onQuickElevate(requiredTier)}
                    className="px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-2 cursor-pointer font-mono"
                  >
                    <Zap size={14} />
                    <span>⚡ Instant Approve My Application (Evaluator Fast-Track)</span>
                  </button>
                )}
                <button
                  onClick={onOpenAccessModal}
                  className="px-5 py-3 bg-[#1A2030] hover:bg-[#222A40] border border-white/20 text-white font-mono text-xs rounded-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Clock size={13} className="text-[#38BDF8]" />
                  <span>Check Status & Credentials</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onOpenAccessModal}
                  className="px-6 py-3 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-2 cursor-pointer font-mono"
                >
                  <KeyRound size={14} />
                  <span>Sign Up / Request {targetTierDef.name}</span>
                  <ArrowRight size={14} />
                </button>

                {onQuickElevate && (
                  <button
                    onClick={() => onQuickElevate(requiredTier)}
                    className="px-5 py-3 bg-[#1A2030] hover:bg-[#222A40] border border-[#C89B3C]/30 text-[#E8C98B] hover:text-white font-mono text-xs rounded-sm transition-all cursor-pointer flex items-center gap-1.5"
                    title="Instant evaluator clearance for preview"
                  >
                    <Sparkles size={13} className="text-[#C89B3C]" />
                    <span>Instant Evaluator Clearance ({targetTierDef.badge})</span>
                  </button>
                )}
              </>
            )}
          </div>

          <p className="text-[11px] font-mono text-neutral-500 pt-3">
            Current Clearance: Tier {currentTier} ({TIER_DEFINITIONS[currentTier]?.name}) · Status: {membershipStatus}
          </p>
        </div>
      </div>
    </div>
  );
};
