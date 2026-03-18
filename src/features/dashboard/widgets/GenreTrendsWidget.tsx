import { Card } from '../../../components/Card';
import { ChartSkeleton } from '../../../components/ChartSkeleton';
import { WidgetHeader } from '../../../components/WidgetHeader';
import { WidgetStateMessage } from '../../../components/WidgetStateMessage';
import type { BrandProfile } from '../../../types/brand';
import type { MovieItem } from '../../../types/content';
import { getGenrePulse } from '../../../utils/getGenrePulse';
import { getGenrePulseInsight } from '../../../utils/getGenrePulseInsight';

type GenreTrendsWidgetProps = {
  activeBrandProfile: BrandProfile;
  movies: MovieItem[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function GenreTrendsWidget({
  activeBrandProfile,
  movies,
  isLoading,
  errorMessage,
}: GenreTrendsWidgetProps) {
  const pulse = getGenrePulse(movies, activeBrandProfile);
  const insight = getGenrePulseInsight(activeBrandProfile, pulse);
  const maxValue = Math.max(...pulse.map(g => g.percentage));

  return (
    <Card id="genre-trends" className="col-span-12 p-8 lg:col-span-8">
      <WidgetHeader
        title="Pulso Cultural Actual"
        tooltipText="Muestra los géneros que concentran mayor presencia dentro de las películas en tendencia. Ayuda a identificar qué narrativas dominan el momento y cuáles también son relevantes para la marca seleccionada."
      />

      {isLoading ? (
        <ChartSkeleton />
      ) : errorMessage ? (
        <WidgetStateMessage
          title="No se pudieron cargar las tendencias"
          description={errorMessage}
        />
      ) : pulse.length === 0 ? (
        <WidgetStateMessage
          title="No hay tendencias disponibles"
          description="No encontramos suficientes datos para construir este análisis."
        />
      ) : (
        <>
          <div className="relative grid h-56 grid-cols-5 items-end gap-6">
            {/* Grid lines */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
              <div className="h-px bg-slate-800/60" />
              <div className="h-px bg-slate-800/40" />
              <div className="h-px bg-slate-800/20" />
            </div>

            {pulse.map((genre) => (
              <div
                key={genre.genreId}
                className="relative z-10 flex h-full flex-col items-center justify-end gap-3"
              >
                {/* Percentage */}
                <span
                  className={`text-xs font-semibold ${
                    genre.isTopGenre
                      ? 'text-indigo-400'
                      : genre.isBrandGenre
                      ? 'text-purple-300'
                      : 'text-slate-400'
                  }`}
                >
                  {genre.percentage}%
                </span>

                {/* Bar */}
                <div className="flex h-40 w-full items-end justify-center">
                  <div
                    className={`w-10 rounded-t-md transition-all duration-300 ${
                      genre.isTopGenre
                        ? 'bg-gradient-to-b from-indigo-400 to-indigo-600'
                        : genre.isBrandGenre
                        ? 'bg-purple-500/80'
                        : 'bg-slate-700'
                    }`}
                    style={{
                      height: `${(genre.percentage / maxValue) * 100}%`,
                    }}
                  />
                </div>

                {/* Label */}
                <div className="flex flex-col items-center text-center">
                  <span
                    className={`text-[11px] font-semibold ${
                      genre.isTopGenre
                        ? 'text-slate-100'
                        : genre.isBrandGenre
                        ? 'text-slate-200'
                        : 'text-slate-400'
                    }`}
                  >
                    {genre.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-4 text-sm italic text-indigo-300">
            <strong>Insight:</strong> {insight}
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
              Género dominante actual
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-purple-400 bg-slate-700" />
              Relevante para la marca
            </span>
            <span>% participación dentro de tendencias actuales</span>
          </div>
        </>
      )}
    </Card>
  );
}
