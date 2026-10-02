import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://tripbuddyholidays.com"),
  title: {
    default: "TripBuddy Holidays | Plan Your Journey With Confidence",
    template: "%s | TripBuddy Holidays",
  },
  description:
    "TripBuddy Holidays helps travelers explore flight options, travel deals and destinations for domestic and international journeys.",
  keywords: [
    "TripBuddy Holidays",
    "flight deals",
    "cheap flights",
    "domestic flights",
    "international flights",
    "travel deals",
    "flight booking",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}