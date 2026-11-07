"use client";

import { useState, useEffect } from "react";
import { ALL_BADGES } from "./data/badges";
import { Badge, SubmissionResult } from "./types";
import { getSupabase } from "./supabase/client";

const STORAGE_KEY = "salamanders_user_state_v1";

type UserState = {
  solvedProblems: string[];
  attemptedProblems: string[];
  points: number;
  streak: number;
  longestStreak: number;
  lastSolvedDate: string | null;
  badges: Badge[];
  submissions: SubmissionResult[];
  username: string;
};

const defaultState: UserState = {
  solvedProblems: [],
  attemptedProblems: [],
  points: 0,
  streak: 1,
  longestStreak: 1,
  lastSolvedDate: null,
  badges: [],
  submissions: [],
  username: "alex_coder",
};

export function getStoredState(): UserState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return JSON.parse(raw);
  } catch {
    return defaultState;
  }
}

export function saveState(state: UserState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state to localStorage", e);
  }
}

export function useUserStore() {
  const [state, setState] = useState<UserState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const local = getStoredState();
    setState(local);
    setIsLoaded(true);

    // If Supabase is available, load user's profile and submissions
    const supabase = getSupabase();
    if (supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          // Fetch profile
          supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single()
            .then(({ data: profile }) => {
              if (profile) {
                setState((prev) => {
                  const merged = {
                    ...prev,
                    points: profile.points || prev.points,
                    streak: profile.streak || prev.streak,
                    longestStreak: profile.longest_streak || prev.longestStreak,
                    username: profile.username || prev.username,
                  };
                  saveState(merged);
                  return merged;
                });
              }
            });

          // Fetch submissions
          supabase
            .from("submissions")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(50)
            .then(({ data: remoteSubs }) => {
              if (remoteSubs && remoteSubs.length > 0) {
                const formatted: SubmissionResult[] = remoteSubs.map((s) => ({
                  id: s.id,
                  problemId: s.problem_slug,
                  problemSlug: s.problem_slug,
                  problemTitle: s.problem_title,
                  code: s.code,
                  language: s.language,
                  verdict: s.verdict as any,
                  runtimeMs: s.runtime_ms,
                  memoryKb: s.memory_kb,
                  passedTests: s.passed_tests,
                  totalTests: s.total_tests,
                  timestamp: s.created_at,
                }));

                const solvedSlugs = Array.from(
                  new Set(
                    formatted
                      .filter((s) => s.verdict === "Accepted")
                      .map((s) => s.problemSlug)
                  )
                );

                setState((prev) => {
                  const nextState = {
                    ...prev,
                    submissions: formatted,
                    solvedProblems: Array.from(new Set([...prev.solvedProblems, ...solvedSlugs])),
                  };
                  saveState(nextState);
                  return nextState;
                });
              }
            });
        }
      });
    }
  }, []);

  const recordSubmission = (
    sub: Omit<SubmissionResult, "id" | "timestamp">,
    difficulty: "Easy" | "Medium" | "Hard"
  ) => {
    const today = new Date().toISOString().split("T")[0];
    const newSubmission: SubmissionResult = {
      ...sub,
      id: "sub_" + Date.now(),
      timestamp: new Date().toISOString(),
    };

    setState((prev) => {
      const nextSubmissions = [newSubmission, ...prev.submissions].slice(0, 50);
      const isAlreadySolved = prev.solvedProblems.includes(sub.problemSlug);
      let nextSolved = prev.solvedProblems;
      let nextPoints = prev.points;
      let nextStreak = prev.streak;
      let nextLongest = prev.longestStreak;
      let nextLastSolvedDate = prev.lastSolvedDate;

      if (sub.verdict === "Accepted") {
        if (!isAlreadySolved) {
          nextSolved = [...prev.solvedProblems, sub.problemSlug];
          const pointMap = { Easy: 10, Medium: 25, Hard: 50 };
          nextPoints += pointMap[difficulty] || 10;
        }

        if (nextLastSolvedDate !== today) {
          nextStreak += 1;
          if (nextStreak > nextLongest) nextLongest = nextStreak;
          nextLastSolvedDate = today;
        }
      }

      // Evaluate badges
      const unlockedBadgeKeys = new Set(prev.badges.map((b) => b.key));
      const newlyEarnedBadges: Badge[] = [];

      if (nextSolved.length >= 1 && !unlockedBadgeKeys.has("first-accepted")) {
        const b = ALL_BADGES.find((x) => x.key === "first-accepted");
        if (b) newlyEarnedBadges.push({ ...b, unlockedAt: new Date().toISOString() });
      }

      if (nextStreak >= 3 && !unlockedBadgeKeys.has("streak-3")) {
        const b = ALL_BADGES.find((x) => x.key === "streak-3");
        if (b) newlyEarnedBadges.push({ ...b, unlockedAt: new Date().toISOString() });
      }

      const nextBadges = [...prev.badges, ...newlyEarnedBadges];

      const updatedState: UserState = {
        ...prev,
        solvedProblems: nextSolved,
        attemptedProblems: Array.from(new Set([...prev.attemptedProblems, sub.problemSlug])),
        points: nextPoints,
        streak: nextStreak,
        longestStreak: nextLongest,
        lastSolvedDate: nextLastSolvedDate,
        submissions: nextSubmissions,
        badges: nextBadges,
      };

      saveState(updatedState);

      // Async write to Supabase if session exists
      const supabase = getSupabase();
      if (supabase) {
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user) {
            // Insert submission
            supabase.from("submissions").insert({
              user_id: user.id,
              problem_slug: sub.problemSlug,
              problem_title: sub.problemTitle,
              language: sub.language,
              code: sub.code,
              verdict: sub.verdict,
              runtime_ms: sub.runtimeMs,
              memory_kb: sub.memoryKb,
              passed_tests: sub.passedTests,
              total_tests: sub.totalTests,
            }).then(() => {});

            // Update profile stats
            supabase.from("profiles").update({
              points: nextPoints,
              streak: nextStreak,
              longest_streak: nextLongest,
              updated_at: new Date().toISOString(),
            }).eq("id", user.id).then(() => {});
          }
        });
      }

      return updatedState;
    });
  };

  return {
    state,
    isLoaded,
    recordSubmission,
  };
}
