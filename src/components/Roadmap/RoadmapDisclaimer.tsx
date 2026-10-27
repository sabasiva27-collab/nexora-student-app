import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export const RoadmapDisclaimer: React.FC = () => {
  return (
    <div className="rounded-2xl bg-violet-950/30 border border-violet-500/20 p-4 sm:p-5 flex items-start gap-3.5 text-xs text-slate-300 leading-relaxed">
      <div className="p-2 rounded-xl bg-violet-900/50 border border-violet-500/30 shrink-0 text-violet-300 mt-0.5">
        <Info className="w-4 h-4" />
      </div>
      <div>
        <p className="font-semibold text-white mb-0.5">
          Educational Recommendation Notice
        </p>
        <p className="text-slate-300">
          This 30-day starter roadmap is an educational recommendation designed to guide your self-directed study and hands-on skill development. It is <strong className="text-violet-300 font-medium">not a guarantee</strong> of employment, internship hiring, or academic selection. Individual results depend on your effort, project portfolio quality, and external evaluation by employers.
        </p>
      </div>
    </div>
  );
};
