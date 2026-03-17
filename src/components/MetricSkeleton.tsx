import { Card } from './Card'

type MetricSkeletonProps = {
  className?: string
}

export function MetricSkeleton({ className = '' }: MetricSkeletonProps) {
  return (
    <Card className={`animate-pulse p-6 ${className}`}>
      <div className="mb-4 h-3 w-28 rounded bg-slate-800" />
      <div className="h-10 w-20 rounded bg-slate-800" />
      <div className="mt-4 h-3 w-24 rounded bg-slate-800" />
    </Card>
  )
}
