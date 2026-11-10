"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_BADGES } from "@/lib/data/badges";
import { useUserStore } from "@/lib/store";
import { Trophy, Flame, Award, Medal, ShieldCheck } from "lucide-react";
import Plasma from "@/components/Plasma";

export default function LeaderboardPage() {
  const { state } = useUserStore();
  const [filter, setFilter] = useState<"all" | "weekly" | "monthly">("all");

  const mockUsers = [
    { rank: 1, username: "priya_dev", college: "IIT Bombay", points: 3420, streak: 42, solved: 184 },
    { rank: 2, username: "rohan_algo", college: "NIT Surathkal", points: 3150, streak: 35, solved: 162 },
    { rank: 3, username: "dev_siddharth", college: "BITS Pilani", points: 2890, streak: 28, solved: 145 },
    { rank: 4, username: "alex_coder", college: "RVCE Bangalore", points: state.points || 450, streak: state.streak, solved: state.solvedProblems.length, isCurrentUser: true },
    { rank: 5, username: "neha_codes", college: "PES University", points: 1980, streak: 14, solved: 95 },
    { rank: 6, username: "rahul_k", college: "IIT Delhi", points: 1840, streak: 19, solved: 88 },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Plasma page background */}
      <div className="fixed inset-0 opacity-18 pointer-events-none" style={{ zIndex: 0 }}>
        <Plasma color="#ff2727" speed={0.45} scale={0.7} twist={1} softness={0.65} shine={0.75} wave={1.95} mouseInteractive={false} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" style={{ zIndex: 1 }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Competitive arena rankings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Global leaderboard</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Standings based on verified accepted problem points and daily streaks
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className="flex items-center space-x-1 p-1 rounded-xl border"
          style={{
            background: "rgba(14,14,22,0.92)",
            borderColor: "rgba(255,255,255,0.12)",
          }}
        >
          {(["all", "weekly", "monthly"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                filter === tab
                  ? "bg-red-500 text-white shadow-md shadow-red-500/30"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab === "all" ? "All time" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          background: "rgba(14,14,22,0.94)",
          borderColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.45)",
        }}
      >
        <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className="border-b text-xs font-bold uppercase tracking-wider"
              style={{
                background: "rgba(0,0,0,0.35)",
                borderColor: "rgba(255,255,255,0.08)",
                color: "var(--text-secondary)",
              }}
            >
              <th className="py-3.5 px-6 w-16 text-center">Rank</th>
              <th className="py-3.5 px-6">Developer</th>
              <th className="py-3.5 px-6">College or organization</th>
              <th className="py-3.5 px-6 text-center">Streak</th>
              <th className="py-3.5 px-6 text-center">Solved</th>
              <th className="py-3.5 px-6 text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {mockUsers.map((u) => (
              <tr
                key={u.username}
                className={`transition-colors ${
                  u.isCurrentUser
                    ? "bg-red-500/10 font-semibold"
                    : "hover:bg-white/5"
                }`}
              >
                <td className="py-4 px-6 text-center">
                  {u.rank <= 3 ? (
                    <span className="font-mono font-black text-amber-400">#{u.rank}</span>
                  ) : (
                    <span className="font-mono text-slate-300">#{u.rank}</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <Link
                    href={`/u/${u.username}`}
                    className="flex items-center space-x-3 text-slate-100 hover:text-red-400 transition"
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center text-xs font-bold text-red-400">
                      {u.username[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-white">{u.username}</div>
                      {u.isCurrentUser && (
                        <span className="text-[10px] text-red-400 font-semibold">You</span>
                      )}
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-6 text-slate-300 font-medium">{u.college}</td>
                <td className="py-4 px-6 text-center font-mono font-bold text-amber-400">
                  {u.streak}d
                </td>
                <td className="py-4 px-6 text-center font-mono text-slate-200">
                  {u.solved}
                </td>
                <td className="py-4 px-6 text-right font-mono font-bold text-red-400 text-xs">
                  {u.points} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Badges Showcase Section */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Milestone badges and honors</span>
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Verifiable achievements unlocked through consistent problem solving
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = state.badges.some((b) => b.key === badge.key);
            return (
              <div
                key={badge.id}
                className="p-4 rounded-2xl border transition-all duration-200 flex items-center space-x-3.5"
                style={{
                  background: isUnlocked ? "rgba(14,14,22,0.92)" : "rgba(10,10,16,0.7)",
                  borderColor: isUnlocked ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)",
                  boxShadow: isUnlocked ? "0 4px 16px rgba(0,0,0,0.4)" : "none",
                  opacity: isUnlocked ? 1 : 0.65,
                }}
                onMouseOver={(e) => {
                  if (isUnlocked) {
                    e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(239,68,68,0.25)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseOut={(e) => {
                  if (isUnlocked) {
                    e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.4)";
                    e.currentTarget.style.transform = "translateY(0px)";
                  }
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400">
                  <Medal className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-white">{badge.name}</h4>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        badge.rarity === "Legendary"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : badge.rarity === "Epic"
                          ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                          : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {badge.rarity.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      </div>
    </div>
  );
}
