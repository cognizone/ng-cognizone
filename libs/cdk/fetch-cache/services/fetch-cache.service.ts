import { inject, Injectable } from '@angular/core';
import { AsyncResult, completableToObservable, loading, success } from '@cognizone/model-utils';
import { shareReplaySafe } from '@cognizone/ng-core';
import { Observable, of, startWith, switchMap } from 'rxjs';

import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class FetchCache {
  private cache: CacheService = inject(CacheService);
  private currentFetchMap: { [key: string]: Observable<AsyncResult> } = {};

  get<T>(key: string, fetch: () => Observable<AsyncResult<T>>): Observable<AsyncResult<T>> {
    if (this.currentFetchMap[key]) return this.currentFetchMap[key] as Observable<AsyncResult<T>>;

    return this.getFromCache<T>(key).pipe(
      switchMap(cached => {
        if (cached) {
          return of(success(cached));
        }

        return (this.currentFetchMap[key] = fetch().pipe(
          switchMap(async result => {
            if (result.type === 'success') {
              await this.cache.set(key, result.content);
            }
            delete this.currentFetchMap[key];
            return result;
          }),
          startWith(loading()),
          shareReplaySafe(1)
        ));
      })
    );
  }

  private getFromCache<T>(key: string): Observable<T | undefined> {
    const cache = this.cache as CacheService<T>;
    return completableToObservable(cache.has(key)).pipe(
      switchMap(hasInCache => {
        if (hasInCache) {
          return completableToObservable(cache.get(key));
        }

        return of(undefined);
      })
    );
  }
}
