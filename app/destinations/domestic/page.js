import PageHero from "../../../components/PageHero";

const destinations = [
    ["New York City", "new-york-city"],
    ["Los Angeles", "los-angeles"],
    ["Las Vegas", "las-vegas"],
    ["San Francisco", "san-francisco"],
    ["Miami", "miami"],
    ["Orlando", "orlando"],
];

export const metadata = {
    title: "U.S. Destinations",
    description:
        "Explore U.S. destination guides for New York City, Los Angeles, Las Vegas, San Francisco, Miami and Orlando.",
    alternates: { canonical: "/destinations/domestic" },
};

export default function DomesticDestinationsPage() {
    return (
        <>
            <PageHero
                eyebrow="Explore the United States"
                title="Domestic Destinations"
                description="Discover popular cities across the United States and explore ideas for your next trip."
            />
            <main className="section">
                <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {destinations.map(([city, slug]) => (
                        <a
                            key={slug}
                            href={`/destinations/domestic/${slug}`}
                            className="rounded-xl border border-slate-200 p-6 transition hover:border-(--primary) hover:shadow-lg"
                        >
                            <h2 className="text-xl font-black">{city}</h2>
                            <p className="mt-2 text-sm text-(--muted)">United States</p>
                            <span className="mt-5 inline-block text-sm font-bold text-(--primary)">
                                Explore destination
                            </span>
                        </a>
                    ))}
                </div>
            </main>
        </>
    );
}
