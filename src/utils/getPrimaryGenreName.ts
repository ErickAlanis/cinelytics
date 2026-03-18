import type { BrandProfile } from '../types/brand';
import { getGenreNameById } from './getGenreNameById';

export function getPrimaryGenreName(brandProfile: BrandProfile): string {
  return getGenreNameById(brandProfile.primaryGenre);
}
