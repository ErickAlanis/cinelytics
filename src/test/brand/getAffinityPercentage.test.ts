import { describe, expect, it } from 'vitest';
import { getAffinityPercentage } from '../../features/brand/lib/getAffinityPercentage';

describe('getAffinityPercentage', () => {
  it('converts score to percentage', () => {
    expect(getAffinityPercentage(5)).toBe(100);
    expect(getAffinityPercentage(2.5)).toBe(50);
  });

  it('returns 0 for zero score', () => {
    expect(getAffinityPercentage(0)).toBe(0);
  });
});
