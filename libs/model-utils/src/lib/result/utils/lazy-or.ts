import { Result } from '../models';
import { isOk } from './is-ok';

/**
 * Returns the result if it's ok, otherwise lazily evaluates and returns an alternative result.
 * The alternative is only computed if needed, making this more efficient than {@link or} when
 * the fallback value is expensive to compute.
 *
 * @template T - The type of the success value
 * @param result - The Result to check
 * @param orValue - A function that produces the fallback result (only called if needed)
 * @returns The original result if ok, otherwise the result from orValue
 *
 * @example
 * const result = error('failed');
 * const fallback = lazyOr(result, () => ok('default'));
 * // fallback is ok('default')
 */
export function lazyOr<T>(result: Result<T>, orValue: () => Result<T>): Result<T> {
  return isOk(result) ? result : orValue();
}

/**
 * Curried version of lazyOr that returns a function for use in pipelines.
 *
 * @template T - The type of the success value
 * @param orValue - A function that produces the fallback result
 * @returns A function that applies lazyOr to a result
 *
 * @example
 * // RxJS usage
 * apiCall$.pipe(
 *   map(lazyOrP(() => ok(fallbackData))),
 *   map(result => result.content)
 * ).subscribe();
 */
export function lazyOrP<T>(orValue: () => Result<T>): (result: Result<T>) => Result<T> {
  return result => lazyOr(result, orValue);
}
