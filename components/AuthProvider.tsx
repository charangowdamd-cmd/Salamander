"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  isDemo?: boolean;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  isConfigured: boolean;
  isModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signInWithEmail: (email: string, pass: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, pass: string, username: string) => Promise<{ error?: string }>;
  signInDemo: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isConfigured: false,
  isModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  signInWithEmail: async () => ({}),
  signUpWithEmail: async () => ({}),
  signInDemo: () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    // Check local storage for demo user or session
    const storedDemo = typeof window !== "undefined" ? localStorage.getItem("salamanders_auth_user") : null;
    if (storedDemo) {
      try {
        setUser(JSON.parse(storedDemo));
      } catch (_) {}
    }

    const supabase = getSupabase();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          mapAndSetUser(session.user);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          mapAndSetUser(session.user);
        } else if (!storedDemo) {
          setUser(null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Default to demo user if no session
      if (!storedDemo) {
        const defaultUser: AuthUser = {
          id: "demo_usr_1",
          email: "alex@salamanders.dev",
          username: "alex_coder",
          displayName: "Alex Coder",
          isDemo: true,
        };
        setUser(defaultUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("salamanders_auth_user", JSON.stringify(defaultUser));
        }
      }
      setLoading(false);
    }
  }, []);

  const mapAndSetUser = (sbUser: User) => {
    const formatted: AuthUser = {
      id: sbUser.id,
      email: sbUser.email || "",
      username: sbUser.user_metadata?.username || (sbUser.email ? sbUser.email.split("@")[0] : "coder"),
      displayName: sbUser.user_metadata?.full_name || "Developer",
      isDemo: false,
    };
    setUser(formatted);
    if (typeof window !== "undefined") {
      localStorage.setItem("salamanders_auth_user", JSON.stringify(formatted));
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      // Offline / Local mock login
      const localUser: AuthUser = {
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        email,
        username: email.split("@")[0],
        displayName: email.split("@")[0],
        isDemo: true,
      };
      setUser(localUser);
      localStorage.setItem("salamanders_auth_user", JSON.stringify(localUser));
      setIsModalOpen(false);
      return {};
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) return { error: error.message };
    if (data.user) mapAndSetUser(data.user);
    setIsModalOpen(false);
    return {};
  };

  const signUpWithEmail = async (email: string, pass: string, username: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      const localUser: AuthUser = {
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        email,
        username: username || email.split("@")[0],
        displayName: username || email.split("@")[0],
        isDemo: true,
      };
      setUser(localUser);
      localStorage.setItem("salamanders_auth_user", JSON.stringify(localUser));
      setIsModalOpen(false);
      return {};
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          username,
          full_name: username,
        },
      },
    });

    if (error) return { error: error.message };
    if (data.user) mapAndSetUser(data.user);
    setIsModalOpen(false);
    return {};
  };

  const signInDemo = () => {
    const demoUser: AuthUser = {
      id: "demo_guest_" + Date.now().toString(36),
      email: "guest@salamanders.dev",
      username: "placement_aspirant",
      displayName: "Placement Aspirant",
      isDemo: true,
    };
    setUser(demoUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("salamanders_auth_user", JSON.stringify(demoUser));
    }
    setIsModalOpen(false);
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("salamanders_auth_user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: configured,
        isModalOpen,
        openAuthModal: () => setIsModalOpen(true),
        closeAuthModal: () => setIsModalOpen(false),
        signInWithEmail,
        signUpWithEmail,
        signInDemo,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

