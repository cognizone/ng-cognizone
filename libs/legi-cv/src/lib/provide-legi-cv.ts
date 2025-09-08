import { EnvironmentProviders, Provider } from '@angular/core';
import { provideStates } from '@ngxs/store';

import { DEFAULT_LEGI_CV_OPTIONS, LEGI_CV_OPTIONS_TOKEN, LegiCvOptions } from './models/legi-cv-options';
import { ConceptMatcherService } from './services/concept-matcher.service';
import { CvStateService } from './services/cv-state.service';
import { CvService } from './services/cv.service';
import { elasticAtomicCvClientServiceProvider } from './services/elastic-atomic-cv-client.service';
import { LegiCvState } from './store/cv.state';

export function provideLegiCv(options: LegiCvOptions = DEFAULT_LEGI_CV_OPTIONS): (EnvironmentProviders | Provider)[] {
  return [
    provideStates([LegiCvState]),
    {
      provide: LEGI_CV_OPTIONS_TOKEN,
      useValue: options,
    },
    CvService,
    CvStateService,
    ConceptMatcherService,
    elasticAtomicCvClientServiceProvider,
  ];
}
