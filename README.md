# SkillBridge AI – Smart Career & Skill Recommendation Platform

> **Build Your Skills. Shape Your Future.**  
> A complete, modern, responsive career navigation platform designed for college students and aspiring tech professionals with full-stack authentication and database persistence.

---

## 🚀 Key Features

1. **Full-Stack Authentication & Real Database**:
   - **Real SQLite Database** with ACID compliance and automatic migration runner.
   - **Secure Password Hashing** via `bcryptjs` (10 rounds standard salt). Plaintext passwords are never stored.
   - **Duplicate Email Prevention**: Checks at both application controller and unique database index levels.
   - **HTTP-Only Cookies & Sessions**: High-security session management (`SameSite=Lax`, `HttpOnly`).
   - **Protected Routes**: Unauthenticated users trying to access Dashboard or Assessment are redirected to Login.
   - **Session Persistence**: User sessions remain active across page reloads via `/api/auth/me`.
   - **Clean Logout**: Server-side cookie clearance and client state invalidation.

2. **Dedicated Authentication Pages**:
   - **Register Page (`/register`)**: Full Name, Email, Password, Confirm Password, real-time match validation, and link to Login.
   - **Login Page (`/login`)**: Email, Password, visibility toggles, Forgot Password modal, and link to Register.

3. **Student Dashboard (`Dashboard`)**:
   - **Job Readiness Score**: Real-time composite metric combining career affinity, skill diversity, and completed roadmap checkpoints.
   - **Target Career Affinity**: Breakdown of matched vs. required core competencies.
   - **Skill Gap Analysis**: Side-by-side view showing **Skills You Have** vs. **Skills You Need to Learn** (Core vs. Bonus).
   - **Active Skill Portfolio**: Visual tags with proficiency ratings.
   - **AI Career Advisor**: Synthesized AI insights and 30-day recommended action steps.
   - **Editable Student Profile**: Synchronized with real authenticated user account details.

4. **Technical Skill Assessment (`Skill Assessment`)**:
   - Evaluate proficiency across:
     - **Languages**: Java, Python, JavaScript
     - **Web & Frontend**: HTML, CSS, React
     - **Backend & Data**: SQL, Node.js
     - **Professional & Soft Skills**: Problem-Solving, Communication
     - **Modern Tools & AI**: Git & GitHub, Machine Learning basics
   - Select proficiency levels: *Beginner*, *Intermediate*, *Advanced*.
   - Quick presets: *Frontend Starter*, *Backend & Enterprise*, *Data & AI Explorer*, *CS Core Student*.
   - **Live Sticky Role Matching Preview**: Real-time affinity calculation as you toggle skills.

5. **Career Recommendations & Exploration (`Explore Careers`)**:
   - Scored recommendations for:
     - **Java Developer**
     - **Frontend Developer**
     - **Backend Developer**
     - **Data Analyst**
     - **AI & Machine Learning Engineer**
     - **Full Stack Developer**
   - **Search & Filters**: Search by keyword/technology, filter by domain (Web, Backend, Data, AI), and filter by match affinity (&ge;70%, &ge;40%).
   - Detailed modal for in-depth career gap analysis, average compensation, and hiring companies.

6. **Curated Learning Roadmaps (`Learning Roadmap`)**:
   - Phase-by-phase curriculum (*Foundations*, *Core Engineering*, *Advanced*, *Capstone*).
   - Interactive progress checkboxes persisted automatically.
   - Direct external links to verified free tutorials: **MDN Web Docs**, **freeCodeCamp**, **Spring.io**, **Mode Analytics**, **Kaggle**, **PyTorch docs**, **CS50**, etc.

---

## 🗄️ Database Schema

The database uses SQLite located at `server/db/data/skillbridge.db` configured via `DATABASE_PATH` in `.env`.

### `users` Table
```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

### `_migrations` Table
Tracks executed schema migration files automatically so repeated migrations are never duplicated.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/health` | Service and database health check | Public |
| `POST` | `/api/auth/register` | Register new user, hash password, issue cookie | Public |
| `POST` | `/api/auth/login` | Verify credentials, issue HTTP-only cookie | Public |
| `POST` | `/api/auth/logout` | Clear HTTP-only session cookie | Public |
| `GET` | `/api/auth/me` | Fetch currently authenticated user | Protected |

---

## ⚙️ Environment Variables

### Backend Configuration (`server/.env`):
```env
PORT=5000
CLIENT_URL=http://localhost:5173
DATABASE_PATH=./db/data/skillbridge.db
JWT_SECRET=skillbridge_super_secure_jwt_secret_key_2026_dev
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

## 💻 Running the Platform Locally

### 1. Install Dependencies

In the root directory (frontend):
```powershell
npm install
```

In the server directory (backend):
```powershell
cd server
npm install
cd ..
```

### 2. Initialize / Migrate the Database

To run migrations manually:
```powershell
npm run migrate
```
*(Note: Migrations also run automatically whenever the server starts up).*

### 3. Start Both Frontend and Backend

You can run both concurrently in one command:
```powershell
npm run dev:all
```

Or run them in separate terminals:

**Terminal 1 (Backend Server on port 5000):**
```powershell
npm run server
```

**Terminal 2 (Frontend Client on port 5173):**
```powershell
npm run dev
```

Open your browser at:
👉 **`http://localhost:5173/`**

---

## 🧪 Testing the Complete Authentication Flow

1. Open **`http://localhost:5173/`**
2. Click **Register** in the top navigation bar.
3. Fill in Full Name, Email, Password, and Confirm Password &rarr; Click **Create Account**.
4. The user is saved to the SQLite database with a salted bcrypt hash, session cookie is issued, and you are redirected to the **Student Dashboard**.
5. Press **F5 (Refresh)** &rarr; Notice you remain seamlessly authenticated via `/api/auth/me`.
6. Click the **Logout** icon in the navbar &rarr; The session cookie is invalidated and you are redirected to the **Login** page.
7. Attempt to navigate directly to `/dashboard` &rarr; Route protection redirects you to the Login page with an informative message.
8. Sign in with your registered credentials &rarr; Dashboard unlocks immediately.
