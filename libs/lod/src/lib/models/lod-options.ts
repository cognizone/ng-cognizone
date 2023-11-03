import { InjectionToken } from '@angular/core';

export interface LodOptions {
  newUriPrefix: string;
}

export const DEFAULT_LOD_OPTIONS: LodOptions = {
  newUriPrefix: 'http://resource',
};

export const LOD_OPTIONS = new InjectionToken<LodOptions>('LodOptions', { factory: () => DEFAULT_LOD_OPTIONS });
