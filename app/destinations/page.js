import PageHero from "../../components/PageHero";

const international = [
  ["London", "United Kingdom", "london"],
  ["Paris", "France", "paris"],
  ["Rome", "Italy", "rome"],
  ["Dubai", "United Arab Emirates", "dubai"],
  ["Istanbul", "Turkey", "istanbul"],
  ["Tokyo", "Japan", "tokyo"],
];

const domestic = [
  ["New York City", "United States", "new-york-city"],
  ["Los Angeles", "United States", "los-angeles"],
  ["Las Vegas", "United States", "las-vegas"],
  ["San Francisco", "United States", "san-francisco"],
  ["Miami", "United States", "miami"],
  ["Orlando", "United States", "orlando"],
];

export const metadata = {
  title: "Travel Destinations",
  description:
    "Explore popular domestic and international travel destinations with TripBuddy Holidays.",
  alternates: { canonical: "/destinations" },
};

function DestinationGrid({ title, items, type }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="text-3xl font-black md:text-4xl">
          {title}
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([city, country, slug]) => (
            <a
              key={slug}
              href={`/destinations/${type}/${slug}`}
              className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-(--primary) hover:shadow-xl"
            >
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                {type === "international"
                  ? "International"
                  : "United States"}
              </span>

              <h3 className="mt-3 text-2xl font-black">
                {city}
              </h3>

              <p className="mt-1 text-sm text-(--muted)">
                {country}
              </p>

              <span className="mt-6 inline-block text-sm font-black text-(--primary)">
                Explore →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="TripBuddy Holidays"
        title="Explore Destinations"
        description="Discover popular cities across the United States and around the world."
      />

      <main>
        <DestinationGrid
          title="International Destinations"
          items={international}
          type="international"
        />

        <DestinationGrid
          title="Domestic Destinations"
          items={domestic}
          type="domestic"
        />
      </main>
    </>
  );
}