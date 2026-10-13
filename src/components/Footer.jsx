import React from 'react';
import { Sparkles, Heart, Code2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-800/80 bg-[#060810] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-slate-100 tracking-tight">
              SkillBridge <span className="text-purple-400">AI</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Empowering college students and self-learners to navigate dynamic tech careers.
            Assess your competencies, discover high-affinity roles, and bridge skill gaps with actionable roadmaps.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Client-side privacy &bull; Persistent LocalStorage &bull; Ready for AI LLMs</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Navigation</p>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors">
                Home Overview
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('dashboard')} className="hover:text-purple-400 transition-colors">
                Student Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('assessment')} className="hover:text-purple-400 transition-colors">
                Skill Assessment
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('careers')} className="hover:text-purple-400 transition-colors">
                Career Recommendations
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('roadmap')} className="hover:text-purple-400 transition-colors">
                Learning Roadmaps
              </button>
            </li>
          </ul>
        </div>

        {/* Highlighted Roles */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-200 uppercase tracking-wider">In-Demand Roles</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-1.5">
              <span>Frontend Developer</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded">React</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span>Java Developer</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded">Spring</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span>AI & ML Engineer</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">Python</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span>Data Analyst</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded">SQL</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span>Backend Developer</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded">Node/APIs</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>&copy; {new Date().getFullYear()} SkillBridge AI. Built for student career empowerment.</p>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-purple-500 inline fill-purple-500" />
          <span>using React, Tailwind CSS & Vite</span>
        </div>
      </div>
    </footer>
  );
}
