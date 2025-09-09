import { EnvironmentProviders, Provider, inject, provideAppInitializer } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { DATA_MODEL_DEFINITION_HELPER_TOKEN } from '@cognizone/json-model';

import { createMicroValidatorProvider } from './services/ap-form-builder.service';
import { ApHelper } from './services/ap-helper.service';
import { ApService } from './services/ap.service';
import { CardinalityValidatorService } from './services/validators/cardinality-validator.service';

export function provideNgApplicationProfile(): (Provider | EnvironmentProviders)[] {
  return [
    createMicroValidatorProvider(CardinalityValidatorService),
    provideAppInitializer(async () => {
      const initializerFn = apServiceInitializerFactory(inject(ApService));
      return initializerFn();
    }),
    {
      provide: DATA_MODEL_DEFINITION_HELPER_TOKEN,
      useExisting: ApHelper,
    },
  ];
}

export function apServiceInitializerFactory(apService: ApService): () => Promise<void> {
  const x = async () => apService.init();

  return x;
}
