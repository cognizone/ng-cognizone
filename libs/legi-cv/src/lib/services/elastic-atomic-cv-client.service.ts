import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonModel, ResourceGraphService } from '@cognizone/json-model';
import { Completable, ElasticSearchResponse, extractOneSourceFromElasticResponse, Nil, TypedResourceGraph } from '@cognizone/model-utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Collection } from '../models/collection';
import { Concept } from '../models/concept';
import { ConceptScheme } from '../models/concept-scheme';
import { ATOMIC_CV_CLIENT_TOKEN, AtomicCvClient } from './atomic-cv-client.service';
import { LegiCvOptionsService } from './legi-cv-options.service';

@Injectable({
  providedIn: 'root',
})
export class ElasticAtomicCvClientService implements AtomicCvClient {
  constructor(private optionsService: LegiCvOptionsService, private http: HttpClient, private resourceGraphService: ResourceGraphService) {}

  getConceptScheme<T extends Concept = Concept>(uri: string): Completable<ConceptScheme<T>> {
    const query = {
      query: {
        term: {
          'data.uri.keyword': uri,
        },
      },
    };

    return this.searchOneInElastic<ConceptScheme<T>>(query).pipe(
      map(res => {
        if (!res) {
          throw new Error(`Could not find ConceptScheme with given uri '${uri}'`);
        }
        return res;
      })
    );
  }

  getCollection<T extends Concept = Concept>(uri: string): Completable<Collection<T>> {
    const query = {
      query: {
        term: {
          'data.references.hasMicroThesaurus.keyword': uri,
        },
      },
    };

    return this.searchOneInElastic<ConceptScheme<T>>(query).pipe(
      map(conceptScheme => {
        if (!conceptScheme) {
          throw new Error(`Could not find Collection with given uri '${uri}'`);
        }
        const collection = conceptScheme.hasMicroThesaurus?.find(c => c['@id'] === uri);
        if (collection == null) {
          throw new Error(`Could not find collection '${uri}' in found concept scheme ${conceptScheme['@id']}`);
        }
        return collection;
      })
    );
  }

  protected searchOneInElastic<T extends JsonModel>(query: {}): Observable<Nil<T>> {
    const options = this.optionsService.options.elasticAtomicCvClientOptions;
    return this.http.post<ElasticSearchResponse<TypedResourceGraph>>(this.getSearchUrl(), query).pipe(
      map(extractOneSourceFromElasticResponse),
      map(response => {
        if (!response) return null;
        return this.resourceGraphService.resourceGraphRawToJsonModel(response, options.apName) as T;
      })
    );
  }

  protected getSearchUrl(): string {
    const options = this.optionsService.options.elasticAtomicCvClientOptions;
    return `${options.baseUrl}/${options.index}/_search`;
  }
}

export const elasticAtomicCvClientServiceProvider = {
  provide: ATOMIC_CV_CLIENT_TOKEN,
  useExisting: ElasticAtomicCvClientService,
};
