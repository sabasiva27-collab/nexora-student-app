import { StudentProfile } from '../types/student';
import { Opportunity } from '../types/opportunity';
import { StudentRoadmap, RoadmapTask } from '../types/roadmap';
import { ApplicationRecord, ActivityLogItem } from '../types/tracking';
import { DEFAULT_STUDENT_PROFILE } from '../data/defaultProfile';
import { MOCK_OPPORTUNITIES } from '../data/mockOpportunities';
import { STARTER_30_DAY_ROADMAP } from '../data/starterRoadmapData';

const KEYS = {
  PROFILE: 'nexora_student_profile',
  OPPORTUNITIES: 'nexora_opportunities',
  BOOKMARKS: 'nexora_bookmarked_ids',
  ROADMAP: 'nexora_student_roadmap',
  APPLICATIONS: 'nexora_applications',
  ACTIVITIES: 'nexora_activity_log',
};

export class StorageService {
  // --- Profile ---
  static getProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read profile from storage', e);
    }
    return DEFAULT_STUDENT_PROFILE;
  }

  static saveProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }

  // --- Opportunities ---
  static getOpportunities(): Opportunity[] {
    try {
      const data = localStorage.getItem(KEYS.OPPORTUNITIES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read opportunities', e);
    }
    return MOCK_OPPORTUNITIES;
  }

  static saveOpportunities(opportunities: Opportunity[]): void {
    try {
      localStorage.setItem(KEYS.OPPORTUNITIES, JSON.stringify(opportunities));
    } catch (e) {
      console.error('Failed to save opportunities', e);
    }
  }

  // --- Bookmarks ---
  static getBookmarks(): string[] {
    try {
      const data = localStorage.getItem(KEYS.BOOKMARKS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read bookmarks', e);
    }
    // Default initial bookmarks for rich initial demo experience
    return ['opp-hack-01', 'opp-intern-01'];
  }

  static saveBookmarks(bookmarks: string[]): void {
    try {
      localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }

  // --- Roadmap ---
  static getRoadmap(): StudentRoadmap {
    try {
      const data = localStorage.getItem(KEYS.ROADMAP);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read roadmap', e);
    }
    return STARTER_30_DAY_ROADMAP;
  }

  static saveRoadmap(roadmap: StudentRoadmap): void {
    try {
      localStorage.setItem(KEYS.ROADMAP, JSON.stringify(roadmap));
    } catch (e) {
      console.error('Failed to save roadmap', e);
    }
  }

  // --- Application Tracking ---
  static getApplications(): ApplicationRecord[] {
    try {
      const data = localStorage.getItem(KEYS.APPLICATIONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read applications', e);
    }
    // Initial demo records
    return [
      {
        id: 'app-01',
        opportunityId: 'opp-hack-01',
        status: 'Planning to Apply',
        updatedAt: '2026-10-25T10:00:00Z',
        notes: 'Formed a 3-person team with college peers. Preparing proposal on climate data API.',
        confirmedExternalSubmission: false,
      },
      {
        id: 'app-02',
        opportunityId: 'opp-work-01',
        status: 'Completed',
        updatedAt: '2026-10-23T16:00:00Z',
        appliedDate: '2026-10-23',
        notes: 'Attended session live, submitted sample repository feedback.',
        confirmedExternalSubmission: true,
      },
      {
        id: 'app-03',
        opportunityId: 'opp-intern-01',
        status: 'Saved',
        updatedAt: '2026-10-26T12:00:00Z',
        notes: 'Targeting this internship for Summer 2027. Need to finish Week 3 fullstack project first.',
        confirmedExternalSubmission: false,
      },
    ];
  }

  static saveApplications(applications: ApplicationRecord[]): void {
    try {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.error('Failed to save applications', e);
    }
  }

  // --- Activity Log ---
  static getActivities(): ActivityLogItem[] {
    try {
      const data = localStorage.getItem(KEYS.ACTIVITIES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read activity log', e);
    }
    return [
      {
        id: 'act-1',
        type: 'task_completed',
        title: 'Completed: Async Data Fetching Patterns',
        timestamp: 'Yesterday at 4:00 PM',
        details: 'Earned +3.0 hours toward Week 2 Milestone',
      },
      {
        id: 'act-2',
        type: 'opportunity_saved',
        title: 'Bookmarked: CloudScale Frontend Summer Intern',
        timestamp: '2 days ago',
        details: 'Added to your Opportunity Watchlist',
      },
      {
        id: 'act-3',
        type: 'task_completed',
        title: 'Shipped: Week 1 Habit Tracker Project',
        timestamp: '3 days ago',
        details: 'Week 1 milestone finished 100%',
      },
      {
        id: 'act-4',
        type: 'status_changed',
        title: 'Planning to Apply: InnovateX Hackathon 2026',
        timestamp: '4 days ago',
        details: 'Team formation in progress',
      },
    ];
  }

  static saveActivities(activities: ActivityLogItem[]): void {
    try {
      localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(activities));
    } catch (e) {
      console.error('Failed to save activity log', e);
    }
  }

  // --- Reset All Demo Data ---
  static resetAllToDefaults(): void {
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.OPPORTUNITIES);
    localStorage.removeItem(KEYS.BOOKMARKS);
    localStorage.removeItem(KEYS.ROADMAP);
    localStorage.removeItem(KEYS.APPLICATIONS);
    localStorage.removeItem(KEYS.ACTIVITIES);
  }
}
