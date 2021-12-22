import { Inject, Injectable } from '@angular/core';

import {
  DEFAULT_LEGAL_TAXONOMY_CV_PROVIDER_OPTIONS,
  LEGAL_TAXONOMY_CV_PROVIDER_OPTIONS_TOKEN,
  LegalTaxonomyCvProviderOptions,
} from '../models/legal-taxonomy-cv-provider-options';

/**
 * `LegalTaxonomyCvProviderOptionsService` behaves as a getter/patcher service
 * for all options available in LegalTaxonomy provided CV
 */
@Injectable()
export class LegalTaxonomyCvProviderOptionsService {
  private options: Required<LegalTaxonomyCvProviderOptions>;

  constructor(@Inject(LEGAL_TAXONOMY_CV_PROVIDER_OPTIONS_TOKEN) options: LegalTaxonomyCvProviderOptions) {
    this.options = { ...DEFAULT_LEGAL_TAXONOMY_CV_PROVIDER_OPTIONS, ...options } as Required<LegalTaxonomyCvProviderOptions>;
  }

  getOptions(): Required<LegalTaxonomyCvProviderOptions> {
    return this.options;
  }

  patchOptions(val: LegalTaxonomyCvProviderOptions): void {
    this.options = { ...this.options, ...val };
  }
}
