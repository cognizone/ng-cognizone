import { NgModule } from '@angular/core';
import { AddI18nPrefixPipe } from './pipes/add-i18n-prefix.pipe';
import { IsNewPipe } from './pipes/is-new.pipe';

const pipes = [AddI18nPrefixPipe, IsNewPipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
})
export class ShaclSharedModule {}
