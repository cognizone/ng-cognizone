import { Result } from '../models';
import { isOk } from './is-ok';

export function or<T>(result: Result<T>, orValue: Result<T>): Result<T> {
  return isOk(result) ? result : orValue;
}

export function orP<T>(orValue: Result<T>): (result: Result<T>) => Result<T> {
  return result => or(result, orValue);
}
