import Link from "next/link";

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

const internationalDestinations = [
    ["London, United Kingdom", "/destinations/international/london"],
    ["Paris, France", "/destinations/international/paris"],
    ["Rome, Italy", "/destinations/international/rome"],
    ["Dubai, United Arab Emirates", "/destinations/international/dubai"],
    ["Istanbul, Turkey", "/destinations/international/istanbul"],
    ["Tokyo, Japan", "/destinations/international/tokyo"],
];

const domesticDestinations = [
    ["New York City, United States", "/destinations/domestic/new-york-city"],
    ["Los Angeles, United States", "/destinations/domestic/los-angeles"],
    ["Las Vegas, United States", "/destinations/domestic/las-vegas"],
    ["San Francisco, United States", "/destinations/domestic/san-francisco"],
    ["Miami, United States", "/destinations/domestic/miami"],
    ["Orlando, United States", "/destinations/domestic/orlando"],
];



function FooterLinks({ links, className = "gap-2.5" }) {
    return (
        <ul className={`mt-4 grid ${className}`}>
            {links.map(([name, href]) => (
                <li key={href}>
                    <Link
                        href={href}
                        className="text-sm leading-5 text-slate-300 transition hover:text-white focus-visible:text-white focus-visible:outline-none"
                    >
                        {name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default function Footer() {
    return (
        <footer className="bg-[#081b2f] text-white">
            <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[3.1fr_3.8fr_5.5fr_5.5fr] lg:gap-10">
                <section>
                    <h2 className="text-xl font-black">
                        TripBuddy <span className="text-[#e9a23b]">Holidays</span>
                    </h2>
                    <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
                        Helping travelers explore flight options, discover destinations and
                        plan journeys with greater confidence.
                    </p>
                    <address className="mt-5 not-italic text-sm leading-6 text-slate-300">
                        261 Griffith Street,
                        <br />
                        Jersey City, NJ 07307,
                        <br />
                        United States
                    </address>
                    <div className="mt-4 grid justify-items-start gap-2 text-sm">
                        <a className="text-slate-300 transition hover:text-white" href="tel:+18443654037">
                            Toll Free: 1-844-365-4037
                        </a>
                        <a className="text-slate-300 transition hover:text-white" href="mailto:info@tripbuddyholidays.com">
                            info@tripbuddyholidays.com
                        </a>
                    </div>
                </section>

                <section>
                    <h2 className="font-black">Flight Deals</h2>
                    <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
                        {dealLinks.map(([name, href]) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="text-sm leading-5 text-slate-300 transition hover:text-white focus-visible:text-white focus-visible:outline-none"
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="font-black">International Destinations</h2>
                    <FooterLinks links={internationalDestinations} />

                </section>
                <section>
                    <h2 className="font-black">Domestic Destinations</h2>
                    <FooterLinks links={domesticDestinations} />
                </section>

            </div>


            {/* legal page  */}

            <div className=" container border-t border-white/10 pb-6 pt-6">
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">

                    <a href="/legal/privacy-policy" className="hover:text-white">
                        Privacy Policy
                    </a>

                    <a href="/legal/terms-and-conditions" className="hover:text-white">
                        Terms & Conditions
                    </a>

                    <a href="/legal/cancellation-refund" className="hover:text-white">
                        Cancellation & Refund
                    </a>

                    <a href="/legal/cookie-policy" className="hover:text-white">
                        Cookie Policy
                    </a>

                    <a href="/legal/disclaimer" className="hover:text-white">
                        Disclaimer
                    </a>
                </div>


                <div className="mt-5 flex flex-col justify-between gap-3 text-xs text-slate-500 sm:flex-row">
                    <p>
                        © {new Date().getFullYear()} EasyTripsNow. All rights reserved.
                    </p>

                    <p>Operated by SL Distributors LLC</p>
                </div>

            </div>
        </footer>
    );
}
