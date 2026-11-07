import { NewsItem } from "../types";

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    title: "Gemini 2.5 Flash Native Reasoning Released for Developers",
    source: "Google DeepMind Blog",
    publishedAt: "2026-11-06T14:00:00Z",
    summary: "New capabilities for low-latency chain-of-thought processing and coding assistance in real-time developer workflows.",
    whyItMatters: "Enables instant debugging assistance without high API latencies, critical for interactive code editors and live mentoring.",
    category: "AI Developments",
    tags: ["LLM", "Reasoning", "Google"],
    url: "https://blog.google/technology/ai/"
  },
  {
    id: "news-2",
    title: "Next.js Turbopack Stability and Build Performance Benchmark",
    source: "Vercel News",
    publishedAt: "2026-11-04T10:30:00Z",
    summary: "Benchmarking shows 3x faster local HMR and 40% reduction in memory overhead for enterprise codebases.",
    whyItMatters: "Fast feedback loops mean instantaneous preview rendering for developer platforms.",
    category: "Tools & Frameworks",
    tags: ["Next.js", "React", "Frontend"],
    url: "https://nextjs.org/blog"
  },
  {
    id: "news-3",
    title: "PostgreSQL 17 Vector Search Performance Advances",
    source: "Postgres Weekly",
    publishedAt: "2026-11-02T08:15:00Z",
    summary: "pgvector index optimization delivers up to 5x faster approximate nearest neighbor queries.",
    whyItMatters: "Direct in-database embeddings eliminate the need for complex standalone vector databases in medium-scale platforms.",
    category: "Open Source",
    tags: ["PostgreSQL", "Database", "pgvector"],
    url: "https://www.postgresql.org"
  },
  {
    id: "news-4",
    title: "Tech Hiring Trends 2026: Shift Toward Verifiable Skill Evidence",
    source: "Engineering Leadership Report",
    publishedAt: "2026-10-29T16:45:00Z",
    summary: "Over 70% of hiring managers now value verifiable coding profiles and reproducible problem solving over static resumes.",
    whyItMatters: "Validates the Salamanders Proof of Skills model: portable, verified developer profiles carry real hiring weight.",
    category: "Industry",
    tags: ["Careers", "Placements", "Hiring"],
    url: "https://news.ycombinator.com"
  }
];

