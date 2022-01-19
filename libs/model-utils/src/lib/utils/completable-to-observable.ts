import { from, isObservable, Observable, of } from 'rxjs';

import { Completable } from '../models';

/**
 * Convert a {@link Completable} to an `Observable`
 *
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
