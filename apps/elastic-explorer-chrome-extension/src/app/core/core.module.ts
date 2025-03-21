import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JsonModelModule } from '@cognizone/json-model';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { NgApplicationProfileModule } from '@cognizone/ng-application-profile';
import { environment } from '@czee-ce/env/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [],
  imports: [
    NgApplicationProfileModule.forRoot(),
    LegiSharedModule.forRoot(),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production, name: 'CZ-DATA_EXPLORER' }),
    JsonModelModule.forRoot(),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class CoreModule {}
