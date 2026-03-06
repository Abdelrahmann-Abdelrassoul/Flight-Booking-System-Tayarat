import React from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/UI";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-5 rounded-full bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-300">
        404 — Page not found
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
        This route doesn&apos;t exist yet.
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-400">
        The page you&apos;re trying to reach has either moved or never took off.
        Return to the home screen to search flights or manage your existing trips.
      </p>
      <div className="mt-6">
        <PrimaryButton as={Link} to="/" className="justify-center">
          Back to search
        </PrimaryButton>
      </div>
    </div>
  );
}