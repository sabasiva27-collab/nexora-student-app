import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScoredOpportunity } from '../../types/opportunity';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Bookmark,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Eye,
  GraduationCap,
} from 'lucide-react';
import { Badge } from '../Badge';

interface OpportunityCardProps {
  opportunity: ScoredOpportunity;
  onOpenDetails: (opp: ScoredOpportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onOpenDetails,
}) => {
  const { bookmarks, toggleBookmark, applications, updateApplicationStatus } = useApp();
  const [showRationale, setShowRationale] = useState(false);

  const isBookmarked = bookmarks.includes(opportunity.id);
  const applicationRecord = applications.find((a) => a.opportunityId === opportunity.id);

  const getCategoryVariant = (category: string) => {
    switch (category) {
      case 'Hackathon':
      case 'Conference':
      case 'Industrial Training':
        return 'violet';
      case 'Internship':
      case 'Scholarship':
      case 'Certification':
        return 'emerald';
      case 'Workshop':
      case 'Online Course':
      case 'Research Opportunity':
        return 'cyan';
      case 'Placement Preparation':
        return 'rose';
      default:
        return 'amber';
    }
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (opportunity.officialRegistrationUrl) {
      window.open(opportunity.officialRegistrationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="rounded-3xl bg-navy-900 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 shadow-lg shadow-black/20 flex flex-col justify-between overflow-hidden group">
      {/* Top Banner Ribbon */}
      <div className="px-5 pt-5 pb-3">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={getCategoryVariant(opportunity.category) as any} size="xs">
              {opportunity.category}
            </Badge>

            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> {opportunity.matchScore.totalScore}% Match
            </span>

            <span className="text-[10px] text-slate-400 bg-navy-950 px-2 py-0.5 rounded-md border border-slate-800">
              {opportunity.type}
            </span>

            {/* Clear Demo Label */}
            <span className="text-[10px] text-amber-400/90 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-500/20 font-medium">
              Demo Data
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => toggleBookmark(opportunity.id)}
            className={`p-2 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'bg-navy-950 text-slate-400 hover:text-white border-slate-800'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Save Opportunity'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-400 text-cyan-400' : ''}`} />
          </button>
        </div>

        {/* Title & Organizer */}
        <h3
          onClick={() => onOpenDetails(opportunity)}
          className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug line-clamp-2"
          title={opportunity.title}
        >
          {opportunity.title}
        </h3>

        <p className="text-xs text-slate-400 mt-1 font-medium">{opportunity.organizer}</p>

        {/* Description brief */}
        <p className="text-xs text-slate-300/90 mt-2.5 line-clamp-2 leading-relaxed">
          {opportunity.description}
        </p>

        {/* Key Event Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{opportunity.dateTimeDisplay}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            <span className="truncate">
              {opportunity.type === 'Online' ? 'Virtual (Online)' : `${opportunity.location} (${opportunity.distanceKm} km)`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate text-rose-300">Deadline: {opportunity.registrationDeadlineDisplay}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-emerald-400">{opportunity.feeDisplay}</span>
          </div>
        </div>

        {/* Required Skills Pills */}
        <div className="mt-3.5">
          <div className="flex flex-wrap gap-1.5">
            {opportunity.requiredSkills.slice(0, 4).map((skill) => {
              const isMatched = opportunity.matchScore.matchedSkills.includes(skill);
              return (
                <span
                  key={skill}
                  className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                    isMatched
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      : 'bg-navy-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {skill} {isMatched && '✓'}
                </span>
              );
            })}
            {opportunity.requiredSkills.length > 4 && (
              <span className="text-[10px] text-slate-500 self-center">
                +{opportunity.requiredSkills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Eligibility & Target Departments */}
        <div className="mt-3 text-[11px] text-slate-400 bg-navy-950/60 p-2.5 rounded-xl border border-slate-850 space-y-1">
          <div>
            <span className="font-semibold text-slate-300">Eligibility:</span> {opportunity.eligibility}
          </div>
          {opportunity.eligibleAcademicYears && (
            <div className="text-[10px] text-cyan-400/90 flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              <span>Years: {opportunity.eligibleAcademicYears.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Rationale Toggle & Details */}
      <div className="px-5 py-2 bg-navy-950/50 border-t border-slate-850">
        <button
          type="button"
          onClick={() => setShowRationale(!showRationale)}
          className="w-full flex items-center justify-between text-[11px] text-slate-400 hover:text-cyan-300 py-1 font-medium transition-colors"
        >
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Why this is recommended for you ({opportunity.matchScore.rationale.length} factors)
          </span>
          {showRationale ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showRationale && (
          <ul className="mt-2 space-y-1 pb-2 text-[11px] text-slate-300 border-t border-slate-800 pt-2 animate-fade-in">
            {opportunity.matchScore.rationale.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-cyan-400 shrink-0">•</span>
                <span>{reason}</span>
              </li>
            ))}
            <li className="text-[10px] text-slate-500 pt-1 italic">
              Verified: {opportunity.lastVerifiedDate} • Demonstration Data
            </li>
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-navy-950 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenDetails(opportunity)}
          className="px-3.5 py-2 rounded-xl bg-navy-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition-colors flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5 text-slate-400" /> Full Details
        </button>

        {/* Apply Now button with unavailable state check */}
        {opportunity.officialRegistrationUrl ? (
          <button
            type="button"
            onClick={handleApplyClick}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div
            className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[11px] font-semibold text-slate-400 flex items-center gap-1.5 cursor-not-allowed"
            title="Official registration link not provided by organizer yet"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Registration Link Unavailable</span>
          </div>
        )}
      </div>
    </div>
  );
};
