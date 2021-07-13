/**
 * Same as `Object.entries`, but strongly typed
 */
export function strictEntries<T>(o: T): [keyof T, T[keyof T]][] {
  return (Object.entries(o) as unknown) as [keyof T, T[keyof T]][];
}
