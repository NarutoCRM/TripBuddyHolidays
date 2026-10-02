import PageHero from "../../components/PageHero";

export const metadata = {
  title: "About Us",
  description:
    "Learn about TripBuddy Holidays and our approach to helping travelers plan their journeys.",
  alternates: { canonical: "/about-us" },
};

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        eyebrow="About TripBuddy Holidays"
        title="Travel planning with a more personal approach."
        description="We help travelers explore flight options, destinations and travel possibilities for their next journey."
      />

      <main>
        <section className="section">
          <div className="container grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-black uppercase tracking-[.18em] text-(--primary)">
                Who we are
              </span>

              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Making travel planning easier to understand.
              </h2>
            </div>

            <div>
              <p className="text-base leading-8 text-(--muted)">
                TripBuddy Holidays is a travel-focused company based in Jersey
                City, New Jersey. We help travelers explore flight options,
                travel categories and destinations for domestic and
                international journeys.
              </p>

              <p className="mt-5 text-base leading-8 text-(--muted)">
                Our goal is to make the planning process straightforward.
                Travelers can explore different possibilities, understand
                their options and move forward with the journey that fits
                their needs.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-(--cream)">
          <div className="container">
            <h2 className="text-3xl font-black md:text-4xl">
              What we focus on
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                [
                  "Flight Options",
                  "Explore domestic, international, one-way, round-trip and multi-city travel possibilities.",
                ],
                [
                  "Destination Discovery",
                  "Discover popular cities and destinations for your next trip.",
                ],
                [
                  "Travel Assistance",
                  "Get practical support when your journey requires additional planning.",
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-3xl bg-white p-7 shadow-sm"
                >
                  <h3 className="text-xl font-black">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-(--muted)">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="rounded-4xl bg-(--primary) px-7 py-12 text-white md:px-14">
              <h2 className="text-3xl font-black md:text-4xl">
                Visit or contact TripBuddy Holidays
              </h2>

              <p className="mt-5 text-sm leading-7 text-blue-100">
                261 Griffith Street
                <br />
                Jersey City, NJ 07307
                <br />
                United States
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="tel:+18443654037"
                  className="rounded-full bg-[#e9a23b] px-6 py-3.5 text-sm font-black text-slate-900"
                >
                  1-844-365-4037
                </a>

                <a
                  href="mailto:info@tripbuddyholidays.com"
                  className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-black"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}