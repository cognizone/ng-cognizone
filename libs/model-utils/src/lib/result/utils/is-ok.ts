import { Result, ResultOk } from '../models';

/**
 * Type guard that checks if a Result is in a successful state.
 *
 * @template T - The type of the success value
 * @param result - The Result to check
 * @returns True if the result is ok, false otherwise
 *
 * @example
 * const result = ok(42);
 * if (isOk(result)) {
 *   console.log(result.content); // TypeScript knows this is safe
 * }
 */
export function isOk<T>(result: Result<T>): result is ResultOk<T> {
  return result.type === 'ok';
}

/**
 * Curried version of isOk that returns a predicate function.
 * Useful for functional programming patterns like RxJS operators.
 *
 * @template T - The type of the success value
 * @returns A function that checks if a result is ok
 *
 * @example
 * // RxJS usage
 * results$.pipe(
 *   filter(isOkP()),
 *   map(result => result.content)
 * ).subscribe(values => console.log(values));
 */
export function isOkP<T>(): (result: Result<T>) => boolean {
  return result => isOk(result);
}
