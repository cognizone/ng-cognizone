import { FetchOptions } from '../models/fetch-options';

export abstract class Serializer<T> {
  abstract toKey(options: FetchOptions<T>): string;
}
