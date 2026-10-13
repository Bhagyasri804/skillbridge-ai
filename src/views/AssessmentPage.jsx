import React, { useState } from 'react';
import { AVAILABLE_SKILLS, SKILL_CATEGORIES, SKILL_PRESETS } from '../data/skillsData';
import { calculateRecommendations } from '../services/recommendationEngine';
import { CheckCircle2, RotateCcw, Save, Sparkles, Filter, Check, ArrowRight, Info, Zap } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

export default function AssessmentPage({
  userSkills,
  onSaveSkills,
  onNavigate,
  showToast
}) {
  // Local state for interactive editing before save
  const [selectedMap, setSelectedMap] = useState(() => {
    const map = {};
    userSkills.forEach(s => {
      map[s.id] = s.level || 'intermediate';
    });
    return map;
  });

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Current list in format for recommendation engine
  const currentSkillsList = Object.entries(selectedMap).map(([id, level]) => ({ id, level }));
  const liveRecommendations = calculateRecommendations(currentSkillsList);

  const toggleSkill = (skillId) => {
    setSelectedMap(prev => {
      const copy = { ...prev };
      if (copy[skillId]) {
        delete copy[skillId];
      } else {
        copy[skillId] = 'intermediate'; // default level
      }
      return copy;
    });
  };

  const setSkillLevel = (skillId, level, e) => {
    e.stopPropagation();
    setSelectedMap(prev => ({
      ...prev,
      [skillId]: level
    }));
  };

  const applyPreset = (preset) => {
    const newMap = {};
    preset.skills.forEach(id => {
      newMap[id] = 'intermediate';
    });
    setSelectedMap(newMap);
    showToast(`Applied preset: ${preset.name}`, 'info');
  };

  const handleClearAll = () => {
    setSelectedMap({});
    showToast('Cleared all selected skills', 'info');
  };

  const handleSelectAll = () => {
    const newMap = {};
    AVAILABLE_SKILLS.forEach(s => {
      newMap[s.id] = 'intermediate';
    });
    setSelectedMap(newMap);
    showToast('Selected all available skills', 'info');
  };

  const handleSave = () => {
    const formatted = Object.entries(selectedMap).map(([id, level]) => ({ id, level }));
    onSaveSkills(formatted);
    showToast(`Saved ${formatted.length} skills to your student profile!`, 'success');
  };

  const filteredSkills = AVAILABLE_SKILLS.filter(skill => {
    const matchesCategory = activeCategory === 'ALL' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedCount = Object.keys(selectedMap).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Assessment Matrix</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Technical Skill Assessment
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Select the technologies and soft skills you know, configure your proficiency, and watch career matches update in real-time.
          </p>
        </div>

        {/* Quick Save and Clear Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleClearAll}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>Save Assessment ({selectedCount})</span>
          </button>
        </div>
      </div>

      {/* Preset Quick-Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Starter Presets</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {SKILL_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(p)}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>{p.name}</span>
            </button>
          ))}
          <button
            onClick={handleSelectAll}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
          >
            Select All Skills
          </button>
        </div>
      </div>

      {/* Main Grid: Left Skill Selector, Right Live Match Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skills Selector (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveCategory('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCategory === 'ALL'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Skills ({AVAILABLE_SKILLS.length})
              </button>
              {Object.values(SKILL_CATEGORIES).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Java, React, SQL..."
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-purple-500 focus:outline-none text-xs text-white placeholder-slate-500 w-full sm:w-56"
            />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.map(skill => {
              const isSelected = Boolean(selectedMap[skill.id]);
              const currentLevel = selectedMap[skill.id] || 'intermediate';

              return (
                <div
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-950/20 border-purple-500/60 shadow-md shadow-purple-950/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/50">
                          {skill.icon}
                        </span>
                        <div>
                          <h3 className="font-bold text-white text-base flex items-center gap-2">
                            {skill.name}
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-purple-400 inline" />
                            )}
                          </h3>
                          <span className="text-[11px] text-purple-300 font-medium">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      {/* Checkbox badge */}
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'border-slate-700 group-hover:border-slate-500 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Proficiency Selector (if selected) */}
                  {isSelected ? (
                    <div className="mt-4 pt-3 border-t border-purple-500/20" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="text-slate-300 font-medium">Proficiency Level:</span>
                        <span className="text-purple-300 capitalize font-mono font-semibold">{currentLevel}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950/60 rounded-lg border border-slate-800">
                        {['beginner', 'intermediate', 'advanced'].map(lvl => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={(e) => setSkillLevel(skill.id, lvl, e)}
                            className={`py-1 rounded text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                              currentLevel === lvl
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                            }`}
                          >
                            {lvl.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 pt-2 text-[11px] text-slate-500">
                      Click to mark as known skill
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Recommendations Sticky Preview (4 cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-white text-base">Live Role Matching</h3>
              </div>
              <span className="text-xs font-mono font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                {selectedCount} Selected
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time career affinity computed based on selected skills & proficiency weights.
            </p>

            {/* List of matched careers */}
            <div className="space-y-3">
              {liveRecommendations.slice(0, 5).map(role => (
                <div
                  key={role.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">{role.title}</span>
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {role.matchPercentage}%
                    </span>
                  </div>
                  <ProgressBar
                    value={role.matchPercentage}
                    size="sm"
                    colorScheme={role.matchPercentage >= 70 ? 'emerald' : role.matchPercentage >= 40 ? 'purple' : 'amber'}
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>{role.matchedRequiredCount}/{role.totalRequiredCount} core skills</span>
                    <span className="text-slate-300 font-mono">{role.avgSalaryIndia || role.avgSalary}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-3">
              <button
                onClick={handleSave}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/40 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Assessment & Continue</span>
              </button>

              <button
                onClick={() => {
                  handleSave();
                  onNavigate('careers');
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Full Career Deep Dive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
