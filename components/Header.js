"use client";

import { useState } from "react";
import Link from "next/link";
import logo from "../public/images/TripBuddyLogo.png";

const dealLinks = [
  ["All Flight Deals", "/deals"],
  ["Domestic Flights", "/deals/domestic-flights"],
  ["International Flights", "/deals/international-flights"],
  ["First Class Flights", "/deals/first-class-flights"],
  ["Business Class Flights", "/deals/business-class-flights"],
  ["One Way Flights", "/deals/one-way-flights"],
  ["Round Trip Flights", "/deals/round-trip-flights"],
  ["Last Minute Flights", "/deals/last-minute-flights"],
  ["Student Flights", "/deals/student-flights"],
  ["Family Holiday Flights", "/deals/family-holiday-flights"],
  ["Holiday Flight Deals", "/deals/holiday-flight-deals"],
  ["Multi-City Flights", "/deals/multi-city-flights"],
  ["Cheap Flights Deals", "/deals/cheap-flights-deals"],
];

const destinationGroups = [
  {
    name: "International",
    href: "/destinations/international",
    destinations: [
      ["London, United Kingdom", "/destinations/international/london"],
      ["Paris, France", "/destinations/international/paris"],
      ["Rome, Italy", "/destinations/international/rome"],
      ["Dubai, United Arab Emirates", "/destinations/international/dubai"],
      ["Istanbul, Turkey", "/destinations/international/istanbul"],
      ["Tokyo, Japan", "/destinations/international/tokyo"],
    ],
  },
  {
    name: "Domestic",
    href: "/destinations/domestic",
    destinations: [
      ["New York City, United States", "/destinations/domestic/new-york-city"],
      ["Los Angeles, United States", "/destinations/domestic/los-angeles"],
      ["Las Vegas, United States", "/destinations/domestic/las-vegas"],
      ["San Francisco, United States", "/destinations/domestic/san-francisco"],
      ["Miami, United States", "/destinations/domestic/miami"],
      ["Orlando, United States", "/destinations/domestic/orlando"],
    ],
  },
];

function Chevron({ direction = "down" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 rotate-45 border-b-2 border-r-2 border-current transition-transform ${direction === "right" ? "-rotate-45" : "-translate-y-0.5"
        }`}
    />
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dealsOpen, setDealsOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [internationalOpen, setInternationalOpen] = useState(false);
  const [domesticOpen, setDomesticOpen] = useState(false);

  function closeMobileMenu() {
    setMenuOpen(false);
    setDealsOpen(false);
    setDestinationsOpen(false);
    setInternationalOpen(false);
    setDomesticOpen(false);
  }

  function renderDestinationLinks(group, onNavigate) {
    return group.destinations.map(([name, href]) => (
      <Link
        key={href}
        href={href}
        onClick={onNavigate}
        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-[#f8f6f1] hover:text-(--primary) focus-visible:bg-[#f8f6f1] focus-visible:outline-none"
      >
        {name}
      </Link>
    ));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container flex h-19.5 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          
          <img src={logo.src} alt="TripBuddy Holidays Logo" className="h-20 w-auto" />
          
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          <Link href="/" className="text-sm font-bold text-slate-600 transition hover:text-(--primary)">
            Home
          </Link>
          <Link href="/about-us" className="text-sm font-bold text-slate-600 transition hover:text-(--primary)">
            About Us
          </Link>
          <Link href="/contact-us" className="text-sm font-bold text-slate-600 transition hover:text-(--primary)">
            Contact Us
          </Link>
          <div className="group relative">
            <Link
              href="/deals"
              aria-haspopup="true"
              className="inline-flex items-center gap-2 py-6 text-sm font-bold text-slate-600 transition hover:text-(--primary) focus-visible:text-(--primary) focus-visible:outline-none"
            >
              Deals <Chevron />
            </Link>
            <div className="invisible pointer-events-none absolute left-0 top-full z-50 w-72 -translate-y-1 rounded-xl border border-slate-200 bg-white p-2 shadow-xl transition duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:translate-y-0">
              {dealLinks.map(([name, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-[#f8f6f1] hover:text-(--primary) focus-visible:bg-[#f8f6f1] focus-visible:outline-none"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <Link
              href="/destinations"
              aria-haspopup="true"
              className="inline-flex items-center gap-2 py-6 text-sm font-bold text-slate-600 transition hover:text-(--primary) focus-visible:text-(--primary) focus-visible:outline-none"
            >
              Destinations <Chevron />
            </Link>
            <div className="invisible pointer-events-none absolute left-0 top-full z-50 w-56 -translate-y-1 rounded-xl border border-slate-200 bg-white p-2 shadow-xl transition duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:translate-y-0">
              {destinationGroups.map((group) => (
                <div key={group.name} className="group/sub relative">
                  <Link
                    href={group.href}
                    aria-haspopup="true"
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f8f6f1] hover:text-(--primary) focus-visible:bg-[#f8f6f1] focus-visible:outline-none"
                  >
                    {group.name} <Chevron direction="right" />
                  </Link>
                  <div className="invisible pointer-events-none absolute left-full top-0 z-50 w-72 pl-2 transition duration-150 group-hover/sub:visible group-hover/sub:pointer-events-auto group-focus-within/sub:visible group-focus-within/sub:pointer-events-auto">
                    <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                      {group.destinations.map(([name, href]) => (
                        <Link
                          key={href}
                          href={href}
                          className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-[#f8f6f1] hover:text-(--primary) focus-visible:bg-[#f8f6f1] focus-visible:outline-none"
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </nav>

        <Link
          href="/deals"
          className="hidden rounded-full bg-(--primary) px-5 py-3 text-sm font-black text-white transition hover:bg-(--primary-dark) lg:inline-flex"
        >
          Explore Deals
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-xl lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container py-4">
            <div className="grid gap-1">
              <Link href="/" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 font-bold text-slate-700 hover:bg-slate-50">Home</Link>
              <Link href="/about-us" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 font-bold text-slate-700 hover:bg-slate-50">About Us</Link>
              <Link href="/contact-us" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 font-bold text-slate-700 hover:bg-slate-50">Contact Us</Link>


              <section className="rounded-xl">
                <button
                  type="button"
                  aria-expanded={dealsOpen}
                  aria-controls="mobile-deals"
                  onClick={() => setDealsOpen(!dealsOpen)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-bold text-slate-700 hover:bg-slate-50"
                >
                  Deals <Chevron />
                </button>
                {dealsOpen && (
                  <div id="mobile-deals" className="grid grid-cols-2 gap-1 px-3 pb-3">
                    {dealLinks.map(([name, href]) => (
                      <Link key={href} href={href} onClick={closeMobileMenu} className="rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-[#f8f6f1] hover:text-(--primary)">
                        {name}
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              <section className="rounded-xl">
                <button
                  type="button"
                  aria-expanded={destinationsOpen}
                  aria-controls="mobile-destinations"
                  onClick={() => setDestinationsOpen(!destinationsOpen)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-bold text-slate-700 hover:bg-slate-50"
                >
                  Destinations <Chevron />
                </button>
                {destinationsOpen && (
                  <div id="mobile-destinations" className="grid gap-1 px-3 pb-3">
                    {destinationGroups.map((group) => {
                      const isOpen = group.name === "International" ? internationalOpen : domesticOpen;
                      const toggle = group.name === "International" ? setInternationalOpen : setDomesticOpen;
                      const sectionId = `mobile-${group.name.toLowerCase()}`;

                      return (
                        <section key={group.name}>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={sectionId}
                            onClick={() => toggle(!isOpen)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-[#f8f6f1]"
                          >
                            {group.name} <Chevron />
                          </button>
                          {isOpen && <div id={sectionId} className="ml-3 border-l border-slate-200 pl-2">{renderDestinationLinks(group, closeMobileMenu)}</div>}
                        </section>
                      );
                    })}
                  </div>
                )}
              </section>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}