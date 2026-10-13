# SkillBridge AI – Smart Career & Skill Recommendation Platform

> **Build Your Skills. Shape Your Future.**  
> A complete, modern, responsive career navigation platform designed for college students and aspiring tech professionals.

---

## 🚀 Key Features

1. **Dynamic Landing Page (`Home`)**:
   - Hero section featuring the headline **“Build Your Skills. Shape Your Future.”**
   - Direct CTA buttons (**Get Started**, **Explore Careers**).
   - High-affinity career snapshots and 4 core SaaS feature cards.
   - 3-step practical walkthrough (*Assess* &rarr; *Match* &rarr; *Bridge the Gap*).

2. **Student Dashboard (`Dashboard`)**:
   - **Job Readiness Score**: Real-time composite metric combining career affinity, skill diversity, and completed roadmap checkpoints.
   - **Target Career Affinity**: Breakdown of matched vs. required core competencies.
   - **Skill Gap Analysis**: Side-by-side view showing **Skills You Have** vs. **Skills You Need to Learn** (Core vs. Bonus).
   - **Active Skill Portfolio**: Visual tags with proficiency ratings.
   - **AI Career Advisor**: Synthesized AI insights and 30-day recommended action steps.
   - **Editable Student Profile**: Customize name, university/college, and graduation year.

3. **Technical Skill Assessment (`Skill Assessment`)**:
   - Evaluate proficiency across:
     - **Languages**: Java, Python, JavaScript
     - **Web & Frontend**: HTML, CSS, React
     - **Backend & Data**: SQL, Node.js
     - **Professional & Soft Skills**: Problem-Solving, Communication
     - **Modern Tools & AI**: Git & GitHub, Machine Learning basics
   - Select proficiency levels: *Beginner*, *Intermediate*, *Advanced*.
   - Quick presets: *Frontend Starter*, *Backend & Enterprise*, *Data & AI Explorer*, *CS Core Student*.
   - **Live Sticky Role Matching Preview**: Real-time affinity calculation as you toggle skills.

4. **Career Recommendations & Exploration (`Explore Careers`)**:
   - Scored recommendations for:
     - **Java Developer**
     - **Frontend Developer**
     - **Backend Developer**
     - **Data Analyst**
     - **AI & Machine Learning Engineer**
     - **Full Stack Developer**
   - **Search & Filters**: Search by keyword/technology, filter by domain (Web, Backend, Data, AI), and filter by match affinity (&ge;70%, &ge;40%).
   - Detailed modal for in-depth career gap analysis, average compensation, and hiring companies.

5. **Curated Learning Roadmaps (`Learning Roadmap`)**:
   - Phase-by-phase curriculum (*Foundations*, *Core Engineering*, *Advanced*, *Capstone*).
   - Interactive progress checkboxes persisted automatically in `LocalStorage`.
   - Direct external links to verified free tutorials: **MDN Web Docs**, **freeCodeCamp**, **Spring.io**, **Mode Analytics**, **Kaggle**, **PyTorch docs**, **CS50**, etc.

6. **Local Persistence & AI Integration Ready**:
   - All state (selected skills, target career, completed milestones, profile details) persists locally in the browser via `LocalStorage`.
   - Modular `aiService.js` and `recommendationEngine.js` ready for plug-and-play LLM API keys (Gemini / OpenAI).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (with dark navy `#080B14` & vibrant purple gradient accents)
- **Icons**: Lucide React
- **Storage**: Browser `LocalStorage`
- **Typography**: Plus Jakarta Sans & JetBrains Mono

---

## 💻 Running the Platform Locally

### 1. Navigate to the project directory:
```powershell
cd c:\Users\bhagy\OneDrive\文件\PROJECTS\skillbridge-ai
```

### 2. Start the development server:
```powershell
npm run dev
```

The website will be available at:
👉 **`http://localhost:5173/`**

### 3. Build for production:
```powershell
npm run build
```
Production output will be generated inside the `dist/` folder.
