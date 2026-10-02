import LegalPage from "../../../components/LegalPage";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read how TripBuddy Holidays collects, uses, protects and shares information submitted through its website.",
  alternates: { canonical: "/legal/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        [
          "Information We Collect",
          "TripBuddy Holidays may collect information that you provide when you contact us, request travel assistance, submit a form or interact with our website. This may include your name, email address, telephone number and information about your travel requirements.",
        ],
        [
          "How We Use Information",
          "Information may be used to respond to inquiries, provide requested travel assistance, communicate with you, improve our website and operate our services.",
        ],
        [
          "Information Sharing",
          "We do not sell personal information as part of our ordinary website operations. Information may be shared with service providers or travel partners when reasonably necessary to provide a requested service or operate the website.",
        ],
        [
          "Data Security",
          "We use reasonable administrative and technical measures designed to protect information. However, no internet transmission or storage system can be guaranteed to be completely secure.",
        ],
        [
          "Your Choices",
          "You may contact TripBuddy Holidays to ask questions about information you have submitted or to request assistance regarding your personal information, subject to applicable requirements.",
        ],
        [
          "Contact",
          "For privacy questions, contact info@tripbuddyholidays.com or write to 261 Griffith Street, Jersey City, NJ 07307, United States.",
        ],
      ]}
    />
  );
}