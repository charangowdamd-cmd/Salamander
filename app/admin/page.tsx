"use client";

import { useState } from "react";
import { PROBLEMS } from "@/lib/data/problems";
import { ShieldCheck, Database, CheckCircle2, AlertTriangle, Activity, Users, Settings } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"problems" | "analytics" | "audit">("problems");
  const [validatingSlug, setValidatingSlug] = useState<string | null>(null);
  const [validationMsg, setValidationMsg] = useState<string | null>(null);

  const handleValidateProblem = async (slug: string) => {
    setValidatingSlug(slug);
    setValidationMsg("Running reference solutions on all test suites...");

    const p = PROBLEMS.find((x) => x.slug === slug);
    if (!p) return;

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemSlug: slug,
          code: p.editorial.solutions.python || p.starterCode.python,
          language: "python",
        }),
      });
      const data = await res.json();
      if (data.verdict === "Accepted") {
        setValidationMsg(`Reference solution passed all test cases in ${data.runtimeMs}ms. Problem verified.`);
      } else {
        setValidationMsg(`Reference solution failed with: ${data.verdict}`);
      }
    } catch (e: any) {
      setValidationMsg("Validation error: " + e.message);
    } finally {
      setValidatingSlug(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform operations and content management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin operations console</h1>
        </div>

        {/* Navigation tabs */}
        <div className="flex bg-[#0c121e] border border-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("problems")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "problems" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Problems and tests
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "analytics" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            System metrics
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "audit" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            Audit log
          </button>
        </div>
      </div>

      {activeTab === "problems" && (
        <div className="space-y-6">
          {validationMsg && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs text-emerald-300 font-mono">
              {validationMsg}
            </div>
          )}

          <div className="bg-[#0c121e] border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xs font-bold text-white">Problem catalog validation</h3>
              <span className="text-xs text-slate-500">{PROBLEMS.length} active problems loaded</span>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-medium">
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Test suite</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Validation action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {PROBLEMS.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3 px-4 font-medium text-white">{p.title}</td>
                    <td className="py-3 px-4 text-slate-400">{p.difficulty}</td>
                    <td className="py-3 px-4 text-slate-400 font-mono">{p.testCases.length} cases</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium text-[11px]">
                        Published
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleValidateProblem(p.slug)}
                        disabled={validatingSlug === p.slug}
                        className="px-3 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium transition disabled:opacity-50"
                      >
                        {validatingSlug === p.slug ? "Validating..." : "Run test suite"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400">Total judging runs</span>
            <div className="text-2xl font-black text-white">48,920</div>
            <p className="text-[11px] text-emerald-400">Median verdict: 28ms</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400">AI mentor tokens</span>
            <div className="text-2xl font-black text-cyan-400">1.24M</div>
            <p className="text-[11px] text-slate-400">Under budget cap</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400">Judge availability</span>
            <div className="text-2xl font-black text-emerald-400">99.98%</div>
            <p className="text-[11px] text-slate-400">Durable queue architecture</p>
          </div>
        </div>
      )}

      {activeTab === "audit" && (
        <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">Administrative audit log</h3>
          <div className="space-y-2 font-mono text-xs text-slate-400">
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              [2026-11-07 23:15:02] ADMIN (system): Problem &apos;Two Sum&apos; v1 test-case suite validated and published.
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              [2026-11-07 22:40:19] ADMIN (system): Updated Company Track &apos;Amazon&apos; frequency weightings.
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              [2026-11-07 21:05:41] SYSTEM: Daily streak check completed across active users.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
