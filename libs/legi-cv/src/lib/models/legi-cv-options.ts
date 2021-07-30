import { InjectionToken } from '@angular/core';

import { ConceptFilterableKeys } from './concept-filterable-keys';

export interface LegiCvOptions {
  elasticAtomicCvClientOptions: {
    baseUrl: string;
    index: string;
    apName: string;
  };
  defaultConceptFilterableKeys: ConceptFilterableKeys;
}

export const DEFAULT_LEGI_CV_OPTIONS: LegiCvOptions = {
  elasticAtomicCvClientOptions: {
    index: 'data',
    baseUrl: 'UNKNOWN',
    apName: 'casemates',
  },
  defaultConceptFilterableKeys: ['prefLabel', 'altLabel'],
};

export const LEGI_CV_OPTIONS_TOKEN = new InjectionToken<LegiCvOptions>('LegiCvOptions');
