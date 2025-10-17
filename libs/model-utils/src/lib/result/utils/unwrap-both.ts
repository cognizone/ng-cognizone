import { Result } from '../models';

/**
 * Extracts the value from a Result where both ok and error types are the same.
 * This is useful when you don't care about the success/failure distinction, only the value.
 *
 * @template T - The type of both the success and error values
 * @param result - The Result to unwrap
 * @returns The content if ok, otherwise the error value
 *
 * @example
 * const result1: Result<string, string> = ok('success');
 * const result2: Result<string, string> = error('failure');
 * unwrapBoth(result1); // 'success'
 * unwrapBoth(result2); // 'failure'
 */
export function unwrapBoth<T>(result: Result<T, T>): T {
  return result.type === 'ok' ? result.content : result.error;
}

/**
 * Curried version of unwrapBoth that returns a function for use in pipelines.
 *
 * @template T - The type of both the success and error values
 * @returns A function that unwraps a result with same ok/error types
 *
 * @example
 * // RxJS usage
 * messages$.pipe(
 *   map(unwrapBothP<string>())
 * ).subscribe(message => displayMessage(message));
 */
export function unwrapBothP<T>(): (result: Result<T, T>) => T {
  return result => unwrapBoth(result);
}
