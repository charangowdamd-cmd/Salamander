"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { PROBLEMS } from "@/lib/data/problems";
import { NEWS_ITEMS } from "@/lib/data/news";
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
  ShieldCheck
} from "lucide-react";

// Dynamically import Silk to ensure clean client-side WebGL mounting
const Silk = dynamic(() => import("@/components/Silk"), { ssr: false });

export default function Home() {
  const { state } = useUserStore();
  const { user, openAuthModal } = useAuth();
  const dailyProblem = PROBLEMS[0];
  const recommendedProblems = PROBLEMS.slice(1, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Section with Silk Interactive Background */}
      <section className="rounded-3xl border border-slate-800 bg-[#0c121e] overflow-hidden relative">
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
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
          <div className="absolute inset-0 z-10 flex flex-col justify-center p-8 sm:p-14 bg-gradient-to-r from-[#090d16]/95 via-[#090d16]/75 to-transparent pointer-events-none">
            <div className="max-w-2xl space-y-5 pointer-events-auto">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Structured placement and technical interview readiness</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Prove your problem solving with verified execution.
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Salamanders provides deterministic judging, progressive tiered AI mentorship, company-specific interview ladders, and verifiable proof-of-skills profiles.
              </p>

              <div className="flex flex-wrap gap-3 pt-3">
                <Link
                  href={`/problems/${dailyProblem.slug}`}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition"
                >
                  <span>Solve daily challenge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/interview-prep"
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition backdrop-blur-sm"
                >
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Company roadmaps</span>
                </Link>

                {!user && (
                  <button
                    onClick={openAuthModal}
                    className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition backdrop-blur-sm"
                  >
                    <span>Connect Supabase account</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Daily Challenge and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Challenge Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#0c121e] p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Daily problem</span>
              </span>
              <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                +15 bonus points
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                {dailyProblem.title}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs px-2 py-0.5 rounded font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {dailyProblem.difficulty}
                </span>
                <span className="text-xs text-slate-400">{dailyProblem.category}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
              {dailyProblem.description.replace(/[`*]/g, "")}
            </p>
          </div>

          <div className="pt-6">
            <Link
              href={`/problems/${dailyProblem.slug}`}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 font-semibold text-xs transition"
            >
              <span>Solve challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Personalized Practice Recommendations */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-[#0c121e] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Recommended problems</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeted practice based on your recent activity and placement roadmaps
              </p>
            </div>
            <Link
              href="/problems"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {recommendedProblems.map((p) => {
              const isSolved = state.solvedProblems.includes(p.slug);
              return (
                <div
                  key={p.id}
                  className="py-3 flex items-center justify-between hover:bg-slate-900/40 px-2 rounded-lg transition"
                >
                  <div className="flex items-center space-x-3">
                    {isSolved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700" />
                    )}
                    <div>
                      <Link
                        href={`/problems/${p.slug}`}
                        className="text-xs font-semibold text-slate-100 hover:text-emerald-400 transition"
                      >
                        {p.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.2 rounded ${
                            p.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : p.difficulty === "Medium"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-rose-500/10 text-rose-400"
                          }`}
                        >
                          {p.difficulty}
                        </span>
                        <span className="text-[11px] text-slate-400">{p.category}</span>
                        <span className="text-[10px] text-slate-500">
                          {p.companies.slice(0, 2).join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/problems/${p.slug}`}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium transition"
                  >
                    Solve
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Engineering and AI Updates */}
      <section className="rounded-2xl border border-slate-800 bg-[#0c121e] p-6 space-y-5">
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
