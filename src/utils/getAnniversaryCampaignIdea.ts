import type { BrandProfile } from '../types/brand'
import { getGenreNameById } from './getGenreNameById'

export function getAnniversaryCampaignIdea(
  title: string,
  brandProfile: BrandProfile,
): string {
  const primaryGenre = getGenreNameById(brandProfile.primaryGenre).toLowerCase()

  return `${title} puede reinterpretarse para ${brandProfile.name} con una narrativa inspirada en ${primaryGenre}, conectando mejor con el perfil cultural de la marca.`
}
