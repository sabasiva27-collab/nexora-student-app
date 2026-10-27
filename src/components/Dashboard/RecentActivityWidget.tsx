import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, CheckCircle2, Bookmark, RefreshCw, UserCheck } from 'lucide-react';

export const RecentActivityWidget: React.FC = () => {
  const { activities, setActiveTab } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'opportunity_saved':
        return <Bookmark className="w-4 h-4 text-cyan-400" />;
      case 'status_changed':
        return <RefreshCw className="w-4 h-4 text-violet-400" />;
      default:
        return <UserCheck className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="rounded-3xl bg-navy-900 border border-slate-800/80 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Recent Activity</h3>
          </div>
          <button
            onClick={() => setActiveTab('progress')}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            History &rarr;
          </button>
        </div>

        <div className="space-y-3">
          {activities.slice(0, 4).map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-2xl bg-navy-950/70 border border-slate-800/80"
            >
              <div className="p-1.5 rounded-lg bg-navy-900 border border-slate-800 shrink-0 mt-0.5">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{activity.title}</p>
                {activity.details && (
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{activity.details}</p>
                )}
                <span className="text-[10px] text-slate-500 mt-1 block">{activity.timestamp}</span>
              </div>
            </div>
          ))}

          {activities.length === 0 && (
            <p className="text-xs text-slate-500 py-6 text-center italic">
              No activity logged yet. Complete tasks or save opportunities to see updates here.
            </p>
          )}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
        Real-time tracking persisted in browser local storage
      </div>
    </div>
  );
};
