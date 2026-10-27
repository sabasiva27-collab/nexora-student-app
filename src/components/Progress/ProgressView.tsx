import React from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicationPipeline } from './ApplicationPipeline';
import { WeeklyProgressSummary } from './WeeklyProgressSummary';
import { SkillsDistribution } from './SkillsDistribution';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  FolderGit2,
  Send,
  Bookmark,
  Award,
} from 'lucide-react';
import { Badge } from '../Badge';

export const ProgressView: React.FC = () => {
  const { stats, roadmap, profile, applications } = useApp();

  const completedProjectsCount = roadmap.milestones.filter(
    (m) => m.practicalProject.isCompleted
  ).length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Personal Growth & Opportunity Tracker
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time tracking of completed learning tasks, practical projects, and external applications.
          </p>
        </div>

        <Badge variant="emerald" size="sm" icon={<Award className="w-3.5 h-3.5" />}>
          Active Growth Sprint
        </Badge>
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Completed Tasks */}
        <div className="p-5 rounded-3xl bg-navy-900 border border-slate-800 shadow-lg space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Completed Tasks
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{stats.completedTasks}</span>
            <span className="text-xs text-slate-500">of {stats.totalTasks} total</span>
          </div>
          <p className="text-[11px] text-cyan-300 font-medium">
            {stats.roadmapProgressPercent}% Sprint Milestone Completion
          </p>
        </div>

        {/* Card 2: Hours Invested */}
        <div className="p-5 rounded-3xl bg-navy-900 border border-slate-800 shadow-lg space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Hours Invested
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{stats.hoursInvested}</span>
            <span className="text-xs text-slate-500">hours</span>
          </div>
          <p className="text-[11px] text-violet-300 font-medium">
            {profile.weeklyHoursAvailable} hrs/week target budget
          </p>
        </div>

        {/* Card 3: Practical Projects */}
        <div className="p-5 rounded-3xl bg-navy-900 border border-slate-800 shadow-lg space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Projects Shipped
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{completedProjectsCount}</span>
            <span className="text-xs text-slate-500">of 4 milestones</span>
          </div>
          <p className="text-[11px] text-amber-300 font-medium">
            Portfolio deliverables ready for review
          </p>
        </div>

        {/* Card 4: Applications Tracked */}
        <div className="p-5 rounded-3xl bg-navy-900 border border-slate-800 shadow-lg space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Send className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Applications Submitted
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{stats.appliedCount}</span>
            <span className="text-xs text-slate-500">verified</span>
          </div>
          <p className="text-[11px] text-emerald-300 font-medium">
            {stats.savedCount} additional saved in watchlist
          </p>
        </div>
      </div>

      {/* Application Status Kanban Pipeline */}
      <ApplicationPipeline />

      {/* Weekly Progress and Skills Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyProgressSummary />
        <SkillsDistribution />
      </div>
    </div>
  );
};
