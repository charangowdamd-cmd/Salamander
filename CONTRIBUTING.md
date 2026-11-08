# Contributing to Salamanders

Thank you for your interest in contributing to Salamanders! We welcome contributions to problem definitions, code execution judges, interview tracks, documentation, and UI components.

---

## 1. Development Workflow

### Prerequisites
- Node.js >= 18.17.0
- npm or pnpm
- Python 3 (required for local Python judge tests)

### Local Setup
```bash
git clone https://github.com/charangowdamd-cmd/Salamander.git
cd Salamander
npm install
npm run dev
```

The application will start at `http://localhost:3000`.

---

## 2. Running Judge Verification Tests

Whenever you modify problems, test cases, or the execution engine in `lib/judge.ts`, run the integrity suite:

```bash
npx tsx test-judge.ts
```

All 5 core problems must pass across both JavaScript and Python judges before opening a pull request.

---

## 3. Adding New Problems

To add a new problem to the catalog:
1. Open `lib/data/problems.ts`.
2. Follow the `Problem` interface defined in `lib/types.ts`:
   - Unique `id` and `slug`
   - Precise problem statement, constraints, and formatted examples
   - Starter code templates for Python and JavaScript
   - Balanced test cases (sample cases with `isSample: true`, hidden suites with `isSample: false`)
   - Complete editorial explanation with time and space complexity

---

## 4. Coding Standards

- **TypeScript**: Strict mode enabled. Avoid `any` where possible.
- **Styling**: Tailwind CSS with Hallmark 2.0 design tokens.
- **Design Rules**:
  - Never use `transition: all`.
  - Ensure all interactive elements have `:focus-visible`.
  - Keep navigation labels in sentence case.
  - Use Lucide SVG icons; do not use emojis as functional UI icons.
- **Git Commit Convention**:
  - `feat:` new feature or capability
  - `fix:` bug fix
  - `docs:` documentation improvements
  - `refactor:` code restructuring without feature changes
  - `test:` test suite updates

---

## 5. Submitting a Pull Request

1. Fork the repository and create your feature branch: `git checkout -b feature/my-feature`.
2. Ensure `npm run build` succeeds cleanly.
3. Commit your changes: `git commit -m "feat: add sliding window problem track"`.
4. Push to your branch: `git push origin feature/my-feature`.
5. Open a Pull Request on GitHub describing your changes and verification steps.

