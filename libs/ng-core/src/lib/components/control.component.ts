/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  UntypedFormControl,
  FormGroupDirective,
  FormGroupName,
} from '@angular/forms';
import { merge, noop, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { OnDestroy$ } from '../mixins/on-destroy.mixin';
import { Logger } from '../modules/logger/logger.service';
import { Maybe } from '../types/maybe';

// put @Directive so that @Input are kept
/**
 * @deprecated you should implement ControlValueAccessor yourself, this was not a great idea in the end
 */
@Directive({})
export abstract class ControlComponent<MODEL, EMBEDDED = MODEL> extends OnDestroy$ implements OnInit, OnDestroy, ControlValueAccessor {
  @Input()
  required?: boolean;

  @Input()
  name?: string;

  @Input()
  get formControlName(): Maybe<string> {
    return this._formControlName;
  }

  set formControlName(value: Maybe<string>) {
    this._formControlName = value;
    this.bindEmbeddedControl();
  }

  @Input()
  get formControl(): Maybe<AbstractControl> {
    return this._formControl;
  }

  set formControl(value: Maybe<AbstractControl>) {
    this._formControl = value;
    this.bindEmbeddedControl();
  }

  get model(): MODEL {
    return this._model;
  }

  set model(value: MODEL) {
    this._model = value;
  }

  disabled = false;

  embeddedControl?: AbstractControl;

  valueChanges?: Observable<any>;

  defaultValue?: MODEL;

  protected controlChanged: Subject<void> = new Subject();

  protected _model!: MODEL;

  private _formControl?: AbstractControl;

  private _formControlName?: string;

  constructor(protected logger: Logger, protected cdr: ChangeDetectorRef, @Optional() protected controlContainer?: ControlContainer) {
    super();
  }

  ngOnInit(): void {
    this.subSink = this.controlChanged.subscribe(() => {
      this.onModelChange = noop;
      this.onModelTouched = noop;
    });
    this.bindEmbeddedControl();
    if (!this.name) this.computeName();
    this.logger = this.name ? this.logger.extend(this.name) : this.logger;
    this.computeRequired();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.controlChanged.complete();
  }

  writeValue(value: MODEL): void {
    if (value == null && this.defaultValue != null) {
      value = this.defaultValue;
    }
    this.model = value;
    if (this.embeddedControl && value !== this.embeddedControl.value) {
      this.embeddedControl.setValue(this.valueToEmbeddedValue(value), { onlySelf: true });
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.embeddedControl) {
      if (isDisabled) this.embeddedControl.disable();
      else this.embeddedControl.enable();
    }
    this.cdr.markForCheck();
  }

  setModelAndEmit(value: MODEL): void {
    if (value !== this.model) {
      this.model = value;
      this.onModelChange(this.model);
    }
  }

  protected valueToEmbeddedValue(value: MODEL): EMBEDDED {
    return value as unknown as EMBEDDED;
  }

  protected embeddedValueToValue(value: EMBEDDED): MODEL {
    return value as unknown as MODEL;
  }

  // depending on life-cycle of the component, those methods might not be attached yet

  protected onModelChange: Function = () => {};

  protected onModelTouched: Function = () => {};

  private bindEmbeddedControl(): void {
    this.controlChanged.next();
    if (!this.embeddedControl) return;
    const valueChanges = this.valueChanges ?? this.embeddedControl.valueChanges;
    valueChanges
      .pipe(
        map(value => this.embeddedValueToValue(value)),
        takeUntil(merge(this.onDestroy$, this.controlChanged))
      )
      .subscribe(value => this.setModelAndEmit(value));
  }

  private computeRequired(): void {
    if (this.required != null) return;
    let control: Maybe<AbstractControl>;
    if (this.formControlName) {
      if (this.controlContainer instanceof FormGroupDirective || this.controlContainer instanceof FormGroupName) {
        control = this.controlContainer.control.controls[this.formControlName];
      }
    } else if (this.formControl) {
      control = this.formControl;
    }
    if (!control?.validator) return;
    const errors = control.validator(new UntypedFormControl());
    if (errors?.required) this.required = true;
  }

  private computeName(): void {
    if (this.formControlName) {
      let name = this.formControlName;
      let parent = this.controlContainer;
      while (parent) {
        if (parent.name) {
          name = `${parent.name}-${name}`;
        }
        parent = '_parent' in parent ? ((parent as any)._parent as ControlContainer) : undefined;
      }
      this.name = name;
    } else if (this.formControl?.parent) {
      const { controls } = this.formControl.parent;
      if (controls instanceof Array) {
        const index = controls.findIndex(c => c === this.formControl);
        if (index > -1) this.name = `${index}`;
      } else {
        const name = Object.keys(controls).find(key => controls[key] === this.formControl);
        if (name) this.name = name;
      }
    }
  }
}
