export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
  }).format(date);
}
