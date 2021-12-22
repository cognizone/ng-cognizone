import { Injectable, Provider } from '@angular/core';
import { ConceptWrapper, CV_PROVIDER_TOKEN, CvProvider } from '@cognizone/legi-cv';
import { ElasticQuery, extractSourcesFromElasticResponse, Nil, notNil } from '@cognizone/model-utils';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LegalTaxonomy } from '../models/legal-taxonomy';

import { LegalTaxonomyClientService } from './legal-taxonomy-client.service';
import { LegalTaxonomyCvProviderOptionsService } from './legal-taxonomy-cv-provider-options.service';

@Injectable()
export class LegalTaxonomyCvProvider implements CvProvider<LegalTaxonomy> {
  cvName: string = 'LEGAL_TAXONOMY';
  classId: string = 'LegalTaxonomy';
  cvUri: string = 'https://fedlex.data.admin.ch/vocabulary/legal-taxonomy';

  private getCvCache: { key: string; value: Observable<LegalTaxonomy[]> }[] = [];
  private getConceptByUriCache: { key: string; value: Observable<LegalTaxonomy> }[] = [];

  constructor(private casematesClient: LegalTaxonomyClientService, private optionsService: LegalTaxonomyCvProviderOptionsService) {}

  /**
   * `getCv` returns all Legal taxonomies matching a provided query
   */
  getCv(query?: string): Observable<LegalTaxonomy[]> {
    const esQuery = this.buildElasticQuery(query);

    const cacheKey = JSON.stringify(esQuery);
    const cached = this.getCvCache.find(cache => cache.key === cacheKey);
    if (cached) {
      return cached.value;
    }
    const value = this.casematesClient.search<LegalTaxonomy>(esQuery).pipe(map(extractSourcesFromElasticResponse), shareReplay(1));
    this.getCvCache.push({
      key: cacheKey,
      value,
    });
    if (this.getCvCache.length > this.optionsService.getOptions().maxCacheSize) {
      this.getCvCache.shift();
    }
    return value;
  }

  /**
   * @ignore
   */
  toConceptWrapper(concept: LegalTaxonomy, query: Nil<string>): ConceptWrapper<LegalTaxonomy> {
    return {
      concept,
      label: this.getLabel(concept),
      score: 1,
    };
  }

  /**
   * `getConceptByUri` checks if Concept of type LegalTaxonomy exists in CV,
   * by constructing an {@link ElasticQuery} with conceptUri value in the filter for term `data.uri.keyword`
   */
  getConceptByUri(conceptUri: string): Observable<LegalTaxonomy> {
    const esQuery = {
      size: 1,
      query: {
        bool: {
          filter: {
            term: {
              'data.uri.keyword': conceptUri,
            },
          },
        },
      },
    } as unknown as ElasticQuery;

    const cacheKey = JSON.stringify(esQuery);
    const cached = this.getConceptByUriCache.find(cache => cache.key === cacheKey);
    if (cached) {
      return cached.value;
    }
    const value = this.casematesClient.search<LegalTaxonomy>(esQuery).pipe(
      map(extractSourcesFromElasticResponse),
      map(concepts => concepts[0]),
      shareReplay(1)
    );
    this.getConceptByUriCache.push({
      key: cacheKey,
      value,
    });
    if (this.getConceptByUriCache.length > this.optionsService.getOptions().maxCacheSize) {
      this.getConceptByUriCache.shift();
    }
    return value;
  }

  /**
   * `hasConcept` checks if CV contains a concept with uri equals to conceptUri
   */
  hasConcept(conceptUri: string): Observable<boolean> {
    return this.getConceptByUri(conceptUri).pipe(map(notNil));
  }

  /**
   * `getLabel` of a legal taxonomy
   */
  getLabel(concept: LegalTaxonomy): string {
    return concept.idSystematique;
  }

  /**
   * `buildElasticQuery` to search for a legal taxonomy
   */
  protected buildElasticQuery(query?: string): ElasticQuery {
    return {
      query: {
        bool: {
          filter: [],
          must_not: [],
          should: [],
          must: [
            {
              match_phrase_prefix: {
                [`data.attributes.idSystematique.${this.optionsService.getOptions().idSystematiqueType}`]: {
                  query,
                },
              },
            },
          ],
        },
      },
      size: 10,
    };
  }
}

export const legalTaxonomyOptionsServiceProvider: Provider = {
  multi: true,
  provide: CV_PROVIDER_TOKEN,
  useClass: LegalTaxonomyCvProvider,
};
