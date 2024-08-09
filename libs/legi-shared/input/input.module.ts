import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
