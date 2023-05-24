import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Inject, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlContainer, UntypedFormControl, NgControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { LabelComponent } from '@cognizone/legi-shared/label';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { bindControls, extractControlFromNgControl } from '@cognizone/legi-shared/utils';

import { DatePickerType } from './models/date-picker-type';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.

const moment = _moment;

/**
 * `DatePickerComponent` allows user to pass a pick a date from a calendar
 *  Component has 2 modes, classic and urban, which determine it's appearance
 *  appearance config should be passed in app.module
 */
@Component({
  selector: 'cz-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent extends ControlComponent<Date | null> implements OnInit {
  @Input()
  placeholder?: string;
  @Input()
  label?: string;
  @Input() min?: Date;
  @Input() max?: Date;
  @Input()
  readonly = false;
  @Input()
  updateOnBlur = true;
  @Input()
  type: DatePickerType = DatePickerType.DATE;
  @Input()
  hint?: string;
  @Input()
  startView?: string = 'multi-year';

  embeddedControl!: UntypedFormControl;

  get classicMode(): boolean {
    return this.config.appearance === 'classic';
  }

  get iconPosition(): 'prefix' | 'suffix' {
    if (this.config.datePicker?.iconPosition) {
      return this.config.datePicker.iconPosition;
    }
    return this.config.appearance === 'urban' ? 'suffix' : 'prefix';
  }

  @ContentChild(LabelComponent, { static: false, read: LabelComponent })
  labelComponent?: LabelComponent;

  /**
   * @ignore
   */
  constructor(
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions,
    logger: Logger,
    cdr: ChangeDetectorRef,
    @Optional() controlContainer: ControlContainer,
    @Optional() @Self() private ngControl?: NgControl
  ) {
    super(logger, cdr, controlContainer);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.controlChanged.complete();
    this.embeddedControl = new UntypedFormControl(null, { updateOn: this.updateOnBlur ? 'blur' : 'change' });
    super.ngOnInit();
    if (this.ngControl) {
      const control = extractControlFromNgControl(this.ngControl);
      // FIXME Will not work nicely in all cases for validators, because `control` works with `Date`, and `embeddedControl` works with `Moment` (usually)
      bindControls(control, this.embeddedControl, this.cdr);
      this.embeddedControl.setValue(control.value, { emitEvent: false });
    }
  }

  /**
   * `chosenYearHandler` setting the year in embeddedControl date value
   */
  chosenYearHandler(normalizedYear: Moment): void {
    if (this.type !== DatePickerType.MONTH) return;
    const ctrlValue = this.embeddedControl.value ? moment(this.embeddedControl.value) : moment();
    ctrlValue.year(normalizedYear.year());
    this.embeddedControl.setValue(ctrlValue);
  }

  /**
   * `chosenMonthHandler` setting the month in embeddedControl date value
   */
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>): void {
    if (this.type !== DatePickerType.MONTH) return;
    const ctrlValue = this.embeddedControl.value ? moment(this.embeddedControl.value) : moment();
    ctrlValue.month(normalizedMonth.month());
    this.embeddedControl.setValue(ctrlValue);
    datepicker.close();
  }

  /**
   * `embeddedValueToValue` maps selected value of a calendar to a value of type Date
   */
  embeddedValueToValue(value: Date | Moment | string | null): Date | null {
    if (!value) return value as null;
    if (typeof value === 'string') return new Date(value);
    else if (value instanceof Date) return value;
    return value.toDate();
  }
}
