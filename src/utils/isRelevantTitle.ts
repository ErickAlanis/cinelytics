export function isRelevantTitle(score: number, minRelevantScore = 2): boolean {
  return score >= minRelevantScore
}
