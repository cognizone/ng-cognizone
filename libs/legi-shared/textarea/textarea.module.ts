import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
