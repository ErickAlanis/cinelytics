export function getPopularityLabel(
  popularity: number,
): 'Alta' | 'Media' | 'Baja' {
  if (popularity >= 85) {
    return 'Alta';
  }

  if (popularity >= 70) {
    return 'Media';
  }

  return 'Baja';
}
