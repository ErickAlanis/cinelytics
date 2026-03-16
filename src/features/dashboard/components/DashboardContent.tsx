import { DashboardHeader } from './DashboardHeader'
import { DashboardMetrics } from './DashboardMetrics'

export function DashboardContent() {
  return (
    <>
      <DashboardHeader />
      <DashboardMetrics />

      <section className="rounded-3xl border border-slate-800 bg-slate-950/30 p-8 text-slate-400">
        Dashboard widgets placeholder
      </section>
    </>
  )
}
