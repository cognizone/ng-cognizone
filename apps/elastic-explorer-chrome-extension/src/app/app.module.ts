import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig } from '@ngneat/transloco';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule, TranslocoHttpLoader } from './core';
import { SharedModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, SharedModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en-BE'],
        defaultLang: 'en-BE',
        prodMode: true,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
