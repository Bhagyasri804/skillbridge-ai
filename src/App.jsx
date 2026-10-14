import React, { useState, useEffect } from 'react';
import SkillCategories from "./SkillCategories";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './views/HomePage';
import DashboardPage from './views/DashboardPage';
import AssessmentPage from './views/AssessmentPage';
import CareersPage from './views/CareersPage';
import RoadmapPage from './views/RoadmapPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { storageService } from './services/storageService';
import { calculateJobReadinessScore } from './services/recommendationEngine';
import { Sparkles } from 'lucide-react';

function AppContent() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  const [activePage, setActivePage] = useState('home');
  const [userSkills, setUserSkills] = useState(() => storageService.getUserSkills());
  const [targetCareerId, setTargetCareerId] = useState(() => storageService.getTargetCareer());
  const [roadmapProgress, setRoadmapProgress] = useState(() => storageService.getRoadmapProgress());
  const [userProfile, setUserProfile] = useState(() => storageService.getUserProfile());

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Sync authenticated user's name to profile display when logged in
  useEffect(() => {
    if (user && user.name) {
      setUserProfile(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  // Skill updates
  const handleSaveSkills = (updatedSkills) => {
    setUserSkills(updatedSkills);
    storageService.saveUserSkills(updatedSkills);
  };

  // Target career update
  const handleSetTargetCareer = (careerId) => {
    setTargetCareerId(careerId);
    storageService.saveTargetCareer(careerId);
  };

  // Roadmap progress toggle
  const handleToggleRoadmapItem = (itemId) => {
    const updated = storageService.toggleRoadmapItem(itemId);
    setRoadmapProgress(updated);
  };

  // Profile update
  const handleUpdateProfile = (profile) => {
    setUserProfile(profile);
    storageService.saveUserProfile(profile);
  };

  // Reset data
  const handleResetData = () => {
    storageService.resetAllData();
    const defaultSkills = storageService.getUserSkills();
    const defaultTarget = storageService.getTargetCareer();
    const defaultProgress = storageService.getRoadmapProgress();
    const defaultProfile = storageService.getUserProfile();
    setUserSkills(defaultSkills);
    setTargetCareerId(defaultTarget);
    setRoadmapProgress(defaultProgress);
    setUserProfile(defaultProfile);
    showToast('Platform preferences reset to factory defaults', 'info');
  };

  // Navigation with private route enforcement
  const handleNavigate = (pageId) => {
    const privatePages = ['dashboard', 'assessment'];

    if (privatePages.includes(pageId) && !isAuthenticated) {
      showToast('Please sign in or create an account to access this area.', 'info');
      setActivePage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logged out successfully.', 'info');
      setActivePage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      showToast('Failed to log out completely.', 'error');
    }
  };

  const readinessScore = calculateJobReadinessScore(userSkills, roadmapProgress.length);

  // If loading initial session from cookie, show sleek dark loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#080B14] text-slate-100">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-purple-900/50 border border-purple-400/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <p className="text-sm font-semibold tracking-wider text-purple-300">
            Initializing SkillBridge AI...
          </p>
        </div>
      </div>
    );
  }

  // Fallback protection: if activePage is private and user is not authenticated, render Login
  const isCurrentPagePrivate = ['dashboard', 'assessment'].includes(activePage);
  const effectivePage = (isCurrentPagePrivate && !isAuthenticated) ? 'login' : activePage;

  return (
    <div className="min-h-screen flex flex-col bg-[#080B14] text-slate-100 font-sans selection:bg-purple-600/30 selection:text-purple-200">
      {/* Navigation Bar */}
      <Navbar
        activePage={effectivePage}
        setActivePage={handleNavigate}
        readinessScore={readinessScore}
        onLogout={handleLogout}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {effectivePage === 'home' && (
          <>
            <HomePage
              onNavigate={handleNavigate}
              userSkillsCount={userSkills.length}
            />
            <SkillCategories />
          </>
        )}

        {effectivePage === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}

        {effectivePage === 'register' && (
          <RegisterPage
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}

        {effectivePage === 'dashboard' && isAuthenticated && (
          <DashboardPage
            userSkills={userSkills}
            targetCareerId={targetCareerId}
            setTargetCareerId={handleSetTargetCareer}
            roadmapProgress={roadmapProgress}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onNavigate={handleNavigate}
            onResetData={handleResetData}
            showToast={showToast}
          />
        )}

        {effectivePage === 'assessment' && isAuthenticated && (
          <AssessmentPage
            userSkills={userSkills}
            onSaveSkills={handleSaveSkills}
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}

        {effectivePage === 'careers' && (
          <CareersPage
            userSkills={userSkills}
            targetCareerId={targetCareerId}
            setTargetCareerId={handleSetTargetCareer}
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}

        {effectivePage === 'roadmap' && (
          <RoadmapPage
            targetCareerId={targetCareerId}
            setTargetCareerId={handleSetTargetCareer}
            roadmapProgress={roadmapProgress}
            onToggleRoadmapItem={handleToggleRoadmapItem}
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Toast Alert */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
