import DealPage from "../../../components/DealPage";
import { notFound } from "next/navigation";

const deals = {
  "domestic-flights": {
    title: "Domestic Flights",
    description:
      "Explore domestic flight options for journeys across the United States.",
    intro:
      "Whether you are planning a business trip, weekend getaway or family journey, domestic flights can provide convenient ways to travel between cities across the United States.",
    benefits: [
      "Explore popular U.S. routes",
      "Compare different travel dates",
      "Consider convenient departure options",
      "Plan short and long domestic journeys",
    ],
  },

  "international-flights": {
    title: "International Flights",
    description:
      "Explore international flight options for your next journey beyond the United States.",
    intro:
      "International travel often involves more planning, from choosing suitable routes and dates to considering connections and travel requirements. TripBuddy Holidays helps you explore your possibilities.",
    benefits: [
      "Explore international destinations",
      "Consider different route possibilities",
      "Plan around your travel dates",
      "Explore connecting and direct flight options",
    ],
  },

  "first-class-flights": {
    title: "First Class Flights",
    description:
      "Explore first class travel options for journeys where comfort and premium service matter.",
    intro:
      "First class travel can provide an enhanced onboard experience with premium services and additional comfort, depending on the airline and route.",
    benefits: [
      "Explore premium cabin options",
      "Consider additional comfort",
      "Review airline-specific services",
      "Plan premium travel around your schedule",
    ],
  },

  "business-class-flights": {
    title: "Business Class Flights",
    description:
      "Explore business class flight options for business and leisure travelers.",
    intro:
      "Business class can be useful for travelers looking for additional comfort, services and flexibility during their journey.",
    benefits: [
      "Explore business class options",
      "Consider premium travel services",
      "Review different airline choices",
      "Plan around business or personal schedules",
    ],
  },

  "one-way-flights": {
    title: "One Way Flights",
    description:
      "Explore one-way flight options for flexible travel plans.",
    intro:
      "One-way travel can be useful when you do not have a fixed return date or when your onward travel will be arranged separately.",
    benefits: [
      "Useful for flexible itineraries",
      "Suitable for relocation journeys",
      "Explore different return arrangements",
      "Build flexible travel plans",
    ],
  },

  "round-trip-flights": {
    title: "Round Trip Flights",
    description:
      "Explore round-trip flight options for journeys with planned departure and return dates.",
    intro:
      "Round-trip travel is a common choice for vacations, business trips and visits where both the departure and return journey are planned in advance.",
    benefits: [
      "Plan both directions together",
      "Choose suitable departure dates",
      "Plan around return dates",
      "Explore different route possibilities",
    ],
  },

  "last-minute-flights": {
    title: "Last Minute Flights",
    description:
      "Explore flight options when your travel plans come together at short notice.",
    intro:
      "Last-minute travel can require flexibility because available seats, schedules and fares can change quickly. Planning with flexible dates and routes can provide more possibilities.",
    benefits: [
      "Explore currently available options",
      "Consider flexible travel dates",
      "Review alternative routes",
      "Check schedules before making plans",
    ],
  },

  "student-flights": {
    title: "Student Flights",
    description:
      "Explore travel options for students planning domestic or international journeys.",
    intro:
      "Students may travel for education, holidays, family visits or relocation. TripBuddy Holidays provides information to help students explore suitable travel possibilities.",
    benefits: [
      "Explore student travel options",
      "Plan around academic schedules",
      "Consider international journeys",
      "Review different travel dates",
    ],
  },

  "family-holiday-flights": {
    title: "Family Holiday Flights",
    description:
      "Explore flight options for family holidays and group travel.",
    intro:
      "Family travel often involves coordinating multiple travelers, dates and preferences. Planning ahead can make it easier to identify suitable flight options.",
    benefits: [
      "Plan travel for multiple passengers",
      "Explore family-friendly destinations",
      "Coordinate departure and return dates",
      "Consider convenient travel schedules",
    ],
  },

  "holiday-flight-deals": {
    title: "Holiday Flight Deals",
    description:
      "Explore flight options for holiday trips and seasonal travel.",
    intro:
      "Holiday travel can be popular during school breaks, festivals and major vacation periods. Starting your planning early can give you more opportunities to review available options.",
    benefits: [
      "Explore seasonal travel options",
      "Plan holiday journeys",
      "Consider popular destinations",
      "Review dates and route availability",
    ],
  },

  "multi-city-flights": {
    title: "Multi-City Flights",
    description:
      "Explore multi-city travel options for journeys covering more than one destination.",
    intro:
      "Multi-city travel can be useful when your journey includes several destinations. Instead of returning to the original departure city between every stop, a multi-city itinerary can help organize a more connected trip.",
    benefits: [
      "Visit multiple destinations",
      "Build flexible itineraries",
      "Plan open-jaw style journeys",
      "Organize complex travel plans",
    ],
  },

  "cheap-flights-deals": {
    title: "Cheap Flights Deals",
    description:
      "Explore flight options that may help you plan travel around your budget.",
    intro:
      "Finding a suitable fare depends on many factors including travel dates, destination, airline, demand and availability. Flexible planning can help you explore more possibilities.",
    benefits: [
      "Compare different travel dates",
      "Explore alternative routes",
      "Consider nearby airports",
      "Review different airline options",
    ],
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(deals).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const deal = deals[slug];

  return {
    title: deal?.title || "Flight Deals",
    description:
      deal?.description ||
      "Explore flight options and travel deals with TripBuddy Holidays.",
    alternates: { canonical: `/deals/${slug}` },
  };
}

export default async function DealDetailsPage({ params }) {
  const { slug } = await params;
  const deal = deals[slug];

  if (!deal) {
    notFound();
  }

  return <DealPage {...deal} />;
}