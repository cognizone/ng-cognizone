import { ResultOk } from '../models';

/**
 * Creates a Result representing a successful state with a value.
 *
 * @template T - The type of the success value
 * @param content - The success value to wrap
 * @returns A Result object with type 'ok'
 *
 * @example
 * const result = ok(42);
 * // { type: 'ok', content: 42 }
 */
export function ok<T>(content: T): ResultOk<T> {
  return { type: 'ok', content };
}
