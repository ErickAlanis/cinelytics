import { tmdbGet } from './tmdbClient'
import type {
  TmdbPaginatedResponse,
  TmdbPerson,
  TmdbPersonMovieCreditsResponse,
} from '../types/tmdb'

export async function searchPeople(
  query: string,
  signal?: AbortSignal,
): Promise<TmdbPerson[]> {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return []
  }

  const response = await tmdbGet<TmdbPaginatedResponse<TmdbPerson>>(
    '/search/person',
    {
      query: {
        query: trimmedQuery,
      },
      signal,
    },
  )

  return response.results
}

export async function getPersonMovieCredits(
  personId: number,
  signal?: AbortSignal,
): Promise<TmdbPersonMovieCreditsResponse> {
  return tmdbGet<TmdbPersonMovieCreditsResponse>(
    `/person/${personId}/movie_credits`,
    { signal },
  )
}

export async function getPopularPeople(
  signal?: AbortSignal,
): Promise<TmdbPerson[]> {
  const response = await tmdbGet<TmdbPaginatedResponse<TmdbPerson>>(
    '/person/popular',
    { signal },
  )

  return response.results
}
