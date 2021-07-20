import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from '@cognizone/legi-shared/list-paginator';
import {
  Dictionary,
  ElasticAggregation,
  extractSourcesFromElasticResponse,
  Nil,
  notNil,
  selectProp,
  SubSink
} from '@cognizone/model-utils';
import { Logger } from '@cognizone/ng-core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, combineLatest, EMPTY, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, shareReplay, switchMap } from 'rxjs/operators';

import { ElasticInfo } from '../models/elastic-info';
import { ElasticState } from '../models/elastic-state';
import { Filters } from '../models/filters';
import { FullModel } from '../models/full-model';
import {
  SetData,
  SetElasticInfo,
  SetElasticQuery,
  SetFilters,
  SetIndices,
  SetManualMode,
  SetPagination
} from '../store/elastic-explorer.actions';
import { ELASTIC_EXPLORER_STATE_TOKEN, ElasticExplorerStateModel } from '../store/elastic-explorer.state';
import { ElasticClientFactoryService } from './elastic-client-factory.service';
import { ElasticInstanceService } from './elastic-instance-service';

@Injectable()
export class ElasticExplorerService {
  private get state$(): Observable<ElasticExplorerStateModel> {
    return this.store.select(ELASTIC_EXPLORER_STATE_TOKEN);
  }
  filters$: Observable<Filters> = this.state$.pipe(selectProp('filters'));
  total$: Observable<number> = this.state$.pipe(selectProp('total'));
  pagination$: Observable<Pagination> = this.state$.pipe(selectProp('pagination'));
  aggregations$: Observable<Dictionary<ElasticAggregation>> = this.state$.pipe(selectProp('aggregations'));
  elasticInfo$: Observable<ElasticInfo> = this.state$.pipe(selectProp('elasticInfo'));
  models$: Observable<FullModel[]> = this.state$.pipe(selectProp('models'));
  indices$: Observable<string[]> = this.state$.pipe(selectProp('indices'));
  loading$: Observable<boolean>;
  facetFields$!: Observable<Field[]>;
  manualMode$: Observable<boolean> = this.state$.pipe(selectProp('manualMode'));
  elasticQuery$: Observable<{}> = this.state$.pipe(selectProp('elasticQuery'));

  private _loading$: BehaviorSubject<boolean>;
  private subSink: SubSink = new SubSink();

  constructor(
    private store: Store,
    private elasticClientFactory: ElasticClientFactoryService,
    private http: HttpClient,
    private router: Router,
    private logger: Logger,
    private elasticInstanceService: ElasticInstanceService,
    private snack: MatSnackBar
  ) {
    this.logger = logger.extend('DataExplorerService');
    this._loading$ = new BehaviorSubject<boolean>(false);
    this.loading$ = this._loading$.asObservable();
    this.initFields();
  }

  onViewLoad(route: ActivatedRoute): void {
    this.initIndices();
    this.parseFiltersFromRoute(route);
    this.parseElasticInfoFromRoute(route);
    this.parsePaginationFromRoute(route);
    this.wireStateToRoute();
    this.initModels();
    this.initElasticQuery();
  }

  onViewUnload(): void {
    this.subSink.empty();
  }

  setFilters(filters: Filters): void {
    this.store.dispatch(new SetFilters(filters));
  }

  setPagination(pagination: Pagination): void {
    this.store.dispatch(new SetPagination(pagination));
  }

  setElasticInfo(elasticInfo: ElasticInfo): void {
    this.store.dispatch(new SetElasticInfo(elasticInfo));
  }

  setIndices(indices: string[]): void {
    this.store.dispatch(new SetIndices(indices));
  }

  setElasticQuery(elasticQuery: {}): void {
    this.store.dispatch(new SetElasticQuery(elasticQuery));
  }

  setManualMode(manualMode: boolean): void {
    this.store.dispatch(new SetManualMode(manualMode));
  }

  private initModels(): void {
    this.subSink.add = combineLatest([this.elasticInfo$, this.elasticQuery$])
      .pipe(
        debounceTime(200),
        switchMap(([elasticInfo, elasticQuery]) => {
          if (!elasticInfo.url) return EMPTY;
          const client = this.elasticClientFactory.create({
            baseUrl: elasticInfo.url,
            index: elasticInfo.index
          });
          this._loading$.next(true);
          return client.search(elasticQuery).pipe(
            finalize(() => this._loading$.next(false)),
            catchError(err => {
              const message = 'Failed to fetch entries from elastic';
              this.logger.error(message, err);
              this.snack.open(message, 'Dismiss', { duration: 5000 });
              this.store.dispatch(new SetData([], 0, {}));
              return EMPTY;
            })
          );
        })
      )
      .subscribe(response => {
        this.store.dispatch(new SetData(extractSourcesFromElasticResponse(response), response.hits.total.value, response.aggregations));
      });
  }

  private initIndices(): void {
    this.subSink.add = this.elasticInfo$
      .pipe(
        selectProp('url'),
        filter(notNil),
        switchMap(url => this.http.get<ElasticState>(`${url}/_cluster/state`)),
        map(state => Object.keys(state.metadata.indices)),
        catchError(err => {
          this.logger.error('Failed to fetch elastic state', err);
          return of([]);
        })
      )
      .subscribe(response => {
        this.setIndices(response);
      });
  }

  private initFields(): void {
    this.facetFields$ = this.elasticInfo$.pipe(
      debounceTime(10),
      switchMap(({ index, url }) => {
        if (!index) return of(undefined);
        return this.http
          .get<ElasticMappingResponse>(`${url}/${index}/_mapping`)
          .pipe(map(response => (response?.[index]?.mappings?.properties?.facets as Nil<ElasticProperties>)?.properties));
      }),
      map(properties => (properties ? this.flattenFields(properties, 'facets', []) : [])),
      catchError(err => {
        this.logger.error('Failed to fetch elastic mapping', err);
        return of([]);
      }),
      shareReplay(1)
    );
  }

  private initElasticQuery(): void {
    this.subSink.add = combineLatest([this.filters$, this.pagination$, this.facetFields$]).subscribe(
      ([filters, pagination, facetsFields]) => {
        this.setElasticQuery(this.getQuery(filters, pagination, facetsFields));
      }
    );
  }

  private getQuery(filters: Filters, pagination: Pagination, fields: Field[]): {} {
    const query = {
      ...pagination,
      track_total_hits: true,
      query: {
        bool: {
          must: [] as unknown[]
        }
      },
      aggs: {
        type: {
          terms: {
            field: 'data.type.keyword',
            size: 100
          }
        }
      }
    };

    if (filters.facets) {
      const subQuery = { bool: { should: [] as unknown[], minimum_should_match: 1 } };
      fields
        .filter(field => field.type === 'text')
        .map(f => this.getMatchFilters(f.path, filters.facets as string, filters.isFuzzy))
        .forEach(f => subQuery.bool.should.push(f));
      query.query.bool.must.push(subQuery);
    }

    if (filters.type && filters.type.length > 0) {
      query.query.bool.must.push({
        terms: {
          'data.type.keyword': filters.type
        }
      });
    }

    if (filters.uri) {
      query.query.bool.must.push(this.getMatchFilters('data.uri', filters.uri, filters.isFuzzy));
    }

    if (filters.included) {
      query.query.bool.must.push(this.getMatchFilters('included.uri', filters.included, filters.isFuzzy));
    }

    return query;
  }
  private flattenFields(properties: ElasticPropertiesMap, currentPath: string, fields: Field[]): Field[] {
    Object.entries(properties).forEach(([key, value]) => {
      const newPath = `${currentPath}.${key}`;
      if ('type' in value) {
        fields.push({
          path: newPath,
          type: value.type
        });
      } else {
        this.flattenFields(value.properties, newPath, fields);
      }
    });
    return fields;
  }

  private getMatchFilters(field: string, value: string, isFuzzy: boolean = false): unknown {
    const should = [
      {
        match_phrase_prefix: {
          [field]: {
            query: value,
            boost: 2
          }
        }
      }
    ] as unknown[];

    if (isFuzzy) {
      should.push(
        {
          match: {
            [field]: {
              query: value,
              boost: 1.5
            }
          }
        },
        {
          match: {
            [field]: {
              query: value,
              fuzziness: 'auto'
            }
          }
        }
      );
    }
    return {
      bool: {
        minimum_should_match: 1,
        should
      }
    };
  }

  private wireStateToRoute(): void {
    this.subSink.add = combineLatest([this.filters$, this.pagination$, this.elasticInfo$]).subscribe(
      ([filters, pagination, elasticInfo]) => {
        this.router.navigate([], {
          queryParams: {
            q: this.toQueryParams(filters),
            from: pagination.from,
            size: pagination.size,
            elasticInfo: this.toQueryParams(elasticInfo)
          },
          queryParamsHandling: 'merge'
        });
      }
    );
  }

  private toQueryParams<T extends {}>(obj: T): string | undefined {
    const cleaned = {} as T;
    Object.entries(obj)
      .filter(([, value]) => value != null && value !== '' && (Array.isArray(value) ? value.length > 0 : true))
      .forEach(([key, value]) => (cleaned[(key as unknown) as keyof T] = value as T[keyof T]));

    const s = JSON.stringify(cleaned);
    return s === '{}' ? undefined : s;
  }

  private parsePaginationFromRoute(route: ActivatedRoute): void {
    this.subSink.add = route.queryParams
      .pipe(
        map(({ from, size }) => ({
          from: parseInt(from ?? '0'),
          size: parseInt(size ?? '10')
        }))
      )
      .subscribe(pagination => this.setPagination(pagination));
  }

  private parseFiltersFromRoute(route: ActivatedRoute): void {
    this.subSink.add = route.queryParams
      .pipe(
        map(params => params.q),
        distinctUntilChanged(),
        map(q => (q ? JSON.parse(q) : {}))
      )
      .subscribe(filters => this.setFilters(filters));
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
          this.store.dispatch(new SetElasticInfo(elasticInfo));
          if (elasticInfo.url) this.elasticInstanceService.addIfNotPresent({ url: elasticInfo.url, label: elasticInfo.url });
        }
      });
  }
}

type ElasticMappingResponse = {
  [index: string]: {
    mappings: ElasticProperties;
  };
};
type ElasticPropertiesMap = { [key: string]: ElasticProperties | ElasticType };
type ElasticProperties = { properties: ElasticPropertiesMap };
type ElasticType = { type: string };
export type Field = { path: string; type: string };
