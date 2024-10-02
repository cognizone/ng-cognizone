import { ExpandedJsonLdContainer } from '@cognizone/json-ld-core';

export abstract class CacheService {
  abstract get(key: string): MaybePromise<ExpandedJsonLdContainer>;
  abstract has(key: string): MaybePromise<boolean>;
  abstract set(key: string, value: ExpandedJsonLdContainer): MaybePromise<void>;
}

export type MaybePromise<T> = T | Promise<T>;
