import { describe, expect, it } from 'vitest';
import { getGenrePulse } from '../../features/dashboard/lib/getGenrePulse';
import type { BrandProfile } from '../../types/brand';
import type { MovieItem } from '../../types/content';

const brandProfile: BrandProfile = {
  id: 'starbucks',
  name: 'Starbucks',
  primaryGenre: 18,
  secondaryGenres: [10751, 35],
};

const movies: MovieItem[] = [
  { id: 1, title: 'A', genreIds: [18, 35], popularity: 10 },
  { id: 2, title: 'B', genreIds: [18], popularity: 10 },
  { id: 3, title: 'C', genreIds: [28], popularity: 10 },
];

describe('getGenrePulse', () => {
  it('returns sorted genre pulse items', () => {
    const result = getGenrePulse(movies, brandProfile);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].label).toBe('Drama');
  });

  it('marks brand genres correctly', () => {
    const result = getGenrePulse(movies, brandProfile);
    const drama = result.find((item) => item.label === 'Drama');

    expect(drama?.isBrandGenre).toBe(true);
  });
});
