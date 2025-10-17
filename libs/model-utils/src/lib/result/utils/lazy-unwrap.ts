import { Result } from '../models';

/**
 * Extracts the content from a Result if it's ok, otherwise lazily computes and returns a default value.
 * The default value is only computed if needed, making this more efficient than {@link unwrap} when
 * the fallback value is expensive to compute.
 *
 * @template T - The type of the success value
 * @template E - The type of the error value
 * @param result - The Result to unwrap
 * @param defaultValue - A function that produces the default value (only called if needed)
 * @returns The content if result is ok, otherwise the result from defaultValue
 *
 * @example
 * const result = error('failed');
 * const value = lazyUnwrap(result, () => expensiveComputation());
 * // expensiveComputation() only runs because result is an error
 */
export function lazyUnwrap<T, E>(result: Result<T, E>, defaultValue: () => T): T {
  return result.type === 'ok' ? result.content : defaultValue();
}

/**
 * Curried version of lazyUnwrap that returns a function for use in pipelines.
 *
 * @template T - The type of the success value
 * @template E - The type of the error value
 * @param defaultValue - A function that produces the default value
 * @returns A function that unwraps a result with the default
 *
 * @example
 * // RxJS usage
 * apiCall$.pipe(
 *   map(lazyUnwrapP(() => computeDefaultValue()))
 * ).subscribe(value => console.log(value));
 */
export function lazyUnwrapP<T, E>(defaultValue: () => T): (result: Result<T, E>) => T {
  return result => lazyUnwrap(result, defaultValue);
}
