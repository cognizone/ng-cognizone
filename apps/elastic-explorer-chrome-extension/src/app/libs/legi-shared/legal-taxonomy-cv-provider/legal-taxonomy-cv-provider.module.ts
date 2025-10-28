import { NgModule } from '@angular/core';

import { LegalTaxonomyClientService } from './services/legal-taxonomy-client.service';
import { LegalTaxonomyCvProviderOptionsService } from './services/legal-taxonomy-cv-provider-options.service';
import { legalTaxonomyOptionsServiceProvider } from './services/legal-taxonomy-cv-provider.service';

@NgModule({
  providers: [LegalTaxonomyCvProviderOptionsService, LegalTaxonomyClientService, legalTaxonomyOptionsServiceProvider],
})
export class LegalTaxonomyCvProviderModule {}
