import LegalPage from "../../../components/LegalPage";

export const metadata = {
  title: "Cookie Policy",
  description:
    "Find out how TripBuddy Holidays may use cookies and how to manage cookie settings in your browser.",
  alternates: { canonical: "/legal/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      sections={[
        [
          "What Are Cookies?",
          "Cookies are small text files that websites may store on a visitor's device. They can help websites remember preferences, maintain functionality and understand how visitors use the website.",
        ],
        [
          "How We May Use Cookies",
          "TripBuddy Holidays may use cookies or similar technologies for essential website functionality, preferences, analytics and website performance.",
        ],
        [
          "Third-Party Cookies",
          "Some third-party services integrated into a website may use their own cookies or similar technologies according to their respective policies.",
        ],
        [
          "Managing Cookies",
          "Most modern browsers allow users to control or delete cookies through browser settings. Disabling certain cookies may affect some website functionality.",
        ],
        [
          "Updates",
          "This Cookie Policy may be updated from time to time as our website, technology or legal requirements change.",
        ],
      ]}
    />
  );
}