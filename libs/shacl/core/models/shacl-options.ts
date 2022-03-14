import { InjectionToken } from '@angular/core';

export interface ShaclOptions {
  i18n: {
    keywordsPrefix: string;
  };
  langStringLangs: string[];
}

const SHACL_OPTIONS_DEFAULT: ShaclOptions = {
  i18n: {
    keywordsPrefix: 'shacl',
  },
  langStringLangs: ['de', 'fr', 'it'],
};

export const SHACL_OPTIONS_TOKEN = new InjectionToken<ShaclOptions>('ShaclOptions', {
  providedIn: 'root',
  factory: () => SHACL_OPTIONS_DEFAULT,
});
