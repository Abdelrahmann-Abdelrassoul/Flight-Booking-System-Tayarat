import React, { useEffect, useState } from "react";
import { Alert, EmptyState, PageHeading } from "../components/UI";
import BookingCard from "../components/BookingCard";
import { cancelBooking, getMyBookings } from "../services/bookingService";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const loadBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyBookings();
      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (id) => {
    setCancellingId(id);
    setError("");
    try {
      const data = await cancelBooking(id);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? data.booking : b)),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Your journeys"
        title="Upcoming & past trips"
        description="Review confirmations, track upcoming departures, and manage your bookings from a single, elegant dashboard."
      />

      {error && (
        <Alert
          type="error"
          title="We couldn’t load your bookings"
          message={error}
        />
      )}

      {loading && (
        <div className="flex min-h-[180px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/60">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Retrieving your itinerary…
          </div>
        </div>
      )}

      {!loading && bookings.length === 0 && !error && (
        <EmptyState
          title="No trips booked yet"
          message="When you book with Tayarat, your confirmations and receipts will appear here for quick access."
        />
      )}

      {!loading && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={() => handleCancel(booking._id)}
              cancelling={cancellingId === booking._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}