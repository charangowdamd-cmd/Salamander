import { CompanyTrack, RoadmapTopic } from "../types";

export const COMPANY_TRACKS: CompanyTrack[] = [
  {
    id: "amazon",
    name: "Amazon",
    logo: "📦",
    frequency: "Frequently Asked (2025-2026)",
    problemCount: 42,
    slugs: ["two-sum", "longest-substring-without-repeating-characters", "coin-change", "trapping-rain-water"],
    description: "Focus on Two Pointers, Sliding Window, Trees, and DP optimization. Customer obsession behavioral questions."
  },
  {
    id: "google",
    name: "Google",
    logo: "🔍",
    frequency: "Very High Recency",
    problemCount: 58,
    slugs: ["two-sum", "longest-substring-without-repeating-characters", "trapping-rain-water"],
    description: "Emphasis on clean code, edge cases, optimal complexity, and Graph/DP algorithms."
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "🪟",
    frequency: "High Campus Recency",
    problemCount: 36,
    slugs: ["two-sum", "valid-palindrome", "coin-change"],
    description: "Standard DSA patterns: Two Pointers, Linked Lists, Tree Traversals, and System fundamentals."
  },
  {
    id: "meta",
    name: "Meta",
    logo: "♾️",
    frequency: "High Frequency",
    problemCount: 45,
    slugs: ["two-sum", "valid-palindrome", "trapping-rain-water"],
    description: "Fast-paced coding speed: 2 medium problems in 45 minutes. Array manipulation and graph search."
  },
  {
    id: "tcs-digital",
    name: "TCS Digital / Prime",
    logo: "💼",
    frequency: "Placement Season Standard",
    problemCount: 28,
    slugs: ["two-sum", "valid-palindrome"],
    description: "Strings, basic number theory, array sorting, and greedy logic for college campus placements."
  }
];

export const ROADMAPS: RoadmapTopic[] = [
  {
    id: "rm-arrays",
    title: "1. Arrays & Hashing",
    description: "Learn hash map lookups, prefix sums, and two-pass array techniques.",
    totalProblems: 15,
    completedProblems: 1,
    problemSlugs: ["two-sum"]
  },
  {
    id: "rm-two-pointers",
    title: "2. Two Pointers & In-Place",
    description: "Master converging pointers, fast/slow runners, and space-optimal traversals.",
    totalProblems: 12,
    completedProblems: 1,
    problemSlugs: ["valid-palindrome", "trapping-rain-water"]
  },
  {
    id: "rm-sliding-window",
    title: "3. Sliding Window",
    description: "Dynamic and fixed-size windows for substring and subarray optimization.",
    totalProblems: 10,
    completedProblems: 1,
    problemSlugs: ["longest-substring-without-repeating-characters"]
  },
  {
    id: "rm-dp",
    title: "4. Dynamic Programming",
    description: "Memoization, bottom-up tabulation, unbounded and 0/1 knapsack patterns.",
    totalProblems: 18,
    completedProblems: 0,
    problemSlugs: ["coin-change"]
  }
];

