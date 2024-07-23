import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule, TranslocoHttpLoader } from './core';
import { SharedModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, SharedModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    provideTransloco({
      config: {
        availableLangs: ['en-BE'],
        defaultLang: 'en-BE',
        prodMode: true,
      },
      loader: TranslocoHttpLoader,
    }),
    provideTranslocoLocale(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
