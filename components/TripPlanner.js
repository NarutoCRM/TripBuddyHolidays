"use client";

import { useState } from "react";

export default function TripPlanner() {
  const [tripType, setTripType] = useState("Round Trip");
  const [showNotice, setShowNotice] = useState(false);

  return (
    <form
      id="trip-planner"
      onSubmit={(event) => {
        event.preventDefault();
        setShowNotice(true);
      }}
      className="rounded-[28px] bg-white p-5 shadow-[0_25px_80px_rgba(0,0,0,.18)] md:p-7"
    >
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-5">
        {["Round Trip", "One Way", "Multi-City"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            aria-pressed={tripType === type}
            className={`rounded-full px-5 py-2.5 text-sm font-black transition ${tripType === type
                ? "bg-(--primary) text-white"
                : "bg-slate-100 text-slate-500"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
            From
          </span>

          <input
            type="text"
            placeholder="Departure city"
            required
            className="mt-2 w-full bg-transparent text-sm font-bold outline-none placeholder:text-slate-400"
          />
        </label>

        <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
            To
          </span>

          <input
            type="text"
            placeholder="Destination"
            required
            className="mt-2 w-full bg-transparent text-sm font-bold outline-none placeholder:text-slate-400"
          />
        </label>

        <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
            Departure
          </span>

          <input
            type="date"
            className="mt-2 w-full bg-transparent text-sm font-bold outline-none"
          />
        </label>

        <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
            Travelers
          </span>

          <select className="mt-2 w-full bg-transparent text-sm font-bold outline-none">
            <option>1 Traveler</option>
            <option>2 Travelers</option>
            <option>3 Travelers</option>
            <option>4 Travelers</option>
            <option>5+ Travelers</option>
          </select>
        </label>
      </div>

      {tripType !== "One Way" && (
        <div className="mt-3">
          <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
              {tripType === "Multi-City" ? "Final arrival" : "Return"}
            </span>

            <input
              type="date"
              required={tripType === "Round Trip"}
              className="mt-2 w-full bg-transparent text-sm font-bold outline-none"
            />
          </label>
        </div>
      )}

      <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <p className="text-xs leading-5 text-slate-500">
          This planner is a frontend preview. It does not check live flights or fares.
        </p>

        <button
          type="submit"
          className="rounded-full bg-(--secondary) px-7 py-3.5 text-sm font-black text-slate-900"
        >
          Explore Options
        </button>
      </div>

      {showNotice && (
        <p role="status" className="mt-4 text-sm leading-6 text-slate-600">
          No live search was performed. For travel assistance, call{" "}
          <a className="font-bold text-(--primary)" href="tel:+18443654037">
            1-844-365-4037
          </a>{" "}
          or <a className="font-bold text-(--primary)" href="mailto:info@tripbuddyholidays.com">email TripBuddy Holidays</a>.
        </p>
      )}
    </form>
  );
}