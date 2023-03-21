import { OperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * rxjs operator to be used for defaulting to a given value if the stream passes
 * a nullish value. For example:
 * ```typescript
 * from(['a', undefined, 'c']).pipe(orElse('b')).subscribe(console.log) // logs 'a', 'b', 'c'.
 * ```
 */
export function orElse<T, R extends Exclude<T, null | undefined>>(value: R): OperatorFunction<T, R> {
  return pipe(map(x => (x as unknown as R) ?? value));
}
