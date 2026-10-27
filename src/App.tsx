import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { DashboardView } from './components/Dashboard/DashboardView';
import { OpportunitiesView } from './components/Opportunities/OpportunitiesView';
import { RoadmapView } from './components/Roadmap/RoadmapView';
import { ProgressView } from './components/Progress/ProgressView';
import { ProfileView } from './components/Profile/ProfileView';
import { OnboardingModal } from './components/Onboarding/OnboardingModal';
import { Sparkles, Shield, Compass, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 font-sans selection:bg-violet-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-12">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'opportunities' && <OpportunitiesView />}
        {activeTab === 'roadmap' && <RoadmapView />}
        {activeTab === 'progress' && <ProgressView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Footer */}
      <footer className="hidden lg:block bg-navy-950 border-t border-slate-800/80 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight">NEXORA</span>
            <span>•</span>
            <span>Discover your potential. Find your next opportunity.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Prototype v1.0 (Demo Mode)</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab('opportunities')}
              className="hover:text-cyan-400 transition-colors"
            >
              Simulated Opportunities
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="hover:text-cyan-400 transition-colors"
            >
              Growth Roadmap
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation Bar */}
      <MobileNav />

      {/* Onboarding Wizard Modal */}
      <OnboardingModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
