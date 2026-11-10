"use client";

import { useState } from "react";
import { NEWS_ITEMS } from "@/lib/data/news";
import { ExternalLink, Sparkles, Search } from "lucide-react";
import Plasma from "@/components/Plasma";

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
    <div className="relative min-h-screen">
      {/* Plasma page background */}
      <div className="fixed inset-0 opacity-18 pointer-events-none" style={{ zIndex: 0 }}>
        <Plasma color="#ff2727" speed={0.35} scale={0.65} twist={0.85} softness={0.7} shine={0.6} wave={2.0} mouseInteractive={false} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" style={{ zIndex: 1 }}>
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
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border"
        style={{
          background: "rgba(14,14,22,0.92)",
          borderColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search news or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
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
            className="p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4"
            style={{
              background: "rgba(14,14,22,0.92)",
              borderColor: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "rgba(6,182,212,0.45)";
              e.currentTarget.style.boxShadow = "0 0 24px rgba(6,182,212,0.2), 0 8px 30px rgba(0,0,0,0.6)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="text-emerald-400 font-bold">{item.category}</span>
                <span className="text-slate-400 font-medium">{item.source} • {new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>

              <h3 className="text-sm font-bold text-white hover:text-cyan-400 transition leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-200 leading-relaxed">{item.summary}</p>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs">
                <strong className="text-cyan-400 block mb-0.5 font-bold">Why it matters for developers:</strong>
                <p className="text-slate-300 leading-relaxed font-normal">{item.whyItMatters}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
              <div className="flex gap-1">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded font-semibold text-slate-300"
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
    </div>
  );
}
