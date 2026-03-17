import {
  TMDB_API_BASE_URL,
  TMDB_READ_ACCESS_TOKEN,
} from '../constants/tmdb'

type TmdbRequestOptions = {
  query?: Record<string, string | number | boolean | undefined>
  signal?: AbortSignal
}

function buildUrl(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): string {
  const normalizedBaseUrl = TMDB_API_BASE_URL.endsWith('/')
    ? TMDB_API_BASE_URL
    : `${TMDB_API_BASE_URL}/`

  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  const url = new URL(normalizedPath, normalizedBaseUrl)

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.toString()
}

export async function tmdbGet<T>(
  path: string,
  options: TmdbRequestOptions = {},
): Promise<T> {
  const response = await fetch(buildUrl(path, options.query), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      Accept: 'application/json',
    },
    signal: options.signal,
  })

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}
