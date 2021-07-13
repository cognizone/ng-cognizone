import { from, isObservable, Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

/**
 *  The `Completable` type represents a resource that should "complete" in the
 *  Observable sense. A `Completable` is either directly the generic type given, a `Promise` that returns that type or an
 *  `Observable` that does the same.
 */
export type Completable<T> = T | Promise<T> | Observable<T>;

/**
 * This is deprecated, use {@link completableToPromise} instead
 * @deprecated use `completableToPromise` instead
 */
export const awaitForCompletable = completableToPromise;

/**
 * Convert a {@link Completable} to a `Promise`
 * @param resource The `Completable` to be transformed into a `Promise`. For ease of use, if it is an `Observable`, it is piped with `first()`
 * @returns resource as a `Promise`
 */
export async function completableToPromise<T>(resource: Completable<T>): Promise<T> {
  if (isObservable(resource)) {
    return resource.pipe(first()).toPromise();
  }

  return resource;
}

/**
 * Convert a {@link Completable} to an `Observable`
 * @param resource The `Completable` to be transformed into an `Observable`.
 * @returns resource as an `Observable`
 */
export function completableToObservable<T>(resource: Completable<T>): Observable<T> {
  if (isObservable(resource)) {
    return resource;
  } else if (resource instanceof Promise) {
    return from(resource);
  }
  return of(resource);
}
