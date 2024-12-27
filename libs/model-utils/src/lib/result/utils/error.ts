import { ResultError } from '../models';

export function error<T>(err: T): ResultError<T> {
  return { type: 'error', error: err };
}
