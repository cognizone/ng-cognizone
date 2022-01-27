import { Inject, Injectable } from '@angular/core';
import { ShaclOptions, SHACL_OPTIONS_TOKEN } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ShaclOptionsService {
  constructor(@Inject(SHACL_OPTIONS_TOKEN) private options: ShaclOptions) {}

  getOptions(): ShaclOptions {
    return this.options;
  }

  setOptions(value: ShaclOptions): void {
    this.options = value;
  }
}
