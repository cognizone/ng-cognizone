export function isCurie(value: string): boolean {
  return !value.includes('://') && !value.startsWith('/');
}
