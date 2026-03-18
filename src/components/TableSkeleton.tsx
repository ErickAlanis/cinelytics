type TableSkeletonProps = {
  rows?: number;
  columns?: number;
  className?: string;
};

export function TableSkeleton({
  rows = 4,
  columns = 4,
  className = '',
}: TableSkeletonProps) {
  return (
    <div className={`animate-pulse overflow-x-auto ${className}`}>
      <div className="min-w-[720px]">
        <div className="mb-4 grid gap-4 border-b border-slate-800 pb-4">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns }).map((_, index) => (
              <div key={index} className="h-3 rounded bg-slate-800" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4 border-b border-slate-800/50 pb-4"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: columns }).map((__, columnIndex) => (
                <div key={columnIndex} className="h-4 rounded bg-slate-800" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
