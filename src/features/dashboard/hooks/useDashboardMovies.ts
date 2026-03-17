import { useMemo } from 'react'
import type { DashboardMoviesState } from '../types/dashboardData'
import { useTrendingMovies } from './useTrendingMovies'
import { useUpcomingMovies } from './useUpcomingMovies'

export function useDashboardMovies(): DashboardMoviesState {
  const {
    movies: trendingMovies,
    isLoading: isTrendingLoading,
    errorMessage: trendingErrorMessage,
  } = useTrendingMovies()

  const {
    movies: upcomingMovies,
    isLoading: isUpcomingLoading,
    errorMessage: upcomingErrorMessage,
  } = useUpcomingMovies()

  return useMemo(
    () => ({
      trendingMovies,
      upcomingMovies,
      isLoading: isTrendingLoading || isUpcomingLoading,
      errorMessage: trendingErrorMessage || upcomingErrorMessage,
    }),
    [
      trendingMovies,
      upcomingMovies,
      isTrendingLoading,
      isUpcomingLoading,
      trendingErrorMessage,
      upcomingErrorMessage,
    ],
  )
}
