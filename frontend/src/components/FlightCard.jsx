import React from "react";
import { PrimaryButton, SecondaryButton } from "./UI";

export default function FlightCard({ flight, onBook, disabled }) {
  const departureDate = new Date(flight.date);

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-soft ring-1 ring-white/5 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
      <div className="flex flex-1 items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-xl font-semibold text-white shadow-soft">
          ✈️
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-100">
              {flight.flightNumber}
            </span>
            <span className="text-xs text-slate-400">
              {departureDate.toLocaleDateString(undefined, {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2 text-slate-50">
            <span className="text-lg font-semibold tracking-tight">
              {flight.from}
            </span>
            <span className="text-xs text-slate-500">to</span>
            <span className="text-lg font-semibold tracking-tight">
              {flight.to}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span>
              Total seats:{" "}
              <span className="font-medium text-slate-100">
                {flight.totalSeats}
              </span>
            </span>
            <span>
              Available:{" "}
              <span className="font-medium text-emerald-300">
                {flight.availableSeats}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full items-end justify-between gap-3 sm:mt-0 sm:w-auto sm:flex-col sm:items-end">
        <div className="text-right">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
            From
          </div>
          <div className="text-xl font-semibold tracking-tight text-white">
            ${flight.price.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">per traveler</div>
        </div>
        <div className="flex items-center gap-2">
          <SecondaryButton
            type="button"
            className="hidden sm:inline-flex"
          >
            Details
          </SecondaryButton>
          <PrimaryButton
            type="button"
            onClick={onBook}
            disabled={disabled || flight.availableSeats <= 0}
          >
            {flight.availableSeats <= 0 ? "Sold out" : "Book flight"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

