export default function DocsLoading() {
  return (
    <div className="w-full bg-[var(--color-bg-wrapper)] min-h-screen animate-pulse">
      <div className="max-w-4xl mx-auto p-8 md:p-12 space-y-10">
        {/* Path Label */}
        <div className="h-5 w-40 bg-[var(--color-bg-input-standard)] rounded opacity-60" />

        {/* Main Title */}
        <div className="h-14 w-3/4 bg-[var(--color-bg-input-standard)] rounded-xl opacity-80" />
        
        {/* Paragraph Blocks */}
        <div className="space-y-5">
          <div className="h-4 w-full bg-[var(--color-bg-input-standard)] rounded opacity-50" />
          <div className="h-4 w-full bg-[var(--color-bg-input-standard)] rounded opacity-50" />
          <div className="h-4 w-11/12 bg-[var(--color-bg-input-standard)] rounded opacity-50" />
        </div>

        {/* Visualization Block */}
        <div className="h-72 w-full bg-[var(--color-bg-input-standard)] rounded-3xl border-2 border-dashed border-[var(--color-border-standard)] flex items-center justify-center opacity-40">
            <div className="text-[var(--color-text-sub)] font-bold tracking-widest text-sm">LOADING...</div>
        </div>

        {/* Secondary Paragraph Blocks */}
        <div className="space-y-5">
          <div className="h-4 w-full bg-[var(--color-bg-input-standard)] rounded opacity-50" />
          <div className="h-4 w-4/5 bg-[var(--color-bg-input-standard)] rounded opacity-50" />
        </div>
      </div>
    </div>
  );
}
