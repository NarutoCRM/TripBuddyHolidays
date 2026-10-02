import DestinationPage from "../../../../components/DestinationPage";
import { notFound } from "next/navigation";

const destinations = {
  international: {
    london: {
      city: "London",
      country: "United Kingdom",
      description:
        "Explore London, one of Europe's most recognizable cities, known for its history, landmarks, museums, culture and diverse neighborhoods.",
      highlights: [
        "Historic landmarks",
        "Museums and culture",
        "City experiences",
      ],
    },

    paris: {
      city: "Paris",
      country: "France",
      description:
        "Discover Paris, a popular European destination known for its architecture, art, cuisine, fashion and iconic landmarks.",
      highlights: [
        "Iconic landmarks",
        "Art and museums",
        "Food and culture",
      ],
    },

    rome: {
      city: "Rome",
      country: "Italy",
      description:
        "Plan a journey to Rome and explore a city where ancient history, architecture, food and modern Italian life come together.",
      highlights: [
        "Ancient history",
        "Italian cuisine",
        "Architecture",
      ],
    },

    dubai: {
      city: "Dubai",
      country: "United Arab Emirates",
      description:
        "Explore Dubai, a modern international destination known for its skyline, shopping, entertainment, beaches and luxury experiences.",
      highlights: [
        "Modern attractions",
        "Shopping and dining",
        "Desert experiences",
      ],
    },

    istanbul: {
      city: "Istanbul",
      country: "Turkey",
      description:
        "Discover Istanbul, a unique destination connecting Europe and Asia with historic sites, markets, cuisine and vibrant neighborhoods.",
      highlights: [
        "Historic neighborhoods",
        "Local markets",
        "Turkish cuisine",
      ],
    },

    tokyo: {
      city: "Tokyo",
      country: "Japan",
      description:
        "Explore Tokyo, a dynamic destination combining modern technology, traditional culture, food, shopping and entertainment.",
      highlights: [
        "Modern city life",
        "Japanese culture",
        "Food and shopping",
      ],
    },
  },

  domestic: {
    "new-york-city": {
      city: "New York City",
      country: "United States",
      description:
        "Explore New York City, a global destination known for its neighborhoods, landmarks, entertainment, dining and cultural experiences.",
      highlights: [
        "Iconic landmarks",
        "Arts and entertainment",
        "Diverse neighborhoods",
      ],
    },

    "los-angeles": {
      city: "Los Angeles",
      country: "United States",
      description:
        "Discover Los Angeles, known for entertainment, beaches, neighborhoods, dining and Southern California experiences.",
      highlights: [
        "Entertainment",
        "Beaches",
        "City attractions",
      ],
    },

    "las-vegas": {
      city: "Las Vegas",
      country: "United States",
      description:
        "Plan a trip to Las Vegas for entertainment, dining, shows, resorts and experiences in the heart of the Nevada desert.",
      highlights: [
        "Entertainment",
        "Dining and resorts",
        "Live shows",
      ],
    },

    "san-francisco": {
      city: "San Francisco",
      country: "United States",
      description:
        "Explore San Francisco, known for its waterfront, distinctive neighborhoods, architecture, food and nearby attractions.",
      highlights: [
        "Waterfront experiences",
        "City neighborhoods",
        "Food and culture",
      ],
    },

    miami: {
      city: "Miami",
      country: "United States",
      description:
        "Discover Miami, a vibrant destination known for beaches, dining, nightlife, culture and its connection to South Florida.",
      highlights: [
        "Beaches",
        "Food and culture",
        "South Florida experiences",
      ],
    },

    orlando: {
      city: "Orlando",
      country: "United States",
      description:
        "Plan a family or leisure trip to Orlando, a popular Florida destination known for theme parks, entertainment and attractions.",
      highlights: [
        "Family attractions",
        "Theme parks",
        "Entertainment",
      ],
    },
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.entries(destinations).flatMap(([type, cities]) =>
    Object.keys(cities).map((slug) => ({
      type,
      slug,
    }))
  );
}

export async function generateMetadata({ params }) {
  const { type, slug } = await params;
  const destination = destinations[type]?.[slug];

  return {
    title: destination
      ? `${destination.city}, ${destination.country}`
      : "Destination",
    description:
      destination?.description ||
      "Explore travel destinations with TripBuddy Holidays.",
    alternates: { canonical: `/destinations/${type}/${slug}` },
  };
}

export default async function DestinationDetailsPage({ params }) {
  const { type, slug } = await params;
  const destination = destinations[type]?.[slug];

  if (!destination) {
    notFound();
  }

  return (
    <DestinationPage
      {...destination}
      type={type === "international" ? "International" : "Domestic"}
    />
  );
}