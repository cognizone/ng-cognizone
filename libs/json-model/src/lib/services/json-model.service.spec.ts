/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { ApplicationProfile } from '@cognizone/application-profile';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries -- TODO fix this
import { NgApplicationProfileModule } from '@cognizone/ng-application-profile';
import { LoggerModule } from '@cognizone/ng-core';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { JsonModelModule } from '../json-model.module';
import { JsonModel, JsonModelFlatGraph } from '../models/json-model';
import { JsonModelService } from './json-model.service';

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

  it('should create a new JsonModel based on directive ap', () => {
    const json = spectator.service.createNewJsonModel(['EUDossier', 'Event'], directiveAp);
    expect(json).toMatchSnapshot();
  });

  it('should transform treaty flat graph to JsonModel', () => {
    const json = spectator.service.fromFlatGraph(treatyGraph1, treatyAp);
    expect(json).toMatchSnapshot();
  });

  it('should transform treaty flat graph to JsonModel and back', () => {
    const jsonModel = spectator.service.fromFlatGraph(treatyGraph1, treatyAp);
    const newGraph = spectator.service.toFlatGraph(jsonModel);
    expect(newGraph).toEqual(treatyGraph1);
  });
});

function getRoot(): JsonModel {
  const rootUri = 'uri1';
  const root = {
    '@id': rootUri,
    '@type': 'root',
    '@context': {
      base: 'http://example.org/',
      prefix: {
        xsd: 'http://www.w3.org/2001/XMLSchema#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      },
    },
    a: 4,
    children: ['just a uri, the is no JsonModel'],
    sibling: null,
    aNullStuff: null,
  };

  const sibling = {
    '@id': 'uri2',
    '@type': 'root',
    b: [4, 5, 6],
    sibling: root,
  };

  const child = {
    '@id': 'uri3',
    '@type': 'root',
    a: true,
    parent: root,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (root as any).sibling = sibling;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  root.children.push(child as any);
  return root;
}
