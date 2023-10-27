import { firstValueFrom, isObservable } from 'rxjs';

import { Completable } from '../models';

/**
 * @deprecated use {@link completableToPromise} instead
 */
export const awaitForCompletable = completableToPromise;

/**
 * Convert a {@link Completable} to a `Promise`
 *
 * @param resource The `Completable` to be transformed into a `Promise`. For
 * ease of use, if it is an `Observable`, it is piped with `first()`
 * @returns resource as a `Promise`
 */
export async function completableToPromise<T>(resource: Completable<T>): Promise<T> {
  if (isObservable(resource)) {
    return firstValueFrom(resource);
  }

  return resource;
}
