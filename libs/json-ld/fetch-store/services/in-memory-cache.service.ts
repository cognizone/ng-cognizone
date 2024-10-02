import { ExpandedJsonLdContainer } from '@cognizone/json-ld-core';

import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class InMemoryCache implements CacheService {
  #map: Map<string, ExpandedJsonLdContainer> = new Map();

  has(key: string): boolean {
    return this.#map.has(key);
  }

  get(key: string): ExpandedJsonLdContainer {
    return this.#map.get(key) as ExpandedJsonLdContainer;
  }

  set(key: string, value: ExpandedJsonLdContainer): void {
    this.#map.set(key, value);
  }
}
