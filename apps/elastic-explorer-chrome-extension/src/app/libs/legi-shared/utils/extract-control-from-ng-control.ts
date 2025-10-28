import { AbstractControl, FormControlDirective, FormControlName, NgControl } from '@angular/forms';

/**
 *  @ignore
 */
export function extractControlFromNgControl(ngControl: NgControl): AbstractControl {
  if (ngControl instanceof FormControlDirective) {
    return ngControl.form;
  } else if (ngControl instanceof FormControlName) {
    return ngControl.control;
  }
  throw new Error('no');
}
