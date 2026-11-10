"use client";

import Link from "next/link";
import { COMPANY_TRACKS, ROADMAPS } from "@/lib/data/interview";
import { PROBLEMS } from "@/lib/data/problems";
import { useUserStore } from "@/lib/store";
import { Briefcase, Map, Timer, ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import Plasma from "@/components/Plasma";

export default function InterviewPrepPage() {
  const { state } = useUserStore();

  const totalProblems = PROBLEMS.length;
  const solvedCount = state.solvedProblems.length;
  const readinessScore = Math.min(100, Math.round((solvedCount / totalProblems) * 80 + (state.streak >= 3 ? 20 : 10)));

  return (
    <div className="relative min-h-screen">
      {/* Plasma page background */}
      <div className="fixed inset-0 opacity-18 pointer-events-none" style={{ zIndex: 0 }}>
        <Plasma color="#ff2727" speed={0.4} scale={0.75} twist={1.1} softness={0.65} shine={0.7} wave={1.95} mouseInteractive={false} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" style={{ zIndex: 1 }}>
      {/* Header and Readiness Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 rounded-3xl bg-[#0c121e] border border-slate-800">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Placement and interview hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Interview preparation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Target company-specific patterns, master curated DSA curriculum ladders, and test yourself under real exam conditions with timed mock assessments.
          </p>
        </div>

        {/* Readiness Meter Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 min-w-[240px] text-center space-y-2.5">
          <span className="text-xs font-medium text-slate-400 block">
            Interview readiness score
          </span>
          <div className="text-3xl font-black text-emerald-400">
            {readinessScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full"
              style={{ width: `${readinessScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {readinessScore < 40
              ? "Solve 2 more Medium problems to level up readiness"
              : "Strong coverage of core patterns"}
          </p>
        </div>
      </div>

      {/* Mock Coding Assessments Callout */}
      <div className="p-6 rounded-2xl bg-[#0c121e] border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">Timed mock assessments</h3>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Simulate real 45-minute technical rounds. 2 curated problems, timer countdown, no hints, locked environment, and detailed performance breakdown.
          </p>
        </div>
        <Link
          href="/interview-prep/mock"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition whitespace-nowrap"
        >
          Launch mock assessment
        </Link>
      </div>

      {/* Company-Wise Tracks */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Company-wise question sets</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Curated problem archives based on real placement and technical interview rounds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMPANY_TRACKS.map((comp) => {
            const solvedInCompany = comp.slugs.filter((s) => state.solvedProblems.includes(s)).length;
            return (
              <div
                key={comp.id}
                className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-emerald-400">
                      {comp.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {comp.frequency}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">{comp.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-800/80">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Solved progress</span>
                    <span className="font-semibold text-white">
                      {solvedInCompany} / {comp.slugs.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: `${(solvedInCompany / comp.slugs.length) * 100}%` }}
                    />
                  </div>

                  <Link
                    href={`/problems?company=${comp.name}`}
                    className="w-full flex items-center justify-center space-x-1.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition"
                  >
                    <span>Practice questions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Topic-Wise DSA Roadmaps */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-400" />
            <span>Curated DSA roadmaps</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Systematic progression from foundational concepts to multi-step optimizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROADMAPS.map((topic) => (
            <div
              key={topic.id}
              className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 flex items-center justify-between"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-white">{topic.title}</h4>
                <p className="text-xs text-slate-400 max-w-md leading-relaxed">{topic.description}</p>
                <div className="text-[11px] text-emerald-400 font-medium pt-1">
                  {topic.problemSlugs.filter((s) => state.solvedProblems.includes(s)).length} completed of {topic.totalProblems} in syllabus
                </div>
              </div>

              <Link
                href={`/problems?category=${topic.title.replace(/^\d+\.\s*/, "").split("&")[0].trim()}`}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold whitespace-nowrap transition"
              >
                View ladder
              </Link>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
