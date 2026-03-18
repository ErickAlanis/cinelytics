import type { BrandProfile } from '../types/brand';
import { getBrandKpiSnapshot } from '../features/brand/lib/getBrandKpiSnapshot';
import { getGenreNameById } from './getGenreNameById';

type AffinityMixData = {
  brandFitScore: number;
  primaryGenreLabel: string;
  secondaryGenreLabels: string[];
  descriptorLabel: string;
  descriptorLevel: string;
};

export function getAffinityMixData(
  brandProfile: BrandProfile,
): AffinityMixData {
  const snapshot = getBrandKpiSnapshot(brandProfile.id);
  const primaryGenreLabel = getGenreNameById(brandProfile.primaryGenre);
  const secondaryGenreLabels =
    brandProfile.secondaryGenres.map(getGenreNameById);

  let descriptorLevel = 'Medium';

  if (snapshot.brandFitScore >= 80) {
    descriptorLevel = 'High';
  } else if (snapshot.brandFitScore < 65) {
    descriptorLevel = 'Low';
  }

  return {
    brandFitScore: snapshot.brandFitScore,
    primaryGenreLabel,
    secondaryGenreLabels,
    descriptorLabel: primaryGenreLabel,
    descriptorLevel,
  };
}
