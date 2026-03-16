import { tmdbMovieGenreMap } from '../constants/tmdbGenres'
import type { GenreId } from '../types/brand'

export function getGenreNameById(genreId: GenreId): string {
  return tmdbMovieGenreMap[genreId] ?? 'Unknown'
}
