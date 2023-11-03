/* eslint-disable @typescript-eslint/no-explicit-any */

import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { UriGenerator } from './uri-generator.service';

describe('UriGenerator', () => {
  const createService = createServiceFactory({
    service: UriGenerator,
  });

  let spectator: SpectatorService<UriGenerator>;

  beforeEach(() => {
    spectator = createService();
    jest.spyOn(Date, 'now').mockReturnValue(123456789);
  });

  it(`should exist`, () => {
    expect(spectator.service).toBeTruthy();
  });

  it(`should generate new uris`, () => {
    const uri1 = spectator.service.create('Something');
    expect(uri1).toBe('http://resource/Something/0-123456789');

    const uri2 = spectator.service.create('');
    expect(uri2).toBe('http://resource/Thing/1-123456789');

    const uri3 = spectator.service.create(['Act', 'Work']);
    expect(uri3).toBe('http://resource/Act-Work/2-123456789');
  });

  it(`should generate new blank node uris`, () => {
    const uri1 = spectator.service.create('Something', { isBlankNode: true });
    expect(uri1).toBe('_:Something/0-123456789');

    const uri2 = spectator.service.create('', { isBlankNode: true });
    expect(uri2).toBe('_:Thing/1-123456789');

    const uri3 = spectator.service.create(['Act', 'Work'], { isBlankNode: true });
    expect(uri3).toBe('_:Act-Work/2-123456789');
  });

  it(`should correctly detect new uris`, () => {
    expect(spectator.service.isNewUri('http://resource/test')).toBeTruthy();
    expect(spectator.service.isNewUri('http://ressource/test')).toBeFalsy();
    expect(spectator.service.isNewUri('_:test')).toBeFalsy();
  });
});
