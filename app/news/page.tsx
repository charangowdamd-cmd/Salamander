"use client";

import { useState } from "react";
import { NEWS_ITEMS } from "@/lib/data/news";
import { ExternalLink, Sparkles, Search } from "lucide-react";

export default function NewsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "AI Developments", "Tools & Frameworks", "Open Source", "Industry"];

  const filteredNews = NEWS_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated engineering intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI and engineering updates</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Stay on the cutting edge with curated updates and actionable developer summaries
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0c121e] border border-slate-800 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search news or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat === "All" ? "All updates" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-emerald-400 font-medium">{item.category}</span>
                <span>{item.source} • {new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>

              <h3 className="text-sm font-bold text-white hover:text-cyan-400 transition">
                {item.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <strong className="text-cyan-400 block mb-0.5">Why it matters for developers:</strong>
                <p className="text-slate-400 leading-relaxed">{item.whyItMatters}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80">
              <div className="flex gap-1">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>Read source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
