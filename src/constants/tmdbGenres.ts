import type { GenreId } from '../types/brand'

// Generos base mas usados de series y peliculas de TMDB
export const tmdbMovieGenreMap: Record<GenreId, string> = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  53: 'Thriller',
  878: 'Science Fiction',
  10751: 'Family',
}
