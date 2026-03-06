import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950 text-white">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
          {children}
        </div>
      </main>
      <footer className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Tayarat. All rights reserved.
      </footer>
    </div>
  );
}

