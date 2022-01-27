import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { I18nTranslocoModule } from '@cognizone/i18n-transloco';
import { CognizoneMaterialIconsModule } from '@cognizone/material-icons';
import { GraphState } from '@cognizone/json-model-graph';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { TRANSLOCO_CONFIG, translocoConfig, TranslocoModule, TRANSLOCO_LOADER } from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
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
    // TODO use env
    NgxsModule.forRoot([GraphState], { developmentMode: true }),
    // TODO use env
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: false }),
    CognizoneMaterialIconsModule.forRoot({}),
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        // TODO use env
        prodMode: false,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class CoreModule {}
