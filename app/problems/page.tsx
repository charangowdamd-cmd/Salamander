"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PROBLEMS } from "@/lib/data/problems";
import { useUserStore } from "@/lib/store";
import { Search, CheckCircle2, Circle } from "lucide-react";

export default function ProblemsPage() {
  const { state } = useUserStore();
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const categories = useMemo(() => {
    return Array.from(new Set(PROBLEMS.map((p) => p.category)));
  }, []);

  const companies = useMemo(() => {
    const set = new Set<string>();
    PROBLEMS.forEach((p) => p.companies.forEach((c) => set.add(c)));
    return Array.from(set);
  }, []);

  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesDiff =
        selectedDifficulty === "All" || p.difficulty === selectedDifficulty;

      const matchesCat =
        selectedCategory === "All" || p.category === selectedCategory;

      const matchesComp =
        selectedCompany === "All" || p.companies.includes(selectedCompany);

      const isSolved = state.solvedProblems.includes(p.slug);
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Solved" && isSolved) ||
        (selectedStatus === "Unsolved" && !isSolved);

      return matchesSearch && matchesDiff && matchesCat && matchesComp && matchesStatus;
    });
  }, [search, selectedDifficulty, selectedCategory, selectedCompany, selectedStatus, state.solvedProblems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Problem catalog</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Practice foundational data structures, algorithms, and company-specific interview ladders
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problems by name or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Quick Difficulty Filters */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedDifficulty === d
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Topic category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Company tag</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All companies</option>
              {companies.map((comp) => (
                <option key={comp} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Solve status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All problems</option>
              <option value="Solved">Solved</option>
              <option value="Unsolved">Unsolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-[#0c121e] border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-medium text-slate-400">
                <th className="py-3 px-4 w-12 text-center">Status</th>
                <th className="py-3 px-4">Problem</th>
                <th className="py-3 px-4 w-28">Difficulty</th>
                <th className="py-3 px-4 w-44">Category</th>
                <th className="py-3 px-4 w-28">Acceptance</th>
                <th className="py-3 px-4 w-44">Companies</th>
                <th className="py-3 px-4 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">
                    No problems match your current filter selection.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((p) => {
                  const isSolved = state.solvedProblems.includes(p.slug);
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-900/40 transition group"
                    >
                      <td className="py-3.5 px-4 text-center">
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-700 mx-auto" />
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/problems/${p.slug}`}
                          className="font-medium text-slate-100 group-hover:text-emerald-400 transition"
                        >
                          {p.title}
                        </Link>
                        <div className="flex gap-1 mt-1">
                          {p.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                            p.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : p.difficulty === "Medium"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-rose-500/10 text-rose-400"
                          }`}
                        >
                          {p.difficulty}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {p.category}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {p.acceptanceRate}%
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {p.companies.slice(0, 2).join(", ")}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/problems/${p.slug}`}
                          className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition"
                        >
                          Solve
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
