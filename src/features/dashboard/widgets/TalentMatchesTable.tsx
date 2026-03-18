import { TableSkeleton } from '../../../components/TableSkeleton';
import { WidgetStateMessage } from '../../../components/WidgetStateMessage';
import type { BrandProfile } from '../../../types/brand';
import { usePopularTalentMatches } from '../hooks/usePopularTalentMatches';

type TalentMatchesTableProps = {
  activeBrandProfile: BrandProfile;
};

function getBadgeClass(tone: string) {
  switch (tone) {
    case 'success':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'amber':
      return 'bg-amber-500/20 text-amber-400';
    default:
      return 'bg-indigo-500/20 text-indigo-400';
  }
}

export function TalentMatchesTable({
  activeBrandProfile,
}: TalentMatchesTableProps) {
  const { rows, isLoading, errorMessage } =
    usePopularTalentMatches(activeBrandProfile);

  if (isLoading) {
    return <TableSkeleton rows={4} columns={4} />;
  }

  if (errorMessage) {
    return (
      <WidgetStateMessage
        title="No se pudo cargar el talento compatible"
        description={errorMessage}
      />
    );
  }

  if (rows.length === 0) {
    return (
      <WidgetStateMessage
        title="No hay talento disponible"
        description="No encontramos actores con suficiente información para este análisis."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <tr>
            <th className="pb-4">Actor</th>
            <th className="pb-4">Popularidad</th>
            <th className="pb-4">Géneros fuertes</th>
            <th className="pb-4">Afinidad con la marca</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800/50">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="py-4 font-bold text-slate-50">{row.actor}</td>
              <td className="py-4 text-xs text-slate-400">{row.popularity}</td>
              <td className="py-4 text-xs text-slate-400">
                {row.strongGenres}
              </td>
              <td className="py-4">
                <span
                  className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase ${getBadgeClass(
                    row.tone,
                  )}`}
                >
                  {row.affinityPercentage}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
