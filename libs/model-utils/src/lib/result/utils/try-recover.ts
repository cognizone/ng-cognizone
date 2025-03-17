import { Result } from '../models';
import { isError } from './is-error';

export function tryRecover<T, E1, E2>(result: Result<T, E1>, recover: (err: E1) => Result<T, E2>): Result<T, E2> {
  return isError(result) ? recover(result.error) : result;
}

export function tryRecoverP<T, E1, E2>(recover: (err: E1) => Result<T, E2>): (result: Result<T, E1>) => Result<T, E2> {
  return result => tryRecover(result, recover);
}
