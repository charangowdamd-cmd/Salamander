"use client";

import Link from "next/link";
import { PROBLEMS } from "@/lib/data/problems";
import { useUserStore } from "@/lib/store";
import { 
  Flame, 
  Target, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";

export default function DashboardPage() {
  const { state } = useUserStore();

  const easyTotal = PROBLEMS.filter((p) => p.difficulty === "Easy").length;
  const medTotal = PROBLEMS.filter((p) => p.difficulty === "Medium").length;
  const hardTotal = PROBLEMS.filter((p) => p.difficulty === "Hard").length;

  const easySolved = state.solvedProblems.filter((s) => {
    const p = PROBLEMS.find((x) => x.slug === s);
    return p?.difficulty === "Easy";
  }).length;

  const medSolved = state.solvedProblems.filter((s) => {
    const p = PROBLEMS.find((x) => x.slug === s);
    return p?.difficulty === "Medium";
  }).length;

  const hardSolved = state.solvedProblems.filter((s) => {
    const p = PROBLEMS.find((x) => x.slug === s);
    return p?.difficulty === "Hard";
  }).length;

  const weeks = 26;
  const days = 7;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Developer dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Detailed metrics on problem consistency, topic mastery, and weak-area targeting
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Total solved</span>
          <div className="text-2xl font-black text-white">{state.solvedProblems.length}</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">
            {Math.round((state.solvedProblems.length / PROBLEMS.length) * 100)}% of catalog
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Total points</span>
          <div className="text-2xl font-black text-emerald-400">{state.points}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Verified ledger</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Current streak</span>
          <div className="text-2xl font-black text-amber-400 flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>{state.streak} days</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Longest: {state.longestStreak} days
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Global standing</span>
          <div className="text-2xl font-black text-cyan-400">#4</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Top 1% in college</span>
        </div>
      </div>

      {/* Main Grid: Difficulty Breakdown & Focus Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Difficulty Breakdown */}
        <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white">Difficulty breakdown</h3>

          <div className="space-y-4">
            {/* Easy */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-emerald-400">Easy</span>
                <span className="text-slate-300 font-mono">
                  {easySolved} / {easyTotal}
                </span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(easySolved / (easyTotal || 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-amber-400">Medium</span>
                <span className="text-slate-300 font-mono">
                  {medSolved} / {medTotal}
                </span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${(medSolved / (medTotal || 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-rose-400">Hard</span>
                <span className="text-slate-300 font-mono">
                  {hardSolved} / {hardTotal}
                </span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${(hardSolved / (hardTotal || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Focus Areas */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Focus areas and diagnostics</h3>
          </div>
          <p className="text-xs text-slate-400">
            Derived from test failure patterns, hint dependence, and solution runtimes
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-rose-400 block">Dynamic programming</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tabulation transitions take longer than benchmark averages. Practice unbounded coin change variations.
              </p>
              <Link
                href="/problems/coin-change"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Practice Coin Change</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-amber-400 block">Two pointers (multi-boundary)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Boundary checks and in-place state tracking can be improved for multi-boundary elevation problems.
              </p>
              <Link
                href="/problems/trapping-rain-water"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Practice Trapping Rain Water</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white">Annual practice activity</h3>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1.5 min-w-[700px]">
            {Array.from({ length: weeks }).map((_, w) => (
              <div key={w} className="flex flex-col gap-1.5">
                {Array.from({ length: days }).map((_, d) => {
                  const isActive = (w * 7 + d) % 4 === 0 || (w === weeks - 1 && d >= 4);
                  return (
                    <div
                      key={d}
                      className={`w-3.5 h-3.5 rounded-sm ${
                        isActive
                          ? "bg-emerald-500"
                          : "bg-slate-900 border border-slate-800"
                      }`}
                      title={`Week ${w + 1}, Day ${d + 1}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Recent submissions</h3>
        <div className="divide-y divide-slate-800/80">
          {state.submissions.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              No recent submissions. Try solving your first problem!
            </p>
          ) : (
            state.submissions.slice(0, 8).map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  {s.verdict === "Accepted" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                  <div>
                    <Link
                      href={`/problems/${s.problemSlug}`}
                      className="font-medium text-slate-200 hover:text-emerald-400 transition"
                    >
                      {s.problemTitle}
                    </Link>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {new Date(s.timestamp).toLocaleDateString()} • {s.language}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-semibold ${
                      s.verdict === "Accepted" ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {s.verdict}
                  </span>
                  <div className="text-[10px] text-slate-500">{s.runtimeMs} ms</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
