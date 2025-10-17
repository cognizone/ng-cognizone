import { Result } from '../models';

/**
 * Extracts the content from a Result if it's ok, otherwise returns a default value.
 * The default value is always evaluated. For lazy evaluation, see {@link lazyUnwrap}.
 *
 * @template T - The type of the success value
 * @param result - The Result to unwrap
 * @param defaultValue - The value to return if result is an error
 * @returns The content if result is ok, otherwise defaultValue
 *
 * @example
 * const result = error('failed');
 * const value = unwrap(result, 42);
 * // value is 42
 */
export function unwrap<T>(result: Result<T>, defaultValue: T): T {
  return result.type === 'ok' ? result.content : defaultValue;
}

/**
 * Curried version of unwrap that returns a function for use in pipelines.
 *
 * @template T - The type of the success value
 * @param defaultValue - The value to return if result is an error
 * @returns A function that unwraps a result with the default
 *
 * @example
 * // RxJS usage
 * userCount$.pipe(
 *   map(unwrapP(0))
 * ).subscribe(count => console.log(`Users: ${count}`));
 */
export function unwrapP<T>(defaultValue: T): (result: Result<T>) => T {
  return result => unwrap(result, defaultValue);
}
