import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { I18nModule } from '@cognizone/i18n';
import { InputModule } from '@cognizone/legi-shared/input';

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
    I18nModule,
    // Internal
    InputModule,
  ],
  declarations: [RadioGroupComponent],
  exports: [RadioGroupComponent],
})
export class RadioGroupModule {}
