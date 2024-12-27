import { Result } from '../models';

export function unwrapBoth<T>(result: Result<T, T>): T {
  return result.type === 'ok' ? result.content : result.error;
}

export function unwrapBothP<T>(): (result: Result<T, T>) => T {
  return result => unwrapBoth(result);
}
