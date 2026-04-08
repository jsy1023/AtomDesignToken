export default function LandingLoading() {
  return (
    <div className="flex flex-col w-full bg-[var(--color-bg-wrapper)] animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="py-24 px-6 border-b border-[var(--color-border-standard)]">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
          <div className="h-20 md:h-28 w-3/4 bg-[var(--color-bg-input-standard)] mb-6 rounded-2xl opacity-80" />
          <div className="h-6 w-1/2 bg-[var(--color-bg-input-standard)] mb-10 rounded-lg opacity-60" />
          <div className="flex justify-center gap-4">
            <div className="h-14 w-36 bg-[var(--color-bg-input-standard)] rounded-full opacity-70" />
            <div className="h-14 w-36 bg-[var(--color-bg-input-standard)] rounded-full opacity-70" />
          </div>
        </div>
      </section>

      {/* Advantages Section Skeleton */}
      <section className="py-24 px-6 bg-[var(--color-bg-card)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16 space-y-4">
            <div className="h-10 w-48 bg-[var(--color-bg-input-standard)] rounded-lg opacity-70" />
            <div className="h-5 w-64 bg-[var(--color-bg-input-standard)] rounded-lg opacity-50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-8 border border-[var(--color-border-standard)] rounded-2xl bg-[var(--color-bg-wrapper)] h-64 shadow-sm opacity-60">
                <div className="h-12 w-12 bg-[var(--color-bg-input-standard)] rounded-xl mb-6" />
                <div className="h-8 w-1/2 bg-[var(--color-bg-input-standard)] mb-3 rounded-md" />
                <div className="h-4 w-full bg-[var(--color-bg-input-standard)] mb-2 rounded-md" />
                <div className="h-4 w-5/6 bg-[var(--color-bg-input-standard)] rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
