import type { BrandProfile, GenreId } from '../types/brand';
import type { MovieItem } from '../types/content';
import { calculateAffinityScore } from './calculateAffinityScore';
import { getGenreNameById } from './getGenreNameById';

export type AffinityBreakdownItem = {
  genreId: GenreId;
  label: string;
  contribution: number;
  isBrandGenre: boolean;
};

export function getAffinityBreakdownByGenre(
  movies: MovieItem[],
  brandProfile: BrandProfile,
): AffinityBreakdownItem[] {
  if (movies.length === 0) {
    return [];
  }

  const contributionMap = new Map<GenreId, number>();

  movies.forEach((movie) => {
    const affinityScore = calculateAffinityScore(movie.genreIds, brandProfile);

    if (affinityScore === 0) {
      return;
    }

    movie.genreIds.forEach((genreId) => {
      const current = contributionMap.get(genreId) ?? 0;
      contributionMap.set(genreId, current + affinityScore);
    });
  });

  const totalContribution = Array.from(contributionMap.values()).reduce(
    (sum, value) => sum + value,
    0,
  );

  if (totalContribution === 0) {
    return [];
  }

  return Array.from(contributionMap.entries())
    .map(([genreId, value]) => ({
      genreId,
      label: getGenreNameById(genreId),
      contribution: Math.round((value / totalContribution) * 100),
      isBrandGenre:
        genreId === brandProfile.primaryGenre ||
        brandProfile.secondaryGenres.includes(genreId),
    }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 4);
}
