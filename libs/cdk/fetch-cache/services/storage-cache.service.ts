import { CacheService } from './cache.service';

export class StorageCache<T = unknown> implements CacheService<T> {
  constructor(private storage: Storage, private key: string) {}

  #state?: StorageCacheState<T>;

  has(key: string): boolean {
    return !!this.#getState()[key];
  }

  get(key: string): T {
    return this.#getState()[key];
  }

  set(key: string, value: T): void {
    const newState = { ...this.#getState(), [key]: value };
    this.#setState(newState);
  }

  #getState(): StorageCacheState<T> {
    if (this.#state) return this.#state;
    const raw = this.storage.getItem(this.key);
    if (raw) {
      return (this.#state = JSON.parse(raw));
    }
    this.#setState({});
    return this.#getState();
  }

  #setState(state: StorageCacheState<T>): void {
    this.#state = state;
    this.storage.setItem(this.key, JSON.stringify(state));
  }
}

interface StorageCacheState<T> {
  [key: string]: T;
}

export function createStorageCache<T>(storage: Storage = localStorage, key: string = 'appFetchCache'): StorageCache<T> {
  return new StorageCache(storage, key);
}
