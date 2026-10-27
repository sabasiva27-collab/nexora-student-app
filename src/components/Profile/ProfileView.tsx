import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentSkill, SkillLevel, AcademicYear } from '../../types/student';
import { ALL_DEPARTMENTS, POPULAR_SKILLS, POPULAR_INTERESTS, DEFAULT_STUDENT_PROFILE } from '../../data/defaultProfile';
import {
  User,
  GraduationCap,
  Briefcase,
  MapPin,
  Clock,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Download,
  Sparkles,
  Check,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Badge } from '../Badge';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, resetAllDemoData, setIsOnboardingOpen } = useApp();

  // Local state for editing
  const [fullName, setFullName] = useState(profile.fullName);
  const [collegeName, setCollegeName] = useState(profile.collegeName);
  const [department, setDepartment] = useState(profile.department);
  const [customDepartment, setCustomDepartment] = useState(profile.customDepartment || '');
  const [academicYear, setAcademicYear] = useState<AcademicYear>(profile.academicYear);
  const [city, setCity] = useState(profile.city);
  const [careerGoal, setCareerGoal] = useState(profile.careerGoal);
  const [targetRole, setTargetRole] = useState(profile.targetRole);
  const [weeklyHours, setWeeklyHours] = useState(profile.weeklyHoursAvailable);
  const [bio, setBio] = useState(profile.bio || '');
  const [skills, setSkills] = useState<StudentSkill[]>(profile.skills);
  const [areasOfInterest, setAreasOfInterest] = useState<string[]>(profile.areasOfInterest);

  // New skill addition
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Intermediate');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const isOther = department === 'Other';

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    if (skills.some((s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) return;
    setSkills([...skills, { name: newSkillName.trim(), level: newSkillLevel }]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (name: string) => {
    setSkills(skills.filter((s) => s.name !== name));
  };

  const handleLevelChange = (name: string, level: SkillLevel) => {
    setSkills(skills.map((s) => (s.name === name ? { ...s, level } : s)));
  };

  const toggleInterest = (interest: string) => {
    if (areasOfInterest.includes(interest)) {
      setAreasOfInterest(areasOfInterest.filter((i) => i !== interest));
    } else {
      setAreasOfInterest([...areasOfInterest, interest]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDepartment = isOther ? (customDepartment.trim() || 'Custom Degree Programme') : department;

    updateProfile({
      fullName: fullName.trim() || 'Student Explorer',
      collegeName: collegeName.trim() || 'Tech University',
      department: finalDepartment,
      customDepartment: isOther ? customDepartment.trim() : undefined,
      academicYear,
      city: city.trim() || 'Bangalore',
      careerGoal: careerGoal.trim() || 'Technical / Professional Intern',
      targetRole: targetRole.trim() || 'Engineering Intern',
      weeklyHoursAvailable: Number(weeklyHours) || 12,
      bio: bio.trim(),
      skills,
      areasOfInterest,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Switch between rich student personas across diverse college departments!
  const handleSwitchPersona = (type: 'cse' | 'bme' | 'mech' | 'commerce' | 'science') => {
    if (type === 'bme') {
      const bmePersona = {
        fullName: 'Ananya Sen',
        collegeName: 'Apex Institute of Health Sciences & Technology',
        department: 'Biomedical Engineering',
        customDepartment: undefined,
        academicYear: '3rd Year' as AcademicYear,
        city: 'Bangalore',
        careerGoal: 'Secure a Biomedical Engineering & Medical Device R&D Internship',
        targetRole: 'Biomedical Systems & Clinical Engineer Intern',
        weeklyHoursAvailable: 14,
        bio: 'Biomedical engineering student passionate about designing non-invasive patient monitors, biosignal processing, and healthcare AI diagnostic tools.',
        skills: [
          { name: 'Medical Instrumentation', level: 'Intermediate' as SkillLevel, category: 'Biomedical' as any },
          { name: 'Biosignal Processing (ECG/EMG)', level: 'Intermediate' as SkillLevel, category: 'Biomedical' as any },
          { name: 'Biomedical Sensors', level: 'Intermediate' as SkillLevel, category: 'Biomedical' as any },
          { name: 'Medical Device Regulations (FDA / ISO 13485)', level: 'Beginner' as SkillLevel, category: 'Biomedical' as any },
          { name: 'Medical AI & Diagnostic Imaging (DICOM)', level: 'Beginner' as SkillLevel, category: 'Biomedical' as any },
          { name: 'Python', level: 'Intermediate' as SkillLevel, category: 'Language' as any },
        ],
        areasOfInterest: [
          'Medical Devices & Healthcare Technology',
          'Biosignals & Medical AI Diagnostics',
          'AI & Intelligent Systems',
        ],
      };
      updateProfile(bmePersona, true);
      setFullName(bmePersona.fullName);
      setCollegeName(bmePersona.collegeName);
      setDepartment(bmePersona.department);
      setCustomDepartment('');
      setAcademicYear(bmePersona.academicYear);
      setCity(bmePersona.city);
      setCareerGoal(bmePersona.careerGoal);
      setTargetRole(bmePersona.targetRole);
      setWeeklyHours(bmePersona.weeklyHoursAvailable);
      setSkills(bmePersona.skills);
      setAreasOfInterest(bmePersona.areasOfInterest);
    } else if (type === 'mech') {
      const mechPersona = {
        fullName: 'Vikram Malhotra',
        collegeName: 'National Institute of Engineering',
        department: 'Mechanical Engineering',
        customDepartment: undefined,
        academicYear: '3rd Year' as AcademicYear,
        city: 'Bangalore',
        careerGoal: 'Secure a Mechanical CAD Design & Prototyping Internship',
        targetRole: 'Mechanical Design Engineer Intern',
        weeklyHoursAvailable: 15,
        bio: 'Mechanical engineering enthusiast specializing in SolidWorks parametric modeling, FEA structural stress simulation, and Design for Manufacturing (DFM).',
        skills: [
          { name: 'SolidWorks (CAD)', level: 'Advanced' as SkillLevel, category: 'Core Engineering' as any },
          { name: 'ANSYS / FEA Simulation', level: 'Intermediate' as SkillLevel, category: 'Core Engineering' as any },
          { name: 'GD&T Tolerancing', level: 'Intermediate' as SkillLevel, category: 'Core Engineering' as any },
          { name: 'Design for Manufacturing (DFM)', level: 'Intermediate' as SkillLevel, category: 'Core Engineering' as any },
          { name: 'AutoCAD', level: 'Intermediate' as SkillLevel, category: 'Core Engineering' as any },
          { name: 'Thermodynamics & CFD', level: 'Beginner' as SkillLevel, category: 'Core Engineering' as any },
        ],
        areasOfInterest: [
          'CAD Design & Product Prototyping',
          'Robotics & Industrial Automation',
          'Aerospace & Drone Engineering',
        ],
      };
      updateProfile(mechPersona, true);
      setFullName(mechPersona.fullName);
      setCollegeName(mechPersona.collegeName);
      setDepartment(mechPersona.department);
      setCustomDepartment('');
      setAcademicYear(mechPersona.academicYear);
      setCity(mechPersona.city);
      setCareerGoal(mechPersona.careerGoal);
      setTargetRole(mechPersona.targetRole);
      setWeeklyHours(mechPersona.weeklyHoursAvailable);
      setSkills(mechPersona.skills);
      setAreasOfInterest(mechPersona.areasOfInterest);
    } else if (type === 'commerce') {
      const bizPersona = {
        fullName: 'Neha Gupta',
        collegeName: 'St. Xavier College of Commerce & Management',
        department: 'Bachelor of Commerce (B.Com)',
        customDepartment: undefined,
        academicYear: '3rd Year' as AcademicYear,
        city: 'Bangalore',
        careerGoal: 'Secure an Investment Banking & Financial Analytics Internship',
        targetRole: 'Financial Strategy & Business Analyst Intern',
        weeklyHoursAvailable: 12,
        bio: 'Commerce student passionate about financial statement modeling, DCF company valuation, Power BI executive dashboards, and market entry strategy.',
        skills: [
          { name: 'Financial Modeling & Valuation', level: 'Intermediate' as SkillLevel, category: 'Business' as any },
          { name: 'Power BI & Tableau', level: 'Intermediate' as SkillLevel, category: 'Business' as any },
          { name: 'Corporate Finance & Accounting', level: 'Advanced' as SkillLevel, category: 'Business' as any },
          { name: 'SQL', level: 'Beginner' as SkillLevel, category: 'Database' as any },
          { name: 'Business Strategy & Pitch Decks', level: 'Intermediate' as SkillLevel, category: 'Business' as any },
        ],
        areasOfInterest: [
          'Financial Markets & FinTech',
          'Business Analytics & Strategy',
          'Corporate Law & Intellectual Property',
        ],
      };
      updateProfile(bizPersona, true);
      setFullName(bizPersona.fullName);
      setCollegeName(bizPersona.collegeName);
      setDepartment(bizPersona.department);
      setCustomDepartment('');
      setAcademicYear(bizPersona.academicYear);
      setCity(bizPersona.city);
      setCareerGoal(bizPersona.careerGoal);
      setTargetRole(bizPersona.targetRole);
      setWeeklyHours(bizPersona.weeklyHoursAvailable);
      setSkills(bizPersona.skills);
      setAreasOfInterest(bizPersona.areasOfInterest);
    } else if (type === 'science') {
      const sciPersona = {
        fullName: 'Dr. Rahul Varma',
        collegeName: 'National Faculty of Science & Biotechnology',
        department: 'Pure & Applied Science',
        customDepartment: undefined,
        academicYear: 'Postgraduate' as AcademicYear,
        city: 'Bangalore',
        careerGoal: 'Secure a Research Fellowship in Computational Biology & Genomics',
        targetRole: 'Research Fellow',
        weeklyHoursAvailable: 16,
        bio: 'Postgraduate student focusing on systematic research methodology, statistical hypothesis testing, and scientific publications.',
        skills: [
          { name: 'Research Methodology & Paper Writing', level: 'Advanced' as SkillLevel, category: 'Research' as any },
          { name: 'Python', level: 'Intermediate' as SkillLevel, category: 'Language' as any },
          { name: 'Pharmacology & Drug Discovery', level: 'Intermediate' as SkillLevel, category: 'Biomedical' as any },
          { name: 'Public Speaking & Debating', level: 'Intermediate' as SkillLevel, category: 'Soft Skill' as any },
        ],
        areasOfInterest: [
          'Biotechnology & Genomics',
          'Pharmaceutical Research',
          'AI & Intelligent Systems',
        ],
      };
      updateProfile(sciPersona, true);
      setFullName(sciPersona.fullName);
      setCollegeName(sciPersona.collegeName);
      setDepartment(sciPersona.department);
      setCustomDepartment('');
      setAcademicYear(sciPersona.academicYear);
      setCity(sciPersona.city);
      setCareerGoal(sciPersona.careerGoal);
      setTargetRole(sciPersona.targetRole);
      setWeeklyHours(sciPersona.weeklyHoursAvailable);
      setSkills(sciPersona.skills);
      setAreasOfInterest(sciPersona.areasOfInterest);
    } else {
      // CSE
      updateProfile(DEFAULT_STUDENT_PROFILE, true);
      setFullName(DEFAULT_STUDENT_PROFILE.fullName);
      setCollegeName(DEFAULT_STUDENT_PROFILE.collegeName);
      setDepartment(DEFAULT_STUDENT_PROFILE.department);
      setCustomDepartment('');
      setAcademicYear(DEFAULT_STUDENT_PROFILE.academicYear);
      setCity(DEFAULT_STUDENT_PROFILE.city);
      setCareerGoal(DEFAULT_STUDENT_PROFILE.careerGoal);
      setTargetRole(DEFAULT_STUDENT_PROFILE.targetRole);
      setWeeklyHours(DEFAULT_STUDENT_PROFILE.weeklyHoursAvailable);
      setSkills(DEFAULT_STUDENT_PROFILE.skills);
      setAreasOfInterest(DEFAULT_STUDENT_PROFILE.areasOfInterest);
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportProfile = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nexora_profile_${profile.fullName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Student Profile
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Update your degree department, skills, proficiency levels, and career targets.
          </p>
        </div>

        {/* Quick persona switcher buttons for testing different disciplines */}
        <div className="flex items-center gap-1.5 flex-wrap bg-navy-950 p-2 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold px-1">Test Department Persona:</span>
          <button
            type="button"
            onClick={() => handleSwitchPersona('bme')}
            className="px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-violet-600/30 border border-slate-700 hover:border-violet-500 text-violet-300 text-xs font-semibold transition-all"
            title="Biomedical Engineering (Medical Devices & Healthcare AI)"
          >
            Biomedical
          </button>
          <button
            type="button"
            onClick={() => handleSwitchPersona('mech')}
            className="px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-cyan-600/30 border border-slate-700 hover:border-cyan-500 text-cyan-300 text-xs font-semibold transition-all"
            title="Mechanical Engineering (CAD & Simulation)"
          >
            Mechanical
          </button>
          <button
            type="button"
            onClick={() => handleSwitchPersona('cse')}
            className="px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-emerald-600/30 border border-slate-700 hover:border-emerald-500 text-emerald-300 text-xs font-semibold transition-all"
            title="Computer Science & Engineering"
          >
            CSE / IT
          </button>
          <button
            type="button"
            onClick={() => handleSwitchPersona('commerce')}
            className="px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-amber-600/30 border border-slate-700 hover:border-amber-500 text-amber-300 text-xs font-semibold transition-all"
            title="Commerce & Business Analytics"
          >
            B.Com / BBA
          </button>
          <button
            type="button"
            onClick={() => handleSwitchPersona('science')}
            className="px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition-all"
            title="Science & Research"
          >
            Sciences
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Academic & Location */}
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-7 space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
            <GraduationCap className="w-5 h-5 text-cyan-400" /> Academic & Department Background
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                College / University Name *
              </label>
              <input
                type="text"
                required
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className={isOther ? 'sm:col-span-1' : 'sm:col-span-2'}>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Department / Degree Programme *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
              >
                {ALL_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Department Field when 'Other' is selected */}
            {isOther && (
              <div className="animate-slide-up">
                <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1.5">
                  Specify Custom Department *
                </label>
                <input
                  type="text"
                  required
                  value={customDepartment}
                  onChange={(e) => setCustomDepartment(e.target.value)}
                  placeholder="e.g. Marine Engineering, Nanotech, Applied Chemistry..."
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-cyan-500/50 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Academic Year *
              </label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value as AcademicYear)}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
              >
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="4th Year">4th Year (Senior)</option>
                <option value="Postgraduate">Postgraduate (Masters / PhD)</option>
                <option value="Recent Graduate">Recent Graduate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                City / Region (Proximity Match)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Goals & Learning Commitment */}
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-7 space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
            <Briefcase className="w-5 h-5 text-violet-400" /> Career Goal & Time Commitment
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Primary Career Goal *
              </label>
              <input
                type="text"
                required
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="e.g. Secure an Internship in Biomedical Devices / Mechanical CAD / Full-Stack"
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Biomedical Systems Intern, Mechanical Design Engineer, Software Engineer"
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Weekly Time Slider */}
            <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" /> Weekly Learning Budget:
                </span>
                <span className="text-base font-bold text-cyan-400">{weeklyHours} Hours / week</span>
              </div>
              <input
                type="range"
                min="4"
                max="35"
                step="1"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Skills & Proficiency Manager */}
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Current Skills & Proficiency Levels
            </h3>
            <span className="text-xs text-slate-400">{skills.length} Skills</span>
          </div>

          {/* Add Skill Row */}
          <div className="p-3.5 rounded-2xl bg-navy-950 border border-slate-800 flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add any skill (e.g. Medical Instrumentation, SolidWorks, Python, React)..."
              className="flex-1 px-3 py-2 rounded-xl bg-navy-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
              className="px-3 py-2 rounded-xl bg-navy-900 border border-slate-700 text-white text-xs focus:outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              type="button"
              onClick={handleAddSkill}
              disabled={!newSkillName.trim()}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>

          {/* Current Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between p-2.5 rounded-xl bg-navy-950 border border-slate-800"
              >
                <span className="text-xs font-semibold text-white truncate max-w-[120px]">
                  {skill.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <select
                    value={skill.level}
                    onChange={(e) => handleLevelChange(skill.name, e.target.value as SkillLevel)}
                    className="text-[11px] px-2 py-1 rounded bg-navy-900 border border-slate-700 text-cyan-300 focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.name)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Areas of Interest */}
        <div className="rounded-3xl bg-navy-900 border border-slate-800 p-6 sm:p-7 space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">
            Areas of Interest
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
            {POPULAR_INTERESTS.map((interest) => {
              const isSelected = areasOfInterest.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-violet-600/20 border-violet-500/60 text-white'
                      : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{interest}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Bar & Actions */}
        <div className="p-5 rounded-3xl bg-navy-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleExportProfile}
              className="px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" /> Export JSON
            </button>
            <button
              type="button"
              onClick={() => setIsOnboardingOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-violet-400" /> Re-open Wizard
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 animate-fade-in font-medium">
                <Check className="w-4 h-4" /> Profile & department saved!
              </span>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
