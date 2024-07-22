import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { I18nModule } from '@cognizone/i18n';
import { SelectOptionSortModule } from '@cognizone/legi-shared/select-option-sort';
import { LabelModule } from '@cognizone/legi-shared/label';

import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    // Cognizone
    SelectOptionSortModule,
    I18nModule,
    LabelModule,
  ],
  declarations: [SelectComponent],
  exports: [SelectComponent],
})
export class SelectModule {}
