/**
 * A shorthand to specify if it's either the given type or an array of it
 */
export type Many<T> = T | T[];

/**
 * Convert a `Many` to an array. Beware that it is nullish-safe, so you could end up with `[undefined]`.
 */
export function manyToArray<T>(x: Many<T>): T[] {
  return Array.isArray(x) ? x : [x];
}

/**
 * Convert a `Many` to its base type, taking the 0th element of the array if applicable.
 */
export function manyToOne<T>(x: Many<T>): T {
  return Array.isArray(x) ? x[0] : x;
}
