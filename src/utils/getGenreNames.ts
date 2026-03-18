import type { GenreId } from '../types/brand';
import { getGenreNameById } from './getGenreNameById';

export function getGenreNames(genreIds: GenreId[]): string[] {
  return genreIds.map(getGenreNameById);
}
