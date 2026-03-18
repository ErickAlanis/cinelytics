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
