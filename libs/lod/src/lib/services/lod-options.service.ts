import { Inject, Injectable } from '@angular/core';
import { LodOptions, LOD_OPTIONS } from '../models';

@Injectable({ providedIn: 'root' })
export class LodOptionsService {
  constructor(@Inject(LOD_OPTIONS) private options: LodOptions) {
    // this.options = inject(LOD_OPTIONS);
  }

  // private options = inject(LOD_OPTIONS);

  setOptions(options: LodOptions): void {
    this.options = options;
  }

  getOptions(): LodOptions {
    return this.options;
  }
}
