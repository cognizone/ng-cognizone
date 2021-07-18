import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectOptionSortModule } from '@cognizone/legi-shared/select-option-sort';
import { TranslocoLangStringModule } from '@cognizone/transloco-langstring';
import { TranslocoModule } from '@ngneat/transloco';

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
    TranslocoLangStringModule,
    // Others
    TranslocoModule
  ],
  declarations: [SelectComponent],
  exports: [SelectComponent]
})
export class SelectModule {}
