import { describe, expect, it } from 'vitest';
import { isRelevantTitle } from '../../features/brand/lib/isRelevantTitle';

describe('isRelevantTitle', () => {
  it('returns true when score is equal to minRelevantScore', () => {
    expect(isRelevantTitle(1, 1)).toBe(true);
  });

  it('returns false when score is below minRelevantScore', () => {
    expect(isRelevantTitle(0, 1)).toBe(false);
  });

  it('uses default minRelevantScore when omitted', () => {
    expect(isRelevantTitle(2)).toBe(true);
    expect(isRelevantTitle(1)).toBe(false);
  });
});
