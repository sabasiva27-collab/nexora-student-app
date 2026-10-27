import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, Clock, GraduationCap, MapPin, Edit3 } from 'lucide-react';
import { Badge } from '../Badge';

export const WelcomeBanner: React.FC = () => {
  const { profile, stats, setActiveTab } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="rounded-3xl bg-navy-900 border border-slate-800/80 p-6 sm:p-7 relative overflow-hidden">
      {/* Decorative subtle accent */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-violet-600/10 via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="violet" size="xs">
              {profile.academicYear} • {profile.customDepartment || profile.department}
            </Badge>
            <span className="text-slate-500 text-xs hidden sm:inline">•</span>
            <span className="text-slate-400 text-xs flex items-center gap-1 hidden sm:inline-flex">
              <MapPin className="w-3 h-3 text-cyan-400" /> {profile.city}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {getGreeting()}, <span className="text-cyan-400">{profile.fullName.split(' ')[0]}</span>!
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Goal:</span>
            <span className="text-sm font-medium text-slate-200 bg-navy-950 px-3 py-1 rounded-lg border border-slate-800">
              {profile.careerGoal}
            </span>
            <button
              onClick={() => setActiveTab('profile')}
              title="Edit Profile Goal"
              className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Snapshot Metrics */}
        <div className="grid grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
          {/* Metric 1 */}
          <div className="p-3.5 rounded-2xl bg-navy-950/80 border border-slate-800 text-center min-w-[100px]">
            <p className="text-[11px] font-medium text-slate-400">Roadmap</p>
            <p className="text-xl font-black text-cyan-400 mt-0.5">{stats.roadmapProgressPercent}%</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{stats.completedTasks}/{stats.totalTasks} Done</p>
          </div>

          {/* Metric 2 */}
          <div className="p-3.5 rounded-2xl bg-navy-950/80 border border-slate-800 text-center min-w-[100px]">
            <p className="text-[11px] font-medium text-slate-400">Hours Logged</p>
            <p className="text-xl font-black text-violet-400 mt-0.5">{stats.hoursInvested}h</p>
            <p className="text-[10px] text-slate-500 mt-0.5">of {profile.weeklyHoursAvailable}h/wk</p>
          </div>

          {/* Metric 3 */}
          <div className="p-3.5 rounded-2xl bg-navy-950/80 border border-slate-800 text-center min-w-[100px]">
            <p className="text-[11px] font-medium text-slate-400">Applications</p>
            <p className="text-xl font-black text-emerald-400 mt-0.5">{stats.appliedCount}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{stats.savedCount} Saved</p>
          </div>
        </div>
      </div>
    </div>
  );
};
