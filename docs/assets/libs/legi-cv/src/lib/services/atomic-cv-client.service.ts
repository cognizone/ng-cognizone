import { InjectionToken } from '@angular/core';
import { Completable } from '@cognizone/model-utils';

import { Collection } from '../models/collection';
import { Concept } from '../models/concept';
import { ConceptScheme } from '../models/concept-scheme';

export const ATOMIC_CV_CLIENT_TOKEN = new InjectionToken<AtomicCvClient>('AtomicCvClient');

export interface AtomicCvClient {
  getConceptScheme<T extends Concept = Concept>(uri: string): Completable<ConceptScheme<T>>;
  getCollection<T extends Concept = Concept>(uri: string, conceptSchemeUri?: string): Completable<Collection<T>>;
}
