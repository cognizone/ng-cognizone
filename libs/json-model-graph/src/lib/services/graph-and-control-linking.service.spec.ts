import { ReactiveFormsModule } from '@angular/forms';
import { provideJsonModel } from '@cognizone/json-model';
import { CvService } from '@cognizone/legi-cv';
import { provideNgApplicationProfile } from '@cognizone/ng-application-profile';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { NgxsModule } from '@ngxs/store';

import { provideLogger } from '@cognizone/ng-core';
import { GraphState } from '../store/graph.state';

import { GraphAndControlLinkingService } from './graph-and-control-linking.service';

describe('GraphAndControlLinkingService', () => {
  let spectator: SpectatorService<GraphAndControlLinkingService>;
  const createService = createServiceFactory({
    service: GraphAndControlLinkingService,
    providers: [mockProvider(CvService), provideNgApplicationProfile(), provideLogger('TEST'), provideJsonModel()],
    imports: [ReactiveFormsModule, NgxsModule.forRoot([GraphState])],
  });

  beforeEach(() => (spectator = createService()));

  test('should be injectable', () => {
    expect(spectator.service).not.toBeUndefined();
  });
});
