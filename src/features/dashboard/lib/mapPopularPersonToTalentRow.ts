import type { BrandProfile } from '../../../types/brand';
import type { TmdbPerson, TmdbPersonMovieCredit } from '../../../types/tmdb';
import { calculateAffinityScore } from '../../brand/lib/calculateAffinityScore';
import { getAffinityPercentage } from '../../brand/lib/getAffinityPercentage';
import { getGenreNames } from '../../../utils/getGenreNames';
import { getPopularityLabel } from '../../../utils/getPopularityLabel';
import { getStrongGenreIdsFromCredits } from './getStrongGenreIdsFromCredits';

type TalentMatchTone = 'success' | 'indigo' | 'amber';

export type PopularTalentRow = {
  id: number;
  actor: string;
  popularity: string;
  strongGenres: string;
  affinityPercentage: number;
  tone: TalentMatchTone;
};

function getToneByAffinity(affinityPercentage: number): TalentMatchTone {
  if (affinityPercentage >= 75) {
    return 'success';
  }

  if (affinityPercentage >= 60) {
    return 'indigo';
  }

  return 'amber';
}

export function mapPopularPersonToTalentRow(
  person: TmdbPerson,
  credits: TmdbPersonMovieCredit[],
  brandProfile: BrandProfile,
): PopularTalentRow {
  const strongGenreIds = getStrongGenreIdsFromCredits(credits);
  const affinityScore = calculateAffinityScore(strongGenreIds, brandProfile);
  const affinityPercentage = getAffinityPercentage(affinityScore);

  return {
    id: person.id,
    actor: person.name,
    popularity: getPopularityLabel(person.popularity),
    strongGenres: getGenreNames(strongGenreIds).join(' / '),
    affinityPercentage,
    tone: getToneByAffinity(affinityPercentage),
  };
}
