import { Observable } from 'rxjs';

/**
 * The `Completable` type represents a resource that should "complete" in the
 * Observable sense. A `Completable` is either directly the generic type given,
 * a `Promise` that returns that type or an `Observable` that does the same.
 */
export type Completable<T> = Observable<T> | Promise<T> | T;
