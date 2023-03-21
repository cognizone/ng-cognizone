/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { TypedResourceGraph } from '@cognizone/model-utils';
import { LoggerModule } from '@cognizone/ng-core';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { ApplicationProfile } from '@cognizone/application-profile';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NgApplicationProfileModule } from '@cognizone/ng-application-profile';
import { JsonModel } from '../models/json-model';

import { JsonModelModule } from '../json-model.module';
import { ResourceGraphService } from './resource-graph.service';

const directiveAp: ApplicationProfile = require('../../test/directive-ap.json');
const treatyAp: ApplicationProfile = require('../../test/treaty-ap.json');
const draftAp: ApplicationProfile = require('../../test/lux-legipro-ap.json');
const treatyProcess1: JsonModel = require('../../test/data/treaty-json-model-1.json');
const rawResourceGraph1: TypedResourceGraph = require('../../test/data/casemates-concept-1.json');
const rawResourceGraph2: TypedResourceGraph = require('../../test/data/directives-eudossier-2.json');
const rawResourceGraph3: TypedResourceGraph = require('../../test/data/directives-eudossier-1.json');
const rawResourceGraph4: TypedResourceGraph = require('../../test/data/legiswiss-act-1.json');
const rawDraft1: TypedResourceGraph = require('../../test/data/draft-1.json');
const rawDraft2: TypedResourceGraph = require('../../test/data/draft-2.json');
const rawDraft3: TypedResourceGraph = require('../../test/data/draft-3.json');

describe('ResourceGraphService', () => {
  const createService = createServiceFactory({
    service: ResourceGraphService,
    imports: [JsonModelModule.forRoot(), NgApplicationProfileModule.forRoot(), LoggerModule.forRoot('TEST')],
  });

  let spectator: SpectatorService<ResourceGraphService>;

  beforeEach(() => (spectator = createService()));

  it('should be injectable', () => {
    expect(spectator.service).not.toBeUndefined();
  });

  it('should transform ResourceGraph 1 to JsonModel', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph1);
    expect(json).toMatchSnapshot();
  });

  it('should transform ResourceGraph 2 to JsonModel', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph2);
    expect(json).toMatchSnapshot();
  });

  it('should deserialize then serialize ResourceGraph 2', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph2);
    const newRaw = spectator.service.jsonModelToResourceGraphRaw(json, directiveAp);
    expect(newRaw).toEqual(rawResourceGraph2);
  });

  it('should transform ResourceGraph 2 and flatten it with ap', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph2, directiveAp) as JsonModel & {
      eventRiskLevel: string;
    };
    expect(json.eventRiskLevel).toBe('http://resource/my-domain/6');
  });

  it('should transform ResourceGraph 2 and not it flatten without ap', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph2) as JsonModel & {
      eventRiskLevel: string[];
    };
    expect(json.eventRiskLevel).toMatchObject(['http://resource/my-domain/6']);
  });

  it('should transform ResourceGraph 3 to JsonModel', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph3);
    expect(json).toMatchSnapshot();
  });

  it('should deserialize then serialize ResourceGraph 3', () => {
    const jsonLd = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph3);
    const newRaw = spectator.service.jsonModelToResourceGraphRaw(jsonLd, directiveAp);
    expect(newRaw).toEqual(rawResourceGraph3);
  });

  it('should transform ResourceGraph 4 to JsonModel', () => {
    const jsonLd = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph4);
    expect(jsonLd).toMatchSnapshot();
  });

  it('should transform ResourceGraph 5 to JsonModel (circular graph)', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph5);
    expect(json).toMatchSnapshot();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((json as any).child.child.grandParent).toBe(json);
  });

  it('should deserialize then serialize ResourceGraph 5 (circular graph)', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph5);
    const newRaw = spectator.service.jsonModelToResourceGraphRaw(json, ap5);
    expect(newRaw).toEqual(rawResourceGraph5);
  });

  it('should deserialize big json', () => {
    const json = require('../../test/legal-taxonomy.json').hits.hits[0]._source;
    const model = spectator.service.resourceGraphRawToJsonModel(json);
    // we just test that it succeeded
    expect(model).toBeTruthy();
  });

  it('should serialize treaty process 1', () => {
    const model = spectator.service.jsonModelToResourceGraphRaw(treatyProcess1, treatyAp);
    model?.included?.forEach(d => {
      expect(JSON.stringify(d) !== '');
    });
    expect(model).toMatchSnapshot();
  });

  it('should serialize treaty and remove unknown attribute', () => {
    jest.spyOn(console, 'warn').mockImplementation();
    const model = {
      '@id': 'https://fedlex.data.admin.ch/treatyProcess/9999/5414',
      '@type': 'TreatyProcess',
      treatyProcessHasResultingTreatyDocument: [],
      treatyCommentAboutValidity: [],
      treatySubject: [],
      treatyLimitDateForSignature: [],
      institutionInChargeOfTheTreatyLevel2: [],
      treatyComment: [],
      treatyHasRatificationRestriction: [],
      treatyNotificationPublishedInLabel: [],
      treatyDescription: [],
      treatyHasEntryIntoForceScope: [],
      treatyNotificationPublishedIn: [],
      committeeCreationBasedOn: [],
      treatyLimitDateForSignatureComment: [],
      treatyPartyCountry: [],
      titleTreaty: {},
      treatyPartyOrganisation: [],
      treatyAppliesEULegalResource: [
        {
          '@id': 'http://publications.europa.eu/resource/cellar/d67cf7eb-de13-4bcb-9959-0dc0107e102e',
          '@type': 'EULegalResource',
        },
      ],
      treatyRelatedLegalResource: [],
      confidentialTreaty: undefined,
      treatyInForceStatusForOurCountry: undefined,
      institutionInChargeOfTheTreaty: undefined,
      treatyConsolidatedBy: undefined,
      needForOfficialPublication: undefined,
      treatyLegalResourceForOtherParty: undefined,
      treatyOtherPublicationReference: undefined,
      anAttributeThatIsNowhereToBeFound: [4, 5, 6], // this should not be serialized
    };

    const raw = spectator.service.jsonModelToResourceGraphRaw(model, treatyAp);
    expect(raw).toMatchSnapshot();
    expect(console.warn).toHaveBeenCalled();
  });

  describe.only('or range rule on datatype', () => {
    it('should deserialize then serialize draft 1 (or on rapporteurChambreDeputesLabel, xsd:string)', () => {
      const json = spectator.service.resourceGraphRawToJsonModel(rawDraft1, draftAp);
      const newRaw = spectator.service.jsonModelToResourceGraphRaw(json, draftAp);
      checkRawEquality(newRaw, rawDraft1, ['internalId']);
    });

    it('should deserialize then serialize draft 2 (or on rapporteurChambreDeputesLabel, xsd:string)', () => {
      const json = spectator.service.resourceGraphRawToJsonModel(rawDraft2, draftAp);
      const newRaw = spectator.service.jsonModelToResourceGraphRaw(json, draftAp);
      checkRawEquality(newRaw, rawDraft2, ['internalId']);
    });

    it('should deserialize then serialize draft 3 (or on rapporteurChambreDeputesLabel, rdfs:Resource)', () => {
      const json = spectator.service.resourceGraphRawToJsonModel(rawDraft3, draftAp);
      const newRaw = spectator.service.jsonModelToResourceGraphRaw(json, draftAp);
      checkRawEquality(newRaw, rawDraft3, ['internalId']);
    });

    it('should deserialize then serialize draft 4 (or on rapporteurChambreDeputesLabel, rdfs:Resource)', () => {
      const json = spectator.service.resourceGraphRawToJsonModel(rawDraft3, draftAp);
      const newRaw = spectator.service.jsonModelToResourceGraphRaw(json, draftAp);
      checkRawEquality(newRaw, rawDraft3, ['internalId']);
    });
  });
});

// circular graph
const rawResourceGraph5: TypedResourceGraph = {
  data: {
    uri: 'uri1',
    type: 'root',
    references: {
      child: 'uri2',
    },
  },
  included: [
    {
      uri: 'uri2',
      type: 'root',
      references: {
        child: 'uri3',
      },
    },
    {
      uri: 'uri3',
      type: 'grandChild',
      references: {
        grandParent: 'uri1',
      },
    },
  ],
};

const ap5: ApplicationProfile = {
  uri: 'ap5',
  types: {
    root: {
      classIds: ['root'],
      rules: [{ name: 'rdfTypes', value: ['root'] }],
      attributes: {
        child: {
          attributeId: 'child',
          rules: [{ name: 'range', value: { name: 'classId', value: 'root' } }],
          uri: 'uri:child',
        },
      },
    },
    grandChild: {
      classIds: ['grandChild'],
      rules: [{ name: 'rdfTypes', value: ['grandChild'] }],
      attributes: {
        grandParent: {
          attributeId: 'grandParent',
          rules: [{ name: 'range', value: { name: 'classId', value: 'root' } }],
          uri: 'uri:grandParent',
        },
      },
    },
  },
};

function checkRawEquality(x: TypedResourceGraph | undefined, y: TypedResourceGraph | undefined, ignoredAttributes: string[] = []): void {
  const getSortedNodes = (a: TypedResourceGraph) =>
    [a.data, ...(a.included ?? [])]
      .sort((b, c) => b.uri.localeCompare(c.uri))
      .map(node => {
        const newNode = { ...node, rootType: undefined };
        if (newNode.attributes) {
          ignoredAttributes.forEach(field => delete newNode.attributes?.[field]);
        }
        return newNode;
      });

  const allX = x ? getSortedNodes(x) : [];
  const allY = y ? getSortedNodes(y) : [];

  expect(allX.length).toEqual(allY.length);
  expect(allX).toEqual(allY);
}
