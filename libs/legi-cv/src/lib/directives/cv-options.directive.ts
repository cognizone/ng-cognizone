import { Directive, Inject, InjectionToken, Input, OnChanges, Provider } from '@angular/core';
import { Many, manyToArray, SelectOptionsProvider, SelectOptionsProvidersMerger } from '@cognizone/model-utils';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';

import { CvService } from '../services/cv.service';

export interface HasOptionsProvider<T> {
  optionsProvider: SelectOptionsProvider<T>;
}

export const HAS_OPTIONS_PROVIDER_TOKEN = new InjectionToken<HasOptionsProvider<unknown>>('has-options-provider');

export function provideHasOptionsProvider(type: unknown): Provider {
  return {
    useExisting: type,
    provide: HAS_OPTIONS_PROVIDER_TOKEN,
  };
}

@Directive({
  selector: '[czCvOptions]',
})
export class CvOptionsDirective extends OnDestroy$ implements OnChanges {
  @Input()
  cvName!: Many<string>;

  constructor(
    @Inject(HAS_OPTIONS_PROVIDER_TOKEN) private hasOptions: HasOptionsProvider<string>,
    private cvService: CvService,
    private logger: Logger
  ) {
    super();
    this.logger = this.logger.extend('CvSelectDirective');
  }

  ngOnChanges(): void {
    const cvNames = manyToArray(this.cvName);
    const providers = cvNames.map(name => this.cvService.getProviderAsSelectOptionProvider(name));
    const container = new SelectOptionsProvidersMerger(providers);
    this.hasOptions.optionsProvider = container;
  }
}
