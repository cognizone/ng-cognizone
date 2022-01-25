import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { I18nTranslocoModule } from '@cognizone/i18n-transloco';
import { NgApplicationProfileModule } from '@cognizone/ng-application-profile';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@czee-ce/env/environment';
import { JsonModelModule } from '@cognizone/json-model';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    NgApplicationProfileModule.forRoot(),
    TranslocoModule,
    LegiSharedModule.forRoot(),
    TranslocoLocaleModule.init(),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production, name: 'CZ-DATA_EXPLORER' }),
    I18nTranslocoModule.forRoot(),
    JsonModelModule.forRoot(),
  ],
})
export class CoreModule {}
