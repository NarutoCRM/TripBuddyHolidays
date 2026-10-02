import PageHero from "../../../components/PageHero";

const destinations = [
    ["London", "United Kingdom", "london"],
    ["Paris", "France", "paris"],
    ["Rome", "Italy", "rome"],
    ["Dubai", "United Arab Emirates", "dubai"],
    ["Istanbul", "Turkey", "istanbul"],
    ["Tokyo", "Japan", "tokyo"],
];

export const metadata = {
    title: "International Destinations",
    description:
        "Explore international destination guides for London, Paris, Rome, Dubai, Istanbul and Tokyo with TripBuddy Holidays.",
    alternates: { canonical: "/destinations/international" },
};

export default function InternationalDestinationsPage() {
    return (
        <>
            <PageHero
                eyebrow="Explore the world"
                title="International Destinations"
                description="Explore city guides and plan your next international journey with TripBuddy Holidays."
            />
            <main className="section">
                <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {destinations.map(([city, country, slug]) => (
                        <a
                            key={slug}
                            href={`/destinations/international/${slug}`}
                            className="rounded-xl border border-slate-200 p-6 transition hover:border-(--primary) hover:shadow-lg"
                        >
                            <h2 className="text-xl font-black">{city}</h2>
                            <p className="mt-2 text-sm text-(--muted)">{country}</p>
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
