import { Card } from '../../../components/Card'
import { TableSkeleton } from '../../../components/TableSkeleton'
import { WidgetHeader } from '../../../components/WidgetHeader'
import { WidgetStateMessage } from '../../../components/WidgetStateMessage'
import type { BrandProfile } from '../../../types/brand'
import { getUpcomingReleaseRows } from '../../../utils/getUpcomingReleaseRows'
import { useUpcomingMovies } from '../hooks/useUpcomingMovies'

type UpcomingReleasesWidgetProps = {
  activeBrandProfile: BrandProfile
}

export function UpcomingReleasesWidget({
  activeBrandProfile,
}: UpcomingReleasesWidgetProps) {
  const { movies, isLoading, errorMessage } = useUpcomingMovies()

  const releaseRows = getUpcomingReleaseRows(movies, activeBrandProfile, 1)

  return (
    <Card className="col-span-12 p-8 lg:col-span-7">
      <WidgetHeader title="Próximos Estrenos" />

      {isLoading ? (
        <TableSkeleton rows={4} columns={4} />
      ) : errorMessage ? (
        <WidgetStateMessage
          title="No se pudieron cargar los próximos estrenos"
          description={errorMessage}
        />
      ) : releaseRows.length === 0 ? (
        <WidgetStateMessage
          title="No hay estrenos relevantes"
          description="No encontramos títulos compatibles con la marca actual."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <tr>
                <th className="pb-4">Título</th>
                <th className="pb-4">Fecha</th>
                <th className="pb-4">Género</th>
                <th className="pb-4">Fit Score</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/50">
              {releaseRows.map((movie) => (
                <tr key={movie.id}>
                  <td className="py-4 font-bold text-slate-50">{movie.title}</td>

                  <td className="py-4 text-xs text-slate-400">
                    {movie.releaseDate}
                  </td>

                  <td className="py-4 text-xs text-slate-400">
                    {movie.genreLabel}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase ${
                        movie.affinityPercentage >= 80
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : movie.affinityPercentage >= 60
                            ? 'bg-indigo-500/20 text-indigo-400'
                            : 'bg-amber-500/20 text-amber-400'
                      }`}
                      title={movie.insight}
                    >
                      {movie.affinityPercentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
