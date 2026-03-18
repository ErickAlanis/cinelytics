import { TMDB_IMAGE_BASE_URL } from '../constants/tmdb';

export function getTmdbImageUrl(
  filePath: string | null | undefined,
  size = 'w500',
): string | null {
  if (!filePath) {
    return null;
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${filePath}`;
}
