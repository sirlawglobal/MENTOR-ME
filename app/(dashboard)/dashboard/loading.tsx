export default function Loading() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="h-10 w-48 bg-slate-200 animate-pulse rounded-md" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 h-96 bg-white/50 animate-pulse rounded-xl border border-slate-100" />
        <div className="h-96 bg-white/50 animate-pulse rounded-xl border border-slate-100" />
      </div>
    </div>
  );
}
