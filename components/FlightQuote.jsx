
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function FlightQuote() {
  const [flightData, setFlightData] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    try {
      const savedData = sessionStorage.getItem(
        "tripbuddy_flight_search"
      );

      if (savedData) {
        setFlightData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Unable to load flight search:", error);
    }
  }, []);

  const update = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setStatus("");
    setSending(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),

        tripType: flightData?.tripType || "One Way",
        from: flightData?.from || "",
        to: flightData?.to || "",
        departure: flightData?.departure || "",
        returnDate: flightData?.returnDate || "",
        travelers: flightData?.travelers || 1,
        cabin: flightData?.cabin || "Economy",
      };

      const response = await fetch(
        `${API_BASE_URL}/api/quote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to submit your quote request."
        );
      }

      setStatus("success");

      setForm({
        name: "",
        email: "",
        phone: "",
      });

      sessionStorage.removeItem("tripbuddy_flight_search");
    } catch (error) {
      console.error("QUOTE REQUEST ERROR:", error);

      setStatus(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  if (!flightData) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-4xl font-black text-slate-950">
          Start your flight search
        </h1>

        <p className="mt-4 text-slate-500">
          Please return to the homepage and search for your
          route first.
        </p>

        <Link
          href="/"
          className="mt-7 inline-block rounded-full bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="grid overflow-hidden rounded-[36px] bg-white shadow-2xl shadow-slate-200 lg:grid-cols-[.85fr_1.15fr]">
        {/* LEFT SIDE */}

        <aside className="relative min-h-[500px] overflow-hidden bg-slate-950 p-8 text-white sm:p-12">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('/images/TripBuddy_ Fly.png')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-blue-950/70 to-blue-900/20" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
                TripBuddy Holidays
              </span>

              <h1 className="mt-8 text-4xl font-black leading-tight sm:text-5xl">
                Let&apos;s find a flight that fits your plan.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-6 text-slate-200">
                Your trip details are saved below. Add your
                contact information and request a personalized
                flight quote.
              </p>
            </div>

            <a
              href="tel:+18443654037"
              className="mt-10 inline-flex w-fit rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50"
            >
              ☎ Call 1-844-365-4037
            </a>
          </div>
        </aside>

        {/* RIGHT SIDE */}

        <div className="p-6 sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.2em] text-blue-600">
            Your trip
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Quote request
          </h2>

          {/* TRIP DETAILS */}

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              ["From", flightData.from],
              ["To", flightData.to],
              ["Departure", flightData.departure],
              [
                "Return",
                flightData.returnDate || "One way",
              ],
              [
                "Travelers",
                `${flightData.travelers} Traveler${
                  flightData.travelers > 1 ? "s" : ""
                }`,
              ],
              ["Class", flightData.cabin],
            ].map(([key, value]) => (
              <div
                key={key}
                className="rounded-2xl bg-slate-50 p-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {key}
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* FORM */}

          <form
            onSubmit={submit}
            className="mt-8 space-y-4"
          >
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Full name
              </label>

              <input
                required
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Your full name"
                autoComplete="name"
                className="h-13 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Email address
              </label>

              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
                autoComplete="email"
                className="h-13 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Phone number
              </label>

              <input
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={update}
                placeholder="Your phone number"
                maxLength={15}
                autoComplete="tel"
                className="h-13 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {status === "success" && (
              <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
                ✓ Your quote request has been sent
                successfully. Our travel team will contact
                you shortly.
              </div>
            )}

            {status && status !== "success" && (
              <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
                {status}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending
                ? "Sending request..."
                : "GET A FREE QUOTE"}
            </button>

            <p className="text-center text-[11px] leading-5 text-slate-400">
              Your request will be sent securely to
              TripBuddy Holidays travel support.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
