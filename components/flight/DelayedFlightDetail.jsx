"use client";

import { useEffect, useState } from "react";

// import { appData } from "@/data";
import Link from "next/link";

const FLIGHT_DETAIL_DELAY_MS = 2500;

export default function DelayedFlightDetail() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setIsVisible(true),
      FLIGHT_DETAIL_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className="mt-4"
      aria-busy={!isVisible}
      aria-label={isVisible ? "Flight details" : "Loading flight details"}
    >
      {isVisible ? <FlightDetail /> : <FlightDetailSkeleton />}
      <span className="sr-only" role="status" aria-live="polite">
        {isVisible ? "Flight details loaded" : "Loading flight details"}
      </span>
    </div>
  );
}

function FlightDetail() {
  const retry = () => window.location.reload();
  return (
    <div
      className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-5 sm:p-7"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span
          className="grid size-9 shrink-0 place-items-center rounded-full bg-amber-100 text-lg font-bold text-amber-800"
          aria-hidden="true"
        >
          !
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Something went wrong
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
            We couldn&apos;t load flight schedules or fares for this search.
            Call our travel team and they can help review your route and
            options.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-5 text-sm font-bold text-white hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50"
              href="tel:+18443654037"
            >
              Call {`+1(844)-365-4037`}
            </Link>

            <button
              type="button"
              onClick={retry}
              className="mt-3 min-h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlightDetailSkeleton({ compact = false }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/70 to-transparent" />

      <div className="relative grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-5 w-28 rounded bg-slate-200" />
            <div className="h-5 w-16 rounded bg-teal-100" />
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="space-y-2">
              <div className="h-4 w-16 rounded bg-slate-200" />
              <div className="h-7 w-28 rounded bg-slate-100" />
            </div>

            <div className="hidden h-10 w-10 place-items-center rounded-full bg-slate-100 sm:grid">
              <div className="h-4 w-4 rounded-full bg-slate-200" />
            </div>

            <div className="space-y-2 sm:text-right">
              <div className="h-4 w-16 rounded bg-slate-200 sm:ml-auto" />
              <div className="h-7 w-28 rounded bg-slate-100 sm:ml-auto" />
            </div>
          </div>

          {!compact && (
            <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
              <div className="h-3 w-full max-w-32 rounded bg-slate-100" />
              <div className="h-3 w-full max-w-28 rounded bg-slate-100" />
              <div className="h-3 w-full max-w-28 rounded bg-slate-100" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 sm:flex-col sm:items-stretch sm:justify-center">
          <div className="h-12 w-24 rounded-lg bg-teal-100 sm:w-32" />
          <div className="h-3 w-20 rounded bg-slate-100 sm:mx-auto" />
        </div>
      </div>
    </div>
  );
}
