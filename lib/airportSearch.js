import airports from "../app/data/airports.json";

const searchableAirports = airports.map((airport) => ({
  airport,
  name: airport.name.toLowerCase(),
  city: airport.city.toLowerCase(),
  country: airport.country.toLowerCase(),
  iata: airport.iata.toLowerCase(),
  icao: (airport.icao || "").toLowerCase(),
  text: `${airport.name} ${airport.city} ${airport.country} ${airport.iata} ${airport.icao || ""}`.toLowerCase(),
}));

export function getAirportByIata(code) {
  const normalizedCode = (code || "").trim().toLowerCase();
  if (!normalizedCode) return null;
  return searchableAirports.find(({ iata }) => iata === normalizedCode)?.airport || null;
}

export function searchAirports(query, { excludeIata, limit = 8 } = {}) {
  const normalizedQuery = (query || "").trim().toLowerCase();
  const excludedCode = (excludeIata || "").toLowerCase();
  const matches = [];

  for (const entry of searchableAirports) {
    if (excludedCode && entry.iata === excludedCode) continue;
    if (!normalizedQuery) {
      matches.push(entry);
      if (matches.length === limit) break;
      continue;
    }
    if (!entry.text.includes(normalizedQuery)) continue;

    let rank = 3;
    if (entry.iata === normalizedQuery || entry.icao === normalizedQuery) rank = 0;
    else if (
      entry.name.startsWith(normalizedQuery) ||
      entry.city.startsWith(normalizedQuery) ||
      entry.country.startsWith(normalizedQuery) ||
      entry.iata.startsWith(normalizedQuery) ||
      entry.icao.startsWith(normalizedQuery)
    ) rank = 1;
    matches.push({ ...entry, rank });
  }

  if (normalizedQuery) matches.sort((a, b) => a.rank - b.rank);
  return matches.slice(0, limit).map(({ airport }) => airport);
}
