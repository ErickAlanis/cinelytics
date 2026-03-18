import type { MovieItem } from '../../types/content';
import type { TmdbMovie } from '../../types/tmdb';

export function mapTmdbMovieToMovieItem(movie: TmdbMovie): MovieItem {
  return {
    id: movie.id,
    title: movie.title,
    genreIds: movie.genre_ids,
    popularity: movie.popularity,
    releaseDate: movie.release_date,
  };
}
