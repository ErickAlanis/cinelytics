import { tmdbGet } from './tmdbClient';
import type { TmdbMovie, TmdbPaginatedResponse } from '../types/tmdb';

export async function getTrendingMovies(
  signal?: AbortSignal,
): Promise<TmdbMovie[]> {
  const response = await tmdbGet<TmdbPaginatedResponse<TmdbMovie>>(
    '/trending/movie/week',
    { signal },
  );

  return response.results;
}

export async function getUpcomingMovies(
  signal?: AbortSignal,
): Promise<TmdbMovie[]> {
  const response = await tmdbGet<TmdbPaginatedResponse<TmdbMovie>>(
    '/movie/upcoming',
    { signal },
  );

  return response.results;
}

export async function getMoviesReleasedOnDate(
  releaseDate: string,
  signal?: AbortSignal,
): Promise<TmdbMovie[]> {
  const response = await tmdbGet<TmdbPaginatedResponse<TmdbMovie>>(
    '/discover/movie',
    {
      query: {
        'primary_release_date.gte': releaseDate,
        'primary_release_date.lte': releaseDate,
        sort_by: 'popularity.desc',
        page: 1,
      },
      signal,
    },
  );

  return response.results;
}
