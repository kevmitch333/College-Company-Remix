import React, { useRef } from 'react';
import { ShieldCheck, Lock, Scale, X } from 'lucide-react';
import { useModalA11y } from './public/useModalA11y';

export type LegalModalType = 'confidentiality' | 'regulatory' | null;

interface InstitutionalLegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const InstitutionalLegalModal: React.FC<InstitutionalLegalModalProps> = ({ type, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useModalA11y(!!type, onClose, dialogRef, closeBtnRef);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-[#0E121A] border border-white/15 rounded-xl w-full max-w-2xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-gradient-to-r from-amber-600 via-[#C89B3C] to-emerald-500 w-full" />

        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#121622]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#181D2A] text-[#C89B3C] border border-[#C89B3C]/30">
              {type === 'confidentiality' ? <Lock size={18} /> : <Scale size={18} />}
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#E8C98B]">
                College Company Governance
              </div>
              <h2 id="legal-modal-title" className="text-xl font-bold text-white font-display">
                {type === 'confidentiality' ? 'Confidentiality & Partner Guidelines' : 'Compliance & Educational Disclosures'}
              </h2>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close legal dialog"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded bg-[#181D2A] hover:bg-[#22293A] border border-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-base text-neutral-200 leading-relaxed">
          {type === 'confidentiality' ? (
            <>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-display">1. Partner Material Handling</h3>
                <p>
                  Materials shared inside authorized partner workspaces by College Company are intended solely for program evaluation and campus coordination.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-display">2. Student Privacy</h3>
                <p>
                  College Company collects only the minimum contact information submitted voluntarily by students, parents, institutions, or brands.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-display">1. Educational Scope</h3>
                <p>
                  Curriculum guides, NIL tax modules, and compliance checklists published by College Company are educational resources and do not constitute personalized tax, legal, immigration, or financial aid advice.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-display">2. Student-First Charter</h3>
                <p>
                  Under the Placement Desk model, participating brands pay a clearly disclosed fee and students or learners pay zero commission.
                </p>
              </div>
            </>
          )}

          <div className="p-3 bg-[#0A0D14] rounded border border-white/10 flex items-center gap-2 text-sm font-mono text-neutral-300">
            <ShieldCheck size={16} className="text-[#68D391] shrink-0" />
            <span>Development preview — programs, data, and commercial terms are illustrative and subject to verification.</span>
          </div>
        </div>

        <div className="p-4 bg-[#0A0D14] border-t border-white/10 flex items-center justify-between font-mono text-xs">
          <span className="text-neutral-400">College Company · Boston, Massachusetts</span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 rounded bg-[#C89B3C] hover:bg-[#D4AF37] text-[#090A0C] font-semibold text-sm transition-colors cursor-pointer"
          >
            Close [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
