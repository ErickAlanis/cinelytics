import type { BrandProfile } from '../types/brand';
import type { AffinityBreakdownItem } from './getAffinityBreakdownByGenre';

export function getAffinityMixInsight(
  brandProfile: BrandProfile,
  breakdown: AffinityBreakdownItem[],
): string {
  if (breakdown.length === 0) {
    return `No encontramos suficiente señal de afinidad para ${brandProfile.name} en las tendencias actuales.`;
  }

  const topGenres = breakdown
    .slice(0, 2)
    .map((item) => item.label.toLowerCase())
    .join(' y ');

  return `La afinidad de ${brandProfile.name} está impulsada principalmente por ${topGenres}, que concentran la mayor contribución dentro de las tendencias actuales.`;
}
