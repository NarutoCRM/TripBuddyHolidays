
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import airports from "../app/data/airports.json";

const today = new Date().toISOString().split("T")[0];

function getIata(value) {
  const match = value.match(/\(([A-Z]{3})\)/);
  return match?.[1] || "";
}

function AirportInput({ label, value, onChange, exclude }) {
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = value.trim().toLowerCase();

    if (!q) {
      return airports
        .filter((airport) => airport.iata !== exclude)
        .slice(0, 6);
    }

    return airports
      .filter((airport) => {
        if (airport.iata === exclude) return false;

        const searchable = `${airport.name} ${airport.city} ${airport.country} ${airport.iata}`.toLowerCase();

        return searchable.includes(q);
      })
      .slice(0, 7);
  }, [value, exclude]);

  return (
    <div className="relative">
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </label>

      <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
        <span className="text-xl text-blue-600">⌖</span>

        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setTimeout(() => setOpen(false), 150);
          }}
          placeholder="City, airport or code"
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-82px z-50 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
          {results.map((airport) => (
            <button
              type="button"
              key={airport.iata}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(`${airport.city} (${airport.iata})`);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-blue-50"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-xs font-black text-blue-700">
                {airport.iata}
              </span>

              <span className="min-w-0">
                <b className="block truncate text-sm text-slate-800">
                  {airport.city} · {airport.name}
                </b>

                <small className="text-xs text-slate-500">
                  {airport.country} · {airport.iata}
                </small>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FlightSearch() {
  const router = useRouter();

  const [tripType, setTripType] = useState("Round Trip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [cabin, setCabin] = useState("Economy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    setError("");

    if (
      !from ||
      !to ||
      !departure ||
      (tripType === "Round Trip" && !returnDate)
    ) {
      setError("Please complete your flight details.");
      return;
    }

    const fromIata = getIata(from);
    const toIata = getIata(to);

    if (fromIata && toIata && fromIata === toIata) {
      setError(
        "Please select different departure and arrival airports."
      );
      return;
    }

    if (
      tripType === "Round Trip" &&
      returnDate &&
      departure &&
      returnDate < departure
    ) {
      setError("Return date cannot be before departure date.");
      return;
    }

    setLoading(true);

    const flightData = {
      tripType,
      from,
      to,
      departure,
      returnDate: tripType === "One Way" ? "" : returnDate,
      travelers,
      cabin,
    };

    try {
      sessionStorage.setItem(
        "tripbuddy_flight_search",
        JSON.stringify(flightData)
      );

      router.push("/flight-quote");
    } catch (err) {
      console.error("Flight quote navigation error:", err);

      setLoading(false);
      setError("Unable to open the quote page. Please try again.");
    }
  };

  return (
    <section
      id="flight-search"
      className="relative mx-auto -mt-20 max-w-6xl px-5 lg:px-8"
    >
      <form
        onSubmit={submit}
        className="rounded-[28px] border border-white/60 bg-white/95 p-5 shadow-[0_25px_70px_-30px_rgba(15,23,42,.45)] backdrop-blur-xl sm:p-7"
      >
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {["Round Trip", "One Way"].map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => {
                setTripType(type);

                if (type === "One Way") {
                  setReturnDate("");
                }
              }}
              className={`rounded-full px-5 py-2 text-xs font-bold transition ${tripType === type
                ? "bg-slate-950 text-slate-800"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {type}
            </button>
          ))}

          <span className="ml-auto hidden text-xs font-medium text-slate-800 sm:block">
            Search your route to request a personalized quote
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AirportInput
            label="From"
            value={from}
            onChange={setFrom}
            exclude={getIata(to)}
          />

          <AirportInput
            label="To"
            value={to}
            onChange={setTo}
            exclude={getIata(from)}
          />

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Departure
            </label>

            <input
              required
              min={today}
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Return
            </label>

            <input
              type="date"
              min={departure || today}
              disabled={tripType === "One Way"}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className={`h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 ${tripType === "One Way"
                ? "cursor-not-allowed opacity-40"
                : ""
                }`}
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Travelers
            </label>

            <select
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400"
            >
              {Array.from({ length: 9 }, (_, index) => index + 1).map(
                (number) => (
                  <option
                    key={number}
                    value={number}
                    className="bg-white text-slate-800"
                  >
                    {number} Traveler{number > 1 ? "s" : ""}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Cabin Class
            </label>

            <select
              value={cabin}
              onChange={(e) => setCabin(e.target.value)}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
              <option value="Economy" className="bg-white text-slate-800">
                Economy
              </option>

              <option
                value="Premium Economy"
                className="bg-white text-slate-800"
              >
                Premium Economy
              </option>

              <option value="Business" className="bg-white text-slate-800">
                Business
              </option>

              <option
                value="First Class"
                className="bg-white text-slate-800"
              >
                First Class
              </option>
            </select>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-500 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Opening quote request...
            </>
          ) : (
            <>✈ Search Flights</>
          )}
        </button>
      </form>
    </section>
  );
}

