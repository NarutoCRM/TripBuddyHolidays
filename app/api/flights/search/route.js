import { NextResponse } from "next/server";
import { generateDemoFlights } from "../../../../lib/demoFlights";
import { searchFlightProvider } from "../../../../lib/flightService";

export async function POST(request) {
  let searchParams;
  try {
    searchParams = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid flight search request." }, { status: 400 });
  }

  if (!searchParams?.from?.code || !searchParams?.to?.code || !searchParams?.departureDate) {
    return NextResponse.json({ message: "Required flight search details are missing." }, { status: 400 });
  }

  // Demo mode defaults on until it is explicitly disabled, so the site is useful
  // locally even before a .env.local file or real provider credentials exist.
  const demoMode = process.env.FLIGHT_DEMO_MODE !== "false";
  if (demoMode) {
    return NextResponse.json({
      configured: true,
      mode: "demo",
      results: generateDemoFlights(searchParams),
    });
  }

  try {
    const providerResult = await searchFlightProvider(searchParams);
    return NextResponse.json({
      ...providerResult,
      mode: providerResult.configured ? "live" : "unconfigured",
    });
  } catch {
    return NextResponse.json({ message: "The flight provider is temporarily unavailable." }, { status: 502 });
  }
}
