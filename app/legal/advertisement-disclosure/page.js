import LegalPage from "../../../components/LegalPage";

export const metadata = {
  title: "Advertisement Disclosure",
  description:
    "Understand how TripBuddy Holidays identifies advertising, promotional placements and third-party travel offers.",
  alternates: { canonical: "/legal/advertisement-disclosure" },
};

export default function AdvertisementDisclosurePage() {
  return (
    <LegalPage
      title="Advertisement Disclosure"
      sections={[
        [
          "Advertising and Promotions",
          "TripBuddy Holidays may display promotional content, advertisements, sponsored placements or travel offers on its website and other digital channels.",
        ],
        [
          "Third-Party Relationships",
          "Some links or promotional placements may lead to third-party websites or services. A relationship with a third party does not mean that TripBuddy Holidays controls that third party's products, policies or services.",
        ],
        [
          "Travel Offers",
          "Promotional travel information may be subject to availability, restrictions, blackout dates, supplier conditions and other limitations.",
        ],
        [
          "Accuracy",
          "We make reasonable efforts to keep promotional information useful, but prices, availability and offer conditions can change.",
        ],
        [
          "Contact",
          "Questions about advertising or promotional content can be sent to info@tripbuddyholidays.com.",
        ],
      ]}
    />
  );
}