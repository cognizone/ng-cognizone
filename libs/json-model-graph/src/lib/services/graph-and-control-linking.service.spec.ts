import { ReactiveFormsModule } from '@angular/forms';
import { JsonModelModule } from '@cognizone/json-model';
import { CvService } from '@cognizone/legi-cv';
import { NgApplicationProfileModule } from '@cognizone/ng-application-profile';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { NgxsModule } from '@ngxs/store';

import { GraphState } from '../store/graph.state';

import { GraphAndControlLinkingService } from './graph-and-control-linking.service';

describe('GraphAndControlLinkingService', () => {
  let spectator: SpectatorService<GraphAndControlLinkingService>;
  const createService = createServiceFactory({
    service: GraphAndControlLinkingService,
    providers: [mockProvider(CvService)],
    imports: [ReactiveFormsModule, NgApplicationProfileModule.forRoot(), NgxsModule.forRoot([GraphState]), JsonModelModule.forRoot()],
  });

  beforeEach(() => (spectator = createService()));

  test('should be injectable', () => {
    expect(spectator.service).not.toBeUndefined();
  });
});
