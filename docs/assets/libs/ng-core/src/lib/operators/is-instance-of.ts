import { Type } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function isInstanceOf<T, U extends T, V extends T, W extends T>(
  typeA: Type<U>,
  typeB: Type<V>,
  typeC: Type<W>
): OperatorFunction<T, U | V | W>;
export function isInstanceOf<T, U extends T, V extends T>(typeA: Type<U>, typeB: Type<V>): OperatorFunction<T, U | V>;
export function isInstanceOf<T, U extends T>(type: Type<U>): OperatorFunction<T, U>;
export function isInstanceOf<T, U extends T>(...types: Type<unknown>[]): OperatorFunction<T, U> {
  return filter<T, U>((item: T): item is U => types.some(type => item instanceof type));
}
