import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentSkill, SkillLevel, AcademicYear } from '../../types/student';
import { ALL_DEPARTMENTS, POPULAR_SKILLS, POPULAR_INTERESTS } from '../../data/defaultProfile';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Clock,
  Briefcase,
  BookOpen,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import { Badge } from '../Badge';

export const OnboardingModal: React.FC = () => {
  const { profile, updateProfile, isOnboardingOpen, setIsOnboardingOpen, setActiveTab } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [fullName, setFullName] = useState(profile.fullName || '');
  const [collegeName, setCollegeName] = useState(profile.collegeName || '');
  const [department, setDepartment] = useState(profile.department || ALL_DEPARTMENTS[0]);
  const [customDepartment, setCustomDepartment] = useState(profile.customDepartment || '');
  const [academicYear, setAcademicYear] = useState<AcademicYear>(profile.academicYear || '3rd Year');
  const [city, setCity] = useState(profile.city || 'Bangalore');
  const [skills, setSkills] = useState<StudentSkill[]>(profile.skills || []);
  const [areasOfInterest, setAreasOfInterest] = useState<string[]>(profile.areasOfInterest || []);
  const [careerGoal, setCareerGoal] = useState(profile.careerGoal || '');
  const [targetRole, setTargetRole] = useState(profile.targetRole || '');
  const [weeklyHours, setWeeklyHours] = useState(profile.weeklyHoursAvailable || 12);

  // Quick skill add input state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Intermediate');

  if (!isOnboardingOpen) return null;

  const isOtherDepartment = department === 'Other';

  const handleAddSkill = (name: string, level: SkillLevel = 'Intermediate') => {
    if (!name.trim()) return;
    if (skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) return;
    setSkills([...skills, { name: name.trim(), level }]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (name: string) => {
    setSkills(skills.filter((s) => s.name !== name));
  };

  const handleSkillLevelChange = (name: string, level: SkillLevel) => {
    setSkills(skills.map((s) => (s.name === name ? { ...s, level } : s)));
  };

  const toggleInterest = (interest: string) => {
    if (areasOfInterest.includes(interest)) {
      setAreasOfInterest(areasOfInterest.filter((i) => i !== interest));
    } else {
      setAreasOfInterest([...areasOfInterest, interest]);
    }
  };

  // Get department-relevant quick skills recommendations
  const getDepartmentQuickSkills = () => {
    const activeDept = (isOtherDepartment ? customDepartment : department).toLowerCase();
    if (activeDept.includes('biomedical') || activeDept.includes('biotech')) {
      return [
        'Medical Instrumentation',
        'Biosignal Processing (ECG/EMG)',
        'Biomedical Sensors',
        'Medical Device Regulations (FDA / ISO 13485)',
        'Medical AI & Diagnostic Imaging (DICOM)',
        'Python',
        'Clinical Trials Protocol',
      ];
    }
    if (activeDept.includes('mechanical') || activeDept.includes('aero') || activeDept.includes('civil')) {
      return [
        'SolidWorks (CAD)',
        'ANSYS / FEA Simulation',
        'AutoCAD',
        'Design for Manufacturing (DFM)',
        'GD&T Tolerancing',
        'MATLAB & Simulink',
        'Thermodynamics & CFD',
      ];
    }
    if (activeDept.includes('commerce') || activeDept.includes('b.com') || activeDept.includes('bba') || activeDept.includes('mba')) {
      return [
        'Financial Modeling & Valuation',
        'Power BI & Tableau',
        'Corporate Finance & Accounting',
        'SQL',
        'Business Strategy & Pitch Decks',
        'Market Research',
      ];
    }
    return [
      'Data Structures & Algorithms',
      'React',
      'TypeScript',
      'Python',
      'Git & GitHub',
      'Node.js',
      'SQL',
    ];
  };

  const handleComplete = () => {
    const finalDepartment = isOtherDepartment ? (customDepartment.trim() || 'Custom Degree Programme') : department;
    const defaultGoal = finalDepartment.includes('Biomedical')
      ? 'Secure a Biomedical Engineering & Medical Device R&D Internship'
      : finalDepartment.includes('Mechanical')
      ? 'Secure a Mechanical CAD Design & Manufacturing Internship'
      : finalDepartment.includes('Commerce') || finalDepartment.includes('BBA')
      ? 'Secure a Business Strategy & Financial Analytics Internship'
      : 'Secure a high-impact Technical / Software Engineering Internship';

    const defaultRole = finalDepartment.includes('Biomedical')
      ? 'Biomedical Systems Engineer Intern'
      : finalDepartment.includes('Mechanical')
      ? 'Mechanical Design Engineer Intern'
      : finalDepartment.includes('Commerce')
      ? 'Financial / Business Analyst Intern'
      : 'Software Engineer Intern';

    updateProfile({
      fullName: fullName.trim() || 'Student Explorer',
      collegeName: collegeName.trim() || 'National Institute of Technology',
      department: finalDepartment,
      customDepartment: isOtherDepartment ? customDepartment.trim() : undefined,
      academicYear,
      city: city.trim() || 'Bangalore',
      skills: skills.length > 0 ? skills : [{ name: 'Problem Solving', level: 'Intermediate' }],
      areasOfInterest: areasOfInterest.length > 0 ? areasOfInterest : ['Applied Technical Projects'],
      careerGoal: careerGoal.trim() || defaultGoal,
      targetRole: targetRole.trim() || defaultRole,
      weeklyHoursAvailable: Number(weeklyHours) || 12,
      isOnboarded: true,
    });

    setIsOnboardingOpen(false);
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-navy-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-navy-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Progress Header */}
        <div className="bg-gradient-to-r from-violet-900/40 via-navy-850 to-cyan-900/40 border-b border-slate-800 px-6 py-5 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-navy-950 rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Personalise Your NEXORA Experience</h2>
                <p className="text-xs text-slate-400">Step {step} of 4 • Student Growth Profiler</p>
              </div>
            </div>
            {/* Step Indicators */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step === i
                      ? 'w-6 bg-gradient-to-r from-violet-400 to-cyan-400'
                      : step > i
                      ? 'w-2 bg-emerald-400'
                      : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-slate-200">
          {/* STEP 1: Academic & Basic Info */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-white">Tell us about yourself & your college</h3>
                <p className="text-sm text-slate-400 mt-1">
                  NEXORA customizes opportunities and roadmaps for all university disciplines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    College / University Name *
                  </label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. National Institute of Tech"
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>

                <div className={isOtherDepartment ? 'sm:col-span-1' : 'sm:col-span-2'}>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Department / Degree Programme *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  >
                    {ALL_DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Department Input when 'Other' is selected */}
                {isOtherDepartment && (
                  <div className="animate-slide-up">
                    <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1.5">
                      Specify Custom Department / Degree *
                    </label>
                    <input
                      type="text"
                      required
                      value={customDepartment}
                      onChange={(e) => setCustomDepartment(e.target.value)}
                      placeholder="e.g. Marine Engineering, Nanotech, Applied Chemistry..."
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-cyan-500/50 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-sm"
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
                    City / Preferred Region (Offline Proximity)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bangalore, Chennai, Mumbai, Delhi..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Skills & Proficiency Levels */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-white">What are your current skills?</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Specify your proficiency level so the recommendation engine can surface opportunities with matching prerequisites.
                </p>
              </div>

              {/* Add Custom Skill Box */}
              <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(newSkillName, newSkillLevel)}
                  placeholder="Type any skill (e.g. Medical Instrumentation, SolidWorks, React, SQL)..."
                  className="flex-1 px-4 py-2 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                />
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                  className="px-3 py-2 rounded-xl bg-navy-900 border border-slate-700 text-white text-sm focus:outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleAddSkill(newSkillName, newSkillLevel)}
                  disabled={!newSkillName.trim()}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {/* Quick Suggestions Curated for this Department */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Suggested Skills for {isOtherDepartment ? customDepartment || 'Your Field' : department}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {getDepartmentQuickSkills()
                    .filter((s) => !skills.some((existing) => existing.name.toLowerCase() === s.toLowerCase()))
                    .map((skillName) => (
                      <button
                        key={skillName}
                        type="button"
                        onClick={() => handleAddSkill(skillName, 'Intermediate')}
                        className="px-3 py-1.5 rounded-lg bg-navy-950 hover:bg-navy-800 border border-slate-750 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3 h-3 text-cyan-400" /> {skillName}
                      </button>
                    ))}
                </div>
              </div>

              {/* Added Skills List */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Your Selected Skills ({skills.length}):
                </p>
                {skills.length === 0 ? (
                  <p className="text-xs text-amber-400/90 italic">Please add at least 1 skill to proceed.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-navy-950 border border-slate-800/90"
                      >
                        <span className="text-sm font-medium text-white truncate max-w-[140px]">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <select
                            value={skill.level}
                            onChange={(e) => handleSkillLevelChange(skill.name, e.target.value as SkillLevel)}
                            className="text-xs px-2 py-1 rounded bg-navy-900 border border-slate-700 text-cyan-300 focus:outline-none"
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
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Goals & Availability */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-white">Your Growth Goals & Learning Budget</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Helps our Growth Planner schedule realistic milestones that fit your academic schedule.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Primary Career or Future Goal *
                  </label>
                  <input
                    type="text"
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    placeholder="e.g. Secure an R&D Internship in Medical Devices / Software Engineering / Financial Strategy"
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Target Role Title
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Biomedical Systems Intern, Mechanical CAD Specialist, Full-Stack Engineer"
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>

                {/* Areas of Interest Multi-select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Areas of Interest (Select topics that excite you):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
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
                              : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          <span className="truncate">{interest}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Weekly Time Available */}
                <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-cyan-400" /> Weekly Learning Time Available:
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
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>4 hrs (Light)</span>
                    <span>12 hrs (Balanced)</span>
                    <span>25+ hrs (Intensive)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Launch */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center py-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-3">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white">Your NEXORA Space is Ready!</h3>
                <p className="text-sm text-slate-400 mt-1 max-w-lg mx-auto">
                  We've configured the recommendation engine and generated a customized 30-day growth roadmap for your field.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-navy-950 border border-slate-800 space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-850">
                  <div>
                    <span className="text-xs text-slate-500">Student Name</span>
                    <p className="font-semibold text-white">{fullName || 'Student Explorer'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">College & Year</span>
                    <p className="font-semibold text-white">
                      {collegeName || 'National Tech Institute'} • {academicYear}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Department</span>
                    <p className="font-semibold text-cyan-300">
                      {isOtherDepartment ? customDepartment || 'Custom Field' : department}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Weekly Commitment</span>
                    <p className="font-semibold text-violet-300">{weeklyHours} Hours / Week</p>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block mb-1">Key Profile Skills ({skills.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <Badge key={s.name} variant="cyan" size="xs">
                        {s.name} ({s.level})
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transparent Disclaimer */}
              <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs text-slate-300 leading-relaxed">
                <strong className="text-violet-300 font-semibold">Transparent System Notice:</strong> NEXORA supports students from all degree departments with transparent heuristic matching and realistic demonstration data. Roadmaps are educational recommendations designed to support your development.
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="bg-navy-950 border-t border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-navy-900 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={(step === 1 && !fullName.trim()) || (step === 1 && isOtherDepartment && !customDepartment.trim())}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg shadow-violet-500/20 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="px-7 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 hover:brightness-110 text-white shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              Launch My Dashboard <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
