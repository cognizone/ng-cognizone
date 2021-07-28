import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Inject, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';

import { DatePickerType } from './models/date-picker-type';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.

const moment = _moment;

@Component({
  selector: 'cz-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  updateOnBlur = false;
  @Input()
  type: DatePickerType = DatePickerType.DATE;
  @Input()
  hint?: string;

  embeddedControl!: FormControl;

  get classicMode(): boolean {
    return this.config.appearance === 'classic';
  }

  constructor(
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions,
    logger: Logger,
    cdr: ChangeDetectorRef,
    @Optional() controlContainer: ControlContainer
  ) {
    super(logger, cdr, controlContainer);
  }

  ngOnInit(): void {
    this.embeddedControl = new FormControl(null, { updateOn: this.updateOnBlur ? 'blur' : 'change' });
    super.ngOnInit();
  }

  chosenYearHandler(normalizedYear: Moment): void {
    if (this.type !== DatePickerType.MONTH) return;
    const ctrlValue = this.embeddedControl.value ? moment(this.embeddedControl.value) : moment();
    ctrlValue.year(normalizedYear.year());
    this.embeddedControl.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>): void {
    if (this.type !== DatePickerType.MONTH) return;
    const ctrlValue = this.embeddedControl.value ? moment(this.embeddedControl.value) : moment();
    ctrlValue.month(normalizedMonth.month());
    this.embeddedControl.setValue(ctrlValue);
    datepicker.close();
  }

  embeddedValueToValue(value: Moment | Date | null): Date | null {
    if (!value) return value as null;
    else if (value instanceof Date) return value;
    return value.toDate();
  }
}

// constructor(
//   logger: Logger,
//   cdr: ChangeDetectorRef,
//   @Optional() controlContainer: ControlContainer,
//   @Optional() @Self() private ngControl?: NgControl
// ) {
//   super(logger, cdr, controlContainer);
//   if (this.ngControl != null) {
//     this.ngControl.valueAccessor = this;
//   }
// }

// ngOnInit(): void {
//   this.embeddedControl = new FormControl(null, { updateOn: this.updateOnBlur ? 'blur' : 'change' });
//   super.ngOnInit();
//   if (!this.ngControl) return;
//   const control = extractControlFromNgControl(this.ngControl);
//   this.embeddedControl.validator = () => control.validator?.(control) ?? null;
// }
