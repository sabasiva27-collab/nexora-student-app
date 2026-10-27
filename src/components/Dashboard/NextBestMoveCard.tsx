import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, Clock, Target, Gift, Info } from 'lucide-react';
import { Badge } from '../Badge';

export const NextBestMoveCard: React.FC = () => {
  const { nextBestMove, setActiveTab, setSelectedOpportunityId } = useApp();

  const handleActionClick = () => {
    if (nextBestMove.actionType === 'navigate_roadmap') {
      setActiveTab('roadmap');
    } else if (nextBestMove.actionType === 'view_opportunity') {
      setSelectedOpportunityId(nextBestMove.targetId);
      setActiveTab('opportunities');
    } else {
      setActiveTab('profile');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 shadow-xl shadow-violet-900/20 group">
      {/* Background card with subtle glass effect */}
      <div className="relative h-full w-full rounded-[22px] bg-navy-900/95 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between">
        {/* Glow ambient background circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

        <div>
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1.5px] shadow-md shadow-violet-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  Your Next Best Move
                </span>
                <p className="text-[11px] text-slate-400">Prioritised by Rule-Based Match Engine</p>
              </div>
            </div>

            <Badge variant="cyan" size="sm" icon={<Target className="w-3.5 h-3.5" />}>
              {nextBestMove.badgeText}
            </Badge>
          </div>

          {/* Action Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-4 group-hover:text-cyan-200 transition-colors">
            {nextBestMove.actionTitle}
          </h2>

          {/* 3 Core Explainability Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-5">
            {/* 1. Why Relevant */}
            <div className="p-3.5 rounded-2xl bg-navy-950/70 border border-slate-800/80 flex flex-col justify-between">
              <span className="text-xs font-semibold text-violet-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Target className="w-3.5 h-3.5 text-violet-400 shrink-0" /> Why It Matters:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{nextBestMove.whyRelevant}</p>
            </div>

            {/* 2. Estimated Time */}
            <div className="p-3.5 rounded-2xl bg-navy-950/70 border border-slate-800/80 flex flex-col justify-between">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Time Required:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{nextBestMove.estimatedTime}</p>
            </div>

            {/* 3. Expected Benefit */}
            <div className="p-3.5 rounded-2xl bg-navy-950/70 border border-slate-800/80 flex flex-col justify-between">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Gift className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Tangible Gain:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{nextBestMove.expectedBenefit}</p>
            </div>
          </div>
        </div>

        {/* Footer with transparent note and CTA */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{nextBestMove.engineNote}</span>
          </div>

          <button
            onClick={handleActionClick}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:scale-[1.02]"
          >
            <span>{nextBestMove.buttonLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
