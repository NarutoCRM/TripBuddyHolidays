import PageHero from "../../components/PageHero";

const deals = [
  ["Domestic Flights", "domestic-flights"],
  ["International Flights", "international-flights"],
  ["First Class Flights", "first-class-flights"],
  ["Business Class Flights", "business-class-flights"],
  ["One Way Flights", "one-way-flights"],
  ["Round Trip Flights", "round-trip-flights"],
  ["Last Minute Flights", "last-minute-flights"],
  ["Student Flights", "student-flights"],
  ["Family Holiday Flights", "family-holiday-flights"],
  ["Holiday Flight Deals", "holiday-flight-deals"],
  ["Multi-City Flights", "multi-city-flights"],
  ["Cheap Flights Deals", "cheap-flights-deals"],
];

export const metadata = {
  title: "Flight Deals",
  description:
    "Explore domestic, international, business class, first class, one-way, round-trip and other flight options with TripBuddy Holidays.",
  alternates: { canonical: "/deals" },
};

export default function DealsPage() {
  return (
    <>
      <PageHero
        eyebrow="TripBuddy Holidays"
        title="Explore Flight Deals"
        description="Explore different flight categories and travel possibilities for your next journey."
      />

      <main className="section">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map(([name, slug]) => (
              <a
                key={slug}
                href={`/deals/${slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-(--primary) hover:shadow-xl"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-(--primary)">
                  ✈
                </span>

                <h2 className="mt-6 text-xl font-black">
                  {name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-(--muted)">
                  Explore options and information for {name.toLowerCase()}.
                </p>

                <span className="mt-5 inline-block text-sm font-black text-(--primary)">
                  Explore →
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}