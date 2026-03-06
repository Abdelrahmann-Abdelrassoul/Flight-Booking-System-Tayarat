import React from "react";
import { PrimaryButton, SecondaryButton } from "./UI";

export default function BookingCard({ booking, onCancel, cancelling }) {
  const { flight } = booking;
  const date = flight?.date ? new Date(flight.date) : null;

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-soft ring-1 ring-white/5 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
      <div className="flex flex-1 items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-lg font-semibold text-white shadow-soft">
          {booking.status === "canceled" ? "⌛" : "🎟"}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-100">
              {flight?.flightNumber || "Flight"}
            </span>
            {date && (
              <span className="text-xs text-slate-400">
                {date.toLocaleDateString(undefined, {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-baseline gap-2 text-slate-50">
            <span className="text-lg font-semibold tracking-tight">
              {flight?.from}
            </span>
            <span className="text-xs text-slate-500">to</span>
            <span className="text-lg font-semibold tracking-tight">
              {flight?.to}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span>
              Seats:{" "}
              <span className="font-medium text-slate-100">
                {booking.numberOfSeats}
              </span>
            </span>
            <span>
              Status:{" "}
              <span
                className={`font-medium ${
                  booking.status === "canceled" ? "text-red-300" : "text-emerald-300"
                }`}
              >
                {booking.status}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full items-end justify-between gap-3 sm:mt-0 sm:w-auto sm:flex-col sm:items-end">
        <div className="text-right">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Total paid
          </div>
          <div className="text-xl font-semibold tracking-tight text-white">
            ${booking.totalPrice.toLocaleString()}
          </div>
        </div>
        {booking.status === "confirmed" ? (
          <PrimaryButton
            type="button"
            onClick={onCancel}
            loading={cancelling}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:brightness-110"
          >
            Cancel booking
          </PrimaryButton>
        ) : (
          <SecondaryButton type="button" disabled className="cursor-default opacity-70">
            Canceled
          </SecondaryButton>
        )}
      </div>
    </div>
  );
}

