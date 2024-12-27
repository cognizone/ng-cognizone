import { Result } from '../models';
import { isOk } from './is-ok';

export function lazyOr<T>(result: Result<T>, orValue: () => Result<T>): Result<T> {
  return isOk(result) ? result : orValue();
}

export function lazyOrP<T>(orValue: () => Result<T>): (result: Result<T>) => Result<T> {
  return result => lazyOr(result, orValue);
}
