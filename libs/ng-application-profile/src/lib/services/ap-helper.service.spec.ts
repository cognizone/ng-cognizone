/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { ApplicationProfile, EMPTY_APPLICATION_PROFILE } from '@cognizone/application-profile';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { ApHelper } from './ap-helper.service';
import { ApService } from './ap.service';

const directiveAp: ApplicationProfile = require('../../test/directive-ap.json');

describe('ApHelper', () => {
  let spectator: SpectatorService<ApHelper>;
  const createService = createServiceFactory({ service: ApHelper, mocks: [ApService] });

  beforeEach(() => (spectator = createService()));

  test('should be injectable', () => {
    expect(spectator.service).not.toBeUndefined();
  });

  test('should get Event type', () => {
    const profile = spectator.service.getTypeProfile(directiveAp, ['EUDossier', 'Event']);
    expect(profile).toMatchSnapshot();
  });

  test('should get EUDossier type', () => {
    const profile = spectator.service.getTypeProfile(directiveAp, 'EUDossier');
    expect(profile).toMatchSnapshot();
  });

  test('should throw if type not found', () => {
    // const profile = spectator.service.getTypeProfile(EMPTY_APPLICATION_PROFILE, 'EUDossier');
    expect(() => spectator.service.getTypeProfile(EMPTY_APPLICATION_PROFILE, 'EUDossier')).toThrow();
  });

  test('should get concrete type', () => {
    expect(spectator.service.getConcreteType(directiveAp, ['Event', 'Transposition'])).toBe('Transposition'); // exact match
    expect(spectator.service.getConcreteType(directiveAp, 'Transposition')).toBe('Transposition'); // just the concrete one
  });
});
