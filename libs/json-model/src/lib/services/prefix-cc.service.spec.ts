import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { TypedResourceContext } from '@cognizone/model-utils';
import { PrefixCcService } from './prefix-cc.service';

describe('PrefixCcService', () => {
  const createService = createServiceFactory({
    service: PrefixCcService,
  });

  let spectator: SpectatorService<PrefixCcService>;

  beforeEach(() => {
    spectator = createService();
    const context: TypedResourceContext = {
      base: 'http://resource/',
      prefix: {
        ':': 'http://another-base#',
        xsd: 'http://www.w3.org/2001/XMLSchema#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      },
    };
    spectator.service.setGlobalContext(context);
  });

  const uris = [
    ['xsd:string', 'http://www.w3.org/2001/XMLSchema#string'],
    ['rdf:langString', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'],
    ['foo', 'http://resource/foo'],
    ['', 'http://resource/'],
    [':something', 'http://another-base#something'],
    [':', 'http://another-base#'],
  ];

  uris.forEach(uri => {
    it(`should not compact "${uri[0]}" since it is already a CURIE`, () => {
      expect(spectator.service.compactUri(uri[0])).toEqual(uri[0]);
    });

    it(`should not expand "${uri[1]}" since it is not a CURIE`, () => {
      expect(spectator.service.expandUri(uri[1])).toEqual(uri[1]);
    });

    it(`should compact "${uri[1]}" to "${uri[0]}"`, () => {
      expect(spectator.service.compactUri(uri[1])).toEqual(uri[0]);
    });

    it(`should not compact "${uri[1]}" without appropriate context`, () => {
      expect(spectator.service.compactUri(uri[1], {})).toEqual(uri[1]);
    });

    it(`should expand "${uri[0]}" to "${uri[1]}"`, () => {
      expect(spectator.service.expandUri(uri[0])).toEqual(uri[1]);
    });

    it(`should not expand "${uri[0]}" without appropriate context`, () => {
      expect(spectator.service.expandUri(uri[0], {})).toEqual(uri[0]);
    });
  });
});
