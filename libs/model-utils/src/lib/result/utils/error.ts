import { ResultError } from '../models';

/**
 * Creates a Result representing an error state.
 *
 * @template T - The type of the error value
 * @param err - The error value to wrap
 * @returns A Result object with type 'error'
 *
 * @example
 * const result = error('Something went wrong');
 * // { type: 'error', error: 'Something went wrong' }
 */
export function error<T>(err: T): ResultError<T> {
  return { type: 'error', error: err };
}
