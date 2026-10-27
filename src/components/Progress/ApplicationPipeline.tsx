import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus } from '../../types/tracking';
import { Opportunity } from '../../types/opportunity';
import { ApplyConfirmModal } from './ApplyConfirmModal';
import {
  Bookmark,
  Calendar,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '../Badge';

export const ApplicationPipeline: React.FC = () => {
  const { opportunities, applications, bookmarks, updateApplicationStatus, setActiveTab, setSelectedOpportunityId } = useApp();

  const [confirmModalData, setConfirmModalData] = useState<{
    isOpen: boolean;
    opportunityId: string;
    title: string;
    officialUrl?: string;
  }>({
    isOpen: false,
    opportunityId: '',
    title: '',
  });

  const columns: { status: ApplicationStatus; label: string; variant: 'slate' | 'violet' | 'cyan' | 'emerald'; desc: string }[] = [
    {
      status: 'Saved',
      label: 'Watchlist / Saved',
      variant: 'slate',
      desc: 'Opportunities you have bookmarked for review.',
    },
    {
      status: 'Planning to Apply',
      label: 'Planning to Apply',
      variant: 'violet',
      desc: 'Active preparation: resume tailoring or team formation.',
    },
    {
      status: 'Applied',
      label: 'Submitted (Applied)',
      variant: 'cyan',
      desc: 'Confirmed submissions submitted on official portals.',
    },
    {
      status: 'Completed',
      label: 'Attended / Completed',
      variant: 'emerald',
      desc: 'Events attended, projects pitched, or interviews concluded.',
    },
  ];

  // Group tracked opportunities
  const getOpportunitiesByStatus = (status: ApplicationStatus): { opp: Opportunity; record?: any }[] => {
    // If status is 'Saved', also include bookmarked items that don't have an application record yet
    const matchingRecords = applications.filter((a) => a.status === status);
    const result: { opp: Opportunity; record?: any }[] = [];

    matchingRecords.forEach((rec) => {
      const opp = opportunities.find((o) => o.id === rec.opportunityId);
      if (opp) result.push({ opp, record: rec });
    });

    if (status === 'Saved') {
      bookmarks.forEach((bId) => {
        const hasRec = result.some((r) => r.opp.id === bId);
        if (!hasRec) {
          const opp = opportunities.find((o) => o.id === bId);
          if (opp) result.push({ opp, record: undefined });
        }
      });
    }

    return result;
  };

  const handleStatusChange = (opportunityId: string, targetStatus: ApplicationStatus, oppTitle: string, url?: string) => {
    if (targetStatus === 'Applied') {
      setConfirmModalData({
        isOpen: true,
        opportunityId,
        title: oppTitle,
        officialUrl: url,
      });
      return;
    }
    updateApplicationStatus(opportunityId, targetStatus, false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Application Pipeline & Tracking</h3>
          <p className="text-xs text-slate-400">
            Track student opportunities from initial discovery to confirmed submission.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('opportunities')}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
        >
          Discover More Opportunities &rarr;
        </button>
      </div>

      {/* 4 Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const items = getOpportunitiesByStatus(col.status);

          return (
            <div
              key={col.status}
              className="rounded-2xl bg-navy-900 border border-slate-800 p-4 space-y-3 flex flex-col min-h-[280px]"
            >
              {/* Column Header */}
              <div className="pb-2 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{col.label}</span>
                  <span className="text-xs font-black text-cyan-400 bg-navy-950 px-2 py-0.5 rounded-full border border-slate-800">
                    {items.length}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{col.desc}</p>
              </div>

              {/* Column Items */}
              <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px] pr-1">
                {items.map(({ opp, record }) => (
                  <div
                    key={opp.id}
                    className="p-3.5 rounded-xl bg-navy-950/90 border border-slate-800 hover:border-slate-700 transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <Badge variant="violet" size="xs">
                        {opp.category}
                      </Badge>
                      <span className="text-[10px] text-slate-500">{opp.type}</span>
                    </div>

                    <h4
                      onClick={() => {
                        setSelectedOpportunityId(opp.id);
                        setActiveTab('opportunities');
                      }}
                      className="text-xs font-bold text-white hover:text-cyan-300 cursor-pointer line-clamp-2 leading-tight"
                      title={opp.title}
                    >
                      {opp.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 truncate">{opp.organizer}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-850">
                      <span>Deadline: {opp.registrationDeadlineDisplay}</span>
                    </div>

                    {/* Notes if recorded */}
                    {record?.notes && (
                      <div className="p-2 rounded bg-navy-900 border border-slate-800 text-[10px] text-slate-300 italic line-clamp-2">
                        "{record.notes}"
                      </div>
                    )}

                    {/* Move Status Dropdown */}
                    <div className="pt-2 flex items-center justify-between gap-1">
                      <select
                        value={col.status}
                        onChange={(e) =>
                          handleStatusChange(
                            opp.id,
                            e.target.value as ApplicationStatus,
                            opp.title,
                            opp.officialRegistrationUrl
                          )
                        }
                        className="text-[11px] px-2 py-1 rounded bg-navy-900 border border-slate-700 text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        <option value="Saved">Move: Saved</option>
                        <option value="Planning to Apply">Move: Planning</option>
                        <option value="Applied">Move: Applied</option>
                        <option value="Completed">Move: Completed</option>
                      </select>

                      {opp.officialRegistrationUrl && (
                        <a
                          href={opp.officialRegistrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors"
                          title="Open official site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {items.length === 0 && (
                  <div className="h-32 flex flex-col items-center justify-center text-center p-3 border border-dashed border-slate-800 rounded-xl text-slate-600">
                    <p className="text-xs">No opportunities here</p>
                    <p className="text-[10px] text-slate-600 mt-1">Move items using the selector</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      <ApplyConfirmModal
        isOpen={confirmModalData.isOpen}
        opportunityTitle={confirmModalData.title}
        officialUrl={confirmModalData.officialUrl}
        onClose={() => setConfirmModalData({ ...confirmModalData, isOpen: false })}
        onConfirm={(notes) => {
          updateApplicationStatus(confirmModalData.opportunityId, 'Applied', true, notes);
        }}
      />
    </div>
  );
};
