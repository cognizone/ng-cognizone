import { Result } from '../models';
import { isOk } from './is-ok';

/**
 * Returns the result if it's ok, otherwise returns an alternative result.
 * The alternative is always evaluated. For lazy evaluation, see {@link lazyOr}.
 *
 * @template T - The type of the success value
 * @param result - The Result to check
 * @param orValue - The fallback result to use if the first is an error
 * @returns The original result if ok, otherwise orValue
 *
 * @example
 * const result = error('failed');
 * const fallback = or(result, ok('default'));
 * // fallback is ok('default')
 */
export function or<T>(result: Result<T>, orValue: Result<T>): Result<T> {
  return isOk(result) ? result : orValue;
}

/**
 * Curried version of or that returns a function for use in pipelines.
 *
 * @template T - The type of the success value
 * @param orValue - The fallback result to use if the input is an error
 * @returns A function that applies or to a result
 *
 * @example
 * // RxJS usage
 * apiCall$.pipe(
 *   map(orP(ok(defaultValue))),
 *   map(result => result.content)
 * ).subscribe();
 */
export function orP<T>(orValue: Result<T>): (result: Result<T>) => Result<T> {
  return result => or(result, orValue);
}
