import React, { useState, useEffect } from 'react';
import {
  calculateRecommendations,
  analyzeSkillGap,
  calculateJobReadinessScore
} from '../services/recommendationEngine';
import { aiService } from '../services/aiService';
import { AVAILABLE_SKILLS } from '../data/skillsData';
import { LEARNING_ROADMAPS } from '../data/roadmapsData';
import ProgressBar from '../components/ProgressBar';
import SkillBadge from '../components/SkillBadge';
import {
  Sparkles,
  Award,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  User,
  GraduationCap,
  Calendar,
  RotateCcw,
  Zap,
  Bot,
  ExternalLink,
  Edit3
} from 'lucide-react';

export default function DashboardPage({
  userSkills,
  targetCareerId,
  setTargetCareerId,
  roadmapProgress,
  userProfile,
  onUpdateProfile,
  onNavigate,
  onResetData,
  showToast
}) {
  const recommendations = calculateRecommendations(userSkills);
  const topCareer = recommendations.find(c => c.id === targetCareerId) || recommendations[0];
  const gapAnalysis = analyzeSkillGap(topCareer.id, userSkills);
  const readinessScore = calculateJobReadinessScore(userSkills, roadmapProgress.length);

  // AI Advice state
  const [aiInsight, setAiInsight] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Temp profile state for modal
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [collegeInput, setCollegeInput] = useState(userProfile.college);
  const [yearInput, setYearInput] = useState(userProfile.graduationYear);

  // Calculate target roadmap progress
  const targetRoadmap = LEARNING_ROADMAPS[topCareer.id] || LEARNING_ROADMAPS['frontend-developer'];
  let totalRoadmapItems = 0;
  targetRoadmap.phases.forEach(p => totalRoadmapItems += p.items.length);
  const targetRoadmapCompleted = targetRoadmap.phases
    .flatMap(p => p.items)
    .filter(item => roadmapProgress.includes(item.id)).length;
  const roadmapPct = totalRoadmapItems > 0 ? Math.round((targetRoadmapCompleted / totalRoadmapItems) * 100) : 0;

  // Load AI advice on mount or target change
  useEffect(() => {
    let isMounted = true;
    setLoadingAi(true);
    aiService.generateCareerAdvice(userSkills, topCareer.id)
      .then(res => {
        if (isMounted) {
          setAiInsight(res);
          setLoadingAi(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoadingAi(false);
      });

    return () => { isMounted = false; };
  }, [userSkills, topCareer.id]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name: nameInput,
      college: collegeInput,
      graduationYear: yearInput
    });
    setProfileModalOpen(false);
    showToast('Student profile updated!', 'success');
  };

  const handleSetTargetCareer = (careerId) => {
    setTargetCareerId(careerId);
    showToast(`Target career set to ${recommendations.find(c => c.id === careerId)?.title}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Welcome & Student Profile Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-purple-950/20 to-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
              Student Career Hub
            </span>
            <span className="text-xs text-slate-400">Class of {userProfile.graduationYear}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <span>Welcome back, {userProfile.name}</span>
            <button
              onClick={() => setProfileModalOpen(true)}
              className="text-slate-400 hover:text-purple-300 p-1 rounded-lg hover:bg-slate-800 transition-colors"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              {userProfile.college}
            </span>
            <span className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-400" />
              Target: <strong className="text-slate-200">{topCareer.title}</strong>
            </span>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('assessment')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/30 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Update Skills ({userSkills.length})</span>
          </button>
          <button
            onClick={() => onNavigate('roadmap')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-2 transition-all"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Roadmap</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Job Readiness Score */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-purple-500/20 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Job Readiness Score</p>
                <p className="text-[11px] text-slate-500">Benchmark for junior hiring</p>
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-400">
              {readinessScore}%
            </span>
          </div>

          <ProgressBar
            value={readinessScore}
            size="md"
            colorScheme={readinessScore >= 75 ? 'emerald' : readinessScore >= 50 ? 'purple' : 'amber'}
          />

          <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Status:</span>
            <span className="font-semibold text-emerald-400">
              {readinessScore >= 70 ? 'Competitive for Internships' : 'Foundation in Progress'}
            </span>
          </div>
        </div>

        {/* Metric 2: Target Career Match */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Role Match</p>
                <p className="text-[11px] text-slate-300 font-semibold">{topCareer.title}</p>
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-400">
              {topCareer.matchPercentage}%
            </span>
          </div>

          <ProgressBar
            value={topCareer.matchPercentage}
            size="md"
            colorScheme="cyan"
          />

          <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Core Requirement:</span>
            <span className="font-semibold text-slate-200">
              {gapAnalysis.readinessRatio}
            </span>
          </div>
        </div>

        {/* Metric 3: Learning Roadmap Progress */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Roadmap Progress</p>
                <p className="text-[11px] text-slate-500">{targetRoadmapCompleted} of {totalRoadmapItems} checkpoints</p>
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
              {roadmapPct}%
            </span>
          </div>

          <ProgressBar
            value={roadmapPct}
            size="md"
            colorScheme="emerald"
          />

          <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Next Target:</span>
            <button
              onClick={() => onNavigate('roadmap')}
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              Resume Learning &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Left 8 cols (Gaps & Skills), Right 4 cols (AI Insights & Top Careers) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skill Gap Analysis & Current Skills */}
        <div className="lg:col-span-8 space-y-8">
          {/* Skill Gap Analysis Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold mb-1">
                  <Target className="w-3.5 h-3.5" />
                  <span>Targeted Skill Gap Analysis</span>
                </div>
                <h2 className="text-xl font-bold text-white">
                  Preparation for: <span className="text-purple-300">{topCareer.title}</span>
                </h2>
              </div>

              {/* Selector to switch target career */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Evaluate for:</span>
                <select
                  value={topCareer.id}
                  onChange={(e) => handleSetTargetCareer(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-purple-300 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 font-medium"
                >
                  {recommendations.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ({c.matchPercentage}%)</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Side-by-side: Skills You Have vs Skills To Learn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Acquired Skills */}
              <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Skills You Have</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                    {gapAnalysis.skillsYouHave.length}
                  </span>
                </div>

                {gapAnalysis.skillsYouHave.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3">No matching skills yet. Complete the assessment to discover overlaps.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {gapAnalysis.skillsYouHave.map(s => (
                      <div
                        key={s.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs font-medium"
                      >
                        <span>{s.icon}</span>
                        <span>{s.name}</span>
                        <span className="text-[10px] text-emerald-400/80 uppercase font-mono">({s.level})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Missing Skills */}
              <div className="p-5 rounded-2xl bg-amber-950/10 border border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Skills You Need to Learn</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                    {gapAnalysis.skillsToLearn.length}
                  </span>
                </div>

                {gapAnalysis.skillsToLearn.length === 0 ? (
                  <div className="py-3 text-xs text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Incredible! You cover 100% of the core competencies for this role.</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {gapAnalysis.skillsToLearn.map(s => (
                      <div
                        key={s.id}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${
                          s.isRequired
                            ? 'bg-purple-950/40 border-purple-500/40 text-purple-200'
                            : 'bg-slate-800/80 border-slate-700/60 text-slate-300'
                        }`}
                      >
                        <span>{s.icon}</span>
                        <span>{s.name}</span>
                        {s.isRequired && (
                          <span className="text-[9px] bg-purple-500/30 text-purple-200 px-1 py-0.2 rounded font-bold uppercase">
                            Required
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Ready to close the skill gap for <strong>{topCareer.title}</strong>?
              </span>
              <button
                onClick={() => onNavigate('roadmap')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open {topCareer.title} Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Current Selected Skills Tag Cloud */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">Your Active Skill Portfolio</h3>
                <p className="text-xs text-slate-400">Skills configured in your profile ({userSkills.length})</p>
              </div>
              <button
                onClick={() => onNavigate('assessment')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <span>Edit All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {userSkills.map(skillEntry => {
                const skillObj = AVAILABLE_SKILLS.find(s => s.id === skillEntry.id);
                return (
                  <SkillBadge
                    key={skillEntry.id}
                    skill={skillObj}
                    level={skillEntry.level}
                    className="hover:scale-105"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Career Advisor & Top Recommended Careers */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Career Advisor Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#121124] to-[#18112e] border border-purple-500/40 shadow-xl shadow-purple-950/20 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">AI Career Advisor</h3>
                  <span className="text-[10px] text-purple-400 font-medium">Smart Synthesis</span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Live AI Logic
              </span>
            </div>

            {loadingAi ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-2 text-slate-400">
                <Sparkles className="w-6 h-6 text-purple-400 animate-spin" />
                <p className="text-xs">Analyzing skill affinity...</p>
              </div>
            ) : aiInsight ? (
              <div className="space-y-3.5 text-xs">
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                  {aiInsight.summary}
                </p>

                <div className="space-y-1.5">
                  <span className="font-bold text-purple-300 uppercase tracking-wider text-[10px]">Key Strength:</span>
                  <p className="text-slate-400 leading-relaxed">{aiInsight.strengths}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">Priority Focus:</span>
                  <p className="text-slate-400 leading-relaxed">{aiInsight.criticalGaps}</p>
                </div>

                <div className="pt-2 border-t border-purple-500/20 space-y-2">
                  <span className="font-bold text-white text-[11px]">Recommended Action Steps:</span>
                  <ul className="space-y-1.5 text-slate-300">
                    {aiInsight.actionPlan.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">&bull;</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>

          {/* Recommended Careers Ranking */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">Recommended Careers</h3>
              <button
                onClick={() => onNavigate('careers')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 4).map(career => {
                const isCurrentTarget = career.id === topCareer.id;
                return (
                  <div
                    key={career.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrentTarget
                        ? 'bg-purple-950/20 border-purple-500/50'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-white">{career.title}</span>
                        {isCurrentTarget && (
                          <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-bold uppercase">
                            Target
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-bold text-purple-400">
                        {career.matchPercentage}%
                      </span>
                    </div>

                    <ProgressBar
                      value={career.matchPercentage}
                      size="sm"
                      colorScheme={career.matchPercentage >= 70 ? 'emerald' : 'purple'}
                    />

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800/60 text-[10px]">
                      <span className="text-slate-400">{career.avgSalaryIndia}</span>
                      {!isCurrentTarget && (
                        <button
                          onClick={() => handleSetTargetCareer(career.id)}
                          className="text-purple-400 hover:text-purple-300 font-semibold"
                        >
                          Set as Target &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset profile danger zone */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need a fresh start?</span>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all saved skills and roadmap progress?')) {
                  onResetData();
                }
              }}
              className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-purple-500/40 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white">Edit Student Profile</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">College / University</label>
                <input
                  type="text"
                  value={collegeInput}
                  onChange={(e) => setCollegeInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Graduation Year</label>
                <input
                  type="text"
                  value={yearInput}
                  onChange={(e) => setYearInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
