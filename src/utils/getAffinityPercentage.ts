export function getAffinityPercentage(score: number, maxScore = 5): number {
  return Math.round((score / maxScore) * 100)
}
