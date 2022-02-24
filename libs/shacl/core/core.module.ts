import { ModuleWithProviders, NgModule } from '@angular/core';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN } from '@cognizone/json-model';

import { ShaclHelper } from './services';

@NgModule({
  imports: [],
})
export class ShaclCoreModule {
  static forRoot(): ModuleWithProviders<ShaclCoreModule> {
    return {
      ngModule: ShaclCoreModule,
      providers: [
        {
          provide: DATA_MODEL_DEFINITION_HELPER_TOKEN,
          useExisting: ShaclHelper,
        },
      ],
    };
  }
}
