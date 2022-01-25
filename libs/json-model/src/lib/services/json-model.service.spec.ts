import { ApplicationProfile } from '@cognizone/application-profile';
import { NgApplicationProfileModule } from '@cognizone/ng-application-profile';
import { LoggerModule } from '@cognizone/ng-core';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { JsonModelModule } from '../json-model.module';
import { JsonModel, JsonModelFlatGraph } from '../models/json-model';
import { JsonModelService } from './json-model.service';

// tslint:disable: no-require-imports no-var-requires no-any
const directiveAp: ApplicationProfile = require('../../test/directive-ap.json');
const treatyAp: ApplicationProfile = require('../../test/treaty-ap.json');
const treatyGraph1: JsonModelFlatGraph = require('../../test/treaty-process-flat-graph.json');

describe('JsonModelService', () => {
  const createService = createServiceFactory({
    service: JsonModelService,
    imports: [NgApplicationProfileModule.forRoot(), LoggerModule.forRoot('TEST'), JsonModelModule.forRoot()],
  });
  let spectator: SpectatorService<JsonModelService>;
  beforeEach(() => (spectator = createService()));

  const oldNow = Date.now.bind(Date);
  beforeAll(() => (Date.now = () => 0));
  afterAll(() => (Date.now = oldNow));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should transform to a JsonModelFlatGraph', () => {
    const root = getRoot();
    expect(spectator.service.toFlatGraph(root)).toMatchSnapshot();
  });

  test('should create a new JsonModel based on directive ap', () => {
    const json = spectator.service.createNewJsonModel(['EUDossier', 'Event'], directiveAp);
    expect(json).toMatchSnapshot();
  });

  test('should transform treaty flat graph to JsonModel', () => {
    const json = spectator.service.fromFlatGraph(treatyGraph1, treatyAp);
    expect(json).toMatchSnapshot();
  });
});

function getRoot(): JsonModel {
  const rootUri: string = 'uri1';
  const root = {
    '@id': rootUri,
    '@type': 'root',
    '@context': {
      rootUri,
    },
    a: 4,
    children: ['just a uri, the is no JsonModel'],
    sibling: null,
    aNullStuff: null,
  };

  const sibling = {
    '@id': 'uri2',
    '@type': 'root',
    '@context': {
      rootUri,
    },
    b: [4, 5, 6],
    sibling: root,
  };

  const child = {
    '@id': 'uri3',
    '@type': 'root',
    '@context': {
      rootUri,
    },
    a: true,
    parent: root,
  };

  (root as any).sibling = sibling;
  root.children.push(child as any);
  return root;
}
