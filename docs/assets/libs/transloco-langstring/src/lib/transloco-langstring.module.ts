import { NgModule } from '@angular/core';

import { LangStringPipe } from './pipes/lang-string.pipe';

@NgModule({
  declarations: [LangStringPipe],
  imports: [],
  exports: [LangStringPipe]
})
export class TranslocoLangStringModule {}
