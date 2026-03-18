import { useEffect, useState } from 'react';
import { searchPeople } from '../../../services/personService';
import type { TmdbPerson } from '../../../types/tmdb';

type UseSearchActorsResult = {
  actors: TmdbPerson[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function useSearchActors(query: string): UseSearchActorsResult {
  const [actors, setActors] = useState<TmdbPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setActors([]);
      setIsLoading(false);
      setErrorMessage(null);
      return;
    }

    const controller = new AbortController();

    async function loadActors() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const results = await searchPeople(trimmedQuery, controller.signal);
        setActors(results.slice(0, 5));
      } catch {
        if (!controller.signal.aborted) {
          setErrorMessage('No se pudo buscar el actor.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadActors();

    return () => controller.abort();
  }, [query]);

  return {
    actors,
    isLoading,
    errorMessage,
  };
}
