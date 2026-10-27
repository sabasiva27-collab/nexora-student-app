import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { Badge } from '../Badge';

export const SkillsDistribution: React.FC = () => {
  const { profile, roadmap } = useApp();

  // Calculate task counts per skill
  const skillUsageMap: Record<string, { total: number; completed: number }> = {};

  roadmap.milestones.forEach((m) => {
    m.tasks.forEach((t) => {
      t.skills.forEach((skill) => {
        if (!skillUsageMap[skill]) {
          skillUsageMap[skill] = { total: 0, completed: 0 };
        }
        skillUsageMap[skill].total += 1;
        if (t.isCompleted) {
          skillUsageMap[skill].completed += 1;
        }
      });
    });
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Intermediate':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      default:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    }
  };

  return (
    <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-tight">Tracked Skills & Practise Depth</h3>
        </div>
        <span className="text-xs text-slate-400">{profile.skills.length} Skills Listed</span>
      </div>

      <div className="space-y-3">
        {profile.skills.map((skill) => {
          const usage = skillUsageMap[skill.name] || { total: 0, completed: 0 };
          const progressPercent = usage.total > 0 ? Math.round((usage.completed / usage.total) * 100) : 0;

          return (
            <div
              key={skill.name}
              className="p-3.5 rounded-2xl bg-navy-950 border border-slate-800/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{skill.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${getLevelColor(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-300">
                  {usage.completed}/{usage.total} Sprint Tasks
                </span>
              </div>

              {/* Skill Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-navy-900 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-[11px] text-slate-500 text-center">
        Honest self-reported proficiency levels. No automated certifications are fabricated.
      </div>
    </div>
  );
};
