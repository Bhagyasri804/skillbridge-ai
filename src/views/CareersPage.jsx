import React, { useState } from 'react';
import { calculateRecommendations, analyzeSkillGap } from '../services/recommendationEngine';
import { AVAILABLE_SKILLS } from '../data/skillsData';
import ProgressBar from '../components/ProgressBar';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Target,
  DollarSign,
  Sparkles,
  MapPin,
  ExternalLink,
  BookOpen,
  Briefcase
} from 'lucide-react';

export default function CareersPage({
  userSkills,
  targetCareerId,
  setTargetCareerId,
  onNavigate,
  showToast
}) {
  const recommendations = calculateRecommendations(userSkills);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [matchFilter, setMatchFilter] = useState('ALL'); // 'ALL', 'HIGH' (>=70), 'MODERATE' (>=40)
  const [selectedModalCareer, setSelectedModalCareer] = useState(null);

  // Filter & Search Logic
  const filteredCareers = recommendations.filter(career => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'ALL' || career.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesMatchAffinity =
      matchFilter === 'ALL' ||
      (matchFilter === 'HIGH' && career.matchPercentage >= 70) ||
      (matchFilter === 'MODERATE' && career.matchPercentage >= 40);

    return matchesSearch && matchesCategory && matchesMatchAffinity;
  });

  const handleSetTarget = (career) => {
    setTargetCareerId(career.id);
    showToast(`Set "${career.title}" as your primary target career!`, 'success');
  };

  const skillLookup = new Map(AVAILABLE_SKILLS.map(s => [s.id, s]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Career Match Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Explore Career Pathways
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Ranked role recommendations tailored to your assessed technical stack. Inspect prerequisite skills, compensation, and industry demand.
          </p>
        </div>

        <button
          onClick={() => onNavigate('assessment')}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 border border-purple-500/40 hover:bg-slate-800 flex items-center gap-2"
        >
          <span>Modify Skill Profile ({userSkills.length})</span>
          <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Bar (6 cols) */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles by title or keyword (Java, React, SQL, AI)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Category Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="ALL">All Tech Domains</option>
              <option value="Web">Web & Frontend</option>
              <option value="Backend">Backend & Enterprise</option>
              <option value="Data">Data & Business Intelligence</option>
              <option value="Artificial Intelligence">AI & Machine Learning</option>
            </select>
          </div>

          {/* Match Affinity Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={matchFilter}
              onChange={(e) => setMatchFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="ALL">All Match Affinities</option>
              <option value="HIGH">High Affinity (≥ 70%)</option>
              <option value="MODERATE">Moderate Affinity (≥ 40%)</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
          <span>
            Showing <strong className="text-white">{filteredCareers.length}</strong> of {recommendations.length} career pathways
          </span>
          {(searchQuery || selectedCategory !== 'ALL' || matchFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setMatchFilter('ALL');
              }}
              className="text-purple-400 hover:text-purple-300 text-xs font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career) => {
          const isTarget = career.id === targetCareerId;

          return (
            <div
              key={career.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between group ${
                isTarget
                  ? 'bg-gradient-to-b from-purple-950/20 to-slate-900 border-purple-500/60 shadow-xl shadow-purple-950/20 ring-1 ring-purple-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div className="space-y-4">
                {/* Card Top: Category and Target Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                    {career.category}
                  </span>
                  {isTarget && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      <span>Primary Target</span>
                    </span>
                  )}
                </div>

                {/* Role Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {career.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {career.tagline}
                  </p>
                </div>

                {/* Match Score Indicator */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Role Affinity</span>
                    <span className="font-mono font-bold text-purple-400 text-sm">
                      {career.matchPercentage}%
                    </span>
                  </div>
                  <ProgressBar
                    value={career.matchPercentage}
                    size="sm"
                    colorScheme={career.matchPercentage >= 70 ? 'emerald' : career.matchPercentage >= 40 ? 'purple' : 'amber'}
                  />
                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                    <span className="font-medium text-slate-300">
                      {career.matchedRequiredCount}/{career.totalRequiredCount} core skills
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${career.statusColor}`}>
                      {career.status.split('/')[0]}
                    </span>
                  </div>
                </div>

                {/* Compensation & Demand Highlights */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80">
                    <p className="text-[10px] text-slate-400 uppercase font-medium">Avg Salary (IN)</p>
                    <p className="text-xs font-bold text-slate-200 mt-0.5 font-mono">{career.avgSalaryIndia}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80">
                    <p className="text-[10px] text-slate-400 uppercase font-medium">Demand</p>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">{career.demandLevel}</p>
                  </div>
                </div>

                {/* Required Skills Checklist Pills */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Required Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {career.requiredSkills.map(skillId => {
                      const skillObj = skillLookup.get(skillId);
                      const isAcquired = userSkills.some(s => s.id === skillId);
                      return (
                        <span
                          key={skillId}
                          className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border font-medium ${
                            isAcquired
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : 'bg-slate-950/80 border-slate-800 text-slate-400'
                          }`}
                        >
                          {isAcquired ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          )}
                          <span>{skillObj ? skillObj.name : skillId}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-800/80 space-y-2 mt-6">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedModalCareer(career)}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Inspect Gaps</span>
                  </button>

                  <button
                    onClick={() => {
                      setTargetCareerId(career.id);
                      onNavigate('roadmap');
                    }}
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Roadmap</span>
                  </button>
                </div>

                {!isTarget && (
                  <button
                    onClick={() => handleSetTarget(career)}
                    className="w-full py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                  >
                    Set as Target Career
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: In-Depth Skill Gap Inspector */}
      {selectedModalCareer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-900 border border-purple-500/40 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  Skill Gap Deep Dive
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {selectedModalCareer.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedModalCareer.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedModalCareer(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Gap Analysis Details */}
            {(() => {
              const gap = analyzeSkillGap(selectedModalCareer.id, userSkills);
              return (
                <div className="space-y-6">
                  {/* Readiness Progress */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Readiness Ratio: {gap.readinessRatio}</span>
                      <span className="font-mono font-bold text-purple-400">{gap.matchPercentage}% Match</span>
                    </div>
                    <ProgressBar
                      value={gap.matchPercentage}
                      size="md"
                      colorScheme={gap.matchPercentage >= 70 ? 'emerald' : 'purple'}
                    />
                  </div>

                  {/* Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Skills You Have */}
                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Mastered Competencies ({gap.skillsYouHave.length})</span>
                      </div>
                      <div className="space-y-2">
                        {gap.skillsYouHave.map(s => (
                          <div key={s.id} className="text-xs flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 text-emerald-200">
                            <span className="font-medium">{s.icon} {s.name}</span>
                            <span className="text-[10px] font-mono capitalize text-emerald-400">{s.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills To Learn */}
                    <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                        <XCircle className="w-4 h-4" />
                        <span>Missing Competencies ({gap.skillsToLearn.length})</span>
                      </div>
                      <div className="space-y-2">
                        {gap.skillsToLearn.map(s => (
                          <div key={s.id} className="text-xs flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                            <span className="font-medium">{s.icon} {s.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${s.isRequired ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-800 text-slate-400'}`}>
                              {s.isRequired ? 'Core' : 'Bonus'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Companies & Career Progression */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <p className="font-semibold text-slate-300">Typical Progression Path:</p>
                    <p className="text-purple-300 font-mono text-[11px]">{selectedModalCareer.careerPath}</p>
                    <p className="font-semibold text-slate-300 pt-2">Hiring Organizations:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedModalCareer.topCompanies.map(c => (
                        <span key={c} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[10px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions in Modal */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setSelectedModalCareer(null)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        handleSetTarget(selectedModalCareer);
                        setSelectedModalCareer(null);
                        onNavigate('roadmap');
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 flex items-center gap-1.5"
                    >
                      <span>Set Target & Open Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
