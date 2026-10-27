export type RoadmapTaskType = 'concept' | 'project' | 'practice' | 'reading' | 'challenge';

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  skills: string[];
  type: RoadmapTaskType;
  isCompleted: boolean;
  completedAt?: string;
  practicalOutcome?: string; // small practical project or deliverable
  resources?: { title: string; url?: string }[];
}

export interface RoadmapMilestone {
  id: string;
  weekNumber: number;
  title: string;
  theme: string;
  goalSummary: string;
  practicalProject: {
    title: string;
    description: string;
    deliverable: string;
    isCompleted: boolean;
  };
  tasks: RoadmapTask[];
}

export interface StudentRoadmap {
  id: string;
  title: string;
  description: string;
  targetRole: string;
  generatedDate: string;
  lastUpdated: string;
  milestones: RoadmapMilestone[];
  disclaimer: string;
}
