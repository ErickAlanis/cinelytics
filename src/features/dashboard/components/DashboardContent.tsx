import type { BrandProfile } from '../../../types/brand'
import { AffinityMixWidget } from '../widgets/AffinityMixWidget'
import { GenreTrendsWidget } from '../widgets/GenreTrendsWidget'
import { MovieAnniversariesWidget } from '../widgets/MovieAnniversariesWidget'
import { TalentCompatibilityWidget } from '../widgets/TalentCompatibilityWidget'
import { UpcomingReleasesWidget } from '../widgets/UpcomingReleasesWidget'
import { DashboardHeader } from './DashboardHeader'
import { DashboardMetrics } from './DashboardMetrics'

type DashboardContentProps = {
  activeBrandProfile: BrandProfile
}

export function DashboardContent({
  activeBrandProfile,
}: DashboardContentProps) {
  return (
    <>
      <DashboardHeader activeBrandProfile={activeBrandProfile} />
      <DashboardMetrics activeBrandProfile={activeBrandProfile} />

      <section className="mb-10 grid grid-cols-12 gap-6">
        <GenreTrendsWidget activeBrandProfile={activeBrandProfile} />
        <AffinityMixWidget activeBrandProfile={activeBrandProfile} />
      </section>

      <section className="grid grid-cols-12 gap-6">
        <UpcomingReleasesWidget activeBrandProfile={activeBrandProfile} />
        <MovieAnniversariesWidget />
      </section>

      <TalentCompatibilityWidget />
    </>
  )
}
