import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ErrorModule } from '@cognizone/legi-shared/error';

import { TextareaComponent } from './textarea.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatFormFieldModule,
    MatInputModule,
    // Cognizone
    ErrorModule,
  ],
  declarations: [TextareaComponent],
  exports: [TextareaComponent],
})
export class TextareaModule {}
