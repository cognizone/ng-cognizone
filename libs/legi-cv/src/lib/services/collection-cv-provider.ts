import { Inject, Provider } from '@angular/core';
import { completableToObservable } from '@cognizone/model-utils';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Collection } from '../models/collection';
import { Concept } from '../models/concept';
import { LEGI_CV_OPTIONS_TOKEN, LegiCvOptions } from '../models/legi-cv-options';

import { ATOMIC_CV_CLIENT_TOKEN, AtomicCvClient } from './atomic-cv-client.service';
import { AtomicCvProvider, AtomicCvProviderConfig } from './atomic-cv-provider';
import { ConceptMatcherService } from './concept-matcher.service';
import { CV_PROVIDER_TOKEN, CvProvider } from './cv-provider';
import { CvStateService } from './cv-state.service';

export class CollectionCvProvider extends AtomicCvProvider implements CvProvider {
  constructor(
    private cvService: CvStateService,
    @Inject(ATOMIC_CV_CLIENT_TOKEN)
    private atomicCvClient: AtomicCvClient,
    matcher: ConceptMatcherService,
    config: AtomicCvProviderConfig,
    options: LegiCvOptions
  ) {
    super(matcher, config, options);
  }

  protected getAllConcepts(): Observable<Concept[]> {
    return this.getCollection().pipe(
      map(collection => collection.member),
      tap(concepts => this.cvService.setCv({ cv: concepts, cvName: this.cvName, uri: this.cvUri })),
      switchMap(() => this.cvService.getCv(this.cvName)),
      map(dic => Object.values(dic))
    );
  }

  private getCollection(): Observable<Collection> {
    return completableToObservable(this.atomicCvClient.getCollection(this.cvUri));
  }
}

export function provideCollectionCvProvider(config: AtomicCvProviderConfig): Provider {
  return {
    multi: true,
    provide: CV_PROVIDER_TOKEN,
    useFactory: (cvService: CvStateService, atomicCvClient: AtomicCvClient, options: LegiCvOptions, matcher: ConceptMatcherService) =>
      new CollectionCvProvider(cvService, atomicCvClient, matcher, config, options),
    deps: [CvStateService, ATOMIC_CV_CLIENT_TOKEN, LEGI_CV_OPTIONS_TOKEN, ConceptMatcherService],
  };
}
