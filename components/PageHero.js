export default function PageHero({
  eyebrow = "TripBuddy Holidays",
  title,
  description,
}) {
  return (
    <section className="relative overflow-hidden bg-[#c7c3c3] py-20 text-white md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(233,162,59,.20),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(18,60,105,.75),transparent_45%)]" />

      <div className="container relative">
        <div className="max-w-4xl">
          <span className="text-xs font-black uppercase tracking-[.18em] text-[#e9a23b]">
            {eyebrow}
          </span>

          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}