import React, { useState } from 'react';
import { LEARNING_ROADMAPS } from '../data/roadmapsData';
import { CAREER_ROLES } from '../data/careersData';
import ProgressBar from '../components/ProgressBar';
import {
  CheckSquare,
  Square,
  ExternalLink,
  BookOpen,
  Sparkles,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowRight,
  Target,
  CheckCircle2
} from 'lucide-react';

export default function RoadmapPage({
  targetCareerId,
  setTargetCareerId,
  roadmapProgress,
  onToggleRoadmapItem,
  onNavigate,
  showToast
}) {
  const [selectedCareerId, setSelectedCareerId] = useState(targetCareerId || 'frontend-developer');

  // Selected roadmap definition
  const roadmap = LEARNING_ROADMAPS[selectedCareerId] || LEARNING_ROADMAPS['frontend-developer'];
  const careerInfo = CAREER_ROLES.find(c => c.id === selectedCareerId) || CAREER_ROLES[0];

  // Calculate items and completed count
  const allItems = roadmap.phases.flatMap(p => p.items);
  const totalCount = allItems.length;
  const completedCount = allItems.filter(item => roadmapProgress.includes(item.id)).length;
  const overallPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggle = (itemId, itemTitle) => {
    const isCompleted = roadmapProgress.includes(itemId);
    onToggleRoadmapItem(itemId);
    if (!isCompleted) {
      showToast(`Completed milestone: ${itemTitle}`, 'success');
    }
  };

  const handleSetTarget = () => {
    setTargetCareerId(selectedCareerId);
    showToast(`Set ${careerInfo.title} as primary target career!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Learning Pathways</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Curated Learning Roadmaps
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Step-by-step modular curriculum designed for college students. Track checkpoints, bridge your skill gap, and access verified free resources.
          </p>
        </div>

        {/* Career Selector Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-xs text-slate-400 font-medium">Select Career Track:</label>
            <select
              value={selectedCareerId}
              onChange={(e) => setSelectedCareerId(e.target.value)}
              className="bg-slate-900 border border-purple-500/40 text-purple-200 text-xs font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-400 shadow-md"
            >
              {CAREER_ROLES.map(role => (
                <option key={role.id} value={role.id}>
                  {role.title} {role.id === targetCareerId ? '★ (Target)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Roadmap Overview Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-900 border border-purple-500/30 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">{roadmap.title}</h2>
              {selectedCareerId === targetCareerId ? (
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Current Target
                </span>
              ) : (
                <button
                  onClick={handleSetTarget}
                  className="text-xs text-purple-400 hover:text-purple-300 underline font-medium"
                >
                  Set as Target
                </button>
              )}
            </div>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              {roadmap.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                Est. Duration: <strong className="text-slate-200">{roadmap.estimatedDuration}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-400" />
                Phases: <strong className="text-slate-200">{roadmap.phases.length} Phases</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Checkpoints: <strong className="text-slate-200">{completedCount} of {totalCount} Completed</strong>
              </span>
            </div>
          </div>

          {/* Large Progress Widget */}
          <div className="min-w-[200px] p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Completion</span>
              <span className="font-mono font-bold text-purple-400 text-base">{overallPct}%</span>
            </div>
            <ProgressBar
              value={overallPct}
              size="md"
              colorScheme={overallPct >= 80 ? 'emerald' : overallPct >= 40 ? 'purple' : 'cyan'}
            />
            <p className="text-[10px] text-slate-500 pt-1">
              Progress is automatically saved to LocalStorage.
            </p>
          </div>
        </div>
      </div>

      {/* Sequential Phases */}
      <div className="space-y-8">
        {roadmap.phases.map((phase, pIdx) => {
          const phaseItems = phase.items;
          const phaseCompleted = phaseItems.filter(i => roadmapProgress.includes(i.id)).length;
          const phasePct = Math.round((phaseCompleted / phaseItems.length) * 100);

          return (
            <div
              key={phase.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-6"
            >
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-purple-300 text-sm">
                    0{pIdx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{phase.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{phase.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-purple-300">
                      {phaseCompleted}/{phaseItems.length}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">done</span>
                  </div>
                  <div className="w-24">
                    <ProgressBar value={phasePct} size="sm" colorScheme="purple" />
                  </div>
                </div>
              </div>

              {/* Items in this Phase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phaseItems.map((item) => {
                  const isChecked = roadmapProgress.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggle(item.id, item.title)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                        isChecked
                          ? 'bg-purple-950/20 border-purple-500/50 shadow-sm'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Checkbox and Title */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <button
                              type="button"
                              className={`mt-0.5 p-1 rounded-lg border transition-colors ${
                                isChecked
                                  ? 'bg-purple-600 border-purple-500 text-white'
                                  : 'border-slate-700 text-slate-600 group-hover:border-slate-500'
                              }`}
                            >
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4 text-white" />
                              ) : (
                                <Square className="w-4 h-4 text-transparent" />
                              )}
                            </button>
                            <div>
                              <h4
                                className={`text-sm font-bold transition-colors ${
                                  isChecked
                                    ? 'line-through text-slate-400'
                                    : 'text-white group-hover:text-purple-300'
                                }`}
                              >
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                  {item.time}
                                </span>
                                <span className="text-[10px] font-semibold text-purple-400">
                                  {item.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Summary */}
                        <p className="text-xs text-slate-400 leading-relaxed pl-8">
                          {item.summary}
                        </p>
                      </div>

                      {/* Learning Resources */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 pl-8 space-y-1.5" onClick={e => e.stopPropagation()}>
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                          Recommended Free Resources:
                        </p>
                        <div className="flex flex-col gap-1">
                          {item.resources.map((res, rIdx) => (
                            <a
                              key={rIdx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-200 hover:underline transition-colors"
                            >
                              <ExternalLink className="w-3 h-3 shrink-0" />
                              <span className="truncate">{res.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Completion Card */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Consistent Daily Effort Compounds</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Complete milestones one by one, push small proof-of-concept commits to GitHub, and review your Job Readiness score on the student dashboard.
        </p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-6 py-3 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/40 inline-flex items-center gap-2"
        >
          <span>Return to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
