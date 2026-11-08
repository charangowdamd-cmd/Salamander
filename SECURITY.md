# Security Policy

## 1. Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

---

## 2. Code Execution Sandbox & Threat Model

Salamanders executes user-submitted code in JavaScript and Python to provide instant test evaluation. To protect the host system and multi-tenant environment, the execution engine enforces the following security boundaries:

1. **Static Analysis Screening**:
   - Rejects code importing dangerous system modules:
     - Node.js: `child_process`, `fs`, `net`, `http`, `https`, `os`, `cluster`, `eval`, `process.exit`, `process.kill`.
     - Python: `os`, `subprocess`, `sys`, `socket`, `shutil`, `pty`, `ctypes`, `__import__`.
2. **Process Resource Caps**:
   - 4,000ms hard timeout per test case (`SIGTERM` termination).
   - Node.js max heap allocation limited to 128MB (`--max-old-space-size=128`).
   - Disallowed code generation from strings in JavaScript (`--disallow-code-generation-from-strings`).
3. **Buffer Clamping**:
   - Maximum stdout buffer size capped at 256KB to mitigate memory bomb attacks.
   - Output responses truncated to 8KB before serialization.
4. **Isolated Temp Directories**:
   - Each submission is written to an ephemeral directory in `os.tmpdir()` and purged immediately after execution.

---

## 3. Reporting a Vulnerability

If you discover a security vulnerability or sandbox escape vector:
- **Do not open a public issue.**
- Email the security team directly at `charangowdamd@gmail.com` with:
  - Description of the vulnerability.
  - Reproducible proof of concept (PoC) code.
  - Potential impact assessment.
- We will acknowledge receipt within 48 hours and work with you on a coordinated disclosure timeline.

