import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Brain,
  Compass,
  ListTodo,
  TrendingUp,
  Target,
  Zap,
  BookOpen,
  Award,
  ChevronRight,
  Code
} from 'lucide-react';

export default function HomePage({ onNavigate, userSkillsCount = 0 }) {
  const features = [
    {
      icon: Brain,
      title: 'Smart Skill Assessment',
      description: 'Self-evaluate your core coding languages, modern frontend/backend frameworks, and problem-solving prowess.',
      action: 'Take Assessment',
      page: 'assessment',
      tag: 'Interactive'
    },
    {
      icon: Compass,
      title: 'AI Career Recommendations',
      description: 'Discover best-fit roles from Java Developer to AI Engineer scored by our role-affinity algorithm.',
      action: 'View Roles',
      page: 'careers',
      tag: 'Scored Matches'
    },
    {
      icon: Target,
      title: 'In-Depth Skill Gap Analysis',
      description: 'Pinpoint exactly which skills you already possess and which high-priority competencies you need to land interviews.',
      action: 'Analyze Gaps',
      page: 'dashboard',
      tag: 'Targeted'
    },
    {
      icon: ListTodo,
      title: 'Actionable Learning Roadmaps',
      description: 'Beginner-friendly step-by-step milestones with progress checkboxes and verified top-tier free tutorials.',
      action: 'Open Roadmaps',
      page: 'roadmap',
      tag: 'Curated'
    }
  ];

  const quickRoles = [
    { title: 'Frontend Developer', skills: ['React', 'JavaScript', 'CSS', 'HTML'], color: 'from-blue-500/20 to-purple-500/20 border-purple-500/30' },
    { title: 'Java Developer', skills: ['Java', 'SQL', 'OOP', 'Spring'], color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30' },
    { title: 'AI & ML Engineer', skills: ['Python', 'Machine Learning', 'Math'], color: 'from-purple-500/20 to-pink-500/20 border-pink-500/30' },
    { title: 'Data Analyst', skills: ['SQL', 'Python', 'Pandas', 'Stats'], color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30' },
  ];

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/15 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-600/10 blur-[90px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Smart Career & Skill Recommendation Platform</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Build Your Skills.{' '}
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                Shape Your Future.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              Bridge the divide between college coursework and hiring demands.
              Evaluate your technical foundation, unlock role-match predictions, and follow step-by-step learning roadmaps.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('assessment')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-900/40 border border-purple-400/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('careers')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Explore 6+ Career Paths</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">95%</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Algorithmic Precision</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">100%</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Free Learning Resources</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">6+</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Core Tech Tracks</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">0 Req</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">No Mandatory API Key</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Career Snapshot Carousel / Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">High-Affinity Pathways</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Explore High-Demand College Careers</h2>
          </div>
          <button
            onClick={() => onNavigate('careers')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-300 hover:text-purple-200"
          >
            <span>View all role details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickRoles.map((role, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-slate-900/70 border backdrop-blur-sm flex flex-col justify-between hover:scale-[1.02] transition-transform ${role.color}`}
            >
              <div>
                <span className="text-xs font-mono font-medium text-slate-400">Track 0{idx + 1}</span>
                <h3 className="text-lg font-bold text-white mt-1">{role.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {role.skills.map(s => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onNavigate('careers')}
                className="mt-6 text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1"
              >
                Inspect Requirements &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Designed for Students</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Everything You Need To Break Into Tech
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No guessing or disjointed tutorials. SkillBridge AI combines assessment, gap detection, and guided learning into one seamless dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-purple-500/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group shadow-lg shadow-black/30"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate(feat.page)}
                  className="mt-6 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-purple-300 pt-3 border-t border-slate-800/80"
                >
                  <span>{feat.action}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works 3-Step Walkthrough */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0B0F1E] border border-purple-500/20 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Step-by-Step Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How SkillBridge AI Accelerates Your Prep</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="space-y-3 p-5 rounded-xl bg-slate-950/60 border border-slate-800/70">
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center font-mono text-sm">
                1
              </div>
              <h3 className="font-bold text-white text-base">Select Your Competencies</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check off skills like Java, Python, SQL, React, HTML, CSS, and problem-solving with custom proficiency levels.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-slate-950/60 border border-slate-800/70">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center font-mono text-sm">
                2
              </div>
              <h3 className="font-bold text-white text-base">Instant AI Role Matching</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The engine evaluates matching percentages, salaries, and prerequisite difficulty to surface high-affinity career tracks.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-slate-950/60 border border-slate-800/70">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center font-mono text-sm">
                3
              </div>
              <h3 className="font-bold text-white text-base">Close the Gap with Roadmaps</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review missing skills, check off interactive milestones, and study verified free tutorials from MDN, Kaggle, and CS50.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You currently have <strong className="text-slate-200">{userSkillsCount} skills</strong> configured in your session.</span>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md transition-all"
            >
              Go to Student Dashboard &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
