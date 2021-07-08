import { OperatorFunction, pipe } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * Simply take the key property of the obecjt going trhough the stream, and applyting a distinctUntilChanged right after.
 * This is mostly used for selecting parts of a reactive state. (Like we mostly do with ngxs)
 */
export function selectProp<T, K extends keyof T>(key: K): OperatorFunction<T, T[K]> {
  return pipe(
    map(x => x[key]),
    distinctUntilChanged()
  );
}
