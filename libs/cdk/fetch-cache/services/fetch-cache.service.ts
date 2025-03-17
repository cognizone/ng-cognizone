import { inject, Injectable } from '@angular/core';
import { completableToObservable, Result, ok } from '@cognizone/model-utils';
import { shareReplaySafe } from '@cognizone/ng-core';
import { Observable, of, switchMap } from 'rxjs';

import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class FetchCache {
  private cache: CacheService = inject(CacheService);
  private currentFetchMap: { [key: string]: Observable<Result> } = {};

  get<T>(key: string, fetch: () => Observable<Result<T>>, options?: FetchCacheOptions): Observable<Result<T>> {
    if (this.currentFetchMap[key]) return this.currentFetchMap[key] as Observable<Result<T>>;
    const cache = (options?.cache ?? this.cache) as CacheService<T>;

    return this.getFromCache<T>(key, cache).pipe(
      switchMap(cached => {
        if (cached) {
          return of(ok(cached));
        }

        return (this.currentFetchMap[key] = fetch().pipe(
          switchMap(async result => {
            if (result.type === 'ok') {
              await cache.set(key, result.content);
            }
            delete this.currentFetchMap[key];
            return result;
          }),
          shareReplaySafe(1)
        ));
      })
    );
  }

  private getFromCache<T>(key: string, cache: CacheService<T>): Observable<T | undefined> {
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

export interface FetchCacheOptions {
  cache?: CacheService;
}
