import { useEffect, useState } from 'react';
import { getMoviesReleasedOnDate } from '../../../services/movieService';
import type { BrandProfile } from '../../../types/brand';
import type { MovieItem } from '../../../types/content';
import { calculateAffinityScore } from '../../brand/lib/calculateAffinityScore';
import { getAffinityPercentage } from '../../brand/lib/getAffinityPercentage';
import { getAnniversaryInsight } from '../lib/getAnniversaryInsight';
import { getAnniversaryTargetDates } from '../lib/getAnniversaryTargetDates';
import { getGenreNames } from '../../../utils/getGenreNames';
import { mapTmdbMovieToMovieItem } from '../../../services/mappers/mapTmdbMovieToMovieItem';

type AnniversaryResultRow = {
  yearsAgo: 5 | 10 | 15 | 20;
  title: string;
  genreLabel: string;
  affinityPercentage: number;
  insight: string;
  isEmpty: boolean;
};

type UseMovieAnniversariesResult = {
  rows: AnniversaryResultRow[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function useMovieAnniversaries(
  activeBrandProfile: BrandProfile,
): UseMovieAnniversariesResult {
  const [rows, setRows] = useState<AnniversaryResultRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAnniversaries() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const targetDates = getAnniversaryTargetDates();

        const responses = await Promise.all(
          targetDates.map((target) =>
            getMoviesReleasedOnDate(target.date, controller.signal),
          ),
        );

        const mappedRows: AnniversaryResultRow[] = responses.map(
          (movies, index) => {
            const yearsAgo = targetDates[index].yearsAgo;
            const topMovie = movies[0];

            if (!topMovie) {
              return {
                yearsAgo,
                title: 'Sin estrenos destacados',
                genreLabel: 'Sin datos',
                affinityPercentage: 0,
                insight: 'No encontramos un estreno relevante para esta fecha.',
                isEmpty: true,
              };
            }

            const movie: MovieItem = mapTmdbMovieToMovieItem(topMovie);
            const affinityScore = calculateAffinityScore(
              movie.genreIds,
              activeBrandProfile,
            );
            const affinityPercentage = getAffinityPercentage(affinityScore);

            return {
              yearsAgo,
              title: movie.title,
              genreLabel: getGenreNames(movie.genreIds).join(' / '),
              affinityPercentage,
              insight: getAnniversaryInsight(affinityPercentage),
              isEmpty: false,
            };
          },
        );

        setRows(mappedRows);
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorMessage('No se pudieron cargar los hitos culturales del día.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadAnniversaries();

    return () => controller.abort();
  }, [activeBrandProfile]);

  return {
    rows,
    isLoading,
    errorMessage,
  };
}
