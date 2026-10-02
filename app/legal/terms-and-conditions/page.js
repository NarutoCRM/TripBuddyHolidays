import LegalPage from "../../../components/LegalPage";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms for using the TripBuddy Holidays website and its travel-planning information.",
  alternates: { canonical: "/legal/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      sections={[
        [
          "Website Use",
          "By using the TripBuddy Holidays website, you agree to use the website lawfully and responsibly and not to interfere with its operation or misuse its content or services.",
        ],
        [
          "Travel Information",
          "Information about routes, destinations, airlines, schedules and fares is provided for general travel-planning purposes. Airline schedules, availability, restrictions and fares may change without notice.",
        ],
        [
          "Third-Party Services",
          "Travel services may involve airlines, suppliers, booking providers or other third parties. Their own terms, conditions, restrictions and policies may apply to transactions or services provided by them.",
        ],
        [
          "Prices and Availability",
          "Any fare or travel information displayed on the website may change based on availability, demand, travel dates and supplier updates. Information should be verified before a booking decision is made.",
        ],
        [
          "Intellectual Property",
          "Website content, branding, text, graphics and other materials belonging to TripBuddy Holidays may not be copied, reproduced or commercially used without appropriate permission.",
        ],
        [
          "Contact",
          "Questions regarding these terms may be sent to info@tripbuddyholidays.com.",
        ],
      ]}
    />
  );
}