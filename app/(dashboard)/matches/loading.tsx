export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-md" />
        <div className="h-10 w-32 bg-slate-100 animate-pulse rounded-md" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-2xl border border-slate-100" />
        ))}
      </div>
    </div>
  );
}
