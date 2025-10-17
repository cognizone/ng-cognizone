import { Result, ResultError } from '../models';

/**
 * Type guard that checks if a Result is in an error state.
 *
 * @template E - The type of the error value
 * @param result - The Result to check
 * @returns True if the result is an error, false otherwise
 *
 * @example
 * const result = error('failure');
 * if (isError(result)) {
 *   console.log(result.error); // TypeScript knows this is safe
 * }
 */
export function isError<E>(result: Result<unknown, E>): result is ResultError<E> {
  return result.type === 'error';
}

/**
 * Curried version of isError that returns a predicate function.
 * Useful for functional programming patterns like RxJS operators.
 *
 * @template E - The type of the error value
 * @returns A function that checks if a result is an error
 *
 * @example
 * // RxJS usage
 * results$.pipe(
 *   filter(isErrorP()),
 *   map(result => result.error)
 * ).subscribe(errors => console.log(errors));
 */
export function isErrorP<E>(): (result: Result<unknown, E>) => boolean {
  return result => isError(result);
}
