import { Result } from '../models';

export function unwrap<T>(result: Result<T>, defaultValue: T): T {
  return result.type === 'ok' ? result.content : defaultValue;
}

export function unwrapP<T>(defaultValue: T): (result: Result<T>) => T {
  return result => unwrap(result, defaultValue);
}
