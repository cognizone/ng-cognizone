export abstract class CacheService<T = unknown> {
  abstract get(key: string): MaybePromise<T>;
  abstract has(key: string): MaybePromise<boolean>;
  abstract set(key: string, value: T): MaybePromise<void>;
}

export type MaybePromise<T> = T | Promise<T>;
