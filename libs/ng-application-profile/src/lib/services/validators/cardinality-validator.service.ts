import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { isMaxCardinalityRule, isMinCardinalityRule, MaxCardinalityRule, MinCardinalityRule, Rule } from '@cognizone/application-profile';

import { MicroValidatorBuilder } from '../ap-form-builder.service';

@Injectable({
  providedIn: 'root',
})
export class CardinalityValidatorService extends MicroValidatorBuilder {
  static readonly MIN_CARDINALITY_ERROR_KEY: string = 'minCardinality';

  static readonly MAX_CARDINALITY_ERROR_KEY: string = 'minCardinality';

  createValidator(rules: Rule[]): ValidatorFn | null {
    const min = rules.find(isMinCardinalityRule);
    const max = rules.find(isMaxCardinalityRule);

    if (min && min.value === 1 && max && max.value === 1) return Validators.required;

    const validators: ValidatorFn[] = [];
    if (min) validators.push(this.getMinCardinalityValidator(min));
    if (max) validators.push(this.getMaxCardinalityValidator(max));

    return validators.length > 0 ? Validators.compose(validators) : null;
  }

  private getMinCardinalityValidator(min: MinCardinalityRule): ValidatorFn {
    return ctrl => {
      const { value } = ctrl;
      return Array.isArray(value) && value.length < min.value
        ? {
            [CardinalityValidatorService.MIN_CARDINALITY_ERROR_KEY]: min.value,
          }
        : null;
    };
  }

  private getMaxCardinalityValidator(max: MaxCardinalityRule): ValidatorFn {
    return ctrl => {
      const { value } = ctrl;
      return Array.isArray(value) && value.length > max.value
        ? {
            [CardinalityValidatorService.MAX_CARDINALITY_ERROR_KEY]: max.value,
          }
        : null;
    };
  }
}
