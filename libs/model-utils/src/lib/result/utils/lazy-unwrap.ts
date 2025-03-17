import { Result } from '../models';

export function lazyUnwrap<T, E>(result: Result<T, E>, defaultValue: () => T): T {
  return result.type === 'ok' ? result.content : defaultValue();
}

export function lazyUnwrapP<T, E>(defaultValue: () => T): (result: Result<T, E>) => T {
  return result => lazyUnwrap(result, defaultValue);
}
