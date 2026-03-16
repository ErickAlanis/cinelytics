import { MetricCard } from '../../../components/MetricCard'

export function DashboardMetrics() {
  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Brand Fit Score"
        value={<span className="text-indigo-400">82%</span>}
        helperText="+6% vs mes anterior"
        accentClassName="border-l-4 border-l-indigo-500"
        tooltipText="Puntaje calculado a partir de la coincidencia entre los géneros de TMDB y el perfil narrativo de la marca seleccionada."
      />

      <MetricCard
        label="Género Dominante"
        value="Romance"
        helperText="31% Share global"
      />

      <MetricCard
        label="Títulos High-Fit"
        value={<span className="text-purple-400">14</span>}
        helperText="Próximos 90 días"
      />

      <MetricCard
        label="Top Actor Match"
        value={<span className="text-xl md:text-2xl">Ryan Gosling</span>}
        helperText="76% Afinidad"
      />
    </section>
  )
}
