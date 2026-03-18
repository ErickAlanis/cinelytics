import type { BrandProfile } from '../../../types/brand';
import type { GenrePulseItem } from './getGenrePulse';

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

export function getGenrePulseInsight(
  brandProfile: BrandProfile,
  pulse: GenrePulseItem[],
): string {
  if (pulse.length === 0) {
    return `No encontramos suficiente señal cultural actual para ${brandProfile.name}.`;
  }

  const topGenre = pulse[0];

  const relevantGenres = pulse
    .filter((item) => item.isBrandGenre)
    .slice(0, 2)
    .map((item) => item.label.toLowerCase());

  if (relevantGenres.length === 0) {
    return `${topGenre.label} domina el momento cultural actual con ${topGenre.percentage}%, aunque no detectamos una coincidencia fuerte con el perfil narrativo de ${brandProfile.name}.`;
  }

  return `${topGenre.label} domina el momento cultural actual con ${topGenre.percentage}%, mientras que ${formatGenreList(
    relevantGenres,
  )} también muestran señales relevantes para ${brandProfile.name}.`;
}
