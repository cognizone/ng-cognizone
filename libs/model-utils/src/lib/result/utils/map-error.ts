import { Mapper, Result } from '../models';
import { isError } from './is-error';
import { error } from './error';

export function mapError<T, E1, E2>(result: Result<T, E1>, mapper: Mapper<E1, E2>): Result<T, E2> {
  return isError(result) ? error(mapper(result.error)) : result;
}

export function mapErrorP<T, E1, E2>(mapper: Mapper<E1, E2>): (result: Result<T, E1>) => Result<T, E2> {
  return result => mapError(result, mapper);
}
