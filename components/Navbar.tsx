"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { useAuth } from "@/components/AuthProvider";
import { Flame, Trophy, Code2, Sparkles, Briefcase, Newspaper, Terminal, LogOut, LogIn, ShieldCheck } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { state } = useUserStore();
  const { user, openAuthModal, signOut } = useAuth();

  const navLinks = [
    { href: "/problems", label: "Problems", icon: Code2 },
    { href: "/interview-prep", label: "Interview prep", icon: Briefcase },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/news", label: "Updates", icon: Newspaper },
    { href: "/dashboard", label: "Dashboard", icon: Sparkles },
    { href: "/admin", label: "Admin", icon: ShieldCheck },
  ];

  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-md"
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "rgba(8,12,20,0.94)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Brand + Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center transition"
              style={{
                backgroundColor: "rgba(244,63,94,0.12)",
                border: "1px solid rgba(244,63,94,0.3)",
              }}
            >
              <Terminal className="w-3.5 h-3.5" style={{ color: "var(--rose)" }} />
            </div>
            <span className="font-extrabold text-sm tracking-tight" style={{ color: "var(--text-primary)" }}>
              Salamanders
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition"
                  style={
                    isActive
                      ? { backgroundColor: "var(--surface-2)", color: "var(--accent)", border: "1px solid var(--border)" }
                      : { color: "var(--text-muted)", border: "1px solid transparent" }
                  }
                  onMouseOver={e => { if (!isActive) { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.backgroundColor = "var(--surface)"; }}}
                  onMouseOut={e => { if (!isActive) { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.backgroundColor = "transparent"; }}}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Streak */}
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
            style={{ backgroundColor: "var(--amber-subtle)", color: "var(--amber)", border: "1px solid rgba(245,158,11,0.18)" }}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{state.streak}d</span>
          </div>

          {/* Points */}
          <div
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
            style={{ backgroundColor: "var(--accent-subtle)", color: "var(--accent)", border: "1px solid rgba(16,185,129,0.18)" }}
          >
            <span>{state.points} pts</span>
          </div>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <Link
                href={`/u/${user.username}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition"
                style={{ backgroundColor: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                onMouseOver={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                onMouseOut={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: "var(--surface-2)", color: "var(--accent)" }}
                >
                  {user.username[0]?.toUpperCase() || "U"}
                </div>
                <span className="hidden sm:inline">{user.username}</span>
              </Link>

              <button
                onClick={() => signOut()}
                title="Sign out"
                className="p-1.5 rounded-md transition"
                style={{ color: "var(--text-muted)" }}
                aria-label="Sign out"
                onMouseOver={e => { e.currentTarget.style.color = "var(--rose)"; e.currentTarget.style.backgroundColor = "var(--rose-subtle)"; }}
                onMouseOut={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-text)" }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = "var(--accent-hover)")}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = "var(--accent)")}
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
