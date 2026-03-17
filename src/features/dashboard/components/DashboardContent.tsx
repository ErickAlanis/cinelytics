import { MetricSkeleton } from '../../../components/MetricSkeleton'
import { WidgetStateMessage } from '../../../components/WidgetStateMessage'
import type { BrandProfile } from '../../../types/brand'
import { useTrendingMovies } from '../hooks/useTrendingMovies'
import { useUpcomingMovies } from '../hooks/useUpcomingMovies'
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
  const {
    movies: trendingMovies,
    isLoading: isTrendingLoading,
    errorMessage: trendingErrorMessage,
  } = useTrendingMovies()

  const {
    movies: upcomingMovies,
    isLoading: isUpcomingLoading,
    errorMessage: upcomingErrorMessage,
  } = useUpcomingMovies()

  const isMetricsLoading = isTrendingLoading || isUpcomingLoading
  const metricsErrorMessage = trendingErrorMessage || upcomingErrorMessage

  return (
    <>
      <DashboardHeader activeBrandProfile={activeBrandProfile} />

      {isMetricsLoading ? (
        <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricSkeleton className="border-l-4 border-l-indigo-500" />
          <MetricSkeleton />
          <MetricSkeleton />
          <MetricSkeleton />
        </section>
      ) : metricsErrorMessage ? (
        <div className="mb-10">
          <WidgetStateMessage
            title="No se pudieron cargar los KPIs"
            description={metricsErrorMessage}
          />
        </div>
      ) : (
        <DashboardMetrics
          activeBrandProfile={activeBrandProfile}
          trendingMovies={trendingMovies}
          upcomingMovies={upcomingMovies}
        />
      )}

      <section className="mb-10 grid grid-cols-12 gap-6">
        <GenreTrendsWidget activeBrandProfile={activeBrandProfile} />
        <AffinityMixWidget activeBrandProfile={activeBrandProfile} />
      </section>

      <section className="grid grid-cols-12 gap-6">
        <UpcomingReleasesWidget activeBrandProfile={activeBrandProfile} />
        <MovieAnniversariesWidget activeBrandProfile={activeBrandProfile} />
      </section>

      <TalentCompatibilityWidget activeBrandProfile={activeBrandProfile} />
    </>
  )
}
