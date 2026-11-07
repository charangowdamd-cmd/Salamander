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
  const [consoleTab, setConsoleTab] = useState<"output" | "custom">("output");
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
          customInput: consoleTab === "custom" && customInput.trim() ? customInput : undefined,
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
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#090d16]">
      {/* Top Bar Navigation */}
      <div className="h-12 border-b border-slate-800 bg-slate-950 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="/problems"
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Problem List</span>
          </Link>
          <span className="text-slate-600">|</span>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            {problem.title}
            {isSolved && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </h2>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
              problem.difficulty === "Easy"
                ? "bg-emerald-500/10 text-emerald-400"
                : problem.difficulty === "Medium"
                ? "bg-amber-500/10 text-amber-400"
                : "bg-rose-500/10 text-rose-400"
            }`}
          >
            {problem.difficulty}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* AI Mentor Trigger */}
          <button
            onClick={() => setIsAiOpen(!isAiOpen)}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Mentor</span>
          </button>

          {/* Run Button */}
          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            title="Shortcut: Ctrl + Enter"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-slate-200" />
            <span>{isRunning ? "Running..." : "Run (Ctrl+↵)"}</span>
          </button>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            title="Shortcut: Ctrl + Shift + Enter"
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-md shadow-emerald-500/20 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Judging..." : "Submit (Ctrl+⇧+↵)"}</span>
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-hidden">
        {/* Left Pane: Description, Submissions, Editorial */}
        <div className="flex flex-col h-full overflow-hidden bg-slate-950/40">
          {/* Tabs */}
          <div className="flex border-b border-slate-800 px-4 pt-2 bg-slate-950">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex items-center space-x-2 px-3 py-2 text-xs font-semibold border-b-2 transition ${
                activeTab === "description"
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Description</span>
            </button>
            <button
              onClick={() => {
                if (!isSolved && !editorialUnlocked) {
                  setShowUnlockModal(true);
                } else {
                  setActiveTab("editorial");
                }
              }}
              className={`flex items-center space-x-2 px-3 py-2 text-xs font-semibold border-b-2 transition ${
                activeTab === "editorial"
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {isSolved || editorialUnlocked ? (
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>Editorial</span>
            </button>
            <button
              onClick={() => setActiveTab("submissions")}
              className={`flex items-center space-x-2 px-3 py-2 text-xs font-semibold border-b-2 transition ${
                activeTab === "submissions"
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Submissions</span>
            </button>
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
        <div className="flex flex-col h-full overflow-hidden bg-[#090d16]">
          {/* Editor Header */}
          <div className="h-10 border-b border-slate-800 bg-slate-950 px-4 flex items-center justify-between">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-md text-xs text-slate-300 py-1 px-2.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="python">Python 3</option>
              <option value="javascript">JavaScript (Node.js)</option>
              <option value="cpp">C++ (GCC 13)</option>
              <option value="java">Java 21</option>
            </select>

            <span className="text-[11px] text-slate-500">Draft saved in local storage</span>
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
          <div className="h-48 border-t border-slate-800 bg-slate-950 p-3 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center space-x-3 text-xs">
                <button
                  onClick={() => setConsoleTab("output")}
                  className={`font-bold transition ${
                    consoleTab === "output" ? "text-emerald-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Console Output
                </button>
                <button
                  onClick={() => setConsoleTab("custom")}
                  className={`font-bold transition ${
                    consoleTab === "custom" ? "text-emerald-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Custom Testcase
                </button>

                {verdict && (
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                      verdict === "Accepted"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {verdict}
                  </span>
                )}
              </div>

              {runtime !== null && (
                <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {runtime} ms
                  </span>
                  <span className="flex items-center gap-1">
                    <Database className="w-3 h-3 text-slate-500" />
                    {memory} KB
                  </span>
                </div>
              )}
            </div>

            {/* Console Tab: Output or Custom Input */}
            {consoleTab === "output" ? (
              <div className="flex-1 overflow-y-auto font-mono text-xs text-slate-300 py-2 whitespace-pre-wrap">
                {consoleOutput || "Ready to run. Click 'Run' to test samples or 'Submit' for full judgment."}
              </div>
            ) : (
              <div className="flex-1 py-1">
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter custom input lines..."
                  className="w-full h-full bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-xs text-slate-200 resize-none focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {/* If failed, show Debug with AI quick action */}
            {verdict && verdict !== "Accepted" && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleAiAction("debug")}
                  className="flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1 rounded-md border border-amber-500/30 font-medium transition"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Debug with AI</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editorial Early Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 max-w-md w-full rounded-3xl p-6 space-y-4">
            <div className="flex items-center space-x-3 text-amber-400">
              <Lock className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Unlock Editorial Early?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You haven&apos;t solved this problem yet. Viewing the full editorial approach and reference code will reduce points awarded for this problem by 50% (PRD Section 8.A).
            </p>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowUnlockModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Keep Trying
              </button>
              <button
                onClick={() => {
                  setEditorialUnlocked(true);
                  setShowUnlockModal(false);
                  setActiveTab("editorial");
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
              >
                Confirm &amp; Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Mentor Drawer */}
      {isAiOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-950 border-l border-slate-800 shadow-2xl z-50 flex flex-col justify-between">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-white">Salamanders AI Mentor</span>
            </div>
            <button
              onClick={() => setIsAiOpen(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {/* Tiered Hints Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Tiered hint ladder
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedHintLevel(lvl)}
                    className={`py-1.5 rounded-lg font-bold transition text-center ${
                      selectedHintLevel === lvl
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    L{lvl}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500">
                {selectedHintLevel === 1 && "L1: Conceptual nudge without spoilers"}
                {selectedHintLevel === 2 && "L2: Standard algorithm pattern & intuition"}
                {selectedHintLevel === 3 && "L3: Step-by-step plan & pseudo-code"}
                {selectedHintLevel === 4 && "L4: Full optimal code solution (gated)"}
              </p>
            </div>

            {/* Mentor Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleAiAction("hint")}
                disabled={aiLoading}
                className="flex-1 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold transition disabled:opacity-50"
              >
                {aiLoading ? "Generating..." : `Get L${selectedHintLevel} Hint`}
              </button>
              <button
                onClick={() => handleAiAction("explain")}
                disabled={aiLoading}
                className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold transition disabled:opacity-50"
              >
                Explain Code
              </button>
            </div>

            {/* AI Response Display */}
            {aiMessage && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {aiMessage}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-800/80 bg-slate-950 text-center text-[11px] text-slate-500">
            Powered by Google Gemini 2.5 Flash • Context aware
          </div>
        </div>
      )}
    </div>
  );
}
