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
  Zap,
  Brain,
  Trophy,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Play,
  Terminal,
  ChevronRight,
  Newspaper,
} from "lucide-react";

const Silk = dynamic(() => import("@/components/Silk"), { ssr: false });
const Plasma = dynamic(() => import("@/components/Plasma"), { ssr: false });

// Minimal code illustration for hero right panel
function CodeIllustration() {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Editor window */}
      <div
        className="w-full max-w-sm rounded-xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(15,15,22,0.9)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80" />
          </div>
          <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
            Python
          </span>
        </div>

        {/* Code lines */}
        <div className="p-4 font-mono text-xs space-y-1" style={{ color: "rgba(255,255,255,0.7)" }}>
          <div>
            <span style={{ color: "#60a5fa" }}>def</span>
            <span style={{ color: "#f4f4f8" }}> </span>
            <span style={{ color: "#34d399" }}>solve</span>
            <span style={{ color: "#f4f4f8" }}>(nums, target):</span>
          </div>
          <div className="pl-4">
            <span style={{ color: "#60a5fa" }}>seen</span>
            <span style={{ color: "#f4f4f8" }}> = {}</span>
          </div>
          <div className="pl-4">
            <span style={{ color: "#60a5fa" }}>for</span>
            <span style={{ color: "#f4f4f8" }}> i, n </span>
            <span style={{ color: "#60a5fa" }}>in</span>
            <span style={{ color: "#f4f4f8" }}> enumerate(nums):</span>
          </div>
          <div className="pl-8">
            <span style={{ color: "#60a5fa" }}>if</span>
            <span style={{ color: "#f4f4f8" }}> target - n </span>
            <span style={{ color: "#60a5fa" }}>in</span>
            <span style={{ color: "#f4f4f8" }}> seen:</span>
          </div>
          <div className="pl-12">
            <span style={{ color: "#60a5fa" }}>return</span>
            <span style={{ color: "#f4f4f8" }}> [seen[target-n], i]</span>
          </div>
          <div className="pl-8">
            <span style={{ color: "#f4f4f8" }}>seen[n] = i</span>
          </div>
        </div>
      </div>

      {/* Verified badge */}
      <div
        className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-0 flex items-center gap-2 px-3 py-2 rounded-xl shadow-xl"
        style={{
          background: "rgba(34,197,94,0.15)",
          border: "1px solid rgba(34,197,94,0.3)",
          backdropFilter: "blur(12px)",
        }}
      >
        <CheckCircle2 className="w-4 h-4" style={{ color: "#22c55e" }} />
        <div>
          <div className="text-[11px] font-bold" style={{ color: "#22c55e" }}>
            Execution Verified
          </div>
          <div className="text-[10px]" style={{ color: "rgba(34,197,94,0.7)" }}>
            All tests passed
          </div>
        </div>
      </div>

      {/* Floating icon */}
      <div
        className="absolute top-0 -right-4 sm:top-2 sm:-right-6 p-3 rounded-xl"
        style={{
          background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Terminal className="w-5 h-5" style={{ color: "#ef4444" }} />
      </div>
    </div>
  );
}

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
      ? PROBLEMS.slice(0, 3)
      : PROBLEMS.filter((p) => p.difficulty === homeFilter).slice(0, 3);

  const featureItems = [
    {
      icon: Zap,
      title: "Real-time Code Execution",
      desc: "Run and evaluate instantly",
      color: "#ef4444",
    },
    {
      icon: Brain,
      title: "AI-Powered Mentorship",
      desc: "Get intelligent hints",
      color: "#a855f7",
    },
    {
      icon: Trophy,
      title: "Interview Preparation",
      desc: "Practice company questions",
      color: "#f59e0b",
    },
    {
      icon: BarChart3,
      title: "Track Your Progress",
      desc: "Monitor your journey",
      color: "#22c55e",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(239,68,68,0.08) 0%, transparent 60%), var(--canvas)",
      }}
    >
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "580px" }}>
        {/* Silk WebGL background — full bleed */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
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

        {/* Dark overlay so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.75) 50%, rgba(10,10,15,0.4) 100%)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ zIndex: 2 }}
        >
          {/* Left: copy */}
          <div className="space-y-6 max-w-xl">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#ef4444",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#ef4444" }}
              />
              Salamanders — Coding Practice
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              <span style={{ color: "var(--text-primary)" }}>Crack Interviews with</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #ef4444 0%, #f97316 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Verified Execution.
              </span>
            </h1>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Master data structures, algorithms, and real-world challenges with verified execution and AI mentorship.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/problems/${dailyProblem.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  color: "#fff",
                  boxShadow: "0 0 24px rgba(239,68,68,0.35)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 0 36px rgba(239,68,68,0.5)")}
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = "0 0 24px rgba(239,68,68,0.35)")}
              >
                <Play className="w-4 h-4 fill-white" />
                Start Practicing
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/problems"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--text-primary)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)")}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              >
                Explore Problems
              </Link>

              <a
                href="#practice"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold transition"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "#ef4444",
                  backdropFilter: "blur(12px)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 16px rgba(239,68,68,0.25)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Question Bank &darr;
              </a>

              {!user && (
                <button
                  onClick={openAuthModal}
                  className="text-xs font-medium transition underline underline-offset-4"
                  style={{ color: "var(--text-muted)" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  Sign in to sync progress
                </button>
              )}
            </div>
          </div>

          {/* Right: code illustration */}
          <div className="hidden lg:flex items-center justify-center relative h-72">
            <CodeIllustration />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">

        {/* ── Feature strip ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(14,14,22,0.9)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {featureItems.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="flex items-center gap-3 px-5 py-4 transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `color-mix(in srgb, ${color} 15%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    {title}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Practice Question Bank ── */}
        <section id="practice" className="relative space-y-6 rounded-2xl overflow-hidden p-4 sm:p-6 lg:p-8 border border-white/10">
          {/* Plasma background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ zIndex: 0 }}>
            <Plasma color="#ff2727" speed={0.6} scale={0.8} twist={0.8} softness={0.6} shine={0.8} wave={1.95} mouseInteractive={false} />
          </div>
          <div className="relative" style={{ zIndex: 1 }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Practice Question Bank
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                Sharpen your problem-solving skills with interview-tested challenges.
              </p>
            </div>

            {/* Difficulty filter */}
            <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
              {(["All", "Easy", "Medium", "Hard"] as const).map((lvl) => {
                const count =
                  lvl === "All" ? 20 : lvl === "Easy" ? easyCount : lvl === "Medium" ? medCount : hardCount;
                const isActive = homeFilter === lvl;
                const activeColor =
                  lvl === "Easy" ? "#22c55e" : lvl === "Medium" ? "#f59e0b" : lvl === "Hard" ? "#ef4444" : "#ef4444";
                return (
                  <button
                    key={lvl}
                    onClick={() => setHomeFilter(lvl)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                    style={
                      isActive
                        ? {
                            background: lvl === "All" ? "linear-gradient(135deg, #ef4444, #dc2626)" : `color-mix(in srgb, ${activeColor} 20%, transparent)`,
                            color: lvl === "All" ? "#fff" : activeColor,
                            border: `1px solid color-mix(in srgb, ${activeColor} 40%, transparent)`,
                            boxShadow: lvl === "All" ? "0 0 16px rgba(239,68,68,0.4)" : "none",
                          }
                        : {
                            background: "rgba(20,20,30,0.85)",
                            color: "var(--text-secondary)",
                            border: "1px solid rgba(255,255,255,0.12)",
                          }
                    }
                    onMouseOver={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    {lvl === "All" ? "All Problems" : lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Problem cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {showcasedProblems.map((prob) => {
              const isSolved = state.solvedProblems.includes(prob.slug);
              const diffColor =
                prob.difficulty === "Easy"
                  ? "#22c55e"
                  : prob.difficulty === "Medium"
                  ? "#f59e0b"
                  : "#ef4444";
              const diffBg =
                prob.difficulty === "Easy"
                  ? "rgba(34,197,94,0.15)"
                  : prob.difficulty === "Medium"
                  ? "rgba(245,158,11,0.15)"
                  : "rgba(239,68,68,0.15)";

              // Icon per difficulty for card decoration
              const DiffIcon = prob.difficulty === "Hard" ? Terminal : prob.difficulty === "Medium" ? Brain : Zap;

              return (
                <Link
                  key={prob.id}
                  href={`/problems/${prob.slug}`}
                  className="group block rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    background: "rgba(14,14,22,0.92)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(20px)",
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
                  <div className="p-5">
                    {/* Top row: difficulty + solved + icon */}
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md border"
                        style={{ color: diffColor, backgroundColor: diffBg, borderColor: `color-mix(in srgb, ${diffColor} 30%, transparent)` }}
                      >
                        {prob.difficulty}
                      </span>
                      <div className="flex items-center gap-2">
                        {isSolved && (
                          <CheckCircle2 className="w-4 h-4" style={{ color: "#22c55e" }} />
                        )}
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center opacity-30 group-hover:opacity-60 transition"
                          style={{ color: diffColor }}
                        >
                          <DiffIcon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Title + desc */}
                    <h3
                      className="font-bold text-base mb-1.5 group-hover:text-red-400 transition"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {prob.title}
                    </h3>
                    <p
                      className="text-xs line-clamp-2 leading-relaxed mb-5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {prob.description.replace(/[`*]/g, "")}
                    </p>

                    {/* Tags + acceptance */}
                    <div className="flex items-center gap-2 mb-3">
                      {prob.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
                          style={{
                            color: "var(--text-primary)",
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.12)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Acceptance bar */}
                    <div className="flex items-center gap-3">
                      <div
                        className="flex-1 h-1.5 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.1)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${prob.acceptanceRate}%`,
                            background: `linear-gradient(90deg, ${diffColor}, ${diffColor}cc)`,
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-mono whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                        {prob.acceptanceRate}% Acceptance
                      </span>
                    </div>
                  </div>

                  {/* Bottom action bar */}
                  <div
                    className="px-5 py-2.5 flex items-center justify-end border-t"
                    style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}
                  >
                    <span
                      className="flex items-center gap-1 text-[11px] font-semibold transition group-hover:text-red-400"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Solve
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--text-secondary)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              View all 20 problems
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          </div>
        </section>

        {/* ── Company interview tracks ── */}
        <section id="companies" className="relative space-y-6 rounded-2xl overflow-hidden p-4 sm:p-6 lg:p-8 border border-white/10">
          {/* Plasma background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ zIndex: 0 }}>
            <Plasma color="#ff2727" speed={0.5} scale={0.7} twist={1.2} softness={0.7} shine={0.7} wave={1.5} mouseInteractive={false} />
          </div>
          <div className="relative" style={{ zIndex: 1 }}>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Company interview tracks
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                High-frequency questions from top tech hiring pipelines
              </p>
            </div>
            <Link
              href="/interview-prep"
              className="text-xs font-semibold flex items-center gap-1 transition"
              style={{ color: "#ef4444" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#dc2626")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#ef4444")}
            >
              All tracks <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-6">
            {COMPANY_TRACKS.map((comp) => {
              const solved = comp.slugs.filter((s) => state.solvedProblems.includes(s)).length;
              const pct = Math.round((solved / comp.slugs.length) * 100);
              return (
                <Link
                  key={comp.id}
                  href="/interview-prep"
                  className="group flex flex-col p-4 rounded-2xl transition-all duration-200"
                  style={{
                    background: "rgba(14,14,22,0.92)",
                    border: "1px solid rgba(255,255,255,0.12)",
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
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black mb-3"
                    style={{
                      background: "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.06))",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#ef4444",
                    }}
                  >
                    {comp.name.substring(0, 2).toUpperCase()}
                  </div>

                  <h4 className="text-xs font-bold mb-0.5 group-hover:text-red-400 transition" style={{ color: "var(--text-primary)" }}>
                    {comp.name}
                  </h4>
                  <p className="text-[10px] mb-3 font-medium" style={{ color: "var(--text-secondary)" }}>
                    {comp.slugs.length} problems · {comp.frequency}
                  </p>

                  {/* Progress */}
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <div
                      className="h-full rounded-full transition"
                      style={{
                        width: `${pct}%`,
                        background: "linear-gradient(90deg, #ef4444, #f97316)",
                      }}
                    />
                  </div>
                  <div className="text-[10px] mt-1.5 font-semibold" style={{ color: "var(--text-secondary)" }}>
                    {solved}/{comp.slugs.length} solved
                  </div>
                </Link>
              );
            })}
          </div>
          </div>
        </section>

        {/* ── Latest tech updates ── */}
        <section id="updates" className="relative space-y-5 rounded-2xl overflow-hidden p-4 sm:p-6 lg:p-8 border border-white/10">
          {/* Plasma background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ zIndex: 0 }}>
            <Plasma color="#ff2727" speed={0.4} scale={0.6} twist={0.9} softness={0.65} shine={0.6} wave={2.1} mouseInteractive={false} />
          </div>
          <div className="relative" style={{ zIndex: 1 }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                Engineering and AI updates
              </h2>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                Curated updates for software engineers
              </p>
            </div>
            <Link
              href="/news"
              className="text-xs font-semibold flex items-center gap-1 transition"
              style={{ color: "var(--cyan)" }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              All updates <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {NEWS_ITEMS.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-200"
                style={{
                  background: "rgba(14,14,22,0.92)",
                  border: "1px solid rgba(255,255,255,0.12)",
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
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-md border"
                      style={{
                        color: "#22c55e",
                        background: "rgba(34,197,94,0.15)",
                        borderColor: "rgba(34,197,94,0.3)",
                      }}
                    >
                      {item.category}
                    </span>
                    <span className="text-[11px] font-medium" style={{ color: "var(--text-secondary)" }}>
                      {item.source}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold mb-2 leading-snug" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {item.whyItMatters}
                  </p>
                </div>

                <div
                  className="flex items-center justify-between pt-3 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="flex gap-1.5">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded font-semibold"
                        style={{
                          color: "var(--text-primary)",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] font-semibold transition"
                    style={{ color: "var(--cyan)" }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.75")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Source <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}
