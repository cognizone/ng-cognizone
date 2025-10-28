import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
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
