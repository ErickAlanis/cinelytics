import { Card } from '../../../components/Card';
import { TableSkeleton } from '../../../components/TableSkeleton';
import { WidgetHeader } from '../../../components/WidgetHeader';
import { WidgetStateMessage } from '../../../components/WidgetStateMessage';
import type { BrandProfile } from '../../../types/brand';
import type { MovieItem } from '../../../types/content';
import { getUpcomingReleaseRows } from '../../../utils/getUpcomingReleaseRows';

type UpcomingReleasesWidgetProps = {
  activeBrandProfile: BrandProfile;
  movies: MovieItem[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function UpcomingReleasesWidget({
  activeBrandProfile,
  movies,
  isLoading,
  errorMessage,
}: UpcomingReleasesWidgetProps) {
  const releaseRows = getUpcomingReleaseRows(movies, activeBrandProfile, 1);

  return (
    <Card id="upcoming-releases" className="col-span-12 p-8 lg:col-span-7">
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
          <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Título</th>

              {/* Desktop grande */}
              <th className="hidden xl:table-cell px-4 py-3">Fecha</th>
              <th className="hidden xl:table-cell px-4 py-3">Género</th>

              {/* Intermedio */}
              <th className="xl:hidden px-4 py-3">Detalle</th>

              <th className="px-4 py-3 text-right">Fit</th>
            </tr>
          </thead>

            <tbody>
              {releaseRows.map((movie) => (
                <tr
                  key={movie.id}
                  className="border-t border-slate-800 hover:bg-slate-900/40 transition"
                >
                  {/* Título */}
                  <td className="px-4 py-3 font-semibold text-slate-100">
                    {movie.title}
                  </td>

                  {/* Desktop grande */}
                  <td className="hidden xl:table-cell px-4 py-3 text-slate-400">
                    {movie.releaseDate}
                  </td>

                  <td className="hidden xl:table-cell px-4 py-3 text-slate-400">
                    {movie.genreLabel}
                  </td>

                  {/* Intermedio (fusionado) */}
                  <td className="xl:hidden px-4 py-3 text-slate-400">
                    {movie.releaseDate} · {movie.genreLabel}
                  </td>

                  {/* Fit Score */}
                  <td className="px-4 py-3 text-right">
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
  );
}
