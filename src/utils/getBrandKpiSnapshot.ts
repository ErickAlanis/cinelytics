import type { BrandId } from '../types/brand';

type BrandKpiSnapshot = {
  brandFitScore: number;
  dominantGenreShare: string;
  highFitTitles: number;
  topActorMatch: string;
  topActorAffinity: string;
  fitDeltaLabel: string;
};

const brandKpiSnapshots: Record<BrandId, BrandKpiSnapshot> = {
  redbull: {
    brandFitScore: 79,
    dominantGenreShare: '29% Share global',
    highFitTitles: 16,
    topActorMatch: 'Chris Hemsworth',
    topActorAffinity: '74% Afinidad',
    fitDeltaLabel: '+4% vs mes anterior',
  },
  tesla: {
    brandFitScore: 84,
    dominantGenreShare: '27% Share global',
    highFitTitles: 15,
    topActorMatch: 'Zendaya',
    topActorAffinity: '78% Afinidad',
    fitDeltaLabel: '+7% vs mes anterior',
  },
  starbucks: {
    brandFitScore: 82,
    dominantGenreShare: '31% Share global',
    highFitTitles: 14,
    topActorMatch: 'Ryan Gosling',
    topActorAffinity: '76% Afinidad',
    fitDeltaLabel: '+6% vs mes anterior',
  },
  nike: {
    brandFitScore: 80,
    dominantGenreShare: '30% Share global',
    highFitTitles: 18,
    topActorMatch: 'Michael B. Jordan',
    topActorAffinity: '79% Afinidad',
    fitDeltaLabel: '+5% vs mes anterior',
  },
  lego: {
    brandFitScore: 77,
    dominantGenreShare: '25% Share global',
    highFitTitles: 12,
    topActorMatch: 'Emma Stone',
    topActorAffinity: '72% Afinidad',
    fitDeltaLabel: '+3% vs mes anterior',
  },
};

export function getBrandKpiSnapshot(brandId: BrandId): BrandKpiSnapshot {
  return brandKpiSnapshots[brandId];
}
