export function getAnniversaryInsight(affinityPercentage: number): string {
  if (affinityPercentage >= 80) {
    return 'Puede aprovecharse como referencia cultural por su alta compatibilidad con la marca.';
  }

  if (affinityPercentage >= 40) {
    return 'Tiene señales parciales de compatibilidad y puede inspirar una activación temática.';
  }

  return 'Su conexión con la marca es limitada, pero puede servir como referencia cultural contextual.';
}
