import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { StudentProfile } from '../types/student';
import { Opportunity, ScoredOpportunity } from '../types/opportunity';
import { StudentRoadmap, RoadmapTask } from '../types/roadmap';
import { ApplicationRecord, ApplicationStatus, ActivityLogItem } from '../types/tracking';
import { StorageService } from '../services/storageService';
import { RecommendationEngine, NextBestMove } from '../services/recommendationEngine';
import { DEFAULT_STUDENT_PROFILE } from '../data/defaultProfile';
import { STARTER_30_DAY_ROADMAP, getRoadmapForDepartment, ALL_ROADMAP_TRACKS } from '../data/starterRoadmapData';
import { MOCK_OPPORTUNITIES } from '../data/mockOpportunities';

export type NavigationTab = 'dashboard' | 'opportunities' | 'roadmap' | 'progress' | 'profile';

interface AppContextType {
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>, autoSyncRoadmap?: boolean) => void;
  opportunities: Opportunity[];
  scoredOpportunities: ScoredOpportunity[];
  bookmarks: string[];
  toggleBookmark: (oppId: string) => void;
  roadmap: StudentRoadmap;
  switchRoadmapTrack: (departmentOrTrackName: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  addTaskToWeek: (weekNumber: number, task: Omit<RoadmapTask, 'id' | 'isCompleted'>) => void;
  editTask: (taskId: string, updates: Partial<RoadmapTask>) => void;
  deleteTask: (taskId: string) => void;
  applications: ApplicationRecord[];
  updateApplicationStatus: (
    opportunityId: string,
    status: ApplicationStatus,
    confirmedExternal?: boolean,
    notes?: string
  ) => boolean;
  activities: ActivityLogItem[];
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedOpportunityId: string | null;
  setSelectedOpportunityId: (id: string | null) => void;
  nextBestMove: NextBestMove;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  resetAllDemoData: () => void;
  stats: {
    totalTasks: number;
    completedTasks: number;
    roadmapProgressPercent: number;
    hoursInvested: number;
    skillsCount: number;
    appliedCount: number;
    savedCount: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<StudentProfile>(() => StorageService.getProfile());
  const [opportunities, setOpportunitiesState] = useState<Opportunity[]>(() => StorageService.getOpportunities());
  const [bookmarks, setBookmarksState] = useState<string[]>(() => StorageService.getBookmarks());
  const [roadmap, setRoadmapState] = useState<StudentRoadmap>(() => {
    const saved = StorageService.getRoadmap();
    if (saved) return saved;
    const initialProfile = StorageService.getProfile();
    return getRoadmapForDepartment(initialProfile.customDepartment || initialProfile.department);
  });
  const [applications, setApplicationsState] = useState<ApplicationRecord[]>(() => StorageService.getApplications());
  const [activities, setActivitiesState] = useState<ActivityLogItem[]>(() => StorageService.getActivities());
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(!profile.isOnboarded);

  // Sync to LocalStorage on updates
  const updateProfile = (updated: Partial<StudentProfile>, autoSyncRoadmap: boolean = true) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updated, updatedAt: new Date().toISOString() };
      StorageService.saveProfile(next);

      // If department changed and autoSync is true, adapt the roadmap to the new department
      if (
        autoSyncRoadmap &&
        (updated.department !== undefined || updated.customDepartment !== undefined) &&
        (updated.department !== prev.department || updated.customDepartment !== prev.customDepartment)
      ) {
        const newDept = updated.customDepartment || updated.department || '';
        const deptRoadmap = getRoadmapForDepartment(newDept);
        setRoadmapState(deptRoadmap);
        StorageService.saveRoadmap(deptRoadmap);
      }

      return next;
    });

    logActivity({
      type: 'profile_updated',
      title: 'Updated Profile Information',
      timestamp: 'Just now',
      details: `Profile preferences updated (${updated.department || profile.department})`,
    });
  };

  const switchRoadmapTrack = (departmentOrTrackName: string) => {
    const newRoadmap = getRoadmapForDepartment(departmentOrTrackName);
    setRoadmapState(newRoadmap);
    StorageService.saveRoadmap(newRoadmap);
    logActivity({
      type: 'status_changed',
      title: `Switched Track: ${newRoadmap.title}`,
      timestamp: 'Just now',
      details: `Adapted for ${departmentOrTrackName}`,
    });
  };

  const toggleBookmark = (oppId: string) => {
    setBookmarksState((prev) => {
      const exists = prev.includes(oppId);
      const next = exists ? prev.filter((id) => id !== oppId) : [...prev, oppId];
      StorageService.saveBookmarks(next);

      if (!exists) {
        const opp = opportunities.find((o) => o.id === oppId);
        logActivity({
          type: 'opportunity_saved',
          title: `Bookmarked: ${opp ? opp.title : 'Opportunity'}`,
          timestamp: 'Just now',
          details: 'Saved to your target discovery list',
        });
      }
      return next;
    });
  };

  const logActivity = (item: Omit<ActivityLogItem, 'id'>) => {
    const newItem: ActivityLogItem = {
      ...item,
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    setActivitiesState((prev) => {
      const next = [newItem, ...prev].slice(0, 20);
      StorageService.saveActivities(next);
      return next;
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    let taskTitle = '';
    let isNowCompleted = false;

    setRoadmapState((prev) => {
      const nextMilestones = prev.milestones.map((m) => {
        const updatedTasks = m.tasks.map((t) => {
          if (t.id === taskId) {
            taskTitle = t.title;
            isNowCompleted = !t.isCompleted;
            return {
              ...t,
              isCompleted: isNowCompleted,
              completedAt: isNowCompleted ? new Date().toISOString() : undefined,
            };
          }
          return t;
        });

        const allCompleted = updatedTasks.every((t) => t.isCompleted);
        return {
          ...m,
          tasks: updatedTasks,
          practicalProject: {
            ...m.practicalProject,
            isCompleted: allCompleted,
          },
        };
      });

      const nextRoadmap: StudentRoadmap = {
        ...prev,
        milestones: nextMilestones,
        lastUpdated: new Date().toISOString(),
      };
      StorageService.saveRoadmap(nextRoadmap);
      return nextRoadmap;
    });

    if (taskTitle) {
      logActivity({
        type: 'task_completed',
        title: isNowCompleted ? `Completed: ${taskTitle}` : `Marked Incomplete: ${taskTitle}`,
        timestamp: 'Just now',
        details: isNowCompleted ? 'Progress logged toward roadmap sprint' : 'Task reopened',
      });
    }
  };

  const addTaskToWeek = (weekNumber: number, taskData: Omit<RoadmapTask, 'id' | 'isCompleted'>) => {
    const newTask: RoadmapTask = {
      ...taskData,
      id: `task-custom-${Date.now()}`,
      isCompleted: false,
    };

    setRoadmapState((prev) => {
      const nextMilestones = prev.milestones.map((m) => {
        if (m.weekNumber === weekNumber) {
          return {
            ...m,
            tasks: [...m.tasks, newTask],
          };
        }
        return m;
      });

      const nextRoadmap = { ...prev, milestones: nextMilestones, lastUpdated: new Date().toISOString() };
      StorageService.saveRoadmap(nextRoadmap);
      return nextRoadmap;
    });

    logActivity({
      type: 'task_completed',
      title: `Added Custom Task: ${taskData.title}`,
      timestamp: 'Just now',
      details: `Scheduled under Week ${weekNumber}`,
    });
  };

  const editTask = (taskId: string, updates: Partial<RoadmapTask>) => {
    setRoadmapState((prev) => {
      const nextMilestones = prev.milestones.map((m) => ({
        ...m,
        tasks: m.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
      }));
      const nextRoadmap = { ...prev, milestones: nextMilestones, lastUpdated: new Date().toISOString() };
      StorageService.saveRoadmap(nextRoadmap);
      return nextRoadmap;
    });
  };

  const deleteTask = (taskId: string) => {
    setRoadmapState((prev) => {
      const nextMilestones = prev.milestones.map((m) => ({
        ...m,
        tasks: m.tasks.filter((t) => t.id !== taskId),
      }));
      const nextRoadmap = { ...prev, milestones: nextMilestones, lastUpdated: new Date().toISOString() };
      StorageService.saveRoadmap(nextRoadmap);
      return nextRoadmap;
    });
  };

  const updateApplicationStatus = (
    opportunityId: string,
    status: ApplicationStatus,
    confirmedExternal: boolean = false,
    notes?: string
  ): boolean => {
    if (status === 'Applied' && !confirmedExternal) {
      return false;
    }

    setApplicationsState((prev) => {
      const existingIndex = prev.findIndex((a) => a.opportunityId === opportunityId);
      let next: ApplicationRecord[];

      if (existingIndex >= 0) {
        next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          status,
          updatedAt: new Date().toISOString(),
          appliedDate: status === 'Applied' ? new Date().toISOString().split('T')[0] : next[existingIndex].appliedDate,
          confirmedExternalSubmission: status === 'Applied' ? true : next[existingIndex].confirmedExternalSubmission,
          notes: notes !== undefined ? notes : next[existingIndex].notes,
        };
      } else {
        next = [
          ...prev,
          {
            id: `app-${Date.now()}`,
            opportunityId,
            status,
            updatedAt: new Date().toISOString(),
            appliedDate: status === 'Applied' ? new Date().toISOString().split('T')[0] : undefined,
            confirmedExternalSubmission: confirmedExternal,
            notes: notes || '',
          },
        ];
      }
      StorageService.saveApplications(next);
      return next;
    });

    const opp = opportunities.find((o) => o.id === opportunityId);
    logActivity({
      type: 'status_changed',
      title: `${status}: ${opp ? opp.title : 'Opportunity'}`,
      timestamp: 'Just now',
      details: `Tracked under ${status}`,
    });

    return true;
  };

  const resetAllDemoData = () => {
    StorageService.resetAllToDefaults();
    setProfileState(DEFAULT_STUDENT_PROFILE);
    setOpportunitiesState(MOCK_OPPORTUNITIES);
    setBookmarksState(['opp-hack-01', 'opp-intern-01']);
    setRoadmapState(STARTER_30_DAY_ROADMAP);
    setApplicationsState(StorageService.getApplications());
    setActivitiesState(StorageService.getActivities());
    setActiveTab('dashboard');
  };

  // Scored opportunities computed dynamically
  const scoredOpportunities = useMemo(() => {
    return RecommendationEngine.getScoredOpportunities(opportunities, profile);
  }, [opportunities, profile]);

  // Next Best Move computed transparently
  const nextBestMove = useMemo(() => {
    return RecommendationEngine.getNextBestMove(profile, roadmap, scoredOpportunities);
  }, [profile, roadmap, scoredOpportunities]);

  // Overall Statistics
  const stats = useMemo(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    let hoursInvested = 0;

    roadmap.milestones.forEach((m) => {
      m.tasks.forEach((t) => {
        totalTasks += 1;
        if (t.isCompleted) {
          completedTasks += 1;
          hoursInvested += t.estimatedHours;
        }
      });
    });

    const roadmapProgressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const appliedCount = applications.filter((a) => a.status === 'Applied' || a.status === 'Completed').length;
    const savedCount = bookmarks.length;

    return {
      totalTasks,
      completedTasks,
      roadmapProgressPercent,
      hoursInvested: Math.round(hoursInvested * 10) / 10,
      skillsCount: profile.skills.length,
      appliedCount,
      savedCount,
    };
  }, [roadmap, applications, bookmarks, profile]);

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        opportunities,
        scoredOpportunities,
        bookmarks,
        toggleBookmark,
        roadmap,
        switchRoadmapTrack,
        toggleTaskCompletion,
        addTaskToWeek,
        editTask,
        deleteTask,
        applications,
        updateApplicationStatus,
        activities,
        activeTab,
        setActiveTab,
        selectedOpportunityId,
        setSelectedOpportunityId,
        nextBestMove,
        isOnboardingOpen,
        setIsOnboardingOpen,
        resetAllDemoData,
        stats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
