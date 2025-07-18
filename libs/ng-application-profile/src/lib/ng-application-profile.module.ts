import { ModuleWithProviders, NgModule, inject, provideAppInitializer } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { DATA_MODEL_DEFINITION_HELPER_TOKEN } from '@cognizone/json-model';

import { ApFormBuilder, createMicroValidatorProvider } from './services/ap-form-builder.service';
import { ApHelper } from './services/ap-helper.service';
import { ApService } from './services/ap.service';
import { CardinalityValidatorService } from './services/validators/cardinality-validator.service';
import { ApStore } from './store/ap.store';

@NgModule({})
export class NgApplicationProfileModuleRoot {}

@NgModule({})
export class NgApplicationProfileModule {
  static forRoot(): ModuleWithProviders<NgApplicationProfileModuleRoot> {
    return {
      ngModule: NgApplicationProfileModuleRoot,
      providers: [
        ApFormBuilder,
        createMicroValidatorProvider(CardinalityValidatorService),
        ApHelper,
        ApStore,
        provideAppInitializer(async () => {
          const initializerFn = apServiceInitializerFactory(inject(ApService));
          return initializerFn();
        }),
        {
          provide: DATA_MODEL_DEFINITION_HELPER_TOKEN,
          useExisting: ApHelper,
        },
      ],
    };
  }
}

export function apServiceInitializerFactory(apService: ApService): () => Promise<void> {
  const x = async () => apService.init();

  return x;
}
