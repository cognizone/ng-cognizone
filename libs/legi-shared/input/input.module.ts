import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ErrorModule } from '@cognizone/legi-shared/error';
import { LabelModule } from '@cognizone/legi-shared/label';

import { InputComponent } from './input.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    // Cognizone
    LabelModule,
    ErrorModule,
  ],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputModule {}
