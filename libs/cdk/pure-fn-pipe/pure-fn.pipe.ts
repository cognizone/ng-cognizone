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
  transform<T extends (...args: any[]) => any>(fn: T, ...args: Parameters<T>): ReturnType<T> {
    return fn(...args);
  }
}
