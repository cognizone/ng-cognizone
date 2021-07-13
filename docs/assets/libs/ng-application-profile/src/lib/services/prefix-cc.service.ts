import { Injectable } from '@angular/core';
import { KNOWN_PREFIXES, Prefixes } from '@cognizone/application-profile';

@Injectable({ providedIn: 'root' })
export class PrefixCcService {
  prefixes: Prefixes = KNOWN_PREFIXES;

  patchPrefixes(prefixes: Prefixes): void {
    this.prefixes = { ...this.prefixes, ...prefixes };
  }

  setPrefixes(prefixes: Prefixes): void {
    this.prefixes = prefixes;
  }
}
