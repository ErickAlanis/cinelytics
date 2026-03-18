type ChartSkeletonProps = {
  barCount?: number;
  className?: string;
};

const defaultHeights = [78, 66, 54, 42, 30];

export function ChartSkeleton({
  barCount = 5,
  className = '',
}: ChartSkeletonProps) {
  const heights = defaultHeights.slice(0, barCount);

  return (
    <div className={`animate-pulse ${className}`}>
      <div className="flex h-56 items-end justify-between gap-4">
        {heights.map((height, index) => (
          <div
            key={`${height}-${index}`}
            className="flex h-full flex-1 flex-col items-center justify-end gap-4"
          >
            <div
              className="w-full rounded-2xl bg-slate-800"
              style={{ height: `${height}%` }}
            />
            <div className="h-2 w-12 rounded bg-slate-800" />
          </div>
        ))}
      </div>

      <div className="mt-8 h-16 rounded-2xl border border-slate-800 bg-slate-900/40" />
    </div>
  );
}
