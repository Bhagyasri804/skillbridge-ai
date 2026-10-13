import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  colorScheme = 'purple', // 'purple', 'emerald', 'cyan', 'amber'
  showLabel = false,
  label = '',
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const gradientColors = {
    purple: 'from-purple-500 via-indigo-500 to-violet-600',
    emerald: 'from-emerald-400 to-teal-500',
    cyan: 'from-cyan-400 to-blue-500',
    amber: 'from-amber-400 to-orange-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
          <span className="text-slate-300">{label}</span>
          <span className="text-slate-200 font-mono font-semibold">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 ${sizeClasses[size] || sizeClasses.md}`}>
        <div
          className={`h-full bg-gradient-to-r ${gradientColors[colorScheme] || gradientColors.purple} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
