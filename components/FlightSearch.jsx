"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAirportByIata, searchAirports } from "../lib/airportSearch";

const today = (() => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
})();

function airportLabel(airport) {
  return `${airport.name} (${airport.iata})`;
}

function AirportInput({
  label,
  value,
  onChange,
  onSelect,
  exclude,
  error,
}) {
  const [open, setOpen] = useState(false);
  const listId = `airport-options-${label.toLowerCase()}`;
  const results = useMemo(
    () => searchAirports(value, { excludeIata: exclude, limit: 8 }),
    [value, exclude]
  );

  return (
    <div className="relative">
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </label>

      <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
        <span aria-hidden="true" className="text-xl text-blue-600"></span>
        <input
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="City, airport or code"
          autoComplete="off"
          role="combobox"
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-expanded={open && results.length > 0}
          aria-label={label}
          aria-invalid={Boolean(error)}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      {open && results.length > 0 && (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl"
        >
          {results.map((airport) => (
            <button
              type="button"
              role="option"
              aria-selected="false"
              key={`${airport.iata}-${airport.icao || airport.name}`}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onSelect(airport);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-blue-50"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-xs font-black text-blue-700">
                {airport.iata}
              </span>
              <span className="min-w-0">
                <b className="block truncate text-sm text-slate-800">
                  {airport.name}
                </b>
                <small className="block truncate text-xs text-slate-500">
                  {airport.iata} Â· {airport.city}, {airport.country}
                </small>
              </span>
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs font-semibold text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function FlightSearch({ initialSearch }) {
  const router = useRouter();
  const [tripType, setTripType] = useState(initialSearch?.tripType === "one-way" ? "one-way" : "round-trip");
  const [fromAirport, setFromAirport] = useState(() => getAirportByIata(initialSearch?.from));
  const [toAirport, setToAirport] = useState(() => getAirportByIata(initialSearch?.to));
  const [fromValue, setFromValue] = useState(() => {
    const airport = getAirportByIata(initialSearch?.from);
    return airport ? airportLabel(airport) : "";
  });
  const [toValue, setToValue] = useState(() => {
    const airport = getAirportByIata(initialSearch?.to);
    return airport ? airportLabel(airport) : "";
  });
  const [departure, setDeparture] = useState(initialSearch?.departure || "");
  const [returnDate, setReturnDate] = useState(initialSearch?.returnDate || "");
  const [travelers, setTravelers] = useState(initialSearch?.travelers || 1);
  const [cabin, setCabin] = useState(initialSearch?.cabin || "economy");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const selectAirport = (setAirport, setValue, key) => (airport) => {
    setAirport(airport);
    setValue(airportLabel(airport));
    setErrors((previous) => ({ ...previous, [key]: "" }));
  };

  const updateAirportText = (setAirport, setValue, key) => (value) => {
    setAirport(null);
    setValue(value);
    setErrors((previous) => ({ ...previous, [key]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!fromAirport) nextErrors.from = "Select a departure airport from the list.";
    if (!toAirport) nextErrors.to = "Select an arrival airport from the list.";
    if (fromAirport && toAirport && fromAirport.iata === toAirport.iata) {
      nextErrors.to = "Choose a different arrival airport.";
    }
    if (!departure) nextErrors.departure = "Choose a departure date.";
    if (tripType === "round-trip" && !returnDate) {
      nextErrors.returnDate = "Choose a return date.";
    } else if (tripType === "round-trip" && departure && returnDate < departure) {
      nextErrors.returnDate = "Return date cannot be before departure.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const search = {
      tripType,
      from: {
        code: fromAirport.iata,
        name: fromAirport.name,
        city: fromAirport.city,
        country: fromAirport.country,
      },
      to: {
        code: toAirport.iata,
        name: toAirport.name,
        city: toAirport.city,
        country: toAirport.country,
      },
      departureDate: departure,
      returnDate: tripType === "round-trip" ? returnDate : "",
      cabin,
      travelers,
    };

    const params = new URLSearchParams({
      from: search.from.code,
      to: search.to.code,
      departure: search.departureDate,
      tripType: search.tripType,
      cabin: search.cabin,
      travelers: String(search.travelers),
    });
    if (search.returnDate) params.set("return", search.returnDate);

    try {
      sessionStorage.setItem("tripbuddy_flight_search", JSON.stringify(search));
      setLoading(true);
      router.push(`/flight-results?${params.toString()}`);
    } catch (error) {
      console.error("Flight results navigation error:", error);
      setLoading(false);
      setErrors({ form: "Unable to open flight results. Please try again." });
    }
  };

  return (
    <section id="flight-search" className="relative mx-auto mt-20 max-w-6xl px-5 lg:px-8">
      <form
        onSubmit={submit}
        noValidate
        className="rounded-[28px] border border-white/60 bg-white/95 p-5 shadow-[0_25px_70px_-30px_rgba(15,23,42,.45)] backdrop-blur-xl sm:p-7"
      >
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {[ ["round-trip", "Round Trip"], ["one-way", "One Way"] ].map(([type, label]) => (
            <button
              type="button"
              key={type}
              onClick={() => {
                setTripType(type);
                if (type === "one-way") setReturnDate("");
                setErrors((previous) => ({ ...previous, returnDate: "" }));
              }}
              className={`rounded-full px-5 py-2 text-xs font-bold transition ${tripType === type
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {label}
            </button>
          ))}
          <span className="ml-auto hidden text-xs font-medium text-slate-800 sm:block">
            Search your route to request a personalized quote
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AirportInput
            label="From"
            value={fromValue}
            onChange={updateAirportText(setFromAirport, setFromValue, "from")}
            onSelect={selectAirport(setFromAirport, setFromValue, "from")}
            exclude={toAirport?.iata}
            error={errors.from}
          />
          <AirportInput
            label="To"
            value={toValue}
            onChange={updateAirportText(setToAirport, setToValue, "to")}
            onSelect={selectAirport(setToAirport, setToValue, "to")}
            exclude={fromAirport?.iata}
            error={errors.to}
          />

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-500">Departure</label>
            <input
              min={today}
              type="date"
              value={departure}
              onChange={(event) => {
                setDeparture(event.target.value);
                setErrors((previous) => ({ ...previous, departure: "" }));
              }}
              aria-invalid={Boolean(errors.departure)}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
            {errors.departure && <p className="mt-2 text-xs font-semibold text-red-600" role="alert">{errors.departure}</p>}
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Return</label>
            <input
              type="date"
              min={departure || today}
              disabled={tripType === "one-way"}
              value={returnDate}
              onChange={(event) => {
                setReturnDate(event.target.value);
                setErrors((previous) => ({ ...previous, returnDate: "" }));
              }}
              aria-invalid={Boolean(errors.returnDate)}
              className={`h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 ${tripType === "one-way" ? "cursor-not-allowed opacity-40" : ""}`}
            />
            {errors.returnDate && <p className="mt-2 text-xs font-semibold text-red-600" role="alert">{errors.returnDate}</p>}
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Travelers</label>
            <select
              value={travelers}
              onChange={(event) => setTravelers(Number(event.target.value))}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400"
            >
              {Array.from({ length: 9 }, (_, index) => index + 1).map((number) => (
                <option key={number} value={number} className="bg-white text-slate-800">
                  {number} Traveler{number > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-slate-500">Cabin Class</label>
            <select
              value={cabin}
              onChange={(event) => setCabin(event.target.value)}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
              <option value="economy" className="bg-white text-slate-800">Economy</option>
              <option value="premium-economy" className="bg-white text-slate-800">Premium Economy</option>
              <option value="business" className="bg-white text-slate-800">Business</option>
              <option value="first-class" className="bg-white text-slate-800">First Class</option>
            </select>
          </div>
        </div>

        {errors.form && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600" role="alert">{errors.form}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-500 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? (
            <><span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />Searching flights...</>
          ) : (
            <> Search Flights</>
          )}
        </button>
      </form>
    </section>
  );
}
