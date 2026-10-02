import LegalPage from "../../../components/LegalPage";

export const metadata = {
  title: "Cancellation & Refund",
  description:
    "Learn how airline and supplier fare rules affect cancellations, ticket changes and refund requests.",
  alternates: { canonical: "/legal/cancellation-refund" },
};

export default function CancellationRefundPage() {
  return (
    <LegalPage
      title="Cancellation & Refund"
      sections={[
        [
          "General Information",
          "Cancellation and refund conditions depend on the airline, travel supplier, fare type, ticket rules and applicable booking conditions.",
        ],
        [
          "Before Requesting a Cancellation",
          "Travelers should review the fare rules and applicable booking conditions before requesting a cancellation or change. Some fares may be non-refundable or may involve penalties.",
        ],
        [
          "Refund Processing",
          "Where a refund is permitted, the applicable supplier or airline rules determine the amount and processing conditions. Processing time may vary depending on the payment method and supplier.",
        ],
        [
          "Schedule Changes",
          "If an airline changes or cancels a flight, available options may depend on the airline's policies and the specific ticket conditions.",
        ],
        [
          "Contact Us",
          "For assistance with a cancellation or refund inquiry, contact TripBuddy Holidays at 1-844-365-4037 or info@tripbuddyholidays.com.",
        ],
      ]}
    />
  );
}