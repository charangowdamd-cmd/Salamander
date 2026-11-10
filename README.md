# Salamanders

A career-focused coding practice and technical interview preparation platform. Practice Data Structures and Algorithms with real code execution, tiered AI mentorship, company-specific preparation tracks, and progress analytics.

Live Demo: https://salamander-beige.vercel.app/

GitHub Repository: https://github.com/charangowdamd-cmd/Salamander

---

## Overview

Salamanders is built to prepare software engineers for technical interviews and placement assessments. It combines an in-browser coding arena with isolated code evaluation, progressive Socratic AI hints, company interview tracks, and verified skill tracking.

### Key Capabilities

- Split-Pane Coding Arena: Monaco Editor with syntax highlighting, draft autosave in local storage, and custom input testing.
- Dual-Language Judge Engine: Subprocess-isolated code execution for JavaScript (Node.js) and Python 3.
- Tiered AI Mentor: Multi-level hints powered by Google Gemini 2.5 Flash (conceptual nudges, algorithmic patterns, step-by-step logic, and full editorial).
- Company Interview Tracks: Curated interview question sets for Google, Amazon, Meta, Microsoft, and Uber.
- Analytics and Progress Tracking: Visual problem breakdown by difficulty, acceptance rate gauge, and an activity heatmap.
- Developer Profiles: Public profiles at `/u/[username]` displaying solved problems and verified achievements.

---

## Live Deployment

- Production URL: https://salamander-beige.vercel.app/
- Hosting: Vercel (Serverless Next.js App Router)
- Database and Auth: Supabase (PostgreSQL with Row-Level Security)

---

## Tech Stack

- Frontend: Next.js 14 (App Router, React 18, Server Components)
- Styling: Tailwind CSS, custom design tokens, responsive layout
- Code Editor: Monaco Editor (@monaco-editor/react)
- Interactive Graphics: WebGL2 fluid shader background (Silk)
- Icons: Lucide React
- Backend: Next.js Route Handlers (Node.js runtime)
- Database & Authentication: Supabase (PostgreSQL, Supabase Auth)
- AI Model: Google Gemini 2.5 Flash via @google/generative-ai
- Code Execution: Child-process execution with AST security screening and timeout protection

---

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or pnpm
- Python 3 installed (for running Python test cases locally)

### 1. Clone the repository

```bash
git clone https://github.com/charangowdamd-cmd/Salamander.git
cd Salamander
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Configure your credentials:

```env
# Supabase Configuration (Optional: runs in local demo mode if omitted)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Google Gemini API Key (Optional: deterministic fallback hints provided if omitted)
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## Project Structure

```
Salamander/
├── app/
│   ├── admin/                # Problem verification console
│   ├── api/
│   │   ├── ai/               # Gemini AI mentor endpoint
│   │   ├── badge/[username]/ # Dynamic SVG badge generator
│   │   ├── run/              # Sample test runner API
│   │   └── submit/           # Full submission judging API
│   ├── auth/                 # Sign-in and sign-up page
│   ├── dashboard/            # Progress metrics and activity heatmap
│   ├── interview-prep/       # Company interview tracks
│   │   └── mock/             # 45-minute timed mock interview
│   ├── leaderboard/          # Community rankings and badges
│   ├── news/                 # Technology and AI industry updates
│   ├── problems/             # Problem catalog
│   │   └── [slug]/           # Coding workspace with Monaco editor
│   ├── u/[username]/         # Public developer profile
│   ├── globals.css           # Theme tokens and global styles
│   ├── layout.tsx            # Root layout and authentication providers
│   └── page.tsx              # Homepage
├── components/
│   ├── AnalyticsCard.tsx     # Acceptance ring gauge and submission heatmap
│   ├── AuthModal.tsx         # Authentication dialog
│   ├── AuthProvider.tsx      # Supabase session provider
│   ├── Navbar.tsx            # Navigation bar
│   └── Silk.jsx              # WebGL hero canvas
├── lib/
│   ├── data/                 # Problems question bank, news, and tracks
│   ├── supabase/             # Supabase client and connection helpers
│   ├── judge.ts              # Code evaluation engine and security filter
│   ├── store.ts              # State management with LocalStorage sync
│   └── types.ts              # TypeScript definitions
├── supabase/
│   └── schema.sql            # PostgreSQL schema, RLS policies, and triggers
├── test-judge.ts             # Judge engine test suite
└── package.json
```

---

## API Endpoints

### Run Code Against Sample Tests
- Method: `POST`
- Path: `/api/run`
- Body:
  ```json
  {
    "problemSlug": "two-sum",
    "code": "def twoSum(nums, target): ...",
    "language": "python",
    "customInput": "nums = [2,7,11,15]\ntarget = 9"
  }
  ```

### Submit Code for Full Evaluation
- Method: `POST`
- Path: `/api/submit`
- Body:
  ```json
  {
    "problemSlug": "two-sum",
    "code": "def twoSum(nums, target): ...",
    "language": "python"
  }
  ```

### Request AI Mentor Hints
- Method: `POST`
- Path: `/api/ai`
- Body:
  ```json
  {
    "problemSlug": "two-sum",
    "code": "...",
    "language": "python",
    "action": "hint",
    "level": 1
  }
  ```

### Public Skill Badge
- Method: `GET`
- Path: `/api/badge/[username]`
- Response: Dynamic SVG image displaying solved count and points.

---

## Security Model

The code execution engine applies multiple safeguards for untrusted code execution:

- Pattern Screening: Blocks forbidden imports and system APIs (`child_process`, `fs`, `os`, `net`, `http`, `subprocess`, `ctypes`, `eval`, `process.exit`).
- Concurrency Semaphore: Limits simultaneous executions to avoid host exhaustion.
- Execution Timeout: Caps execution at 4.0 seconds per test case to stop infinite loops.
- Memory Cap: Node.js memory is clamped via `--max-old-space-size=128`.
- Output Clamping: stdout and stderr output buffers are restricted to prevent memory attacks.

---

## Testing

Run the automated judge test suite:

```bash
npx tsx test-judge.ts
```

Verify production build output:

```bash
npm run build
```

---

## Deployment to Vercel

1. Push your changes to GitHub.
2. In Vercel, import the repository `charangowdamd-cmd/Salamander`.
3. Add the required environment variables under Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional)
   - `GEMINI_API_KEY` (optional)
4. Deploy. Vercel automatically runs `npm run build` and serves the application.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
