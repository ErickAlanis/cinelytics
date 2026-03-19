import { describe, expect, it } from 'vitest';
import { getAffinityBreakdownByGenre } from '../../features/brand/lib/getAffinityBreakdownByGenre';
import type { BrandProfile } from '../../types/brand';
import type { MovieItem } from '../../types/content';

const brandProfile: BrandProfile = {
  id: 'tesla',
  name: 'Tesla',
  primaryGenre: 878,
  secondaryGenres: [12, 28],
};

const movies: MovieItem[] = [
  { id: 1, title: 'A', genreIds: [878, 28], popularity: 10 },
  { id: 2, title: 'B', genreIds: [12], popularity: 10 },
  { id: 3, title: 'C', genreIds: [18], popularity: 10 },
];

describe('getAffinityBreakdownByGenre', () => {
  it('returns contribution items sorted by contribution', () => {
    const result = getAffinityBreakdownByGenre(movies, brandProfile);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].contribution).toBeGreaterThanOrEqual(result[1]?.contribution ?? 0);
  });

  it('marks genres that belong to the brand profile', () => {
    const result = getAffinityBreakdownByGenre(movies, brandProfile);
    expect(result.some((item) => item.isBrandGenre)).toBe(true);
  });
});
