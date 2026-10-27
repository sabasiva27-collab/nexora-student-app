import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScoredOpportunity } from '../../types/opportunity';
import { ApplicationStatus } from '../../types/tracking';
import { Modal } from '../Modal';
import { Badge } from '../Badge';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Bookmark,
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Check,
} from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: ScoredOpportunity | null;
  onClose: () => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
}) => {
  const { bookmarks, toggleBookmark, applications, updateApplicationStatus } = useApp();

  const [confirmingApplied, setConfirmingApplied] = useState(false);
  const [applicationNotes, setApplicationNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!opportunity) return null;

  const isBookmarked = bookmarks.includes(opportunity.id);
  const currentApp = applications.find((a) => a.opportunityId === opportunity.id);
  const currentStatus: ApplicationStatus = currentApp?.status || (isBookmarked ? 'Saved' : 'Planning to Apply');

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    if (newStatus === 'Applied') {
      setConfirmingApplied(true);
      return;
    }
    updateApplicationStatus(opportunity.id, newStatus, false, applicationNotes);
    setSuccessMessage(`Status updated to "${newStatus}"`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleConfirmApplied = () => {
    updateApplicationStatus(opportunity.id, 'Applied', true, applicationNotes);
    setConfirmingApplied(false);
    setSuccessMessage('Application marked as "Applied" after your external submission confirmation.');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <Modal isOpen={true} onClose={onClose} maxWidth="3xl">
      <div className="space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="violet" size="sm">
              {opportunity.category}
            </Badge>
            <Badge variant="cyan" size="sm" icon={<Sparkles className="w-3 h-3" />}>
              {opportunity.matchScore.totalScore}% Match Score
            </Badge>
            <span className="text-xs text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
              Demo Opportunity
            </span>
          </div>

          <button
            onClick={() => toggleBookmark(opportunity.id)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isBookmarked
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-navy-950 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-cyan-400 text-cyan-400' : ''}`} />
            <span>{isBookmarked ? 'Saved in Watchlist' : 'Save to Watchlist'}</span>
          </button>
        </div>

        {/* Title & Organizer */}
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">{opportunity.title}</h2>
          <p className="text-sm font-medium text-cyan-400 mt-1">{opportunity.organizer}</p>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-navy-950 border border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block">Date & Duration</span>
            <p className="font-semibold text-white mt-0.5">{opportunity.dateTimeDisplay}</p>
          </div>
          <div>
            <span className="text-slate-500 block">Mode / Location</span>
            <p className="font-semibold text-white mt-0.5">
              {opportunity.type === 'Online' ? 'Virtual Online' : `${opportunity.location} (${opportunity.distanceKm} km)`}
            </p>
          </div>
          <div>
            <span className="text-slate-500 block">Registration Fee</span>
            <p className="font-semibold text-emerald-400 mt-0.5">{opportunity.feeDisplay}</p>
          </div>
          <div>
            <span className="text-slate-500 block">Deadline</span>
            <p className="font-semibold text-rose-400 mt-0.5">{opportunity.registrationDeadlineDisplay}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About This Opportunity</h4>
          <p className="text-sm text-slate-200 leading-relaxed bg-navy-950/60 p-4 rounded-2xl border border-slate-850">
            {opportunity.description}
          </p>
        </div>

        {/* Eligibility & Target Disciplines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-navy-950/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Eligibility Criteria
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{opportunity.eligibility}</p>
            {opportunity.eligibleAcademicYears && (
              <p className="text-[11px] text-cyan-300">
                <strong>Eligible Academic Years:</strong> {opportunity.eligibleAcademicYears.join(', ')}
              </p>
            )}
            <div className="pt-1">
              <span className="text-[11px] text-slate-400 block mb-1">
                <strong>Target Departments:</strong>
              </span>
              <div className="flex flex-wrap gap-1">
                {opportunity.department.map((d) => (
                  <span
                    key={d}
                    className="text-[10px] px-2 py-0.5 rounded bg-navy-900 border border-slate-700 text-slate-300"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-navy-950/70 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-violet-400" /> Student Perks & Rewards
            </h4>
            <ul className="text-xs text-slate-300 space-y-1">
              {opportunity.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Schedule Highlights */}
        {opportunity.scheduleHighlights && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Schedule Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {opportunity.scheduleHighlights.map((hl, i) => (
                <div key={i} className="p-3 rounded-xl bg-navy-950 border border-slate-800 text-xs text-slate-300">
                  <span className="text-[10px] text-cyan-400 font-bold block mb-0.5">Phase {i + 1}</span>
                  {hl}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Match Rationale Breakdown */}
        <div className="p-4 rounded-2xl bg-violet-950/20 border border-violet-500/20">
          <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Transparent Match Engine Breakdown:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {opportunity.matchScore.rationale.map((r, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-cyan-400 shrink-0">•</span>
                <span>{r}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-violet-500/20 flex items-center justify-between text-[11px] text-slate-400">
            <span>Score calculation: Skills (30%) + Interests (25%) + Department (20%) + Location (15%) + Urgency (10%)</span>
            <span>Last verified: {opportunity.lastVerifiedDate}</span>
          </div>
        </div>

        {/* Application Status Pipeline Updater */}
        <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Track this opportunity in your pipeline:
            </span>
            <Badge variant="cyan" size="xs">
              Current: {currentApp?.status || 'Not Applied'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['Saved', 'Planning to Apply', 'Applied', 'Completed'] as ApplicationStatus[]).map((status) => {
              const isSelected = currentApp?.status === status;
              return (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/30'
                      : 'bg-navy-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>

          {successMessage && (
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 animate-fade-in">
              <Check className="w-3.5 h-3.5" /> {successMessage}
            </p>
          )}

          {/* Strict Applied Confirmation Modal Prompt */}
          {confirmingApplied && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-3 animate-fade-in">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white">Confirm External Submission</h5>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    NEXORA does not submit applications on your behalf. Please confirm that you have submitted your application or registration form on the organiser's official website.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setConfirmingApplied(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-navy-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmApplied}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  Yes, I submitted externally
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Close Details
          </button>

          {opportunity.officialRegistrationUrl ? (
            <a
              href={opportunity.officialRegistrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
            >
              <span>Open Official Registration Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Official Link Unavailable (Check with Organiser)</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
