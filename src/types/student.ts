export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StudentSkill {
  name: string;
  level: SkillLevel;
  category?: 'Language' | 'Framework' | 'Database' | 'Cloud' | 'Tool' | 'Soft Skill' | 'Core Engineering' | 'Biomedical' | 'Business' | 'Research';
}

export type AcademicYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'Postgraduate' | 'Recent Graduate';

export interface StudentProfile {
  id: string;
  fullName: string;
  email?: string;
  collegeName: string;
  department: string;
  customDepartment?: string;
  academicYear: AcademicYear;
  city: string;
  skills: StudentSkill[];
  areasOfInterest: string[];
  careerGoal: string;
  targetRole: string;
  weeklyHoursAvailable: number;
  bio?: string;
  isOnboarded: boolean;
  avatarSeed?: string;
  createdAt: string;
  updatedAt: string;
}
