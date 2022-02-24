import { NgModule } from '@angular/core';
import { AddI18nPrefixPipe } from './pipes/add-i18n-prefix.pipe';

const pipes = [AddI18nPrefixPipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
})
export class ShaclSharedModule {}
