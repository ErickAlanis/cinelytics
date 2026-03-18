import type { PopularTalentRow } from './mapPopularPersonToTalentRow';

type TopTalentMatch = {
  actor: string;
  affinityLabel: string;
};

export function getTopTalentMatch(rows: PopularTalentRow[]): TopTalentMatch {
  if (rows.length === 0) {
    return {
      actor: 'N/A',
      affinityLabel: 'Sin datos',
    };
  }

  const topRow = rows[0];

  return {
    actor: topRow.actor,
    affinityLabel: `${topRow.affinityPercentage}% Afinidad`,
  };
}
