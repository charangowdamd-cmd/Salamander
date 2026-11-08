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
  ArrowRight,
  Sparkles,
  Code2,
  Cpu,
  Building2,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

const Silk = dynamic(() => import("@/components/Silk"), { ssr: false });

export default function Home() {
  const { state } = useUserStore();
  const { user, openAuthModal } = useAuth();
  const [homeFilter, setHomeFilter] = useState<"All" | "Easy" | "Medium" | "Hard">("All");

  const dailyProblem = PROBLEMS[0];
  const easyCount = PROBLEMS.filter((p) => p.difficulty === "Easy").length;
  const medCount = PROBLEMS.filter((p) => p.difficulty === "Medium").length;
  const hardCount = PROBLEMS.filter((p) => p.difficulty === "Hard").length;

  const showcasedProblems =
    homeFilter === "All"
      ? PROBLEMS.slice(0, 6)
      : PROBLEMS.filter((p) => p.difficulty === homeFilter).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

      {/* ── Hero ── */}
      <section className="rounded-2xl overflow-hidden relative" style={{ height: "580px" }}>
        <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
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
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-12"
          style={{ background: "linear-gradient(to top, rgba(8,12,20,0.97) 0%, rgba(8,12,20,0.75) 50%, transparent 100%)" }}>
          <div className="max-w-xl space-y-5">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wide text-emerald-400 uppercase mb-3">
                Salamanders — coding practice
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Crack interviews with verified execution.
              </h1>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Real subprocess judge for JavaScript and Python. Socratic AI mentorship. Company interview ladders. Proof-of-skill developer profiles.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={`/problems/${dailyProblem.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-slate-950 transition"
                style={{ backgroundColor: "var(--accent)" }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = "var(--accent-hover)")}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = "var(--accent)")}
              >
                Start solving
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/problems"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border text-slate-200 transition"
                style={{ borderColor: "var(--border-strong)", backgroundColor: "rgba(14,20,32,0.7)" }}
                onMouseOver={e => (e.currentTarget.style.borderColor = "var(--border-hover)")}
                onMouseOut={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
              >
                Browse 20 problems
              </Link>

              {!user && (
                <button
                  onClick={openAuthModal}
                  className="text-sm font-medium text-slate-400 hover:text-white transition underline underline-offset-4"
                >
                  Sign in to sync progress
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Platform stats strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Core problems", value: "20", sub: "Easy, Medium, Hard", color: "var(--accent)", Icon: Code2 },
          { label: "Languages", value: "JS + Py", sub: "Deterministic judge", color: "var(--amber)", Icon: Cpu },
          { label: "AI mentor", value: "Gemini", sub: "4-tier Socratic hints", color: "var(--cyan)", Icon: Sparkles },
          { label: "Company tracks", value: "5", sub: "Google, Meta, Amazon…", color: "var(--rose)", Icon: Building2 },
        ].map(({ label, value, sub, color, Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3.5 p-4 rounded-xl border"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 25%, transparent)` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Problem showcase ── */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Practice question bank
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
              Interview-tested algorithms with real-time test evaluation
            </p>
          </div>

          <div
            className="flex items-center gap-1 p-1 rounded-lg border self-start sm:self-auto"
            style={{ backgroundColor: "var(--canvas)", borderColor: "var(--border)" }}
          >
            {(["All", "Easy", "Medium", "Hard"] as const).map((lvl) => {
              const count = lvl === "All" ? 20 : lvl === "Easy" ? easyCount : lvl === "Medium" ? medCount : hardCount;
              const isActive = homeFilter === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setHomeFilter(lvl)}
                  className="px-3 py-1 rounded-md text-xs font-semibold transition"
                  style={
                    isActive
                      ? { backgroundColor: "var(--accent)", color: "var(--accent-text)" }
                      : { color: "var(--text-muted)" }
                  }
                  onMouseOver={e => { if (!isActive) e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseOut={e => { if (!isActive) e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  {lvl} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {showcasedProblems.map((prob) => {
            const isSolved = state.solvedProblems.includes(prob.slug);
            const diffColor =
              prob.difficulty === "Easy" ? "var(--accent)" :
              prob.difficulty === "Medium" ? "var(--amber)" : "var(--rose)";
            return (
              <Link
                key={prob.id}
                href={`/problems/${prob.slug}`}
                className="group block p-5 rounded-xl border transition"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                onMouseOver={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                onMouseOut={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded"
                    style={{
                      color: diffColor,
                      backgroundColor: `color-mix(in srgb, ${diffColor} 10%, transparent)`,
                    }}
                  >
                    {prob.difficulty}
                  </span>
                  {isSolved && (
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                  )}
                </div>

                <h3
                  className="font-semibold text-sm mb-1.5 group-hover:text-emerald-400 transition"
                  style={{ color: "var(--text-primary)" }}
                >
                  {prob.title}
                </h3>
                <p className="text-xs line-clamp-2 leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                  {prob.description.replace(/[`*]/g, "")}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {prob.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{ color: "var(--text-muted)", backgroundColor: "var(--surface-2)", border: "1px solid var(--border)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
                    {prob.acceptanceRate}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition"
            style={{ color: "var(--text-secondary)", borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            onMouseOver={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            onMouseOut={e => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            View all 20 problems
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Company interview tracks ── */}
      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Company interview tracks
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
              High-frequency questions from top tech hiring pipelines
            </p>
          </div>
          <Link
            href="/interview-prep"
            className="text-xs font-medium flex items-center gap-1 transition"
            style={{ color: "var(--accent)" }}
            onMouseOver={e => (e.currentTarget.style.color = "var(--accent-hover)")}
            onMouseOut={e => (e.currentTarget.style.color = "var(--accent)")}
          >
            All tracks <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {COMPANY_TRACKS.map((comp) => {
            const solved = comp.slugs.filter((s) => state.solvedProblems.includes(s)).length;
            const pct = Math.round((solved / comp.slugs.length) * 100);
            return (
              <Link
                key={comp.id}
                href="/interview-prep"
                className="group flex flex-col justify-between p-4 rounded-xl border transition"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                onMouseOver={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                onMouseOut={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      color: "var(--accent)",
                    }}
                  >
                    {comp.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                    {comp.frequency}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {comp.name}
                  </h4>
                  <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
                    {comp.slugs.length} problems
                  </p>

                  <div
                    className="w-full h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--border)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: "var(--accent)" }}
                    />
                  </div>
                  <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                    {solved}/{comp.slugs.length} solved
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Latest tech updates ── */}
      <section
        className="rounded-xl border p-6 space-y-5"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              Engineering and AI updates
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Curated for software engineers
            </p>
          </div>
          <Link
            href="/news"
            className="text-xs font-medium flex items-center gap-1 transition"
            style={{ color: "var(--cyan)" }}
            onMouseOver={e => (e.currentTarget.style.opacity = "0.75")}
            onMouseOut={e => (e.currentTarget.style.opacity = "1")}
          >
            All updates <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {NEWS_ITEMS.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border flex flex-col justify-between gap-3"
              style={{ backgroundColor: "var(--canvas)", borderColor: "var(--border)" }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold" style={{ color: "var(--accent)" }}>
                    {item.category}
                  </span>
                  <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {item.source}
                  </span>
                </div>
                <h4 className="text-xs font-semibold mb-1.5 leading-snug" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.whyItMatters}
                </p>
              </div>

              <div
                className="flex items-center justify-between pt-3 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex gap-1">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{ color: "var(--text-muted)", backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] font-medium transition"
                  style={{ color: "var(--cyan)" }}
                  onMouseOver={e => (e.currentTarget.style.opacity = "0.75")}
                  onMouseOut={e => (e.currentTarget.style.opacity = "1")}
                >
                  Source <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
