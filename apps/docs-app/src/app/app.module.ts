import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
