import React from 'react';
import { useApp } from '../../context/AppContext';
import { RecommendationEngine } from '../../services/recommendationEngine';
import { Sparkles, Plus, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { Badge } from '../Badge';

export const RecommendedSkillsWidget: React.FC = () => {
  const { profile, updateProfile, setActiveTab } = useApp();

  const recommendedSkills = RecommendationEngine.getRecommendedSkillsToDevelop(profile);

  const handleAddSkill = (skillName: string) => {
    if (profile.skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) return;
    updateProfile({
      skills: [...profile.skills, { name: skillName, level: 'Beginner' }],
    });
  };

  return (
    <div className="rounded-3xl bg-navy-900 border border-slate-800/80 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Recommended Skills to Develop</h3>
          </div>
          <Badge variant="amber" size="xs">
            Gap Analysis
          </Badge>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Based on requirements for <strong className="text-white">{profile.targetRole || profile.customDepartment || profile.department}</strong>:
        </p>

        <div className="space-y-2.5">
          {recommendedSkills.map((item) => {
            const alreadyHas = profile.skills.some(
              (s) => s.name.toLowerCase() === item.name.toLowerCase()
            );

            return (
              <div
                key={item.name}
                className="p-3 rounded-2xl bg-navy-950/80 border border-slate-800 flex items-start justify-between gap-3 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <Badge variant={item.priority === 'High' ? 'rose' : 'amber'} size="xs">
                      {item.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.reason}</p>
                </div>

                {alreadyHas ? (
                  <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1 shrink-0">
                    <Check className="w-3.5 h-3.5" /> Added
                  </span>
                ) : (
                  <button
                    onClick={() => handleAddSkill(item.name)}
                    className="p-1.5 rounded-lg bg-navy-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1 shrink-0"
                    title="Add to my profile skills"
                  >
                    <Plus className="w-3.5 h-3.5 text-cyan-400" /> Track
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span>{profile.skills.length} skills currently tracked</span>
        <button
          onClick={() => setActiveTab('profile')}
          className="text-cyan-400 hover:underline font-medium"
        >
          Manage skills &rarr;
        </button>
      </div>
    </div>
  );
};
