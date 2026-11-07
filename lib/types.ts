export type Difficulty = "Easy" | "Medium" | "Hard";

export type ProblemStatus = "unsolved" | "attempted" | "solved";

export type TestCase = {
  id: string;
  input: string;
  expectedOutput: string;
  isSample: boolean;
  explanation?: string;
};

export type Problem = {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  tags: string[];
  companies: string[];
  acceptanceRate: number;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    python: string;
    javascript: string;
    cpp: string;
    java: string;
  };
  testCases: TestCase[];
  editorial: {
    approach: string;
    timeComplexity: string;
    spaceComplexity: string;
    solutions: {
      python: string;
      javascript: string;
    };
  };
};

export type Verdict = 
  | "Accepted" 
  | "Wrong Answer" 
  | "Time Limit Exceeded" 
  | "Runtime Error" 
  | "Compilation Error";

export type SubmissionResult = {
  id: string;
  problemId: string;
  problemSlug: string;
  problemTitle: string;
  code: string;
  language: string;
  verdict: Verdict;
  runtimeMs: number;
  memoryKb: number;
  passedTests: number;
  totalTests: number;
  failedTestCase?: {
    index: number;
    input?: string;
    expected?: string;
    actual?: string;
    isSample: boolean;
  };
  timestamp: string;
};

export type Badge = {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  unlockedAt?: string;
};

export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  college?: string;
  country: string;
  rank: number;
  points: number;
  streak: number;
  longestStreak: number;
  solvedCount: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  badges: Badge[];
  recentSubmissions: SubmissionResult[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
  verifiedAt: string;
};

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  summary: string;
  whyItMatters: string;
  category: "AI Developments" | "Tools & Frameworks" | "Open Source" | "Industry";
  tags: string[];
  url: string;
};

export type CompanyTrack = {
  id: string;
  name: string;
  logo: string;
  frequency: string;
  problemCount: number;
  slugs: string[];
  description: string;
};

export type RoadmapTopic = {
  id: string;
  title: string;
  description: string;
  totalProblems: number;
  completedProblems: number;
  problemSlugs: string[];
};

