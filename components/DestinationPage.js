import PageHero from "./PageHero";
import Link from "next/link";

export default function DestinationPage({
  city,
  country,
  type,
  description,
  highlights,
}) {
  return (
    <>
      <PageHero
        eyebrow={`${type} Destination`}
        title={`${city}, ${country}`}
        description={description}
      />

      <main>
        <section className="section">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[.18em] text-(--primary)">
                Discover {city}
              </span>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Plan your journey to {city}
              </h2>

              <p className="mt-5 text-base leading-8 text-(--muted)">
                {description}
              </p>

              <p className="mt-4 text-base leading-8 text-(--muted)">
                Whether you are visiting for a holiday, business, family trip
                or a longer stay, planning your flight around your dates,
                preferred route and travel requirements can help make your
                journey easier.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-(--cream)">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-black">
                Things to explore
              </h2>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-3xl bg-white p-6 shadow-sm"
                  >
                    <div className="text-2xl">
                      ✦
                    </div>

                    <h3 className="mt-5 font-black">
                      {highlight}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-(--muted)">
                      Include this destination as part of your travel planning
                      and explore options that fit your journey.
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
              <h2 className="text-3xl font-black md:text-4xl">
                Planning a trip to {city}?
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100">
                Start exploring flight options and build your travel plans
                around your preferred dates and requirements.
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
                  className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-black"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}