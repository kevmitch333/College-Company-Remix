import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Check, 
  Sparkles, 
  KeyRound, 
  Building2, 
  Scale, 
  DollarSign, 
  ArrowRight, 
  Mail, 
  User, 
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  HelpCircle,
  BrainCircuit,
  FileCheck2,
  Users
} from 'lucide-react';
import { 
  AccessTier, 
  AccessProfile, 
  TIER_DEFINITIONS, 
  DEMO_PRESET_PROFILES,
  PENDING_DEMO_PROFILE,
  MEMBERSHIP_TOOLS_CATALOG 
} from '../src/utils/accessTiers';
import { auth } from '../src/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

interface PrivateAccessGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: AccessProfile;
  onSelectTier: (tier: AccessTier, customProfile?: Partial<AccessProfile>) => void;
  onSwitchMode: (mode: 'consumer' | 'portal') => void;
  initialTab?: 'apply' | 'status' | 'tiers' | 'demo';
  requestedToolId?: string;
}

export const PrivateAccessGateModal: React.FC<PrivateAccessGateModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSelectTier,
  onSwitchMode,
  initialTab = 'apply',
  requestedToolId
}) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'status' | 'tiers' | 'demo' | 'google'>(
    currentProfile.membershipStatus === 'pending' ? 'status' : initialTab
  );

  // Application Form State
  const [applicantName, setApplicantName] = useState(currentProfile.displayName !== 'Public Guest' ? currentProfile.displayName : '');
  const [applicantEmail, setApplicantEmail] = useState(currentProfile.email !== 'visitor@collegiate-guest.org' ? currentProfile.email : '');
  const [applicantOrg, setApplicantOrg] = useState(currentProfile.organization !== 'Prospective Partner' ? currentProfile.organization : '');
  const [applicantRole, setApplicantRole] = useState<'campus_partner' | 'athletic_director' | 'accredited_investor'>('athletic_director');
  const [selectedTrackTier, setSelectedTrackTier] = useState<AccessTier>(2);
  const [useCaseReason, setUseCaseReason] = useState('');
  const [ndaAgreed, setNdaAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applySuccessMessage, setApplySuccessMessage] = useState<string | null>(null);
  const [googleAuthError, setGoogleAuthError] = useState<string | null>(null);

  if (!isOpen) return null;

  const targetTool = requestedToolId 
    ? MEMBERSHIP_TOOLS_CATALOG.find(t => t.id === requestedToolId) 
    : null;

  // Handle standard application submission (puts user in pending review or instant approved)
  const handleApplySubmit = (e: React.FormEvent, instantApprove: boolean = false) => {
    e.preventDefault();
    if (!applicantEmail || !applicantName) return;

    setIsSubmitting(true);
    setTimeout(() => {
      let targetTier: AccessTier = selectedTrackTier;
      let roleTitle = 'Verified Campus Partner';
      if (applicantRole === 'athletic_director') {
        targetTier = Math.max(targetTier, 2) as AccessTier;
        roleTitle = 'Athletic Director & Compliance Chair';
      } else if (applicantRole === 'accredited_investor') {
        targetTier = 3;
        roleTitle = 'Accredited Investor / Fund Partner';
      }

      if (instantApprove) {
        // Fast-track immediate approval
        const approvedProfile: AccessProfile = {
          tier: targetTier,
          roleTitle,
          roleCategory: applicantRole,
          displayName: applicantName,
          organization: applicantOrg || 'Collegiate Institutional Partner',
          email: applicantEmail,
          verified: true,
          membershipStatus: 'approved',
          approvedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          avatarColor: targetTier === 3 ? 'from-emerald-600 to-teal-500' : targetTier === 2 ? 'from-rose-600 to-red-500' : 'from-amber-600 to-orange-500',
          clearanceCode: `AUTH-T${targetTier}-${Math.floor(1000 + Math.random() * 9000)}`
        };

        onSelectTier(targetTier, approvedProfile);
        onSwitchMode('portal');
        setIsSubmitting(false);
        setApplySuccessMessage(`Clearance Approved: Welcome ${applicantName}. Unlocked ${TIER_DEFINITIONS[targetTier].badge}.`);
        setTimeout(() => {
          setApplySuccessMessage(null);
          onClose();
        }, 1400);
      } else {
        // Put in pending review state
        const pendingProfile: AccessProfile = {
          tier: 0,
          roleTitle: `${roleTitle} (Applicant)`,
          roleCategory: applicantRole,
          displayName: applicantName,
          organization: applicantOrg || 'Collegiate Institutional Partner',
          email: applicantEmail,
          verified: false,
          membershipStatus: 'pending',
          appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          requestedTier: targetTier,
          avatarColor: 'from-amber-500 to-yellow-600',
          clearanceCode: `APP-PENDING-${Math.floor(1000 + Math.random() * 9000)}`,
          verificationNotes: `Application for ${TIER_DEFINITIONS[targetTier].name} submitted. Awaiting directorate credential confirmation.`
        };

        onSelectTier(0, pendingProfile);
        setIsSubmitting(false);
        setActiveTab('status');
        setApplySuccessMessage(`Application Received! Your credential is under review. You can simulate instant approval anytime.`);
      }
    }, 450);
  };

  // Instant fast-track approval for current pending profile
  const handleFastTrackApprovePending = () => {
    const targetTier = currentProfile.requestedTier || 2;
    const approvedProfile: AccessProfile = {
      ...currentProfile,
      tier: targetTier,
      verified: true,
      membershipStatus: 'approved',
      approvedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      clearanceCode: `AUTH-T${targetTier}-${Math.floor(1000 + Math.random() * 9000)}`
    };
    onSelectTier(targetTier, approvedProfile);
    onSwitchMode('portal');
    setApplySuccessMessage(`Application Approved: Clearance granted for ${TIER_DEFINITIONS[targetTier].badge}!`);
    setTimeout(() => {
      setApplySuccessMessage(null);
      onClose();
    }, 1200);
  };

  // Reset to guest
  const handleResetToGuest = () => {
    onSelectTier(0, DEMO_PRESET_PROFILES[0]);
    setActiveTab('apply');
    setApplySuccessMessage(`Reset to Public Guest.`);
    setTimeout(() => setApplySuccessMessage(null), 2000);
  };

  // Google SSO
  const handleGoogleSignIn = async () => {
    setGoogleAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const newProfile: AccessProfile = {
        tier: 2, // Standard Verified Institutional Partner
        roleTitle: 'Verified Google Partner',
        roleCategory: 'athletic_director',
        displayName: user.displayName || 'Verified Member',
        organization: 'Verified Google Workspace Domain',
        email: user.email || 'member@domain.edu',
        verified: true,
        membershipStatus: 'approved',
        approvedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        avatarColor: 'from-blue-600 to-indigo-500',
        clearanceCode: `GGL-VERIFIED-${user.uid.slice(0, 6).toUpperCase()}`
      };
      
      onSelectTier(2, newProfile);
      onSwitchMode('portal');
      setApplySuccessMessage(`Signed in as ${user.displayName || user.email}. Unlocked Tier 2 Clearance.`);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      console.warn("Google sign-in popup notice:", err);
      setGoogleAuthError("Google pop-up was closed or cancelled. Use Instant Fast-Track or Presets below to test any tier immediately.");
    }
  };

  const handleInstantPreset = (tier: AccessTier) => {
    const preset = DEMO_PRESET_PROFILES[tier];
    onSelectTier(tier, preset);
    if (tier > 0) {
      onSwitchMode('portal');
    }
    onClose();
  };

  const handlePresetPending = () => {
    onSelectTier(0, PENDING_DEMO_PROFILE);
    setActiveTab('status');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0D1017] border border-white/10 rounded-lg shadow-2xl overflow-hidden my-6 z-10 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#121622] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#161B26] border border-[#C89B3C]/40 flex items-center justify-center text-[#E8C98B]">
              <Lock size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-white">
                  College Company Membership Wall
                </h3>
                {currentProfile.membershipStatus === 'approved' ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={10} />
                    Approved Member (T{currentProfile.tier})
                  </span>
                ) : currentProfile.membershipStatus === 'pending' ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-950/60 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1">
                    <Clock size={10} />
                    Application In Review
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#C89B3C]/20 text-[#E8C98B] border border-[#C89B3C]/30 font-semibold">
                    Permission-Based Access
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono text-neutral-400">
                {currentProfile.displayName} ({currentProfile.organization}) · Status: <span className="text-white font-medium capitalize">{currentProfile.membershipStatus || 'Public Guest'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Target Tool Teaser Banner (if opened from a specific tool click) */}
        {targetTool && (
          <div className="px-6 py-2.5 bg-[#182030] border-b border-[#38BDF8]/20 flex items-center justify-between text-xs font-mono shrink-0">
            <div className="flex items-center gap-2 text-neutral-200">
              <span className="text-[#38BDF8] font-bold">Requested Tool:</span>
              <span className="text-white font-semibold">{targetTool.name}</span>
              <span className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[10px] text-[#E8C98B]">
                Requires {targetTool.badge}
              </span>
            </div>
            <span className="text-neutral-400 hidden sm:inline text-[11px]">
              Apply below to unlock access
            </span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.08] bg-[#0E121B] px-6 text-xs font-mono overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('apply')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'apply'
                ? 'border-[#C89B3C] text-[#E8C98B] font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <User size={13} />
            <span>1. Apply for Membership</span>
          </button>
          
          <button
            onClick={() => setActiveTab('status')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 relative ${
              activeTab === 'status'
                ? 'border-[#C89B3C] text-[#E8C98B] font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Clock size={13} />
            <span>2. Application Status</span>
            {currentProfile.membershipStatus === 'pending' && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('tiers')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tiers'
                ? 'border-[#C89B3C] text-[#E8C98B] font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <KeyRound size={13} />
            <span>3. Clearance Tiers & Tools</span>
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'demo'
                ? 'border-[#C89B3C] text-[#E8C98B] font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Zap size={13} className="text-[#C89B3C]" />
            <span>4. 1-Click Role Switcher</span>
          </button>

          <button
            onClick={() => setActiveTab('google')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'google'
                ? 'border-[#C89B3C] text-[#E8C98B] font-bold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <span>Google SSO</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">

          {/* Alert / Banner */}
          {applySuccessMessage && (
            <div className="p-3.5 rounded-sm bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
              <span>{applySuccessMessage}</span>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 1: APPLY FOR MEMBERSHIP */}
          {/* ================================================================ */}
          {activeTab === 'apply' && (
            <div className="space-y-6">
              
              <div className="bg-[#121622] p-4 rounded-md border border-white/10 space-y-2 text-left">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E8C98B]">
                  <Sparkles size={14} />
                  <span>Institutional Credential Application</span>
                </div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  To safeguard sensitive collegiate athletics data, legal compliance repositories, and institutional DCF valuation models, access is restricted to verified campus leaders, corporate brand sponsors, athletic directors, and accredited investors.
                </p>
              </div>

              <form onSubmit={(e) => handleApplySubmit(e, false)} className="space-y-5 text-left">
                
                {/* Track Selector */}
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-2">
                    Select Your Clearance Track & Role:
                  </label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    
                    <button
                      type="button"
                      onClick={() => {
                        setApplicantRole('campus_partner');
                        setSelectedTrackTier(1);
                      }}
                      className={`p-3.5 rounded-md border text-left transition-all cursor-pointer ${
                        selectedTrackTier === 1
                          ? 'bg-[#151D2A] border-[#38BDF8] text-white shadow-sm'
                          : 'bg-[#10141D] border-white/10 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-[#38BDF8] font-bold">Tier 1</span>
                        <Building2 size={14} />
                      </div>
                      <div className="font-display font-bold text-sm text-white">Campus & Brand</div>
                      <div className="text-[11px] text-neutral-400 font-light mt-1">
                        43-Brand directory, topology, 400+ campus map, NIL calculator
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setApplicantRole('athletic_director');
                        setSelectedTrackTier(2);
                      }}
                      className={`p-3.5 rounded-md border text-left transition-all cursor-pointer ${
                        selectedTrackTier === 2
                          ? 'bg-[#1D1924] border-[#E8C98B] text-white shadow-sm'
                          : 'bg-[#10141D] border-white/10 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-[#E8C98B] font-bold">Tier 2</span>
                        <Scale size={14} />
                      </div>
                      <div className="font-display font-bold text-sm text-white">Athletic Directorate</div>
                      <div className="text-[11px] text-neutral-400 font-light mt-1">
                        House v. NCAA audits, Title IX parity, statutory NIL escrow
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setApplicantRole('accredited_investor');
                        setSelectedTrackTier(3);
                      }}
                      className={`p-3.5 rounded-md border text-left transition-all cursor-pointer ${
                        selectedTrackTier === 3
                          ? 'bg-[#131F1C] border-[#68D391] text-white shadow-sm'
                          : 'bg-[#10141D] border-white/10 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-[#68D391] font-bold">Tier 3</span>
                        <DollarSign size={14} />
                      </div>
                      <div className="font-display font-bold text-sm text-white">Investor & Board</div>
                      <div className="text-[11px] text-neutral-400 font-light mt-1">
                        Full DCF models, TAM simulator, AI fiduciary orchestrator
                      </div>
                    </button>

                  </div>
                </div>

                {/* Form Inputs */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g., Dr. Elena Rostova"
                      className="w-full px-3 py-2.5 rounded-sm bg-[#121622] border border-white/10 text-white font-mono text-xs focus:outline-hidden focus:border-[#C89B3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Official Institutional Email (.edu / corporate) *
                    </label>
                    <input 
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="e.g., rostova@osu.edu"
                      className="w-full px-3 py-2.5 rounded-sm bg-[#121622] border border-white/10 text-white font-mono text-xs focus:outline-hidden focus:border-[#C89B3C]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      University, Athletic Dept, or Fund Organization *
                    </label>
                    <input 
                      type="text"
                      required
                      value={applicantOrg}
                      onChange={(e) => setApplicantOrg(e.target.value)}
                      placeholder="e.g., Ohio State Athletics / Horizon Venture Capital"
                      className="w-full px-3 py-2.5 rounded-sm bg-[#121622] border border-white/10 text-white font-mono text-xs focus:outline-hidden focus:border-[#C89B3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Primary Institutional Tool or Data Needed
                    </label>
                    <input 
                      type="text"
                      value={useCaseReason}
                      onChange={(e) => setUseCaseReason(e.target.value)}
                      placeholder="e.g., NIL Calculator, House v. NCAA Audits, DCF Model"
                      className="w-full px-3 py-2.5 rounded-sm bg-[#121622] border border-white/10 text-white font-mono text-xs focus:outline-hidden focus:border-[#C89B3C]"
                    />
                  </div>
                </div>

                {/* NDA Checkbox */}
                <div className="p-3.5 rounded-sm bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <input 
                    type="checkbox"
                    id="nda-agreement"
                    checked={ndaAgreed}
                    onChange={(e) => setNdaAgreed(e.target.checked)}
                    className="mt-0.5 accent-[#C89B3C]"
                  />
                  <label htmlFor="nda-agreement" className="text-xs text-neutral-300 font-light cursor-pointer">
                    I acknowledge that data rooms, member rosters, and compliance frameworks accessed under this membership are subject to institutional confidentiality and non-circumvention terms.
                  </label>
                </div>

                {/* Submission CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={(e) => handleApplySubmit(e, true)}
                    disabled={isSubmitting || !applicantName || !applicantEmail}
                    className="w-full sm:w-auto px-5 py-3 rounded-sm bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <Zap size={14} />
                    <span>⚡ Instant Fast-Track Approval (Evaluator Mode)</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !applicantName || !applicantEmail}
                    className="w-full sm:w-auto px-5 py-3 rounded-sm bg-[#182030] hover:bg-[#1E2638] border border-white/20 text-white font-mono text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Clock size={14} className="text-[#38BDF8]" />
                    <span>Submit for Formal Review</span>
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: APPLICATION STATUS TRACKER */}
          {/* ================================================================ */}
          {activeTab === 'status' && (
            <div className="space-y-6 text-left">
              
              <div className="p-5 rounded-lg bg-[#11151F] border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      Membership Pipeline
                    </span>
                    <h4 className="font-display font-bold text-lg text-white">
                      Verification & Clearance Status
                    </h4>
                  </div>
                  
                  <div>
                    {currentProfile.membershipStatus === 'approved' ? (
                      <span className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 size={14} />
                        Clearance Granted: {TIER_DEFINITIONS[currentProfile.tier].name}
                      </span>
                    ) : currentProfile.membershipStatus === 'pending' ? (
                      <span className="px-3 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1.5">
                        <Clock size={14} className="animate-spin" />
                        In Review by Directorate
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-neutral-400 font-mono text-xs">
                        No Active Application (Public Guest)
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className={`p-3 rounded border text-xs font-mono ${
                    currentProfile.membershipStatus === 'approved' || currentProfile.membershipStatus === 'pending'
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-neutral-400'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <CheckCircle2 size={13} />
                      <span>Step 1</span>
                    </div>
                    <div>Application Received</div>
                  </div>

                  <div className={`p-3 rounded border text-xs font-mono ${
                    currentProfile.membershipStatus === 'approved'
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : currentProfile.membershipStatus === 'pending'
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                      : 'bg-white/5 border-white/10 text-neutral-400'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      {currentProfile.membershipStatus === 'approved' ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                      <span>Step 2</span>
                    </div>
                    <div>Credential Verification</div>
                  </div>

                  <div className={`p-3 rounded border text-xs font-mono ${
                    currentProfile.membershipStatus === 'approved'
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-neutral-400'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      {currentProfile.membershipStatus === 'approved' ? <CheckCircle2 size={13} /> : <Lock size={13} />}
                      <span>Step 3</span>
                    </div>
                    <div>Clearance Granted</div>
                  </div>
                </div>

                {/* Active Profile Info */}
                <div className="pt-3 border-t border-white/[0.08] grid sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-neutral-500 block">Applicant Name:</span>
                    <span className="text-white font-medium">{currentProfile.displayName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Institutional Email:</span>
                    <span className="text-white font-medium">{currentProfile.email}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Organization:</span>
                    <span className="text-white font-medium">{currentProfile.organization}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Clearance Code:</span>
                    <span className="text-[#C89B3C] font-semibold">{currentProfile.clearanceCode}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Status */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {currentProfile.membershipStatus === 'pending' && (
                  <button
                    onClick={handleFastTrackApprovePending}
                    className="px-5 py-3 rounded-sm bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <Zap size={14} />
                    <span>⚡ Instant Approve This Application (Evaluator Fast-Track)</span>
                  </button>
                )}

                {currentProfile.membershipStatus === 'approved' && (
                  <button
                    onClick={() => {
                      onSwitchMode('portal');
                      onClose();
                    }}
                    className="px-5 py-3 rounded-sm bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <ArrowRight size={14} />
                    <span>Enter Unlocked Member Portal →</span>
                  </button>
                )}

                <button
                  onClick={handleResetToGuest}
                  className="px-4 py-2 rounded-sm bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white font-mono text-xs cursor-pointer transition-colors"
                >
                  Reset / Clear Application
                </button>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: CLEARANCE TIERS & TOOLS BREAKDOWN */}
          {/* ================================================================ */}
          {activeTab === 'tiers' && (
            <div className="space-y-6 text-left">
              <div className="text-xs text-neutral-300 font-light leading-relaxed">
                Review which tools and institutional workspaces unlock at each clearance tier.
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {TIER_DEFINITIONS.filter(t => t.tier > 0).map((def) => {
                  const isCurrent = currentProfile.tier === def.tier && currentProfile.membershipStatus === 'approved';
                  return (
                    <div 
                      key={def.tier}
                      className={`rounded-lg p-5 border flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-[#151D2A] border-[#C89B3C] shadow-lg'
                          : 'bg-[#10141D] border-white/10'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span 
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                            style={{ backgroundColor: `${def.color}20`, color: def.color, border: `1px solid ${def.color}40` }}
                          >
                            Tier {def.tier}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-mono text-[#68D391] flex items-center gap-1 font-bold">
                              <CheckCircle2 size={12} />
                              Active
                            </span>
                          )}
                        </div>

                        <h4 className="font-display font-bold text-base text-white">
                          {def.name}
                        </h4>

                        <p className="text-xs text-neutral-300 font-light leading-relaxed">
                          {def.description}
                        </p>

                        {/* List of tools unlocked */}
                        <div className="pt-2 border-t border-white/[0.08] space-y-1.5 text-xs font-mono text-neutral-300">
                          <span className="text-[10px] text-neutral-500 uppercase block tracking-wider font-semibold">
                            Unlocked Tools:
                          </span>
                          {MEMBERSHIP_TOOLS_CATALOG.filter(tool => tool.requiredTier <= def.tier).slice(0, 4).map(tool => (
                            <div key={tool.id} className="flex items-center gap-1.5">
                              <CheckCircle2 size={12} className="text-[#68D391] shrink-0" />
                              <span className="truncate">{tool.shortName}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleInstantPreset(def.tier)}
                        className="mt-5 w-full py-2.5 rounded-sm bg-[#161B26] hover:bg-[#1E2536] border border-white/15 text-white font-mono text-xs font-semibold cursor-pointer transition-all text-center"
                      >
                        Simulate Tier {def.tier} Access →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: 1-CLICK ROLE & PERSONA SWITCHER */}
          {/* ================================================================ */}
          {activeTab === 'demo' && (
            <div className="space-y-4 text-left">
              <div className="p-4 rounded-md bg-[#121622] border border-white/10 text-xs text-neutral-300 font-light">
                <span className="font-semibold text-white">Evaluator Workbench:</span> Switch between preset personas to test how the permission wall behaves for unregistered guests, applicants awaiting review, verified partners, athletic directors, and accredited investors.
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {/* Public Guest */}
                <button
                  type="button"
                  onClick={() => handleInstantPreset(0)}
                  className="p-4 rounded-md bg-[#10141D] hover:bg-[#141924] border border-white/10 text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-neutral-400 font-bold">Public Guest</span>
                    <Lock size={14} className="text-neutral-500" />
                  </div>
                  <div className="font-display font-bold text-sm text-white">Unregistered Visitor</div>
                  <div className="text-[11px] text-neutral-400 font-light mt-1">
                    Default visitor state. All robust tools locked behind membership wall.
                  </div>
                </button>

                {/* Pending Applicant */}
                <button
                  type="button"
                  onClick={handlePresetPending}
                  className="p-4 rounded-md bg-[#10141D] hover:bg-[#141924] border border-amber-500/30 text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-amber-400 font-bold">Pending Review</span>
                    <Clock size={14} className="text-amber-400" />
                  </div>
                  <div className="font-display font-bold text-sm text-white">Marcus Sterling (Penn State)</div>
                  <div className="text-[11px] text-neutral-400 font-light mt-1">
                    Application under review. Shows live approval pipeline with instant grant option.
                  </div>
                </button>

                {/* Tier 1 Derrick Chen */}
                <button
                  type="button"
                  onClick={() => handleInstantPreset(1)}
                  className="p-4 rounded-md bg-[#10141D] hover:bg-[#141924] border border-[#38BDF8]/30 text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-[#38BDF8] font-bold">Tier 1 Approved</span>
                    <Building2 size={14} className="text-[#38BDF8]" />
                  </div>
                  <div className="font-display font-bold text-sm text-white">Derrick Chen (UT Austin)</div>
                  <div className="text-[11px] text-neutral-400 font-light mt-1">
                    Unlocks 43-Brand directory, topology, campus map, and NIL calculator.
                  </div>
                </button>

                {/* Tier 2 Dr. Elena Rostova */}
                <button
                  type="button"
                  onClick={() => handleInstantPreset(2)}
                  className="p-4 rounded-md bg-[#10141D] hover:bg-[#141924] border border-[#E8C98B]/30 text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-[#E8C98B] font-bold">Tier 2 Approved</span>
                    <Scale size={14} className="text-[#E8C98B]" />
                  </div>
                  <div className="font-display font-bold text-sm text-white">Dr. Elena Rostova (Ohio State)</div>
                  <div className="text-[11px] text-neutral-400 font-light mt-1">
                    Unlocks House v. NCAA regulatory audits, Title IX parity, risk matrices.
                  </div>
                </button>

                {/* Tier 3 Kevin Mitchell */}
                <button
                  type="button"
                  onClick={() => handleInstantPreset(3)}
                  className="p-4 rounded-md bg-[#10141D] hover:bg-[#141924] border border-[#68D391]/30 text-left transition-all sm:col-span-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-[#68D391] font-bold">Tier 3 Executive Approved</span>
                    <DollarSign size={14} className="text-[#68D391]" />
                  </div>
                  <div className="font-display font-bold text-sm text-white">Kevin Mitchell (Syndicate Fiduciary)</div>
                  <div className="text-[11px] text-neutral-400 font-light mt-1">
                    Unlocks full DCF financial workbench, TAM scenario simulator, and AI fiduciary orchestrator.
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 5: GOOGLE SSO */}
          {/* ================================================================ */}
          {activeTab === 'google' && (
            <div className="max-w-md mx-auto space-y-4 py-4 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#C89B3C]">
                <Mail size={22} />
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                Google Workspace Institutional SSO
              </h4>
              <p className="text-xs text-neutral-300 font-light">
                Sign in with your university or corporate Google Workspace account (.edu or institutional domain) for instant clearance verification.
              </p>

              {googleAuthError && (
                <div className="p-3 rounded bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs font-mono text-left">
                  {googleAuthError}
                </div>
              )}

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3 px-4 rounded-sm bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-xs font-mono transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/[0.08] bg-[#0E121B] flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-neutral-500">
            College Company Governance & Institutional Security
          </span>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Window [Esc]
          </button>
        </div>

      </div>
    </div>
  );
};
