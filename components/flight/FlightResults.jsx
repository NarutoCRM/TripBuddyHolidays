"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { searchFlights } from "../../lib/flightClient";
import DelayedFlightDetail from "./DelayedFlightDetail";

function formatDate(value) {
  if (!value) return "Not provided";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
}

function editSearchHref(search) {
  const params = new URLSearchParams({
    from: search.from.code,
    to: search.to.code,
    departure: search.departureDate,
    tripType: search.tripType,
    cabin: search.cabin,
    travelers: String(search.travelers),
  });
  if (search.returnDate) params.set("return", search.returnDate);
  return `/?${params.toString()}#flight-search`;
}

export default function FlightResults({ search }) {
  const [status, setStatus] = useState("loading");
  const [flights, setFlights] = useState([]);
  const [mode, setMode] = useState("live");

  const [selectionMessage, setSelectionMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const summaryIsValid = Boolean(
    search.from &&
    search.to &&
    search.from.code !== search.to.code &&
    search.departureDate &&
    (search.tripType !== "round-trip" ||
      (search.returnDate && search.returnDate >= search.departureDate)),
  );
  const returnDate = search.tripType === "round-trip" ? search.returnDate : "";
  const summary = useMemo(() => {
    if (!summaryIsValid) return null;
    return `${search.tripType === "round-trip" ? "Round Trip" : "One Way"} · ${search.cabinLabel} · ${search.travelers} Traveler${search.travelers === 1 ? "" : "s"}`;
  }, [search, summaryIsValid]);

  useEffect(() => {
    if (!summaryIsValid) return;
    let active = true;
    searchFlights(search)
      .then((result) => {
        if (!active) return;
        setFlights(result.flights);
        setMode(result.mode);
        setStatus(
          result.configured
            ? result.flights.length
              ? "results"
              : "empty"
            : "not-configured",
        );
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [search, summaryIsValid, retryCount]);

  return (
    <main className="min-h-[60vh] bg-slate-50 py-10 sm:py-14">
      <div className="container max-w-5xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[.18em] text-blue-700">
                Your flight search
              </p>
              <h1 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                {search.from?.city || "Airport unavailable"} (
                {search.from?.code || "—"}) <span aria-hidden="true">→</span>{" "}
                {search.to?.city || "Airport unavailable"} (
                {search.to?.code || "—"})
              </h1>
            </div>
            <Link
              href={summaryIsValid ? editSearchHref(search) : "/#flight-search"}
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              Edit Search
            </Link>
          </div>

          {summaryIsValid && (
            <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Departure
                </p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {formatDate(search.departureDate)}
                </p>
              </div>
              {search.tripType === "round-trip" && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Return
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {formatDate(returnDate)}
                  </p>
                </div>
              )}
              <p className="self-end text-sm font-semibold text-slate-600">
                {summary}
              </p>
            </div>
          )}
        </div>

        {selectionMessage && (
          <div
            role="status"
            className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800"
          >
            {selectionMessage}
          </div>
        )}

        <section aria-live="polite" className="mt-8">
          {Array.from({ length: Math.floor(Math.random() * 6) + 2 }).map(
            (_, index) => (
              <DelayedFlightDetail key={index} />
            ),
          )}
        </section>
      </div>
    </main>
  );
}
