import { MetricSkeleton } from '../../../components/MetricSkeleton';
import { WidgetStateMessage } from '../../../components/WidgetStateMessage';
import type { BrandProfile } from '../../../types/brand';
import { getTopTalentMatch } from '../lib/getTopTalentMatch';
import { useDashboardMovies } from '../hooks/useDashboardMovies';
import { usePopularTalentMatches } from '../hooks/usePopularTalentMatches';
import { AffinityMixWidget } from '../widgets/AffinityMixWidget';
import { GenreTrendsWidget } from '../widgets/GenreTrendsWidget';
import { MovieAnniversariesWidget } from '../widgets/MovieAnniversariesWidget';
import { TalentCompatibilityWidget } from '../widgets/TalentCompatibilityWidget';
import { UpcomingReleasesWidget } from '../widgets/UpcomingReleasesWidget';
import { DashboardHeader } from './DashboardHeader';
import { DashboardMetrics } from './DashboardMetrics';

type DashboardContentProps = {
  activeBrandProfile: BrandProfile;
};

export function DashboardContent({
  activeBrandProfile,
}: DashboardContentProps) {
  const { trendingMovies, upcomingMovies, isLoading, errorMessage } =
    useDashboardMovies();

  const {
    rows: talentRows,
    isLoading: isTalentLoading,
    errorMessage: talentErrorMessage,
  } = usePopularTalentMatches(activeBrandProfile);

  const topTalentMatch = getTopTalentMatch(talentRows);

  const isMetricsLoading = isLoading || isTalentLoading;
  const metricsErrorMessage = errorMessage || talentErrorMessage;

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
          topActorMatch={topTalentMatch.actor}
          topActorAffinity={topTalentMatch.affinityLabel}
        />
      )}

      <section className="mb-10 grid grid-cols-12 gap-6">
        <GenreTrendsWidget
          activeBrandProfile={activeBrandProfile}
          movies={trendingMovies}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <AffinityMixWidget
          activeBrandProfile={activeBrandProfile}
          movies={trendingMovies}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </section>

      <section className="grid grid-cols-12 gap-6">
        <UpcomingReleasesWidget
          activeBrandProfile={activeBrandProfile}
          movies={upcomingMovies}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <MovieAnniversariesWidget activeBrandProfile={activeBrandProfile} />
      </section>

      <TalentCompatibilityWidget
        activeBrandProfile={activeBrandProfile}
        rows={talentRows}
        isLoading={isTalentLoading}
        errorMessage={talentErrorMessage}
      />
    </>
  );
}
