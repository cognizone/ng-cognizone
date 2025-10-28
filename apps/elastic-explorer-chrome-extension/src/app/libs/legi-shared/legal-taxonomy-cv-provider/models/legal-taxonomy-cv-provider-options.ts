import { InjectionToken } from '@angular/core';

export interface LegalTaxonomyCvProviderOptions {
  casematesBaseUrl?: string;
  legalTaxonomyIndex?: string;
  idSystematiqueType?: string;
  maxCacheSize?: number;
  apName?: string;
}

export const LEGAL_TAXONOMY_CV_PROVIDER_OPTIONS_TOKEN = new InjectionToken<LegalTaxonomyCvProviderOptions>(
  'LEGAL_TAXONOMY_CV_PROVIDER_OPTIONS_TOKEN',
  { factory: () => ({}) }
);
export const DEFAULT_LEGAL_TAXONOMY_CV_PROVIDER_OPTIONS: LegalTaxonomyCvProviderOptions = {
  legalTaxonomyIndex: 'taxonomy',
  idSystematiqueType: 'https://fedlex.data.admin.ch/vocabulary/notation-type/id-systematique',
  maxCacheSize: 100,
  apName: 'casemates',
};
