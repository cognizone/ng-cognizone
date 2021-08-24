import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { I18nService } from '@cognizone/i18n';

import { DatePickerComponent } from '../date-picker.component';
import { DatePickerType } from '../models/date-picker-type';

@Directive({
  selector: 'cz-date-picker[monthSelector]',
  providers: [{ provide: MAT_DATE_FORMATS, useFactory: getFormat, deps: [I18nService] }],
})
export class MonthSelectorDirective {
  constructor(private datePicker: DatePickerComponent) {
    this.datePicker.type = DatePickerType.MONTH;
  }
}

export function getFormat(i18nService: I18nService): MatDateFormats {
  const locale = i18nService.getActiveLang();
  const separator =
    Intl.DateTimeFormat(locale)
      .formatToParts(new Date())
      .find(part => part.type === 'literal')?.value ?? '.';
  return {
    parse: {
      dateInput: `MM${separator}YYYY`,
    },
    display: {
      dateInput: `MM${separator}YYYY`,
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
}
