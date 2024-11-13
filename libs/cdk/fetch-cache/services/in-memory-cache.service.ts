import { Injectable } from '@angular/core';

import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class InMemoryCache<T = unknown> implements CacheService<T> {
  #map: Map<string, T> = new Map();

  has(key: string): boolean {
    return this.#map.has(key);
  }

  get(key: string): T {
    return this.#map.get(key) as T;
  }

  set(key: string, value: T): void {
    this.#map.set(key, value);
  }
}
