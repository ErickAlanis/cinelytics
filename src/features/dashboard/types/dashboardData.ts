import type { MovieItem } from '../../../types/content'

export type DashboardMoviesState = {
  trendingMovies: MovieItem[]
  upcomingMovies: MovieItem[]
  isLoading: boolean
  errorMessage: string | null
}
