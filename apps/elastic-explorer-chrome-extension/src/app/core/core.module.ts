import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideJsonModel } from '@cognizone/json-model';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { provideNgApplicationProfile } from '@cognizone/ng-application-profile';
import { environment } from '@czee-ce/env/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [],
  imports: [
    LegiSharedModule.forRoot(),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production, name: 'CZ-DATA_EXPLORER' }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), provideJsonModel(), provideNgApplicationProfile()],
})
export class CoreModule {}
