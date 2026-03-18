import type { BrandProfile } from '../../../types/brand';
import type { AffinityBreakdownItem } from './getAffinityBreakdownByGenre';

function formatGenreList(genres: string[]): string {
  if (genres.length === 0) {
    return '';
  }

  if (genres.length === 1) {
    return genres[0];
  }

  if (genres.length === 2) {
    return `${genres[0]} y ${genres[1]}`;
  }

  return `${genres.slice(0, -1).join(', ')} y ${genres[genres.length - 1]}`;
}

export function getAffinityMixInsight(
  brandProfile: BrandProfile,
  breakdown: AffinityBreakdownItem[],
): string {
  if (breakdown.length === 0) {
    return `No encontramos suficiente señal de afinidad para ${brandProfile.name} en las tendencias actuales.`;
  }

  const prioritizedItems = breakdown
    .filter((item) => item.isBrandGenre)
    .sort((a, b) => b.contribution - a.contribution);

  const fallbackItems = breakdown
    .filter((item) => !item.isBrandGenre)
    .sort((a, b) => b.contribution - a.contribution);

  const selectedItems =
    prioritizedItems.length > 0
      ? prioritizedItems.slice(0, 2)
      : fallbackItems.slice(0, 2);

  const genresText = formatGenreList(
    selectedItems.map((item) => item.label.toLowerCase()),
  );

  return `La afinidad de ${brandProfile.name} está impulsada principalmente por ${genresText}, que concentran la mayor contribución dentro de las tendencias actuales.`;
}
