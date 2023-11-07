import { Injectable, InjectionToken, inject } from '@angular/core';

export interface IdGeneratorOptions {
  prefix: string;
}

export const DEFAULT_ID_GENERATOR_OPTIONS: IdGeneratorOptions = {
  prefix: 'cz-id',
};

export const ID_GENERATOR_OPTIONS = new InjectionToken<IdGeneratorOptions>('ID_GENERATOR_OPTIONS', {
  factory: () => DEFAULT_ID_GENERATOR_OPTIONS,
});

@Injectable({ providedIn: 'root' })
export class IdGeneratorService {
  private counter = 0;
  private options = inject(ID_GENERATOR_OPTIONS);

  generate(options: IdGeneratorOptions = this.options): string {
    return `${options.prefix}-${this.counter++}`;
  }
}
