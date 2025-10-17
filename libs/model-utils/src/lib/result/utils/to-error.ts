import { Result, ResultError } from '../models';
import { error } from './error';
import { isError } from './is-error';

/**
 * Converts any Result to an error Result. If the input is already an error, it's returned unchanged.
 * If the input is ok, its content becomes the error value.
 *
 * @template T - The type of the success value
 * @template E - The type of the error value
 * @param result - The Result to convert
 * @returns An error Result containing either the original error or the ok content
 *
 * @example
 * const okResult = ok(42);
 * const errorResult = toError(okResult);
 * // errorResult is error(42)
 *
 * @example
 * const alreadyError = error('failed');
 * const stillError = toError(alreadyError);
 * // stillError is error('failed')
 */
export function toError<T, E>(result: Result<T, E>): ResultError<T | E> {
  return isError(result) ? result : error(result.content);
}
