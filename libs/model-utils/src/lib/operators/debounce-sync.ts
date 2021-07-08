import { asapScheduler, MonoTypeOperatorFunction } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * rxjs operator to be used for debouncing the source in a synchronous way
 */
export function debounceSync<T>(): MonoTypeOperatorFunction<T> {
  return source$ => source$.lift(debounceTime(0, asapScheduler));
}
