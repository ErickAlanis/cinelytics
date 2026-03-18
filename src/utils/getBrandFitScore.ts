import type { BrandProfile } from '../types/brand';
import type { MovieItem } from '../types/content';
import { getAverageAffinityScore } from './getAverageAffinityScore';
import { getAffinityPercentage } from './getAffinityPercentage';

export function getBrandFitScore(
  movies: MovieItem[],
  brandProfile: BrandProfile,
): number {
  const averageScore = getAverageAffinityScore(movies, brandProfile);
  return getAffinityPercentage(averageScore);
}
