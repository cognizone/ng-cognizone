/**
 * Returns the given `Date` as a `string` in the YYYY-MM-dd format
 */
export function dateToDateString(value: Date): string {
  const year = value.getFullYear().toString().padStart(4, '0');
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = value.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
