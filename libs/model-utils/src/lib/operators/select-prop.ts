import { OperatorFunction, pipe } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * Simply take the key property of the object going through the stream, and
 * applying a `distinctUntilChanged` right after. This is mostly used for
 * selecting parts of a reactive state (like we mostly do with ngxs).
 *
 * @experimental does not seem to work nicely for now
 * @hidden
 */
export function selectProp<T, K extends keyof T>(key: K): OperatorFunction<T, T[K]> {
  return pipe(
    map(x => x[key]),
    distinctUntilChanged()
  );
}
