/* eslint-disable @typescript-eslint/no-explicit-any */

import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { PrefixService } from './prefix.service';

describe('PrefixService', () => {
  const createService = createServiceFactory({
    service: PrefixService,
  });

  let spectator: SpectatorService<PrefixService>;

  beforeEach(() => {
    spectator = createService();
    spectator.service.setContext({
      base: 'http://example.com/',
      prefix: {
        ':': 'http://another-base#',
        xsd: 'http://www.w3.org/2001/XMLSchema#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      },
    });
  });

  it(`should exist`, () => {
    expect(spectator.service).toBeTruthy();
  });

  const expansionTests: [string, string][] = [
    ['http://example.com/', 'http://example.com/'],
    ['http://example.com/abc', 'http://example.com/abc'],
    ['abc', 'http://example.com/abc'],
    ['http://another-base#something', 'http://another-base#something'],
    [':', 'http://another-base#'],
    [':abc', 'http://another-base#abc'],
    ['xsd:abc', 'http://www.w3.org/2001/XMLSchema#abc'],
    ['rdf:abc', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#abc'],
    ['rdfs:abc', 'http://www.w3.org/2000/01/rdf-schema#abc'],
    ['unknown:abc', 'unknown:abc'],
  ];

  expansionTests.forEach(([input, expected]) => {
    it(`should expand ${input} to ${expected}`, () => {
      expect(spectator.service.expandUri(input)).toBe(expected);
    });
  });

  const compactingTests: [string, string][] = [
    ['http://example.com/', ''],
    ['http://example.com/abc', 'abc'],
    ['http://another-base#abc', ':abc'],
    ['http://another-base#', ':'],
    ['http://www.w3.org/2001/XMLSchema#abc', 'xsd:abc'],
    ['http://www.w3.org/1999/02/22-rdf-syntax-ns#abc', 'rdf:abc'],
    ['http://www.w3.org/2000/01/rdf-schema#abc', 'rdfs:abc'],
    ['unknown:abc', 'unknown:abc'],
  ];

  compactingTests.forEach(([input, expected]) => {
    it(`should expand ${input} to ${expected}`, () => {
      expect(spectator.service.compactUri(input)).toBe(expected);
    });
  });
});
