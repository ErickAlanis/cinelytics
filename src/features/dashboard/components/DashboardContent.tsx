import { MetricSkeleton } from '../../../components/MetricSkeleton';
import { WidgetStateMessage } from '../../../components/WidgetStateMessage';
import type { BrandProfile } from '../../../types/brand';
import { useDashboardMovies } from '../hooks/useDashboardMovies';
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

  return (
    <>
      <div id="dashboard-overview">
        <DashboardHeader activeBrandProfile={activeBrandProfile} />
      </div>

      {isLoading ? (
        <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricSkeleton className="border-l-4 border-l-indigo-500" />
          <MetricSkeleton />
          <MetricSkeleton />
          <MetricSkeleton />
        </section>
      ) : errorMessage ? (
        <div className="mb-10">
          <WidgetStateMessage
            title="No se pudieron cargar los KPIs"
            description={errorMessage}
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
        <div id="genre-trends" className="col-span-12 lg:col-span-8">
          <GenreTrendsWidget
            activeBrandProfile={activeBrandProfile}
            movies={trendingMovies}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </div>

        <div id="affinity-mix" className="col-span-12 lg:col-span-4">
          <AffinityMixWidget activeBrandProfile={activeBrandProfile} />
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div id="upcoming-releases" className="col-span-12 lg:col-span-7">
          <UpcomingReleasesWidget
            activeBrandProfile={activeBrandProfile}
            movies={upcomingMovies}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </div>

        <div id="movie-anniversaries" className="col-span-12 lg:col-span-5">
          <MovieAnniversariesWidget activeBrandProfile={activeBrandProfile} />
        </div>
      </section>

      <div id="talent-compatibility">
        <TalentCompatibilityWidget activeBrandProfile={activeBrandProfile} />
      </div>
    </>
  );
}
