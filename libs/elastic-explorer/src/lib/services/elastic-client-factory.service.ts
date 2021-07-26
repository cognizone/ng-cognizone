import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElasticHit, ElasticSearchResponse, Nil, notNil } from '@cognizone/model-utils';
import { JsonModelService, ResourceGraphRaw, ResourceGraphService } from '@cognizone/ng-application-profile';
import produce from 'immer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FullModel } from '../models/full-model';
import { getSortedObject } from '../utils/get-sorted-object';

@Injectable({
  providedIn: 'root'
})
export class ElasticClientFactoryService {
  constructor(private http: HttpClient, private resourceGraphService: ResourceGraphService, private jsonModelService: JsonModelService) {}

  create(options: ElasticClientOptions): ElasticClient {
    return new ElasticClient(this.http, this.resourceGraphService, this.jsonModelService, options);
  }
}

export class ElasticClient {
  constructor(
    private http: HttpClient,
    private resourceGraphService: ResourceGraphService,
    private jsonModelService: JsonModelService,
    private options: ElasticClientOptions
  ) {}

  search(query: {}): Observable<ElasticSearchResponse<FullModel>> {
    return (
      this.http
        // tslint:disable-next-line: no-any
        .post<ElasticSearchResponse<any>>(this.getSearchUrl(), query, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
          }
        })
        .pipe(
          map(response => {
            return mapElasticSources(response, (_, hit) => this.mapIn(hit));
          })
        )
    );
  }

  // tslint:disable-next-line: no-any
  private mapIn(hit: ElasticHit<any>): FullModel {
    let source = hit._source;
    if (this.isResourceGraphRaw(source)) {
      source = produce(source, draft => {
        const all = [draft.data, ...(draft.included ?? [])];
        draft.included?.sort((a, b) => {
          return a.uri.localeCompare(b.uri, undefined, { numeric: true });
        });
        all.forEach(node => {
          if (node.attributes) {
            node.attributes = getSortedObject(node.attributes ?? {});
          }
          if (node.references) {
            node.references = getSortedObject(node.references ?? {});
          }
        });
      });
      hit = { ...hit, _source: source };
    }
    const fullModel: FullModel = {
      hit
    };
    if (this.isResourceGraphRaw(source)) {
      fullModel.jsonModel = this.resourceGraphService.resourceGraphRawToJsonModel(source);
      fullModel.jsonModelFlatGraph = this.jsonModelService.toFlatGraph(fullModel.jsonModel);
    }
    return fullModel;
  }

  private getSearchUrl(): string {
    // TODO maybe replace http with https when in https env?
    const parts = [this.options.baseUrl, this.options.index, '_search'].filter(notNil);
    return parts.join('/');
  }

  private isResourceGraphRaw(obj: unknown): obj is ResourceGraphRaw {
    return typeof obj === 'object' && obj != null && 'data' in obj;
  }
}
export interface ElasticClientOptions {
  index: Nil<string>;
  baseUrl: string;
}

export function mapElasticSources<T, U>(
  response: ElasticSearchResponse<T>,
  project: (data: T, hit: ElasticHit<T>) => U
): ElasticSearchResponse<U> {
  return { ...response, hits: { ...response.hits, hits: response.hits.hits.map(hit => ({ ...hit, _source: project(hit._source, hit) })) } };
}
