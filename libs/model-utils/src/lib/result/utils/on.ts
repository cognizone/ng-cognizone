import { Result } from '../models';
import { isError } from './is-error';
import { isOk } from './is-ok';

export function on<T, E>(result: Result<T, E>, onResult: OnResult<T, E>): void {
  if (isError(result) && onResult.error) {
    return onResult.error(result.error);
  }

  if (isOk(result) && onResult.ok) {
    return onResult.ok(result.content);
  }
}

export function onP<T, E>(onResult: OnResult<T, E>): (result: Result<T, E>) => void {
  return result => on(result, onResult);
}

export interface OnResult<T, E> {
  ok?: (content: T) => void;
  error?: (err: E) => void;
}
