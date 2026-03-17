import { tmdbGet } from './tmdbClient'
import type { TmdbPaginatedResponse, TmdbPerson } from '../types/tmdb'

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
