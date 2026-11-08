"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PROBLEMS } from "@/lib/data/problems";
import { useUserStore } from "@/lib/store";
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Code2, 
  Sparkles,
  Building2,
  TrendingUp,
  Layers
} from "lucide-react";

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

  const easySolved = state.solvedProblems.filter((slug) => {
    return PROBLEMS.find((p) => p.slug === slug)?.difficulty === "Easy";
  }).length;

  const medSolved = state.solvedProblems.filter((slug) => {
    return PROBLEMS.find((p) => p.slug === slug)?.difficulty === "Medium";
  }).length;

  const hardSolved = state.solvedProblems.filter((slug) => {
    return PROBLEMS.find((p) => p.slug === slug)?.difficulty === "Hard";
  }).length;

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(PROBLEMS.map((p) => p.category)))];
  }, []);

  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.companies.some((c) => c.toLowerCase().includes(search.toLowerCase()));

      const matchesDiff =
        selectedDifficulty === "All" || p.difficulty === selectedDifficulty;

      const matchesCat =
        selectedCategory === "All" || p.category === selectedCategory;

      const isSolved = state.solvedProblems.includes(p.slug);
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Solved" && isSolved) ||
        (selectedStatus === "Unsolved" && !isSolved);

      return matchesSearch && matchesDiff && matchesCat && matchesStatus;
    });
  }, [search, selectedDifficulty, selectedCategory, selectedStatus, state.solvedProblems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>20 Curated Placement Problems</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Problem catalog</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Core interview question bank covering Arrays, Strings, Sliding Window, DP, Graphs, and Trees
          </p>
        </div>

        {/* User Progress Pill */}
        <div className="flex items-center gap-2 bg-[#0c121e] border border-slate-800 px-4 py-2 rounded-2xl">
          <div className="text-xs text-slate-400">Solved</div>
          <div className="text-sm font-bold text-emerald-400">
            {state.solvedProblems.length} <span className="text-slate-500 font-normal">/ {totalCount}</span>
          </div>
          <div className="w-16 bg-slate-900 h-1.5 rounded-full overflow-hidden ml-2">
            <div 
              className="bg-emerald-500 h-full transition"
              style={{ width: `${(state.solvedProblems.length / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Difficulty Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setSelectedDifficulty("All")}
          className={`p-4 rounded-2xl border text-left transition ${
            selectedDifficulty === "All"
              ? "bg-slate-800/80 border-slate-600 shadow-sm"
              : "bg-[#0c121e] border-slate-800 hover:border-slate-700"
          }`}
        >
          <span className="text-xs text-slate-400 block font-medium">All Problems</span>
          <div className="text-2xl font-extrabold text-white mt-1">{totalCount}</div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            {state.solvedProblems.length} solved
          </span>
        </button>

        <button
          onClick={() => setSelectedDifficulty("Easy")}
          className={`p-4 rounded-2xl border text-left transition ${
            selectedDifficulty === "Easy"
              ? "bg-emerald-500/10 border-emerald-500/40 shadow-sm"
              : "bg-[#0c121e] border-slate-800 hover:border-slate-700"
          }`}
        >
          <span className="text-xs text-emerald-400 block font-medium">Easy</span>
          <div className="text-2xl font-extrabold text-white mt-1">{easyCount}</div>
          <span className="text-[11px] text-emerald-500/80 mt-0.5 block">
            {easySolved} / {easyCount} solved
          </span>
        </button>

        <button
          onClick={() => setSelectedDifficulty("Medium")}
          className={`p-4 rounded-2xl border text-left transition ${
            selectedDifficulty === "Medium"
              ? "bg-amber-500/10 border-amber-500/40 shadow-sm"
              : "bg-[#0c121e] border-slate-800 hover:border-slate-700"
          }`}
        >
          <span className="text-xs text-amber-400 block font-medium">Medium</span>
          <div className="text-2xl font-extrabold text-white mt-1">{medCount}</div>
          <span className="text-[11px] text-amber-500/80 mt-0.5 block">
            {medSolved} / {medCount} solved
          </span>
        </button>

        <button
          onClick={() => setSelectedDifficulty("Hard")}
          className={`p-4 rounded-2xl border text-left transition ${
            selectedDifficulty === "Hard"
              ? "bg-rose-500/10 border-rose-500/40 shadow-sm"
              : "bg-[#0c121e] border-slate-800 hover:border-slate-700"
          }`}
        >
          <span className="text-xs text-rose-400 block font-medium">Hard</span>
          <div className="text-2xl font-extrabold text-white mt-1">{hardCount}</div>
          <span className="text-[11px] text-rose-500/80 mt-0.5 block">
            {hardSolved} / {hardCount} solved
          </span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, tag, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto">
            {["All", "Solved", "Unsolved"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedStatus === st
                    ? "bg-slate-800 text-white border border-slate-700"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                selectedCategory === cat
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                  : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-[#0c121e] border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-medium text-slate-400">
                <th className="py-3.5 px-4 w-12 text-center">Status</th>
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Acceptance</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">Companies</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-xs">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500 text-xs">
                    No problems matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((p, idx) => {
                  const isSolved = state.solvedProblems.includes(p.slug);
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-900/40 transition group"
                    >
                      {/* Solved Status */}
                      <td className="py-3.5 px-4 text-center">
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-700 mx-auto" />
                        )}
                      </td>

                      {/* Problem Title */}
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/problems/${p.slug}`}
                          className="font-medium text-slate-200 hover:text-emerald-400 transition"
                        >
                          <span className="text-slate-500 mr-2 font-mono text-[11px]">{idx + 1}.</span>
                          {p.title}
                        </Link>
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            p.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : p.difficulty === "Medium"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          {p.difficulty}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-slate-300">
                        {p.category}
                      </td>

                      {/* Acceptance Rate */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-slate-300 w-10">
                            {p.acceptanceRate}%
                          </span>
                          <div className="w-14 bg-slate-900 h-1 rounded-full overflow-hidden">
                            <div 
                              className="bg-slate-600 h-full"
                              style={{ width: `${p.acceptanceRate}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Companies */}
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {p.companies.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className="text-[10px] bg-slate-950 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded"
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
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold transition"
                        >
                          <span>Solve</span>
                          <ArrowRight className="w-3 h-3" />
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
