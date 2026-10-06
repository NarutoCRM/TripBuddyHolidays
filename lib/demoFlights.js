const DEMO_AIRLINES = [
  { name: "Demo Airways", prefix: "DA", number: 101, departureTime: "08:10", stops: 0 },
  { name: "Global Travel Airlines", prefix: "GTA", number: 204, departureTime: "11:25", stops: 1 },
  { name: "Skyline Air", prefix: "SA", number: 315, departureTime: "15:35", stops: 1 },
  { name: "World Travel Air", prefix: "WTA", number: 430, departureTime: "20:10", stops: 0 },
];

const NORTH_AMERICA_ZONES = {
  LAX: "west",
  SFO: "west",
  LAS: "west",
  JFK: "east",
  BOS: "east",
  MIA: "southeast",
  MCO: "southeast",
  ORD: "central",
  DFW: "central",
  DEN: "mountain",
};

function continent(country) {
  const normalized = (country || "").toLowerCase();
  if (["united states", "canada", "mexico"].includes(normalized)) return "north-america";
  if (["india", "japan", "china", "singapore", "thailand", "south korea", "united arab emirates"].includes(normalized)) return "asia";
  if (["united kingdom", "france", "italy", "germany", "spain", "turkey", "denmark", "netherlands"].includes(normalized)) return "europe";
  if (["australia", "new zealand", "french polynesia"].includes(normalized)) return "oceania";
  if (["egypt", "south africa", "kenya", "morocco", "nigeria"].includes(normalized)) return "africa";
  if (["brazil", "argentina", "chile", "colombia", "peru"].includes(normalized)) return "south-america";
  return "other";
}

function priceRange(from, to, tripType) {
  const roundTrip = tripType === "round-trip";
  if (from.country === to.country) {
    if (from.country === "United States") {
      const fromZone = NORTH_AMERICA_ZONES[from.code];
      const toZone = NORTH_AMERICA_ZONES[to.code];
      if (fromZone && toZone && fromZone === toZone) return roundTrip ? [180, 540] : [135, 360];
      if (fromZone && toZone) return roundTrip ? [350, 850] : [285, 690];
    }
    return roundTrip ? [190, 680] : [125, 450];
  }

  const fromContinent = continent(from.country);
  const toContinent = continent(to.country);
  if (fromContinent === toContinent) return roundTrip ? [500, 1400] : [350, 1050];
  if ([fromContinent, toContinent].includes("asia") && [fromContinent, toContinent].includes("north-america")) {
    return roundTrip ? [850, 1800] : [700, 1700];
  }
  if ([fromContinent, toContinent].includes("north-america") && [fromContinent, toContinent].includes("europe")) {
    return roundTrip ? [500, 1200] : [420, 950];
  }
  return roundTrip ? [650, 1750] : [550, 1500];
}

function hash(value) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function cabinMultiplier(cabin) {
  return {
    economy: 1,
    "premium-economy": 1.35,
    business: 2.2,
    "first-class": 3.3,
  }[cabin] || 1;
}

function durationMinutes(from, to) {
  if (from.country === to.country) {
    const fromZone = NORTH_AMERICA_ZONES[from.code];
    const toZone = NORTH_AMERICA_ZONES[to.code];
    if (from.country === "United States" && fromZone && toZone && fromZone === toZone) return 155;
    if (from.country === "United States") return 345;
    return 170;
  }
  const regions = [continent(from.country), continent(to.country)];
  if (regions.includes("asia") && regions.includes("north-america")) return 825;
  if (regions.includes("north-america") && regions.includes("europe")) return 465;
  if (regions[0] === regions[1]) return 260;
  return 610;
}

function timeOnDate(date, time) {
  return new Date(`${date}T${time}:00`);
}

function addMinutes(date, minutes) {
  const result = new Date(date.getTime() + minutes * 60_000);
  const pad = (value) => String(value).padStart(2, "0");
  return `${result.getFullYear()}-${pad(result.getMonth() + 1)}-${pad(result.getDate())}T${pad(result.getHours())}:${pad(result.getMinutes())}:00`;
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hours}h ${String(remainder).padStart(2, "0")}m`;
}

function makeLeg({ from, to, date, template, direction, baseDuration }) {
  const departureTime = template.departureTime;
  const addedStopTime = template.stops ? 95 : 0;
  const duration = baseDuration + addedStopTime;
  const departure = timeOnDate(date, departureTime);
  return {
    departureCode: from.code,
    arrivalCode: to.code,
    departureTime: `${date}T${departureTime}:00`,
    arrivalTime: addMinutes(departure, duration),
    departureDate: date,
    duration: formatDuration(duration),
    durationMinutes: duration,
    stops: template.stops,
    flightNumber: `${template.prefix} ${template.number + direction}`,
  };
}

export function generateDemoFlights(search) {
  const { from, to, departureDate, returnDate, tripType, cabin, travelers } = search;
  if (!from || !to || !departureDate) return [];

  const [minimum, maximum] = priceRange(from, to, tripType);
  const baseDuration = durationMinutes(from, to);
  const isRoundTrip = tripType === "round-trip" && Boolean(returnDate);
  const cabinFactor = cabinMultiplier(cabin);
  const travelerCount = Math.max(1, Number(travelers) || 1);
  const seed = `${from.code}|${to.code}|${departureDate}|${returnDate || ""}|${tripType}|${cabin}`;
  const range = maximum - minimum + 1;

  return DEMO_AIRLINES.map((airline, index) => {
    const template = airline;
    const routeHash = hash(`${seed}|${index}`);
    const farePerTraveler = Math.round(((minimum + (routeHash % range)) * cabinFactor) / 5) * 5;
    const outbound = makeLeg({ from, to, date: departureDate, template, direction: 0, baseDuration });
    const inboundTemplate = {
      ...template,
      departureTime: ["09:20", "13:15", "17:40", "21:05"][index],
      stops: template.stops,
    };
    const inbound = isRoundTrip
      ? makeLeg({ from: to, to: from, date: returnDate, template: inboundTemplate, direction: 50, baseDuration })
      : null;

    return {
      id: `demo-${from.code}-${to.code}-${index + 1}`,
      airlineName: airline.name,
      flightNumber: outbound.flightNumber,
      departureCode: outbound.departureCode,
      departureTime: outbound.departureTime,
      departureDate: outbound.departureDate,
      arrivalCode: outbound.arrivalCode,
      arrivalTime: outbound.arrivalTime,
      duration: outbound.duration,
      stops: outbound.stops,
      cabin,
      pricePerTraveler: farePerTraveler,
      price: farePerTraveler * travelerCount,
      currency: "USD",
      travelers: travelerCount,
      demo: true,
      returnFlight: inbound ? {
        ...inbound,
        airlineName: airline.name,
        cabin,
      } : null,
    };
  });
}
