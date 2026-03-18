import { useEffect, useState } from 'react';
import { getPersonMovieCredits } from '../../../services/personService';
import type { TmdbPersonMovieCredit } from '../../../types/tmdb';

type UseActorMovieCreditsResult = {
  credits: TmdbPersonMovieCredit[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function useActorMovieCredits(
  personId: number | 0,
): UseActorMovieCreditsResult {
  const [credits, setCredits] = useState<TmdbPersonMovieCredit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) {
      setCredits([]);
      return;
    }

    const controller = new AbortController();

    async function loadCredits() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await getPersonMovieCredits(
          personId,
          controller.signal,
        );
        setCredits(response.cast ?? []);
      } catch {
        if (!controller.signal.aborted) {
          setErrorMessage('No se pudo cargar la filmografía del actor.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadCredits();

    return () => controller.abort();
  }, [personId]);

  return {
    credits,
    isLoading,
    errorMessage,
  };
}
