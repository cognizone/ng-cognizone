import { Pipe, PipeTransform } from '@angular/core';

/**
 * @example
 * ```html
   {{ service | pureMethod: 'methodName' : 'arg1' : 'arg2' }}
   {{ this | pureMethod: 'componentMethodName' : 'arg1' : 'arg2' }}
 * ```
 */
@Pipe({
  name: 'pureMethod',
  standalone: true,
})
export class PureMethodPipe implements PipeTransform {
  transform<T extends (...args: unknown[]) => unknown, U extends {}, V extends keyof U>(
    service: U,
    methodKey: V,
    ...args: U[V] extends T ? Parameters<U[V]> : never
  ): U[V] extends T ? ReturnType<T> : never {
    return (service[methodKey] as unknown as Function)(...args);
  }
}
