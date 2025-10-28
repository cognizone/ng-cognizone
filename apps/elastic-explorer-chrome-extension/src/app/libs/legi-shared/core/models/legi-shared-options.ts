import { InjectionToken } from '@angular/core';

export const LEGI_SHARED_OPTIONS_TOKEN = new InjectionToken<LegiSharedOptions>('LegiSharedOptions');

/**
 * `LegiSharedOptions` defines some default options to pass to legi-shared.module,
 * that would define some characteristics for some components,
 * ie: appearance: 'classic' sets a classic look and feel for a {@link AutocompleteMultiComponent}.
 *  Passing `LegiSharedOptions` options usually happens in app.module.ts like following
 * ```
 * LegiSharedModule.forRoot({
      appearance: 'classic',
    })
    ````
 */
export interface LegiSharedOptions {
  appearance: 'classic' | 'urban';
  useDefaultMomentLocaleAdapter: boolean;
  datePicker?: {
    iconPosition?: 'prefix' | 'suffix';
  };
}

export const DEFAULT_LEGI_SHARED_OPTIONS: LegiSharedOptions = {
  appearance: 'urban',
  useDefaultMomentLocaleAdapter: true,
};
