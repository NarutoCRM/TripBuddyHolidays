export async function searchFlights(searchParams) {
  const response = await fetch("/api/flights/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchParams),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Unable to load flight results.");
  }
  return {
    configured: Boolean(payload.configured),
    mode: payload.mode || "live",
    flights: Array.isArray(payload.results) ? payload.results : [],
  };
}
