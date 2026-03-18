import type { PopularTalentRow } from './mapPopularPersonToTalentRow';

export function getTopTalentMatch(rows: PopularTalentRow[]) {
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
