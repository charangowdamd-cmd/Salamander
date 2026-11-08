import { CompanyTrack, RoadmapTopic } from "../types";

export const COMPANY_TRACKS: CompanyTrack[] = [
  {
    id: "amazon",
    name: "Amazon",
    logo: "📦",
    frequency: "Frequently Asked (2025-2026)",
    problemCount: 42,
    slugs: ["two-sum", "longest-substring-without-repeating-characters", "product-of-array-except-self", "top-k-frequent-elements", "coin-change", "trapping-rain-water"],
    description: "Focus on Two Pointers, Sliding Window, Trees, and DP optimization. Leadership Principles alignment."
  },
  {
    id: "google",
    name: "Google",
    logo: "🔍",
    frequency: "Very High Recency",
    problemCount: 58,
    slugs: ["two-sum", "longest-substring-without-repeating-characters", "median-of-two-sorted-arrays", "trapping-rain-water", "word-ladder", "n-queens"],
    description: "Emphasis on clean code, edge cases, optimal logarithmic complexity, and Graph/Backtracking algorithms."
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "🪟",
    frequency: "High Campus Recency",
    problemCount: 36,
    slugs: ["two-sum", "valid-palindrome", "search-in-rotated-sorted-array", "coin-change", "valid-parentheses"],
    description: "Standard DSA patterns: Binary Search, Two Pointers, Linked Lists, Tree Traversals, and System fundamentals."
  },
  {
    id: "meta",
    name: "Meta",
    logo: "♾️",
    frequency: "High Frequency",
    problemCount: 45,
    slugs: ["two-sum", "valid-palindrome", "group-anagrams", "product-of-array-except-self", "trapping-rain-water"],
    description: "Fast-paced coding speed: 2 medium problems in 45 minutes. Array manipulation, hashing, and two-pointer sweeps."
  },
  {
    id: "uber",
    name: "Uber",
    logo: "🚗",
    frequency: "Recent Placement Bar",
    problemCount: 32,
    slugs: ["regular-expression-matching", "word-ladder", "trapping-rain-water", "coin-change"],
    description: "High bar on Dynamic Programming, Graph shortest paths, and state space search."
  }
];

export const ROADMAPS: RoadmapTopic[] = [
  {
    id: "rm-arrays",
    title: "1. Arrays & Hashing",
    description: "Learn hash map lookups, prefix sums, and two-pass array techniques.",
    totalProblems: 20,
    completedProblems: 2,
    problemSlugs: ["two-sum", "find-the-largest-element", "product-of-array-except-self", "group-anagrams", "top-k-frequent-elements"]
  },
  {
    id: "rm-two-pointers",
    title: "2. Two Pointers & In-Place",
    description: "Master converging pointers, fast/slow runners, and space-optimal traversals.",
    totalProblems: 15,
    completedProblems: 1,
    problemSlugs: ["valid-palindrome", "trapping-rain-water", "reverse-string"]
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
    id: "rm-binary-search",
    title: "4. Binary Search",
    description: "Divide-and-conquer on sorted spaces, rotated arrays, and partition medians.",
    totalProblems: 12,
    completedProblems: 0,
    problemSlugs: ["search-in-rotated-sorted-array", "median-of-two-sorted-arrays"]
  },
  {
    id: "rm-dp",
    title: "5. Dynamic Programming",
    description: "Memoization, bottom-up tabulation, unbounded and 0/1 knapsack patterns.",
    totalProblems: 18,
    completedProblems: 0,
    problemSlugs: ["coin-change", "regular-expression-matching", "maximum-subarray", "climbing-stairs"]
  },
  {
    id: "rm-graphs-backtracking",
    title: "6. Graphs & Backtracking",
    description: "Breadth-First Search shortest paths, recursive exploration, and N-Queens state pruning.",
    totalProblems: 14,
    completedProblems: 0,
    problemSlugs: ["word-ladder", "n-queens"]
  }
];
