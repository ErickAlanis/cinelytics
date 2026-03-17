import type { BrandProfile } from '../types/brand'
import { getGenreNames } from './getGenreNames'

export function getActorAffinityInsight(
  actorName: string,
  actorGenreIds: number[],
  brandProfile: BrandProfile,
): string {
  const strongGenres = getGenreNames(actorGenreIds)
  const topGenresLabel = strongGenres.slice(0, 2).join(' y ')

  return `${actorName} se alinea con ${brandProfile.name} porque su filmografía destaca en ${topGenresLabel.toLowerCase()}, lo que puede traducirse en campañas con una narrativa más cercana al perfil de la marca.`
}
