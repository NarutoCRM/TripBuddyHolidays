import FlightResults from "../../components/FlightResults";
import { getAirportByIata } from "../../lib/airportSearch";

export const metadata = {
  title: "Flight Results | TripBuddy Holidays",
  description: "Review live flight availability for your selected route and dates.",
};

function first(value) {
  return Array.isArray(value) ? value[0] : value || "";
}

const cabinLabels = {
  economy: "Economy",
  "premium-economy": "Premium Economy",
  business: "Business",
  "first-class": "First Class",
};

export default async function FlightResultsPage({ searchParams }) {
  const query = await searchParams;
  const from = getAirportByIata(first(query.from));
  const to = getAirportByIata(first(query.to));
  const tripType = first(query.tripType) === "one-way" ? "one-way" : "round-trip";
  const cabin = cabinLabels[first(query.cabin)] ? first(query.cabin) : "economy";
  const travelersValue = Number(first(query.travelers));

  const search = {
    tripType,
    from: from ? {
      code: from.iata,
      name: from.name,
      city: from.city,
      country: from.country,
    } : null,
    to: to ? {
      code: to.iata,
      name: to.name,
      city: to.city,
      country: to.country,
    } : null,
    departureDate: first(query.departure),
    returnDate: first(query.return),
    cabin,
    cabinLabel: cabinLabels[cabin],
    travelers: Number.isInteger(travelersValue) && travelersValue > 0 ? travelersValue : 1,
  };

  return <FlightResults search={search} />;
}
