import { NgModule } from '@angular/core';

import { LangStringPipe } from './pipes/lang-string.pipe';

/**
 * @deprecated please use @cognizone/i18n instead
 */
@NgModule({
  declarations: [LangStringPipe],
  imports: [],
  exports: [LangStringPipe],
})
export class TranslocoLangStringModule {}
