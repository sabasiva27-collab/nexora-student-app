import React from 'react';
import { WelcomeBanner } from './WelcomeBanner';
import { NextBestMoveCard } from './NextBestMoveCard';
import { UpcomingOpportunitiesWidget } from './UpcomingOpportunitiesWidget';
import { RoadmapProgressWidget } from './RoadmapProgressWidget';
import { RecommendedSkillsWidget } from './RecommendedSkillsWidget';
import { RecentActivityWidget } from './RecentActivityWidget';

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Welcome Greeting Banner */}
      <WelcomeBanner />

      {/* 2. Hero "Your Next Best Move" Prominent Card */}
      <NextBestMoveCard />

      {/* 3. Core Discovery & Roadmap Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingOpportunitiesWidget />
        <RoadmapProgressWidget />
      </div>

      {/* 4. Skills & History Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecommendedSkillsWidget />
        <RecentActivityWidget />
      </div>
    </div>
  );
};
