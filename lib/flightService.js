function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function airportPart(value) {
  if (typeof value === "string") return value;
  return value?.code || value?.iataCode || value?.iata || "";
}

function normalizeLeg(segments, fallbackFrom, fallbackTo, fallback = {}) {
  const firstSegment = segments?.[0] || {};
  const lastSegment = segments?.[segments.length - 1] || firstSegment;
  const departure = fallback.departure || firstSegment.departure || {};
  const arrival = fallback.arrival || lastSegment.arrival || {};
  const stops = firstDefined(fallback.stops, Math.max((segments?.length || 1) - 1, 0));

  return {
    departureCode: airportPart(departure.airport || departure) || fallbackFrom,
    departureTime: firstDefined(fallback.departureTime, departure.at, departure.time, ""),
    departureDate: firstDefined(fallback.departureDate, ""),
    arrivalCode: airportPart(arrival.airport || arrival) || fallbackTo,
    arrivalTime: firstDefined(fallback.arrivalTime, arrival.at, arrival.time, ""),
    duration: firstDefined(fallback.duration, firstSegment.duration, ""),
    stops: Number.isFinite(Number(stops)) ? Number(stops) : stops,
    flightNumber: firstDefined(fallback.flightNumber, firstSegment.number, ""),
  };
}

export function normalizeFlightResults(payload, searchParams) {
  const rows = Array.isArray(payload)
    ? payload
    : payload?.flights || payload?.results || payload?.data?.flights || payload?.data?.results || payload?.data || [];
  if (!Array.isArray(rows)) return [];

  return rows.map((flight, index) => {
    const itineraries = flight.itineraries || [];
    const outboundSegments = flight.segments || itineraries[0]?.segments || [];
    const outboundFallback = {
      departure: flight.departure,
      arrival: flight.arrival,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      departureDate: flight.departureDate,
      duration: flight.duration || flight.totalDuration,
      stops: flight.stops,
      flightNumber: flight.flightNumber || flight.number,
    };
    const outbound = normalizeLeg(outboundSegments, searchParams.from.code, searchParams.to.code, outboundFallback);
    const returnSegments = flight.returnSegments || itineraries[1]?.segments || [];
    const returnFlight = flight.returnFlight
      ? normalizeLeg(flight.returnFlight.segments || [], searchParams.to.code, searchParams.from.code, flight.returnFlight)
      : returnSegments.length
        ? normalizeLeg(returnSegments, searchParams.to.code, searchParams.from.code, {})
        : null;
    const airline = flight.airline || flight.carrier || {};

    return {
      id: String(firstDefined(flight.id, flight.offerId, outbound.flightNumber, index)),
      airlineName: firstDefined(flight.airlineName, airline.name, airline, ""),
      airlineLogo: firstDefined(flight.airlineLogo, airline.logo, ""),
      ...outbound,
      cabin: firstDefined(flight.cabin, searchParams.cabin),
      baggage: firstDefined(flight.baggage, flight.baggageInformation, ""),
      price: firstDefined(flight.price?.amount, flight.price, flight.totalPrice, null),
      currency: firstDefined(flight.price?.currency, flight.currency, ""),
      returnFlight,
    };
  });
}

export async function searchFlightProvider(searchParams) {
  const apiUrl = process.env.FLIGHT_API_URL;
  if (!apiUrl) return { configured: false, results: [] };

  const headers = { "Content-Type": "application/json" };
  if (process.env.FLIGHT_API_KEY) {
    headers.Authorization = `Bearer ${process.env.FLIGHT_API_KEY}`;
  }
  const response = await fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(searchParams),
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error("The flight provider could not complete this search.");

  const payload = await response.json();
  return {
    configured: true,
    results: normalizeFlightResults(payload, searchParams),
  };
}
