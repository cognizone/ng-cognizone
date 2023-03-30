import { Pipe, PipeTransform } from '@angular/core';

/**
 * @example
 * ```html
   {{ myFn | pureFn : 'arg1' : 'arg2' }}
 * ```
 */
@Pipe({
  name: 'pureFn',
  standalone: true,
})
export class PureFnPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- need to keep any for type inference
  transform<T extends (...args: any[]) => any>(fn: T, ...args: Parameters<T>): ReturnType<T> {
    return fn(...args) as ReturnType<T>;
  }
}
