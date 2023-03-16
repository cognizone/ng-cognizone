import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonModelService, ResourceGraphService } from '@cognizone/json-model';
import { Pagination } from '@cognizone/legi-shared/list-paginator';
import {
  Dictionary,
  ElasticAggregation,
  ElasticHit,
  ElasticSearchResponse,
  Nil,
  selectProp,
  SubSink,
  TypedResourceGraph,
} from '@cognizone/model-utils';
import { LoadingService, Logger } from '@cognizone/ng-core';
import { Store } from '@ngxs/store';
import produce from 'immer';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { ElasticClient, ElasticState, getPropertyType } from '../../core';
import { ElasticInfo, ElasticInstanceHandlerService, ElasticInstanceService } from '../../elastic-instance';
import { Filters } from '../models/filters';
import { FullModel } from '../models/full-model';
import { ViewType } from '../models/view-type';
import {
  ResetData,
  SetData,
  SetElasticQuery,
  SetFilters,
  SetManualMode,
  SetPagination,
  SetViewType,
} from '../store/elastic-explorer.actions';
import { ELASTIC_EXPLORER_STATE_TOKEN, ElasticExplorerStateModel } from '../store/elastic-explorer.state';
import { getSortedObject } from '../utils/get-sorted-object';

@Injectable()
export class ElasticExplorerService {
  private get state$(): Observable<ElasticExplorerStateModel> {
    return this.store.select(ELASTIC_EXPLORER_STATE_TOKEN);
  }

  filters$: Observable<Filters> = this.state$.pipe(selectProp('filters'));
  total$: Observable<number> = this.state$.pipe(selectProp('total'));
  pagination$: Observable<Pagination> = this.state$.pipe(selectProp('pagination'));
  aggregations$: Observable<Dictionary<ElasticAggregation>> = this.state$.pipe(selectProp('aggregations'));
  models$: Observable<FullModel[]> = this.state$.pipe(selectProp('models'));
  facetFields$!: Observable<Field[]>;
  manualMode$: Observable<boolean> = this.state$.pipe(selectProp('manualMode'));
  elasticQuery$: Observable<{}> = this.state$.pipe(selectProp('elasticQuery'));
  viewType$: Observable<ViewType> = this.state$.pipe(selectProp('viewType'));
  elasticResponse$: Observable<Nil<ElasticSearchResponse<FullModel>>> = this.state$.pipe(selectProp('elasticResponse'));

  private subSink: SubSink = new SubSink();

  constructor(
    private store: Store,
    private router: Router,
    private logger: Logger,
    private elasticInstanceService: ElasticInstanceService,
    private snack: MatSnackBar,
    private loadingService: LoadingService,
    private elasticInstanceHandler: ElasticInstanceHandlerService,
    private elasticClient: ElasticClient,
    private resourceGraphService: ResourceGraphService,
    private jsonModelService: JsonModelService
  ) {
    this.logger = logger.extend('DataExplorerService');
    this.initFacetFields();
  }

  onPageLoad(route: ActivatedRoute): void {
    this.parseFiltersFromRoute(route);
    this.parseElasticInfoFromRoute(route);
    this.parseViewTypeRoute(route);
    this.parsePaginationFromRoute(route);
    this.parseElasticQueryFromRoute(route);
    this.wireStateToRoute();
    this.initModels();
    this.initElasticQuery();
  }

  onPageUnload(): void {
    this.subSink.empty();
  }

  setFilters(filters: Filters): void {
    this.store.dispatch(new SetFilters(filters));
  }

  setPagination(pagination: Pagination): void {
    this.store.dispatch(new SetPagination(pagination));
  }

  setElasticQuery(elasticQuery: {}): void {
    this.store.dispatch(new SetElasticQuery(elasticQuery));
  }

  setManualMode(manualMode: boolean): void {
    this.store.dispatch(new SetManualMode(manualMode));
  }

  setViewType(viewType: ViewType): void {
    this.store.dispatch(new SetViewType(viewType));
  }

  private initModels(): void {
    this.subSink.add = combineLatest([this.getElasticInfo(), this.elasticQuery$])
      .pipe(
        debounceTime(200),
        switchMap(([elasticInfo, elasticQuery]) => {
          if (!elasticInfo.url) return EMPTY;
          return this.elasticClient.search({ baseUrl: elasticInfo.url, index: elasticInfo.index as string, body: elasticQuery }).pipe(
            catchError(err => {
              const message = 'Failed to fetch entries from elastic';
              this.logger.error(message, err);
              this.snack.open(message, 'Dismiss', { duration: 5000 });
              this.store.dispatch(new ResetData());
              return EMPTY;
            }),
            this.loadingService.asOperator()
          );
        }),
        map(response => mapElasticSources(response, (_, hit) => this.mapIn(hit)))
      )
      .subscribe(response => {
        this.store.dispatch(new SetData(response));
      });
  }

  private mapIn(hit: ElasticHit<unknown>): FullModel {
    let source = hit._source;
    if (this.isResourceGraphRaw(source)) {
      source = produce(source, draft => {
        const all = [draft.data, ...(draft.included ?? [])];
        draft.included?.sort((a, b) => a.uri.localeCompare(b.uri, undefined, { numeric: true }));
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
      hit,
    };
    if (this.isResourceGraphRaw(source)) {
      fullModel.jsonModel = this.resourceGraphService.resourceGraphRawToJsonModel(source);
      fullModel.jsonModelFlatGraph = this.jsonModelService.toFlatGraph(fullModel.jsonModel);
    }
    return fullModel;
  }

  private isResourceGraphRaw(obj: unknown): obj is TypedResourceGraph {
    return typeof obj === 'object' && obj != null && 'data' in obj;
  }

  private initFacetFields(): void {
    const elasticState$ = this.elasticInstanceHandler.state$;
    const index$ = this.getElasticInfo().pipe(selectProp('index'));
    this.facetFields$ = combineLatest([elasticState$, index$]).pipe(
      map(([state, index]) => {
        if (!index) return [];
        const facetsProperties = state?.metadata?.indices?.[index]?.mappings?._doc?.properties?.facets;
        if (facetsProperties && 'properties' in facetsProperties) {
          return this.flattenFields(facetsProperties.properties, 'facets', []);
        }
        return [];
      }),
      shareReplay(1)
    );
  }

  private initElasticQuery(): void {
    this.subSink.add = combineLatest([
      this.manualMode$,
      this.filters$,
      this.pagination$,
      this.facetFields$,
      this.elasticInstanceHandler.state$,
      this.getElasticInfo(),
    ])
      .pipe(filter(([manualMode]) => !manualMode))
      .subscribe(([, filters, pagination, facetsFields, elasticState, elasticInfo]) => {
        this.setElasticQuery(this.getQuery(filters, pagination, facetsFields, elasticState, elasticInfo));
      });
  }

  private getQuery(filters: Filters, pagination: Pagination, fields: Field[], state: Nil<ElasticState>, elasticInfo: ElasticInfo): {} {
    const query = {
      ...pagination,
      track_total_hits: true,
      query: {
        bool: {
          must: [] as unknown[],
        },
      },
      aggs: {
        type: {
          terms: {
            field: 'data.type.keyword',
            size: 100,
          },
        },
      },
    };

    if (filters.facets) {
      const subQuery = { bool: { should: [] as unknown[], minimum_should_match: 1 } };
      fields
        .filter(field => field.type === 'text')
        .map(f => this.getFieldBoolQuery(f.path, filters.facets as string, state, elasticInfo, filters.isFuzzy))
        .forEach(f => subQuery.bool.should.push(f));
      query.query.bool.must.push(subQuery);
    }

    if (filters.type && filters.type.length > 0) {
      query.query.bool.must.push({
        terms: {
          'data.type.keyword': filters.type,
        },
      });
    }

    if (filters.uri) {
      query.query.bool.must.push(this.getFieldBoolQuery('data.uri', filters.uri, state, elasticInfo, filters.isFuzzy));
    }

    if (filters.included) {
      query.query.bool.must.push(this.getFieldBoolQuery('included.uri', filters.included, state, elasticInfo, filters.isFuzzy));
    }

    return query;
  }

  private flattenFields(properties: ElasticPropertiesMap, currentPath: string, fields: Field[]): Field[] {
    Object.entries(properties).forEach(([key, value]) => {
      const newPath = `${currentPath}.${key}`;
      if ('type' in value) {
        fields.push({
          path: newPath,
          type: value.type,
        });
      } else {
        this.flattenFields(value.properties, newPath, fields);
      }
    });
    return fields;
  }

  private getFieldBoolQuery(
    field: string,
    value: string,
    state: Nil<ElasticState>,
    elasticInfo: ElasticInfo,
    isFuzzy: boolean = false
  ): unknown {
    let isKeyword = true;
    if (state) {
      const typeProfile = getPropertyType(state, elasticInfo.index, field);
      isKeyword = typeProfile ? typeProfile?.type === 'keyword' : true;
    }

    const should: unknown[] = [];

    if (isKeyword) {
      should.push({
        term: {
          [field]: value,
        },
      });
    } else {
      should.push({
        match_phrase_prefix: {
          [field]: {
            query: value,
            boost: 2,
          },
        },
      });
    }

    if (isFuzzy && !isKeyword) {
      should.push(
        {
          match: {
            [field]: {
              query: value,
              boost: 1.5,
            },
          },
        },
        {
          match: {
            [field]: {
              query: value,
              fuzziness: 'auto',
            },
          },
        }
      );
    }
    return {
      bool: {
        minimum_should_match: 1,
        should,
      },
    };
  }

  private wireStateToRoute(): void {
    this.subSink.add = combineLatest([
      this.filters$,
      this.pagination$,
      this.getElasticInfo(),
      this.manualMode$,
      this.elasticQuery$,
      this.viewType$,
    ])
      .pipe(debounceTime(0))
      .subscribe(async ([filters, pagination, elasticInfo, manualMode, elasticQuery, viewType]) => {
        let queryParams: {} = {
          elasticInfo: this.toQueryParams(elasticInfo),
          viewType,
        };
        queryParams = manualMode
          ? {
              ...queryParams,
              elasticQuery: JSON.stringify(elasticQuery),
            }
          : {
              ...queryParams,
              q: this.toQueryParams(filters),
              from: pagination.from,
              size: pagination.size,
              elasticQuery: undefined,
            };
        await this.router.navigate([], {
          queryParams,
          queryParamsHandling: 'merge',
        });
      });
  }

  private toQueryParams<T extends {}>(obj: T): string | undefined {
    const cleaned = {} as T;
    Object.entries(obj)
      .filter(([, value]) => value != null && value !== '' && (Array.isArray(value) ? value.length > 0 : true))
      .forEach(([key, value]) => (cleaned[key as unknown as keyof T] = value as T[keyof T]));

    const s = JSON.stringify(cleaned);
    return s === '{}' ? undefined : s;
  }

  private parsePaginationFromRoute(route: ActivatedRoute): void {
    this.subSink.add = route.queryParams
      .pipe(
        filter(params => !params.elasticQuery),
        map(({ from, size }) => ({
          from: parseInt(from ?? '0'),
          size: parseInt(size ?? '10'),
        }))
      )
      .subscribe(pagination => this.setPagination(pagination));
  }

  private parseFiltersFromRoute(route: ActivatedRoute): void {
    this.subSink.add = route.queryParams
      .pipe(
        filter(params => !params.elasticQuery),
        map(params => params.q),
        distinctUntilChanged(),
        map(q => (q ? JSON.parse(q) : {}))
      )
      .subscribe(filters => this.setFilters(filters));
  }

  private parseElasticQueryFromRoute(route: ActivatedRoute): void {
    this.subSink.add = route.queryParams
      .pipe(
        filter(params => !!params.elasticQuery),
        map(params => params.elasticQuery),
        distinctUntilChanged(),
        map(elasticQuery => (elasticQuery ? JSON.parse(elasticQuery) : {}))
      )
      .subscribe(elasticQuery => {
        this.setElasticQuery(elasticQuery);
        this.setManualMode(true);
      });
  }

  private parseElasticInfoFromRoute(route: ActivatedRoute): void {
    this.subSink.add = route.queryParams
      .pipe(
        map(params => params.elasticInfo),
        distinctUntilChanged(),
        map(q => (q ? (JSON.parse(q) as ElasticInfo) : null))
      )
      .subscribe(elasticInfo => {
        if (elasticInfo) {
          this.elasticInstanceHandler.setUrl(elasticInfo.url as string);
          this.elasticInstanceHandler.setIndex(elasticInfo.index as string);
          if (elasticInfo.url) this.elasticInstanceService.addIfNotPresent({ url: elasticInfo.url, label: elasticInfo.url });
        }
      });
  }

  private parseViewTypeRoute(route: ActivatedRoute): void {
    this.subSink.add = route.queryParams.pipe(selectProp('viewType')).subscribe(viewType => {
      if (viewType) {
        this.setViewType(viewType);
      }
    });
  }

  private getElasticInfo(): Observable<ElasticInfo> {
    return combineLatest([this.elasticInstanceHandler.url$, this.elasticInstanceHandler.index$]).pipe(
      map(([url, index]) => ({ url, index }))
    );
  }
}

type ElasticPropertiesMap = { [key: string]: ElasticProperties | ElasticType };
type ElasticProperties = { properties: ElasticPropertiesMap };
type ElasticType = { type: string };
export type Field = { path: string; type: string };

export function mapElasticSources<T, U>(
  response: ElasticSearchResponse<T>,
  project: (data: T, hit: ElasticHit<T>) => U
): ElasticSearchResponse<U> {
  return { ...response, hits: { ...response.hits, hits: response.hits.hits.map(hit => ({ ...hit, _source: project(hit._source, hit) })) } };
}
