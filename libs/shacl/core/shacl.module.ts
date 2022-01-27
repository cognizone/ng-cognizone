import { ModuleWithProviders, NgModule } from '@angular/core';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN } from '@cognizone/json-model';

import { ShaclHelper } from './services';

@NgModule({
  imports: [],
})
export class ShaclModule {
  static forRoot(): ModuleWithProviders<ShaclModule> {
    return {
      ngModule: ShaclModule,
      providers: [
        {
          provide: DATA_MODEL_DEFINITION_HELPER_TOKEN,
          useExisting: ShaclHelper,
        },
      ],
    };
  }
}
