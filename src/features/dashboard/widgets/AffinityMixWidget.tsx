import { Card } from '../../../components/Card';
import { WidgetHeader } from '../../../components/WidgetHeader';
import { WidgetStateMessage } from '../../../components/WidgetStateMessage';
import type { BrandProfile } from '../../../types/brand';
import type { MovieItem } from '../../../types/content';
import { getAffinityBreakdownByGenre } from '../../brand/lib/getAffinityBreakdownByGenre';
import { getAffinityMixInsight } from '../../brand/lib/getAffinityMixInsight';

type AffinityMixWidgetProps = {
  activeBrandProfile: BrandProfile;
  movies: MovieItem[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function AffinityMixWidget({
  activeBrandProfile,
  movies,
  isLoading,
  errorMessage,
}: AffinityMixWidgetProps) {
  const breakdown = getAffinityBreakdownByGenre(movies, activeBrandProfile);
  const insight = getAffinityMixInsight(activeBrandProfile, breakdown);

  return (
    <Card
      id="affinity-mix"
      className="col-span-12 flex flex-col p-8 lg:col-span-4"
    >
      <WidgetHeader title="Contribución por Género" />

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="mb-2 flex items-center justify-between">
                <div className="h-3 w-24 rounded bg-slate-800" />
                <div className="h-3 w-10 rounded bg-slate-800" />
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800" />
            </div>
          ))}
          <div className="mt-6 h-16 rounded-2xl border border-slate-800 bg-slate-900/40" />
        </div>
      ) : errorMessage ? (
        <WidgetStateMessage
          title="No se pudo calcular el la contribución por género"
          description={errorMessage}
        />
      ) : breakdown.length === 0 ? (
        <WidgetStateMessage
          title="No hay suficiente afinidad"
          description="No encontramos una composición clara de géneros para la marca actual."
        />
      ) : (
        <>
          <div className="space-y-5">
            {breakdown.map((item) => (
              <div key={item.genreId}>
                <div className="mb-2 flex items-center justify-between text-xs font-bold">
                  <span
                    className={
                      item.isBrandGenre ? 'text-slate-200' : 'text-slate-400'
                    }
                  >
                    {item.label}
                  </span>
                  <span
                    className={
                      item.isBrandGenre ? 'text-indigo-400' : 'text-slate-500'
                    }
                  >
                    {item.contribution}%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={
                      item.isBrandGenre
                        ? 'h-full bg-gradient-to-r from-indigo-500 to-purple-500'
                        : 'h-full bg-slate-600'
                    }
                    style={{ width: `${item.contribution}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-4 text-sm italic text-indigo-300">
            <strong>Insight:</strong> {insight}
          </div>
        </>
      )}
    </Card>
  );
}
