import type { BrandProfile, GenreId } from '../../../types/brand';
import type { MovieItem } from '../../../types/content';
import { getGenreNameById } from '../../../utils/getGenreNameById';

export type GenrePulseItem = {
  genreId: GenreId;
  label: string;
  percentage: number;
  count: number;
  isTopGenre: boolean;
  isBrandGenre: boolean;
};

export function getGenrePulse(
  movies: MovieItem[],
  brandProfile: BrandProfile,
): GenrePulseItem[] {
  if (movies.length === 0) {
    return [];
  }

  const genreCountMap = new Map<GenreId, number>();

  movies.forEach((movie) => {
    movie.genreIds.forEach((genreId) => {
      const currentCount = genreCountMap.get(genreId) ?? 0;
      genreCountMap.set(genreId, currentCount + 1);
    });
  });

  const totalGenreMentions = Array.from(genreCountMap.values()).reduce(
    (sum, value) => sum + value,
    0,
  );

  if (totalGenreMentions === 0) {
    return [];
  }

  const sortedGenres = Array.from(genreCountMap.entries())
    .map(([genreId, count]) => ({
      genreId,
      label: getGenreNameById(genreId),
      count,
      percentage: Math.round((count / totalGenreMentions) * 100),
      isBrandGenre:
        genreId === brandProfile.primaryGenre ||
        brandProfile.secondaryGenres.includes(genreId),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  return sortedGenres.map((genre, index) => ({
    ...genre,
    isTopGenre: index === 0,
  }));
}
