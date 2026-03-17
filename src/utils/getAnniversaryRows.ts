import type { BrandProfile } from '../types/brand'
import type { AnniversaryItem } from '../types/content'
import { calculateAffinityScore } from './calculateAffinityScore'
import { getAffinityPercentage } from './getAffinityPercentage'
import { getGenreNameById } from './getGenreNameById'
import { isRelevantTitle } from './isRelevantTitle'

type AnniversaryRow = {
  id: number
  title: string
  years: number
  genreLabel: string
  affinityPercentage: number
  campaignIdea: string
}

export function getAnniversaryRows(
  anniversaries: AnniversaryItem[],
  brandProfile: BrandProfile,
  minRelevantScore = 1,
): AnniversaryRow[] {
  return anniversaries
    .map((item) => {
      const affinityScore = calculateAffinityScore(item.genreIds, brandProfile)

      return {
        id: item.id,
        title: item.title,
        years: item.years,
        genreLabel: item.genreIds.map(getGenreNameById).join(' / '),
        affinityScore,
        affinityPercentage: getAffinityPercentage(affinityScore),
        campaignIdea: item.campaignIdea,
      }
    })
    .filter((item) => isRelevantTitle(item.affinityScore, minRelevantScore))
    .sort((a, b) => b.affinityPercentage - a.affinityPercentage)
    .map(({ affinityScore, ...row }) => row)
}
