# Salamanders System Architecture

This document describes the high-level system architecture, data flow, security model, and execution lifecycle of the **Salamanders** technical interview platform.

---

## 1. Overview

Salamanders is built as a full-stack Next.js 14 App Router application with client-side reactive state, serverless API routes, and subprocess-isolated multi-language code evaluation.

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

---

## 2. Code Execution Engine (`lib/judge.ts`)

### 2.1 Concurrency & Resource Limits
- **Execution Semaphore**: Concurrency is limited to 3 simultaneous processes using an in-memory queue to prevent denial-of-service from concurrent request bursts.
- **Process Timeouts**: Hard timeout set to 4,000ms (`4.0s`). If an infinite loop occurs, the child process receives `SIGTERM` and immediately returns `Time Limit Exceeded`.
- **Memory Caps**:
  - Node.js processes run with `--max-old-space-size=128 --disallow-code-generation-from-strings`.
  - Stdout and stderr buffers are capped at 256KB; responses truncate at 8KB to avoid memory exhaustion.
- **Ephemeral Sandbox**: Each test run creates an isolated directory in `os.tmpdir()` (`salamanders-XXXXXX`) which is purged in a `finally` block regardless of execution outcome.

### 2.2 Security Screening
Before any subprocess is spawned, user code passes through static regex screening:
- **JavaScript**: Prohibits `require('child_process')`, `fs`, `net`, `http`, `process.exit()`, `eval()`, and `Function()`.
- **Python**: Prohibits `import os`, `subprocess`, `sys`, `socket`, `shutil`, `ctypes`, and `__import__()`.

---

## 3. Data & State Synchronization (`lib/store.ts` & `lib/supabase/client.ts`)

Salamanders utilizes an offline-first **Dual-Write State Architecture**:
1. **Immediate Local Persistence**: All submissions, solved slugs, streak updates, and points write instantly to `localStorage`.
2. **Asynchronous Cloud Sync**: When connected to Supabase (`NEXT_PUBLIC_SUPABASE_URL` is set), changes write through to the PostgreSQL `submissions` and `profiles` tables.
3. **Graceful Fallback**: If network or credentials are absent, the application functions in offline/demo mode without errors or degraded UI.

---

## 4. AI Mentorship Pipeline (`app/api/ai/route.ts`)

- **Model**: Google Gemini 2.5 Flash (`@google/generative-ai`).
- **Prompt Engineering**: System instructions enforce an educational Socratic persona. The mentor does not give away complete code on initial hints.
- **Tiered Hint Ladder**:
  - **Level 1 (Concept)**: Conceptual nudge and invariant observation.
  - **Level 2 (Algorithm)**: Data structure choice and standard algorithmic pattern.
  - **Level 3 (Pseudocode)**: Step-by-step logic breakdown without language-specific solutions.
  - **Level 4 (Full Editorial)**: Complete optimal implementation (requires explicit confirmation).
- **Deterministic Offline Fallback**: If `GEMINI_API_KEY` is not configured, the endpoint returns pre-authored problem hints and editorial approaches.

