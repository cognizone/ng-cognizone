export function insertIf<T>(predicate: boolean | (() => boolean) | undefined | null, ...values: T[]): T[] {
  if (typeof predicate === 'function') predicate = predicate();
  return predicate ? values : [];
}
