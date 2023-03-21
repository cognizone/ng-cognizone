import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
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
