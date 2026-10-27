import React from 'react';
import { useApp, NavigationTab } from '../context/AppContext';
import { LayoutDashboard, Compass, Map, TrendingUp, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, bookmarks, stats } = useApp();

  const items: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    {
      id: 'opportunities',
      label: 'Explore',
      icon: <Compass className="w-5 h-5" />,
      badge: bookmarks.length > 0 ? bookmarks.length : undefined,
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      icon: <Map className="w-5 h-5" />,
      badge: `${stats.roadmapProgressPercent}%`,
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: <TrendingUp className="w-5 h-5" />,
      badge: stats.appliedCount > 0 ? stats.appliedCount : undefined,
    },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around shadow-2xl shadow-black">
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
              isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-2 bg-violet-600 text-[9px] font-bold text-white px-1 py-0.2 rounded-full min-w-[14px] text-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
