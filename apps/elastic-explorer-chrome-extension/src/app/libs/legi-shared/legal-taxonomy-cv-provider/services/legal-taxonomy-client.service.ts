import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElasticClient } from '@cognizone/elastic';
import { ResourceGraphService } from '@cognizone/json-model';
import { Logger } from '@cognizone/ng-core';

import { LegalTaxonomyCvProviderOptionsService } from './legal-taxonomy-cv-provider-options.service';

/**
 * `LegalTaxonomyClientService` behaves as a special {@link ElasticClient}
 * built specifically to serve legal-taxonomy cv service provider
 */
@Injectable()
export class LegalTaxonomyClientService extends ElasticClient {
  get apName(): string {
    return this.optionsService.getOptions().apName;
  }
  get index(): string {
    return this.optionsService.getOptions().legalTaxonomyIndex;
  }
  get baseUrl(): string {
    return this.optionsService.getOptions().casematesBaseUrl;
  }

  constructor(
    http: HttpClient,
    resourceGraphService: ResourceGraphService,
    logger: Logger,
    private optionsService: LegalTaxonomyCvProviderOptionsService
  ) {
    super(http, resourceGraphService, logger.extend('LegalTaxonomyClientService'));
  }
}
