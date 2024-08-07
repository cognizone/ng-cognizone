import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ErrorModule } from '@cognizone/legi-shared/error';
import { LabelModule } from '@cognizone/legi-shared/label';

import { DatePickerComponent } from './date-picker.component';
import { MonthSelectorDirective } from './directives/month-selector.directive';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    // Cognizone
    LabelModule,
    ErrorModule,
  ],
  declarations: [DatePickerComponent, MonthSelectorDirective],
  exports: [DatePickerComponent, MonthSelectorDirective],
})
export class DatePickerModule {}
