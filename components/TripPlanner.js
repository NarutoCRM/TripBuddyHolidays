"use client";

import { useState } from "react";
import FlightSearch from "./FlightSearch"


export default function TripPlanner() {
  const [tripType, setTripType] = useState("Round Trip");
  const [showNotice, setShowNotice] = useState(false);

  return (
    <>
    <FlightSearch />
    </>
  );
}