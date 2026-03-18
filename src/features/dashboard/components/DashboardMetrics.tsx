import { MetricCard } from '../../../components/MetricCard';
import type { BrandProfile } from '../../../types/brand';
import type { MovieItem } from '../../../types/content';
import { getBrandFitScore } from '../../brand/lib/getBrandFitScore';
import { getDominantGenre } from '../../../utils/getDominantGenre';
import { getHighFitTitleCount } from '../../brand/lib/getHighFitTitleCount';
import { getPrimaryGenreName } from '../../brand/lib/getPrimaryGenreName';

type DashboardMetricsProps = {
  activeBrandProfile: BrandProfile;
  trendingMovies: MovieItem[];
  upcomingMovies: MovieItem[];
  topActorMatch: string;
  topActorAffinity: string;
};

export function DashboardMetrics({
  activeBrandProfile,
  trendingMovies,
  upcomingMovies,
  topActorMatch,
  topActorAffinity,
}: DashboardMetricsProps) {
  const brandFitScore = getBrandFitScore(trendingMovies, activeBrandProfile);
  const dominantGenre = getDominantGenre(trendingMovies);
  const primaryGenreName = getPrimaryGenreName(activeBrandProfile);
  const highFitTitles = getHighFitTitleCount(
    upcomingMovies,
    activeBrandProfile,
    1,
  );

  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Afinidad con Tendencias"
        value={<span className="text-indigo-400">{brandFitScore}%</span>}
        helperText="Basado en películas en tendencia actuales"
        accentClassName="border-l-4 border-l-indigo-500"
        tooltipText="Porcentaje de coincidencia entre los géneros de la marca y las películas en tendencia actuales obtenidas desde TMDB."
      />

      <MetricCard
        label="Perfil Narrativo de Marca"
        value={primaryGenreName}
        helperText={`Tendencia actual: ${dominantGenre.label} · ${dominantGenre.shareLabel}`}
        tooltipText="Género principal definido para la marca. Se usa como base para calcular afinidad con tendencias actuales."
      />

      <MetricCard
        label="Oportunidades de Contenido"
        value={<span className="text-purple-400">{highFitTitles}</span>}
        helperText="Películas próximas con alta afinidad"
        tooltipText="Número de películas próximas cuyo perfil de géneros coincide con la marca según el modelo de afinidad."
      />

      <MetricCard
        label="Actor con Mayor Afinidad"
        value={<span className="text-xl md:text-2xl">{topActorMatch}</span>}
        helperText={topActorAffinity}
        tooltipText="Actor con mayor coincidencia de afinidad con la marca basado en sus géneros predominantes en TMDB."
      />
    </section>
  );
}
