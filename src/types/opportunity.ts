export type OpportunityCategory =
  | 'Workshop'
  | 'Symposium'
  | 'Internship'
  | 'Hackathon'
  | 'Conference'
  | 'Research Opportunity'
  | 'Project Competition'
  | 'Scholarship'
  | 'Online Course'
  | 'Certification'
  | 'Industrial Training'
  | 'Placement Preparation'
  | 'Entrepreneurship Programme';

export type OpportunityType = 'Online' | 'Offline';

export interface Opportunity {
  id: string;
  title: string;
  organizer: string;
  category: OpportunityCategory;
  type: OpportunityType;
  location: string;
  distanceKm: number; // 0 for online, realistic km for offline relative to student
  department: string[]; // ['All Departments'] or specific department names
  eligibleAcademicYears?: string[]; // e.g. ['2nd Year', '3rd Year', '4th Year', 'Postgraduate']
  requiredSkills: string[];
  date: string; // ISO date e.g. "2026-11-14"
  dateTimeDisplay: string;
  registrationDeadline: string; // ISO date e.g. "2026-11-05"
  registrationDeadlineDisplay: string;
  fee: number; // 0 for free
  feeDisplay: string;
  officialRegistrationUrl?: string; // If absent, marked as unavailable
  lastVerifiedDate: string;
  isDemoData: boolean; // Always true for sample data
  description: string;
  eligibility: string;
  perks: string[];
  scheduleHighlights?: string[];
  contactEmail?: string;
  featured?: boolean;
}

export interface RecommendationScore {
  totalScore: number; // 0 to 100
  skillMatchScore: number;
  interestMatchScore: number;
  departmentMatchScore: number;
  locationScore: number;
  deadlineScore: number;
  rationale: string[];
  matchedSkills: string[];
  missingSkills: string[];
}

export interface ScoredOpportunity extends Opportunity {
  matchScore: RecommendationScore;
}
