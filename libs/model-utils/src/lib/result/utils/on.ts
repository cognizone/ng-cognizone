import { Result } from '../models';
import { isError } from './is-error';
import { isOk } from './is-ok';

/**
 * Executes side-effect callbacks based on the Result state without transforming the result.
 * Useful for logging, analytics, or other side effects that don't need to modify the result.
 *
 * @template T - The type of the success value
 * @template E - The type of the error value
 * @param result - The Result to react to
 * @param onResult - Object containing optional ok and error callbacks
 *
 * @example
 * on(result, {
 *   ok: (value) => console.log('Success:', value),
 *   error: (err) => console.error('Failed:', err)
 * });
 */
export function on<T, E>(result: Result<T, E>, onResult: OnResult<T, E>): void {
  if (isError(result) && onResult.error) {
    return onResult.error(result.error);
  }

  if (isOk(result) && onResult.ok) {
    return onResult.ok(result.content);
  }
}

/**
 * Curried version of on that returns a function for use in pipelines.
 *
 * @template T - The type of the success value
 * @template E - The type of the error value
 * @param onResult - Object containing optional ok and error callbacks
 * @returns A function that executes callbacks based on result state
 *
 * @example
 * // RxJS usage with subscribe
 * apiCall$.subscribe(onP({
 *     ok: (data) => logger.info('Success', data),
 *     error: (err) => logger.error('Failed', err)
 *   }));
 *
 * @example
 * // RxJS usage with tap
 * apiCall$.pipe(
 *   tap(onP({
 *     ok: (data) => logger.info('Success', data),
 *     error: (err) => logger.error('Failed', err)
 *   }))
 * ).subscribe();
 */
export function onP<T, E>(onResult: OnResult<T, E>): (result: Result<T, E>) => void {
  return result => on(result, onResult);
}

/**
 * Configuration object for {@link on} function callbacks.
 *
 * @template T - The type of the success value
 * @template E - The type of the error value
 */
export interface OnResult<T, E> {
  /** Callback executed when the result is ok */
  ok?: (content: T) => void;
  /** Callback executed when the result is an error */
  error?: (err: E) => void;
}
