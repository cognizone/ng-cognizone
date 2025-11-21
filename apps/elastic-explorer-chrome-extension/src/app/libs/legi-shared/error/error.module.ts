import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { I18nModule } from '@cognizone/i18n';

import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    MatFormFieldModule,
    I18nModule,
  ],
  declarations: [ErrorComponent],
  exports: [ErrorComponent],
})
export class ErrorModule {}
