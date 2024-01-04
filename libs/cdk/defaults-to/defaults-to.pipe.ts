import { Inject, InjectionToken, Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from '@cognizone/model-utils';

export interface DefaultsToPipeOptions {
  defaultValue: unknown;
}

export const DEFAULTS_TO_PIPE_OPTIONS = new InjectionToken<DefaultsToPipeOptions>('DEFAULT_TO_PIPE_OPTIONS', {
  factory: () => ({ defaultValue: '-' }),
});

@Pipe({
  name: 'defaultsTo',
  standalone: true,
})
export class DefaultsToPipe implements PipeTransform {
  constructor(@Inject(DEFAULTS_TO_PIPE_OPTIONS) private options: DefaultsToPipeOptions) {}

  transform<T>(value: T, defaultValue?: T | string): T | string {
    return isEmpty(value) ? defaultValue ?? (this.options.defaultValue as T | string) : value;
  }
}
