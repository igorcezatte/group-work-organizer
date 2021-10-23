export function parseDate(aDate: number | string) {
  const date = new Date(aDate);
  const valueOf = date.valueOf();
  return {
    inputFormat: date.toISOString().split('T')[0],
    valueOf,
    date,
  };
}
