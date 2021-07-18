import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElasticClient } from '@cognizone/elastic';
import { ResourceGraphService } from '@cognizone/ng-application-profile';
import { Logger } from '@cognizone/ng-core';

import { LegalTaxonomyCvProviderOptionsService } from './legal-taxonomy-cv-provider-options.service';

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
