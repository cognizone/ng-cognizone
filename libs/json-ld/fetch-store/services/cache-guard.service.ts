import { ExpandedJsonLdContainer } from '@cognizone/json-ld-core';

import { FetchOptions } from '../models/fetch-options';

export abstract class CacheGuard<T> {
  abstract canCache(key: string, value: ExpandedJsonLdContainer, options: FetchOptions<T>): boolean;
}
