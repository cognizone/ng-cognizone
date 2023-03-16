import { HttpClient } from '@angular/common/http';
import { ElasticSearchResponse, TypedResourceGraph, extractOneSourceFromElasticResponse } from '@cognizone/model-utils';
import { Logger } from '@cognizone/ng-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class ElasticRawClient {
  abstract index: string;

  abstract baseUrl: string;

  constructor(protected http: HttpClient, protected logger: Logger) {}

  searchRaw<T = TypedResourceGraph>(query: {}, options?: ElasticSearchOptions): Observable<ElasticSearchResponse<T>> {
    return this.http.post<ElasticSearchResponse<T>>(this.getSearchUrl(), query, options);
  }

  searchOneRaw<T = TypedResourceGraph>(query: {}, options?: ElasticSearchOptions): Observable<T> {
    return this.searchRaw<T>(query, options).pipe(map(extractOneSourceFromElasticResponse));
  }

  protected getSearchUrl(): string {
    return `${this.baseUrl}/${this.index}/_search`;
  }
}

export type ElasticSearchOptions = Parameters<HttpClient['post']>[2];
