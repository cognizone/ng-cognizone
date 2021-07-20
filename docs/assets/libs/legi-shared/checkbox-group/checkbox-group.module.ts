import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { InputModule } from '@cognizone/legi-shared/input';
import { SelectOptionSortModule } from '@cognizone/legi-shared/select-option-sort';
import { TranslocoLangStringModule } from '@cognizone/transloco-langstring';
import { TranslocoModule } from '@ngneat/transloco';

import { CheckboxGroupComponent } from './checkbox-group.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    TranslocoLangStringModule,
    MatIconModule,
    // Internal
    InputModule,
    SelectOptionSortModule,
    // Other
    TranslocoModule
  ],
  declarations: [CheckboxGroupComponent],
  exports: [CheckboxGroupComponent]
})
export class CheckboxGroupModule {}
