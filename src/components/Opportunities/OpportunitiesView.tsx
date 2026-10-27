import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ScoredOpportunity, OpportunityCategory, OpportunityType } from '../../types/opportunity';
import { OpportunityCard } from './OpportunityCard';
import { OpportunityDetailModal } from './OpportunityDetailModal';
import { FilterSidebar, FilterState, ALL_CATEGORIES } from './FilterSidebar';
import {
  Compass,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
  Search,
  FilterX,
  X,
  GraduationCap,
} from 'lucide-react';
import { Badge } from '../Badge';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  type: 'All',
  department: 'All',
  academicYear: 'All',
  requiredSkill: 'All',
  eligibilityQuery: '',
  feeType: 'All',
  maxDistanceKm: 50,
  deadlineFilter: 'All',
  showBookmarkedOnly: false,
  sortBy: 'match',
};

export const OpportunitiesView: React.FC = () => {
  const { scoredOpportunities, bookmarks, selectedOpportunityId, setSelectedOpportunityId, profile } = useApp();

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [activeModalOpp, setActiveModalOpp] = useState<ScoredOpportunity | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Synchronize deep-linked opportunity ID if opened from Dashboard
  useEffect(() => {
    if (selectedOpportunityId) {
      const match = scoredOpportunities.find((o) => o.id === selectedOpportunityId);
      if (match) {
        setActiveModalOpp(match);
      }
      setSelectedOpportunityId(null);
    }
  }, [selectedOpportunityId, scoredOpportunities, setSelectedOpportunityId]);

  // Comprehensive Filter & Sort Logic
  const filteredOpportunities = useMemo(() => {
    return scoredOpportunities
      .filter((opp) => {
        // 1. Search query (title, organizer, description, skills, eligibility)
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = opp.title.toLowerCase().includes(q);
          const matchOrg = opp.organizer.toLowerCase().includes(q);
          const matchDesc = opp.description.toLowerCase().includes(q);
          const matchEligibility = opp.eligibility.toLowerCase().includes(q);
          const matchSkill = opp.requiredSkills.some((s) => s.toLowerCase().includes(q));
          const matchDept = opp.department.some((d) => d.toLowerCase().includes(q));
          if (!matchTitle && !matchOrg && !matchDesc && !matchSkill && !matchDept && !matchEligibility) {
            return false;
          }
        }

        // 2. Category
        if (filters.category !== 'All' && opp.category !== filters.category) {
          return false;
        }

        // 3. Mode / Attendance (Online vs Offline)
        if (filters.type !== 'All' && opp.type !== filters.type) {
          return false;
        }

        // 4. Registration Fee
        if (filters.feeType === 'Free' && opp.fee > 0) return false;
        if (filters.feeType === 'Paid' && opp.fee === 0) return false;

        // 5. Department Filter
        if (filters.department !== 'All') {
          const targetDeptLower = filters.department.toLowerCase();
          const isDeptMatch = opp.department.some((d) => {
            const dLower = d.toLowerCase();
            return (
              dLower.includes('all department') ||
              dLower === 'all' ||
              dLower === targetDeptLower ||
              (targetDeptLower.includes('biomedical') && dLower.includes('biomedical')) ||
              (targetDeptLower.includes('mechanical') && dLower.includes('mechanical')) ||
              (targetDeptLower.includes('computer') && (dLower.includes('computer') || dLower.includes('it'))) ||
              (targetDeptLower.includes('commerce') && (dLower.includes('commerce') || dLower.includes('b.com')))
            );
          });
          if (!isDeptMatch) return false;
        }

        // 6. Academic Year Filter
        if (filters.academicYear !== 'All') {
          if (
            opp.eligibleAcademicYears &&
            opp.eligibleAcademicYears.length > 0 &&
            !opp.eligibleAcademicYears.includes(filters.academicYear)
          ) {
            return false;
          }
        }

        // 7. Required Skill
        if (filters.requiredSkill !== 'All') {
          const skillMatch = opp.requiredSkills.some(
            (s) => s.toLowerCase() === filters.requiredSkill.toLowerCase()
          );
          if (!skillMatch) return false;
        }

        // 8. Registration Deadline Filter
        if (filters.deadlineFilter !== 'All') {
          try {
            const deadlineDate = new Date(opp.registrationDeadline);
            const today = new Date();
            const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

            if (filters.deadlineFilter === 'Closing in 7 Days' && (diffDays < 0 || diffDays > 7)) return false;
            if (filters.deadlineFilter === 'Closing in 14 Days' && (diffDays < 0 || diffDays > 14)) return false;
            if (filters.deadlineFilter === 'Closing in 30 Days' && (diffDays < 0 || diffDays > 30)) return false;
          } catch {
            // keep
          }
        }

        // 9. Max Distance (for offline events only)
        if (opp.type === 'Offline' && filters.maxDistanceKm < 50) {
          if (opp.distanceKm > filters.maxDistanceKm) return false;
        }

        // 10. Bookmarks Only
        if (filters.showBookmarkedOnly && !bookmarks.includes(opp.id)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'match') {
          return b.matchScore.totalScore - a.matchScore.totalScore;
        }
        if (filters.sortBy === 'deadline') {
          return new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime();
        }
        if (filters.sortBy === 'date') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (filters.sortBy === 'fee') {
          return a.fee - b.fee;
        }
        return 0;
      });
  }, [scoredOpportunities, filters, bookmarks]);

  // Featured quick filter pills
  const featuredQuickCategories: (OpportunityCategory | 'All')[] = [
    'All',
    'Workshop',
    'Symposium',
    'Internship',
    'Hackathon',
    'Conference',
    'Research Opportunity',
    'Project Competition',
    'Scholarship',
    'Industrial Training',
    'Entrepreneurship Programme',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Opportunity Discovery
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Discover workshops, symposiums, internships, hackathons, conferences, research, and scholarships across all college departments.
          </p>
        </div>

        {/* Mobile Filter Toggle & Quick Info */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 border border-slate-700 text-sm font-semibold text-slate-200 hover:text-white"
          >
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span>Filters ({filteredOpportunities.length})</span>
          </button>

          <span className="text-xs text-slate-400 bg-navy-900/80 px-3 py-2 rounded-xl border border-slate-800">
            Showing <strong className="text-white">{filteredOpportunities.length}</strong> of {scoredOpportunities.length} Opportunities
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar (1 Column) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(INITIAL_FILTERS)}
            totalCount={scoredOpportunities.length}
            filteredCount={filteredOpportunities.length}
          />
        </div>

        {/* Opportunity Grid (3 Columns) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Quick Filter Pill Shortcuts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs text-slate-500 uppercase tracking-wider shrink-0">Filter Pill:</span>
            {featuredQuickCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                  filters.category === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setFilters({ ...filters, showBookmarkedOnly: !filters.showBookmarkedOnly })}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
                filters.showBookmarkedOnly
                  ? 'bg-violet-600/30 text-violet-200 border border-violet-500/50'
                  : 'bg-navy-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Bookmark className="w-3 h-3" /> Saved ({bookmarks.length})
            </button>
          </div>

          {/* Cards Grid */}
          {filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  onOpenDetails={(item) => setActiveModalOpp(item)}
                />
              ))}
            </div>
          ) : (
            /* Attractive Empty State */
            <div className="rounded-3xl bg-navy-900 border border-slate-800 p-12 text-center space-y-4 my-8">
              <div className="w-16 h-16 rounded-2xl bg-navy-950 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
                <FilterX className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">No opportunities match your filter criteria</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Try clearing specific department filters, switching academic year to "All", or widening your distance slider.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/20 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Event Details */}
      <OpportunityDetailModal
        opportunity={activeModalOpp}
        onClose={() => setActiveModalOpp(null)}
      />

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md lg:hidden">
          <div className="relative w-full max-w-md bg-navy-900 border border-slate-700 rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-white">Discovery Filters</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(INITIAL_FILTERS)}
              totalCount={scoredOpportunities.length}
              filteredCount={filteredOpportunities.length}
            />
            <div className="pt-4 mt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm"
              >
                Apply Filters ({filteredOpportunities.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
