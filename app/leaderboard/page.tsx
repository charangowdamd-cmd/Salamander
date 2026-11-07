"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_BADGES } from "@/lib/data/badges";
import { useUserStore } from "@/lib/store";
import { Trophy, Flame, Award, Medal, ShieldCheck } from "lucide-react";

export default function LeaderboardPage() {
  const { state } = useUserStore();
  const [filter, setFilter] = useState<"all" | "weekly" | "monthly">("all");

  const mockUsers = [
    { rank: 1, username: "priya_dev", college: "IIT Bombay", points: 3420, streak: 42, solved: 184 },
    { rank: 2, username: "rohan_algo", college: "NIT Surathkal", points: 3150, streak: 35, solved: 162 },
    { rank: 3, username: "dev_siddharth", college: "BITS Pilani", points: 2890, streak: 28, solved: 145 },
    { rank: 4, username: "alex_coder", college: "RVCE Bangalore", points: state.points || 2150, streak: state.streak, solved: state.solvedProblems.length + 80, isCurrentUser: true },
    { rank: 5, username: "neha_codes", college: "PES University", points: 1980, streak: 14, solved: 95 },
    { rank: 6, username: "rahul_k", college: "IIT Delhi", points: 1840, streak: 19, solved: 88 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
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
        <div className="flex items-center space-x-1 bg-[#0c121e] border border-slate-800 p-1 rounded-xl">
          {(["all", "weekly", "monthly"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                filter === tab
                  ? "bg-emerald-500 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "all" ? "All time" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#0c121e] border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-medium text-slate-400">
              <th className="py-3.5 px-6 w-16 text-center">Rank</th>
              <th className="py-3.5 px-6">Developer</th>
              <th className="py-3.5 px-6">College or organization</th>
              <th className="py-3.5 px-6 text-center">Streak</th>
              <th className="py-3.5 px-6 text-center">Solved</th>
              <th className="py-3.5 px-6 text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs">
            {mockUsers.map((u) => (
              <tr
                key={u.username}
                className={`transition ${
                  u.isCurrentUser
                    ? "bg-emerald-500/5 font-semibold"
                    : "hover:bg-slate-900/40"
                }`}
              >
                <td className="py-4 px-6 text-center">
                  {u.rank <= 3 ? (
                    <span className="font-mono font-bold text-amber-400">#{u.rank}</span>
                  ) : (
                    <span className="font-mono text-slate-400">#{u.rank}</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <Link
                    href={`/u/${u.username}`}
                    className="flex items-center space-x-3 text-slate-100 hover:text-emerald-400 transition"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-200">
                      {u.username[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-white">{u.username}</div>
                      {u.isCurrentUser && (
                        <span className="text-[10px] text-emerald-400 font-normal">You</span>
                      )}
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-6 text-slate-400">{u.college}</td>
                <td className="py-4 px-6 text-center font-mono text-amber-400">
                  {u.streak}d
                </td>
                <td className="py-4 px-6 text-center font-mono text-slate-300">
                  {u.solved}
                </td>
                <td className="py-4 px-6 text-right font-mono font-bold text-emerald-400 text-xs">
                  {u.points} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Badges Showcase Section */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Milestone badges and honors</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Verifiable achievements unlocked through consistent problem solving
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = state.badges.some((b) => b.key === badge.key);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition flex items-center space-x-3.5 ${
                  isUnlocked
                    ? "bg-[#0c121e] border-emerald-500/30"
                    : "bg-slate-950/60 border-slate-800/80 opacity-60"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                  <Medal className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-white">{badge.name}</h4>
                    <span
                      className={`text-[9px] font-medium px-1.5 py-0.2 rounded ${
                        badge.rarity === "Legendary"
                          ? "bg-amber-500/10 text-amber-400"
                          : badge.rarity === "Epic"
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
                      {badge.rarity.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
