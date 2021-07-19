import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { NgApplicationProfileModule } from '@cognizone/ng-application-profile';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    NgApplicationProfileModule.forRoot(),
    TranslocoModule,
    LegiSharedModule.forRoot(),
    TranslocoLocaleModule.init(),
    NgxsModule.forRoot([], {}),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: false, name: 'CZ-DATA_EXPLORER' })
  ]
})
export class CoreModule {}
