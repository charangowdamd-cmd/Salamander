"use client";

import { useState } from "react";
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
  Menu,
  X,
  Compass,
  Layers,
  ArrowRight,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { state } = useUserStore();
  const { user, openAuthModal, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/problems", label: "Problems", icon: Code2 },
    { href: "/interview-prep", label: "Interview Prep", icon: Briefcase },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/news", label: "Updates", icon: Newspaper },
    { href: "/dashboard", label: "Dashboard", icon: Sparkles },
    { href: "/admin", label: "Admin", icon: ShieldCheck },
  ];

  const sectionLinks = [
    { href: "/#practice", label: "Practice Bank" },
    { href: "/#companies", label: "Company Tracks" },
    { href: "/#updates", label: "Engineering Updates" },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

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

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border transition flex items-center justify-center"
            style={{
              background: mobileMenuOpen ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.06)",
              borderColor: mobileMenuOpen ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.12)",
              color: mobileMenuOpen ? "#ef4444" : "var(--text-primary)",
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b transition-all duration-200"
          style={{
            background: "rgba(12,12,18,0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {/* Quick Section Shortcuts */}
            <div className="p-3 rounded-xl border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                <Compass className="w-3.5 h-3.5 text-red-500" />
                <span>Jump to Section</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sectionLinks.map((sec) => (
                  <Link
                    key={sec.href}
                    href={sec.href}
                    onClick={closeMenu}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      color: "#ef4444",
                    }}
                  >
                    {sec.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation links */}
            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider px-2 mb-1" style={{ color: "var(--text-muted)" }}>
                Pages
              </div>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition"
                    style={
                      isActive
                        ? {
                            background: "rgba(239,68,68,0.15)",
                            color: "#ef4444",
                            border: "1px solid rgba(239,68,68,0.3)",
                          }
                        : {
                            color: "var(--text-primary)",
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid transparent",
                          }
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      {Icon && <Icon className="w-4 h-4" style={{ color: isActive ? "#ef4444" : "var(--text-secondary)" }} />}
                      <span>{link.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Stats row on mobile */}
            <div className="pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2">
                <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Points:</span>
                <span className="font-bold text-red-400">{state.points} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Solved:</span>
                <span className="font-bold text-green-400">{state.solvedProblems.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
