import { Many } from '../models';

/**
 * Convert a {@link Many} to an array. It gives an empty array if the given value is nullish.
 */
export function manyToArray<T>(x: Many<T>): T[] {
  return x == null ? [] : Array.isArray(x) ? x : [x];
}
