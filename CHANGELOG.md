# Changelog

All notable changes to the Salamanders project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2026-11-08

### Added
- Reusable `AnalyticsCard` component delivering LeetCode-grade metrics:
  - Circular SVG acceptance gauge with multi-color segmented progress.
  - Granular difficulty breakdown for Easy, Medium, and Hard problem categories.
  - 52-week horizontal calendar heatmap with month labels, week columns, and 4 green intensity levels.
  - Milestone badge showcase and upcoming achievement progress tracker.
- Sandboxing & Judge Security Layer:
  - Static AST and regex pre-execution screening for JavaScript and Python code submissions.
  - Node process heap memory limitation (`--max-old-space-size=128`).
  - In-memory execution semaphore limiting concurrent runs to 3 simultaneous processes.
  - Automatic stdout/stderr buffer clamping to 256KB to prevent memory exhaustion.
- Split-pane Arena testcase console upgrade:
  - Multi-case tabs (`Case 1`, `Case 2`, `Case 3`, `Custom`).
  - Formatted input and expected output displays.
  - Structured failure diff cards with side-by-side output comparison.
- Full open-source documentation suite:
  - `docs/architecture.md` (System architecture and execution lifecycle).
  - `CONTRIBUTING.md` (Contribution guidelines and testing instructions).
  - `SECURITY.md` (Security policy, threat model, and vulnerability reporting).
  - `ROADMAP.md` (Product milestones and future technical initiatives).
  - `CODE_OF_CONDUCT.md` (Contributor Covenant).

### Changed
- Refactored `app/dashboard/page.tsx` to adopt the new analytics cards and clean visual hierarchy.
- Refactored `app/u/[username]/page.tsx` to display verified analytics without simulated metrics.
- Upgraded `README.md` to comprehensively detail architecture, features, API specifications, and testing workflows.

---

## [0.1.0] - 2026-11-07

### Added
- Initial release of Salamanders platform.
- Next.js 14 App Router scaffold with Tailwind CSS and TypeScript.
- WebGL2 interactive fluid Silk hero shader canvas.
- 5 core DSA placement problems with automated test suites.
- Google Gemini 2.5 Flash tiered AI mentor with 4-level progressive assistance.
- Supabase Auth and PostgreSQL schema with Row-Level Security (RLS).
- 45-minute timed mock interview assessment engine.
- Dynamic SVG badge generation API at `/api/badge/[username]`.

