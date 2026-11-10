"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { useAuth } from "@/components/AuthProvider";
import {
  Flame,
  Trophy,
  Code2,
  Sparkles,
  Briefcase,
  Newspaper,
  LogOut,
  LogIn,
  ShieldCheck,
  ChevronDown,
  User,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { state } = useUserStore();
  const { user, openAuthModal, signOut } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/problems", label: "Problems", icon: Code2 },
    { href: "/interview-prep", label: "Interview Prep", icon: Briefcase },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/news", label: "Updates", icon: Newspaper },
    { href: "/dashboard", label: "Dashboard", icon: Sparkles },
    { href: "/admin", label: "Admin", icon: ShieldCheck },
  ];

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #991b1b 100%)",
                boxShadow: "0 0 20px rgba(239,68,68,0.3)",
                color: "#fff",
              }}
            >
              S
            </div>
            <span
              className="font-bold text-sm tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Salamanders
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  style={
                    isActive
                      ? {
                          backgroundColor: "rgba(239,68,68,0.12)",
                          color: "#ef4444",
                          border: "1px solid rgba(239,68,68,0.2)",
                        }
                      : {
                          color: "var(--text-secondary)",
                          border: "1px solid transparent",
                        }
                  }
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Streak */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#f59e0b",
            }}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{state.streak}d</span>
          </div>

          {/* Points */}
          <div
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.15)",
              color: "#ef4444",
            }}
          >
            <span>{state.points} pts</span>
          </div>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <Link
                href={`/u/${user.username}`}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--text-primary)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "linear-gradient(135deg, #ef4444, #991b1b)", color: "#fff" }}
                >
                  {user.username[0]?.toUpperCase() || "U"}
                </div>
                <span className="hidden sm:inline">{user.username}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Link>
              <button
                onClick={() => signOut()}
                title="Sign out"
                className="p-1.5 rounded-lg transition"
                style={{ color: "var(--text-muted)" }}
                aria-label="Sign out"
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#ef4444";
                  e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition"
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "#fff",
                boxShadow: "0 0 16px rgba(239,68,68,0.3)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 0 24px rgba(239,68,68,0.45)")}
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = "0 0 16px rgba(239,68,68,0.3)")}
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
