import type { BrandProfile } from '../types/brand'
import type { TmdbPerson, TmdbPersonMovieCredit } from '../types/tmdb'
import { calculateAffinityScore } from './calculateAffinityScore'
import { getActorAffinityInsight } from './getActorAffinityInsight'
import { getAffinityPercentage } from './getAffinityPercentage'
import { getGenreNames } from './getGenreNames'
import { getStrongGenreIdsFromCredits } from './getStrongGenreIdsFromCredits'

type ActorSearchResult = {
  id: number
  name: string
  affinityPercentage: number
  strongGenres: string[]
  insight: string
}

export function getActorSearchResultFromTmdb(
  actor: TmdbPerson,
  credits: TmdbPersonMovieCredit[],
  brandProfile: BrandProfile,
): ActorSearchResult {
  const strongGenreIds = getStrongGenreIdsFromCredits(credits)
  const affinityScore = calculateAffinityScore(strongGenreIds, brandProfile)

  return {
    id: actor.id,
    name: actor.name,
    affinityPercentage: getAffinityPercentage(affinityScore),
    strongGenres: getGenreNames(strongGenreIds),
    insight: getActorAffinityInsight(actor.name, strongGenreIds, brandProfile),
  }
}
