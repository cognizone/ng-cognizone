import { TypedResourceGraph } from '@cognizone/model-utils';
import { LoggerModule } from '@cognizone/ng-core';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { JsonModel } from '../models/json-model';
import { ApplicationProfile } from '@cognizone/application-profile';
import { NgApplicationProfileModule } from '@cognizone/ng-application-profile';

import { ResourceGraphService } from './resource-graph.service';
import { JsonModelModule } from '../json-model.module';

// tslint:disable: no-require-imports no-var-requires
const directiveAp: ApplicationProfile = require('../../test/directive-ap.json');
const treatyAp: ApplicationProfile = require('../../test/treaty-ap.json');
const treatyProcess1: JsonModel = require('../../test/data/treaty-json-model-1.json');

describe('ResourceGraphService', () => {
  const createService = createServiceFactory({
    service: ResourceGraphService,
    imports: [JsonModelModule.forRoot(), NgApplicationProfileModule.forRoot(), LoggerModule.forRoot('TEST')],
  });

  let spectator: SpectatorService<ResourceGraphService>;

  beforeEach(() => (spectator = createService()));

  test('should be injectable', () => {
    expect(spectator.service).not.toBeUndefined();
  });

  test('should transform ResourceGraph 1 to JsonModel', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph1);
    expect(json).toMatchSnapshot();
  });

  test('should transform ResourceGraph 2 to JsonModel', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph2);
    expect(json).toMatchSnapshot();
  });

  test('should deserialize then serialize ResourceGraph 2', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph2);
    const newRaw = spectator.service.jsonModelToResourceGraphRaw(json, directiveAp);
    expect(newRaw).toEqual(rawResourceGraph2);
  });

  test('should transform ResourceGraph 2 and flatten it with ap', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph2, directiveAp) as {
      eventRiskLevel: string;
    } & JsonModel;
    expect(json.eventRiskLevel).toBe('4 or something');
  });

  test('should transform ResourceGraph 2 and not it flatten without ap', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph2) as {
      eventRiskLevel: string[];
    } & JsonModel;
    expect(json.eventRiskLevel).toMatchObject(['4 or something']);
  });

  test('should transform ResourceGraph 3 to JsonModel', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph3);
    expect(json).toMatchSnapshot();
  });

  test('should deserialize then serialize ResourceGraph 3', () => {
    const jsonLd = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph3);
    const newRaw = spectator.service.jsonModelToResourceGraphRaw(jsonLd, directiveAp);
    expect(newRaw).toEqual(rawResourceGraph3);
  });

  test('should transform ResourceGraph 4 to JsonModel', () => {
    const jsonLd = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph4);
    expect(jsonLd).toMatchSnapshot();
  });

  test('should transform ResourceGraph 5 to JsonModel (circular graph)', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph5);
    expect(json).toMatchSnapshot();
    // tslint:disable-next-line: no-any
    expect((json as any).child.child.grandParent).toBe(json);
  });

  test('should deserialize then serialize ResourceGraph 5 (circular graph)', () => {
    const json = spectator.service.resourceGraphRawToJsonModel(rawResourceGraph5);
    const newRaw = spectator.service.jsonModelToResourceGraphRaw(json, ap5);
    expect(newRaw).toEqual(rawResourceGraph5);
  });

  test('should deserialize big json', () => {
    // tslint:disable-next-line: no-require-imports
    const json = require('../../test/legal-taxonomy.json').hits.hits[0]._source;
    const model = spectator.service.resourceGraphRawToJsonModel(json);
    // we just test that it succeeded
    expect(model).toBeTruthy();
  });

  test('should serialize treaty process 1', () => {
    const model = spectator.service.jsonModelToResourceGraphRaw(treatyProcess1, treatyAp);
    model?.included?.forEach(d => {
      expect(JSON.stringify(d) !== '');
    });
    expect(model).toMatchSnapshot();
  });

  test('should serialize treaty and remove unknown attribute', () => {
    // tslint:disable-next-line: no-require-imports
    const model = {
      '@id': 'https://fedlex.data.admin.ch/treatyProcess/9999/5414',
      '@type': 'TreatyProcess',
      '@context': {
        rootUri: 'https://fedlex.data.admin.ch/treatyProcess/9999/5414',
      },
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
          '@context': {
            rootUri: 'https://fedlex.data.admin.ch/treatyProcess/9999/5414',
          },
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
  });
});

// from Casemates + facets
const rawResourceGraph1: TypedResourceGraph = {
  facets: {
    some: 'thing',
  },
  data: {
    uri: 'http://data.legilux.public.lu/resource/authority/draft-document-type/1',
    type: 'Concept',
    references: {
      inScheme: ['http://data.legilux.public.lu/resource/authority/draft-document-type'],
      topConceptOf: ['http://data.legilux.public.lu/resource/authority/draft-document-type'],
      status: ['http://publications.europa.eu/resource/authority/concept-status/CURRENT'],
    },
    attributes: {
      created: { 'xsd:dateTime': ['2018-03-01T00:00:00.000Z'] },
      prefLabel: { 'rdf:langString': { fr: ["projet d'arrêté grand-ducal"] } },
      definition: {
        'rdf:langString': { fr: ["Documents concernant le projet d'arrêté grand-ducal (texte de l'arrêté et pièces afférentes)"] },
      },
    },
  },
  included: [
    { uri: 'http://data.legilux.public.lu/resource/authority/draft-document-type', type: 'ConceptScheme' },
    {
      uri: 'http://publications.europa.eu/resource/authority/concept-status/CURRENT',
      type: 'Concept',
      attributes: {
        identifier: { 'xsd:string': ['CURRENT'] },
        prefLabel: {
          'rdf:langString': {
            de: ['aktuell'],
            sv: ['gällande'],
            fi: ['nykyinen'],
            pt: ['comum'],
            bg: ['актуално'],
            mt: ['attwali'],
            el: ['ισχύει'],
            lt: ['dabartinis'],
            en: ['current'],
            lv: ['pašreizējs'],
            hr: ['trenutačni'],
            it: ['attuale'],
            fr: ['en vigueur'],
            hu: ['aktuális'],
            es: ['actual'],
            et: ['praegune'],
            cs: ['stávájící'],
            sk: ['súčasný'],
            sl: ['sedanje'],
            ga: ['i bhfeidhm'],
            pl: ['obecny'],
            da: ['gældende'],
            ro: ['actual'],
            nl: ['actueel'],
          },
        },
        authorityCode: { 'xsd:string': ['CURRENT'] },
        startUse: { 'xsd:string': ['2009-12-01'] },
        opCode: { 'xsd:string': ['CURRENT'] },
      },
      references: { inScheme: ['http://publications.europa.eu/resource/authority/concept-status'] },
    },
    { uri: 'http://publications.europa.eu/resource/authority/concept-status', type: 'ConceptScheme' },
  ],
};

// eudossier form directives
const rawResourceGraph2: TypedResourceGraph = {
  data: {
    uri: 'http://publications.europa.eu/resource/cellar/3b417b98-d0e9-11e1-905c-01aa75ed71a1',
    type: ['EUDossier', 'Event'],
    attributes: {
      identifier: { 'xsd:string': ['1983/1041/CNS'] },
      eventRiskLevel: { 'rdfs:Resource': ['4 or something'] },
      title: {
        'rdf:langString': {
          fr: [
            "PROPOSITION DE DIRECTIVE DU CONSEILPROROGEANT LA DEROGATION ACCORDEE A L'IRLANDE EN MATIERE DE TAXES SUR LE CHIFFRE D'AFFAIRES ET D'ACCISES APPLICABLES DANS LE TRAFIC INTERNATIONAL DE VOYAGEURS",
          ],
        },
      },
    },
    references: {
      initiatedByActPreparatory: ['http://publications.europa.eu/resource/cellar/bf93a1e3-0c39-11e4-a7d0-01aa75ed71a1'],
      initiatesTransposition: 'http://data.legilux.public.lu/resource/transposition/e9ce66c3-c0cf-477b-bf57-eae1c4c1e8f6',
      isAboutConceptTypeDossier: ['http://publications.europa.eu/resource/authority/fd_612/1130'],
    },
  },
  included: [
    {
      uri: 'http://publications.europa.eu/resource/cellar/bf93a1e3-0c39-11e4-a7d0-01aa75ed71a1',
      type: ['EUPreparatoryAct', 'Work'],
      attributes: {
        dateDocument: { 'xsd:date': ['1983-12-20'] },
        preparatoryActCelexId: { 'xsd:string': ['51983PC0786'] },
        preparatoryActReference: { 'xsd:string': ['CS/1983/11591/83/FISC111', 'JO C/1984/17/6', 'COM/1983/786/FINAL', '1/1983/1307'] },
        title: {
          'rdf:langString': {
            fr: [
              "PROPOSITION DE DIRECTIVE DU CONSEIL PROROGEANT LA DEROGATION ACCORDEE A L' IRLANDE EN MATIERE DE TAXES SUR LE CHIFFRE D' AFFAIRES ET D' ACCISES APPLICABLES DANS LE TRAFIC INTERNATIONAL DE VOYAGEURS",
            ],
          },
        },
      },
      references: { responsibilityOfEUInstitution: ['http://publications.europa.eu/resource/authority/corporate-body/DG15'] },
    },
    { uri: 'http://publications.europa.eu/resource/authority/corporate-body/DG15', type: ['Concept', 'EULegalInstitution'] },
    {
      uri: 'http://data.legilux.public.lu/resource/transposition/e9ce66c3-c0cf-477b-bf57-eae1c4c1e8f6',
      type: ['Event', 'Transposition'],
      references: {
        hasTranspositionAction: ['http://data.legilux.public.lu/resource/transpositionaction/636d0338-0c7a-4e5e-9a1e-5501199f7c17'],
      },
      attributes: { transpositionRequestedCorrespondenceTable: { 'xsd:boolean': false } },
    },
    {
      uri: 'http://data.legilux.public.lu/resource/transpositionaction/636d0338-0c7a-4e5e-9a1e-5501199f7c17',
      type: ['Event', 'TranspositionAction'],
      attributes: { created: { 'xsd:dateTime': '2019-09-12T05:04:37.039Z' } },
      references: { transpositionActionType: 'http://data.legilux.public.lu/resource/authority/transposition-action-type/6' },
    },
    { uri: 'http://data.legilux.public.lu/resource/authority/transposition-action-type/6', type: ['Concept', 'TranspositionActionType'] },
    { uri: 'http://publications.europa.eu/resource/authority/fd_612/1130', type: ['Concept', 'EUDossierType'] },
  ],
};

// eudossier form directives
const rawResourceGraph3: TypedResourceGraph = {
  data: {
    uri: 'http://publications.europa.eu/resource/cellar/6b71aff2-d243-11e1-905c-01aa75ed71a1',
    type: ['EUDossier', 'Event'],
    attributes: {
      identifier: { 'xsd:string': ['1990/0313/COD'] },
      title: {
        'rdf:langString': {
          fr: [
            "PROPOSITION DE DIRECTIVE DU PARLEMENT EUROPEEN ET DU CONSEILMODIFIANT LA DIRECTIVE 76/308/CEE CONCERNANT L'ASSISTANCE MUTUELLE EN MATIERE DE RECOUVREMENT DES CREANCES RESULTANT D'OPERATIONS FAISANT PARTIE DU SYSTEME DE FINANCEMENT DU FONDS EUROPEEN D'ORIENTATION ET DE GARANTIE AGRICOLE, AINSI QUE DE PRELEVEMENTS AGRICOLES ET DE DROITS DE DOUANE, ET RELATIVE A LA TAXE SUR LA VALEUR AJOUTEE",
          ],
        },
      },
    },
    references: {
      initiatedByActPreparatory: ['http://publications.europa.eu/resource/cellar/2224d5cc-2c56-429a-b9a8-5d13207dbed1'],
      initiatesTransposition: 'http://data.legilux.public.lu/resource/transposition/7b8834e4-2016-4605-9fe1-c66418f6f62d',
      isAboutConceptTypeDossier: ['http://publications.europa.eu/resource/authority/fd_612/1130'],
    },
  },
  included: [
    {
      uri: 'http://publications.europa.eu/resource/cellar/2224d5cc-2c56-429a-b9a8-5d13207dbed1',
      type: ['EUPreparatoryAct', 'Work'],
      attributes: {
        dateDocument: { 'xsd:date': ['1990-11-20'] },
        preparatoryActCelexId: { 'xsd:string': ['51990PC0525'] },
        preparatoryActReference: { 'xsd:string': ['CS/1990/10402', 'COM/1990/525/FINAL', 'JO C/1990/306/7'] },
        title: {
          'rdf:langString': {
            fr: [
              "PROPOSITION DE DIRECTIVE DU PARLEMENT EUROPEEN ET DU CONSEIL MODIFIANT LA DIRECTIVE 76/308/CEE CONCERNANT L' ASSISTANCE MUTUELLE EN MATIERE DE RECOUVREMENT DES CREANCES RESULTANT D' OPERATIONS FAISANT PARTIE DU SYSTEME DE FINANCEMENT DU FONDS EUROPEEN D' ORIENTATION ET DE GARANTIE AGRICOLE, AINSI QUE DE PRELEVEMENTS AGRICOLES ET DE DROITS DE DOUANE, ET RELATIVE A LA TAXE SUR LA VALEUR AJOUTEE",
            ],
          },
        },
      },
      references: {
        preparatoryActSubject: [
          'http://eurovoc.europa.eu/3167',
          'http://eurovoc.europa.eu/1015',
          'http://eurovoc.europa.eu/4078',
          'http://eurovoc.europa.eu/4585',
          'http://eurovoc.europa.eu/206',
          'http://eurovoc.europa.eu/978',
          'http://eurovoc.europa.eu/2591',
        ],
        responsibilityOfEUInstitution: ['http://publications.europa.eu/resource/authority/corporate-body/TAXUD'],
      },
    },
    { uri: 'http://eurovoc.europa.eu/3167', type: 'Concept' },
    { uri: 'http://eurovoc.europa.eu/1015', type: 'Concept' },
    { uri: 'http://eurovoc.europa.eu/4078', type: 'Concept' },
    { uri: 'http://eurovoc.europa.eu/4585', type: 'Concept' },
    { uri: 'http://eurovoc.europa.eu/206', type: 'Concept' },
    { uri: 'http://eurovoc.europa.eu/978', type: 'Concept' },
    { uri: 'http://eurovoc.europa.eu/2591', type: 'Concept' },
    { uri: 'http://publications.europa.eu/resource/authority/corporate-body/TAXUD', type: ['Concept', 'EULegalInstitution'] },
    {
      uri: 'http://data.legilux.public.lu/resource/transposition/7b8834e4-2016-4605-9fe1-c66418f6f62d',
      type: ['Event', 'Transposition'],
      references: {
        hasTranspositionAction: ['http://data.legilux.public.lu/resource/transpositionaction/2d55604c-2322-4984-a275-785d75094163'],
      },
      attributes: { transpositionRequestedCorrespondenceTable: { 'xsd:boolean': false } },
    },
    {
      uri: 'http://data.legilux.public.lu/resource/transpositionaction/2d55604c-2322-4984-a275-785d75094163',
      type: ['Event', 'TranspositionAction'],
      attributes: { created: { 'xsd:dateTime': '2019-09-12T05:04:56.336Z' } },
      references: { transpositionActionType: 'http://data.legilux.public.lu/resource/authority/transposition-action-type/6' },
    },
    { uri: 'http://data.legilux.public.lu/resource/authority/transposition-action-type/6', type: ['Concept', 'TranspositionActionType'] },
    { uri: 'http://publications.europa.eu/resource/authority/fd_612/1130', type: ['Concept', 'EUDossierType'] },
  ],
};

// from legiswiss
const rawResourceGraph4: TypedResourceGraph = {
  data: {
    uri: 'https://fedlex.data.admin.ch/eli/oc/2014/797',
    type: ['Act', 'Work'],
    references: {
      isRealizedBy: [
        'https://fedlex.data.admin.ch/eli/oc/2014/797/it',
        'https://fedlex.data.admin.ch/eli/oc/2014/797/fr',
        'https://fedlex.data.admin.ch/eli/oc/2014/797/de',
      ],
    },
    attributes: {
      dateEntryInForce: { 'xsd:date': ['2015-01-01'] },
      publicationDate: { 'xsd:date': ['2014-12-23'] },
      dateDocument: { 'xsd:date': ['2014-12-23'] },
    },
  },
  included: [
    {
      uri: 'https://fedlex.data.admin.ch/eli/oc/2014/797/it',
      type: 'Expression',
      references: {
        isEmbodiedBy: ['https://fedlex.data.admin.ch/eli/oc/2014/797/it/doc', 'https://fedlex.data.admin.ch/eli/oc/2014/797/it/pdf'],
      },
    },
    {
      uri: 'https://fedlex.data.admin.ch/eli/oc/2014/797/fr',
      type: 'Expression',
      references: {
        isEmbodiedBy: ['https://fedlex.data.admin.ch/eli/oc/2014/797/fr/pdf', 'https://fedlex.data.admin.ch/eli/oc/2014/797/fr/doc'],
      },
    },
    {
      uri: 'https://fedlex.data.admin.ch/eli/oc/2014/797/de',
      type: 'Expression',
      references: {
        isEmbodiedBy: ['https://fedlex.data.admin.ch/eli/oc/2014/797/de/pdf', 'https://fedlex.data.admin.ch/eli/oc/2014/797/de/doc'],
      },
    },
    {
      uri: 'https://fedlex.data.admin.ch/eli/oc/2014/797/it/doc',
      type: 'Manifestation',
      attributes: { isExemplifiedBy: { 'rdfs:Resource': ['http://cpo-data.cogni.zone/20161206/kavworkflow/X/i/as/2014/4715.doc'] } },
    },
    {
      uri: 'https://fedlex.data.admin.ch/eli/oc/2014/797/it/pdf',
      type: 'Manifestation',
      attributes: { isExemplifiedBy: { 'rdfs:Resource': ['http://cpo-data.cogni.zone/20161206/kavworkflow/X/i/as/2014/4715.pdf'] } },
    },
    {
      uri: 'https://fedlex.data.admin.ch/eli/oc/2014/797/fr/pdf',
      type: 'Manifestation',
      attributes: { isExemplifiedBy: { 'rdfs:Resource': ['http://cpo-data.cogni.zone/20161206/kavworkflow/X/f/as/2014/4715.pdf'] } },
    },
    {
      uri: 'https://fedlex.data.admin.ch/eli/oc/2014/797/fr/doc',
      type: 'Manifestation',
      attributes: { isExemplifiedBy: { 'rdfs:Resource': ['http://cpo-data.cogni.zone/20161206/kavworkflow/X/f/as/2014/4715.doc'] } },
    },
    {
      uri: 'https://fedlex.data.admin.ch/eli/oc/2014/797/de/pdf',
      type: 'Manifestation',
      attributes: { isExemplifiedBy: { 'rdfs:Resource': ['http://cpo-data.cogni.zone/20161206/kavworkflow/X/d/as/2014/4715.pdf'] } },
    },
    {
      uri: 'https://fedlex.data.admin.ch/eli/oc/2014/797/de/doc',
      type: 'Manifestation',
      attributes: { isExemplifiedBy: { 'rdfs:Resource': ['http://cpo-data.cogni.zone/20161206/kavworkflow/X/d/as/2014/4715.doc'] } },
    },
  ],
};

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
