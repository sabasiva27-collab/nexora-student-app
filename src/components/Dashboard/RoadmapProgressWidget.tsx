import React from 'react';
import { useApp } from '../../context/AppContext';
import { Map, CheckCircle2, Circle, ArrowRight, Award, FolderGit2 } from 'lucide-react';
import { Badge } from '../Badge';

export const RoadmapProgressWidget: React.FC = () => {
  const { roadmap, toggleTaskCompletion, setActiveTab, stats } = useApp();

  // Find active milestone (earliest milestone with incomplete tasks)
  const activeMilestone =
    roadmap.milestones.find((m) => m.tasks.some((t) => !t.isCompleted)) || roadmap.milestones[0];

  return (
    <div className="rounded-3xl bg-navy-900 border border-slate-800/80 p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-violet-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">30-Day Growth Roadmap</h3>
          </div>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
          >
            Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Overall Progress Bar */}
        <div className="mb-5 p-4 rounded-2xl bg-navy-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-white">Overall Sprint Completion</span>
            <span className="font-bold text-cyan-400">{stats.roadmapProgressPercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-navy-900 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${stats.roadmapProgressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
            <span>{stats.completedTasks} of {stats.totalTasks} tasks complete</span>
            <span>{stats.hoursInvested} hours logged</span>
          </div>
        </div>

        {/* Current Active Week Box */}
        {activeMilestone && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Active: Week {activeMilestone.weekNumber} Focus
              </span>
              <Badge variant="violet" size="xs">
                {activeMilestone.theme}
              </Badge>
            </div>

            <p className="text-xs text-slate-300">{activeMilestone.goalSummary}</p>

            {/* Practical Project Deliverable Pill */}
            <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-500/20 flex items-start gap-2.5">
              <FolderGit2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-violet-200">
                  {activeMilestone.practicalProject.title}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {activeMilestone.practicalProject.deliverable}
                </p>
              </div>
            </div>

            {/* Next 2 Pending Tasks in this Milestone */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Up Next In This Week:
              </span>
              {activeMilestone.tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                    task.isCompleted
                      ? 'bg-navy-950/40 border-slate-800/60 opacity-60'
                      : 'bg-navy-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {task.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-medium truncate ${
                        task.isCompleted ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {task.title}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      {task.estimatedHours} hrs • {task.skills.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span>Includes 4 structured practical projects</span>
        <button
          onClick={() => setActiveTab('roadmap')}
          className="text-violet-400 hover:underline font-medium"
        >
          View all 4 weeks &rarr;
        </button>
      </div>
    </div>
  );
};
