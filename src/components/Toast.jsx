import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const typeConfig = {
    success: {
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/80 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
    },
    error: {
      border: 'border-red-500/40',
      bg: 'bg-red-950/80 text-red-200',
      icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
    },
    info: {
      border: 'border-purple-500/40',
      bg: 'bg-purple-950/80 text-purple-200',
      icon: <Info className="w-5 h-5 text-purple-400 shrink-0" />
    }
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl shadow-black/60 ${config.bg} ${config.border}`}>
        {config.icon}
        <p className="text-sm font-medium text-slate-100 flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
