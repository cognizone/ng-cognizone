import { Many } from '../models';

/**
 * Convert a {@link Many} to its base type, taking the 0th element of the array,
 * if applicable.
 */
export function manyToOne<T>(x: Many<T>): T {
  return Array.isArray(x) ? x[0] : x;
}
