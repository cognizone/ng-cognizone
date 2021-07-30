import { ModuleWithProviders, NgModule } from '@angular/core';

import { CvLabelDirective } from './directives/cv-label.directive';
import { CvOptionsDirective } from './directives/cv-options.directive';
import { CvValueDirective } from './directives/cv-value.directive';
import { DEFAULT_LEGI_CV_OPTIONS, LEGI_CV_OPTIONS_TOKEN, LegiCvOptions } from './models/legi-cv-options';
import { ConceptMatcherService } from './services/concept-matcher.service';
import { CvStateService } from './services/cv-state.service';
import { CvService } from './services/cv.service';
import { elasticAtomicCvClientServiceProvider } from './services/elastic-atomic-cv-client.service';

const directives = [CvLabelDirective, CvOptionsDirective, CvValueDirective];

@NgModule({
  declarations: [...directives],
  imports: [],
  exports: [...directives],
})
export class LegiCvModule {
  static forRoot(options: LegiCvOptions = DEFAULT_LEGI_CV_OPTIONS): ModuleWithProviders<LegiCvModule> {
    return {
      ngModule: LegiCvModule,
      providers: [
        {
          provide: LEGI_CV_OPTIONS_TOKEN,
          useValue: options,
        },
        CvService,
        CvStateService,
        ConceptMatcherService,
        elasticAtomicCvClientServiceProvider,
      ],
    };
  }
}
