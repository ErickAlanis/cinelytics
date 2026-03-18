import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../../services/movieService';
import type { MovieItem } from '../../../types/content';
import { mapTmdbMovieToMovieItem } from '../../../services/mappers/mapTmdbMovieToMovieItem';

type UseTrendingMoviesResult = {
  movies: MovieItem[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function useTrendingMovies(): UseTrendingMoviesResult {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTrendingMovies() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await getTrendingMovies(abortController.signal);
        const mappedMovies = response.map(mapTmdbMovieToMovieItem);

        setMovies(mappedMovies);
      } catch {
        if (abortController.signal.aborted) {
          return;
        }

        setErrorMessage('No se pudieron cargar las tendencias actuales.');
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadTrendingMovies();

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    movies,
    isLoading,
    errorMessage,
  };
}
