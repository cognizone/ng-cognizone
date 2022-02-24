import { flatten } from 'lodash-es';
import { Inject, Injectable, Optional } from '@angular/core';
import { getAllSelectOptions, Many, manyToArray, SelectOption, SelectOptionsProvider } from '@cognizone/model-utils';
import { identity, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';

import { CV_PROVIDER_TOKEN, CvProvider } from './cv-provider';
import { CvSelectOptionsProvider } from './cv-select-options-provider';

@Injectable({ providedIn: 'any' })
export class CvService {
  constructor(@Optional() @Inject(CV_PROVIDER_TOKEN) private providers: CvProvider[]) {
    this.providers = this.providers ?? [];
  }

  getProvider(cvName: string): CvProvider {
    const provider = this.providers.find(p => p.cvName === cvName);
    if (!provider) {
      throw new Error(`Could not find CvProvider with cvName '${cvName}'`);
    }
    return provider;
  }

  getProviderAsSelectOptionProvider(cvName: string): SelectOptionsProvider<string> {
    const provider = this.getProvider(cvName);
    return new CvSelectOptionsProvider(provider);
  }

  getAllOptions(cvName: Many<string>): Observable<SelectOption[]> {
    return of(manyToArray(cvName)).pipe(
      switchMap(identity),
      map(name => this.getProviderAsSelectOptionProvider(name)),
      mergeMap(provider => provider.getOptions(null, {})),
      toArray(),
      map(flatten),
      map(getAllSelectOptions)
    );
  }
}
