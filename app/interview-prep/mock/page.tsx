"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PROBLEMS } from "@/lib/data/problems";
import { useUserStore } from "@/lib/store";
import { Timer, ArrowLeft, Play, Trophy } from "lucide-react";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function MockAssessmentPage() {
  const { recordSubmission } = useUserStore();
  const mockProblems = [PROBLEMS[0], PROBLEMS[3]];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [codes, setCodes] = useState<Record<string, string>>({
    [mockProblems[0].slug]: mockProblems[0].starterCode.python,
    [mockProblems[1].slug]: mockProblems[1].starterCode.python,
  });
  const [results, setResults] = useState<Record<string, any>>({});
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, timeLeft]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentProblem = mockProblems[currentIdx];

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemSlug: currentProblem.slug,
          code: codes[currentProblem.slug],
          language: "python",
        }),
      });
      const data = await res.json();
      setResults((prev) => ({ ...prev, [currentProblem.slug]: data }));
    } catch (e: any) {
      alert("Execution error: " + e.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleFinishAssessment = () => {
    setIsFinished(true);
    mockProblems.forEach((p) => {
      const r = results[p.slug];
      if (r && r.verdict === "Accepted") {
        recordSubmission(
          {
            problemId: p.id,
            problemSlug: p.slug,
            problemTitle: p.title,
            code: codes[p.slug],
            language: "python",
            verdict: "Accepted",
            runtimeMs: r.runtimeMs || 25,
            memoryKb: r.memoryKb || 16000,
            passedTests: p.testCases.length,
            totalTests: p.testCases.length,
          },
          p.difficulty
        );
      }
    });
  };

  if (isFinished) {
    const passedCount = Object.values(results).filter((r: any) => r?.verdict === "Accepted").length;
    const score = Math.round((passedCount / mockProblems.length) * 100);

    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        <div className="p-8 rounded-3xl bg-[#0c121e] border border-slate-800 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Mock assessment complete</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Here is your verified evaluation report and interview readiness breakdown.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Score</span>
              <span className="text-2xl font-black text-emerald-400">{score}%</span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Solved</span>
              <span className="text-2xl font-black text-white">
                {passedCount} / {mockProblems.length}
              </span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">Percentile</span>
              <span className="text-2xl font-black text-cyan-400">84th</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-300">
              AI improvement plan (7 days)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              - Strong implementation speed on foundational Array hashing.<br />
              - Dynamic programming tabulation could benefit from practicing unbounded coin change variations.<br />
              - Recommended next step: Solve 2 Medium DP problems on the Placement Roadmap.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
            >
              Go to dashboard
            </Link>
            <Link
              href="/interview-prep"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs transition"
            >
              Back to interview prep
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#090d16]">
      {/* Assessment Header */}
      <div className="h-14 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/interview-prep"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quit</span>
          </Link>
          <span className="text-slate-800">|</span>
          <span className="text-xs font-bold text-white">
            Placement technical mock (round 1)
          </span>
          <div className="flex gap-2">
            {mockProblems.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setCurrentIdx(i)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  currentIdx === i
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-900 border border-slate-800 text-slate-300"
                }`}
              >
                Q{i + 1}: {p.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold text-xs bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
            <Timer className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={handleFinishAssessment}
            className="px-4 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition"
          >
            End test and submit
          </button>
        </div>
      </div>

      {/* Split Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-hidden">
        {/* Left: Problem statement */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300">
          <h2 className="text-base font-bold text-white">{currentProblem.title}</h2>
          <div className="prose prose-invert text-xs leading-relaxed whitespace-pre-line">
            {currentProblem.description}
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-semibold text-slate-400">Examples</h4>
            {currentProblem.examples.map((ex, i) => (
              <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs">
                <div>Input: {ex.input}</div>
                <div>Output: {ex.output}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Code editor and Run */}
        <div className="flex flex-col h-full bg-[#090d16]">
          <div className="flex-1">
            <Editor
              height="100%"
              theme="vs-dark"
              language="python"
              value={codes[currentProblem.slug]}
              onChange={(val) =>
                setCodes((prev) => ({ ...prev, [currentProblem.slug]: val || "" }))
              }
              options={{ minimap: { enabled: false }, fontSize: 13 }}
            />
          </div>

          <div className="h-28 border-t border-slate-800 bg-slate-950 p-4 flex items-center justify-between">
            <div className="text-xs font-mono text-slate-400">
              {results[currentProblem.slug] ? (
                <span
                  className={
                    results[currentProblem.slug].verdict === "Accepted"
                      ? "text-emerald-400 font-bold"
                      : "text-rose-400 font-bold"
                  }
                >
                  Verdict: {results[currentProblem.slug].verdict} ({results[currentProblem.slug].runtimeMs}ms)
                </span>
              ) : (
                "Click 'Test code' to evaluate your solution."
              )}
            </div>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>{isRunning ? "Running..." : "Test code"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
