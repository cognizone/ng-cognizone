export function insertIf<T>(predicate: boolean | (() => boolean) | null | undefined, ...values: T[]): T[] {
  if (typeof predicate === 'function') predicate = predicate();
  return predicate ? values : [];
}
