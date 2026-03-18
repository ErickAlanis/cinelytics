import type { BrandProfile } from '../../../types/brand';
import { getGenreNameById } from '../../../utils/getGenreNameById';

export function getUpcomingMovieInsight(
  title: string,
  brandProfile: BrandProfile,
): string {
  const primaryGenre = getGenreNameById(brandProfile.primaryGenre);

  return `${title} conecta con ${brandProfile.name} por su afinidad con ${primaryGenre.toLowerCase()} y su potencial creativo para campaña.`;
}
