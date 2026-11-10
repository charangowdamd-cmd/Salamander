"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PROBLEMS } from "@/lib/data/problems";
import { useUserStore } from "@/lib/store";
import { Search, CheckCircle2, ArrowRight, ChevronRight } from "lucide-react";
import Plasma from "@/components/Plasma";

export default function ProblemsPage() {
  const { state } = useUserStore();
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const totalCount = PROBLEMS.length;
  const easyCount = PROBLEMS.filter((p) => p.difficulty === "Easy").length;
  const medCount = PROBLEMS.filter((p) => p.difficulty === "Medium").length;
  const hardCount = PROBLEMS.filter((p) => p.difficulty === "Hard").length;

  const easySolved = state.solvedProblems.filter((slug) =>
    PROBLEMS.find((p) => p.slug === slug)?.difficulty === "Easy"
  ).length;
  const medSolved = state.solvedProblems.filter((slug) =>
    PROBLEMS.find((p) => p.slug === slug)?.difficulty === "Medium"
  ).length;
  const hardSolved = state.solvedProblems.filter((slug) =>
    PROBLEMS.find((p) => p.slug === slug)?.difficulty === "Hard"
  ).length;

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PROBLEMS.map((p) => p.category)))],
    []
  );

  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.companies.some((c) => c.toLowerCase().includes(search.toLowerCase()));
      const matchesDiff = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
      const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
      const isSolved = state.solvedProblems.includes(p.slug);
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Solved" && isSolved) ||
        (selectedStatus === "Unsolved" && !isSolved);
      return matchesSearch && matchesDiff && matchesCat && matchesStatus;
    });
  }, [search, selectedDifficulty, selectedCategory, selectedStatus, state.solvedProblems]);

  const diffCards = [
    { label: "All", count: totalCount, solved: state.solvedProblems.length, color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
    { label: "Easy", count: easyCount, solved: easySolved, color: "#22c55e", bg: "rgba(34,197,94,0.08)" },
    { label: "Medium", count: medCount, solved: medSolved, color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
    { label: "Hard", count: hardCount, solved: hardSolved, color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  ];

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(239,68,68,0.06) 0%, transparent 50%), var(--canvas)",
      }}
    >
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{ zIndex: 0 }}>
        <Plasma color="#ff2727" speed={0.4} scale={0.7} twist={1} softness={0.65} shine={0.7} wave={1.95} mouseInteractive={false} />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
              Problem catalog
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              20 curated placement problems — Arrays, Strings, Sliding Window, DP, Graphs, Trees
            </p>
          </div>

          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl self-start sm:self-auto"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Solved</span>
            <span className="text-sm font-bold" style={{ color: "#22c55e" }}>
              {state.solvedProblems.length}
              <span className="font-normal ml-1" style={{ color: "var(--text-muted)" }}>/ {totalCount}</span>
            </span>
            <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(state.solvedProblems.length / totalCount) * 100}%`,
                  background: "linear-gradient(90deg, #22c55e, #16a34a)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Difficulty stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {diffCards.map(({ label, count, solved, color, bg }) => {
            const isActive = selectedDifficulty === label;
            return (
              <button
                key={label}
                onClick={() => setSelectedDifficulty(label)}
                className="p-5 rounded-2xl text-left transition-all duration-200"
                style={{
                  background: isActive ? `color-mix(in srgb, ${color} 18%, rgba(14,14,22,0.92))` : "rgba(14,14,22,0.9)",
                  border: `1px solid ${isActive ? `color-mix(in srgb, ${color} 50%, transparent)` : "rgba(255,255,255,0.12)"}`,
                  boxShadow: isActive ? `0 0 20px color-mix(in srgb, ${color} 25%, transparent)` : "0 4px 20px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(16px)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = `color-mix(in srgb, ${color} 60%, transparent)`;
                  e.currentTarget.style.boxShadow = `0 0 24px color-mix(in srgb, ${color} 28%, transparent), 0 8px 30px rgba(0,0,0,0.5)`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = isActive ? `color-mix(in srgb, ${color} 50%, transparent)` : "rgba(255,255,255,0.12)";
                  e.currentTarget.style.boxShadow = isActive ? `0 0 20px color-mix(in srgb, ${color} 25%, transparent)` : "0 4px 20px rgba(0,0,0,0.4)";
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
              >
                <span
                  className="text-xs font-bold block"
                  style={{ color: isActive ? color : "var(--text-secondary)" }}
                >
                  {label === "All" ? "All problems" : label}
                </span>
                <div className="text-3xl font-black mt-1" style={{ color: "var(--text-primary)" }}>
                  {count}
                </div>
                <span className="text-[11px] mt-0.5 block font-medium" style={{ color: "var(--text-secondary)" }}>
                  {solved} solved
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter bar */}
        <div
          className="rounded-2xl p-4 space-y-3"
          style={{
            background: "rgba(14,14,22,0.92)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-secondary)" }}
              />
              <input
                type="text"
                placeholder="Search by title, tag, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs outline-none transition"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>

            {/* Status tabs */}
            <div className="flex items-center gap-1">
              {["All", "Solved", "Unsolved"].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition"
                  style={
                    selectedStatus === st
                      ? {
                          background: "rgba(239,68,68,0.15)",
                          color: "#ef4444",
                          border: "1px solid rgba(239,68,68,0.3)",
                        }
                      : { color: "var(--text-secondary)", border: "1px solid transparent" }
                  }
                  onMouseOver={(e) => { if (selectedStatus !== st) e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseOut={(e) => { if (selectedStatus !== st) e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Category chips */}
          <div
            className="flex flex-wrap gap-1.5 pt-3 border-t"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition"
                  style={
                    isActive
                      ? {
                          background: "rgba(239,68,68,0.18)",
                          color: "#ef4444",
                          border: "1px solid rgba(239,68,68,0.35)",
                        }
                      : {
                          background: "rgba(255,255,255,0.06)",
                          color: "var(--text-secondary)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }
                  }
                  onMouseOver={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-primary)"; }}
                  onMouseOut={(e) => { if (!isActive) e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Problems table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(14,14,22,0.94)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.45)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className="text-[11px] font-bold border-b uppercase tracking-wider"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <th className="py-3 px-4 w-10 text-center">
                    <span className="sr-only">Status</span>
                  </th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Acceptance</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Companies</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                      No problems match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredProblems.map((p, idx) => {
                    const isSolved = state.solvedProblems.includes(p.slug);
                    const diffColor =
                      p.difficulty === "Easy"
                        ? "#22c55e"
                        : p.difficulty === "Medium"
                        ? "#f59e0b"
                        : "#ef4444";
                    const diffBg =
                      p.difficulty === "Easy"
                        ? "rgba(34,197,94,0.15)"
                        : p.difficulty === "Medium"
                        ? "rgba(245,158,11,0.15)"
                        : "rgba(239,68,68,0.15)";

                    return (
                      <tr
                        key={p.id}
                        className="border-b group transition-all duration-150"
                        style={{ borderColor: "rgba(255,255,255,0.06)" }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.06)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        {/* Status */}
                        <td className="py-4 px-4 text-center">
                          {isSolved ? (
                            <CheckCircle2 className="w-4 h-4 mx-auto" style={{ color: "#22c55e" }} />
                          ) : (
                            <div
                              className="w-3.5 h-3.5 rounded-full border mx-auto"
                              style={{ borderColor: "rgba(255,255,255,0.2)" }}
                            />
                          )}
                        </td>

                        {/* Title */}
                        <td className="py-4 px-4">
                          <Link
                            href={`/problems/${p.slug}`}
                            className="text-sm font-semibold transition flex items-center"
                            style={{ color: "var(--text-primary)" }}
                            onMouseOver={(e) => (e.currentTarget.style.color = "#ef4444")}
                            onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                          >
                            <span className="font-mono text-[11px] mr-2 font-normal" style={{ color: "var(--text-secondary)" }}>
                              {String(idx + 1).padStart(2, "0")}.
                            </span>
                            {p.title}
                          </Link>
                        </td>

                        {/* Difficulty */}
                        <td className="py-4 px-4">
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-semibold"
                            style={{ color: diffColor, backgroundColor: diffBg }}
                          >
                            {p.difficulty}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 text-xs" style={{ color: "var(--text-secondary)" }}>
                          {p.category}
                        </td>

                        {/* Acceptance */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-14 h-1 rounded-full overflow-hidden"
                              style={{ background: "rgba(255,255,255,0.08)" }}
                            >
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${p.acceptanceRate}%`,
                                  background: `linear-gradient(90deg, ${diffColor}, ${diffColor}88)`,
                                }}
                              />
                            </div>
                            <span
                              className="font-mono text-[11px] w-9"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {p.acceptanceRate}%
                            </span>
                          </div>
                        </td>

                        {/* Companies */}
                        <td className="py-4 px-4 hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {p.companies.slice(0, 3).map((comp) => (
                              <span
                                key={comp}
                                className="text-[10px] px-1.5 py-0.5 rounded"
                                style={{
                                  color: "var(--text-muted)",
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }}
                              >
                                {comp}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 text-right">
                          <Link
                            href={`/problems/${p.slug}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              color: "var(--text-secondary)",
                              border: "1px solid rgba(255,255,255,0.09)",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = "rgba(239,68,68,0.12)";
                              e.currentTarget.style.color = "#ef4444";
                              e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                              e.currentTarget.style.color = "var(--text-secondary)";
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                            }}
                          >
                            Solve <ChevronRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
