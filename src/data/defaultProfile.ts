import { StudentProfile } from '../types/student';

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  id: 'student-demo-001',
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@campus.edu',
  collegeName: 'National Institute of Engineering & Technology',
  department: 'Computer Science and Engineering (CSE)',
  academicYear: '3rd Year',
  city: 'Bangalore',
  skills: [
    { name: 'React', level: 'Intermediate', category: 'Framework' },
    { name: 'TypeScript', level: 'Beginner', category: 'Language' },
    { name: 'JavaScript', level: 'Intermediate', category: 'Language' },
    { name: 'Python', level: 'Intermediate', category: 'Language' },
    { name: 'Git & GitHub', level: 'Intermediate', category: 'Tool' },
    { name: 'Data Structures & Algorithms', level: 'Intermediate', category: 'Language' },
    { name: 'SQL', level: 'Beginner', category: 'Database' },
  ],
  areasOfInterest: [
    'Full-Stack Web Development',
    'AI & Intelligent Systems',
    'Cloud Computing',
    'Open Source Contribution',
  ],
  careerGoal: 'Secure a high-impact Software Engineering / Full-Stack Internship',
  targetRole: 'Software Engineer Intern',
  weeklyHoursAvailable: 12,
  bio: 'Curious 3rd-year student passionate about building real-world projects and discovering relevant hackathons and career opportunities.',
  isOnboarded: true,
  createdAt: '2026-10-15T09:00:00Z',
  updatedAt: new Date().toISOString(),
};

/**
 * All departments supported across engineering, computing, sciences, commerce, management, health, agriculture, law & arts.
 */
export const ALL_DEPARTMENTS = [
  'Computer Science and Engineering (CSE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI & DS)',
  'Artificial Intelligence & Machine Learning (AI & ML)',
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Biomedical Engineering',
  'Biotechnology',
  'Chemical Engineering',
  'Aeronautical & Aerospace Engineering',
  'Bachelor of Computer Applications (BCA)',
  'Master of Computer Applications (MCA)',
  'Bachelor of Commerce (B.Com)',
  'Bachelor of Business Administration (BBA)',
  'Master of Business Administration (MBA)',
  'Bachelor of Science (B.Sc)',
  'Master of Science (M.Sc)',
  'Bachelor of Arts (BA)',
  'Bachelor of Technology (B.Tech - General)',
  'Pharmacy (B.Pharm / M.Pharm)',
  'Nursing & Allied Health Sciences',
  'Law (LL.B / B.A. LL.B)',
  'Agricultural Sciences (B.Sc Agriculture)',
  'Arts & Humanities',
  'Pure & Applied Science',
  'Other',
];

// Alias for backward compatibility
export const POPULAR_DEPARTMENTS = ALL_DEPARTMENTS;

export const POPULAR_SKILLS = [
  // Computing & Software
  'React',
  'TypeScript',
  'Python',
  'JavaScript',
  'Data Structures & Algorithms',
  'Node.js',
  'SQL',
  'Git & GitHub',
  'Next.js',
  'Docker',
  'Java',
  'C++',
  'REST APIs',
  'Machine Learning',

  // Mechanical & Civil & Aerospace
  'SolidWorks (CAD)',
  'AutoCAD',
  'ANSYS / FEA Simulation',
  'Design for Manufacturing (DFM)',
  'MATLAB & Simulink',
  'Thermodynamics & CFD',
  'GD&T Tolerancing',
  'Revit / BIM',
  'STAAD.Pro',

  // Biomedical & Health Sciences
  'Medical Instrumentation',
  'Biosignal Processing (ECG/EMG)',
  'Medical Device Regulations (FDA / ISO 13485)',
  'Medical AI & Diagnostic Imaging (DICOM)',
  'Biomedical Sensors',
  'Pharmacology & Drug Discovery',
  'Clinical Trials Protocol',
  'Patient Care Diagnostics',

  // Electronics & EEE
  'Embedded Systems (C/C++)',
  'Microcontrollers (ARM/ESP32)',
  'PCB Design & SPICE',
  'IoT & Wireless Sensor Networks',
  'VLSI & Verilog',

  // Business, Commerce & Analytics
  'Financial Modeling & Valuation',
  'Power BI & Tableau',
  'Corporate Finance & Accounting',
  'Business Strategy & Pitch Decks',
  'Product Management',
  'Digital Marketing & SEO',

  // Law, Agriculture & General Research
  'Legal Drafting & Contract Law',
  'Intellectual Property (IPR) & Patents',
  'Soil Science & Precision Agriculture',
  'Research Methodology & Paper Writing',
  'Public Speaking & Debating',
];

export const POPULAR_INTERESTS = [
  'Full-Stack Web Development',
  'AI & Intelligent Systems',
  'Medical Devices & Healthcare Technology',
  'CAD Design & Product Prototyping',
  'Robotics & Industrial Automation',
  'Biosignals & Medical AI Diagnostics',
  'Cloud Computing & DevOps',
  'Aerospace & Drone Engineering',
  'Financial Markets & FinTech',
  'Corporate Law & Intellectual Property',
  'Sustainable Agriculture & Green Tech',
  'Biotechnology & Genomics',
  'Business Analytics & Strategy',
  'Cybersecurity & Ethical Hacking',
  'Open Source Contribution',
  'Pharmaceutical Research',
];
