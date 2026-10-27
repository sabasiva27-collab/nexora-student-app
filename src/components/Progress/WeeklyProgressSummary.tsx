import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, CheckCircle2, Clock, FolderGit2 } from 'lucide-react';
import { Badge } from '../Badge';

export const WeeklyProgressSummary: React.FC = () => {
  const { roadmap, profile } = useApp();

  return (
    <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-violet-400" />
          <h3 className="text-base font-bold text-white tracking-tight">Weekly Roadmap Sprint Progress</h3>
        </div>
        <span className="text-xs text-slate-400">{profile.weeklyHoursAvailable} hrs/wk budget</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {roadmap.milestones.map((m) => {
          const completedTasks = m.tasks.filter((t) => t.isCompleted).length;
          const totalTasks = m.tasks.length;
          const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
          const hoursDone = m.tasks
            .filter((t) => t.isCompleted)
            .reduce((acc, t) => acc + t.estimatedHours, 0);

          return (
            <div
              key={m.id}
              className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Week {m.weekNumber}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    percent === 100
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-navy-900 text-slate-400'
                  }`}
                >
                  {percent}% Done
                </span>
              </div>

              <h4 className="text-xs font-bold text-white line-clamp-1">{m.theme}</h4>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-navy-900 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> {completedTasks}/{totalTasks} Tasks
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-violet-400" /> {hoursDone} hrs
                </span>
              </div>

              {/* Project Status */}
              <div className="p-2.5 rounded-xl bg-navy-900 border border-slate-800/80 text-[11px] flex items-center justify-between">
                <span className="truncate text-slate-300 max-w-[160px]">
                  {m.practicalProject.title}
                </span>
                <span
                  className={`text-[10px] font-semibold shrink-0 ml-1 ${
                    m.practicalProject.isCompleted ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {m.practicalProject.isCompleted ? 'Shipped ✓' : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
