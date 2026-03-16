export type AffinityLevel =
  | 'very-high'
  | 'high'
  | 'medium'
  | 'low'
  | 'none'

export function getAffinityLevel(score: number): AffinityLevel {
  if (score >= 4) {
    return 'very-high'
  }

  if (score === 3) {
    return 'high'
  }

  if (score === 2) {
    return 'medium'
  }

  if (score === 1) {
    return 'low'
  }

  return 'none'
}
