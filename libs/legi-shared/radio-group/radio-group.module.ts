import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { InputModule } from '@cognizone/legi-shared/input';
import { TranslocoLangStringModule } from '@cognizone/transloco-langstring';
import { TranslocoModule } from '@ngneat/transloco';

import { RadioGroupComponent } from './radio-group.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    // Cognizone
    TranslocoLangStringModule,
    // Internal
    InputModule,
    // Other
    TranslocoModule
  ],
  declarations: [RadioGroupComponent],
  exports: [RadioGroupComponent]
})
export class RadioGroupModule {}
