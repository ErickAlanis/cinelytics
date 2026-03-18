import type { GenreId } from '../../../types/brand';
import type { MovieItem } from '../../../types/content';
import { getGenreNameById } from '../../../utils/getGenreNameById';

type DominantGenreResult = {
  genreId: GenreId | null;
  label: string;
  shareLabel: string;
};

export function getDominantGenre(movies: MovieItem[]): DominantGenreResult {
  if (movies.length === 0) {
    return {
      genreId: null,
      label: 'N/A',
      shareLabel: 'Sin datos',
    };
  }

  const genreCountMap = new Map<GenreId, number>();

  movies.forEach((movie) => {
    movie.genreIds.forEach((genreId) => {
      const currentCount = genreCountMap.get(genreId) ?? 0;
      genreCountMap.set(genreId, currentCount + 1);
    });
  });

  const sortedGenres = Array.from(genreCountMap.entries()).sort(
    (a, b) => b[1] - a[1],
  );

  const [dominantGenreId, count] = sortedGenres[0];
  const share = Math.round((count / movies.length) * 100);

  return {
    genreId: dominantGenreId,
    label: getGenreNameById(dominantGenreId),
    shareLabel: ` ${share}%`,
  };
}
