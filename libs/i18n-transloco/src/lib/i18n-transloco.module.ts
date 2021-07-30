import { ModuleWithProviders, NgModule } from '@angular/core';

import { i18nTranslocoServiceProvider } from './services/i18n-transloco.service';

@NgModule({})
export class I18nTranslocoModule {
  static forRoot(): ModuleWithProviders<I18nTranslocoModule> {
    return {
      ngModule: I18nTranslocoModule,
      providers: [i18nTranslocoServiceProvider],
    };
  }
}
