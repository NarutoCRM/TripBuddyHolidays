import TripPlanner from "../components/TripPlanner";
import Link from "next/link";

export const metadata = {
  title: { absolute: "Plan Your Next Journey | TripBuddy Holidays" },
  description:
    "Explore flight travel categories and destination guides with TripBuddy Holidays. Plan domestic or international travel with clear, useful information.",
  alternates: { canonical: new URL("https://tripbuddyholidays.com/") },
};

const internationalDestinations = [
  {
    city: "London",
    country: "United Kingdom",
    href: "/destinations/international/london",
  },
  {
    city: "Paris",
    country: "France",
    href: "/destinations/international/paris",
  },
  {
    city: "Rome",
    country: "Italy",
    href: "/destinations/international/rome",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    href: "/destinations/international/dubai",
  },
  {
    city: "Istanbul",
    country: "Turkey",
    href: "/destinations/international/istanbul",
  },
  {
    city: "Tokyo",
    country: "Japan",
    href: "/destinations/international/tokyo",
  },
];

const domesticDestinations = [
  {
    city: "New York City",
    country: "United States",
    href: "/destinations/domestic/new-york-city",
  },
  {
    city: "Los Angeles",
    country: "United States",
    href: "/destinations/domestic/los-angeles",
  },
  {
    city: "Las Vegas",
    country: "United States",
    href: "/destinations/domestic/las-vegas",
  },
  {
    city: "San Francisco",
    country: "United States",
    href: "/destinations/domestic/san-francisco",
  },
  {
    city: "Miami",
    country: "United States",
    href: "/destinations/domestic/miami",
  },
  {
    city: "Orlando",
    country: "United States",
    href: "/destinations/domestic/orlando",
  },
];

const deals = [
  ["Domestic Flights", "/deals/domestic-flights"],
  ["International Flights", "/deals/international-flights"],
  ["First Class Flights", "/deals/first-class-flights"],
  ["Business Class Flights", "/deals/business-class-flights"],
  ["One Way Flights", "/deals/one-way-flights"],
  ["Round Trip Flights", "/deals/round-trip-flights"],
  ["Last Minute Flights", "/deals/last-minute-flights"],
  ["Student Flights", "/deals/student-flights"],
  ["Family Holiday Flights", "/deals/family-holiday-flights"],
  ["Holiday Flight Deals", "/deals/holiday-flight-deals"],
  ["Multi-City Flights", "/deals/multi-city-flights"],
  ["Cheap Flights Deals", "/deals/cheap-flights-deals"],
];

function firstQueryValue(value) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function Home({ searchParams }) {
  const query = await searchParams;
  const cabinOptions = ["economy", "premium-economy", "business", "first-class"];
  const travelers = Number(firstQueryValue(query.travelers));
  const initialSearch = {
    from: firstQueryValue(query.from),
    to: firstQueryValue(query.to),
    tripType: firstQueryValue(query.tripType),
    departure: firstQueryValue(query.departure),
    returnDate: firstQueryValue(query.return),
    cabin: cabinOptions.includes(firstQueryValue(query.cabin)) ? firstQueryValue(query.cabin) : "economy",
    travelers: Number.isInteger(travelers) && travelers >= 1 && travelers <= 9 ? travelers : 1,
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#081b2f] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-right"
          style={{ backgroundImage: 'url("/images/TripBuddy_ Fly.png")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081b2f]/95 via-[#081b2f]/65 to-[#081b2f]/20" />

        <div className="container relative pb-32 pt-20 md:pb-40 md:pt-28">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-blue-100">
              TripBuddy Holidays
            </span>

            <h1 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
              Plan your journey
              <br />
              <span className="text-[#e9a23b]">
                with confidence.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Explore flight options, discover travel deals and find
              destinations for your next domestic or international journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#trip-planner"
                className="rounded-full bg-[#e9a23b] px-7 py-3.5 text-sm font-black text-slate-900"
              >
                Plan My Trip
              </a>

              <Link
                href="/deals"
                className="rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-black text-white"
              >
                Explore Flight Deals
              </Link>
            </div>
          </div>

          <div className="relative z-10 mt-14 md:mt-20">
            <TripPlanner initialSearch={initialSearch} />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-[.18em] text-(--primary)">
              Travel made easier
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              More than finding a flight.
              <br />
              It is about finding the right journey.
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-(--muted)">
              TripBuddy Holidays helps travelers explore different ways to
              reach their destination. Whether you are planning a short
              domestic trip, an international holiday or a multi-city journey,
              we make it easier to understand your travel options.
            </p>

            <p className="mt-4 text-base leading-8 text-(--muted)">
              Start with your travel requirements, explore the possibilities
              and choose the option that works for your plans.
            </p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section bg-(--cream)">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-[.18em] text-(--primary)">
              Why TripBuddy
            </span>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              A clearer way to plan your trip.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Flexible Travel Options",
                "Explore one-way, round-trip and multi-city travel possibilities.",
              ],
              [
                "Destination Ideas",
                "Discover popular domestic and international destinations.",
              ],
              [
                "Travel-Focused Assistance",
                "Get practical help when your travel plans need more attention.",
              ],
              [
                "Your Choice",
                "Review your options and decide what fits your journey.",
              ],
            ].map(([title, text], index) => (
              <div
                key={title}
                className="rounded-3xl bg-white p-7 shadow-sm"
              >
                <span className="text-xs font-black text-(--secondary)">
                  0{index + 1}
                </span>

                <h3 className="mt-6 text-lg font-black">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-(--muted)">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEALS */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-[.18em] text-(--primary)">
                Flight deals
              </span>

              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Explore ways to travel.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-(--muted)">
                Browse our flight categories and discover travel options
                designed around different trip types and traveler needs.
              </p>
            </div>

            <Link
              href="/deals"
              className="font-black text-(--primary)"
            >
              View All Deals →
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map(([name, href]) => (
              <a
                key={name}
                href={href}
                className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-(--primary) hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-(--primary)">
                    ✈
                  </span>

                  <span className="text-slate-300 transition group-hover:text-(--primary)">
                    →
                  </span>
                </div>

                <h3 className="mt-6 font-black">
                  {name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-(--muted)">
                  Explore available options for your travel plans.
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNATIONAL */}
      <section className="section bg-[#081b2f] text-white">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-[.18em] text-[#e9a23b]">
                International destinations
              </span>

              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Explore beyond borders.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Get inspired by destinations across Europe, the Middle East
                and Asia.
              </p>
            </div>

            <Link
              href="/destinations/international"
              className="font-black text-[#e9a23b]"
            >
              All International Destinations →
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internationalDestinations.map((destination) => (
              <a
                key={destination.city}
                href={destination.href}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:bg-white/10"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  International
                </span>

                <h3 className="mt-3 text-2xl font-black">
                  {destination.city}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {destination.country}
                </p>

                <span className="mt-6 inline-block text-sm font-black text-[#e9a23b]">
                  Explore destination →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* DOMESTIC */}
      <section className="section">
        <div className="container">
          <div>
            <span className="text-xs font-black uppercase tracking-[.18em] text-(--primary)">
              U.S. destinations
            </span>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Discover popular U.S. cities.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-(--muted)">
              From major city breaks to family-friendly destinations, explore
              popular places across the United States.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domesticDestinations.map((destination) => (
              <a
                key={destination.city}
                href={destination.href}
                className="rounded-3xl bg-(--light) p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  United States
                </span>

                <h3 className="mt-3 text-2xl font-black">
                  {destination.city}
                </h3>

                <p className="mt-1 text-sm text-(--muted)">
                  {destination.country}
                </p>

                <span className="mt-6 inline-block text-sm font-black text-(--primary)">
                  Explore destination →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-(--cream)">
        <div className="container">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-[.18em] text-(--primary)">
              How it works
            </span>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              A simple way to start planning.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Tell Us Your Plans", "Share your destinations, dates and traveler requirements."],
              ["Explore Options", "Look at different travel possibilities for your journey."],
              ["Review Your Choices", "Compare the details that matter to your trip."],
              ["Choose Your Journey", "Move forward with the option that suits your plans."],
            ].map(([title, text], index) => (
              <div
                key={title}
                className="relative rounded-3xl bg-white p-7"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-(--primary) text-sm font-black text-white">
                  {index + 1}
                </div>

                <h3 className="mt-6 font-black">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-(--muted)">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT CTA */}
      <section className="section">
        <div className="container rounded-4xl bg-(--primary) px-7 py-12 text-white md:px-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-[.18em] text-blue-200">
                TripBuddy Holidays
              </span>

              <h2 className="mt-3 text-3xl font-black md:text-5xl">
                Your trip. Your priorities. Your journey.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100">
                We are based at 261 Griffith Street, Jersey City, NJ 07307,
                United States, helping travelers explore and plan their next
                journey.
              </p>
            </div>

            <a
              href="/about-us"
              className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-black text-(--primary)"
            >
              About TripBuddy
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-(--light)">
        <div className="container">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-[.18em] text-(--primary)">
              Frequently asked questions
            </span>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Planning your trip?
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-3xl bg-white px-6 shadow-sm">
            {[
              [
                "What type of flights can I explore?",
                "TripBuddy Holidays provides pages covering domestic, international, one-way, round-trip, multi-city, first class, business class and other travel categories.",
              ],
              [
                "Can I plan an international trip?",
                "Yes. Our international destination pages cover London, Paris, Rome, Dubai, Istanbul and Tokyo.",
              ],
              [
                "Do you offer domestic flight information?",
                "Yes. We provide destination and deal information for popular U.S. cities including New York City, Los Angeles, Las Vegas, San Francisco, Miami and Orlando.",
              ],
              [
                "Can flight prices change?",
                "Yes. Airline availability, schedules and fares can change. Any fare shown on the website should be verified before making a travel decision.",
              ],
            ].map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="cursor-pointer list-none pr-6 text-sm font-black">
                  {question}
                </summary>

                <p className="mt-3 text-sm leading-7 text-(--muted)">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#081b2f] py-20 text-white">
        <div className="container text-center">
          <span className="text-xs font-black uppercase tracking-[.18em] text-[#e9a23b]">
            Start your journey
          </span>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black md:text-5xl">
            Ready to explore your next destination?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400">
            Explore flight deals, discover destinations and start planning
            your next journey with TripBuddy Holidays.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#trip-planner"
              className="rounded-full bg-[#e9a23b] px-7 py-3.5 text-sm font-black text-slate-900"
            >
              Plan My Trip
            </a>

            <a
              href="/contact-us"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-black"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
