import { InjectionToken, Provider, Type } from '@angular/core';
import { Completable, LangString, LangStringSimple, Nil } from '@cognizone/model-utils';
import { Observable } from 'rxjs';

import { Concept } from '../models/concept';
import { ConceptWrapper } from '../models/concept-wrapper';
import { ConceptGroup } from '../models/cv';
import { GetCvParams } from '../models/get-cv-params';

export interface CvProvider<T extends Concept = Concept> {
  cvName: string;
  cvUri: string;

  getCv(query: Nil<string>, options: GetCvParams): Observable<(ConceptGroup<T> | T)[]>;
  toConceptWrapper(concept: T, query: Nil<string>): Completable<ConceptWrapper>;
  getConceptByUri(conceptUri: string): Observable<T>;
  hasConcept(conceptUri: string): Observable<boolean>;
  getLabel(concept: T): Completable<LangString | LangStringSimple | string>;
}

export const CV_PROVIDER_TOKEN = new InjectionToken<CvProvider[]>('CvProvider');

export function provideCvProvider(type: Type<CvProvider>): Provider {
  return {
    provide: CV_PROVIDER_TOKEN,
    multi: true,
    useClass: type,
  };
}
