import type { BrandProfile } from '../types/brand'
import type { MovieItem } from '../types/content'
import { calculateAffinityScore } from './calculateAffinityScore'

export function getAverageAffinityScore(
  movies: MovieItem[],
  brandProfile: BrandProfile,
): number {
  if (movies.length === 0) {
    return 0
  }

  const totalScore = movies.reduce((sum, movie) => {
    return sum + calculateAffinityScore(movie.genreIds, brandProfile)
  }, 0)

  return totalScore / movies.length
}
