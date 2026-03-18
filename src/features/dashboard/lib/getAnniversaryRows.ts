import type { BrandProfile } from '../../../types/brand';
import type { AnniversaryItem } from '../../../types/content';
import { calculateAffinityScore } from '../../brand/lib/calculateAffinityScore';
import { getAffinityPercentage } from '../../brand/lib/getAffinityPercentage';
import { getAnniversaryCampaignIdea } from './getAnniversaryCampaignIdea';
import { getGenreNameById } from '../../../utils/getGenreNameById';
import { isRelevantTitle } from '../../brand/lib/isRelevantTitle';

type AnniversaryRow = {
  id: number;
  title: string;
  years: number;
  genreLabel: string;
  affinityPercentage: number;
  campaignIdea: string;
};

export function getAnniversaryRows(
  anniversaries: AnniversaryItem[],
  brandProfile: BrandProfile,
  minRelevantScore = 1,
): AnniversaryRow[] {
  return anniversaries
    .map((item) => {
      const affinityScore = calculateAffinityScore(item.genreIds, brandProfile);

      return {
        id: item.id,
        title: item.title,
        years: item.years,
        genreLabel: item.genreIds.map(getGenreNameById).join(' / '),
        affinityScore,
        affinityPercentage: getAffinityPercentage(affinityScore),
        campaignIdea: getAnniversaryCampaignIdea(item.title, brandProfile),
      };
    })
    .filter((item) => isRelevantTitle(item.affinityScore, minRelevantScore))
    .sort((a, b) => b.affinityPercentage - a.affinityPercentage)
    // .map(({ affinityScore, ...row }) => row);
}
