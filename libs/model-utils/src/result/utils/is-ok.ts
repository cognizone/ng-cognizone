import { Result, ResultOk } from '../models';

export function isOk<T>(result: Result<T>): result is ResultOk<T> {
  return result.type === 'ok';
}

export function isOkP<T>(): (result: Result<T>) => boolean {
  return result => isOk(result);
}
