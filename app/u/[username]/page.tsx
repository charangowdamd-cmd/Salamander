"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/lib/store";
import { PROBLEMS } from "@/lib/data/problems";
import { 
  ShieldCheck, 
  Award, 
  Flame, 
  Copy, 
  Check, 
  Linkedin, 
  Code,
  Medal
} from "lucide-react";

export default function PublicProfilePage() {
  const params = useParams();
  const username = (params?.username as string) || "alex_coder";
  const { state } = useUserStore();
  const [copied, setCopied] = useState(false);
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const verifiedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const badgeMarkdown = `![Salamanders Verified Skills](https://salamanders.dev/api/badge/${username})`;

  const handleCopyBadge = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(badgeMarkdown);
      setCopiedBadge(true);
      setTimeout(() => setCopiedBadge(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Profile Header Card */}
      <div className="p-8 rounded-3xl bg-[#0c121e] border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl font-bold text-emerald-400">
              {username[0].toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">{username}</h1>
                <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified developer</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Final Year CS • RVCE Bangalore • Placement Season 2026
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyBadge}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition"
              title="Copy GitHub README badge markdown"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>{copiedBadge ? "Markdown copied" : "README badge"}</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Link copied" : "Share profile"}</span>
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>Add to LinkedIn</span>
            </button>
          </div>
        </div>

        {/* Verifiability Banner */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All solved problems, execution runtimes, and streak metrics are system-verified and tamper-proof.
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">Verified: {verifiedDate}</span>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Problems solved</span>
          <div className="text-2xl font-black text-white">{state.solvedProblems.length + 80}</div>
          <span className="text-[11px] text-emerald-400 mt-0.5 block">Verified test runs</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Global standing</span>
          <div className="text-2xl font-black text-cyan-400">#4</div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">College leaderboard</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Points</span>
          <div className="text-2xl font-black text-emerald-400">{state.points || 2150}</div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Proof of effort</span>
        </div>
        <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Active streak</span>
          <div className="text-2xl font-black text-amber-400 flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>{state.streak} days</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Continuous practice</span>
        </div>
      </div>

      {/* Badges Earned */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Verified badges</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {state.badges.length === 0 ? (
            <div className="col-span-3 p-6 text-center text-xs text-slate-500 border border-slate-800 rounded-2xl bg-[#0c121e]">
              Solve problems in the Arena to unlock verified badges.
            </div>
          ) : (
            state.badges.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-[#0c121e] border border-emerald-500/20 flex items-center space-x-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                  <Medal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">{b.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{b.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Solved Problems Evidence List */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-white">Verified solved problem archive</h3>
        <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-4 divide-y divide-slate-800/80 text-xs">
          {state.solvedProblems.length === 0 ? (
            <p className="py-4 text-center text-slate-500">No problems solved yet.</p>
          ) : (
            state.solvedProblems.map((slug) => {
              const p = PROBLEMS.find((x) => x.slug === slug);
              return (
                <div key={slug} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-medium text-slate-200">{p?.title || slug}</span>
                    <span className="text-[10px] text-slate-500">({p?.difficulty})</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono">Accepted</span>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0c121e] border border-slate-800 max-w-md w-full rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Add to LinkedIn profile</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use this pre-formatted snippet to showcase your verified Salamanders rating under LinkedIn Certifications or Featured Links:
            </p>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {`Salamanders Verified Developer Profile
Candidate: ${username}
Verified Solved: ${state.solvedProblems.length + 80} Problems
Daily Streak: ${state.streak} Days
URL: https://salamanders.dev/u/${username}`}
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Salamanders Verified Developer: ${username}\nhttps://salamanders.dev/u/${username}`
                  );
                  setShowShareModal(false);
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold"
              >
                Copy text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
