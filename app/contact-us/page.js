import PageHero from "../../components/PageHero";
import ContactForm from "../../components/ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact TripBuddy Holidays for travel assistance and business inquiries.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact TripBuddy Holidays"
        description="Have a travel question or need help planning your journey? Get in touch with our team."
      />

      <main className="section">
        <div className="container grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-4xl bg-(--primary) p-8 text-white md:p-10">
            <span className="text-xs font-black uppercase tracking-[.18em] text-blue-200">
              Contact information
            </span>

            <h2 className="mt-4 text-3xl font-black">
              We are here to help.
            </h2>

            <div className="mt-10 grid gap-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Address
                </span>

                <p className="mt-2 text-sm leading-7 text-white">
                  261 Griffith Street
                  <br />
                  Jersey City, NJ 07307
                  <br />
                  United States
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Toll Free
                </span>

                <a
                  href="tel:+18443654037"
                  className="mt-2 block text-lg font-black"
                >
                  1-844-365-4037
                </a>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Email
                </span>

                <a
                  href="mailto:info@tripbuddyholidays.com"
                  className="mt-2 block text-sm font-bold"
                >
                  info@tripbuddyholidays.com
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-4xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-black">
              Send us a message
            </h2>

            <p className="mt-2 text-sm leading-6 text-(--muted)">
              Tell us a little about your travel requirements.
            </p>

            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
}