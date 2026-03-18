import { MetricCard } from '../../../components/MetricCard';
import type { BrandProfile } from '../../../types/brand';
import type { MovieItem } from '../../../types/content';
import { getBrandKpiSnapshot } from '../../../utils/getBrandKpiSnapshot';
import { getBrandFitScore } from '../../../utils/getBrandFitScore';
import { getDominantGenre } from '../../../utils/getDominantGenre';
import { getHighFitTitleCount } from '../../../utils/getHighFitTitleCount';

type DashboardMetricsProps = {
  activeBrandProfile: BrandProfile;
  trendingMovies: MovieItem[];
  upcomingMovies: MovieItem[];
};

export function DashboardMetrics({
  activeBrandProfile,
  trendingMovies,
  upcomingMovies,
}: DashboardMetricsProps) {
  const snapshot = getBrandKpiSnapshot(activeBrandProfile.id);

  const brandFitScore = getBrandFitScore(trendingMovies, activeBrandProfile);
  const dominantGenre = getDominantGenre(trendingMovies);
  const highFitTitles = getHighFitTitleCount(
    upcomingMovies,
    activeBrandProfile,
    1,
  );

  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Brand Fit Score"
        value={<span className="text-indigo-400">{brandFitScore}%</span>}
        helperText={snapshot.fitDeltaLabel}
        accentClassName="border-l-4 border-l-indigo-500"
        tooltipText="Puntaje calculado a partir de la coincidencia entre los géneros de TMDB y el perfil narrativo de la marca seleccionada."
      />

      <MetricCard
        label="Género Dominante"
        value={dominantGenre.label}
        helperText={dominantGenre.shareLabel}
      />

      <MetricCard
        label="Títulos High-Fit"
        value={<span className="text-purple-400">{highFitTitles}</span>}
        helperText="Próximos 90 días"
      />

      <MetricCard
        label="Top Actor Match"
        value={
          <span className="text-xl md:text-2xl">{snapshot.topActorMatch}</span>
        }
        helperText={snapshot.topActorAffinity}
      />
    </section>
  );
}
