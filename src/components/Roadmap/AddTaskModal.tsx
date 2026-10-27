import React, { useState } from 'react';
import { RoadmapTaskType } from '../../types/roadmap';
import { Modal } from '../Modal';
import { POPULAR_SKILLS } from '../../data/defaultProfile';
import { Plus, Clock, Target, FolderGit2 } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  weekNumber: number;
  onClose: () => void;
  onAdd: (weekNumber: number, task: {
    title: string;
    description: string;
    estimatedHours: number;
    skills: string[];
    type: RoadmapTaskType;
    practicalOutcome: string;
  }) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  weekNumber,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(2.0);
  const [skillsText, setSkillsText] = useState('React, TypeScript');
  const [type, setType] = useState<RoadmapTaskType>('practice');
  const [practicalOutcome, setPracticalOutcome] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onAdd(weekNumber, {
      title: title.trim(),
      description: description.trim() || 'Custom student roadmap objective.',
      estimatedHours: Number(estimatedHours) || 2,
      skills: skills.length > 0 ? skills : ['General Tech'],
      type,
      practicalOutcome: practicalOutcome.trim() || 'Completed deliverable logged in roadmap.',
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Custom Task to Week ${weekNumber}`}
      subtitle="Schedule an additional topic, exercise, or project objective for this milestone."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Task Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Implement React Query caching on search page"
            className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide brief steps or learning objectives..."
            className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Estimated Hours
            </label>
            <input
              type="number"
              min="0.5"
              max="20"
              step="0.5"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Task Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as RoadmapTaskType)}
              className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="practice">Hands-on Practice</option>
              <option value="project">Practical Project</option>
              <option value="concept">Concept & Theory</option>
              <option value="challenge">Challenge / Interview Prep</option>
              <option value="reading">Reading / Documentation</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Skills (comma separated)
          </label>
          <input
            type="text"
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
            placeholder="React, TypeScript, Testing"
            className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Practical Outcome / Deliverable
          </label>
          <input
            type="text"
            value={practicalOutcome}
            onChange={(e) => setPracticalOutcome(e.target.value)}
            placeholder="e.g. Working custom hook tested in CodeSandbox"
            className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-navy-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold shadow-md shadow-violet-500/20"
          >
            Add to Week {weekNumber}
          </button>
        </div>
      </form>
    </Modal>
  );
};
