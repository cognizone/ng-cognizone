import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';

import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    MatFormFieldModule,
    TranslocoModule,
  ],
  declarations: [ErrorComponent],
  exports: [ErrorComponent],
})
export class ErrorModule {}
