"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PROBLEMS } from "@/lib/data/problems";
import { NEWS_ITEMS } from "@/lib/data/news";
import { COMPANY_TRACKS } from "@/lib/data/interview";
import { useUserStore } from "@/lib/store";
import { useAuth } from "@/components/AuthProvider";
import { 
  Flame, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Briefcase, 
  ExternalLink,
  ShieldCheck,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Building2,
  Lock,
  ChevronRight
} from "lucide-react";

// Dynamically import Silk to ensure clean client-side WebGL mounting
const Silk = dynamic(() => import("@/components/Silk"), { ssr: false });

export default function Home() {
  const { state } = useUserStore();
  const { user, openAuthModal } = useAuth();
  const [homeFilter, setHomeFilter] = useState<"All" | "Easy" | "Medium" | "Hard">("All");

  const dailyProblem = PROBLEMS[0]; // Two Sum
  const easyCount = PROBLEMS.filter((p) => p.difficulty === "Easy").length;
  const medCount = PROBLEMS.filter((p) => p.difficulty === "Medium").length;
  const hardCount = PROBLEMS.filter((p) => p.difficulty === "Hard").length;

  const showcasedProblems = homeFilter === "All" 
    ? PROBLEMS.slice(0, 6) 
    : PROBLEMS.filter((p) => p.difficulty === homeFilter).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Section with Silk Interactive WebGL Background */}
      <section className="rounded-3xl border border-slate-800 bg-[#07090e] overflow-hidden relative shadow-2xl">
        <div style={{ width: '100%', height: '620px', position: 'relative' }}>
          <Silk
            color="#ff2727"
            sheenColor="#ffffff"
            speed={2.7}
            scale={0.8}
            rotation={0}
            sheen={0.25}
            depth={0.5}
            glow={0}
            noiseIntensity={0.9}
            mouseInteraction
            clickRipple
            intro
            ripple={0.85}
            wave={0.75}
            interactionStrength={0.45}
          />

          {/* Overlay containing hero copy and interactive actions */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center p-8 sm:p-14 bg-gradient-to-r from-[#07090e]/95 via-[#07090e]/80 to-transparent pointer-events-none">
            <div className="max-w-2xl space-y-6 pointer-events-auto">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Salamanders 2.0 • 20 Core DSA Patterns • Supabase Cloud Sync</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Master placement coding with verified execution.
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Subprocess-isolated test runner for JavaScript and Python 3, Socratic AI mentorship powered by Google Gemini 2.5 Flash, company interview ladders, and verifiable proof-of-skill developer profiles.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href={`/problems/${dailyProblem.slug}`}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-md"
                >
                  <span>Solve Daily Problem ({dailyProblem.title})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/problems"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-xs transition backdrop-blur-sm shadow-sm"
                >
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Browse 20 Problems</span>
                </Link>

                {!user && (
                  <button
                    onClick={openAuthModal}
                    className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-xs transition backdrop-blur-sm"
                  >
                    <span>Connect Account</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features / Verification Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0c121e] border border-slate-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-white">20 Core Problems</div>
            <span className="text-[11px] text-slate-400">Easy, Medium & Hard</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c121e] border border-slate-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-white">Dual JS & Python</div>
            <span className="text-[11px] text-slate-400">Deterministic Judge</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c121e] border border-slate-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-white">Gemini 2.5 Flash</div>
            <span className="text-[11px] text-slate-400">4-Tier AI Mentor</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c121e] border border-slate-800 flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-white">5 Company Tracks</div>
            <span className="text-[11px] text-slate-400">Google, Meta & Amazon</span>
          </div>
        </div>
      </div>

      {/* Interactive Practice Question Bank Showcase directly on Homepage */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#0c121e] border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-1">
              <span>Interactive Practice</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Coding practice question bank</h2>
            <p className="text-xs text-slate-400 mt-1">
              Solve interview-tested algorithms directly in the browser with real-time test evaluation
            </p>
          </div>

          {/* Difficulty Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-xl">
            {(["All", "Easy", "Medium", "Hard"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setHomeFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  homeFilter === lvl
                    ? "bg-emerald-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {lvl} {lvl === "All" ? `(20)` : lvl === "Easy" ? `(${easyCount})` : lvl === "Medium" ? `(${medCount})` : `(${hardCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* Problem Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcasedProblems.map((prob) => {
            const isSolved = state.solvedProblems.includes(prob.slug);
            return (
              <div
                key={prob.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        prob.difficulty === "Easy"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : prob.difficulty === "Medium"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {prob.acceptanceRate}% acceptance
                    </span>
                  </div>

                  <Link
                    href={`/problems/${prob.slug}`}
                    className="block font-bold text-sm text-white group-hover:text-emerald-400 transition"
                  >
                    {prob.title}
                  </Link>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {prob.description.replace(/[`*]/g, "")}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-900">
                  <div className="flex gap-1">
                    {prob.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/problems/${prob.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>{isSolved ? "Solved" : "Solve"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold transition"
          >
            <span>View All 20 Problems in Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Placement Company Tracks */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Target company interview tracks</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Practice exact high-frequency questions asked in technical rounds
            </p>
          </div>
          <Link
            href="/interview-prep"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            <span>All tracks</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {COMPANY_TRACKS.map((comp) => {
            const solved = comp.slugs.filter((s) => state.solvedProblems.includes(s)).length;
            return (
              <Link
                key={comp.id}
                href="/interview-prep"
                className="p-4 rounded-2xl bg-[#0c121e] border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-emerald-400 group-hover:border-emerald-500/40">
                    {comp.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">
                    {comp.frequency}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-white">{comp.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{comp.slugs.length} curated problems</p>
                </div>

                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full"
                    style={{ width: `${(solved / comp.slugs.length) * 100}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* News & Engineering Insights */}
      <section className="rounded-2xl border border-slate-800 bg-[#0c121e] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Engineering and AI updates</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Curated updates with practical relevance for software engineers
            </p>
          </div>
          <Link
            href="/news"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            <span>All updates</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEWS_ITEMS.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="text-emerald-400 font-medium">{item.category}</span>
                  <span>{item.source}</span>
                </div>
                <h4 className="font-semibold text-xs text-slate-200">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {item.whyItMatters}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                <div className="flex gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
