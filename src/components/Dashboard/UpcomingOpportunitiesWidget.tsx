import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScoredOpportunity } from '../../types/opportunity';
import {
  Compass,
  ArrowRight,
  Bookmark,
  Calendar,
  MapPin,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../Badge';

export const UpcomingOpportunitiesWidget: React.FC = () => {
  const { scoredOpportunities, bookmarks, toggleBookmark, setActiveTab, setSelectedOpportunityId } = useApp();

  const topOpportunities = scoredOpportunities.slice(0, 3);

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

  return (
    <div className="rounded-3xl bg-navy-900 border border-slate-800/80 p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">Recommended Opportunities</h3>
          </div>
          <button
            onClick={() => setActiveTab('opportunities')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            Explore All ({scoredOpportunities.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Ranked by match with your skills, department, and deadlines:
        </p>

        <div className="space-y-3">
          {topOpportunities.map((opp) => {
            const isBookmarked = bookmarks.includes(opp.id);
            return (
              <div
                key={opp.id}
                className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <Badge variant={getCategoryVariant(opp.category) as any} size="xs">
                        {opp.category}
                      </Badge>
                      <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                        {opp.matchScore.totalScore}% Match
                      </span>
                      <span className="text-[10px] text-slate-500">• {opp.type}</span>
                    </div>

                    <h4
                      onClick={() => {
                        setSelectedOpportunityId(opp.id);
                        setActiveTab('opportunities');
                      }}
                      className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer truncate"
                      title={opp.title}
                    >
                      {opp.title}
                    </h4>

                    <p className="text-xs text-slate-400 truncate mt-0.5">{opp.organizer}</p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        Deadline: {opp.registrationDeadlineDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(opp.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isBookmarked
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-navy-900 text-slate-400 hover:text-white border-slate-800'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Opportunity'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-400' : ''}`} />
                  </button>
                </div>

                {/* Match Rationale snippet */}
                {opp.matchScore.rationale.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-850 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate">
                      💡 {opp.matchScore.rationale[0]}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedOpportunityId(opp.id);
                        setActiveTab('opportunities');
                      }}
                      className="text-cyan-400 hover:underline shrink-0 font-medium ml-2"
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span>Curated for student growth</span>
        <button
          onClick={() => setActiveTab('opportunities')}
          className="text-cyan-400 hover:underline font-medium"
        >
          View all 14+ events &rarr;
        </button>
      </div>
    </div>
  );
};
