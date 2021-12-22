import { ChangeDetectorRef, Injectable, OnInit, Optional, Self } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  NgControl,
} from '@angular/forms';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';

import { extractControlFromNgControl } from './extract-control-from-ng-control';

/**
 * `ControlComponent` serves as an abstract component
 */
@Injectable()
export class ControlComponent extends OnDestroy$ implements OnInit, ControlValueAccessor {
  control!: AbstractControl;

  onChange!: Function;
  onTouched!: Function;

  /**
   * @ignore
   */
  constructor(
    protected logger: Logger,
    protected cdr: ChangeDetectorRef,
    @Optional() @Self() protected ngControl?: NgControl,
    @Optional() protected controlContainer?: ControlContainer
  ) {
    super();

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * @ignore
   */
  writeValue(value: unknown): void {
    if (this.control.value !== value) {
      this.control.setValue(value);
      this.cdr.markForCheck();
    }
  }

  /**
   * @ignore
   */
  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  /**
   * @ignore
   */
  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    if (this.control || !this.ngControl) return;
    extractControlFromNgControl(this.ngControl);
  }
}
