import { Result, ResultError } from '../models';

export function isError<E>(result: Result<unknown, E>): result is ResultError<E> {
  return result.type === 'error';
}

export function isErrorP<E>(): (result: Result<unknown, E>) => boolean {
  return result => isError(result);
}
