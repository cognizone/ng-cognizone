/**
 * Same as `Object.entries`, but strongly typed
 *
 * @deprecated Object.entries should be correctly typed starting typescript v4.8
 */
export function strictEntries<T extends Parameters<typeof Object.entries>[0]>(o: T): [keyof T, T[keyof T]][] {
  return Object.entries(o) as unknown as [keyof T, T[keyof T]][];
}
