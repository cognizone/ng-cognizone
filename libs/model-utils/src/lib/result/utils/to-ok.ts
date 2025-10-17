import { Result, ResultOk } from '../models';
import { isError } from './is-error';
import { ok } from './ok';

/**
 * Converts any Result to an ok Result. If the input is already ok, it's returned unchanged.
 * If the input is an error, its error value becomes the ok content.
 *
 * @template T - The type of the success value
 * @template E - The type of the error value
 * @param result - The Result to convert
 * @returns An ok Result containing either the original content or the error value
 *
 * @example
 * const errorResult = error('failed');
 * const okResult = toOk(errorResult);
 * // okResult is ok('failed')
 *
 * @example
 * const alreadyOk = ok(42);
 * const stillOk = toOk(alreadyOk);
 * // stillOk is ok(42)
 */
export function toOk<T, E>(result: Result<T, E>): ResultOk<T | E> {
  return isError(result) ? ok(result.error) : result;
}
