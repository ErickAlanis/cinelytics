import type { BrandProfile } from '../../../types/brand';
import { getGenreNameById } from '../../../utils/getGenreNameById';

export function getGenreTrendInsight(brandProfile: BrandProfile): string {
  const primaryGenre = getGenreNameById(brandProfile.primaryGenre);
  const secondaryGenres = brandProfile.secondaryGenres
    .map(getGenreNameById)
    .join(' y ');

  return `Para ${brandProfile.name}, ${primaryGenre.toLowerCase()} y ${secondaryGenres.toLowerCase()} concentran la mayor afinidad narrativa.`;
}
