import React from 'react';

export default function SkillBadge({
  skill,
  level = null,
  onRemove = null,
  onClick = null,
  selected = false,
  variant = 'default', // 'default', 'compact', 'removable', 'interactive'
  className = ''
}) {
  if (!skill) return null;

  const levelBadges = {
    beginner: { text: 'Beginner', bg: 'bg-blue-500/10 text-blue-300 border-blue-500/30' },
    intermediate: { text: 'Intermediate', bg: 'bg-purple-500/10 text-purple-300 border-purple-500/30' },
    advanced: { text: 'Advanced', bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' }
  };

  const levelInfo = level ? levelBadges[level] : null;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        selected
          ? 'bg-purple-600/20 border-purple-500 text-purple-200 shadow-sm shadow-purple-500/20 border'
          : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200'
      } ${onClick ? 'cursor-pointer hover:border-purple-400/50' : ''} ${className}`}
    >
      <span className="text-base select-none">{skill.icon || '⚡'}</span>
      <span className="font-medium text-slate-100">{skill.name}</span>

      {levelInfo && (
        <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider font-semibold ${levelInfo.bg}`}>
          {levelInfo.text}
        </span>
      )}

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(skill.id);
          }}
          className="text-slate-400 hover:text-red-400 ml-1 p-0.5 rounded hover:bg-slate-700/50 transition-colors"
          title="Remove skill"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}
