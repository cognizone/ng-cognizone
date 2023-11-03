import { Injectable, inject } from '@angular/core';
import { LOD_OPTIONS, LodOptions } from '../models';

@Injectable({ providedIn: 'root' })
export class LodOptionsService {
  private options = inject(LOD_OPTIONS);

  setOptions(options: LodOptions): void {
    this.options = options;
  }

  getOptions(): LodOptions {
    return this.options;
  }
}
