import { AffinityMixWidget } from '../widgets/AffinityMixWidget'
import { GenreTrendsWidget } from '../widgets/GenreTrendsWidget'
import { DashboardHeader } from './DashboardHeader'
import { DashboardMetrics } from './DashboardMetrics'

export function DashboardContent() {
  return (
    <>
      <DashboardHeader />
      <DashboardMetrics />

      <section className="mb-10 grid grid-cols-12 gap-6">
        <GenreTrendsWidget />
        <AffinityMixWidget />
      </section>
    </>
  )
}
