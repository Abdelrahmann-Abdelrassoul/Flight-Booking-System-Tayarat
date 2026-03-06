import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EmptyState } from "./UI";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <p className="text-xs text-slate-400">Reconfirming your boarding pass…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="py-10">
        <EmptyState
          title="Sign in to view your trips"
          message="Your bookings and boarding passes live here. Log in to manage your journeys."
          action={<Navigate to="/login" replace />}
        />
      </div>
    );
  }

  return children;
}

