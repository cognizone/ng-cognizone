import { ExpandedJsonLdContainer } from '@cognizone/json-ld-core';

import { CacheService } from './cache.service';

export class StorageCache implements CacheService {
  constructor(private storage: Storage, private key: string) {}

  #state?: StorageCacheState;

  has(key: string): boolean {
    return !!this.#getState()[key];
  }

  get(key: string): ExpandedJsonLdContainer {
    return this.#getState()[key];
  }

  set(key: string, value: ExpandedJsonLdContainer): void {
    const newState = { ...this.#getState(), [key]: value };
    this.#setState(newState);
  }

  #getState(): StorageCacheState {
    if (this.#state) return this.#state;
    const raw = this.storage.getItem(this.key);
    if (raw) {
      return (this.#state = JSON.parse(raw));
    }
    this.#setState({});
    return this.#getState();
  }

  #setState(state: StorageCacheState): void {
    this.#state = state;
    this.storage.setItem(this.key, JSON.stringify(state));
  }
}

interface StorageCacheState {
  [key: string]: ExpandedJsonLdContainer;
}

export function createStorageCache(storage: Storage = localStorage, key: string = 'appFetchCache'): StorageCache {
  return new StorageCache(storage, key);
}
