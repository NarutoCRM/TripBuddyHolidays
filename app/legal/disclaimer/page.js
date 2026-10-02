import LegalPage from "../../../components/LegalPage";

export const metadata = {
  title: "Disclaimer",
  description:
    "Review important limitations on travel information, availability, fares and third-party services referenced by TripBuddy Holidays.",
  alternates: { canonical: "/legal/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      sections={[
        [
          "General Information",
          "The information provided on the TripBuddy Holidays website is intended for general travel-planning and informational purposes.",
        ],
        [
          "Flight Information",
          "Flight schedules, availability, prices, baggage rules, restrictions and other travel information may change. Airline or supplier information should be verified before making a final travel decision.",
        ],
        [
          "Third-Party Providers",
          "TripBuddy Holidays may provide information relating to airlines, hotels, travel suppliers or other third parties. Their services are subject to their own terms, conditions and policies.",
        ],
        [
          "No Guarantee",
          "We do not guarantee that every route, fare, schedule, destination service or travel option shown or described on the website will remain available.",
        ],
        [
          "External Links",
          "Links to external websites may be provided for convenience. TripBuddy Holidays is not responsible for the content, policies or availability of external websites.",
        ],
        [
          "Contact",
          "For questions regarding this disclaimer, contact info@tripbuddyholidays.com.",
        ],
      ]}
    />
  );
}