import React, { useState } from 'react';
import { Modal } from '../Modal';
import { AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';

interface ApplyConfirmModalProps {
  isOpen: boolean;
  opportunityTitle: string;
  officialUrl?: string;
  onClose: () => void;
  onConfirm: (notes: string) => void;
}

export const ApplyConfirmModal: React.FC<ApplyConfirmModalProps> = ({
  isOpen,
  opportunityTitle,
  officialUrl,
  onClose,
  onConfirm,
}) => {
  const [confirmedChecked, setConfirmedChecked] = useState(false);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedChecked) return;
    onConfirm(notes);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Official Application Submission"
      subtitle="Verification requirement to maintain honest tracking integrity."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Target: {opportunityTitle}</span>
          </div>
          <p className="leading-relaxed">
            NEXORA does not submit external applications automatically. To mark this opportunity as <strong>"Applied"</strong>, please confirm that you have filled out and submitted the official registration form on the host website.
          </p>
          {officialUrl && (
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-semibold mt-1"
            >
              Verify on Host Portal <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Checkbox verification */}
        <label className="flex items-start gap-3 p-3 rounded-xl bg-navy-950 border border-slate-800 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={confirmedChecked}
            onChange={(e) => setConfirmedChecked(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-cyan-500 accent-cyan-400 focus:ring-0 cursor-pointer"
          />
          <span className="text-xs text-slate-200 font-medium leading-relaxed">
            I confirm that I have submitted my official application/registration externally.
          </span>
        </label>

        {/* Optional notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Application Notes / Reference ID (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Registered with team 'CodeCraft', confirmation #4928"
            className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-navy-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!confirmedChecked}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Confirm & Mark Applied
          </button>
        </div>
      </form>
    </Modal>
  );
};
