import { EnvironmentProviders, inject, Injectable, makeEnvironmentProviders, Provider, Type } from '@angular/core';
import { ExpandedJsonLdContainer } from '@cognizone/json-ld-core';
import { AsyncResult, completableToObservable, loading, success } from '@cognizone/model-utils';
import { shareReplaySafe } from '@cognizone/ng-core';
import { Observable, of, startWith, switchMap } from 'rxjs';

import { FetchOptions } from '../models/fetch-options';
import { CacheGuard } from './cache-guard.service';
import { CacheService } from './cache.service';
import { Fetcher } from './fetcher.service';
import { Serializer } from './serializer.service';

@Injectable({ providedIn: 'root' })
export class FetchStore {
  private cache: CacheService | null = inject(CacheService, { optional: true });
  private fetcher: Fetcher<unknown> = inject(Fetcher);
  private serializer: Serializer<unknown> | null = inject(Serializer, { optional: true });
  private cacheGuard: CacheGuard<unknown> | null = inject(CacheGuard, { optional: true });
  private currentFetchMap: { [key: string]: Observable<AsyncResult<ExpandedJsonLdContainer>> } = {};

  get<T>(options: FetchOptions<T>): Observable<AsyncResult<ExpandedJsonLdContainer>> {
    const key = this.serializer?.toKey(options) ?? options.uri;
    if (this.currentFetchMap[key]) return this.currentFetchMap[key];

    return this.getFromCache(key).pipe(
      switchMap(cached => {
        if (cached) {
          return of(success(cached));
        }

        return (this.currentFetchMap[key] = this.fetcher.fetch(options).pipe(
          switchMap(async result => {
            if (result.type === 'success') {
              const canCache = this.cacheGuard ? this.cacheGuard.canCache(key, result.content, options) : true;
              if (this.cache && canCache) {
                await this.cache.set(key, result.content);
              }
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

  private getFromCache(key: string): Observable<ExpandedJsonLdContainer | undefined> {
    const cache = this.cache;
    if (!cache) {
      return of(undefined);
    }
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

export function provideFetchStore(options: JsonLdStoreProvisionOptions): EnvironmentProviders {
  const providers: Provider[] = [];
  if (options.fetcher) {
    providers.push({
      provide: Fetcher,
      useExisting: options.fetcher,
    });
  }
  if (options.cache) {
    providers.push({
      provide: CacheService,
      useExisting: options.cache,
    });
  }
  if (options.serializer) {
    providers.push({
      provide: Serializer,
      useExisting: options.serializer,
    });
  }
  return makeEnvironmentProviders(providers);
}

export interface JsonLdStoreProvisionOptions {
  fetcher?: Type<Fetcher<unknown>>;
  cache?: Type<CacheService>;
  serializer?: Type<Serializer<unknown>>;
}
