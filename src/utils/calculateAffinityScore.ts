import type { BrandProfile, GenreId } from '../types/brand';

export function calculateAffinityScore(
  titleGenreIds: GenreId[],
  brandProfile: BrandProfile,
): number {
  let score = 0;

  if (titleGenreIds.includes(brandProfile.primaryGenre)) {
    score += 3;
  }

  brandProfile.secondaryGenres.forEach((genreId) => {
    if (titleGenreIds.includes(genreId)) {
      score += 1;
    }
  });

  return score;
}
