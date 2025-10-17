import { Mapper, Result } from '../models';
import { isError } from './is-error';
import { error } from './error';

/**
 * Transforms the error value of a Result if it's in an error state, leaving ok results unchanged.
 * Useful for converting error types or adding context to error messages.
 *
 * @template T - The type of the success value
 * @template E1 - The type of the original error value
 * @template E2 - The type of the transformed error value
 * @param result - The Result to map
 * @param mapper - A function that transforms the error value
 * @returns The original result if ok, otherwise a new error result with transformed error
 *
 * @example
 * const result = error(404);
 * const mapped = mapError(result, code => `Error code: ${code}`);
 * // mapped is error('Error code: 404')
 */
export function mapError<T, E1, E2>(result: Result<T, E1>, mapper: Mapper<E1, E2>): Result<T, E2> {
  return isError(result) ? error(mapper(result.error)) : result;
}

/**
 * Curried version of mapError that returns a function for use in pipelines.
 *
 * @template T - The type of the success value
 * @template E1 - The type of the original error value
 * @template E2 - The type of the transformed error value
 * @param mapper - A function that transforms the error value
 * @returns A function that maps errors in a result
 *
 * @example
 * // RxJS usage
 * apiCall$.pipe(
 *   map(mapErrorP((err: HttpError) => `API Error: ${err.message}`))
 * ).subscribe();
 */
export function mapErrorP<T, E1, E2>(mapper: Mapper<E1, E2>): (result: Result<T, E1>) => Result<T, E2> {
  return result => mapError(result, mapper);
}
