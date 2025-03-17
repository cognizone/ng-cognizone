import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { JsonLdGraph } from '@cognizone/json-ld-core';
import { JsonLdService } from './json-ld.service';

describe('JsonLdService', () => {
  const createService = createServiceFactory({
    service: JsonLdService,
  });
  let spectator: SpectatorService<JsonLdService>;
  let service: JsonLdService;
  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expand json with facet', async () => {
    const result = await service.expand(json1);
    expect(result).toMatchSnapshot();
  });
});

const json1 = {
  data: [
    {
      '@id': 'https://example.org/app/cmdb',
      '@type': 'prov:SoftwareAgent',
      'dcterms:description': [
        {
          '@language': 'en',
          '@value': '??',
        },
      ],
      'dcterms:title': [
        {
          '@language': 'en',
          '@value': 'Configuration Management Database (CMDB)',
        },
      ],
      'adms:status': [
        {
          '@id': 'https://example.org/def/asset-status/inProduction',
        },
      ],
      'dcat:contactPoint': [
        {
          '@id': 'https://example.org/contact-point/document-management-unit',
        },
      ],
      'dcat:qualifiedRelation': [
        {
          '@id': 'https://example.org/relation/cmdb-gets-data-from-codict',
        },
      ],
      'prov:qualifiedAttribution': [
        {
          '@id': 'https://example.org/attribution/cmdb-application-owner',
        },
      ],
      'asset-relation:getsDataFrom': [
        {
          '@id': 'https://example.org/app/codict',
        },
      ],
    },
    {
      '@id': 'https://example.org/attribution/cmdb-data-data-owner',
      '@type': 'prov:Attribution',
      'dcat:hadRole': [
        {
          '@id': 'https://example.org/def/agent-role/dataOwner',
        },
      ],
      'prov:agent': [
        {
          '@id': 'https://example.org/org/itec-support',
        },
      ],
    },
    {
      '@id': 'https://example.org/contact-point/servicenow-support',
      '@type': 'http://www.w3.org/2006/vcard/ns#Kind',
      'http://www.w3.org/2006/vcard/ns#fn': [
        {
          '@language': 'en',
          '@value': 'ServiceNow Support',
        },
      ],
      'http://www.w3.org/2006/vcard/ns#hasEmail': [
        {
          '@id': 'mailto:servicenow-support@example.org',
        },
      ],
    },
    {
      '@id': 'https://example.org/dataset/cmdb-data',
      '@type': 'dcat:Dataset',
      'dcterms:accrualPeriodicity': [
        {
          '@id': 'https://example.org/def/frequency/continuous',
        },
      ],
      'dcterms:created': [
        {
          '@type': 'xsd:date',
          '@value': '2023-08-01',
        },
      ],
      'dcterms:description': [
        {
          '@language': 'en',
          '@value': 'CMDB stays for Configuration Management Database.',
        },
      ],
      'dcterms:issued': [
        {
          '@type': 'xsd:date',
          '@value': '2023-08-01',
        },
      ],
      'dcterms:modified': [
        {
          '@type': 'xsd:date',
          '@value': '2024-10-28',
        },
      ],
      'dcterms:title': [
        {
          '@language': 'en',
          '@value': 'Data from CMDB (Ticketing tool handling requests for IT equipment)',
        },
      ],
      'dcterms:type': [
        {
          '@id': 'https://example.org/def/dataset-type/master-data',
        },
      ],
      'adms:status': [
        {
          '@id': 'https://example.org/def/asset-status/inProduction',
        },
      ],
      'dcat:contactPoint': [
        {
          '@id': 'https://example.org/contact-point/servicenow-support',
        },
      ],
      'dcat:qualifiedRelation': [
        {
          '@id': 'https://example.org/relation/cmdb-data-stored-by-cmdb',
        },
      ],
      'dcat:theme': [
        {
          '@id': 'https://example.org/def/business-area/informationTechnology',
        },
      ],
      'prov:qualifiedAttribution': [
        {
          '@id': 'https://example.org/attribution/cmdb-data-data-owner',
        },
      ],
      'asset-relation:storedBy': [
        {
          '@id': 'https://example.org/app/cmdb',
        },
      ],
      'app:confidentialityLevel': [
        {
          '@id': 'https://example.org/def/confidentiality-level/snc',
        },
      ],
    },
    {
      '@id': 'https://example.org/def/agent-role/dataOwner',
      '@type': ['dcat:Role', 'skos:Concept'],
      'rdfs:label': [
        {
          '@language': 'en',
          '@value': 'data owner',
        },
      ],
      'skos:inScheme': [
        {
          '@id': 'https://example.org/def/agent-role',
        },
      ],
      'skos:preflabel': [
        {
          '@language': 'en',
          '@value': 'data owner',
        },
      ],
    },
    {
      '@id': 'https://example.org/def/asset-status/inProduction',
      '@type': 'skos:Concept',
      'skos:inScheme': [
        {
          '@id': 'https://example.org/def/asset-status',
        },
      ],
      'skos:prefLabel': [
        {
          '@language': 'en',
          '@value': 'In production',
        },
      ],
    },
    {
      '@id': 'https://example.org/def/business-area/informationTechnology',
      '@type': 'skos:Concept',
      'skos:inScheme': [
        {
          '@id': 'https://example.org/def/business-area',
        },
      ],
      'skos:prefLabel': [
        {
          '@language': 'en',
          '@value': 'Information Technology',
        },
      ],
    },
    {
      '@id': 'https://example.org/def/confidentiality-level/snc',
      '@type': 'skos:Concept',
      'skos:inScheme': [
        {
          '@id': 'https://example.org/def/confidentiality-level',
        },
      ],
      'skos:prefLabel': [
        {
          '@language': 'en',
          '@value': 'Sensitive non-confidential',
        },
      ],
    },
    {
      '@id': 'https://example.org/def/dataset-type/master-data',
      '@type': 'skos:Concept',
      'skos:inScheme': [
        {
          '@id': 'https://example.org/def/dataset-type',
        },
      ],
      'skos:prefLabel': [
        {
          '@language': 'en',
          '@value': 'Master Data',
        },
      ],
    },
    {
      '@id': 'https://example.org/def/frequency/continuous',
      '@type': 'skos:Concept',
      'skos:inScheme': [
        {
          '@id': 'https://example.org/def/frequency',
        },
      ],
      'skos:prefLabel': [
        {
          '@language': 'en',
          '@value': 'continuous',
        },
      ],
    },
    {
      '@id': 'https://example.org/org/itec-support',
      '@type': 'org:Organization',
      'skos:prefLabel': [
        {
          '@language': 'en',
          '@value': 'ITEC - SUPPORT',
        },
      ],
    },
    {
      '@id': 'https://example.org/relation/cmdb-data-stored-by-cmdb',
      '@type': 'dcat:Relationship',
      'dcterms:relation': [
        {
          '@id': 'https://example.org/app/cmdb',
        },
      ],
      'dcterms:type': [
        {
          '@id': 'asset-relation:storedBy',
        },
      ],
    },
  ],
  '@context': {
    '@vocab': 'https://example.org/def/dcat#',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
    skos: 'http://www.w3.org/2004/02/skos/core#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    'asset-relation': 'https://example.org/def/asset-relation/',
    app: 'https://example.org/def/epdp#',
    dcterms: 'http://purl.org/dc/terms/',
    dcat: 'http://www.w3.org/ns/dcat#',
    prov: 'http://www.w3.org/ns/prov#',
    adms: 'http://www.w3.org/ns/adms#',
    org: 'http://www.w3.org/ns/org#',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    data: '@graph',
  },
  facets: {
    rootUri: 'https://example.org/dataset/cmdb-data',
    config: 'dataset',
    types: ['http://www.w3.org/ns/dcat#Dataset', 'http://www.w3.org/ns/dcat#Dataset'],
  },
} as unknown as JsonLdGraph;
