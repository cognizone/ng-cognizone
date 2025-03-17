import { Mapper, Result } from '../models';
import { isOk } from './is-ok';
import { ok } from './ok';

export function mapOk<T1, T2, E>(result: Result<T1, E>, mapper: Mapper<T1, T2>): Result<T2, E> {
  return isOk(result) ? ok(mapper(result.content)) : result;
}

export function mapOkP<T1, T2, E>(mapper: Mapper<T1, T2>): (result: Result<T1, E>) => Result<T2, E> {
  return result => mapOk(result, mapper);
}
