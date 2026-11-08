# Salamanders 🦎

> **Career-Focused Interview Preparation Platform**  
> Master Data Structures & Algorithms, practice with multi-language code execution, unlock tiered AI mentorship, and track placement readiness with verifiable skill metrics.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📑 Table of Contents

- [Introduction](#-introduction)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Code Execution Sandbox & Security](#-code-execution-sandbox--security)
- [Testing Instructions](#-testing-instructions)
- [Contributing](#-contributing)
- [Roadmap & Changelog](#-roadmap--changelog)
- [License](#-license)

---

## 🎯 Introduction

**Salamanders** is a technical interview and placement preparation platform engineered to bridge the gap between problem-solving practice and placement evaluation. Rather than relying on static question banks or simulated environments, Salamanders combines:

1. **Subprocess-isolated code execution** for JavaScript (Node.js) and Python 3.
2. **Progressive tiered AI mentorship** using Google Gemini 2.5 Flash, guiding candidates without immediately spoiling solutions.
3. **Verified skill tracking** featuring circular acceptance rate rings, difficulty breakdowns, and a 52-week activity calendar heatmap.
4. **Targeted interview roadmaps** for companies including Google, Amazon, Meta, Microsoft, and Uber.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
│  - Monaco Code Editor      - WebGL2 Silk Interactive Hero   │
│  - LocalStorage Store      - Supabase Auth Session Provider │
│  - Analytics & Heatmap     - Split-Pane Coding Arena        │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
         HTTPS / API                    HTTPS / RLS
               │                              │
               ▼                              ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│      Next.js API Engine      │ │      Supabase Cloud        │
│  - /api/run   (Sample Tests) │ │  - PostgreSQL Schema       │
│  - /api/submit (Full Suites) │ │  - Profiles & Points       │
│  - /api/ai    (Gemini Flash) │ │  - Submissions & Badges    │
│  - /api/badge (Dynamic SVG)  │ │  - Row-Level Security(RLS) │
└──────────────┬───────────────┘ └────────────────────────────┘
               │
      Subprocess Isolation
               │
               ▼
┌──────────────────────────────┐
│    Code Execution Engine     │
│  - Concurrency Semaphore     │
│  - AST Security Screening    │
│  - Node.js (128MB heap limit)│
│  - Python 3 (-B sandbox)     │
│  - Ephemeral tmp directories │
└──────────────────────────────┘
```

For comprehensive details on lifecycle handling, error boundaries, and state management, see [docs/architecture.md](docs/architecture.md).

---

## ✨ Key Features

### 1. Split-Pane Coding Arena
- Full **Monaco Editor** integration with automatic layout resizing, syntax highlighting, and draft autosaving in local storage.
- **Interactive Testcase Console**: Tabbed navigation across `Case 1`, `Case 2`, `Case 3`, and `Custom Input`.
- **Structured Failure Diffs**: Side-by-side comparison of input, expected output, and actual output on test failures.
- **Keyboard Shortcuts**: `Ctrl+Enter` to run against sample cases; `Ctrl+Shift+Enter` to trigger full evaluation.

### 2. LeetCode-Grade Analytics Cards
- **Problems Solved Widget**: Circular SVG acceptance ring gauge alongside segmented Easy, Medium, and Hard counters.
- **Badges Showcase**: Achievement counts, hexagonal milestone badges, and upcoming milestone indicators.
- **Submissions Calendar Heatmap**: 52-week horizontal matrix with labeled month headers, weekday markers, and 4 discrete activity tiers.

### 3. Tiered Gemini AI Mentor
- **Level 1 (Concept)**: Conceptual nudge highlighting loop invariants and observations.
- **Level 2 (Algorithm)**: Recommended data structures and algorithmic patterns.
- **Level 3 (Pseudocode)**: Step-by-step logic structure without language-specific code.
- **Level 4 (Full Editorial)**: Complete optimal solution gated behind explicit confirmation.
- **Deterministic Offline Fallback**: Generates structured fallback hints if `GEMINI_API_KEY` is not provided.

### 4. Company Tracks & Mock Assessments
- **Company Ladders**: Curated sets for Amazon, Google, Meta, Microsoft, and Uber.
- **45-Minute Timed Mocks**: Timed assessment environment with countdown timer and automated performance reporting.

### 5. Verified Developer Profiles
- Public profiles accessible at `/u/[username]` displaying verified solved problem archives.
- Dynamic SVG badge generator at `/api/badge/[username]` for embedding in GitHub READMEs.
- LinkedIn certification share integration.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [Next.js 14](https://nextjs.org/) (App Router, React 18, Server Components) |
| **Language & Tooling** | [TypeScript 5](https://www.typescriptlang.org/), [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **Code Editor** | [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) |
| **Interactive Canvas** | WebGL2 fluid dynamics shader (`Silk.jsx`) |
| **Database & Auth** | [Supabase](https://supabase.com/) (`@supabase/supabase-js`, `@supabase/ssr`, PostgreSQL) |
| **AI Integration** | [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Gemini 2.5 Flash) |
| **Icons & UI** | [Lucide React](https://lucide.dev/), Hallmark 2.0 Design Tokens |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** >= 18.17.0
- **npm** or **pnpm**
- **Python 3** (installed and available in `PATH` for local Python execution)

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

Fill in your configuration keys in `.env.local`:
```env
# Google Gemini API Key (Optional: App falls back to deterministic hints if empty)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration (Optional: App runs in local demo mode if empty)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Database Schema Setup (Optional)
If using Supabase, execute `supabase/schema.sql` in your Supabase SQL Editor. It configures:
- Tables: `profiles`, `submissions`, `user_badges`.
- Row-Level Security (RLS) policies allowing users read/write permissions for their own records.
- Signup triggers to initialize user profiles automatically.

### 6. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   ├── auth/                 # Authentication page
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
│   ├── AnalyticsCard.tsx     # LeetCode-grade circular gauge & 52-week heatmap
│   ├── AuthModal.tsx         # Unified authentication dialog
│   ├── AuthProvider.tsx      # Auth context & Supabase session sync
│   ├── Navbar.tsx            # Navigation bar with user status pill
│   ├── Silk.jsx              # WebGL fluid silk background shader
│   ├── Silk.css              # Canvas styling for Silk component
│   └── Silk.d.ts             # TypeScript definitions for Silk
├── docs/
│   └── architecture.md       # High-level architecture & system design
├── lib/
│   ├── data/                 # Problems, badges, news, interview data
│   ├── supabase/             # Supabase client & fallback detection
│   ├── judge.ts              # Code execution engine (JS/Py/C++/Java)
│   ├── store.ts              # LocalStorage + Supabase write-through store
│   └── types.ts              # Global TypeScript interfaces
├── supabase/
│   └── schema.sql            # Full PostgreSQL DDL, triggers & RLS policies
├── CHANGELOG.md              # Version release notes
├── CONTRIBUTING.md           # Contribution guidelines & coding standards
├── ROADMAP.md                # Development phases & future milestones
├── SECURITY.md               # Security policy & sandbox threat model
└── package.json
```

---

## 🔌 API Reference

### `POST /api/run`
Executes submitted code against sample test cases or custom input.
- **Request Body**:
  ```json
  {
    "problemSlug": "two-sum",
    "code": "function twoSum(nums, target) { ... }",
    "language": "javascript",
    "customInput": "nums = [2,7,11,15]\ntarget = 9"
  }
  ```
- **Response**:
  ```json
  {
    "verdict": "Accepted",
    "runtimeMs": 32,
    "memoryKb": 15420,
    "passedTests": 3,
    "totalTests": 3,
    "stdout": "[0, 1]"
  }
  ```

### `POST /api/submit`
Executes code against hidden problem test cases and evaluates submission status.
- **Request Body**:
  ```json
  {
    "problemSlug": "coin-change",
    "code": "def coinChange(coins, amount): ...",
    "language": "python"
  }
  ```
- **Response**:
  ```json
  {
    "verdict": "Accepted",
    "runtimeMs": 48,
    "memoryKb": 16210,
    "passedTests": 4,
    "totalTests": 4
  }
  ```

### `POST /api/ai`
Queries the Gemini AI Mentor for progressive hints or complexity analysis.
- **Request Body**:
  ```json
  {
    "problemSlug": "trapping-rain-water",
    "code": "...",
    "language": "python",
    "action": "hint",
    "level": 2
  }
  ```
- **Response**:
  ```json
  {
    "text": "Notice that the water trapped at index i depends on min(max_left, max_right) - height[i]..."
  }
  ```

### `GET /api/badge/[username]`
Returns an dynamic SVG skill badge for display in markdown or portfolios.

---

## 🔒 Code Execution Sandbox & Security

Executing untrusted code requires defense-in-depth:
- **Static AST & Regex Filter**: Blocks dangerous imports (`child_process`, `fs`, `os`, `net`, `http`, `subprocess`, `sys`, `shutil`, `ctypes`, `eval`, `process.exit`).
- **Execution Semaphore**: Throttles parallel runs to a maximum of 3 concurrent processes.
- **Timeout Termination**: Hard 4.0s limit per test case; runaway loops trigger `SIGTERM` and return `Time Limit Exceeded`.
- **Heap Allocation Cap**: Node.js is invoked with `--max-old-space-size=128`.
- **Buffer Clamping**: Stdout/stderr buffers are capped at 256KB to prevent memory exhaustion attacks.

For more details, see [SECURITY.md](SECURITY.md).

---

## 🧪 Testing Instructions

Run the automated judge integrity test across all seeded problems and languages:

```bash
npx tsx test-judge.ts
```

Expected output:
```
=== Salamanders Judge Integrity Test ===
Testing Problem: Two Sum -> Accepted (JS & Py)
Testing Problem: Valid Palindrome -> Accepted (JS & Py)
Testing Problem: Longest Substring -> Accepted (JS & Py)
Testing Problem: Coin Change -> Accepted (JS & Py)
Testing Problem: Trapping Rain Water -> Accepted (JS & Py)
Integrity Summary: 5/5 problems fully verified.
```

To run a production build verification:
```bash
npm run build
```

---

## 🤝 Contributing

We welcome community contributions! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on code style, commit standards, and pull request procedures. All participants are expected to adhere to the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 🗺️ Roadmap & Changelog

- Check our future technical milestones in [ROADMAP.md](ROADMAP.md).
- Review release history in [CHANGELOG.md](CHANGELOG.md).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
