import { Mapper, Result } from '../models';
import { isOk } from './is-ok';
import { ok } from './ok';

/**
 * Transforms the success value of a Result if it's in an ok state, leaving error results unchanged.
 * This is the primary way to transform successful results while preserving error handling.
 *
 * @template T1 - The type of the original success value
 * @template T2 - The type of the transformed success value
 * @template E - The type of the error value
 * @param result - The Result to map
 * @param mapper - A function that transforms the success value
 * @returns A new result with transformed content if ok, otherwise the original error
 *
 * @example
 * const result = ok(5);
 * const doubled = mapOk(result, x => x * 2);
 * // doubled is ok(10)
 */
export function mapOk<T1, T2, E>(result: Result<T1, E>, mapper: Mapper<T1, T2>): Result<T2, E> {
  return isOk(result) ? ok(mapper(result.content)) : result;
}

/**
 * Curried version of mapOk that returns a function for use in pipelines.
 *
 * @template T1 - The type of the original success value
 * @template T2 - The type of the transformed success value
 * @template E - The type of the error value
 * @param mapper - A function that transforms the success value
 * @returns A function that maps success values in a result
 *
 * @example
 * // RxJS usage
 * userApi$.pipe(
 *   map(mapOkP((user: User) => user.displayName)),
 *   map(unwrapP('Anonymous')) // Default value if result is error
 * ).subscribe(name => console.log(name));
 */
export function mapOkP<T1, T2, E>(mapper: Mapper<T1, T2>): (result: Result<T1, E>) => Result<T2, E> {
  return result => mapOk(result, mapper);
}
