export function getDonutStrokeOffset(
  percentage: number,
  circumference = 502,
): number {
  const progress = Math.max(0, Math.min(percentage, 100));
  return circumference - (progress / 100) * circumference;
}
