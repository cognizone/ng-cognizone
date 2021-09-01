import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoggerModule } from '@cognizone/ng-core';
import { environment } from '@env/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { CoreState } from './store/core.state';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoggerModule.forRoot('CZ-DOCS'),
    NgxsModule.forRoot([CoreState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
  ],
})
export class CoreModule {}
