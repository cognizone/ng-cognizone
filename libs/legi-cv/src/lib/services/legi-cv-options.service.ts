import { Inject, Injectable } from '@angular/core';

import { LEGI_CV_OPTIONS_TOKEN, LegiCvOptions } from '../models/legi-cv-options';

@Injectable({
  providedIn: 'root',
})
export class LegiCvOptionsService {
  constructor(@Inject(LEGI_CV_OPTIONS_TOKEN) public options: LegiCvOptions) {}

  patchOptions(patch: Partial<LegiCvOptions>): void {
    this.options = { ...this.options, ...patch };
  }
}
