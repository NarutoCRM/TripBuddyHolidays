import PageHero from "./PageHero";

export default function LegalPage({
  title,
  updated = "October 2026",
  sections,
}) {
  return (
    <>
      <PageHero
        eyebrow="TripBuddy Holidays"
        title={title}
        description={`Please review this ${title.toLowerCase()} carefully to understand the applicable information and terms.`}
      />

      <main className="section">
        <div className="container">
          <article className="mx-auto max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Last updated: {updated}
            </p>

            <div className="mt-8 grid gap-8">
              {sections.map(([heading, content]) => (
                <section key={heading}>
                  <h2 className="text-2xl font-black">
                    {heading}
                  </h2>

                  <p className="mt-3 text-sm leading-8 text-(--muted)">
                    {content}
                  </p>
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>
    </>
  );
}