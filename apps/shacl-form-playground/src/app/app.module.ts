import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { JsonModelModule } from '@cognizone/json-model';
import { ShaclModule } from '@cognizone/shacl/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JsonModelModule.forRoot(),
    ShaclModule.forRoot(),
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
