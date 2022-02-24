import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { I18nTranslocoModule } from '@cognizone/i18n-transloco';
import { GraphState } from '@cognizone/json-model-graph';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { CognizoneMaterialIconsModule } from '@cognizone/material-icons';
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoModule } from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@shfp/env/environment';

import { TranslocoHttpLoader } from './services';

@NgModule({
  imports: [
    HttpClientModule,
    LegiSharedModule.forRoot(),
    TranslocoModule,
    TranslocoLocaleModule.init({
      langToLocaleMapping: {
        en: 'fr-BE',
      },
    }),
    I18nTranslocoModule.forRoot(),
    NgxsModule.forRoot([GraphState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    CognizoneMaterialIconsModule.forRoot({}),
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class CoreModule {}
