import { describe, expect, it } from 'vitest';
import { getTopTalentMatch } from '../../features/dashboard/lib/getTopTalentMatch';

describe('getTopTalentMatch', () => {
  it('returns fallback values for empty rows', () => {
    expect(getTopTalentMatch([])).toEqual({
      actor: 'N/A',
      affinityLabel: 'Sin datos',
    });
  });

  it('returns the first row as top match', () => {
    const result = getTopTalentMatch([
      {
        id: 1,
        actor: 'Actor A',
        popularity: 'Alta',
        strongGenres: 'Drama',
        affinityPercentage: 80,
        tone: 'success',
      },
    ]);

    expect(result).toEqual({
      actor: 'Actor A',
      affinityLabel: '80% Afinidad',
    });
  });
});
