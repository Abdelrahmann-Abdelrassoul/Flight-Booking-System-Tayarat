import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="backdrop-blur-xl bg-slate-900/60 border-b border-white/10 sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-soft">
            <span className="text-lg font-semibold text-white">T</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-[0.18em] text-brand-200 uppercase">
              Tayarat
            </span>
            <span className="text-xs text-slate-300">Premium Flights</span>
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-200">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hidden text-sm md:inline-block ${
                isActive ? "text-brand-300" : "text-slate-200 hover:text-white"
              }`
            }
          >
            Search
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                `hidden text-sm md:inline-block ${
                  isActive ? "text-brand-300" : "text-slate-200 hover:text-white"
                }`
              }
            >
              My Trips
            </NavLink>
          )}

          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="text-sm text-slate-200 hover:text-white"
              >
                Log in
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-soft hover:bg-slate-100"
              >
                Sign up
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 rounded-full bg-slate-800/70 px-3 py-1 md:flex">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-semibold text-white">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="max-w-[120px] truncate text-xs text-slate-100">
                  {user?.name || "Traveler"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => logout(true)}
                className="text-xs font-medium text-slate-200 hover:text-brand-200"
              >
                Log out
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

