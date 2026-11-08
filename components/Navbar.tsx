"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { useAuth } from "@/components/AuthProvider";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { 
  Flame, 
  Trophy, 
  Code2, 
  Sparkles, 
  Briefcase, 
  Newspaper, 
  UserCheck, 
  ShieldCheck,
  Terminal,
  LogOut,
  LogIn,
  Database
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { state } = useUserStore();
  const { user, openAuthModal, signOut } = useAuth();
  const isSupabaseActive = isSupabaseConfigured() || !!user;

  const navLinks = [
    { href: "/problems", label: "Problems", icon: Code2 },
    { href: "/interview-prep", label: "Interview prep", icon: Briefcase },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/news", label: "Tech updates", icon: Newspaper },
    { href: "/dashboard", label: "Dashboard", icon: Sparkles },
    { href: "/admin", label: "Admin", icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-[#07090e]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500/20 to-emerald-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center transition group-hover:border-rose-400">
              <Terminal className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-slate-100">
                Salamanders
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                20 Core
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? "bg-slate-800 text-emerald-400 border border-slate-700/80 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Status and Supabase Status Actions */}
        <div className="flex items-center space-x-3">
          {/* Supabase Integration Live Badge */}
          <div 
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium"
            title="Supabase PostgreSQL & Auth integration active"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] text-slate-300">Supabase</span>
          </div>

          {/* Daily Streak Indicator */}
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{state.streak}d</span>
          </div>

          {/* Points */}
          <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span>{state.points} pts</span>
          </div>

          {/* User profile pill or Sign In */}
          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                href={`/u/${user.username}`}
                className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition"
              >
                <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                  {user.username[0]?.toUpperCase() || "U"}
                </div>
                <span className="hidden sm:inline">{user.username}</span>
                <UserCheck className="w-3 h-3 text-emerald-400" />
              </Link>

              <button
                onClick={() => signOut()}
                title="Sign out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
