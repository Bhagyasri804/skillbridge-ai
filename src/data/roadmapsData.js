export const LEARNING_ROADMAPS = {
  'frontend-developer': {
    careerId: 'frontend-developer',
    title: 'Frontend Developer Learning Roadmap',
    description: 'A structured, beginner-to-job-ready learning path to master modern web interfaces, component architecture, and React.',
    estimatedDuration: '12 - 16 Weeks',
    phases: [
      {
        id: 'fe-phase-1',
        name: 'Phase 1: Web Fundamentals (HTML5 & CSS3)',
        summary: 'Build clean, accessible semantic structures and responsive layouts.',
        items: [
          {
            id: 'fe-html-semantics',
            title: 'Semantic HTML & Document Hierarchy',
            summary: 'Master semantic tags (<header>, <nav>, <main>, <article>), forms, inputs, and accessibility standards (a11y).',
            time: '1 week',
            difficulty: 'Beginner',
            skill: 'html',
            resources: [
              { title: 'MDN Web Docs: HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics' },
              { title: 'freeCodeCamp: Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' }
            ]
          },
          {
            id: 'fe-css-flex-grid',
            title: 'Modern CSS Layouts (Flexbox & CSS Grid)',
            summary: 'Deep dive into 1D (Flexbox) and 2D (Grid) layout models, responsive media queries, and box model mechanics.',
            time: '2 weeks',
            difficulty: 'Beginner',
            skill: 'css',
            resources: [
              { title: 'CSS-Tricks: Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
              { title: 'Flexbox Froggy (Interactive Game)', url: 'https://flexboxfroggy.com/' }
            ]
          },
          {
            id: 'fe-tailwind',
            title: 'Utility-First Styling with Tailwind CSS',
            summary: 'Rapid prototyping, utility classes, responsive variants, dark mode configuration, and component extraction.',
            time: '1 week',
            difficulty: 'Beginner',
            skill: 'css',
            resources: [
              { title: 'Official Tailwind CSS Documentation', url: 'https://tailwindcss.com/docs' }
            ]
          }
        ]
      },
      {
        id: 'fe-phase-2',
        name: 'Phase 2: JavaScript Mastery (ES6+)',
        summary: 'Turn static pages into interactive, dynamic web applications with modern JS.',
        items: [
          {
            id: 'fe-js-basics',
            title: 'JavaScript Core & DOM Manipulation',
            summary: 'Variables (let/const), scope, closures, event listeners, querySelectors, and dynamic element rendering.',
            time: '2 weeks',
            difficulty: 'Intermediate',
            skill: 'javascript',
            resources: [
              { title: 'JavaScript.info: The Modern Tutorial', url: 'https://javascript.info/' },
              { title: 'MDN: JavaScript First Steps', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps' }
            ]
          },
          {
            id: 'fe-js-async',
            title: 'Asynchronous JavaScript & REST APIs',
            summary: 'Master Promises, async/await, Fetch API, error handling with try/catch, and parsing JSON payloads.',
            time: '1.5 weeks',
            difficulty: 'Intermediate',
            skill: 'javascript',
            resources: [
              { title: 'MDN: Asynchronous JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous' }
            ]
          }
        ]
      },
      {
        id: 'fe-phase-3',
        name: 'Phase 3: React & Modern Single Page Apps',
        summary: 'Architect scalable web applications using React component hierarchies and hooks.',
        items: [
          {
            id: 'fe-react-core',
            title: 'React Fundamentals: JSX, Props & State',
            summary: 'Component lifecycle, JSX syntax, useState and useEffect hooks, conditional rendering, and list keys.',
            time: '2 weeks',
            difficulty: 'Intermediate',
            skill: 'react',
            resources: [
              { title: 'React.dev: Quick Start & Tutorial', url: 'https://react.dev/learn' }
            ]
          },
          {
            id: 'fe-react-ecosystem',
            title: 'Routing, Context & State Management',
            summary: 'React Router v6 for navigation, Context API, and state libraries (Zustand or Redux Toolkit).',
            time: '2 weeks',
            difficulty: 'Intermediate',
            skill: 'react',
            resources: [
              { title: 'React Router Official Guides', url: 'https://reactrouter.com/' }
            ]
          }
        ]
      },
      {
        id: 'fe-phase-4',
        name: 'Phase 4: Tooling & Portfolio Projects',
        summary: 'Version control, build tools, portfolio polish, and interview prep.',
        items: [
          {
            id: 'fe-git-workflow',
            title: 'Git Version Control & GitHub Deployment',
            summary: 'Branches, commits, resolving merge conflicts, and publishing via GitHub Pages or Vercel.',
            time: '1 week',
            difficulty: 'Beginner',
            skill: 'git',
            resources: [
              { title: 'GitHub Skills: Git Handbook', url: 'https://skills.github.com/' }
            ]
          },
          {
            id: 'fe-capstone',
            title: 'Build & Deploy 2 Portfolio Projects',
            summary: 'Develop a modern SaaS dashboard and an e-commerce catalog featuring real API integration and clean responsive UI.',
            time: '3 weeks',
            difficulty: 'Intermediate',
            skill: 'problem_solving',
            resources: [
              { title: 'Frontend Mentor: Real-world Design Challenges', url: 'https://www.frontendmentor.io/' }
            ]
          }
        ]
      }
    ]
  },

  'java-developer': {
    careerId: 'java-developer',
    title: 'Java Developer Learning Roadmap',
    description: 'Comprehensive pathway to master Java OOP, collections, SQL relational persistence, and Spring Boot.',
    estimatedDuration: '14 - 18 Weeks',
    phases: [
      {
        id: 'java-phase-1',
        name: 'Phase 1: Core Java & OOP Principles',
        summary: 'Understand the JVM, data types, and object-oriented programming concepts.',
        items: [
          {
            id: 'java-syntax-oop',
            title: 'Java Fundamentals & OOP Architecture',
            summary: 'Classes, inheritance, polymorphism, encapsulation, abstraction, and access modifiers.',
            time: '3 weeks',
            difficulty: 'Beginner',
            skill: 'java',
            resources: [
              { title: 'Oracle Java Tutorials: Learning the Java Language', url: 'https://docs.oracle.com/javase/tutorial/java/' },
              { title: 'w3schools: Java OOP', url: 'https://www.w3schools.com/java/java_classes.asp' }
            ]
          },
          {
            id: 'java-collections',
            title: 'Collections Framework & Generics',
            summary: 'ArrayList, HashMap, HashSet, LinkedList, Iterators, and Stream API fundamentals.',
            time: '2 weeks',
            difficulty: 'Intermediate',
            skill: 'java',
            resources: [
              { title: 'Baeldung: Guide to Java Collections', url: 'https://www.baeldung.com/category/java/java-collections/' }
            ]
          }
        ]
      },
      {
        id: 'java-phase-2',
        name: 'Phase 2: Relational Databases & SQL',
        summary: 'Design schemas, write queries, and integrate JDBC/Hibernate.',
        items: [
          {
            id: 'java-sql-mastery',
            title: 'SQL Fundamentals & Schema Design',
            summary: 'CRUD operations, multi-table JOINs, indexing, grouping, transactions (ACID), and constraints in PostgreSQL/MySQL.',
            time: '2 weeks',
            difficulty: 'Beginner',
            skill: 'sql',
            resources: [
              { title: 'Mode Analytics: Interactive SQL Tutorial', url: 'https://mode.com/sql-tutorial/' },
              { title: 'SQLBolt: Learn SQL with Simple Interactive Exercises', url: 'https://sqlbolt.com/' }
            ]
          },
          {
            id: 'java-jdbc-orm',
            title: 'JDBC & Spring Data JPA / Hibernate',
            summary: 'Object-relational mapping, entity modeling, repositories, and query optimization.',
            time: '2 weeks',
            difficulty: 'Intermediate',
            skill: 'sql',
            resources: [
              { title: 'Spring Data JPA Documentation', url: 'https://spring.io/projects/spring-data-jpa' }
            ]
          }
        ]
      },
      {
        id: 'java-phase-3',
        name: 'Phase 3: Spring Boot & Enterprise REST APIs',
        summary: 'Build production-ready web services with Spring Boot.',
        items: [
          {
            id: 'java-spring-boot',
            title: 'Spring Boot RESTful Microservices',
            summary: 'Controllers, Service layers, Dependency Injection, Bean configuration, and validation.',
            time: '3 weeks',
            difficulty: 'Intermediate',
            skill: 'java',
            resources: [
              { title: 'Spring.io: Building a RESTful Web Service', url: 'https://spring.io/guides/gs/rest-service/' }
            ]
          },
          {
            id: 'java-dsa-prep',
            title: 'Data Structures & Problem Solving in Java',
            summary: 'Binary trees, stacks, queues, hash tables, sorting algorithms, and LeetCode practice.',
            time: '3 weeks',
            difficulty: 'Intermediate',
            skill: 'problem_solving',
            resources: [
              { title: 'NeetCode 150 Problem Roadmap', url: 'https://neetcode.io/roadmap' }
            ]
          }
        ]
      }
    ]
  },

  'backend-developer': {
    careerId: 'backend-developer',
    title: 'Backend Developer Learning Roadmap',
    description: 'Learn server architectures, databases, REST APIs, caching, and server security.',
    estimatedDuration: '14 - 16 Weeks',
    phases: [
      {
        id: 'be-phase-1',
        name: 'Phase 1: Server Logic & Runtime Basics',
        summary: 'Server-side execution, asynchronous paradigms, and modular patterns.',
        items: [
          {
            id: 'be-node-express',
            title: 'Node.js & Express API Development',
            summary: 'Event loop, middleware patterns, routing, request parsing, response status codes, and error middleware.',
            time: '3 weeks',
            difficulty: 'Beginner',
            skill: 'nodejs',
            resources: [
              { title: 'ExpressJS Official Starter Guide', url: 'https://expressjs.com/en/starter/installing.html' },
              { title: 'Node.js Dev Guide', url: 'https://nodejs.org/en/learn' }
            ]
          }
        ]
      },
      {
        id: 'be-phase-2',
        name: 'Phase 2: Database Modeling & SQL Queries',
        summary: 'Store, query, and migrate persistent application state safely.',
        items: [
          {
            id: 'be-sql-db',
            title: 'Relational Database Architecture & SQL',
            summary: 'Normalization, foreign keys, complex queries, transactions, indexes, connection pools.',
            time: '3 weeks',
            difficulty: 'Intermediate',
            skill: 'sql',
            resources: [
              { title: 'PostgreSQL Official Documentation', url: 'https://www.postgresql.org/docs/' },
              { title: 'Prisma ORM Quickstart Guide', url: 'https://www.prisma.io/docs/getting-started' }
            ]
          }
        ]
      },
      {
        id: 'be-phase-3',
        name: 'Phase 3: Authentication, Security & Architecture',
        summary: 'Secure endpoints and optimize throughput for production.',
        items: [
          {
            id: 'be-auth-security',
            title: 'JWT Authentication, Sessions & Security',
            summary: 'Bcrypt password hashing, JWT tokens, OAuth2, CORS, rate limiting, and SQL injection prevention.',
            time: '2 weeks',
            difficulty: 'Intermediate',
            skill: 'problem_solving',
            resources: [
              { title: 'OWASP Top 10 Web Application Security Risks', url: 'https://owasp.org/www-project-top-ten/' }
            ]
          },
          {
            id: 'be-testing-deploy',
            title: 'API Testing & Docker Containerization',
            summary: 'Unit testing with Jest/Supertest, Dockerizing apps, container deployment.',
            time: '2 weeks',
            difficulty: 'Intermediate',
            skill: 'git',
            resources: [
              { title: 'Docker 101 Tutorial', url: 'https://www.docker.com/101-tutorial/' }
            ]
          }
        ]
      }
    ]
  },

  'data-analyst': {
    careerId: 'data-analyst',
    title: 'Data Analyst Learning Roadmap',
    description: 'Transform raw datasets into high-impact business narratives through Python, SQL, and data visualization.',
    estimatedDuration: '10 - 14 Weeks',
    phases: [
      {
        id: 'da-phase-1',
        name: 'Phase 1: SQL Data Extraction & Wrangling',
        summary: 'Query, aggregate, and reshape relational data records with precision.',
        items: [
          {
            id: 'da-sql-joins',
            title: 'Advanced SQL Joins & Window Functions',
            summary: 'GROUP BY, HAVING, subqueries, CTEs, ROW_NUMBER, RANK, and date aggregations.',
            time: '2.5 weeks',
            difficulty: 'Beginner',
            skill: 'sql',
            resources: [
              { title: 'Kaggle: Intro to SQL', url: 'https://www.kaggle.com/learn/intro-to-sql' },
              { title: 'Mode Analytics: Advanced SQL Window Functions', url: 'https://mode.com/sql-tutorial/sql-window-functions/' }
            ]
          }
        ]
      },
      {
        id: 'da-phase-2',
        name: 'Phase 2: Python for Data Analysis',
        summary: 'Clean, slice, and manipulate tabular records programmatically.',
        items: [
          {
            id: 'da-python-pandas',
            title: 'Pandas & NumPy for Exploratory Data Analysis (EDA)',
            summary: 'DataFrames, missing values, grouping, merging, pivot tables, and statistical summaries.',
            time: '3 weeks',
            difficulty: 'Intermediate',
            skill: 'python',
            resources: [
              { title: 'Kaggle: Pandas Tutorial', url: 'https://www.kaggle.com/learn/pandas' },
              { title: 'Python for Data Analysis by Wes McKinney', url: 'https://wesmckinney.com/book/' }
            ]
          },
          {
            id: 'da-viz',
            title: 'Data Visualization & Storytelling',
            summary: 'Creating clear charts with Matplotlib, Seaborn, and crafting dashboards.',
            time: '2 weeks',
            difficulty: 'Beginner',
            skill: 'communication',
            resources: [
              { title: 'Storytelling with Data Guide', url: 'https://www.storytellingwithdata.com/' }
            ]
          }
        ]
      },
      {
        id: 'da-phase-3',
        name: 'Phase 3: Executive Reporting & Business Communication',
        summary: 'Translate numbers into executive stakeholder recommendations.',
        items: [
          {
            id: 'da-stakeholder-comm',
            title: 'Technical Presentation & Business Acumen',
            summary: 'Structuring A/B test summaries, formulating hypotheses, and translating findings into dollar impact.',
            time: '2 weeks',
            difficulty: 'Intermediate',
            skill: 'communication',
            resources: [
              { title: 'Harvard Business Review: Data Visualization Best Practices', url: 'https://hbr.org/topic/subject/data-and-visuals' }
            ]
          }
        ]
      }
    ]
  },

  'ai-engineer': {
    careerId: 'ai-engineer',
    title: 'AI & Machine Learning Engineer Roadmap',
    description: 'Master Python, mathematics for ML, scikit-learn algorithms, deep neural nets, and modern generative AI APIs.',
    estimatedDuration: '16 - 22 Weeks',
    phases: [
      {
        id: 'ai-phase-1',
        name: 'Phase 1: Python & Applied Mathematics',
        summary: 'Calculus, linear algebra, probability, and high-performance Python.',
        items: [
          {
            id: 'ai-python-foundations',
            title: 'Python for Scientific Computing',
            summary: 'Vectorized math with NumPy, linear algebra operations, matrix transformations, and statistics.',
            time: '3 weeks',
            difficulty: 'Beginner',
            skill: 'python',
            resources: [
              { title: 'CS229: Linear Algebra Review', url: 'https://see.stanford.edu/materials/aimlcs229/cs229-linalg.pdf' },
              { title: 'NumPy Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html' }
            ]
          }
        ]
      },
      {
        id: 'ai-phase-2',
        name: 'Phase 2: Machine Learning Algorithms',
        summary: 'Supervised and unsupervised models with Scikit-Learn.',
        items: [
          {
            id: 'ai-scikit-learn',
            title: 'Classical Machine Learning with Scikit-Learn',
            summary: 'Linear/logistic regression, decision trees, random forests, clustering, cross-validation, and metrics (F1, ROC-AUC).',
            time: '4 weeks',
            difficulty: 'Intermediate',
            skill: 'machine_learning',
            resources: [
              { title: 'Scikit-Learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html' },
              { title: 'Coursera: Machine Learning Specialization by Andrew Ng', url: 'https://www.coursera.org/specializations/machine-learning-introduction' }
            ]
          }
        ]
      },
      {
        id: 'ai-phase-3',
        name: 'Phase 3: Deep Learning & Modern Generative AI',
        summary: 'Neural networks, PyTorch fundamentals, and LLM application engineering.',
        items: [
          {
            id: 'ai-deep-learning',
            title: 'Neural Networks with PyTorch',
            summary: 'Tensors, autograd, activation functions, CNNs, and training loops.',
            time: '4 weeks',
            difficulty: 'Advanced',
            skill: 'problem_solving',
            resources: [
              { title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/' }
            ]
          },
          {
            id: 'ai-llm-apps',
            title: 'LLM Prompt Engineering, RAG & Vector Databases',
            summary: 'Embeddings, vector retrieval (ChromaDB/Pinecone), RAG architectures, and API integrations.',
            time: '3 weeks',
            difficulty: 'Intermediate',
            skill: 'problem_solving',
            resources: [
              { title: 'DeepLearning.AI: Prompt Engineering & RAG', url: 'https://www.deeplearning.ai/' }
            ]
          }
        ]
      }
    ]
  },

  'full-stack-developer': {
    careerId: 'full-stack-developer',
    title: 'Full Stack Developer Learning Roadmap',
    description: 'Connect frontend React clients to backend Node.js APIs and relational SQL databases into complete SaaS apps.',
    estimatedDuration: '16 - 20 Weeks',
    phases: [
      {
        id: 'fs-phase-1',
        name: 'Phase 1: Full Web Foundations',
        summary: 'HTML, CSS, JavaScript ES6+, and React UI.',
        items: [
          {
            id: 'fs-ui-stack',
            title: 'Modern Frontend with React & Tailwind',
            summary: 'Components, state, forms, client routing, and responsive dashboard layouts.',
            time: '4 weeks',
            difficulty: 'Intermediate',
            skill: 'react',
            resources: [
              { title: 'Full Stack Open: University of Helsinki', url: 'https://fullstackopen.com/en/' }
            ]
          }
        ]
      },
      {
        id: 'fs-phase-2',
        name: 'Phase 2: Backend APIs & SQL Databases',
        summary: 'Express, REST APIs, SQL schemas, and JWT auth.',
        items: [
          {
            id: 'fs-api-db',
            title: 'Node.js, Express & SQL Persistence',
            summary: 'RESTful architectures, SQL database design, CRUD endpoints, and secure authentication.',
            time: '4 weeks',
            difficulty: 'Intermediate',
            skill: 'sql',
            resources: [
              { title: 'MDN: Express Web Development', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs' }
            ]
          }
        ]
      },
      {
        id: 'fs-phase-3',
        name: 'Phase 3: End-to-End SaaS Deployment',
        summary: 'Production deployment, CI/CD, and full-stack project building.',
        items: [
          {
            id: 'fs-capstone-project',
            title: 'Production SaaS Capstone Project',
            summary: 'Build and deploy a full-stack web application with authentication, payments or analytics, and database hosting.',
            time: '4 weeks',
            difficulty: 'Intermediate',
            skill: 'problem_solving',
            resources: [
              { title: 'Vercel & Render Deployment Guides', url: 'https://docs.render.com/' }
            ]
          }
        ]
      }
    ]
  }
};
