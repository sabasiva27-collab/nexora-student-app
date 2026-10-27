import React, { useState } from 'react';
import { useApp, NavigationTab } from '../context/AppContext';
import {
  Compass,
  LayoutDashboard,
  Map,
  TrendingUp,
  User,
  Sparkles,
  Bookmark,
  RotateCcw,
  Menu,
  X,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { Badge } from './Badge';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, profile, bookmarks, stats, resetAllDemoData, setIsOnboardingOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'opportunities',
      label: 'Explore Opportunities',
      icon: <Compass className="w-4 h-4" />,
      badge: bookmarks.length > 0 ? `${bookmarks.length} saved` : undefined,
    },
    {
      id: 'roadmap',
      label: 'My Roadmap',
      icon: <Map className="w-4 h-4" />,
      badge: `${stats.roadmapProgressPercent}%`,
    },
    {
      id: 'progress',
      label: 'My Progress',
      icon: <TrendingUp className="w-4 h-4" />,
      badge: stats.appliedCount > 0 ? `${stats.appliedCount} applied` : undefined,
    },
    { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-navy-950/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
        {/* Top Demo Disclaimer Ribbon */}
        <div className="bg-gradient-to-r from-violet-950/70 via-navy-900 to-cyan-950/70 px-4 py-1 text-center border-b border-violet-500/10 flex items-center justify-center gap-2 text-xs text-slate-300">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>
            <strong className="text-white font-semibold">NEXORA Prototype:</strong> All opportunities, companies, and milestones are simulated demonstration data for student discovery.
          </span>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium ml-2 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset Demo
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & Tagline */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-violet-500/20 group-hover:shadow-cyan-500/30 transition-all duration-300">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                    NEX<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">ORA</span>
                  </span>
                  <Badge variant="cyan" size="xs" className="hidden sm:inline-flex">
                    v1.0 Beta
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
                  Discover your potential. Find your next opportunity.
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                      isActive
                        ? 'text-white bg-navy-800/90 border border-violet-500/30 shadow-sm shadow-violet-500/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-navy-900/60'
                    }`}
                  >
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? 'bg-violet-500/30 text-violet-200'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Side: Profile Card & Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Bookmarks button */}
              <button
                onClick={() => setActiveTab('opportunities')}
                title="View Saved Opportunities"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-medium transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                <span>Saved</span>
                {bookmarks.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] flex items-center justify-center font-bold">
                    {bookmarks.length}
                  </span>
                )}
              </button>

              {/* Student Profile Pill */}
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2.5 pl-2.5 pr-3 py-1.5 rounded-full bg-navy-900/90 border border-slate-700/60 hover:border-violet-500/50 hover:bg-navy-850 transition-all text-left"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                  {profile.fullName.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                    {profile.fullName}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[140px]">
                    {profile.academicYear} • {profile.customDepartment || profile.department}
                  </p>
                </div>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-navy-800 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-slide-up">
            <div className="pb-3 border-b border-slate-850">
              <p className="text-xs font-medium text-slate-400">Signed in as</p>
              <p className="text-sm font-bold text-white">{profile.fullName}</p>
              <p className="text-xs text-slate-400">{profile.collegeName}</p>
            </div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-violet-600/20 text-cyan-300 border border-violet-500/30'
                      : 'text-slate-300 hover:bg-navy-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setIsOnboardingOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-navy-900 border border-slate-700 text-xs text-slate-300 hover:text-white flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4 text-cyan-400" /> Re-run Onboarding
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Confirmation Dialog for Reset Demo */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-navy-900 border border-slate-700 rounded-2xl p-6 shadow-2xl animate-slide-up">
            <h3 className="text-lg font-bold text-white mb-2">Reset Prototype Demo Data?</h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              This will restore all sample opportunities, 30-day starter roadmap tasks, student profile settings, and application tracking states back to the original demo baseline.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
