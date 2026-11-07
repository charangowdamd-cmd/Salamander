# Salamanders 🦎

> **Next-Generation Placement & Interview Preparation Platform**  
> Master Data Structures & Algorithms, practice with multi-language code execution, unlock tiered AI mentorship, and track your readiness for top-tier software engineering roles.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)

---

## ✨ Features

- **Fluid WebGL Background**: Interactive Silk WebGL2 shader animation with responsive cursor rippling and dynamic lighting.
- **Split-Pane Code Arena**: Full Monaco Editor integration with syntax highlighting, custom test case console, auto-save drafts, and keyboard shortcuts (`Ctrl+Enter` to run, `Ctrl+Shift+Enter` to submit).
- **Multi-Language Deterministic Judge**: Subprocess-isolated test runner executing JavaScript (Node.js) and Python 3 with sub-millisecond evaluation, memory measurement, and error parsing.
- **Gemini-Powered AI Mentor**: Built with Google Gemini 2.5 Flash. Delivers 3-tier progressive hints (Concept → Algorithmic strategy → Pseudocode), time/space complexity analysis, and edge-case guidance.
- **Supabase Authentication & Cloud Sync**: Seamless email/password authentication, demo mode for instant evaluation, session restoration, and cross-device progress synchronization with Row-Level Security (RLS).
- **Gamified Placement Progress**:
  - **Dynamic Streak & Badges**: Earn achievements like *First Blood*, *Streak Master*, *DP Sorcerer*, and *Interview Ready*.
  - **Live Leaderboard**: Real-time rank sorting by points and solved counts.
  - **Heatmap Analytics**: Activity tracking, submission history, and topic breakdown.
- **Company Tracks & Curated Roadmaps**: Targeted prep modules for Google, Amazon, Meta, Microsoft, and Uber, plus structured syllabi for DSA, System Design, Frontend, and Backend.
- **45-Minute Timed Mock Interviews**: Realistic interview simulations with randomized problem sets and automated score reports.
- **Verified Developer Profiles & Embeds**: Public profiles at `/u/[username]` with dynamic SVG badge generation (`/api/badge/[username]`) for GitHub README integration.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Hallmark design tokens
- **Code Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
- **Shaders / Canvas**: Custom WebGL2 fluid dynamics shader (`Silk.jsx`)
- **Backend & Auth**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`, `@supabase/ssr`)
- **AI Integration**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Gemini 2.5 Flash)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** >= 18.17.0
- **npm** or **pnpm**
- **Python 3** (optional, for local Python judge execution)

### 2. Clone the Repository

```bash
git clone https://github.com/charangowdamd-cmd/Salamander.git
cd Salamander
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

Fill in your API keys in `.env.local`:

```env
# Google Gemini API Key (for AI Mentorship)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration (Optional for demo mode, required for cloud persistence)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

> **Note:** Salamanders includes a graceful offline demo mode. If Supabase or Gemini keys are omitted, the app automatically runs in local offline storage mode with deterministic fallback hints.

### 5. Setup Supabase Database (Optional)

If using Supabase cloud database, open your Supabase project's SQL Editor and execute:

```bash
# Run the complete schema script:
supabase/schema.sql
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📁 Project Structure

```
Salamander/
├── app/
│   ├── api/
│   │   ├── ai/               # Gemini AI mentor endpoint
│   │   ├── badge/[username]/ # Dynamic SVG badge generator
│   │   ├── run/              # Sample test runner API
│   │   └── submit/           # Full submission judging API
│   ├── admin/                # Problem verification console
│   ├── auth/                 # Standalone authentication page
│   ├── dashboard/            # Progress analytics & activity heatmap
│   ├── interview-prep/       # Company interview tracks & roadmaps
│   │   └── mock/             # 45-min timed mock assessment
│   ├── leaderboard/          # Global rankings & badge showcase
│   ├── news/                 # AI & Tech industry news hub
│   ├── problems/             # Problem catalog & split-pane arena
│   │   └── [slug]/           # Dynamic problem editor route
│   ├── u/[username]/         # Public verified developer profile
│   ├── globals.css           # Hallmark design system tokens
│   ├── layout.tsx            # Root layout with Auth & providers
│   └── page.tsx              # Homepage with Silk WebGL hero
├── components/
│   ├── AuthModal.tsx         # Unified authentication dialog
│   ├── AuthProvider.tsx      # Auth context & Supabase session sync
│   ├── Navbar.tsx            # Responsive navigation with user pill
│   ├── Silk.jsx              # WebGL fluid silk background shader
│   ├── Silk.css              # Canvas styling for Silk component
│   └── Silk.d.ts             # TypeScript definitions for Silk
├── lib/
│   ├── data/                 # Problems, badges, news, interview data
│   ├── supabase/             # Supabase client & fallback detection
│   ├── judge.ts              # Code execution engine (JS/Py/C++/Java)
│   ├── store.ts              # LocalStorage + Supabase write-through store
│   └── types.ts              # Global TypeScript interfaces
├── supabase/
│   └── schema.sql            # Full PostgreSQL DDL, triggers & RLS policies
└── package.json
```

---

## 🧪 Testing the Code Execution Engine

Salamanders features a built-in test suite to verify problem solutions against both JavaScript and Python judges:

```bash
npx tsx test-judge.ts
```

Output:
```
=== Salamanders Judge Integrity Test ===
Testing Problem: Two Sum -> Accepted (JS & Py)
Testing Problem: Valid Palindrome -> Accepted (JS & Py)
Testing Problem: Longest Substring -> Accepted (JS & Py)
Testing Problem: Coin Change -> Accepted (JS & Py)
Testing Problem: Trapping Rain Water -> Accepted (JS & Py)
Integrity Summary: 5/5 problems fully verified.
```

---

## 🛡️ Production Build

To build the project for production:

```bash
npm run build
npm run start
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
