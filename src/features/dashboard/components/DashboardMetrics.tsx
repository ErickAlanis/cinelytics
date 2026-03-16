import { MetricCard } from '../../../components/MetricCard'
import type { BrandProfile } from '../../../types/brand'
import { getBrandKpiSnapshot } from '../../../utils/getBrandKpiSnapshot'
import { getPrimaryGenreName } from '../../../utils/getPrimaryGenreName'

type DashboardMetricsProps = {
  activeBrandProfile: BrandProfile
}

export function DashboardMetrics({
  activeBrandProfile,
}: DashboardMetricsProps) {
  const snapshot = getBrandKpiSnapshot(activeBrandProfile.id)
  const primaryGenreName = getPrimaryGenreName(activeBrandProfile)

  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Brand Fit Score"
        value={<span className="text-indigo-400">{snapshot.brandFitScore}%</span>}
        helperText={snapshot.fitDeltaLabel}
        accentClassName="border-l-4 border-l-indigo-500"
        tooltipText="Puntaje calculado a partir de la coincidencia entre los géneros de TMDB y el perfil narrativo de la marca seleccionada."
      />

      <MetricCard
        label="Género Dominante"
        value={primaryGenreName}
        helperText={snapshot.dominantGenreShare}
      />

      <MetricCard
        label="Títulos High-Fit"
        value={<span className="text-purple-400">{snapshot.highFitTitles}</span>}
        helperText="Próximos 90 días"
      />

      <MetricCard
        label="Top Actor Match"
        value={<span className="text-xl md:text-2xl">{snapshot.topActorMatch}</span>}
        helperText={snapshot.topActorAffinity}
      />
    </section>
  )
}
