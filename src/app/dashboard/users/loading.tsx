export default function Loading() {
  return (
    <div className="animate-pulse py-10">
      <div className="flex items-center justify-between">
        <div className="h-10 w-2/4 rounded bg-slate-200" />
        <div className="h-10 w-1/4 rounded bg-slate-200" />
      </div>
      <div className="mt-6 h-[300px] w-full rounded bg-slate-200"></div>
    </div>
  );
}
