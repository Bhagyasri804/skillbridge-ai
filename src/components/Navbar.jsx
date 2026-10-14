import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Compass,
  LayoutDashboard,
  CheckSquare,
  Map,
  Menu,
  X,
  LogOut,
  LogIn,
  UserPlus,
  User,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, readinessScore = 0, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, requiresAuth: true },
    { id: 'assessment', label: 'Skill Assessment', icon: CheckSquare, requiresAuth: true },
    { id: 'careers', label: 'Explore Careers', icon: Compass },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Map },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoutClick = async () => {
    setMobileMenuOpen(false);
    if (onLogout) {
      await onLogout();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080B14]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-500 shadow-md shadow-purple-900/40 border border-purple-400/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
                SkillBridge <span className="text-purple-400 font-extrabold">AI</span>
              </span>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                PROD
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400 font-normal">
              Smart Career & Skill Navigator
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Readiness Pill */}
              <div
                onClick={() => handleNavClick('dashboard')}
                className="cursor-pointer flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-purple-500/50 transition-colors"
                title="View Job Readiness in Dashboard"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <div className="text-xs">
                  <span className="text-slate-400">Readiness: </span>
                  <span className="font-bold font-mono text-purple-300">{readinessScore}%</span>
                </div>
              </div>

              {/* User profile badge */}
              <div
                onClick={() => handleNavClick('dashboard')}
                className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-medium hover:border-purple-500/60 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span className="max-w-[120px] truncate">{user?.name}</span>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogoutClick}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-500/30 transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {/* Login button */}
              <button
                onClick={() => handleNavClick('login')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  activePage === 'login'
                    ? 'bg-purple-600 text-white border-purple-500'
                    : 'text-slate-300 bg-slate-900 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>

              {/* Register button */}
              <button
                onClick={() => handleNavClick('register')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0c1020] px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {isAuthenticated && (
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <User className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-white">{user?.name}</span>
              </div>
              <span className="font-bold font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Readiness: {readinessScore}%
              </span>
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-600/20 border border-purple-500/30 text-purple-200'
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-purple-400" />
                  <span>{item.label}</span>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-purple-400" />}
              </button>
            );
          })}

          {/* Mobile Auth Actions */}
          <div className="pt-2 border-t border-slate-800/80">
            {isAuthenticated ? (
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-red-400 bg-red-950/20 border border-red-500/30 hover:bg-red-950/40 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of SkillBridge AI</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleNavClick('login')}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-purple-600 text-center"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
