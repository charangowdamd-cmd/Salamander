"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/lib/store";
import { PROBLEMS } from "@/lib/data/problems";
import { AnalyticsCard } from "@/components/AnalyticsCard";
import { 
  ShieldCheck, 
  Award, 
  Flame, 
  Copy, 
  Check, 
  Linkedin, 
  Code,
  Medal,
  ExternalLink
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
    : 100;

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
              {username[0]?.toUpperCase() || "U"}
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
                Placement Candidate • Salamanders Coding Arena • Season 2026
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

      {/* Verified Analytics Section (Problems Solved, Badges & Calendar Heatmap matching Reference Image 2) */}
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

      {/* Verified Solved Problem Archive */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Verified solved problem archive</h3>
          <span className="text-xs text-slate-500 font-mono">
            {state.solvedProblems.length} solved
          </span>
        </div>
        <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-4 divide-y divide-slate-800/80 text-xs">
          {state.solvedProblems.length === 0 ? (
            <p className="py-6 text-center text-slate-500">
              No problems verified in the current session. Practice in the Arena to publish proof of skill!
            </p>
          ) : (
            state.solvedProblems.map((slug) => {
              const p = PROBLEMS.find((x) => x.slug === slug);
              return (
                <div key={slug} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <Link
                      href={`/problems/${slug}`}
                      className="font-medium text-slate-200 hover:text-emerald-400 transition"
                    >
                      {p?.title || slug}
                    </Link>
                    <span className="text-[10px] text-slate-500">({p?.difficulty})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-emerald-400 font-mono">Accepted</span>
                    <Link href={`/problems/${slug}`} className="text-slate-500 hover:text-slate-300">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
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
Verified Solved: ${state.solvedProblems.length} Problems
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
