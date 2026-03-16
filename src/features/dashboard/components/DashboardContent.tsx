import { DashboardHeader } from './DashboardHeader'
import { DashboardMetrics } from './DashboardMetrics'
import { GenreTrendsWidget } from '../widgets/GenreTrendsWidget'

export function DashboardContent() {
  return (
    <>
      <DashboardHeader />
      <DashboardMetrics />

      <section className="grid grid-cols-12 gap-6">
        <GenreTrendsWidget />
      </section>
    </>
  )
}
