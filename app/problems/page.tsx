"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PROBLEMS } from "@/lib/data/problems";
import { useUserStore } from "@/lib/store";
import { Search, CheckCircle2, ArrowRight } from "lucide-react";

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

  const difficultyCards = [
    { label: "All", count: totalCount, solved: state.solvedProblems.length, color: "var(--text-primary)" },
    { label: "Easy", count: easyCount, solved: easySolved, color: "var(--accent)" },
    { label: "Medium", count: medCount, solved: medSolved, color: "var(--amber)" },
    { label: "Hard", count: hardCount, solved: hardSolved, color: "var(--rose)" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-7">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            Problem catalog
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            20 curated placement problems — Arrays, Strings, Sliding Window, DP, Graphs, Trees
          </p>
        </div>

        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border self-start sm:self-auto"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Solved</span>
          <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>
            {state.solvedProblems.length}
            <span className="font-normal ml-1" style={{ color: "var(--text-muted)" }}>/ {totalCount}</span>
          </span>
          <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${(state.solvedProblems.length / totalCount) * 100}%`, backgroundColor: "var(--accent)" }}
            />
          </div>
        </div>
      </div>

      {/* Difficulty filter cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {difficultyCards.map(({ label, count, solved, color }) => {
          const isActive = selectedDifficulty === label;
          return (
            <button
              key={label}
              onClick={() => setSelectedDifficulty(label)}
              className="p-4 rounded-xl border text-left transition"
              style={{
                backgroundColor: isActive
                  ? `color-mix(in srgb, ${color} 8%, var(--surface))`
                  : "var(--surface)",
                borderColor: isActive
                  ? `color-mix(in srgb, ${color} 40%, transparent)`
                  : "var(--border)",
              }}
            >
              <span className="text-xs font-medium block" style={{ color: isActive ? color : "var(--text-muted)" }}>
                {label === "All" ? "All problems" : label}
              </span>
              <div className="text-2xl font-black mt-1" style={{ color: "var(--text-primary)" }}>
                {count}
              </div>
              <span className="text-[11px] mt-0.5 block" style={{ color: "var(--text-muted)" }}>
                {solved} solved
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div
        className="rounded-xl border p-4 space-y-3"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search by title, tag, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-xs outline-none transition"
              style={{
                backgroundColor: "var(--canvas)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Status tabs */}
          <div className="flex items-center gap-1">
            {["All", "Solved", "Unsolved"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className="px-3 py-1.5 rounded-md text-xs font-semibold transition"
                style={
                  selectedStatus === st
                    ? { backgroundColor: "var(--surface-2)", color: "var(--text-primary)", border: "1px solid var(--border-strong)" }
                    : { color: "var(--text-muted)", border: "1px solid transparent" }
                }
                onMouseOver={e => { if (selectedStatus !== st) e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseOut={e => { if (selectedStatus !== st) e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Category chips */}
        <div
          className="flex flex-wrap gap-1.5 pt-3 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium transition"
                style={
                  isActive
                    ? { backgroundColor: "var(--accent-subtle)", color: "var(--accent)", border: "1px solid rgba(16,185,129,0.25)" }
                    : { backgroundColor: "var(--canvas)", color: "var(--text-muted)", border: "1px solid var(--border)" }
                }
                onMouseOver={e => { if (!isActive) e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseOut={e => { if (!isActive) e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Problems table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="text-[11px] font-medium border-b"
                style={{ backgroundColor: "var(--canvas)", borderColor: "var(--border)", color: "var(--text-muted)" }}
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
                  <td colSpan={7} className="py-12 text-center text-xs" style={{ color: "var(--text-muted)" }}>
                    No problems match your filters.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((p, idx) => {
                  const isSolved = state.solvedProblems.includes(p.slug);
                  const diffColor =
                    p.difficulty === "Easy" ? "var(--accent)" :
                    p.difficulty === "Medium" ? "var(--amber)" : "var(--rose)";

                  return (
                    <tr
                      key={p.id}
                      className="border-b transition group"
                      style={{ borderColor: "var(--border)" }}
                      onMouseOver={e => (e.currentTarget.style.backgroundColor = "var(--surface-2)")}
                      onMouseOut={e => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 mx-auto" style={{ color: "var(--accent)" }} />
                        ) : (
                          <div
                            className="w-3.5 h-3.5 rounded-full border mx-auto"
                            style={{ borderColor: "var(--border-strong)" }}
                          />
                        )}
                      </td>

                      {/* Title */}
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/problems/${p.slug}`}
                          className="text-xs font-medium transition"
                          style={{ color: "var(--text-secondary)" }}
                          onMouseOver={e => (e.currentTarget.style.color = "var(--accent)")}
                          onMouseOut={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                        >
                          <span className="font-mono text-[10px] mr-2" style={{ color: "var(--text-muted)" }}>
                            {idx + 1}.
                          </span>
                          {p.title}
                        </Link>
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-4">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold"
                          style={{
                            color: diffColor,
                            backgroundColor: `color-mix(in srgb, ${diffColor} 10%, transparent)`,
                          }}
                        >
                          {p.difficulty}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-xs" style={{ color: "var(--text-secondary)" }}>
                        {p.category}
                      </td>

                      {/* Acceptance */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] w-9" style={{ color: "var(--text-secondary)" }}>
                            {p.acceptanceRate}%
                          </span>
                          <div className="w-12 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${p.acceptanceRate}%`, backgroundColor: "var(--border-strong)" }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Companies */}
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {p.companies.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className="text-[10px] px-1.5 py-0.5 rounded"
                              style={{ color: "var(--text-muted)", backgroundColor: "var(--canvas)", border: "1px solid var(--border)" }}
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/problems/${p.slug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition"
                          style={{
                            backgroundColor: "var(--canvas)",
                            color: "var(--text-secondary)",
                            border: "1px solid var(--border)",
                          }}
                          onMouseOver={e => {
                            e.currentTarget.style.backgroundColor = "var(--accent)";
                            e.currentTarget.style.color = "var(--accent-text)";
                            e.currentTarget.style.borderColor = "var(--accent)";
                          }}
                          onMouseOut={e => {
                            e.currentTarget.style.backgroundColor = "var(--canvas)";
                            e.currentTarget.style.color = "var(--text-secondary)";
                            e.currentTarget.style.borderColor = "var(--border)";
                          }}
                        >
                          Solve <ArrowRight className="w-3 h-3" />
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
  );
}
