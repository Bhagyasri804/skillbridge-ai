import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './views/HomePage';
import DashboardPage from './views/DashboardPage';
import AssessmentPage from './views/AssessmentPage';
import CareersPage from './views/CareersPage';
import RoadmapPage from './views/RoadmapPage';
import { storageService } from './services/storageService';
import { calculateJobReadinessScore } from './services/recommendationEngine';

export default function App() {
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

  // Reset all
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
    showToast('Platform data reset to factory defaults', 'info');
  };

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const readinessScore = calculateJobReadinessScore(userSkills, roadmapProgress.length);

  return (
    <div className="min-h-screen flex flex-col bg-[#080B14] text-slate-100 font-sans selection:bg-purple-600/30 selection:text-purple-200">
      {/* Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={handleNavigate}
        readinessScore={readinessScore}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            userSkillsCount={userSkills.length}
          />
        )}

        {activePage === 'dashboard' && (
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

        {activePage === 'assessment' && (
          <AssessmentPage
            userSkills={userSkills}
            onSaveSkills={handleSaveSkills}
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}

        {activePage === 'careers' && (
          <CareersPage
            userSkills={userSkills}
            targetCareerId={targetCareerId}
            setTargetCareerId={handleSetTargetCareer}
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}

        {activePage === 'roadmap' && (
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
