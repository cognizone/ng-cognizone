import { ChangeDetectorRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export function bindControls(src: AbstractControl, dist: AbstractControl, cdr: ChangeDetectorRef): void {
  dist.validator = src.validator;
  const old = src.markAsTouched.bind(src);
  src.markAsTouched = (...args) => {
    old(...args);
    dist.markAsTouched(...args);
    cdr.markForCheck();
  };
}
