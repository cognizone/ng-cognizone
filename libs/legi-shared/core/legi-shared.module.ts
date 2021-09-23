import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { I18nService } from '@cognizone/i18n';

import { DEFAULT_LEGI_SHARED_OPTIONS, LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from './models/legi-shared-options';

@NgModule({
  imports: [MatMomentDateModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [I18nService, DateAdapter, LEGI_SHARED_OPTIONS_TOKEN],
      useFactory: dateLocaleHandlerFactory,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
  ],
})
export class LegiSharedModuleRoot {}

@NgModule({})
export class LegiSharedModule {
  static forRoot(options: Partial<LegiSharedOptions> = {}): ModuleWithProviders<LegiSharedModuleRoot> {
    options = { ...DEFAULT_LEGI_SHARED_OPTIONS, ...options };
    return { ngModule: LegiSharedModuleRoot, providers: [{ provide: LEGI_SHARED_OPTIONS_TOKEN, useValue: options }] };
  }
}

export function dateLocaleHandlerFactory(i18nService: I18nService, adapter: DateAdapter<unknown>, options: LegiSharedOptions): Function {
  const x = () => {
    if (options.useDefaultMomentLocaleAdapter) {
      i18nService.selectActiveLocale().subscribe(lang => {
        adapter.setLocale(lang);
      });
    }
  };
  return x;
}
