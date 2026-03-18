import type { BrandProfile } from '../types/brand';
import type { MovieItem } from '../types/content';
import { calculateAffinityScore } from './calculateAffinityScore';
import { isRelevantTitle } from './isRelevantTitle';

export function getHighFitTitleCount(
  movies: MovieItem[],
  brandProfile: BrandProfile,
  minRelevantScore = 1,
): number {
  return movies.filter((movie) => {
    const score = calculateAffinityScore(movie.genreIds, brandProfile);
    return isRelevantTitle(score, minRelevantScore);
  }).length;
}
