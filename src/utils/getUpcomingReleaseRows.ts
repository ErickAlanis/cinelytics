import type { BrandProfile } from '../types/brand'
import type { MovieItem } from '../types/content'
import { calculateAffinityScore } from './calculateAffinityScore'
import { formatShortDate } from './formatShortDate'
import { getAffinityPercentage } from './getAffinityPercentage'
import { getGenreNames } from './getGenreNames'
import { getUpcomingMovieInsight } from './getUpcomingMovieInsight'
import { isRelevantTitle } from './isRelevantTitle'

type UpcomingReleaseRow = {
  id: number
  title: string
  releaseDate: string
  genreLabel: string
  affinityPercentage: number
  insight: string
}

export function getUpcomingReleaseRows(
  movies: MovieItem[],
  brandProfile: BrandProfile,
  minRelevantScore = 0,
): UpcomingReleaseRow[] {
  return movies
    .map((movie) => {
      const affinityScore = calculateAffinityScore(movie.genreIds, brandProfile)
      const affinityPercentage = getAffinityPercentage(affinityScore)

      return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.releaseDate
          ? formatShortDate(movie.releaseDate)
          : 'N/A',
        genreLabel: getGenreNames(movie.genreIds).join(' / '),
        affinityScore,
        affinityPercentage,
        insight: getUpcomingMovieInsight(movie.title, brandProfile),
      }
    })
    .filter((movie) => isRelevantTitle(movie.affinityScore, minRelevantScore))
    .sort((a, b) => b.affinityPercentage - a.affinityPercentage)
    .map(({ affinityScore, ...row }) => row)
}
