import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WeekMilestoneCard } from './WeekMilestoneCard';
import { RoadmapDisclaimer } from './RoadmapDisclaimer';
import { AddTaskModal } from './AddTaskModal';
import { ALL_ROADMAP_TRACKS } from '../../data/starterRoadmapData';
import {
  Map,
  Sparkles,
  CheckCircle2,
  Clock,
  FolderGit2,
  Plus,
  RotateCcw,
  Compass,
  Layers,
} from 'lucide-react';
import { Badge } from '../Badge';

export const RoadmapView: React.FC = () => {
  const { roadmap, switchRoadmapTrack, toggleTaskCompletion, addTaskToWeek, deleteTask, stats, profile } = useApp();

  const [addingWeekNumber, setAddingWeekNumber] = useState<number | null>(null);

  const activeDepartmentName = profile.customDepartment || profile.department;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="cyan" size="xs">
                30-Day Growth Sprint
              </Badge>
              <span className="text-xs text-slate-300 font-medium">
                Tailored for {activeDepartmentName}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {roadmap.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {roadmap.description}
            </p>
          </div>

          {/* Quick Sprint Metrics */}
          <div className="flex items-center gap-4 bg-navy-950/80 p-4 rounded-2xl border border-slate-800 shrink-0">
            <div>
              <p className="text-[11px] text-slate-400">Total Progress</p>
              <p className="text-2xl font-black text-cyan-400">{stats.roadmapProgressPercent}%</p>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div>
              <p className="text-[11px] text-slate-400">Tasks Completed</p>
              <p className="text-lg font-bold text-white">{stats.completedTasks} / {stats.totalTasks}</p>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div>
              <p className="text-[11px] text-slate-400">Hours Invested</p>
              <p className="text-lg font-bold text-violet-400">{stats.hoursInvested}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Track Switcher Bar */}
      <div className="rounded-2xl bg-navy-900 border border-slate-800 p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-cyan-400" /> Department Roadmaps (Switch to explore any discipline):
          </span>
          <span className="text-[11px] text-slate-400">
            Active: <strong className="text-cyan-300">{roadmap.title.split(':')[0]}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {ALL_ROADMAP_TRACKS.map((track) => {
            const isCurrent = roadmap.id === track.roadmap.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => switchRoadmapTrack(track.department)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isCurrent
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-transparent shadow-md shadow-violet-500/20'
                    : 'bg-navy-950 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                {track.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Honest Disclaimer */}
      <RoadmapDisclaimer />

      {/* 4 Weekly Milestones Timeline */}
      <div className="space-y-6">
        {roadmap.milestones.map((milestone) => (
          <WeekMilestoneCard
            key={milestone.id}
            milestone={milestone}
            onToggleTask={toggleTaskCompletion}
            onAddTask={(week) => setAddingWeekNumber(week)}
            onDeleteTask={deleteTask}
          />
        ))}
      </div>

      {/* Add Task Modal */}
      {addingWeekNumber !== null && (
        <AddTaskModal
          isOpen={true}
          weekNumber={addingWeekNumber}
          onClose={() => setAddingWeekNumber(null)}
          onAdd={addTaskToWeek}
        />
      )}
    </div>
  );
};
