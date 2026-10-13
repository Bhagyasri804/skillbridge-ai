export const SKILL_CATEGORIES = {
  LANGUAGES: 'Languages & Core',
  WEB_DEV: 'Web & Frontend',
  DATA_BACKEND: 'Data & Backend',
  PROFESSIONAL: 'Soft & Problem Solving',
  TOOLS: 'DevOps & Modern Tools'
};

export const AVAILABLE_SKILLS = [
  // Core languages
  {
    id: 'java',
    name: 'Java',
    category: SKILL_CATEGORIES.LANGUAGES,
    icon: '☕',
    description: 'Object-oriented programming, Spring framework, enterprise backend architectures.',
    popularFor: ['Java Developer', 'Backend Developer', 'Enterprise Software Engineer']
  },
  {
    id: 'python',
    name: 'Python',
    category: SKILL_CATEGORIES.LANGUAGES,
    icon: '🐍',
    description: 'Data analysis, scripting, AI/ML models, backend APIs with Django/FastAPI.',
    popularFor: ['Data Analyst', 'AI Engineer', 'Backend Developer', 'Python Developer']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: SKILL_CATEGORIES.LANGUAGES,
    icon: '⚡',
    description: 'Dynamic web scripting, modern ES6+, asynchronous programming, DOM manipulation.',
    popularFor: ['Frontend Developer', 'Full Stack Developer', 'Backend Developer']
  },

  // Web & Frontend
  {
    id: 'html',
    name: 'HTML',
    category: SKILL_CATEGORIES.WEB_DEV,
    icon: '🌐',
    description: 'Semantic markup, accessibility (a11y), responsive page structures.',
    popularFor: ['Frontend Developer', 'UI Engineer', 'Web Designer']
  },
  {
    id: 'css',
    name: 'CSS',
    category: SKILL_CATEGORIES.WEB_DEV,
    icon: '🎨',
    description: 'Modern styling, Flexbox, Grid, CSS animations, Tailwind CSS, responsive media queries.',
    popularFor: ['Frontend Developer', 'UI Engineer']
  },
  {
    id: 'react',
    name: 'React',
    category: SKILL_CATEGORIES.WEB_DEV,
    icon: '⚛️',
    description: 'Component architecture, state management (Hooks, Redux/Zustand), virtual DOM, SPA routing.',
    popularFor: ['Frontend Developer', 'Full Stack Developer', 'React Specialist']
  },

  // Data & Backend
  {
    id: 'sql',
    name: 'SQL',
    category: SKILL_CATEGORIES.DATA_BACKEND,
    icon: '🗄️',
    description: 'Relational database queries, joins, indexes, schema design (PostgreSQL, MySQL).',
    popularFor: ['Data Analyst', 'Backend Developer', 'Java Developer', 'Database Admin']
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: SKILL_CATEGORIES.DATA_BACKEND,
    icon: '🟢',
    description: 'Server-side JavaScript runtime, RESTful APIs, Express, async I/O.',
    popularFor: ['Backend Developer', 'Full Stack Developer']
  },

  // Soft Skills & Problem Solving
  {
    id: 'problem_solving',
    name: 'Problem-Solving',
    category: SKILL_CATEGORIES.PROFESSIONAL,
    icon: '🧩',
    description: 'Data structures & algorithms, analytical reasoning, debugging complex edge cases.',
    popularFor: ['AI Engineer', 'Java Developer', 'Backend Developer', 'Software Engineer']
  },
  {
    id: 'communication',
    name: 'Communication',
    category: SKILL_CATEGORIES.PROFESSIONAL,
    icon: '💬',
    description: 'Technical documentation, team collaboration, presenting insights, cross-functional agility.',
    popularFor: ['Data Analyst', 'Product Engineer', 'Tech Lead', 'All Roles']
  },

  // Modern bonus skills
  {
    id: 'git',
    name: 'Git & GitHub',
    category: SKILL_CATEGORIES.TOOLS,
    icon: '🐙',
    description: 'Version control, branch workflows, pull requests, collaborative development.',
    popularFor: ['Frontend Developer', 'Backend Developer', 'All Roles']
  },
  {
    id: 'machine_learning',
    name: 'Machine Learning Basics',
    category: SKILL_CATEGORIES.DATA_BACKEND,
    icon: '🤖',
    description: 'Supervised/unsupervised algorithms, scikit-learn, neural networks, PyTorch fundamentals.',
    popularFor: ['AI Engineer', 'Data Scientist']
  }
];

export const SKILL_PRESETS = [
  {
    name: 'Frontend Starter',
    skills: ['html', 'css', 'javascript', 'react', 'communication'],
    description: 'Ideal for aspiring web and UI engineers.'
  },
  {
    name: 'Backend & Enterprise',
    skills: ['java', 'sql', 'problem_solving', 'git'],
    description: 'Strong foundation for Java & enterprise systems.'
  },
  {
    name: 'Data & AI Explorer',
    skills: ['python', 'sql', 'problem_solving', 'machine_learning'],
    description: 'Focused on data analysis and predictive AI.'
  },
  {
    name: 'CS Core Student',
    skills: ['problem_solving', 'python', 'java', 'sql', 'communication'],
    description: 'Balanced academic CS foundation.'
  }
];
