"use client";

import Image from "next/image";

function formatTime(value) {
  if (!value) return "Time unavailable";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date);
}

function formatPrice(price, currency) {
  if (price === null || price === undefined || price === "") return "Price unavailable";
  if (typeof price !== "number" && !/^\d+(\.\d+)?$/.test(String(price))) return String(price);
  const amount = Number(price);
  return currency
    ? new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount)
    : amount.toLocaleString();
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function stopsLabel(stops) {
  return typeof stops === "number"
    ? stops === 0 ? "Nonstop" : `${stops} stop${stops === 1 ? "" : "s"}`
    : stops || "Stops unavailable";
}

function cabinLabel(cabin) {
  return {
    economy: "Economy",
    "premium-economy": "Premium Economy",
    business: "Business",
    "first-class": "First Class",
  }[cabin] || cabin || "Cabin unavailable";
}

function FlightLeg({ label, leg }) {
  return (
    <div className="mt-5 border-t border-slate-100 pt-4 first:mt-6 first:border-t-0 first:pt-0">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-black uppercase tracking-wider text-slate-500">{label}</p>
        <p className="text-xs text-slate-400">
          {formatDate(leg.departureDate)}{leg.stops !== undefined ? ` · ${stopsLabel(leg.stops)}` : ""}
        </p>
      </div>
      {leg.flightNumber && <p className="mb-2 text-xs font-semibold text-slate-500">{leg.flightNumber}</p>}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div>
          <p className="text-xl font-black text-slate-950">{formatTime(leg.departureTime)}</p>
          <p className="mt-1 text-sm font-bold text-slate-600">{leg.departureCode}</p>
        </div>
        <div className="px-2 text-center text-xs text-slate-400">
          <p>{leg.duration || "Duration unavailable"}</p>
          <div aria-hidden="true" className="mt-2 h-px w-16 bg-slate-300 sm:w-24" />
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-slate-950">{formatTime(leg.arrivalTime)}</p>
          <p className="mt-1 text-sm font-bold text-slate-600">{leg.arrivalCode}</p>
        </div>
      </div>
    </div>
  );
}

export default function FlightCard({ flight, demo = false, selected = false, onSelect }) {
  const stopLabel = typeof flight.stops === "number"
    ? flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops === 1 ? "" : "s"}`
    : flight.stops;

  return (
    <article className={`rounded-3xl border bg-white p-5 shadow-sm sm:p-6 ${selected ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {flight.airlineLogo && (
            <Image src={flight.airlineLogo} alt="" width={36} height={36} unoptimized className="h-9 w-9 shrink-0 rounded-lg object-contain" />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-slate-900">{flight.airlineName || "Airline details unavailable"}</p>
            {flight.flightNumber && <p className="mt-1 text-xs text-slate-500">{flight.flightNumber}</p>}
          </div>
          {/* {demo && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black tracking-wider text-amber-900"></span>} */}
        </div>
        <p className="text-sm font-bold text-slate-700">{stopLabel || "Stops unavailable"}</p>
      </div>

      <FlightLeg label="Outbound" leg={flight} />
      {flight.returnFlight && <FlightLeg label="Return" leg={flight.returnFlight} />}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="text-xs leading-5 text-slate-500">
          <p>{cabinLabel(flight.cabin)}</p>
          {flight.baggage && <p>{flight.baggage}</p>}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-black text-slate-900">{formatPrice(flight.price, flight.currency)}</p>
            {flight.travelers > 1 && <p className="mt-1 text-[10px] text-slate-500">Total for {flight.travelers} travelers</p>}
          </div>
          <button
            type="button"
            onClick={() => onSelect?.(flight)}
            aria-pressed={selected}
            className="rounded-full bg-slate-950 px-5 py-2.5 text-xs font-black text-white transition hover:bg-blue-700"
          >
            {selected ? "Selected" : "Select Flight"}
          </button>
        </div>
      </div>
    </article>
  );
}
