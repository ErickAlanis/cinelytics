import type { BrandProfile } from '../../../types/brand';
import type { ActorItem } from '../../../types/content';
import { calculateAffinityScore } from '../../brand/lib/calculateAffinityScore';
import { getAffinityPercentage } from '../../brand/lib/getAffinityPercentage';
import { getGenreNames } from '../../../utils/getGenreNames';
import { getPopularityLabel } from '../../../utils/getPopularityLabel';

type TalentMatchTone = 'success' | 'indigo' | 'amber';

export type TalentMatchRow = {
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

export function getTalentMatchRows(
  actors: ActorItem[],
  brandProfile: BrandProfile,
): TalentMatchRow[] {
  return actors
    .map((actor) => {
      const affinityScore = calculateAffinityScore(
        actor.strongGenreIds,
        brandProfile,
      );
      const affinityPercentage = getAffinityPercentage(affinityScore);

      return {
        id: actor.id,
        actor: actor.name,
        popularity: getPopularityLabel(actor.popularity),
        strongGenres: getGenreNames(actor.strongGenreIds).join(' / '),
        affinityPercentage,
        tone: getToneByAffinity(affinityPercentage),
      };
    })
    .sort((a, b) => b.affinityPercentage - a.affinityPercentage);
}
