import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";
import { AuthModal } from "@/components/AuthModal";

export const metadata: Metadata = {
  title: "Salamanders — Career-Focused Coding Practice & Developer Growth",
  description:
    "Master data structures, algorithms, and technical interviews with an AI mentor, verifiable developer profiles, and real-time coding arena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased" style={{ backgroundColor: "#0a0a0f", color: "#f4f4f8" }}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
