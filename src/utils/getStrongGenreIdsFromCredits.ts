import type { GenreId } from '../types/brand';
import type { TmdbPersonMovieCredit } from '../types/tmdb';

export function getStrongGenreIdsFromCredits(
  credits: TmdbPersonMovieCredit[],
  limit = 3,
): GenreId[] {
  const genreCountMap = new Map<GenreId, number>();

  credits.forEach((movie) => {
    movie.genre_ids.forEach((genreId) => {
      const currentCount = genreCountMap.get(genreId) ?? 0;
      genreCountMap.set(genreId, currentCount + 1);
    });
  });

  return Array.from(genreCountMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([genreId]) => genreId);
}
