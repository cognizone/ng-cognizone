import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JsonModelModule } from '@cognizone/json-model';
import { ShaclCoreModule } from '@cognizone/shacl/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JsonModelModule.forRoot(),
    ShaclCoreModule.forRoot(),
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path: 'details',
          loadChildren: async () => import('./features/details/details.module').then(m => m.DetailsModule),
        },
        {
          path: 'list',
          loadChildren: async () => import('./features/list/list.module').then(m => m.ListModule),
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'list',
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
