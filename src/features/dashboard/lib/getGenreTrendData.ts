import type { BrandProfile, GenreId } from '../../../types/brand';
import type { MovieItem } from '../../../types/content';
import { calculateAffinityScore } from '../../brand/lib/calculateAffinityScore';
import { getAffinityPercentage } from '../../brand/lib/getAffinityPercentage';
import { getGenreNameById } from '../../../utils/getGenreNameById';

type GenreTrendDatum = {
  genreId: GenreId;
  label: string;
  movieCount: number;
  totalAffinityScore: number;
  averageAffinityScore: number;
  affinityPercentage: number;
  isHighlighted: boolean;
};

export function getGenreTrendData(
  movies: MovieItem[],
  brandProfile: BrandProfile,
): GenreTrendDatum[] {
  const genreAccumulator = new Map<
    GenreId,
    { movieCount: number; totalAffinityScore: number }
  >();

  movies.forEach((movie) => {
    const movieAffinityScore = calculateAffinityScore(
      movie.genreIds,
      brandProfile,
    );

    movie.genreIds.forEach((genreId) => {
      const current = genreAccumulator.get(genreId) ?? {
        movieCount: 0,
        totalAffinityScore: 0,
      };

      genreAccumulator.set(genreId, {
        movieCount: current.movieCount + 1,
        totalAffinityScore: current.totalAffinityScore + movieAffinityScore,
      });
    });
  });

  return Array.from(genreAccumulator.entries())
    .map(([genreId, value]) => {
      const averageAffinityScore = value.totalAffinityScore / value.movieCount;
      const affinityPercentage = getAffinityPercentage(averageAffinityScore);

      return {
        genreId,
        label: getGenreNameById(genreId),
        movieCount: value.movieCount,
        totalAffinityScore: value.totalAffinityScore,
        averageAffinityScore,
        affinityPercentage,
        isHighlighted:
          genreId === brandProfile.primaryGenre ||
          brandProfile.secondaryGenres.includes(genreId),
      };
    })
    .sort((a, b) => b.affinityPercentage - a.affinityPercentage)
    .slice(0, 5);
}
