import { NgModule } from '@angular/core';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe]
})
export class I18nModule {}
