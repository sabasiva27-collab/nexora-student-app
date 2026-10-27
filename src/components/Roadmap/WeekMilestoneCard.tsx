import React from 'react';
import { RoadmapMilestone, RoadmapTask } from '../../types/roadmap';
import { TaskItem } from './TaskItem';
import {
  FolderGit2,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';
import { Badge } from '../Badge';

interface WeekMilestoneCardProps {
  milestone: RoadmapMilestone;
  onToggleTask: (taskId: string) => void;
  onAddTask: (weekNumber: number) => void;
  onDeleteTask: (taskId: string) => void;
}

export const WeekMilestoneCard: React.FC<WeekMilestoneCardProps> = ({
  milestone,
  onToggleTask,
  onAddTask,
  onDeleteTask,
}) => {
  const completedCount = milestone.tasks.filter((t) => t.isCompleted).length;
  const totalTasks = milestone.tasks.length;
  const percent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  const isWeekComplete = percent === 100;

  return (
    <div className="rounded-3xl bg-navy-900 border border-slate-800/80 p-5 sm:p-7 space-y-6 shadow-xl shadow-black/20">
      {/* Header of Week */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Week {milestone.weekNumber} Milestone
            </span>
            <Badge variant="violet" size="xs">
              {milestone.theme}
            </Badge>
            {isWeekComplete && (
              <Badge variant="emerald" size="xs" icon={<CheckCircle2 className="w-3 h-3" />}>
                Week Finished
              </Badge>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {milestone.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">{milestone.goalSummary}</p>
        </div>

        {/* Week Progress Metric */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-xs font-bold text-white">{percent}% Done</span>
            <p className="text-[10px] text-slate-500">{completedCount}/{totalTasks} Tasks</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-navy-950 border border-slate-800 flex items-center justify-center font-black text-xs text-cyan-400">
            {percent}%
          </div>
        </div>
      </div>

      {/* Practical Milestone Project Showcase Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-navy-950 to-cyan-950/40 border border-violet-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-cyan-400" /> Milestone Project Deliverable:
          </span>
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
              milestone.practicalProject.isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-navy-900 text-slate-400 border-slate-700'
            }`}
          >
            {milestone.practicalProject.isCompleted ? '✓ Project Shipped' : 'In Progress'}
          </span>
        </div>

        <h4 className="text-sm font-bold text-white">{milestone.practicalProject.title}</h4>
        <p className="text-xs text-slate-300 leading-relaxed">{milestone.practicalProject.description}</p>

        <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span><strong>Deliverable:</strong> {milestone.practicalProject.deliverable}</span>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Weekly Step-by-Step Tasks ({totalTasks}):
          </span>
          <button
            onClick={() => onAddTask(milestone.weekNumber)}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Task
          </button>
        </div>

        <div className="space-y-2.5">
          {milestone.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={task.id.startsWith('task-custom-') ? onDeleteTask : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
