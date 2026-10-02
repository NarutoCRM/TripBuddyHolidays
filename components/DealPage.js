import PageHero from "./PageHero";
import Link from "next/link";

export default function DealPage({
  title,
  description,
  intro,
  benefits,
}) {
  return (
    <>
      <PageHero
        eyebrow="Flight Deals"
        title={title}
        description={description}
      />

      <main>
        <section className="section">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-black md:text-4xl">
                Explore {title}
              </h2>

              <p className="mt-5 text-base leading-8 text-(--muted)">
                {intro}
              </p>

              <p className="mt-4 text-base leading-8 text-(--muted)">
                TripBuddy Holidays helps travelers explore available flight
                options and understand the important details before making
                their travel plans. Availability, schedules and fares can
                change depending on the airline, route and travel date.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-(--cream)">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-black md:text-4xl">
                Why explore this option?
              </h2>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="rounded-3xl bg-white p-7 shadow-sm"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-sm font-black text-(--primary)">
                      {index + 1}
                    </div>

                    <h3 className="mt-5 text-lg font-black">
                      {benefit}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-(--muted)">
                      Explore travel possibilities that match your route,
                      dates and personal requirements.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="rounded-4xl bg-(--primary) px-7 py-12 text-white md:px-14">
              <div className="max-w-3xl">
                <span className="text-xs font-black uppercase tracking-[.18em] text-blue-200">
                  TripBuddy Holidays
                </span>

                <h2 className="mt-3 text-3xl font-black md:text-4xl">
                  Ready to explore your travel options?
                </h2>

                <p className="mt-4 text-sm leading-7 text-blue-100">
                  Tell us about your journey and explore options based on your
                  travel requirements.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/#trip-planner"
                    className="rounded-full bg-[#e9a23b] px-6 py-3.5 text-sm font-black text-slate-900"
                  >
                    Plan My Trip
                  </Link>

                  <a
                    href="/contact-us"
                    className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-black text-white"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}