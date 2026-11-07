"use client";

import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/components/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    openAuthModal();
  }, [openAuthModal]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white">Salamanders Authentication</h1>
        <p className="text-xs text-slate-400">
          Sign in or create an account to persist your test submissions, streaks, and public verified developer profile.
        </p>
        <div className="pt-2">
          <Link
            href="/problems"
            className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to problem catalog</span>
          </Link>
        </div>
      </div>
      <AuthModal />
    </div>
  );
}

