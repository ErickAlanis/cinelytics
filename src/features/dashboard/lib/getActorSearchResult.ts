import type { BrandProfile } from '../../../types/brand';
import type { ActorItem } from '../../../types/content';
import { calculateAffinityScore } from '../../brand/lib/calculateAffinityScore';
import { getActorAffinityInsight } from './getActorAffinityInsight';
import { getAffinityPercentage } from '../../brand/lib/getAffinityPercentage';
import { getGenreNames } from '../../../utils/getGenreNames';

type ActorSearchResult = {
  id: number;
  name: string;
  affinityPercentage: number;
  strongGenres: string[];
  insight: string;
};

export function getActorSearchResult(
  actor: ActorItem,
  brandProfile: BrandProfile,
): ActorSearchResult {
  const affinityScore = calculateAffinityScore(
    actor.strongGenreIds,
    brandProfile,
  );

  return {
    id: actor.id,
    name: actor.name,
    affinityPercentage: getAffinityPercentage(affinityScore),
    strongGenres: getGenreNames(actor.strongGenreIds),
    insight: getActorAffinityInsight(
      actor.name,
      actor.strongGenreIds,
      brandProfile,
    ),
  };
}
