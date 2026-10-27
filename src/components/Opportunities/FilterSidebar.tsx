import React from 'react';
import { OpportunityCategory, OpportunityType } from '../../types/opportunity';
import { ALL_DEPARTMENTS, POPULAR_SKILLS } from '../../data/defaultProfile';
import {
  Search,
  Filter,
  RotateCcw,
  SlidersHorizontal,
  Bookmark,
  MapPin,
  Sparkles,
  Calendar,
  GraduationCap,
  Clock,
} from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  category: OpportunityCategory | 'All';
  type: OpportunityType | 'All';
  department: string;
  academicYear: string;
  requiredSkill: string;
  eligibilityQuery: string;
  feeType: 'All' | 'Free' | 'Paid';
  maxDistanceKm: number;
  deadlineFilter: 'All' | 'Closing in 7 Days' | 'Closing in 14 Days' | 'Closing in 30 Days';
  showBookmarkedOnly: boolean;
  sortBy: 'match' | 'deadline' | 'date' | 'fee';
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export const ALL_CATEGORIES: (OpportunityCategory | 'All')[] = [
  'All',
  'Workshop',
  'Symposium',
  'Internship',
  'Hackathon',
  'Conference',
  'Research Opportunity',
  'Project Competition',
  'Scholarship',
  'Online Course',
  'Certification',
  'Industrial Training',
  'Placement Preparation',
  'Entrepreneurship Programme',
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="rounded-3xl bg-navy-900 border border-slate-800/80 p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Discovery Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* 1. Search Query */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Search Title, Skill, or Organiser
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            placeholder="e.g. Biomedical, CAD, React, IEEE..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* 2. Sort By */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Sort Results By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
          className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="match">Highest Match % (Department & Skills)</option>
          <option value="deadline">Soonest Registration Deadline</option>
          <option value="date">Earliest Event Date</option>
          <option value="fee">Free Opportunities First</option>
        </select>
      </div>

      {/* 3. Event Category Dropdown & Pills */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Opportunity Type / Category ({ALL_CATEGORIES.length - 1} Supported)
        </label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value as any })}
          className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
        >
          {ALL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories (Workshops, Internships, etc.)' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Target Department Filter */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Department Filter (All Supported)
        </label>
        <select
          value={filters.department}
          onChange={(e) => onChange({ ...filters, department: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="All">All College Departments</option>
          {ALL_DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* 5. Academic Year Eligibility Filter */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Academic Year Eligibility
        </label>
        <select
          value={filters.academicYear}
          onChange={(e) => onChange({ ...filters, academicYear: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="All">All Academic Years</option>
          <option value="1st Year">1st Year (Freshman)</option>
          <option value="2nd Year">2nd Year (Sophomore)</option>
          <option value="3rd Year">3rd Year (Junior)</option>
          <option value="4th Year">4th Year (Senior)</option>
          <option value="Postgraduate">Postgraduate (Masters / PhD)</option>
        </select>
      </div>

      {/* 6. Required Skill Filter */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Required Skill
        </label>
        <select
          value={filters.requiredSkill}
          onChange={(e) => onChange({ ...filters, requiredSkill: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="All">Any Skill</option>
          {POPULAR_SKILLS.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      {/* 7. Format / Mode (Online vs Offline) */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Location Mode
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['All', 'Online', 'Offline'] as const).map((type) => {
            const isSelected = filters.type === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onChange({ ...filters, type })}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                    : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Registration Fee (Free vs Paid) */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Registration Fee
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['All', 'Free', 'Paid'] as const).map((feeType) => {
            const isSelected = filters.feeType === feeType;
            return (
              <button
                key={feeType}
                type="button"
                onClick={() => onChange({ ...filters, feeType })}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {feeType}
              </button>
            );
          })}
        </div>
      </div>

      {/* 9. Registration Deadline Filter */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-rose-400" /> Registration Deadline
        </label>
        <select
          value={filters.deadlineFilter}
          onChange={(e) => onChange({ ...filters, deadlineFilter: e.target.value as any })}
          className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="All">All Deadlines</option>
          <option value="Closing in 7 Days">Closing in 7 Days (Urgent)</option>
          <option value="Closing in 14 Days">Closing in 14 Days</option>
          <option value="Closing in 30 Days">Closing in 30 Days</option>
        </select>
      </div>

      {/* 10. Distance Slider (for offline events) */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyan-400" /> Max Distance (Offline):
          </span>
          <span className="text-cyan-400">{filters.maxDistanceKm >= 50 ? '50+ km (All)' : `${filters.maxDistanceKm} km`}</span>
        </div>
        <input
          type="range"
          min="5"
          max="50"
          step="5"
          value={filters.maxDistanceKm}
          onChange={(e) => onChange({ ...filters, maxDistanceKm: Number(e.target.value) })}
          className="w-full accent-cyan-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>5 km (Local)</span>
          <span>25 km</span>
          <span>50+ km (All)</span>
        </div>
      </div>

      {/* 11. Bookmarks Toggle */}
      <div className="pt-2 border-t border-slate-800">
        <button
          type="button"
          onClick={() => onChange({ ...filters, showBookmarkedOnly: !filters.showBookmarkedOnly })}
          className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
            filters.showBookmarkedOnly
              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
              : 'bg-navy-950 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${filters.showBookmarkedOnly ? 'fill-cyan-400 text-cyan-400' : ''}`} />
          <span>Show Saved Only</span>
        </button>
      </div>

      {/* Results Count Footer */}
      <div className="pt-2 text-center text-[11px] text-slate-500">
        Showing <strong className="text-white">{filteredCount}</strong> of {totalCount} opportunities
      </div>
    </div>
  );
};
