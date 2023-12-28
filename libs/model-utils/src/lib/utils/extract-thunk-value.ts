import { Thunk } from '../models';

export function extractThunkValue<T, U extends unknown[] = never[]>(thunk: Thunk<T, U>, ...args: U): T {
  return typeof thunk === 'function' ? (thunk as Function)(...args) : thunk;
}
