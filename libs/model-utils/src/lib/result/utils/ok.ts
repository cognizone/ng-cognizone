import { ResultOk } from '../models';

export function ok<T>(content: T): ResultOk<T> {
  return { type: 'ok', content };
}
