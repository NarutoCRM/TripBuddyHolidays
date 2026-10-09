function Placeholder({ className = "" }) {
  return <div className={`rounded bg-slate-200 motion-safe:animate-pulse ${className}`} />;
}

export function FlightDetailSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7" aria-hidden="true">
      <div className="flex items-start gap-3">
        <Placeholder className="size-9 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1">
          <Placeholder className="h-7 w-56 max-w-full" />
          <div className="mt-2 max-w-2xl space-y-2 py-1">
            <Placeholder className="h-4 w-full" />
            <Placeholder className="h-4 w-2/3" />
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Placeholder className="h-11 w-44 rounded-lg" />
            <Placeholder className="h-11 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlightResultsSkeleton() {
  return (
    <main className="min-h-[60vh] bg-slate-50 py-10 sm:py-14" aria-busy="true">
      <div className="container max-w-5xl">
        <span className="sr-only" role="status">Searching available flights...</span>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" aria-hidden="true">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1">
              <Placeholder className="h-4 w-44" />
              <Placeholder className="mt-2 h-9 w-full max-w-lg" />
            </div>
            <Placeholder className="h-11 w-28 shrink-0 rounded-full" />
          </div>
          <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Placeholder className="h-3 w-20" />
              <Placeholder className="h-4 w-28" />
            </div>
            <Placeholder className="h-4 w-full max-w-56 self-end sm:col-span-2" />
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {Array.from({ length: 3 }, (_, index) => <FlightDetailSkeleton key={index} />)}
        </div>
      </div>
    </main>
  );
}
