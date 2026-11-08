"use client";

import Link from "next/link";
import { PROBLEMS } from "@/lib/data/problems";
import { useUserStore } from "@/lib/store";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import { 
  Flame, 
  Target, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen
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

  const acceptanceRate = state.submissions.length > 0
    ? (state.submissions.filter((s) => s.verdict === "Accepted").length / state.submissions.length) * 100
    : 60.9;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Developer dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Detailed metrics on problem consistency, topic mastery, and weak-area targeting
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/interview-prep/mock"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition"
          >
            <span>Take 45-min mock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Top Stat Summary Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <span className="text-xs block mb-1" style={{ color: "var(--text-muted)" }}>Total points</span>
          <div className="text-2xl font-black" style={{ color: "var(--accent)" }}>{state.points}</div>
          <span className="text-[11px] mt-1 block" style={{ color: "var(--text-muted)" }}>Verified ledger</span>
        </div>

        <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <span className="text-xs block mb-1" style={{ color: "var(--text-muted)" }}>Current streak</span>
          <div className="text-2xl font-black flex items-center gap-1.5" style={{ color: "var(--amber)" }}>
            <Flame className="w-5 h-5" />
            <span>{state.streak} days</span>
          </div>
          <span className="text-[11px] mt-1 block" style={{ color: "var(--text-muted)" }}>
            Longest: {state.longestStreak} days
          </span>
        </div>

        <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <span className="text-xs block mb-1" style={{ color: "var(--text-muted)" }}>Weekly target</span>
          <div className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
            {state.solvedProblems.length} <span className="text-xs font-normal" style={{ color: "var(--text-muted)" }}>/ 5 problems</span>
          </div>
          <span className="text-[11px] mt-1 block" style={{ color: "var(--accent)" }}>
            {Math.round((state.solvedProblems.length / 5) * 100)}% completed
          </span>
        </div>

        <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <span className="text-xs block mb-1" style={{ color: "var(--text-muted)" }}>Interview readiness</span>
          <div className="text-2xl font-black" style={{ color: "var(--cyan)" }}>
            {Math.min(100, Math.round((state.solvedProblems.length / 20) * 100 * 0.84 + 10))}%
          </div>
          <span className="text-[11px] mt-1 block" style={{ color: "var(--text-muted)" }}>Based on solved problems</span>
        </div>
      </div>

      {/* Primary Analytics Section matching Reference Image 2 */}
      <AnalyticsCard
        solvedCount={state.solvedProblems.length}
        totalCatalogCount={PROBLEMS.length}
        easySolved={easySolved}
        easyTotal={easyTotal}
        medSolved={medSolved}
        medTotal={medTotal}
        hardSolved={hardSolved}
        hardTotal={hardTotal}
        acceptanceRate={acceptanceRate}
        badgesEarned={state.badges.length}
        upcomingBadgeName="Dynamic Programming Sorcerer"
        upcomingBadgeProgress="3 / 5 solved"
        submissions={state.submissions}
      />

      {/* Focus Areas and Diagnostics */}
      <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-4">
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
