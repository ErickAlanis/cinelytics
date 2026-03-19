import { describe, expect, it } from 'vitest';
import type { BrandProfile } from '../../types/brand';
import type { GenrePulseItem } from '../../features/dashboard/lib/getGenrePulse';
import { getGenrePulseInsight } from '../../features/dashboard/lib/getGenrePulseInsight';

const brandProfile: BrandProfile = {
  id: 'starbucks',
  name: 'Starbucks',
  primaryGenre: 18,
  secondaryGenres: [10751, 35],
};

describe('getGenrePulseInsight', () => {
  it('returns fallback text when there is no pulse data', () => {
    expect(getGenrePulseInsight(brandProfile, [])).toContain(
      'No encontramos suficiente señal cultural actual',
    );
  });

  it('mentions the top genre and relevant brand genres when available', () => {
    const pulse: GenrePulseItem[] = [
      {
        genreId: 18,
        label: 'Drama',
        percentage: 24,
        count: 12,
        isTopGenre: true,
        isBrandGenre: true,
      },
      {
        genreId: 35,
        label: 'Comedy',
        percentage: 14,
        count: 7,
        isTopGenre: false,
        isBrandGenre: true,
      },
      {
        genreId: 53,
        label: 'Thriller',
        percentage: 11,
        count: 5,
        isTopGenre: false,
        isBrandGenre: false,
      },
    ];

    const result = getGenrePulseInsight(brandProfile, pulse);

    expect(result).toContain('Drama domina el momento cultural actual');
    expect(result.toLowerCase()).toContain('drama y comedy');
    expect(result).toContain('Starbucks');
  });

  it('mentions lack of strong brand match when no brand genres are present', () => {
    const pulse: GenrePulseItem[] = [
      {
        genreId: 53,
        label: 'Thriller',
        percentage: 20,
        count: 10,
        isTopGenre: true,
        isBrandGenre: false,
      },
      {
        genreId: 878,
        label: 'Science Fiction',
        percentage: 18,
        count: 9,
        isTopGenre: false,
        isBrandGenre: false,
      },
    ];

    const result = getGenrePulseInsight(brandProfile, pulse);

    expect(result).toContain('Thriller domina el momento cultural actual');
    expect(result).toContain('no detectamos una coincidencia fuerte');
  });
});
