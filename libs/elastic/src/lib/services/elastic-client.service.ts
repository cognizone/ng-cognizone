import { HttpClient } from '@angular/common/http';
import { ElasticSearchResponse, extractOneSourceFromElasticResponse, mapElasticSources } from '@cognizone/model-utils';
import { JsonModel, ResourceGraphService } from '@cognizone/json-model';
import { Logger } from '@cognizone/ng-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IElasticClient } from '../models/elastic-client';

import { ElasticRawClient, ElasticSearchOptions } from './elastic-raw-client.service';

export abstract class ElasticClient extends ElasticRawClient implements IElasticClient {
  abstract apName: string;

  constructor(http: HttpClient, protected resourceGraphService: ResourceGraphService, logger: Logger) {
    super(http, logger);
  }

  search<T extends JsonModel>(query: {}, options?: ElasticSearchOptions): Observable<ElasticSearchResponse<T>> {
    const query$ = this.searchRaw(query, options);
    return query$.pipe(
      map(response => mapElasticSources(response, raw => this.resourceGraphService.resourceGraphRawToJsonModel(raw, this.apName) as T))
    );
  }

  searchOne<T extends JsonModel>(query: {}, options?: ElasticSearchOptions): Observable<T> {
    return this.search<T>(query, options).pipe(map(extractOneSourceFromElasticResponse));
  }
}
