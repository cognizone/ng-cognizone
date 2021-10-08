/**
 * A shorthand to specify if it's either the given type or an array of it
 */
export type Many<T> = T | T[];

/**
 * Convert a {@link Many} to an array. Beware that it is not checking for
 * nullish values, so you could end up with `[undefined]`.
 */
export function manyToArray<T>(x: Many<T>): T[] {
  return Array.isArray(x) ? x : [x];
}

/**
 * Convert a {@link Many} to its base type, taking the 0th element of the array,
 * if applicable.
 */
export function manyToOne<T>(x: Many<T>): T {
  return Array.isArray(x) ? x[0] : x;
}
