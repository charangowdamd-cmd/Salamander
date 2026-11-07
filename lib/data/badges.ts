import { Badge } from "../types";

export const ALL_BADGES: Badge[] = [
  {
    id: "b-first-blood",
    key: "first-accepted",
    name: "First Blood",
    description: "Submit and get your first problem Accepted.",
    icon: "⚔️",
    rarity: "Common",
  },
  {
    id: "b-streak-3",
    key: "streak-3",
    name: "Momentum",
    description: "Maintain a 3-day active solving streak.",
    icon: "🔥",
    rarity: "Common",
  },
  {
    id: "b-streak-7",
    key: "streak-7",
    name: "Habit Builder",
    description: "Reach a continuous 7-day practice streak.",
    icon: "⚡",
    rarity: "Rare",
  },
  {
    id: "b-two-pointers",
    key: "master-two-pointers",
    name: "Pointer Prodigy",
    description: "Solve 2+ problems tagged with Two Pointers.",
    icon: "🎯",
    rarity: "Rare",
  },
  {
    id: "b-dp-cracked",
    key: "dp-ace",
    name: "Dynamic Wizard",
    description: "Solve a Medium or Hard Dynamic Programming problem.",
    icon: "🔮",
    rarity: "Epic",
  },
  {
    id: "b-mock-ready",
    key: "mock-champion",
    name: "Interview Ready",
    description: "Complete a timed mock interview assessment.",
    icon: "🏆",
    rarity: "Legendary",
  }
];

