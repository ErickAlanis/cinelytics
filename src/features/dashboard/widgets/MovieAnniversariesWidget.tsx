import { Card } from '../../../components/Card';
import { WidgetHeader } from '../../../components/WidgetHeader';
import { WidgetStateMessage } from '../../../components/WidgetStateMessage';
import type { BrandProfile } from '../../../types/brand';
import { useMovieAnniversaries } from '../hooks/useMovieAnniversaries';

type MovieAnniversariesWidgetProps = {
  activeBrandProfile: BrandProfile;
};

function getAffinityTone(affinityPercentage: number, isEmpty: boolean) {
  if (isEmpty) {
    return {
      dotClassName: 'bg-slate-700',
      badgeClassName: 'bg-slate-800 text-slate-400',
      lineClassName: 'border-slate-800',
      labelClassName: 'text-slate-500',
    };
  }

  if (affinityPercentage >= 80) {
    return {
      dotClassName: 'bg-emerald-400',
      badgeClassName: 'bg-emerald-500/15 text-emerald-300',
      lineClassName: 'border-emerald-500/30',
      labelClassName: 'text-emerald-300',
    };
  }

  if (affinityPercentage >= 40) {
    return {
      dotClassName: 'bg-indigo-400',
      badgeClassName: 'bg-indigo-500/15 text-indigo-300',
      lineClassName: 'border-indigo-500/30',
      labelClassName: 'text-indigo-300',
    };
  }

  return {
    dotClassName: 'bg-amber-400',
    badgeClassName: 'bg-amber-500/15 text-amber-300',
    lineClassName: 'border-amber-500/30',
    labelClassName: 'text-amber-300',
  };
}

export function MovieAnniversariesWidget({
  activeBrandProfile,
}: MovieAnniversariesWidgetProps) {
  const { rows, isLoading, errorMessage } =
    useMovieAnniversaries(activeBrandProfile);

  return (
    <Card id="movie-anniversaries" className="col-span-12 p-8 lg:col-span-5">
      <WidgetHeader
        title="Hitos Culturales del Día"
        tooltipText="Muestra las películas más populares estrenadas exactamente en esta fecha hace 5, 10, 15 y 20 años. Ayuda a detectar referencias culturales y aniversarios que pueden aprovecharse en campañas de marca."
      />

      {isLoading ? (
        <div className="animate-pulse space-y-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-slate-800" />
                {index < 3 ? <div className="mt-2 h-28 w-px bg-slate-800" /> : null}
              </div>

              <div className="flex-1 pb-2">
                <div className="mb-3 h-3 w-28 rounded bg-slate-800" />
                <div className="mb-3 h-6 w-40 rounded bg-slate-800" />
                <div className="mb-2 h-3 w-24 rounded bg-slate-800" />
                <div className="h-12 w-full rounded bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      ) : errorMessage ? (
        <WidgetStateMessage
          title="No se pudieron cargar los hitos culturales"
          description={errorMessage}
        />
      ) : rows.length === 0 ? (
        <WidgetStateMessage
          title="No hay hitos disponibles"
          description="No encontramos películas relevantes para esta fecha."
        />
      ) : (
        <div className="space-y-8">
          {rows.map((item, index) => {
            const tone = getAffinityTone(item.affinityPercentage, item.isEmpty);

            return (
              <div key={item.yearsAgo} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-4 w-4 rounded-full ${tone.dotClassName} shadow-[0_0_0_6px_rgba(2,6,23,0.9)]`}
                  />
                  {index < rows.length - 1 ? (
                    <div className="mt-2 h-full min-h-[92px] w-px bg-slate-800" />
                  ) : null}
                </div>

                <div className="flex-1 pb-2">
                  <div
                    className={`mb-3 text-[10px] font-black uppercase tracking-[0.18em] ${tone.labelClassName}`}
                  >
                    Hace {item.yearsAgo} años
                  </div>

                  <div className="mb-2 text-1xl font-black tracking-tight text-slate-50">
                    {item.title}
                  </div>

                  <div className="mb-3 text-xs text-slate-500">
                    {item.genreLabel}
                  </div>

                  {!item.isEmpty ? (
                    <div
                      className={`mb-4 inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide ${tone.badgeClassName}`}
                    >
                      Afinidad {item.affinityPercentage}%
                    </div>
                  ) : null}

                  <p className="text-sm italic leading-relaxed text-slate-400">
                    {item.insight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
