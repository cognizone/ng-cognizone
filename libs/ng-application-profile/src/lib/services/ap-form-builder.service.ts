import { Inject, Injectable, Optional, Provider, Type } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ApplicationProfile, Rule } from '@cognizone/application-profile';
import { Many } from '@cognizone/model-utils';

import { ApHelper } from './ap-helper.service';

export abstract class MicroValidatorBuilder {
  abstract createValidator(rules: Rule[]): ValidatorFn | null;
}

export abstract class MicroAsyncValidatorBuilder {
  abstract createAsyncValidator(rules: Rule[]): AsyncValidatorFn | null;
}

@Injectable()
export class ApFormBuilder {
  constructor(
    private apService: ApHelper,
    private fb: FormBuilder,
    @Optional() @Inject(MicroValidatorBuilder) private validatorBuilders: MicroValidatorBuilder[],
    @Optional() @Inject(MicroAsyncValidatorBuilder) private asyncValidatorBuilders: MicroAsyncValidatorBuilder[]
  ) {
    this.validatorBuilders = this.validatorBuilders || [];
    this.asyncValidatorBuilders = this.asyncValidatorBuilders || [];
  }

  addValidatorsToControl<T extends AbstractControl>(control: T, ap: ApplicationProfile, types: Many<string>, key?: string): T {
    if (control instanceof FormControl) {
      if (!key) throw new Error('Cannot add validators to FormControl without key');
      this.addValidatorsToFormControl(control, ap, types, key);
    } else if (control instanceof FormGroup) {
      this.addValidatorsToFormGroup(control, ap, types, key);
    } else if (control instanceof FormArray) {
      if (!key) throw new Error('Cannot add validators to FormArray without key');
      this.addValidatorsToFormArray(control, ap, types, key);
    }
    return control;
  }

  addValidatorsToFormGroup(control: FormGroup, ap: ApplicationProfile, types: Many<string>, key?: string): FormGroup {
    control = this.addValidatorsFromRules(control, this.apService.getRules(ap, types, key));
    Object.entries(control.controls).forEach(([subKey, subControl]) => {
      if (subControl instanceof FormControl) this.addValidatorsToFormControl(subControl, ap, types, subKey);
      else if (subControl instanceof FormGroup) {
        const rangeRule = this.apService.getRangeRule(ap, types, subKey);
        if (rangeRule.value.name === 'classId') {
          this.addValidatorsToFormGroup(subControl, ap, rangeRule.value.value);
        } else {
          this.addValidatorsToFormGroup(subControl, ap, types, key);
        }
      } else if (control instanceof FormArray) {
        // TODO
      }
    });
    return control;
  }

  addValidatorsToFormControl(control: FormControl, ap: ApplicationProfile, types: Many<string>, key: string): FormControl {
    return this.addValidatorsFromRules(control, this.apService.getRules(ap, types, key));
  }

  addValidatorsToFormArray(control: FormArray, ap: ApplicationProfile, types: Many<string>, key: string): FormArray {
    const rules = this.apService.getRules(ap, types, key);
    control = this.addValidatorsFromRules(control, rules);
    control.controls.forEach(subControl => this.addValidatorsFromRules(subControl, rules));
    return control;
  }

  generateLangStringFormGroup(langs: string[]): FormGroup {
    const formDescriptor: { [lang: string]: FormArray } = {};
    langs.forEach(lang => (formDescriptor[lang] = this.fb.array([this.fb.control('')])));
    return this.fb.group(formDescriptor);
  }

  private addValidatorsFromRules<T extends AbstractControl>(control: T, rules: Rule[]): T {
    const validator = control.validator;
    const newValidators = this.validatorBuilders.map(v => v.createValidator(rules)).filter(Boolean) as ValidatorFn[];
    if (newValidators.length > 0 && validator != null) control.setValidators([validator, ...newValidators]);
    else if (newValidators.length > 0) control.setValidators(newValidators);
    return control;
  }
}

export function createMicroValidatorProvider(service: Type<MicroValidatorBuilder>): Provider {
  return {
    multi: true,
    useClass: service,
    provide: MicroValidatorBuilder,
  };
}
