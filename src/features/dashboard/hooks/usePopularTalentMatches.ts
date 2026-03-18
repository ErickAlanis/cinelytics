import { useEffect, useState } from 'react';
import {
  getPopularPeople,
  getPersonMovieCredits,
} from '../../../services/personService';
import type { BrandProfile } from '../../../types/brand';
import {
  mapPopularPersonToTalentRow,
  type PopularTalentRow,
} from '../lib/mapPopularPersonToTalentRow';

type UsePopularTalentMatchesResult = {
  rows: PopularTalentRow[];
  isLoading: boolean;
  errorMessage: string | null;
};

export function usePopularTalentMatches(
  activeBrandProfile: BrandProfile,
): UsePopularTalentMatchesResult {
  const [rows, setRows] = useState<PopularTalentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPopularTalentMatches() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const people = await getPopularPeople(controller.signal);
        const selectedPeople = people.slice(0, 6);

        const rowResults = await Promise.all(
          selectedPeople.map(async (person) => {
            const creditsResponse = await getPersonMovieCredits(
              person.id,
              controller.signal,
            );

            return mapPopularPersonToTalentRow(
              person,
              creditsResponse.cast ?? [],
              activeBrandProfile,
            );
          }),
        );

        const sortedRows = rowResults
          .sort((a, b) => b.affinityPercentage - a.affinityPercentage)
          .slice(0, 4);

        setRows(sortedRows);
      } catch {
        if (!controller.signal.aborted) {
          setErrorMessage('No se pudo cargar el talento compatible.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadPopularTalentMatches();

    return () => controller.abort();
  }, [activeBrandProfile]);

  return {
    rows,
    isLoading,
    errorMessage,
  };
}
