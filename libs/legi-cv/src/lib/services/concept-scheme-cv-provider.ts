import { Inject, Provider } from '@angular/core';
import { completableToObservable } from '@cognizone/model-utils';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Concept } from '../models/concept';
import { ConceptScheme } from '../models/concept-scheme';
import { LEGI_CV_OPTIONS_TOKEN, LegiCvOptions } from '../models/legi-cv-options';

import { ATOMIC_CV_CLIENT_TOKEN, AtomicCvClient } from './atomic-cv-client.service';
import { AtomicCvProvider, AtomicCvProviderConfig } from './atomic-cv-provider';
import { ConceptMatcherService } from './concept-matcher.service';
import { CV_PROVIDER_TOKEN, CvProvider } from './cv-provider';
import { CvStateService } from './cv-state.service';

export class ConceptSchemeCvProvider extends AtomicCvProvider implements CvProvider {
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
    return this.getConceptScheme().pipe(
      map(scheme => this.extractConcepts(scheme)),
      tap(concepts => this.cvService.setCv({ cv: concepts, cvName: this.cvName, uri: this.cvUri })),
      switchMap(() => this.cvService.getCv(this.cvName)),
      map(dic => Object.values(dic))
    );
  }

  private getConceptScheme(): Observable<ConceptScheme> {
    return completableToObservable(this.atomicCvClient.getConceptScheme(this.cvUri));
  }

  private extractConcepts(scheme: ConceptScheme): Concept[] {
    const allConcepts: Concept[] = [];
    (scheme.hasTopConcept ?? []).forEach(concept => {
      allConcepts.push(concept);
      this.extractNarrower(concept, allConcepts);
    });

    return allConcepts;
  }

  private extractNarrower(concept: Concept, acc: Concept[]): void {
    if (!concept.narrower) return;
    concept.narrower.forEach(narrower => {
      acc.push(narrower);
      this.extractNarrower(narrower, acc);
    });
  }
}

export function provideConceptSchemeCvProvider(config: AtomicCvProviderConfig): Provider {
  return {
    multi: true,
    provide: CV_PROVIDER_TOKEN,
    useFactory: (cvService: CvStateService, atomicCvClient: AtomicCvClient, options: LegiCvOptions, matcher: ConceptMatcherService) =>
      new ConceptSchemeCvProvider(cvService, atomicCvClient, matcher, config, options),
    deps: [CvStateService, ATOMIC_CV_CLIENT_TOKEN, LEGI_CV_OPTIONS_TOKEN, ConceptMatcherService],
  };
}
