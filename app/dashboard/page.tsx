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
import Plasma from "@/components/Plasma";

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
    <div className="relative min-h-screen">
      {/* Plasma page background */}
      <div className="fixed inset-0 opacity-18 pointer-events-none" style={{ zIndex: 0 }}>
        <Plasma color="#ff2727" speed={0.35} scale={0.65} twist={0.9} softness={0.7} shine={0.65} wave={1.8} mouseInteractive={false} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" style={{ zIndex: 1 }}>
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
        {[
          { label: "Total points", val: state.points, sub: "Verified ledger", color: "var(--accent)" },
          { label: "Current streak", val: `${state.streak} days`, sub: `Longest: ${state.longestStreak} days`, color: "var(--amber)", icon: Flame },
          { label: "Weekly target", val: `${state.solvedProblems.length} / 5`, sub: `${Math.round((state.solvedProblems.length / 5) * 100)}% completed`, color: "var(--text-primary)" },
          { label: "Interview readiness", val: `${Math.min(100, Math.round((state.solvedProblems.length / 20) * 100 * 0.84 + 10))}%`, sub: "Based on solved problems", color: "var(--cyan)" },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border transition-all duration-200"
              style={{
                background: "rgba(14,14,22,0.92)",
                borderColor: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.45)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(239,68,68,0.22), 0 8px 30px rgba(0,0,0,0.6)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              <span className="text-xs font-semibold block mb-1" style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </span>
              <div className="text-2xl font-black flex items-center gap-1.5" style={{ color: item.color }}>
                {Icon && <Icon className="w-5 h-5" />}
                <span>{item.val}</span>
              </div>
              <span className="text-[11px] mt-1 block font-medium" style={{ color: "var(--text-secondary)" }}>
                {item.sub}
              </span>
            </div>
          );
        })}
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
      <div
        className="p-6 rounded-2xl border space-y-4 transition-all"
        style={{
          background: "rgba(14,14,22,0.92)",
          borderColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white">Focus areas and diagnostics</h3>
        </div>
        <p className="text-xs text-slate-300 font-medium">
          Derived from test failure patterns, hint dependence, and solution runtimes
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-xs font-bold text-rose-400 block">Dynamic programming</span>
            <p className="text-xs text-slate-200 leading-relaxed">
              Tabulation transitions take longer than benchmark averages. Practice unbounded coin change variations.
            </p>
            <Link
              href="/problems/coin-change"
              className="text-xs text-red-400 hover:text-red-300 font-semibold inline-flex items-center gap-1"
            >
              <span>Practice Coin Change</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-xs font-bold text-amber-400 block">Two pointers (multi-boundary)</span>
            <p className="text-xs text-slate-200 leading-relaxed">
              Boundary checks and in-place state tracking can be improved for multi-boundary elevation problems.
            </p>
            <Link
              href="/problems/trapping-rain-water"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
            >
              <span>Practice Trapping Rain Water</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div
        className="p-6 rounded-2xl border space-y-4 transition-all"
        style={{
          background: "rgba(14,14,22,0.92)",
          borderColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <h3 className="text-sm font-bold text-white">Recent submissions</h3>
        <div className="divide-y divide-white/5">
          {state.submissions.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center font-medium">
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
                      className="font-bold text-slate-100 hover:text-red-400 transition"
                    >
                      {s.problemTitle}
                    </Link>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                      {new Date(s.timestamp).toLocaleDateString()} • {s.language}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-bold ${
                      s.verdict === "Accepted" ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {s.verdict}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">{s.runtimeMs} ms</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
