import { describe, expect, it } from 'vitest';
import { getBrandFitScore } from '../../features/brand/lib/getBrandFitScore';
import type { BrandProfile } from '../../types/brand';
import type { MovieItem } from '../../types/content';

const brandProfile: BrandProfile = {
  id: 'starbucks',
  name: 'Starbucks',
  primaryGenre: 18,
  secondaryGenres: [10751, 35],
};

const movies: MovieItem[] = [
  { id: 1, title: 'A', genreIds: [18], popularity: 10 },
  { id: 2, title: 'B', genreIds: [35], popularity: 10 },
  { id: 3, title: 'C', genreIds: [28], popularity: 10 },
];

describe('getBrandFitScore', () => {
  it('returns a percentage derived from average affinity', () => {
    expect(getBrandFitScore(movies, brandProfile)).toBeGreaterThan(0);
  });

  it('returns 0 when there are no movies', () => {
    expect(getBrandFitScore([], brandProfile)).toBe(0);
  });
});
