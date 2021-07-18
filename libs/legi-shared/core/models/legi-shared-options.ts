import { InjectionToken } from '@angular/core';

export const LEGI_SHARED_OPTIONS_TOKEN = new InjectionToken<LegiSharedOptions>('LegiSharedOptions');

export interface LegiSharedOptions {
  appearance: 'legacy' | 'urban';
  useDefaultMomentLocaleAdapter: boolean;
}

export const DEFAULT_LEGI_SHARED_OPTIONS: LegiSharedOptions = {
  appearance: 'urban',
  useDefaultMomentLocaleAdapter: true
};
