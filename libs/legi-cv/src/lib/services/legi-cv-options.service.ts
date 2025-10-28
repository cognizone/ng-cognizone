import { inject, Injectable } from '@angular/core';

import { LEGI_CV_OPTIONS_TOKEN, LegiCvOptions } from '../models/legi-cv-options';

@Injectable({
  providedIn: 'root',
})
export class LegiCvOptionsService {
  options = inject(LEGI_CV_OPTIONS_TOKEN);

  patchOptions(patch: Partial<LegiCvOptions>): void {
    this.options = { ...this.options, ...patch };
  }
}
