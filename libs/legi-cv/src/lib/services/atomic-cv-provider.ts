import {
  Completable,
  completableToPromise,
  CzLabel,
  getLangStringValue,
  GetSelectOptionsParams,
  LangString,
  Nil,
  notNil,
  Sorter,
} from '@cognizone/model-utils';
import { identity, Observable } from 'rxjs';
import { filter, first, map, mergeMap, shareReplay, switchMap, toArray } from 'rxjs/operators';

import { Concept } from '../models/concept';
import { ConceptFilterableKeys } from '../models/concept-filterable-keys';
import {
  composeConceptWrapperSorterFactories,
  ConceptWrapper,
  ConceptWrapperSorterFactory,
  countConceptWrapperSorterFactory,
  orderConceptWrapperSorterFactory,
  scoreConceptWrapperSorterFactory,
  uriConceptWrapperSorterFactory,
} from '../models/concept-wrapper';
import { GetCvParams } from '../models/get-cv-params';
import { LegiCvOptions } from '../models/legi-cv-options';
import { MatchType } from '../models/match-type';

import { ConceptMatcherService } from './concept-matcher.service';
import { CvProvider } from './cv-provider';

export abstract class AtomicCvProvider<T extends Concept = Concept> implements CvProvider<T> {
  cvName: string;

  cvUri: string;

  conceptKeysForFiltering: ConceptFilterableKeys;

  protected get allConcepts$(): Observable<T[]> {
    return (this._allConcepts$ = this._allConcepts$ ?? this.getAllConcepts().pipe(first(), shareReplay(1)));
  }

  private _allConcepts$?: Observable<T[]>;

  constructor(protected matcher: ConceptMatcherService, protected config: AtomicCvProviderConfig, protected options: LegiCvOptions) {
    this.cvName = this.config.cvName;
    this.cvUri = this.config.cvUri;
    this.conceptKeysForFiltering = this.config.conceptKeysForFiltering ?? this.options.defaultConceptFilterableKeys;
  }

  getCv(query: Nil<string>, params: GetCvParams): Observable<T[]> {
    return this.allConcepts$.pipe(
      switchMap(identity),
      filter(concept => (params.counts ? (params.counts[concept['@id']] ?? 0) > 0 : true)),
      mergeMap(async concept => this.toConceptWrapper(concept, query)),
      filter(concept => concept.score > 0),
      toArray(),
      map(concepts => {
        const sorter = this.getConceptSorter(params);
        let options = [...concepts].sort(sorter).map(c => c.concept);
        if (params.pagination) {
          const { from, size } = params.pagination;
          options = options.slice(from, from + size);
        }
        return options;
      })
    );
  }

  async toConceptWrapper(concept: T, query: Nil<string>): Promise<ConceptWrapper<T>> {
    const label = await completableToPromise(this.getLabel(concept));
    const score = this.match(concept, query);

    return {
      concept,
      label,
      score,
    };
  }

  getConceptByUri(uri: string): Observable<T> {
    return this.allConcepts$.pipe(map(concepts => concepts.find(c => c['@id'] === uri) as T));
  }

  hasConcept(uri: string): Observable<boolean> {
    return this.getConceptByUri(uri).pipe(map(notNil));
  }

  getLabel(concept: T): Completable<LangString> {
    const key = this.config.labelKey as keyof Concept;
    return concept[key ?? 'prefLabel'] as LangString;
  }

  protected match(concept: T, query: Nil<string>): number {
    return this.matcher.match(concept, this.conceptKeysForFiltering, query, this.config.matchType);
  }

  protected getConceptSorter(params: GetSelectOptionsParams): Sorter<ConceptWrapper> {
    const sorters = this.config.sorters ?? [
      scoreConceptWrapperSorterFactory,
      countConceptWrapperSorterFactory,
      orderConceptWrapperSorterFactory,
      uriConceptWrapperSorterFactory,
    ];

    return composeConceptWrapperSorterFactories(sorters)(params);
  }

  protected abstract getAllConcepts(): Observable<T[]>;

  protected getLabelAsString(label: CzLabel, lang: string): string {
    if (typeof label === 'string') return label;
    return getLangStringValue(label, lang.split('-')[0]) ?? '';
  }
}

export interface AtomicCvProviderConfig {
  cvUri: string;
  cvName: string;
  conceptKeysForFiltering?: (keyof Concept)[];
  matchType?: MatchType;
  labelKey?: string;
  sorters?: ConceptWrapperSorterFactory[];
}
