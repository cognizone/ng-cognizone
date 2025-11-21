import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { I18nModule } from '@cognizone/i18n';
import { InputModule } from '@cognizone/legi-shared/input';
import { SelectOptionSortModule } from '@cognizone/legi-shared/select-option-sort';
import { TranslocoModule } from '@jsverse/transloco';

import { CheckboxGroupComponent } from './checkbox-group.component';
import { SelectOptionGroupsSlicePipe } from './select-option-groups-slice.pipe';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    // Misc
    TranslocoModule,
    // Internal
    I18nModule,
    InputModule,
    SelectOptionSortModule,
    SelectOptionGroupsSlicePipe,
  ],
  declarations: [CheckboxGroupComponent],
  exports: [CheckboxGroupComponent],
})
export class CheckboxGroupModule {}
