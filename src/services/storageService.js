const STORAGE_KEYS = {
  USER_SKILLS: 'skillbridge_user_skills',
  TARGET_CAREER: 'skillbridge_target_career',
  ROADMAP_PROGRESS: 'skillbridge_roadmap_progress',
  USER_PROFILE: 'skillbridge_user_profile',
  AI_CONFIG: 'skillbridge_ai_config'
};

const DEFAULT_PROFILE = {
  name: 'Alex Chen',
  college: 'National Institute of Technology',
  degree: 'B.Tech Computer Science',
  graduationYear: '2026',
  bio: 'Driven CS sophomore eager to transition classroom theory into high-impact software engineering.'
};

// Default initial starter skills so dashboard isn't completely blank on first boot
const DEFAULT_INITIAL_SKILLS = [
  { id: 'javascript', level: 'intermediate' },
  { id: 'html', level: 'intermediate' },
  { id: 'css', level: 'intermediate' },
  { id: 'react', level: 'beginner' },
  { id: 'problem_solving', level: 'beginner' }
];

export const storageService = {
  // User Skills
  getUserSkills() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_SKILLS);
      if (!data) {
        // Save initial default and return
        this.saveUserSkills(DEFAULT_INITIAL_SKILLS);
        return DEFAULT_INITIAL_SKILLS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load user skills from LocalStorage', e);
      return DEFAULT_INITIAL_SKILLS;
    }
  },

  saveUserSkills(skills) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_SKILLS, JSON.stringify(skills));
    } catch (e) {
      console.error('Failed to save user skills to LocalStorage', e);
    }
  },

  // Target Career
  getTargetCareer() {
    try {
      return localStorage.getItem(STORAGE_KEYS.TARGET_CAREER) || 'frontend-developer';
    } catch (e) {
      return 'frontend-developer';
    }
  },

  saveTargetCareer(careerId) {
    try {
      localStorage.setItem(STORAGE_KEYS.TARGET_CAREER, careerId);
    } catch (e) {
      console.error('Failed to save target career to LocalStorage', e);
    }
  },

  // Roadmap Progress (Array of completed item IDs)
  getRoadmapProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ROADMAP_PROGRESS);
      return data ? JSON.parse(data) : ['fe-html-semantics'];
    } catch (e) {
      return ['fe-html-semantics'];
    }
  },

  saveRoadmapProgress(completedItemIds) {
    try {
      localStorage.setItem(STORAGE_KEYS.ROADMAP_PROGRESS, JSON.stringify(completedItemIds));
    } catch (e) {
      console.error('Failed to save roadmap progress to LocalStorage', e);
    }
  },

  toggleRoadmapItem(itemId) {
    const current = this.getRoadmapProgress();
    const updated = current.includes(itemId)
      ? current.filter(id => id !== itemId)
      : [...current, itemId];
    this.saveRoadmapProgress(updated);
    return updated;
  },

  // User Profile
  getUserProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  },

  saveUserProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save user profile', e);
    }
  },

  // Reset all to default state
  resetAllData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_SKILLS);
      localStorage.removeItem(STORAGE_KEYS.TARGET_CAREER);
      localStorage.removeItem(STORAGE_KEYS.ROADMAP_PROGRESS);
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      localStorage.removeItem(STORAGE_KEYS.AI_CONFIG);
      return true;
    } catch (e) {
      return false;
    }
  }
};
