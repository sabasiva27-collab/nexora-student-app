export type ApplicationStatus = 'Saved' | 'Planning to Apply' | 'Applied' | 'Completed';

export interface ApplicationRecord {
  id: string;
  opportunityId: string;
  status: ApplicationStatus;
  updatedAt: string;
  appliedDate?: string;
  notes?: string;
  confirmedExternalSubmission: boolean; // Must be true before marking 'Applied'
}

export interface ActivityLogItem {
  id: string;
  type: 'task_completed' | 'opportunity_saved' | 'status_changed' | 'profile_updated';
  title: string;
  timestamp: string;
  details?: string;
}
