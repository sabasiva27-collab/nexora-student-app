import React, { useState } from 'react';
import { RoadmapTask } from '../../types/roadmap';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  FolderGit2,
} from 'lucide-react';
import { Badge } from '../Badge';

interface TaskItemProps {
  task: RoadmapTask;
  onToggle: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (task: RoadmapTask) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [expanded, setExpanded] = useState(false);

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'project':
        return 'violet';
      case 'practice':
        return 'cyan';
      case 'concept':
        return 'emerald';
      case 'challenge':
        return 'rose';
      default:
        return 'slate';
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        task.isCompleted
          ? 'bg-navy-950/40 border-slate-800/60 opacity-80'
          : 'bg-navy-950/90 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="p-3.5 sm:p-4 flex items-start gap-3">
        {/* Checkbox Button */}
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className="mt-0.5 shrink-0 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
          aria-label={task.isCompleted ? 'Mark incomplete' : 'Mark completed'}
        >
          {task.isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
          ) : (
            <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400" />
          )}
        </button>

        {/* Task Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant={getTypeVariant(task.type) as any} size="xs">
              {task.type}
            </Badge>

            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" /> {task.estimatedHours} hrs
            </span>

            {task.isCompleted && (
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                Completed
              </span>
            )}
          </div>

          <h4
            onClick={() => onToggle(task.id)}
            className={`text-sm font-semibold cursor-pointer transition-colors ${
              task.isCompleted ? 'line-through text-slate-400' : 'text-white hover:text-cyan-300'
            }`}
          >
            {task.title}
          </h4>

          {/* Practical Outcome brief */}
          {task.practicalOutcome && (
            <p className="text-xs text-slate-300 mt-1 flex items-start gap-1.5">
              <span className="text-cyan-400 font-bold shrink-0">↳</span>
              <span className="line-clamp-1 italic text-slate-300">{task.practicalOutcome}</span>
            </p>
          )}

          {/* Skills pills */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {task.skills.map((skill) => (
              <span
                key={skill}
                className="text-[10px] px-2 py-0.5 rounded bg-navy-900 border border-slate-800 text-slate-400 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Menu */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded text-slate-500 hover:text-slate-300"
            title="Expand Description"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Expanded full description */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 bg-navy-950/70 border-t border-slate-850 text-xs text-slate-300 leading-relaxed animate-fade-in space-y-2">
          <p>{task.description}</p>
          {task.practicalOutcome && (
            <div className="p-2.5 rounded-lg bg-navy-900 border border-slate-800 text-[11px] text-cyan-300">
              <strong>Practical Deliverable:</strong> {task.practicalOutcome}
            </div>
          )}
          {task.completedAt && (
            <p className="text-[10px] text-slate-500">
              Completed on: {new Date(task.completedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
