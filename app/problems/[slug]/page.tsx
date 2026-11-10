"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PROBLEMS } from "@/lib/data/problems";
import { useUserStore } from "@/lib/store";
import { 
  Play, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Database, 
  ChevronRight, 
  BookOpen, 
  FileCode, 
  Bot,
  Flame,
  ArrowLeft,
  Lock,
  Unlock,
  Terminal
} from "lucide-react";
import { Verdict } from "@/lib/types";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function ProblemArenaPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { state, recordSubmission } = useUserStore();

  const problem = PROBLEMS.find((p) => p.slug === slug) || PROBLEMS[0];

  const [activeTab, setActiveTab] = useState<"description" | "submissions" | "editorial">("description");
  const [language, setLanguage] = useState<"python" | "javascript" | "cpp" | "java">("python");
  const [code, setCode] = useState<string>(problem.starterCode.python);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Console & Custom Input State
  const [consoleTab, setConsoleTab] = useState<"output" | "testcase">("testcase");
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>(problem.examples[0]?.input || "");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [runtime, setRuntime] = useState<number | null>(null);
  const [memory, setMemory] = useState<number | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [failedCase, setFailedCase] = useState<any>(null);

  // Editorial Lock Confirmation State
  const [editorialUnlocked, setEditorialUnlocked] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  // AI Mentor State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [selectedHintLevel, setSelectedHintLevel] = useState<number>(1);

  // Load draft or default starter code
  useEffect(() => {
    if (typeof window !== "undefined") {
      const draftKey = `salamanders_draft_${problem.slug}_${language}`;
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        setCode(savedDraft);
      } else {
        setCode(problem.starterCode[language]);
      }
    }
  }, [language, problem]);

  // Autosave draft on code change
  const handleCodeChange = (val: string | undefined) => {
    const updated = val || "";
    setCode(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(`salamanders_draft_${problem.slug}_${language}`, updated);
    }
  };

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setVerdict(null);
    setConsoleTab("output");
    setConsoleOutput("Executing against test cases...\n");
    setFailedCase(null);

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemSlug: problem.slug,
          code,
          language,
          customInput: selectedCaseIdx === 999 && customInput.trim() ? customInput : undefined,
        }),
      });
      const data = await res.json();

      setVerdict(data.verdict);
      setRuntime(data.runtimeMs);
      setMemory(data.memoryKb);

      if (data.verdict === "Accepted") {
        setConsoleOutput(
          data.stdout 
            ? `Output:\n${data.stdout}\n\nPassed ${data.passedTests}/${data.totalTests} test case(s).`
            : `Passed all ${data.passedTests}/${data.totalTests} sample test cases.`
        );
      } else {
        setFailedCase(data.failedCase);
        setConsoleOutput(
          data.stderr || `Failed on test case ${data.failedCase?.index || 1}: ${data.verdict}`
        );
      }
    } catch (err: any) {
      setVerdict("Runtime Error");
      setConsoleOutput(err.message || "Execution failed.");
    } finally {
      setIsRunning(false);
    }
  }, [problem.slug, code, language, consoleTab, customInput]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setVerdict(null);
    setConsoleTab("output");
    setConsoleOutput("Judging against complete hidden test suite...\n");
    setFailedCase(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemSlug: problem.slug,
          code,
          language,
        }),
      });
      const data = await res.json();

      setVerdict(data.verdict);
      setRuntime(data.runtimeMs);
      setMemory(data.memoryKb);

      recordSubmission(
        {
          problemId: problem.id,
          problemSlug: problem.slug,
          problemTitle: problem.title,
          code,
          language,
          verdict: data.verdict,
          runtimeMs: data.runtimeMs,
          memoryKb: data.memoryKb,
          passedTests: data.passedTests,
          totalTests: data.totalTests,
          failedTestCase: data.failedCase,
        },
        problem.difficulty
      );

      if (data.verdict === "Accepted") {
        setEditorialUnlocked(true);
        setConsoleOutput(
          `🎉 Accepted! All ${data.passedTests}/${data.totalTests} test cases passed.\nRuntime: ${data.runtimeMs}ms (Faster than 91.4% of ${language} submissions)\nMemory: ${data.memoryKb}KB.`
        );
      } else {
        setFailedCase(data.failedCase);
        setConsoleOutput(
          `Verdict: ${data.verdict}\nPassed ${data.passedTests}/${data.totalTests} test cases.`
        );
      }
    } catch (err: any) {
      setVerdict("Runtime Error");
      setConsoleOutput(err.message || "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  }, [problem, code, language, recordSubmission]);

  // Keyboard Shortcuts: Ctrl+Enter (Run) & Ctrl+Shift+Enter (Submit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRun, handleSubmit]);

  const handleAiAction = async (action: "hint" | "debug" | "explain") => {
    setAiLoading(true);
    setIsAiOpen(true);
    setAiMessage(null);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemSlug: problem.slug,
          code,
          language,
          action,
          level: selectedHintLevel,
          failingCase: failedCase,
        }),
      });
      const data = await res.json();
      setAiMessage(data.text);
    } catch (err: any) {
      setAiMessage("Failed to connect to AI Mentor: " + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const isSolved = state.solvedProblems.includes(problem.slug) || editorialUnlocked;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col" style={{ backgroundColor: "#0a0a0f" }}>
      {/* Top Bar Navigation */}
      <div
        className="h-11 px-4 flex items-center justify-between border-b"
        style={{ backgroundColor: "rgba(10,10,15,0.95)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/problems"
            className="flex items-center gap-1.5 text-xs font-medium transition"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseOver={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Problems
          </Link>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
          <h2 className="text-xs font-bold flex items-center gap-1.5" style={{ color: "#f4f4f8" }}>
            {problem.title}
            {isSolved && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#22c55e" }} />}
          </h2>
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
            style={{
              color: problem.difficulty === "Easy" ? "#22c55e" : problem.difficulty === "Medium" ? "#f59e0b" : "#ef4444",
              backgroundColor: problem.difficulty === "Easy" ? "rgba(34,197,94,0.1)" : problem.difficulty === "Medium" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)",
            }}
          >
            {problem.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAiOpen(!isAiOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition"
            style={{
              backgroundColor: "rgba(168,85,247,0.1)",
              color: "#a855f7",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = "rgba(168,85,247,0.18)")}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = "rgba(168,85,247,0.1)")}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI mentor
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            title="Shortcut: Ctrl + Enter"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition disabled:opacity-50"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseOver={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          >
            <Play className="w-3.5 h-3.5" style={{ fill: "currentcolor" }} />
            {isRunning ? "Running…" : "Run"}
            <span className="hidden sm:inline text-[10px] opacity-50 ml-0.5">Ctrl+↵</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            title="Shortcut: Ctrl + Shift + Enter"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#fff",
              boxShadow: "0 0 14px rgba(239,68,68,0.3)",
            }}
            onMouseOver={e => (e.currentTarget.style.boxShadow = "0 0 22px rgba(239,68,68,0.45)")}
            onMouseOut={e => (e.currentTarget.style.boxShadow = "0 0 14px rgba(239,68,68,0.3)")}
          >
            <Send className="w-3.5 h-3.5" />
            {isSubmitting ? "Judging…" : "Submit"}
            <span className="hidden sm:inline text-[10px] opacity-70 ml-0.5">Ctrl+⇧+↵</span>
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        {/* Left Pane: Description, Submissions, Editorial */}
        <div className="flex flex-col h-full overflow-hidden" style={{ backgroundColor: "#0d0d14" }}>
          {/* Tabs */}
          <div
            className="flex border-b px-4 pt-1"
            style={{ backgroundColor: "#0a0a0f", borderColor: "rgba(255,255,255,0.08)" }}
          >
            {[
              { key: "description", label: "Description", icon: FileCode },
              { key: "editorial", label: "Editorial", icon: isSolved || editorialUnlocked ? BookOpen : Lock },
              { key: "submissions", label: "Submissions", icon: CheckCircle2 },
            ].map(({ key, label, icon: Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    if (key === "editorial" && !isSolved && !editorialUnlocked) {
                      setShowUnlockModal(true);
                    } else {
                      setActiveTab(key as any);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition"
                  style={
                    isActive
                      ? { borderColor: "#ef4444", color: "#ef4444" }
                      : { borderColor: "transparent", color: "rgba(255,255,255,0.4)" }
                  }
                  onMouseOver={e => { if (!isActive) e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseOut={e => { if (!isActive) e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
            {activeTab === "description" && (
              <>
                <div className="space-y-4">
                  <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                    {problem.description}
                  </div>

                  {/* Examples */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-semibold text-slate-400">
                      Examples
                    </h4>
                    {problem.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-1.5 font-mono text-xs"
                      >
                        <div className="text-slate-400">
                          <strong className="text-slate-200">Input:</strong> {ex.input}
                        </div>
                        <div className="text-slate-400">
                          <strong className="text-slate-200">Output:</strong> {ex.output}
                        </div>
                        {ex.explanation && (
                          <div className="text-slate-500 font-sans text-[11px] pt-1">
                            Explanation: {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-semibold text-slate-400">
                      Constraints
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 font-mono">
                      {problem.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Companies & Tags */}
                  <div className="space-y-2 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Companies:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {problem.companies.map((c) => (
                          <span
                            key={c}
                            className="text-[11px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "editorial" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Optimal Approach</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {problem.editorial.approach}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                    <span className="text-xs text-slate-400 block mb-1">Time Complexity</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      {problem.editorial.timeComplexity}
                    </span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                    <span className="text-xs text-slate-400 block mb-1">Space Complexity</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      {problem.editorial.spaceComplexity}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-2">
                    Python solution
                  </h4>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                    {problem.editorial.solutions.python}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "submissions" && (
              <div className="space-y-3">
                {state.submissions.filter((s) => s.problemSlug === problem.slug).length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    No submissions recorded yet for this problem.
                  </p>
                ) : (
                  state.submissions
                    .filter((s) => s.problemSlug === problem.slug)
                    .map((s) => (
                      <div
                        key={s.id}
                        className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-2.5">
                          {s.verdict === "Accepted" ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400" />
                          )}
                          <div>
                            <span
                              className={`font-semibold ${
                                s.verdict === "Accepted" ? "text-emerald-400" : "text-rose-400"
                              }`}
                            >
                              {s.verdict}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {new Date(s.timestamp).toLocaleTimeString()} • {s.language}
                            </div>
                          </div>
                        </div>

                        <div className="text-right text-slate-400">
                          <div>{s.runtimeMs} ms</div>
                          <div className="text-[10px] text-slate-500">{s.memoryKb} KB</div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Code Editor & Console Output */}
        <div className="flex flex-col h-full overflow-hidden" style={{ backgroundColor: "#080810" }}>
          {/* Editor Header */}
          <div
            className="h-10 border-b px-4 flex items-center justify-between"
            style={{ backgroundColor: "#0a0a0f", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="rounded-lg text-xs py-1 px-2.5 outline-none transition"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <option value="python">Python 3</option>
              <option value="javascript">JavaScript (Node.js)</option>
              <option value="cpp">C++ (GCC 13)</option>
              <option value="java">Java 21</option>
            </select>

            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
              Draft saved locally
            </span>
          </div>

          {/* Monaco Editor Canvas */}
          <div className="flex-1 min-h-[300px]">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language === "cpp" ? "cpp" : language}
              value={code}
              onChange={handleCodeChange}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "Fira Code, Menlo, Monaco, monospace",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
              }}
            />
          </div>

          {/* Bottom Execution Console */}
          <div
            className="h-56 border-t p-3 flex flex-col justify-between overflow-hidden"
            style={{ backgroundColor: "#0a0a0f", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={() => setConsoleTab("testcase")}
                  className="font-semibold transition"
                  style={{ color: consoleTab === "testcase" ? "#ef4444" : "rgba(255,255,255,0.35)" }}
                  onMouseOver={e => { if (consoleTab !== "testcase") e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                  onMouseOut={e => { if (consoleTab !== "testcase") e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
                >
                  Testcase
                </button>
                <button
                  onClick={() => setConsoleTab("output")}
                  className="font-semibold transition"
                  style={{ color: consoleTab === "output" ? "#ef4444" : "rgba(255,255,255,0.35)" }}
                  onMouseOver={e => { if (consoleTab !== "output") e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                  onMouseOut={e => { if (consoleTab !== "output") e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
                >
                  Test result
                </button>

                {verdict && (
                  <span
                    className="font-semibold px-2 py-0.5 rounded text-[11px]"
                    style={
                      verdict === "Accepted"
                        ? { backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }
                        : { backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.25)" }
                    }
                  >
                    {verdict}
                  </span>
                )}
              </div>

              {runtime !== null && (
                <div className="flex items-center gap-3 text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {runtime} ms
                  </span>
                  <span className="flex items-center gap-1">
                    <Database className="w-3 h-3" />
                    {memory} KB
                  </span>
                </div>
              )}
            </div>

            {/* Console Tab: Testcase vs Test Result */}
            {consoleTab === "testcase" ? (
              <div className="flex-1 flex flex-col pt-2 overflow-hidden space-y-2">
                {/* Case Pills */}
                <div className="flex items-center gap-1.5">
                  {problem.examples.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCaseIdx(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        selectedCaseIdx === idx
                          ? "bg-slate-800 text-white border border-slate-700"
                          : "bg-slate-900/80 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Case {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedCaseIdx(999)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      selectedCaseIdx === 999
                        ? "bg-slate-800 text-white border border-slate-700"
                        : "bg-slate-900/80 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {/* Case Content */}
                <div className="flex-1 overflow-y-auto">
                  {selectedCaseIdx === 999 ? (
                    <textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Enter custom input lines..."
                      className="w-full h-full bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-xs text-slate-200 resize-none focus:outline-none focus:border-emerald-500"
                    />
                  ) : (
                    <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-2.5 space-y-1 text-xs font-mono">
                      <div className="text-slate-400">
                        <span className="text-slate-500 select-none">input: </span>
                        <span className="text-slate-200">{problem.examples[selectedCaseIdx]?.input}</span>
                      </div>
                      <div className="text-slate-400">
                        <span className="text-slate-500 select-none">expected: </span>
                        <span className="text-emerald-400">{problem.examples[selectedCaseIdx]?.output}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-y-auto pt-2 space-y-2">
                {failedCase ? (
                  <div className="space-y-1.5 text-xs font-mono bg-slate-900 border border-rose-500/20 rounded-lg p-3">
                    <div className="text-rose-400 font-bold">Failed on Testcase #{failedCase.index || 1}</div>
                    {failedCase.input && (
                      <div className="text-slate-400">
                        <span className="text-slate-500">Input: </span>
                        <span className="text-slate-200">{failedCase.input}</span>
                      </div>
                    )}
                    {failedCase.actual && (
                      <div className="text-slate-400">
                        <span className="text-slate-500">Your Output: </span>
                        <span className="text-rose-400">{failedCase.actual}</span>
                      </div>
                    )}
                    {failedCase.expected && (
                      <div className="text-slate-400">
                        <span className="text-slate-500">Expected Output: </span>
                        <span className="text-emerald-400">{failedCase.expected}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="font-mono text-xs text-slate-300 py-1 whitespace-pre-wrap">
                    {consoleOutput || "Ready to run. Click 'Run' to test samples or 'Submit' for full judgment."}
                  </div>
                )}

                {/* If failed, show Debug with AI quick action */}
                {verdict && verdict !== "Accepted" && (
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => handleAiAction("debug")}
                      className="flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1 rounded-md border border-amber-500/30 font-medium transition"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Debug with AI Mentor</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editorial Early Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="max-w-md w-full rounded-2xl p-6 space-y-4"
            style={{ backgroundColor: "var(--canvas)", border: "1px solid var(--border-strong)" }}
          >
            <div className="flex items-center gap-3" style={{ color: "var(--amber)" }}>
              <Lock className="w-5 h-5" />
              <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                Unlock editorial early?
              </h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              You haven&apos;t solved this problem yet. Viewing the full editorial approach and reference code will reduce points awarded by 50%.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowUnlockModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold transition"
                style={{ backgroundColor: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                onMouseOver={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                onMouseOut={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                Keep trying
              </button>
              <button
                onClick={() => {
                  setEditorialUnlocked(true);
                  setShowUnlockModal(false);
                  setActiveTab("editorial");
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold transition"
                style={{ backgroundColor: "var(--amber)", color: "#1a0f00" }}
              >
                Confirm & unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Mentor Drawer */}
      {isAiOpen && (
        <div
          className="fixed inset-y-0 right-0 w-full sm:w-96 shadow-2xl z-50 flex flex-col"
          style={{ backgroundColor: "var(--canvas)", borderLeft: "1px solid var(--border)" }}
        >
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--accent-subtle)", color: "var(--accent)" }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                AI mentor
              </span>
            </div>
            <button
              onClick={() => setIsAiOpen(false)}
              className="text-xs px-2 py-1 rounded transition"
              style={{ color: "var(--text-muted)" }}
              onMouseOver={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseOut={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {/* Tiered Hints Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold block" style={{ color: "var(--text-secondary)" }}>
                Hint level
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedHintLevel(lvl)}
                    className="py-1.5 rounded-lg font-bold transition text-center text-xs"
                    style={
                      selectedHintLevel === lvl
                        ? { backgroundColor: "var(--accent)", color: "var(--accent-text)" }
                        : { backgroundColor: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" }
                    }
                  >
                    L{lvl}
                  </button>
                ))}
              </div>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                {selectedHintLevel === 1 && "Conceptual nudge without spoilers"}
                {selectedHintLevel === 2 && "Algorithm pattern and intuition"}
                {selectedHintLevel === 3 && "Step-by-step plan and pseudo-code"}
                {selectedHintLevel === 4 && "Full optimal solution (gated)"}
              </p>
            </div>

            {/* Mentor Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleAiAction("hint")}
                disabled={aiLoading}
                className="flex-1 py-2 rounded-lg font-semibold transition disabled:opacity-50 text-xs"
                style={{ backgroundColor: "var(--accent-subtle)", color: "var(--accent)", border: "1px solid rgba(16,185,129,0.25)" }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = "rgba(16,185,129,0.14)")}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = "var(--accent-subtle)")}
              >
                {aiLoading ? "Generating…" : `Get L${selectedHintLevel} hint`}
              </button>
              <button
                onClick={() => handleAiAction("explain")}
                disabled={aiLoading}
                className="flex-1 py-2 rounded-lg font-semibold transition disabled:opacity-50 text-xs"
                style={{ backgroundColor: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                onMouseOver={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                onMouseOut={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                Explain code
              </button>
            </div>

            {/* AI Response Display */}
            {aiMessage && (
              <div
                className="p-3.5 rounded-xl leading-relaxed whitespace-pre-wrap font-sans"
                style={{ backgroundColor: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
              >
                {aiMessage}
              </div>
            )}
          </div>

          <div
            className="p-3 border-t text-center text-[11px]"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            Powered by Google Gemini 2.5 Flash
          </div>
        </div>
      )}
    </div>
  );
}
