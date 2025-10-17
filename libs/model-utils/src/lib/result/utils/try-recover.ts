import { Result } from '../models';
import { isError } from './is-error';

/**
 * Attempts to recover from an error by applying a recovery function that may succeed or fail.
 * If the result is already ok, it's returned unchanged. This is similar to a flatMap for errors.
 *
 * @template T - The type of the success value
 * @template E1 - The type of the original error value
 * @template E2 - The type of the new error value after recovery attempt
 * @param result - The Result to potentially recover from
 * @param recover - A function that attempts to recover from the error
 * @returns The original ok result, or the result of the recovery attempt
 *
 * @example
 * const result = error(404);
 * const recovered = tryRecover(result, (code) =>
 *   code === 404 ? ok('default') : error(`Unrecoverable: ${code}`)
 * );
 */
export function tryRecover<T, E1, E2>(result: Result<T, E1>, recover: (err: E1) => Result<T, E2>): Result<T, E2> {
  return isError(result) ? recover(result.error) : result;
}

/**
 * Curried version of tryRecover that returns a function for use in pipelines.
 *
 * @template T - The type of the success value
 * @template E1 - The type of the original error value
 * @template E2 - The type of the new error value after recovery attempt
 * @param recover - A function that attempts to recover from the error
 * @returns A function that attempts to recover from errors
 *
 * @example
 * // RxJS usage
 * apiCall$.pipe(
 *   map(tryRecoverP((err: ApiError) =>
 *     err.status === 404 ? ok(cachedData) : error(err)
 *   ))
 * ).subscribe();
 */
export function tryRecoverP<T, E1, E2>(recover: (err: E1) => Result<T, E2>): (result: Result<T, E1>) => Result<T, E2> {
  return result => tryRecover(result, recover);
}
