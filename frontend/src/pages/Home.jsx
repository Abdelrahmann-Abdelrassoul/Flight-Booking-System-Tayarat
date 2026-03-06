import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeading, TextInput, NumberInput, Alert, EmptyState, PrimaryButton } from "../components/UI";
import FlightCard from "../components/FlightCard";
import { getAllFlights, searchFlights } from "../services/flightService";
import { createBooking } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [bookingFlightId, setBookingFlightId] = useState(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    (async () => {
      try {
        const data = await getAllFlights();
        if (isMounted) {
          setFlights(data);
          setSearched(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!from || !to || !date) {
      setError("Please fill in departure, destination, and date.");
      return;
    }

    setLoading(true);
    try {
      const data = await searchFlights({ from, to, date });
      setFlights(data);
      setSearched(true);
    } catch (err) {
      setError(err.message);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (flightId) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/" } });
      return;
    }
    setBookingFlightId(flightId);
    try {
      await createBooking({ flightId, numberOfSeats: Number(passengers) || 1 });
      navigate("/bookings");
    } catch (err) {
      setError(err.message);
    } finally {
      setBookingFlightId(null);
    }
  };

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.4fr_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <PageHeading
            eyebrow="Premium flight booking"
            title="Fly smarter with Tayarat."
            description="Search live availability, lock in premium fares, and manage your trips in a single, polished experience built for modern travelers."
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-900/80 via-slate-900/90 to-slate-950/95 p-4 shadow-soft sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.12),transparent_50%),radial-gradient(circle_at_bottom,_rgba(94,234,212,0.12),transparent_55%)]" />
            <form
              onSubmit={handleSearch}
              className="relative grid gap-4 sm:grid-cols-2"
            >
              <TextInput
                label="From"
                placeholder="Cairo"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              <TextInput
                label="To"
                placeholder="Dubai"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <TextInput
                label="Departure date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <NumberInput
                label="Passengers"
                value={passengers}
                min={1}
                onChange={(e) => setPassengers(e.target.value)}
              />
              {error && (
                <div className="sm:col-span-2">
                  <Alert type="error" title="We couldn’t run your search" message={error} />
                </div>
              )}
              <div className="sm:col-span-2 flex justify-end">
                <PrimaryButton type="submit" loading={loading}>
                  {loading ? "Searching flights…" : "Search flights"}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative h-full rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_10%_20%,#1d4ed8_0,#020617_40%),radial-gradient(circle_at_90%_80%,#22c55e_0,#020617_45%)] p-6 shadow-soft">
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-slate-100">
                  CURATED FOR FREQUENT FLYERS
                </div>
                <p className="mt-4 text-sm text-slate-100/90">
                  Real-time routes, transparent fares, and a booking flow that
                  feels like a first-class cabin.
                </p>
              </div>
              <div className="space-y-3 text-xs text-slate-200">
                <p className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                  <span>Personalized itineraries</span>
                  <span className="text-emerald-300">Live</span>
                </p>
                <p className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                  <span>Secure bookings</span>
                  <span className="text-emerald-300">Protected</span>
                </p>
                <p className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                  <span>Instant confirmations</span>
                  <span className="text-emerald-300">On</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Available flights
          </h2>
          {searched && (
            <span className="text-xs text-slate-500">
              {flights.length} option{flights.length === 1 ? "" : "s"} found
            </span>
          )}
        </div>

        {loading && (
          <div className="flex min-h-[140px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/60">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Fetching the most comfortable routes for you…
            </div>
          </div>
        )}

        {!loading && searched && flights.length === 0 && !error && (
          <EmptyState
            title="No flights match your search"
            message="Try adjusting your dates or exploring nearby destinations to discover more options."
          />
        )}

        {!loading && flights.length > 0 && (
          <div className="space-y-4">
            {flights.map((flight) => (
              <FlightCard
                key={flight._id}
                flight={flight}
                disabled={bookingFlightId === flight._id}
                onBook={() => handleBook(flight._id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}