import { describe, expect, it } from 'vitest';
import { calculateAffinityScore } from '../../features/brand/lib/calculateAffinityScore';
import type { BrandProfile } from '../../types/brand';

const brandProfile: BrandProfile = {
  id: 'nike',
  name: 'Nike',
  primaryGenre: 28,
  secondaryGenres: [18, 36],
};

describe('calculateAffinityScore', () => {
  it('returns 0 when there are no matching genres', () => {
    expect(calculateAffinityScore([878, 9648], brandProfile)).toBe(0);
  });

  it('adds 3 points for primary genre match', () => {
    expect(calculateAffinityScore([28], brandProfile)).toBe(3);
  });

  it('adds 1 point for each secondary genre match', () => {
    expect(calculateAffinityScore([18, 36], brandProfile)).toBe(2);
  });

  it('adds primary and secondary matches together', () => {
    expect(calculateAffinityScore([28, 18], brandProfile)).toBe(4);
  });

  it('returns max score when all genres match', () => {
    expect(calculateAffinityScore([28, 18, 36], brandProfile)).toBe(5);
  });
});
