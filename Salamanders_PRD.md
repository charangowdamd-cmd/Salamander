# Salamanders — Coding Practice Platform
## Product Requirements Document (PRD)

| Field | Value |
|---|---|
| Document version | 1.0 (Draft for review) |
| Status | Ready for design and engineering kickoff |
| Audience | Product, UI/UX, Frontend, Backend, AI/ML, DevOps, QA |
| Scope | Product requirements, architecture recommendations, implementation planning (no code) |

---

## Table of Contents

1. Executive Summary
2. Product Vision and Mission
3. Problem Statement
4. Goals and Objectives
5. Target Audience and User Personas
6. User Pain Points
7. Proposed Solution
8. Functional Requirements by Module
9. Non-Functional Requirements
10. User Roles and Permissions
11. Detailed User Workflows
12. User Stories with Acceptance Criteria
13. UI/UX Requirements and Design Guidelines
14. Database Design and Key Entities
15. Recommended Technology Stack
16. System Architecture
17. AI Integration and Implementation Strategy
18. Security and Authentication Requirements
19. Third-Party Integrations and APIs
20. MVP Scope and Future Enhancements
21. Development Roadmap
22. Risks, Challenges, and Dependencies
23. Success Metrics and KPIs
24. Appendix: Module Dependency Map, Open Questions, Glossary

---

## 1. Executive Summary

**Salamanders** is a coding practice and developer-growth platform that combines six capabilities that today live in separate products: a coding arena, gamification, a personalized AI mentor, a shareable developer profile, a curated AI/tech news feed, and structured interview preparation.

The platform is built around three differentiators:

1. **Proof of Skills.** Every solved problem, badge, rating, and streak is verifiable and exposed through a public developer profile that can be placed on a resume or LinkedIn.
2. **Personalized AI.** An AI assistant that knows the user's submission history, weak topics, and goals, and uses that knowledge to give hints, explain code, and recommend the next problem.
3. **Career-Focused Learning.** Practice is organized around outcomes (placement and interview readiness), with company-wise question sets, mock assessments, and a measurable readiness score.

**Primary users:** college students preparing for campus placements, and working or aspiring software engineers preparing for interviews.

**MVP goal:** Deliver a reliable core loop (*pick problem → write code → run against tests → get verdict → get AI help → see progress*) plus a shareable profile and basic interview prep, within roughly 4 to 5 months, then layer on contests, advanced AI personalization, and news in later phases.

---

## 2. Product Vision and Mission

**Vision.** Become the place where developers prove what they can do, not just what they claim, and where every practice session moves them measurably closer to their career goal.

**Mission.** Make high-quality coding practice, personalized guidance, and interview preparation accessible and motivating for every learner, and turn practice effort into portable, verifiable evidence of skill.

**Product principles**

| Principle | What it means in practice |
|---|---|
| Practice first | The path from landing page to running code must be under 60 seconds. |
| Trustworthy results | Judging is deterministic, fair, and explainable. Scores cannot be gamed. |
| AI that teaches, not solves | The assistant guides learning by default and never short-circuits the learning loop without explicit user intent. |
| Visible progress | Every action produces feedback: points, streaks, readiness, skill growth. |
| Portable proof | Anything earned can be shared, linked, and verified outside the platform. |
| Simple before clever | Prefer a modular monolith and managed services until scale demands otherwise. |

---

## 3. Problem Statement

Developers preparing for technical roles currently juggle several disconnected tools:

- One site for problems, another for interview questions, another for news, another for tracking progress, and generic chatbots for help.
- Practice data is locked inside each product and cannot be presented credibly to recruiters.
- Generic AI tools either give the full answer (undermining learning) or lack context about the learner's history, so advice is not personalized.
- Students preparing for placements lack a structured, measurable path: they do not know what to practice, in what order, or whether they are "ready."
- Motivation decays without streaks, milestones, and community comparison, and most learners quit within weeks.

**Salamanders solves this by unifying practice, guidance, motivation, and proof in a single career-oriented platform.**

---

## 4. Goals and Objectives

### 4.1 Business and product goals

| # | Goal | Objective (measurable) |
|---|---|---|
| G1 | Establish a reliable practice core | 99.5% judge availability; median verdict time under 4 seconds for standard problems |
| G2 | Build habit and retention | 30-day retention of 25%+ for activated users; 35%+ of weekly actives maintain a 3+ day streak |
| G3 | Deliver personalized learning | 50%+ of active users interact with AI hints or recommendations weekly; 40%+ of recommended problems are attempted |
| G4 | Make skills portable | 30%+ of users publish a public profile; 15%+ share it externally within 90 days |
| G5 | Drive career outcomes | 60%+ of interview-prep users complete at least one mock assessment; readiness score correlates with self-reported interview success |
| G6 | Keep platform sustainable | AI cost per active user under a defined monthly cap; infrastructure cost scaling sub-linearly with users |

### 4.2 Non-goals (v1)

- Not a full course or video-lecture platform (LMS).
- Not a job board or recruiter marketplace (considered a future enhancement).
- Not a collaborative IDE or cloud development environment.
- Not a general social network (no feeds of user posts, no direct messaging in v1).

---

## 5. Target Audience and User Personas

### 5.1 Segments

| Segment | Description | Primary need |
|---|---|---|
| College students (placement prep) | Final and pre-final year students, often in India and similar markets, targeting service and product companies | Structured DSA roadmap, company-specific questions, mock tests, proof for resumes |
| Early-career developers (0-3 yrs) | Switching jobs or targeting higher-paying roles | Efficient interview refresh, weak-area targeting |
| Experienced engineers | Occasional interview prep | Time-boxed, targeted practice and system-level refreshers (future) |
| Learners and hobbyists | Improving problem-solving and staying current | Streaks, contests, AI/tech news |

### 5.2 Personas

**Persona 1: Aarav, the Placement Aspirant (primary)**
- 21, final-year CS student, tier-2 college, placements in 5 months.
- Knows basics of one language, inconsistent practice, anxious about aptitude of "which company asks what."
- Goals: solve 300+ problems across core topics, know which companies ask which patterns, build a profile to attach to applications.
- Frustrations: gets stuck without anyone to ask; does not know if he is improving; copies solutions and forgets them.
- Success looks like: a visible readiness score rising weekly and a profile link on his resume.

**Persona 2: Meera, the Career Switcher**
- 27, 3 years in services, targeting product companies.
- Limited time (1 hour/day), rusty on DP and graphs.
- Goals: close specific gaps fast, practice under timed conditions.
- Frustrations: generic problem lists, no guidance on weak areas.
- Success looks like: AI-curated daily plan and mock assessments mirroring target companies.

**Persona 3: Rohan, the Competitive Learner**
- 24, enjoys contests, rankings, and badges.
- Goals: climb leaderboards, maintain streaks, join weekly contests.
- Success looks like: rising rank and a profile that shows achievements.

**Persona 4: Priya, the Platform Administrator (internal)**
- Content and operations lead.
- Goals: add and validate problems, manage badges, moderate users, monitor health and engagement, curate news.
- Frustrations: broken test cases, no analytics, manual content workflows.

---

## 6. User Pain Points

| Pain point | Who feels it | How Salamanders addresses it |
|---|---|---|
| "I don't know what to practice next." | All learners | Personalized recommendations and topic roadmaps |
| "I'm stuck and nobody can help." | Students | Tiered AI hints, code explanation, debugging help |
| "I can't tell if I'm improving." | All | Dashboard with skill tracking, difficulty progress, readiness score |
| "Recruiters can't verify my practice." | Students, switchers | Public verified developer profile with shareable link |
| "Practice is boring and I lose momentum." | All | Streaks, daily challenge, badges, leaderboards, contests |
| "I don't know what specific companies ask." | Placement aspirants | Company-wise question sets with frequency and recency |
| "Generic AI gives me answers and I learn nothing." | All | Hint ladder: nudge, then approach, then pseudo-code, then full solution (gated) |
| "I'm out of touch with AI and tech trends." | Developers | Curated AI and technology news hub |
| "Mock interviews are unrealistic or unavailable." | Students | Timed mock assessments with proctoring-lite rules and detailed reports |

---

## 7. Proposed Solution

Salamanders is a web-first platform (responsive, PWA-capable) with eight primary sections:

| Section | Purpose |
|---|---|
| **Home** | Personalized landing: continue where you left off, daily challenge, streak, recommended problems, news highlights |
| **Problems** | Browse, filter, and solve problems in the Coding Arena |
| **Contests** | Scheduled and virtual contests with live leaderboards |
| **AI Hub** | AI assistant, personalized learning paths, and AI/tech news |
| **Interview Preparation** | Company-wise sets, topic roadmaps, mock assessments, readiness tracking |
| **Individual Dashboard** | Private analytics, progress, and goals |
| **Developer Profile** | Public, shareable, verified proof of skills |
| **Admin Dashboard** | Content, users, badges, analytics, news, and AI operations |

**Core loop**

```
Discover problem -> Write code -> Run samples -> Submit -> Judge verdict
      ^                                                         |
      |                                                         v
 Recommendations <- Skill model update <- Points/streak/badges <- AI help (hints/explain/debug)
```

**Architecture stance:** a modular monolith (single deployable backend with strict module boundaries) plus two isolated, independently scalable components: the **code execution sandbox** and the **AI service layer**. This avoids microservice overhead while protecting the two riskiest components.

---

## 8. Functional Requirements by Module

**Priority legend:** **P0** = MVP must-have, **P1** = MVP-stretch / fast-follow, **P2** = post-MVP.

### 8.A Coding Arena

| ID | Requirement | Priority |
|---|---|---|
| CA-1 | Problem catalog with fields: title, slug, difficulty (Easy/Medium/Hard), topics/tags, statement (Markdown with math/code), constraints, examples, acceptance rate, companies, status per user (unsolved/attempted/solved) | P0 |
| CA-2 | Filtering and search: by difficulty, topic, company, status, and keyword; sorting by acceptance rate, difficulty, recency; pagination | P0 |
| CA-3 | Multi-language support at launch: **Python, Java, C++, JavaScript**; extensible language registry (C, Go, Kotlin as P1) | P0 |
| CA-4 | Integrated code editor (Monaco-based): syntax highlighting, language switcher, auto-indent, bracket matching, font/theme settings, per-problem draft autosave, starter code templates per language | P0 |
| CA-5 | **Run** against sample cases (and optional custom input) with stdout, stderr, runtime, and memory shown | P0 |
| CA-6 | **Submit** against full hidden test suite with verdicts: Accepted, Wrong Answer, Time Limit Exceeded, Memory Limit Exceeded, Runtime Error, Compilation Error, Internal Error | P0 |
| CA-7 | Test case model: visible samples plus hidden cases, grouped by weight; support for custom checkers (floating point, multiple valid answers) | P0 (basic), P1 (custom checkers) |
| CA-8 | Failure feedback: on Wrong Answer show the first failing case only if it is a sample case; for hidden cases show case index and category (e.g., "edge case") without revealing data | P0 |
| CA-9 | Submission history per problem and globally: code, language, verdict, runtime, memory, timestamp; re-open in editor | P0 |
| CA-10 | Solution explanations: editorial (approach, complexity, code in each language), unlocked after the user solves the problem or after N failed attempts plus explicit confirmation (configurable) | P0 |
| CA-11 | Community discussion per problem (comments, upvotes, report) | P2 |
| CA-12 | Runtime and memory percentile compared with other accepted submissions in the same language | P1 |
| CA-13 | Bookmark/favorite problems and custom lists | P1 |
| CA-14 | Plagiarism and similarity detection for contest submissions | P1 (contests), P2 (practice) |
| CA-15 | Problem versioning: edits to tests or statements create a new version; past submissions retain the version they were judged on, with optional admin-triggered rejudge | P0 |

**How judging works (implementation-oriented)**
1. Submission is validated (size limit, language, rate limit) and persisted with status `queued`.
2. A job is placed on the judge queue with the problem version, language, and code reference.
3. A judge worker pulls the job, launches an isolated sandbox, compiles (if needed), runs each test group with CPU/wall-time and memory limits, and compares output (exact, token-wise, or via custom checker).
4. Worker streams per-test progress (via events) and writes the final verdict, runtime, and memory.
5. Post-judge hooks fire asynchronously: points, streak, badge evaluation, skill model update, AI feedback eligibility.

### 8.B Gamification and Achievements

| ID | Requirement | Priority |
|---|---|---|
| GA-1 | **Points system:** first-time Accepted awards points by difficulty (e.g., Easy 10, Medium 25, Hard 50, configurable). No points for re-solving; reduced points if the editorial was viewed before solving | P0 |
| GA-2 | **Daily streak:** a day counts if the user has at least one Accepted submission (or daily challenge completion) in their local timezone day; streak freeze (1 per week, earned) | P0 (streak), P1 (freeze) |
| GA-3 | **Daily challenge:** one featured problem per day (curated or AI-assisted selection by admin); bonus points and a calendar view of completions | P0 |
| GA-4 | **Badges:** rule-based achievements across categories (Milestones: 1/10/50/100/500 solved; Streaks: 7/30/100 days; Topic mastery; Contest performance; Speed; Interview readiness) with rarity tiers | P0 |
| GA-5 | Badge engine: declarative rule definitions (event type, condition, threshold) evaluated asynchronously on events; idempotent awarding; award notification | P0 |
| GA-6 | **Global leaderboard:** ranked by points, with filters (all-time, monthly, weekly), country, and college (if provided); cached and updated within 60 seconds | P0 |
| GA-7 | **Skill-based ranking:** per-topic skill rating (e.g., Arrays, DP, Graphs) derived from solved problems, difficulty, and attempts, shown as levels (Beginner to Expert) | P1 |
| GA-8 | Rewards: milestone rewards such as profile flair, themes for the editor, and streak freezes; no monetary rewards in v1 | P1 |
| GA-9 | Anti-abuse: points only awarded for judged submissions; detect repeated resubmission patterns, shared-account indicators, and contest cheating signals; admin can revoke points and badges with an audit trail | P0 (revocation), P1 (detection) |

### 8.C AI Coding Assistant

| ID | Requirement | Priority |
|---|---|---|
| AI-1 | **Tiered hints:** Level 1 (conceptual nudge), Level 2 (approach/algorithm name), Level 3 (step-by-step plan, pseudo-code), Level 4 (full solution, gated behind confirmation and reduced points). Each level is requested explicitly | P0 |
| AI-2 | **Code explanation:** user selects code (their own or an accepted solution) and receives a line-by-line or block-level explanation | P0 |
| AI-3 | **Debugging assistance:** given the user's code, verdict, and failing case category, AI identifies likely causes (off-by-one, overflow, unhandled empty input, wrong complexity) and suggests fixes without rewriting the entire solution by default | P0 |
| AI-4 | **Complexity analysis:** estimate time and space complexity of a submission with reasoning and compare with the optimal complexity of the problem; flagged as an estimate | P1 |
| AI-5 | **Personalized recommendations:** next-problem suggestions using the user's skill profile, recent failures, goals (e.g., target company), and spaced repetition for previously failed topics | P0 (rule-based), P1 (model-assisted) |
| AI-6 | **Weakness identification:** compute weak topics from failure rates, time-to-solve, and hint dependence; present as "Focus areas" with evidence (e.g., "6 of last 8 Graph attempts failed") | P0 |
| AI-7 | **Learning paths:** AI-assisted multi-week plan based on goal, available hours per day, and target date; adjusts weekly based on progress | P1 |
| AI-8 | Context-aware chat panel on the problem page: the assistant sees the problem, the user's current code, last verdict, and prior hints used in that session | P0 |
| AI-9 | Guardrails: refuse to output a full solution in contest mode and mock assessments; refuse unrelated or unsafe requests; rate limits and daily quotas per user tier | P0 |
| AI-10 | Feedback loop: thumbs up/down and "report incorrect" on every AI response, stored for evaluation | P0 |
| AI-11 | Post-submission AI review (style, readability, edge cases, alternative approaches) | P2 |

### 8.D Individual Developer Dashboard (private)

| ID | Requirement | Priority |
|---|---|---|
| DB-1 | Overview cards: total solved, points, current/longest streak, global rank, acceptance rate | P0 |
| DB-2 | Difficulty-wise progress (Easy/Medium/Hard solved versus total) | P0 |
| DB-3 | Activity heatmap (365-day calendar) and weekly activity chart | P0 |
| DB-4 | Topic proficiency radar/bar chart with skill levels | P1 |
| DB-5 | Recent submissions with filters and quick re-open | P0 |
| DB-6 | Focus areas (weak topics) and recommended next problems | P0 |
| DB-7 | Goal setting: target company/role, target date, daily time commitment; progress against goal | P1 |
| DB-8 | Badge and achievement showcase with progress toward the next badges | P0 |
| DB-9 | Interview readiness widget (score and breakdown) | P1 |
| DB-10 | Data export (CSV/JSON of submissions and stats) | P2 |

### 8.E Developer Profile (public, "Proof of Skills")

| ID | Requirement | Priority |
|---|---|---|
| DP-1 | Public URL: `salamanders.<domain>/u/<username>`; user controls visibility (public, unlisted link, private) and per-section toggles | P0 |
| DP-2 | Sections: bio and links (GitHub, LinkedIn, portfolio), headline stats, heatmap, difficulty breakdown, topic skills, badges, contest history, selected featured solutions | P0 |
| DP-3 | **Verification layer:** every stat and badge on the public profile is system-generated and non-editable; a "Verified by Salamanders" mark with a verification page showing generation time | P0 |
| DP-4 | Shareable assets: Open Graph preview card (dynamic image), short link, QR code, and embeddable badge/widget (SVG) for READMEs and resumes | P1 |
| DP-5 | "Add to LinkedIn" helper: pre-filled certification or featured-link entry text | P1 |
| DP-6 | Resume-ready summary export (PDF one-pager of verified stats) | P1 |
| DP-7 | Recruiter-view mode: clean read-only layout with no distracting gamification | P2 |
| DP-8 | Privacy controls: hide solved-problem names, hide ranking, hide college | P0 |
| DP-9 | Verifiable credential endpoint (signed JSON for third-party verification) | P2 |

### 8.F AI and Technology Updates (AI Hub: News)

| ID | Requirement | Priority |
|---|---|---|
| NW-1 | Feed of articles with categories: AI Developments, New AI Tools and Frameworks, Open Source Updates, Emerging Tech, Industry News | P0 |
| NW-2 | Content sourcing: admin-curated entries plus automated ingestion from RSS feeds, GitHub releases/trending, and approved APIs; items pass through dedup and a moderation queue before publishing | P0 (curated + RSS), P1 (GitHub, APIs) |
| NW-3 | Each item shows title, source, publish date, short summary (original or AI-generated and flagged), tags, and an outbound link (no full-text copying of third-party content) | P0 |
| NW-4 | AI-generated summaries and "why it matters for developers" blurbs, with human approval for MVP | P1 |
| NW-5 | Personalization: follow topics (e.g., LLMs, Rust, DevOps); ranked feed by recency and interest | P1 |
| NW-6 | Bookmarks and "read later"; weekly email digest | P1 |
| NW-7 | Home page widget with top 3 relevant items | P0 |
| NW-8 | Open-source spotlight: weekly featured repositories and "good first issues" | P2 |

### 8.G Interview Preparation

| ID | Requirement | Priority |
|---|---|---|
| IP-1 | **Company-wise question sets:** curated lists per company (e.g., TCS, Infosys, Amazon, Google, Microsoft) with frequency, last-reported period, and role/level filters; clear data provenance label (curated/community-reported) | P0 |
| IP-2 | **Topic-wise DSA roadmaps:** ordered curricula (Arrays, Strings, Linked Lists, Stacks/Queues, Trees, Graphs, DP, Greedy, Backtracking, Heaps, Tries, Bit Manipulation, Math) with concept primer, easy-to-hard problem ladders, and completion tracking | P0 |
| IP-3 | **Mock coding assessments:** timed sessions (e.g., 60/90/120 min), 2 to 4 problems selected by company profile and level, locked editor-only environment (no AI hints, no editorial), auto-submit on timeout, tab-switch and paste logging | P0 |
| IP-4 | Assessment report: per-problem verdict, time taken, approach quality notes, topic breakdown, percentile versus peers, and AI-generated improvement plan | P0 (core report), P1 (AI plan) |
| IP-5 | **Interview readiness score (0-100):** weighted from topic coverage, difficulty mix, consistency, mock performance, and recency; shown with a per-topic breakdown and next actions | P1 |
| IP-6 | Resources: curated guides for resume tips, behavioral (STAR) questions, OS/DBMS/CN/OOPS fundamentals (concise Q&A), aptitude basics for campus placements | P1 |
| IP-7 | Quizzes for CS fundamentals (OS, DBMS, CN, OOP) with scoring | P1 |
| IP-8 | AI mock interviewer (conversational technical interview with follow-ups) | P2 |
| IP-9 | System design primer for experienced users | P2 |

### 8.H Contests

| ID | Requirement | Priority |
|---|---|---|
| CT-1 | Scheduled contests (weekly): 3 to 4 problems, fixed duration, registration, live scoreboard (penalty-based or points-based) | P1 |
| CT-2 | Contest rating system (Elo-like) with rating history and contest badges | P1 |
| CT-3 | Virtual participation in past contests | P2 |
| CT-4 | Contest integrity: AI assistant disabled, similarity detection, post-contest review | P1 |
| CT-5 | Admin tooling: create contest, attach problems, set windows, publish editorial | P1 |

> Contests are a named navigation section in the vision, so a minimal version (weekly contest, scoreboard) ships right after MVP. The MVP navigation shows Contests with an "upcoming" teaser and a daily-challenge-based leaderboard.

### 8.I Admin Dashboard

| ID | Requirement | Priority |
|---|---|---|
| AD-1 | **User management:** search, view profile and activity, suspend/ban/restore, reset streak or points with audit reason, role assignment | P0 |
| AD-2 | **Problem management:** create/edit problems in Markdown, manage tags/companies, upload test cases (bulk ZIP or in-UI), set time/memory limits per language, set checker type, draft/review/publish workflow, versioning, rejudge | P0 |
| AD-3 | **Test-case validation:** run reference solution(s) against all tests before publish; flag inconsistent outputs and tests exceeding limits | P0 |
| AD-4 | **Badge and achievement management:** create/edit badges and rules, preview eligibility counts, retire badges (non-destructive) | P0 |
| AD-5 | **Platform analytics:** DAU/WAU/MAU, retention cohorts, submissions per day, verdict distribution, judge queue depth and latency, AI usage and cost, top problems by attempts and drop-off | P0 (core), P1 (cohorts) |
| AD-6 | **Content and AI news management:** review ingested items, approve/reject, edit summaries, pin featured items, manage sources | P0 |
| AD-7 | **Interview content management:** company sets, roadmaps, mock templates | P0 |
| AD-8 | **User activity monitoring:** suspicious activity queue (rate anomalies, similarity flags, multi-account indicators), moderation actions | P1 |
| AD-9 | **AI operations:** view prompts/versions, quotas, flagged responses, feedback stats, kill switch for AI features | P1 |
| AD-10 | Audit log for all admin actions (who, what, when, before/after) | P0 |
| AD-11 | Feature flags and announcements (banner messages) | P1 |

---

## 9. Non-Functional Requirements

### 9.1 Performance

| Area | Requirement |
|---|---|
| Page load | LCP under 2.5 s on 4G for Home, Problems list, and Problem page; TTI under 3.5 s |
| API latency | p95 under 300 ms for read endpoints; p95 under 500 ms for write endpoints (excluding judging) |
| Run (samples) | Median under 3 s, p95 under 6 s |
| Submit (full judge) | Median under 4 s, p95 under 10 s for standard problems under normal load |
| AI response | First token under 2 s; complete hint under 8 s; streaming responses |
| Leaderboard | Served from cache; freshness under 60 s |

### 9.2 Scalability

- Target at launch: **5,000 registered users, 500 concurrent, 20 submissions/second peak**.
- Design headroom: **100,000 users, 5,000 concurrent, 200 submissions/second** by horizontal scaling of stateless API instances and judge workers only (no re-architecture).
- Contest spikes: pre-warm judge workers; queue-based load leveling; priority lanes (contest > mock assessment > practice).

### 9.3 Availability and reliability

- 99.5% monthly uptime for the web app and API at launch; 99.9% target within 12 months.
- Judge queue is durable: no submission lost on worker or node failure; at-least-once processing with idempotent verdict writes.
- Graceful degradation: if AI is down, the arena works; if the judge is degraded, show a status banner and queue submissions.
- Daily automated database backups, point-in-time recovery, tested restore procedure (RPO 15 min, RTO 2 h).

### 9.4 Security (summary; details in section 18)

- OWASP ASVS Level 2 alignment, encryption in transit and at rest, strict sandboxing for untrusted code.

### 9.5 Maintainability

- Modular monolith with enforced module boundaries, documented internal interfaces, and an OpenAPI contract.
- 80%+ unit coverage for domain logic (judging, points, badges, streaks); contract and end-to-end tests for critical flows.
- Infrastructure as Code, CI/CD with preview environments, structured logging with correlation IDs.

### 9.6 Usability and accessibility

- WCAG 2.1 AA: keyboard navigation (including the editor escape hatch), contrast, focus states, screen-reader labels.
- Responsive from 360 px; the problem-solving experience must be fully usable on a tablet; mobile supports browsing, reading, dashboard, news, and light coding.
- Localization-ready (English at launch; i18n framework in place, Hindi as a candidate first addition).

### 9.7 Observability

- Metrics (latency, errors, queue depth, judge runtime, AI tokens/cost), distributed tracing, centralized logs, alerting on SLO burn.
- Product analytics events for every funnel step (see section 23).

### 9.8 Compliance and privacy

- GDPR/India DPDP-aligned: consent, data export, account deletion (hard delete of PII within 30 days; anonymize leaderboard history).
- Clear AI disclosure: users know when content is AI-generated; user code is not used to train third-party models.

---

## 10. User Roles and Permissions

### 10.1 Roles

| Role | Description |
|---|---|
| Guest | Unauthenticated visitor |
| Individual User | Registered learner (default) |
| Admin | Platform operator with full management rights |

Recommended future split of Admin into **Content Editor**, **Moderator**, and **Super Admin** via role-based access control (RBAC) built from day one with permissions, not hard-coded roles.

### 10.2 Permission matrix

| Capability | Guest | Individual User | Admin |
|---|:---:|:---:|:---:|
| View landing page, problem list, public profiles, news | Yes | Yes | Yes |
| View problem statements | Yes (limited daily) | Yes | Yes |
| Run/submit code | No (sandbox "try it" on 1 demo problem) | Yes | Yes |
| Use AI assistant | No | Yes (quota) | Yes |
| View editorial | No | Conditional (after solve/attempts) | Yes |
| Personal dashboard | No | Own | View any user (support) |
| Edit own profile and privacy | No | Yes | Yes |
| Leaderboard | View | View and appear | View and manage |
| Take mock assessments | No | Yes | Yes |
| Join contests | No | Yes | Yes |
| Create/edit problems and tests | No | No | Yes |
| Manage badges and rules | No | No | Yes |
| Manage news and sources | No | No | Yes |
| Suspend/ban users, adjust points | No | No | Yes |
| View platform analytics and audit logs | No | No | Yes |
| Configure AI limits, flags, announcements | No | No | Yes |

### 10.3 Account rules

- One account per email; optional OAuth providers link to the same account.
- Usernames are unique, immutable after 30 days of first change (to protect profile URLs), with redirects on rename.
- Suspended users cannot submit, appear on leaderboards, or have public profiles.

---

## 11. Detailed User Workflows

### 11.1 Onboarding and activation

1. Visitor lands on Home, sees value proposition and "Try a problem" demo (no signup).
2. Sign up via email or OAuth (Google, GitHub); verify email.
3. Short onboarding (under 60 seconds, skippable): role (student/professional), target (placements, specific company, general improvement), experience level, preferred language, daily time.
4. System creates an initial skill baseline (optional 5-question diagnostic of Easy/Medium problems).
5. User lands on a personalized Home with first recommended problem and an optional starter roadmap.
6. **Activation event:** first Accepted submission within 24 hours.

### 11.2 Solve a problem

1. User opens Problems, filters (e.g., Medium, Arrays), selects a problem.
2. Problem page: statement on the left, editor on the right, language selector, tabs for Description, Submissions, Editorial (locked), Discussion (later), AI Assistant.
3. User writes code; draft autosaves.
4. User clicks **Run**; results appear in the console panel for samples or custom input.
5. User clicks **Submit**; UI shows queued, compiling, running (test x of N), then the verdict.
6. On **Accepted**: points awarded, streak updated, badge toasts, runtime/memory percentile, "Unlock editorial" and "Next recommended problem".
7. On failure: verdict details, "Get a hint" or "Debug with AI" actions.

### 11.3 Get AI help while stuck

1. User opens the AI panel (or clicks "Get a hint").
2. System shows hint level options; Level 1 is preselected.
3. AI receives context (problem, current code, last verdict, hint history) and responds with streaming output.
4. User can ask follow-ups; each deeper level requires explicit click; Level 4 shows a confirmation ("Viewing the full solution reduces points and is recorded").
5. User rates the response; usage is logged against the problem for the weakness model.

### 11.4 Daily challenge and streak

1. Home shows today's challenge, countdown, and streak.
2. User completes it (or any Accepted problem for streak only, per configuration).
3. Streak increments at the user's local day boundary; missed day triggers freeze consumption if available, else resets.
4. Evening reminder (email/push, opt-in) if no activity.

### 11.5 Interview preparation: company track and mock assessment

1. User opens Interview Preparation, selects a company (e.g., Amazon) and role level.
2. Sees the company hub: frequent topics, question list with progress, suggested roadmap, readiness score.
3. User starts a **Mock Assessment**: chooses company profile and duration; reads rules (no AI, no editorial, activity logged); confirms.
4. Timer starts; user solves 2 to 4 problems in a focused layout; submissions are judged as normal but verdict details are hidden until the end for hard mode (configurable).
5. On submit or timeout: session closes; report generated (scores, time per problem, topic gaps, percentile).
6. Readiness score updates; AI proposes a 7-day improvement plan; relevant problems are queued on the dashboard.

### 11.6 Build and share a developer profile

1. User opens Developer Profile settings, picks a username, adds bio and links.
2. Chooses visibility and section toggles; previews public view.
3. Publishes; receives short link, QR code, and badge embed code.
4. Copies "LinkedIn featured link" text or downloads a PDF summary.
5. A visitor opens the link; sees verified stats with "Verified by Salamanders" and generation timestamp; can click the verification page.

### 11.7 Read AI and tech updates

1. User opens AI Hub > Updates; filters by category or followed topics.
2. Opens an item; sees summary and "Read at source" link.
3. Bookmarks or follows a tag; the Home widget adapts.

### 11.8 Admin: publish a new problem

1. Admin creates a draft: statement, constraints, examples, difficulty, tags, companies, limits.
2. Uploads tests (ZIP of in/out pairs) or enters in UI; selects checker type.
3. Adds reference solutions in at least two languages.
4. Runs **validation**: all reference solutions must pass all tests within limits; mismatch blocks publishing.
5. Sends for review (second admin approves, optional in MVP) and publishes; problem appears in catalog, recommendations, and company sets as tagged.
6. Later edits create a new version; admin chooses whether to rejudge affected submissions.

### 11.9 Admin: manage a suspicious user

1. Monitoring queue flags abnormal pattern (e.g., 50 Accepted in 10 minutes with identical code hashes).
2. Admin inspects activity timeline and submissions.
3. Takes action (warn, revoke points/badges, suspend) with a mandatory reason; user is notified; action is audit-logged.

---

## 12. User Stories with Acceptance Criteria

> Format: **As a** [role], **I want** [capability] **so that** [benefit]. Acceptance criteria use Given/When/Then.

### Coding Arena

**US-CA-1: Run code on sample cases**
As a user, I want to run my code on sample inputs so that I can verify my logic before submitting.
- Given I have written code and selected a language, when I click Run, then the sample cases execute and I see per-case output, expected output, runtime, and pass/fail.
- Given my code has a compile error, when I click Run, then I see the compiler message with line numbers and no tests run.
- Given my code exceeds the time limit, when I Run, then I see "Time Limit Exceeded" with the limit shown.
- Given I am rate limited (more than 10 runs/minute), when I click Run, then I see a clear message with retry time.

**US-CA-2: Submit solution and see verdict**
As a user, I want to submit my solution and get an authoritative verdict so that I know whether it is correct.
- Given a valid solution, when I submit, then the verdict is Accepted, the submission appears in history within 2 seconds of completion, and points are awarded only on my first Accepted.
- Given a wrong solution, when I submit, then I see Wrong Answer with the failing test index and (only for sample cases) input and expected output.
- Given the judge is unavailable, when I submit, then the submission is queued, I see "Queued" status, and it is judged once capacity returns; no duplicate submissions are created.
- Given I submit the same code twice within 5 seconds, then the second is rejected with a throttling message.

**US-CA-3: Filter problems**
As a user, I want to filter problems by difficulty, topic, company, and status so that I can find relevant practice quickly.
- Given I select Medium and Graphs, when results load, then only matching problems appear, with a result count and shareable URL state.
- Given I clear filters, then the full list returns with pagination preserved.

**US-CA-4: View solution explanation**
As a user, I want to read an editorial after solving so that I can learn optimal approaches.
- Given I have solved the problem, when I open Editorial, then I see approach, complexity, and code in supported languages.
- Given I have not solved it and have fewer than the configured attempts, then Editorial is locked with an explanation of how to unlock it.
- Given I unlock early with confirmation, then points for that problem are reduced and the action is recorded.

### Gamification

**US-GA-1: Maintain a streak**
As a user, I want a daily streak so that I stay motivated to practice consistently.
- Given I get an Accepted submission today in my timezone, then my streak increments once for the day.
- Given I miss a day and have a freeze, then the freeze is consumed and the streak is preserved; otherwise the streak resets to 0 and my longest streak remains.
- Given I change timezone, then streak calculation uses my profile timezone and does not double-count a day.

**US-GA-2: Earn a badge**
As a user, I want to earn badges for milestones so that I feel recognized.
- Given I solve my 10th unique problem, then I receive the "Ten Down" badge exactly once, and a toast and notification appear.
- Given the badge engine processes the same event twice, then no duplicate badge is created.

**US-GA-3: View leaderboard**
As a user, I want to see global rankings so that I can compare my progress.
- Given I open the leaderboard, then I see my rank, nearby ranks, top 100, and filters for weekly/monthly/all-time.
- Given two users have equal points, then the earlier achiever of that score ranks higher.

### AI Assistant

**US-AI-1: Progressive hints**
As a user, I want hints that reveal information gradually so that I can learn without being given the answer.
- Given I request Level 1, then I receive a conceptual nudge with no algorithm name or code.
- Given I request Level 3, then I receive a step plan and pseudo-code but no complete runnable solution.
- Given I request Level 4, then I must confirm; the response is logged, points for that problem are reduced, and it is unavailable in contest/mock modes.

**US-AI-2: Debug my code**
As a user, I want AI to explain why my solution fails so that I can fix it.
- Given a Wrong Answer verdict, when I click Debug with AI, then the AI receives my code, problem, and verdict category and returns likely causes, each tied to specific lines, within 8 seconds.
- Given my quota is exhausted, then I see remaining quota, reset time, and non-AI alternatives.

**US-AI-3: Personalized recommendations**
As a user, I want suggested problems matched to my weaknesses so that I improve efficiently.
- Given I have at least 10 attempts, when I open Home, then I see 3 to 5 recommendations, each with a reason ("You struggled with sliding window").
- Given I solve a recommended problem, then it is removed and the list refreshes.
- Given I have fewer than 10 attempts, then recommendations are based on onboarding goals and a default roadmap.

### Dashboard and Profile

**US-DB-1: Track my progress**
As a user, I want a dashboard with my stats so that I understand my growth.
- Given I have submissions, then the dashboard shows solved counts by difficulty, a heatmap, current and longest streak, and recent submissions, all consistent with submission data (no more than 1 minute stale).

**US-DP-1: Share a verified public profile**
As a user, I want a public profile so that recruiters can see my verified skills.
- Given I enable public visibility, then `/u/<username>` is accessible without login and shows only sections I enabled.
- Given a visitor views my profile, then stats display a "Verified by Salamanders" mark and a generation timestamp; no stat is editable by me.
- Given I switch to private, then the URL returns a "profile not available" page within 60 seconds (cache invalidation).

### News

**US-NW-1: Browse tech updates**
As a user, I want curated AI and tech news so that I stay current.
- Given I open Updates, then I see items sorted by recency with category filters, source attribution, and outbound links.
- Given an item is marked AI-summarized, then it carries a visible "AI summary" label.

### Interview Prep

**US-IP-1: Practice a company's questions**
As a student, I want company-wise questions so that I prepare for specific placements.
- Given I choose a company, then I see its question list with frequency, topic distribution, and my solved status.

**US-IP-2: Take a mock assessment**
As a user, I want a timed mock test so that I practice under realistic conditions.
- Given I start a 90-minute mock, then the timer cannot be paused, AI and editorial are disabled, and the session auto-submits at zero.
- Given I close the browser, then the timer continues server-side and I can resume until it expires.
- Given the session ends, then I see a report with per-problem results, time spent, and topic gaps.

**US-IP-3: See readiness**
As a user, I want a readiness score so that I know how prepared I am.
- Given I have activity, then the score (0-100) shows with a breakdown by topic coverage, consistency, difficulty mix, and mock performance, plus 3 recommended actions.

### Admin

**US-AD-1: Publish a validated problem**
As an admin, I want automatic validation before publishing so that broken problems never reach users.
- Given I attempt to publish, then the system runs reference solutions on all tests; if any fails or exceeds limits, publishing is blocked with a report.

**US-AD-2: Manage users**
As an admin, I want to suspend or restore users so that I can enforce fair use.
- Given I suspend a user with a reason, then they are logged out, hidden from leaderboards, and an audit entry is created.

**US-AD-3: Curate news**
As an admin, I want to review ingested news so that only quality items are published.
- Given a new item is ingested, then it appears in the review queue with duplicate detection; approving publishes it, rejecting hides it.

**US-AD-4: View analytics**
As an admin, I want platform analytics so that I can make data-driven decisions.
- Given I open Analytics, then I see DAU/WAU/MAU, submissions/day, verdict distribution, judge queue latency, and AI usage with date-range filters.

---

## 13. UI/UX Requirements and Design Guidelines

### 13.1 Design principles

- **Focus:** the problem page is distraction-free; secondary panels collapse.
- **Clarity of state:** always show where the user is, what is running, and what happened.
- **Rewarding but not noisy:** celebrations (confetti, toasts) are short, skippable, and disable-able.
- **Credibility:** the public profile uses a clean, professional visual language (not game-like) so it is resume-safe.
- **Developer-native feel:** dark theme by default, light theme available, keyboard shortcuts, monospaced typography for code.

### 13.2 Information architecture

```
Home
Problems  -> List -> Problem (Description | Submissions | Editorial | AI)
Contests  -> Upcoming | Live | Past | Contest page
AI Hub    -> Assistant | Learning Path | Updates (news)
Interview Preparation -> Companies | Roadmaps | Mock Assessments | Resources | Readiness
Dashboard (private)   -> Overview | Activity | Skills | Submissions | Goals | Badges
Profile (public)      -> /u/username
Admin (restricted)    -> Users | Problems | Badges | Content | Analytics | Monitoring | AI Ops | Audit
```

### 13.3 Key screens and requirements

| Screen | Key requirements |
|---|---|
| **Home** | Hero (guest) or personalized hub (user): Continue Solving, Daily Challenge with streak, recommended problems (with reasons), readiness snapshot, news highlights, upcoming contest |
| **Problems list** | Filter sidebar (collapsible on mobile), search, status icons, difficulty color-coding, acceptance rate, company tags; saved filter presets |
| **Problem page** | Resizable split pane; Monaco editor; language selector; Run/Submit buttons with keyboard shortcuts (Ctrl/Cmd+Enter, Ctrl/Cmd+Shift+Enter); console with tabs for Samples, Custom input, Result; AI panel docked; timer (optional stopwatch); fullscreen mode |
| **Submission result** | Verdict banner, per-test progress bar, runtime/memory with percentile, diff for samples, next actions |
| **AI Hub** | Chat with context chips (problem, code, verdict), hint-level selector, quota indicator, learning path timeline, feedback buttons |
| **Interview Prep** | Company grid with logos (text-only if licensing is unclear), company hub, roadmap stepper, mock lobby with rule acceptance, mock runner (minimal chrome), report page |
| **Dashboard** | Stat cards, heatmap, difficulty donut, topic radar, focus areas, recent submissions, goals |
| **Public profile** | Header with avatar, headline, links, verified mark; stat strip; heatmap; badges; topic skills; featured solutions; share panel |
| **Admin** | Data tables with server-side pagination, filters, bulk actions; Markdown editor with live preview for problems; test-case uploader with validation console; charts for analytics |

### 13.4 Design system requirements

- Component library with documented tokens (color, spacing, type scale, radius, elevation) and light/dark themes.
- Semantic colors for verdicts: Accepted (green), Wrong Answer (red), TLE/MLE (amber), Runtime/Compile Error (orange/purple) with icons and text, never color alone.
- Typography: a readable UI sans-serif and a programming monospace (with ligatures optional).
- Core components: buttons, inputs, tags/chips, tables, tabs, modals, toasts, split panes, code blocks, charts, skeleton loaders, empty states, error states.

### 13.5 Interaction and state requirements

- Every async operation has loading, success, empty, and error states.
- Optimistic UI where safe (bookmarks); never for verdicts.
- Real-time updates for submission progress and contest scoreboards via WebSocket or SSE.
- Autosave drafts (every 5 seconds and on blur), restored per problem and language.
- Keyboard shortcuts documented in a help overlay.

### 13.6 Accessibility and responsiveness

- WCAG 2.1 AA, visible focus, ARIA labels for editor controls, reduced-motion support.
- Breakpoints: 360, 768, 1024, 1440. Problem page stacks vertically on small screens with a tab switch between Description and Code.

### 13.7 Content and tone

- Encouraging, concise, never shaming (failed attempts are "learning data").
- Clear microcopy for limits, quotas, and AI behavior.

---

## 14. Database Design and Key Entities

**Primary store:** PostgreSQL (system of record). **Cache/ephemeral:** Redis (sessions, rate limits, leaderboards via sorted sets, queues). **Objects:** S3-compatible storage (test data, large submissions, exports, OG images). **Search:** PostgreSQL full-text for MVP; OpenSearch/Meilisearch when needed. **Analytics:** event stream to a warehouse (e.g., ClickHouse or BigQuery) post-MVP.

### 14.1 Key entities

| Entity | Key fields (illustrative) | Notes |
|---|---|---|
| **users** | id, email, password_hash (nullable for OAuth), username, display_name, avatar_url, timezone, country, college, role_id, status, created_at, last_active_at | Soft-delete plus PII purge job |
| **oauth_identities** | id, user_id, provider, provider_user_id | |
| **user_profiles** | user_id, bio, links (JSON), visibility, section_toggles (JSON), headline | Public profile settings |
| **user_goals** | user_id, target_company_id, target_role, target_date, daily_minutes | |
| **roles / permissions / role_permissions** | | RBAC |
| **problems** | id, slug, title, difficulty, current_version_id, status (draft/review/published/retired), created_by, created_at | |
| **problem_versions** | id, problem_id, version, statement_md, constraints, time_limit_ms, memory_limit_mb, checker_type, editorial_md, created_at | Immutable per version |
| **problem_examples** | id, problem_version_id, input, output, explanation | |
| **test_cases** | id, problem_version_id, group_no, weight, input_ref, output_ref, is_sample | Large data in object storage |
| **starter_templates** | problem_version_id, language_id, code | |
| **languages** | id, key, display_name, compiler_cmd, run_cmd, version, time_multiplier, enabled | |
| **topics / problem_topics** | | Tags |
| **companies / problem_companies** | company_id, problem_id, frequency, last_reported_at, source | Provenance field |
| **submissions** | id, user_id, problem_version_id, language_id, code_ref/code, verdict, runtime_ms, memory_kb, score, context (practice/contest/mock), contest_id, mock_session_id, created_at | Partition by month at scale |
| **submission_results** | submission_id, test_case_id, verdict, runtime_ms, memory_kb | Per-test detail |
| **drafts** | user_id, problem_id, language_id, code, updated_at | |
| **user_problem_status** | user_id, problem_id, status, first_accepted_at, attempts, best_runtime, hints_used, editorial_viewed | Denormalized for fast lists |
| **point_ledger** | id, user_id, delta, reason, ref_type, ref_id, created_at | Append-only; totals derived |
| **streaks** | user_id, current, longest, last_active_date, freezes_available | |
| **daily_challenges** | date, problem_id, bonus_points | |
| **badges** | id, key, name, description, category, rarity, rule_json, icon, status | |
| **user_badges** | user_id, badge_id, awarded_at, evidence_ref | Unique (user_id, badge_id) |
| **skill_ratings** | user_id, topic_id, rating, confidence, updated_at | Updated by skill model |
| **ai_conversations / ai_messages** | id, user_id, problem_id, context_snapshot, role, content, hint_level, tokens_in/out, model, latency_ms, created_at | |
| **ai_feedback** | message_id, rating, reason, created_at | |
| **ai_quota_usage** | user_id, date, requests, tokens | |
| **recommendations** | id, user_id, problem_id, reason_code, score, generated_at, consumed_at | |
| **contests / contest_problems / contest_registrations / contest_standings** | | |
| **rating_history** | user_id, contest_id, old_rating, new_rating | |
| **news_sources** | id, name, type (rss/api/manual), url, enabled | |
| **news_items** | id, source_id, title, url, summary, summary_origin (human/ai), category, tags, status, published_at, ingested_at, dedupe_hash | |
| **news_follows / news_bookmarks** | user_id, tag/item | |
| **interview_company_sets** | id, company_id, role_level, description | |
| **roadmaps / roadmap_steps / roadmap_progress** | | |
| **mock_templates / mock_sessions / mock_session_problems** | session: start, end, status, config; integrity events | |
| **mock_reports** | session_id, scores, topic_breakdown, ai_plan | |
| **readiness_scores** | user_id, score, breakdown_json, computed_at | |
| **notifications** | id, user_id, type, payload, read_at | |
| **audit_logs** | id, actor_id, action, entity, before, after, reason, ip, created_at | Immutable |
| **flags_reports** | id, reporter_id, target_type, target_id, reason, status | Moderation |
| **feature_flags** | key, enabled, rules | |

### 14.2 Key relationships

- User 1-N Submissions; Problem 1-N ProblemVersions 1-N TestCases; Submission N-1 ProblemVersion.
- Problems N-N Topics, N-N Companies.
- Users N-N Badges via user_badges; Users 1-N PointLedger entries.
- MockSession 1-N Submissions; Contest 1-N Submissions.

### 14.3 Data design rules

- **Event-sourced stats where integrity matters:** points come from an append-only ledger; leaderboards are projections that can be rebuilt.
- **Immutable problem versions** protect verdict integrity and public-profile verifiability.
- **Indexes:** (user_id, created_at) on submissions; (problem_id, verdict); (difficulty, status); GIN on tags; unique (user_id, badge_id).
- **Retention:** raw code retained for the life of the account; sandbox logs 30 days; AI conversations 12 months (user-deletable).
- **Migrations:** versioned, backward-compatible (expand/contract), run in CI before deploy.

---

## 15. Recommended Technology Stack

Guiding rule: **boring, well-supported technology; managed services where possible; two isolated hot spots (sandbox and AI).**

| Layer | Recommendation | Rationale / alternatives |
|---|---|---|
| **Frontend** | Next.js (React, TypeScript), Tailwind CSS plus a headless component library (Radix/shadcn), TanStack Query, Zustand (light state) | SSR/ISR for SEO-critical public profiles and problem pages; strong ecosystem |
| **Code editor** | Monaco Editor | VS Code-grade experience, language services |
| **Charts** | Recharts or ECharts; custom SVG heatmap | |
| **Backend API** | **Node.js with NestJS (TypeScript)** as a modular monolith. Alternative: Python (FastAPI) if the team is Python-first | Shared types with the frontend; strong module system; OpenAPI generation |
| **Realtime** | WebSocket/SSE via the API gateway (Socket.IO or native SSE) backed by Redis pub/sub | Submission progress, scoreboards, AI streaming |
| **Database** | PostgreSQL 16 (managed: RDS/Cloud SQL/Supabase) with read replica later | Relational integrity, JSONB, partitioning |
| **Cache / queue** | Redis (managed) for cache, rate limits, leaderboards (sorted sets), pub/sub; **BullMQ** or a durable broker (RabbitMQ/SQS) for the judge and background queues | Start with one broker; judge queue must be durable |
| **Object storage** | S3-compatible (S3/R2/GCS) | Test data, exports, OG images |
| **Code execution** | Custom **judge workers** using container sandboxes with **isolate** (IOI) or **gVisor/Firecracker** isolation; alternative: self-hosted **Judge0** as an accelerator for MVP | Security is non-negotiable; Judge0 shortens time-to-market but evaluate its limits for custom checkers |
| **AI** | LLM provider API behind an internal **AI Gateway** (provider-agnostic): a capable model for debugging/explanations, a smaller/cheaper model for hints, classification, and summaries; embeddings for retrieval | Avoid vendor lock-in; control cost and safety centrally |
| **Vector store** | pgvector (in PostgreSQL) for MVP | Avoid another datastore |
| **Search** | PostgreSQL full-text for MVP; Meilisearch/OpenSearch later | |
| **Auth** | Managed identity (Auth0/Clerk/Cognito) or in-house with Argon2id, JWT access + rotating refresh tokens | Prefer managed to reduce security risk |
| **Email / notifications** | SES/SendGrid/Resend; web push (later) | |
| **Infra** | Containers (Docker) on AWS/GCP; start with managed container service (ECS/Cloud Run) for API, and a dedicated autoscaled node pool/VM group for judge workers; Kubernetes only when justified | Simplicity first; judge workers need host-level isolation control |
| **IaC / CI-CD** | Terraform, GitHub Actions, preview environments, blue/green or rolling deploys | |
| **Observability** | OpenTelemetry, Grafana/Prometheus or Datadog, Sentry, structured JSON logs | |
| **Analytics** | PostHog (product analytics, feature flags, session replay with privacy controls) | |
| **CDN / edge** | Cloudflare (CDN, WAF, DDoS, bot management) | |
| **Testing** | Jest/Vitest, Playwright (E2E), k6 (load), contract tests from OpenAPI | |

---

## 16. System Architecture

### 16.1 Logical architecture

```
                        +-----------------------------+
                        |  CDN / WAF (Cloudflare)     |
                        +--------------+--------------+
                                       |
                +----------------------v----------------------+
                |   Web App (Next.js: SSR/ISR + SPA)          |
                +----------------------+----------------------+
                                       | HTTPS / WS / SSE
                +----------------------v----------------------+
                |   API Gateway / Backend Modular Monolith    |
                |  +--------+ +----------+ +-----------------+|
                |  | Auth & | | Problems | | Submissions &   ||
                |  | Users  | | & Content| | Judge Orchestr. ||
                |  +--------+ +----------+ +-----------------+|
                |  +--------+ +----------+ +-----------------+|
                |  | Gamif. | | Profile  | | Interview &     ||
                |  | Engine | | Analytics| | Mock Assess.    ||
                |  +--------+ +----------+ +-----------------+|
                |  +--------+ +----------+ +-----------------+|
                |  | News   | | AI       | | Admin &         ||
                |  | Hub    | | Orchestr.| | Audit           ||
                |  +--------+ +----------+ +-----------------+|
                +---+-----------+-----------+-------------+---+
                    |           |           |             |
              +-----v--+  +-----v----+ +----v-----+ +-----v------+
              |Postgres|  |  Redis   | | Object   | | Event bus /|
              |(+pgvec)|  |cache/lead| | storage  | | job queues |
              +--------+  +----------+ +----------+ +--+------+--+
                                                        |      |
                                  +---------------------v-+  +-v----------------+
                                  | Judge Workers         |  | Async Workers    |
                                  | (isolated sandboxes)  |  | (badges, skills, |
                                  +-----------------------+  | news ingest, AI  |
                                                             | batch, emails)   |
                                                             +--+---------------+
                                                                |
                                                       +--------v---------+
                                                       | AI Gateway ->    |
                                                       | LLM providers    |
                                                       +------------------+
```

### 16.2 Module boundaries and dependencies

| Module | Owns | Depends on |
|---|---|---|
| Auth & Users | accounts, roles, sessions | none |
| Problems & Content | problems, versions, tests, tags, companies | Auth (admin) |
| Submissions & Judge Orchestration | submissions, queue, verdicts | Problems, Users, Judge Workers |
| Gamification Engine | points, streaks, badges, leaderboards | Submissions (events), Users |
| Skill & Recommendation | skill ratings, recommendations, readiness | Submissions, Problems, Gamification (read) |
| AI Orchestrator | prompts, context builder, quotas, safety, feedback | Problems, Submissions, Skill model, AI Gateway |
| Profile & Dashboard | profile settings, aggregated stats, OG cards | Gamification, Skill, Submissions |
| Interview & Mock | company sets, roadmaps, mock sessions, reports | Problems, Submissions, Skill, AI (optional) |
| Contests | contests, standings, ratings | Problems, Submissions, Gamification |
| News Hub | sources, items, follows | Auth, AI (optional summaries) |
| Admin & Audit | admin APIs, audit logs, flags | all (read/manage) |

Rule: modules communicate through **internal service interfaces and domain events**, never through direct table access across module boundaries. This keeps a future split into services possible.

### 16.3 Key events (event bus)

`submission.created`, `submission.judged`, `problem.first_solved`, `streak.updated`, `badge.awarded`, `mock.completed`, `contest.ended`, `ai.hint_used`, `news.ingested`, `user.profile_published`.

Consumers (async, idempotent): points ledger writer, badge evaluator, streak updater, skill-model updater, recommendation refresher, leaderboard updater, notification sender, analytics forwarder.

### 16.4 Judge subsystem (critical path)

- **API side:** validates and enqueues; never executes code.
- **Queue:** durable, priority lanes (contest, mock, practice, run-only), per-user concurrency caps.
- **Workers:** stateless processes on dedicated nodes with no access to internal networks or secrets; pull jobs, fetch problem version and tests from object storage (cached locally), execute in sandbox.
- **Sandbox constraints:** no network, read-only filesystem except a tmpfs workspace, seccomp syscall filtering, cgroup limits (CPU, memory, PIDs, output size), per-run wall and CPU time limits, non-root user, fresh sandbox per submission.
- **Result flow:** worker publishes per-test progress to Redis pub/sub (streamed to the client), writes final result in a transaction, emits `submission.judged`.
- **Autoscaling:** scale on queue depth and oldest-job age; pre-warm before contests and mock-heavy windows.
- **Determinism:** pinned language versions, calibrated time multipliers per language, repeated runs for borderline TLE.

### 16.5 Caching and performance strategy

- CDN-cached public pages (problem statements for guests, news, public profiles with short TTL and event-based invalidation).
- Redis sorted sets for leaderboards; Postgres is the source of truth with a nightly reconciliation job.
- `user_problem_status` denormalization for fast problem lists.
- Read replicas and materialized views for dashboard aggregates once needed.

### 16.6 Deployment topology

- Environments: local (Docker Compose), preview (per PR), staging, production.
- Production: multi-AZ API (2+ instances), managed Postgres with HA and PITR, managed Redis, dedicated judge node group (autoscaled), separate network segment for judge workers.
- Zero-downtime deployments; database migrations run before app rollout (backward compatible).

---

## 17. AI Integration and Implementation Strategy

### 17.1 Principles

1. **Teach, don't tell:** default behavior is guidance; full solutions are gated.
2. **Grounded and contextual:** responses use the problem, the user's code, verdicts, and history, not generic text.
3. **Safe and fair:** disabled in contests and mocks; no leaking of hidden test data or reference solutions.
4. **Cost-controlled:** quotas, caching, model tiering, and monitoring from day one.
5. **Measurable:** every AI feature has an evaluation set and feedback signal.

### 17.2 AI Gateway (internal service layer)

A single internal component through which all LLM calls pass:
- Provider abstraction (swap models without touching features).
- Prompt templates versioned in the repository and registered by ID and version.
- Model routing: small model for Level 1-2 hints, summaries, tagging; stronger model for debugging, code explanation, complexity analysis, learning-plan generation.
- Input and output safety filters, PII scrubbing, prompt-injection defenses (user code and problem text treated as untrusted data in delimited sections).
- Quotas and rate limits per user and per feature; circuit breaker and graceful fallback.
- Logging of prompt version, model, tokens, latency, cost, and user feedback (with retention limits).
- Response caching for deterministic, non-personalized outputs (e.g., problem-level Level 1 hints and editorial-derived explanations).

### 17.3 Feature-level implementation

| Feature | Inputs to the model | Output contract | Safeguards |
|---|---|---|---|
| **Tiered hints** | Problem statement, constraints, topic tags, hint level, user's code (optional), previous hints in session; for higher levels, the approved editorial approach as private grounding | Structured JSON: `hint_text`, `level`, `reveals_algorithm` (bool) | Output classifier ensures level 1-2 do not contain code or the algorithm name; Level 4 requires confirmation and is blocked in contest/mock |
| **Code explanation** | User code, language, problem statement | Sectioned explanation with line references | Length limits; no hidden test data present in context |
| **Debugging help** | User code, verdict type, failing category (not hidden test data), sample failing case if sample, runtime/memory | Ranked list of likely causes with line references and fix suggestions | Does not rewrite the entire solution unless user requests Level 3+ |
| **Complexity analysis** | User code | Time/space estimate with reasoning and confidence | Labeled as estimate; optionally cross-checked against static heuristics and measured runtime scaling |
| **Weakness identification** | **Not an LLM-first task.** Computed from data: failure rate by topic, time-to-solve, hint dependence, recency decay | Ranked weak topics with evidence | LLM only phrases the explanation |
| **Recommendations** | Skill ratings, recent attempts, goal, spaced-repetition schedule, problem metadata and embeddings | Ranked problem list with reason codes | Deterministic ranking first; LLM only for explanation text (P1) |
| **Learning path** | Goal, timeline, daily minutes, skill profile, roadmap templates | Weekly plan referencing real problem IDs | Plan validated against catalog (no hallucinated problems); regenerated weekly |
| **News summaries** | Article title, excerpt/metadata (no full-text copying), source | 2-3 sentence summary and "why it matters" | Flagged as AI-generated; human approval in MVP |
| **Mock report plan** | Session results, topic breakdown | 7-day improvement plan | Validated against catalog |

### 17.4 Personalization engine (non-LLM core)

Build personalization on transparent, testable logic so it is reliable and cheap; use LLMs to explain, not to decide.

- **Skill model (MVP):** per-topic rating updated after each judged attempt using an Elo/Bayesian-style update that accounts for problem difficulty, outcome, attempts, hints used, and time. Include confidence and time decay.
- **Weakness score:** weighted combination of recent failure rate, hint reliance, and low-confidence coverage.
- **Recommendation ranking:** candidate generation (topic gaps, goal/company relevance, unsolved neighbors of solved problems, spaced repetition for failures) then scoring (target difficulty slightly above current skill, diversity constraints, freshness). Explainable reason codes stored with each recommendation.
- **Readiness score:** weighted topic coverage (relative to company/role profile), difficulty mix, consistency over the last 30 days, mock performance, and recency.
- **P2 enhancement:** embedding-based problem similarity and learned ranking from engagement data once sufficient volume exists.

### 17.5 Evaluation and quality

- Golden evaluation sets: 200+ problems with human-labeled ideal hints at each level, common bug scenarios, and tricky cases (prompt-injection in code comments).
- Automated checks before prompt or model changes: leakage rate (full solution at low levels), factual correctness on complexity, JSON validity, latency, and cost.
- Online metrics: helpfulness ratings, "hint then solve" conversion, report rate, repeat usage.
- Human review sample of flagged and random responses weekly.
- Rollouts via feature flags with the admin kill switch.

### 17.6 Cost management

- Per-user daily quotas (e.g., 30 hints, 10 debug sessions free tier; configurable).
- Token budgets per request; context truncation strategies (relevant code regions, summarized history).
- Cache, tiered models, and batch processing for non-interactive jobs (summaries, plans).
- Dashboard of cost per active user and per feature with alerts.

### 17.7 Data and privacy

- User code and conversations are sent only to contracted providers under no-training terms.
- Users can delete AI history; retention limited to 12 months.
- Clear in-product disclosure of AI use and limitations.

---

## 18. Security and Authentication Requirements

### 18.1 Authentication and session management

- Email/password with Argon2id hashing (or managed identity provider), email verification, password strength checks, breached-password screening.
- OAuth 2.0/OIDC: Google and GitHub at launch (LinkedIn as P1).
- Short-lived access tokens (about 15 minutes) and rotating refresh tokens in HttpOnly, Secure, SameSite cookies; refresh-token reuse detection; device/session list with revoke.
- Optional TOTP-based MFA for users (P1); **mandatory MFA for admins**.
- Login throttling, CAPTCHA/bot challenge after repeated failures, account lockout with safe recovery.

### 18.2 Authorization

- RBAC with least privilege; permission checks enforced server-side at the module level, not only in the UI.
- Admin routes on a separate path, with additional IP/device policies optional; all admin actions audited.
- Object-level checks on every resource (users can only read their own private data).

### 18.3 Untrusted code execution (highest risk)

- Sandboxing as described in 16.4 (isolation, no network, resource limits, seccomp, non-root, ephemeral).
- Judge workers run in a separate network segment with no credentials beyond a scoped job-fetch token; no access to the database or internal services.
- Output size limits, process-count limits, and fork-bomb protection.
- Regular patching of sandbox base images; security review and penetration testing of the sandbox before launch.
- Hidden test data never delivered to the client; only judged within workers.

### 18.4 Application security

- OWASP Top 10 mitigations: input validation (schema-based), output encoding, parameterized queries, CSRF protection, secure headers (CSP, HSTS, X-Frame-Options), strict CORS.
- Markdown/HTML sanitization for problem statements, bios, comments, and news summaries.
- Rate limiting at the edge and per endpoint (runs, submits, AI requests, login, signup).
- File uploads (admin test cases, avatars): type/size validation, malware scanning, storage in private buckets, signed URLs.
- Dependency scanning (SCA), SAST/DAST in CI, secret scanning, signed container images.
- Secrets in a managed secret store; rotation policy; no secrets in the repository.

### 18.5 Data protection

- TLS 1.2+ everywhere; encryption at rest for databases, object storage, and backups.
- Field-level protection for sensitive items (email hashing for lookups where appropriate).
- Principle of data minimization: collect only what onboarding and profiles need.
- Account deletion and data export flows (privacy compliance).
- Audit logs immutable and retained for at least 12 months.

### 18.6 Anti-cheating and fair use

- Per-user submission rate limits and concurrency caps.
- Mock/contest integrity signals: tab-visibility changes, paste events, multiple IP/device sessions (logged as signals, not automatic bans).
- Code similarity detection (token-based, e.g., MOSS-like) for contests and mocks; human review before penalties.
- Disposable-email and multi-account heuristics for leaderboard integrity.

### 18.7 Incident response

- Documented runbooks, on-call rotation, security contact (security.txt), responsible disclosure policy, post-incident reviews.

---

## 19. Third-Party Integrations and APIs

| Integration | Purpose | Phase | Notes |
|---|---|---|---|
| **Google / GitHub OAuth** | Sign in and sign up | MVP | LinkedIn OAuth as P1 |
| **LLM provider(s)** (via AI Gateway) | Hints, explanations, debugging, summaries, plans | MVP | Provider-agnostic; contract with no-training terms |
| **Email service** (SES / SendGrid / Resend) | Verification, reset, streak reminders, digests | MVP | Domain authentication (SPF, DKIM, DMARC) |
| **Cloudflare** | CDN, WAF, DDoS, bot protection, Turnstile CAPTCHA | MVP | |
| **Sentry** | Error monitoring | MVP | |
| **PostHog (or Mixpanel/GA4)** | Product analytics, funnels, flags | MVP | Respect consent and DNT |
| **RSS feeds** (curated list of AI/tech sources) | News ingestion | MVP | Respect source terms; summaries and links only |
| **GitHub API** | Releases, trending/open-source updates, profile linking | P1 | Cache aggressively; handle rate limits |
| **News/AI aggregators** (e.g., Hacker News API, arXiv API, Product Hunt) | Additional content | P1 | Verify licensing and terms |
| **LinkedIn** | Share/"add to profile" deep links; optional OAuth | P1 | No scraping; use official share URLs |
| **Payment gateway** (Razorpay/Stripe) | Premium tier (if monetized) | P2 | Not required for MVP |
| **Push notifications** (Web Push/FCM) | Streak and contest reminders | P1 | |
| **Judge0 (optional accelerator)** | Code execution engine for MVP speed | MVP (optional) | Self-hosted; plan migration path to in-house judge if needed |
| **Image generation for OG cards** | Dynamic social previews (Vercel OG or similar) | P1 | |
| **Calendar (ICS)** | Contest reminders | P1 | |

**Internal API conventions:** REST with OpenAPI (versioned `/v1`), cursor-based pagination, consistent error schema, idempotency keys for submissions, WebSocket/SSE channels for realtime. Public API for profile embeds and verification endpoints is read-only and rate limited.

---

## 20. MVP Scope and Future Enhancements

### 20.1 MVP (Phases 0-2): "Practice, get help, prove it"

**In scope**

| Module | MVP features |
|---|---|
| Auth & onboarding | Email + Google/GitHub sign-in, email verification, onboarding with goals, roles (User/Admin) |
| Coding Arena | Problem catalog (~250 curated problems, Easy/Medium/Hard), 4 languages, Monaco editor, Run and Submit, full verdict set, submission history, editorial after solve, drafts autosave, problem versioning |
| Gamification | Points ledger, daily streak, daily challenge, rule-based badge engine (about 20 badges), global leaderboard (weekly/monthly/all-time) |
| AI Assistant | Tiered hints (levels 1-4 with gating), debugging help, code explanation, data-driven weakness identification, rule-based recommendations, quotas, feedback buttons |
| Dashboard | Overview stats, difficulty progress, heatmap, recent submissions, focus areas, badges |
| Developer Profile | Public profile with verified stats, privacy controls, shareable link |
| Interview Prep | Topic-wise DSA roadmaps, company-wise question sets (about 15 companies, curated), mock assessments with report |
| AI & Tech Updates | Curated and RSS-ingested feed, admin review queue, categories, Home widget |
| Contests | Navigation entry plus announcement of upcoming contest; daily-challenge leaderboard |
| Admin Dashboard | User management, problem and test-case management with validation, badge management, core analytics, news management, audit log |
| Platform | Responsive web, dark/light themes, rate limiting, observability, backups, security baseline |

**Explicitly out of MVP:** live contests with ratings, AI learning paths, AI news summaries at scale, OG share cards and embeds, resume PDF, discussion forums, payments, mobile apps, plagiarism detection beyond basic hash checks, AI mock interviewer.

### 20.2 Post-MVP enhancements (prioritized)

| Priority | Enhancement | Value |
|---|---|---|
| **Next (Phase 3)** | Weekly live contests, scoreboards, contest rating; plagiarism detection | Engagement and competition |
| Next | Skill-based rankings and per-topic ratings UI; interview readiness score; streak freezes | Personalization and retention |
| Next | AI learning paths, complexity analysis, AI-generated news summaries and personalized feed | Deeper AI value |
| Next | Shareable profile assets: OG cards, README/LinkedIn embeds, resume one-pager PDF | Proof of Skills growth loop |
| Later (Phase 4) | Discussion forums and solution sharing with moderation; follow other developers | Community |
| Later | Additional languages (Go, Kotlin, C, Rust), custom checkers, interactive problems | Coverage |
| Later | Company-specific mock templates at scale; AI mock interviewer; system design module | Career depth |
| Later | CS fundamentals quizzes (OS, DBMS, CN, OOP), aptitude section for campus placements | Placement-prep completeness |
| Later | Native mobile apps, offline mode, push notifications | Reach |
| Later | Recruiter/college dashboards (institution accounts, cohort analytics, verified credential API) | B2B2C monetization |
| Later | Premium plan (higher AI quotas, advanced analytics, unlimited mocks) | Revenue |
| Later | Learning content: concept notes and short explainers integrated with problems | Learning depth |

**Recommended additions with clear product value** (consistent with the vision): *daily time-boxed "30-minute plan"*, *spaced-repetition revision queue for failed/solved problems*, *institution (college) leaderboards*, *"explain my solution" interview-style prompts that train verbal explanation*.

---

## 21. Development Roadmap

Assumed team (adjustable): 1 PM, 1 designer, 3 full-stack/backend, 2 frontend, 1 AI/ML engineer, 1 DevOps/SRE (part-time to full), 1 QA, 1 content lead. Estimates are indicative.

| Phase | Duration | Objectives | Key deliverables | Exit criteria |
|---|---|---|---|---|
| **Phase 0: Foundations** | Weeks 1-3 | Align and de-risk | Final PRD sign-off, UX research with 10-15 target students, design system and wireframes, architecture decision records, repo/CI/CD/IaC, environments, **judge spike** (sandbox proof-of-concept with security review plan), AI Gateway spike | Judge spike executes 4 languages safely with limits; designs approved for core flows |
| **Phase 1: Core Arena** | Weeks 4-10 | Reliable practice loop | Auth and onboarding, problem catalog and admin problem tooling with validation, editor, Run/Submit, judge workers, verdicts, submission history, drafts, basic dashboard, ~100 problems loaded, observability | End-to-end solve flow works; load test passes (20 submissions/s); security baseline checks done |
| **Phase 2: Engagement, AI, and Proof** | Weeks 11-18 | Motivation, help, and portability | Points, streaks, daily challenge, badge engine and admin, leaderboards, AI hints/debug/explain with quotas and guardrails, weakness identification and rule-based recommendations, public developer profile, topic roadmaps, company sets, mock assessments and reports, news hub with admin queue, ~250 problems, full admin dashboard v1 | **MVP launch** to closed beta (college cohorts), then public; instrumentation complete |
| **Phase 3: Compete and Personalize** | Weeks 19-28 | Retention and differentiation | Weekly contests and ratings, plagiarism detection, readiness score, skill rankings, AI learning paths, complexity analysis, personalized news, share cards/embeds, resume PDF, streak freezes, more languages and problems | Retention and activation targets met; AI quality metrics above thresholds |
| **Phase 4: Scale and Expand** | Weeks 29+ | Growth and monetization | Community features, institution dashboards, premium plan, mobile/PWA enhancements, AI mock interviewer, system design module, performance and cost optimization | Defined by growth metrics and strategy review |

**Parallel workstreams (continuous):** content creation (problems, editorials, company sets), QA automation, security testing, accessibility audits, AI evaluation sets, documentation.

### Team responsibilities at a glance

| Role | Primary responsibilities |
|---|---|
| **UI/UX designer** | Research, IA, design system, flows for sections in section 13; accessibility; admin UX; usability tests each phase |
| **Frontend developer** | Next.js app, editor integration, realtime submission UI, dashboard/profile/AI panels, admin UI, performance budgets, accessibility |
| **Backend developer** | Modules in 16.2, APIs, judge orchestration, event bus consumers, gamification and skill engines, admin APIs, data model and migrations |
| **AI engineer** | AI Gateway, prompt templates, context builders, guardrails, evaluation harness, recommendation/skill model, cost controls, news summarization pipeline |
| **DevOps/SRE** | IaC, CI/CD, judge node isolation and autoscaling, observability, backups, security hardening |
| **QA** | Test strategy, E2E automation, judge correctness suites, load/security test coordination |
| **Content lead** | Problem curation, editorials, company sets, roadmaps, news sources and moderation |

---

## 22. Risks, Challenges, and Dependencies

### 22.1 Risk register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | **Sandbox escape or abuse** of untrusted code execution | Medium | Critical | Defense-in-depth isolation, no network, separate network segment, pen test pre-launch, minimal worker privileges, rapid patching |
| R2 | **Judge instability or slowness** during peaks | Medium | High | Durable queues, autoscaling on queue age, priority lanes, load tests, pre-warm for contests |
| R3 | **Insufficient problem and content quality** (wrong tests, weak editorials) | High | High | Mandatory reference-solution validation, second-reviewer workflow, beta feedback loop, "report problem" button, rejudge tooling |
| R4 | **Content licensing and IP** (company-wise questions, copied problems, news content) | Medium | High | Original or licensed problems only; company sets labeled as community-reported; no full-text news copying; legal review; takedown process |
| R5 | **AI cost overruns** | Medium | High | Quotas, model tiering, caching, cost dashboards and alerts, kill switch |
| R6 | **AI quality and leakage** (hallucinations, revealing full solutions, prompt injection) | High | Medium-High | Output classifiers, evaluation sets, grounding, injection defenses, feedback loop, human review samples |
| R7 | **Cheating and leaderboard gaming** | High | Medium | Rate limits, similarity detection, signals-based review, point revocation tooling |
| R8 | **Cold start** (empty leaderboards, no community) | High | Medium | College partnerships/campus ambassadors, seeded content, weekly contests, institution leaderboards |
| R9 | **Low retention after initial novelty** | Medium | High | Streaks, daily challenge, personalized plans, notifications, contests; instrument and iterate |
| R10 | **Scope creep** (many modules) | High | High | Strict MVP boundary, phased roadmap, modular monolith, weekly scope review |
| R11 | **Privacy and compliance issues** (student data, minors, AI data flows) | Medium | High | Data minimization, consent, deletion flows, provider terms, age gating (18+ or parental policy as required) |
| R12 | **Vendor lock-in or outages** (LLM, auth, cloud) | Medium | Medium | Provider-agnostic AI Gateway, graceful degradation, exportable data |
| R13 | **Profile credibility** (recruiters doubt verification) | Medium | Medium | Transparent verification page, signed credentials (P2), anti-cheat transparency, college/recruiter partnerships |
| R14 | **Team skill gaps** in sandboxing/AI evaluation | Medium | Medium | Early spikes, external security review, consider Judge0 for MVP |

### 22.2 Dependencies

| Dependency | Needed by | Notes |
|---|---|---|
| Judge subsystem | Arena, Gamification, Mock, Contests, Skill model | Highest-priority dependency; spike in Phase 0 |
| Problem catalog and tags | Recommendations, Roadmaps, Company sets, Daily challenge | Content readiness gates MVP |
| Submission events | Points, streaks, badges, skill model, readiness, profile stats | Event bus and idempotent consumers required first |
| Skill model | Personalized recommendations, readiness, AI context | Rule-based version in MVP |
| AI Gateway | All AI features, news summaries, mock plans | Must exist before feature teams build on it |
| Auth and roles | All modules | Foundation |
| Analytics instrumentation | Success metrics, experiments | Build in from Phase 1 |
| Legal/policy (ToS, privacy, content policy) | Public launch | Draft in Phase 1 |
| Content partnerships or editorial team | Company sets, news curation | Staffing or vendor decision by Phase 1 |

### 22.3 Key assumptions

- Initial launch market is primarily India (placement-focused) with English-language content.
- Users are 18+ or covered by an appropriate policy decided before launch.
- Free access at launch; premium monetization deferred.
- LLM providers are available at acceptable cost and latency.

---

## 23. Success Metrics and KPIs

### 23.1 North Star Metric

**Weekly Active Solvers (WAS):** unique users with at least one Accepted submission in a week. It reflects practice value, habit formation, and platform health.

### 23.2 Metrics by area

| Area | KPI | Target (6 months post-launch, indicative) |
|---|---|---|
| **Acquisition** | Signups per week; visitor-to-signup conversion | 8-12% conversion on landing with demo problem |
| **Activation** | % of signups with first Accepted in 24 h | 50%+ |
| **Engagement** | Median problems solved per weekly active user | 5+ |
| | Weekly active users / monthly active users (stickiness) | 40%+ |
| **Retention** | D1 / D7 / D30 retention | 40% / 25% / 15-25% |
| | % of WAU with 3+ day streak | 35%+ |
| **Practice quality** | Judge median verdict time; judge availability | under 4 s; 99.5%+ |
| | Wrong-verdict reports per 10,000 submissions | under 3 |
| **AI** | % WAU using AI weekly | 50%+ |
| | Hint-to-solve conversion (solved within 30 min after a hint) | 35%+ |
| | AI helpfulness rating (thumbs up) | 75%+ |
| | AI cost per weekly active user | Within budget cap |
| | Full-solution leakage rate at levels 1-3 (eval set) | under 1% |
| **Personalization** | Recommendation click-through; attempt rate; solve rate | 40%+ attempt rate |
| **Proof of Skills** | % users with public profile; profile views per profile; external shares | 30%+; tracked; 15%+ |
| **Interview prep** | % of interview-track users completing a mock; readiness score improvement over 4 weeks | 60%+; +15 points average |
| | Self-reported interview/placement outcomes (survey) | Baseline established, positive trend |
| **News** | % WAU opening updates weekly; click-out rate | 30%+; tracked |
| **Admin / Ops** | Time to publish a validated problem; problem defect rate; moderation SLA | under 2 h; under 2%; under 24 h |
| **Reliability** | API p95 latency; error rate; uptime | Per section 9 |
| **Business (future)** | Premium conversion; institution accounts | Defined at monetization phase |

### 23.3 Instrumentation requirements

Track at minimum: `signup_completed`, `onboarding_completed`, `problem_viewed`, `run_clicked`, `submission_created`, `submission_judged(verdict)`, `hint_requested(level)`, `ai_feedback(rating)`, `editorial_unlocked`, `badge_awarded`, `streak_updated`, `profile_published`, `profile_viewed`, `profile_shared`, `mock_started/completed`, `news_opened`, `recommendation_shown/clicked/solved`, `daily_challenge_completed`.

Dashboards: acquisition funnel, activation funnel, retention cohorts, AI quality and cost, judge health, content quality (acceptance rate versus expected difficulty, abandonment per problem).

### 23.4 Release gates

- **Closed beta exit:** activation 40%+, zero critical security issues, judge correctness suite 100% passing, p95 latency within targets.
- **Public launch:** all MVP acceptance criteria met, load test at 2x expected peak, backup restore tested, legal documents published, AI evaluation thresholds met.

---

## 24. Appendix

### 24.1 Module dependency map (build order)

```
Auth/Users -> Problems/Content -> Judge + Submissions -> Event bus
                                         |
          +------------------+-----------+-------------+------------------+
          v                  v                         v                  v
   Gamification        Skill/Recommend.           Dashboard/Profile   Interview/Mock
   (points, streaks,   (skill ratings,            (stats, public      (company sets,
    badges, boards)     weakness, readiness)       profile)            roadmaps, mocks)
          |                  |                         ^                  |
          +--------> AI Orchestrator (uses skill model, context) <-------+
News Hub (independent; optional AI summaries)      Admin (spans all modules)
Contests (after Gamification and Judge priority lanes)
```

### 24.2 Open questions for stakeholders

1. Monetization: free forever, freemium, or institution-led (B2B2C)? This affects quotas and roadmap Phase 4.
2. Content sourcing: in-house authored problems, licensed content, or a hybrid? Who owns editorial quality?
3. Company-wise questions: acceptable provenance and legal posture (community-reported versus licensed)?
4. Languages: is Hindi or other regional-language UI required at launch?
5. Age policy: minimum age and parental consent requirements for student users.
6. Judge approach: build in-house from the start or begin with self-hosted Judge0?
7. Proctoring level for mocks: logging-only (assumed) or webcam proctoring in future?
8. Public profile verification: is a signed, third-party-verifiable credential a requirement for recruiter partnerships?

### 24.3 Glossary

| Term | Meaning |
|---|---|
| Verdict | Outcome of judging a submission (Accepted, Wrong Answer, etc.) |
| Judge | Subsystem that compiles and runs code against tests in a sandbox |
| Checker | Logic that compares program output to expected output |
| Sandbox | Isolated environment with strict resource and permission limits |
| Hint level | Degree of information revealed by the AI (1 nudge to 4 full solution) |
| Readiness score | 0-100 composite estimate of interview preparedness |
| Proof of Skills | Verified, shareable record of a user's achievements |
| AI Gateway | Internal service that mediates all LLM calls |
| MVP | Minimum viable product: scope defined in section 20 |

*End of document.*
