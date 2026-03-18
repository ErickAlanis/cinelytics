import { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../../../services/movieService';
import type { MovieItem } from '../../../types/content';
import { mapTmdbMovieToMovieItem } from '../../../services/mappers/mapTmdbMovieToMovieItem';

type UseUpcomingMoviesResult = {
  movies: MovieItem[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function useUpcomingMovies(): UseUpcomingMoviesResult {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadUpcomingMovies() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await getUpcomingMovies(abortController.signal);
        const mappedMovies = response.map(mapTmdbMovieToMovieItem);

        setMovies(mappedMovies);
      } catch {
        if (abortController.signal.aborted) {
          return;
        }

        setErrorMessage('No se pudieron cargar los próximos estrenos.');
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadUpcomingMovies();

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
