import { MonoTypeOperatorFunction, ReplaySubject } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * Like shareReplay, but propagates cancellation to the source.
 */
export function shareReplaySafe<T>(...args: ConstructorParameters<typeof ReplaySubject>): MonoTypeOperatorFunction<T> {
  const [bufferSize, ...rest] = args;
  return share({
    connector: () => new ReplaySubject(bufferSize ?? 1, ...rest),
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: true,
  });
}
