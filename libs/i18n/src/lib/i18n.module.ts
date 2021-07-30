import { NgModule } from '@angular/core';

import { LabelPipe } from './pipes/label.pipe';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [LabelPipe, TranslatePipe],
  exports: [LabelPipe, TranslatePipe],
})
export class I18nModule {}
