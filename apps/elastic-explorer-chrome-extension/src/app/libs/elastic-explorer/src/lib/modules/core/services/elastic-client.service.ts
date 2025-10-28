import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElasticSearchResponse, notNil, selectProp } from '@cognizone/model-utils';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

import { ElasticState } from '../models/elastic-state';

@Injectable({ providedIn: 'root' })
export class ElasticClient {
  constructor(private http: HttpClient) {}

  getClusterState(baseUrl: string): Observable<ElasticState> {
    return this.http.get<ElasticState>(`${baseUrl}/_cluster/state`);
  }

  pitCrawl<T>({ baseUrl, index, body }: SearchOptions): CrawlResponse<T> {
    body = { ...body, sort: ['_doc'], track_total_hits: false };
    let pitId: string;
    const control$ = new Subject<void>();
    const response$ = control$.asObservable().pipe(
      startWith(null),
      switchMap(() => this.http.post<{ id: string }>(this.getPath(baseUrl, index, '_pit'), {}, { params: { keep_alive: '1m' } })),
      selectProp('id'),
      switchMap(fetchedPitId => {
        pitId = fetchedPitId;
        const localQuery = {
          ...body,
          pit: {
            id: pitId,
            keep_alive: '1m',
          },
        };
        return this.http.post<ElasticSearchResponse<T> & { pit_id: string }>(this.getPath(baseUrl, index, '_search'), localQuery, {
          params: {
            scroll: '1m',
          },
        });
      }),
      tap(response => {
        pitId = response.pit_id;
        if (!response.hits.hits.length) {
          control$.complete();
        }
      })
    );

    return { control$, response$ };
  }

  scrollIdCrawl<T>({ baseUrl, index, body }: SearchOptions): CrawlResponse<T> {
    body = { ...body, sort: ['_doc'] };
    let scrollId: string;
    const control$ = new Subject<void>();
    const response$ = control$.asObservable().pipe(
      startWith(null),
      switchMap(() => {
        if (scrollId) {
          return this.http.post<ElasticSearchResponse<T> & { _scroll_id: string }>(this.getPath(baseUrl, index, 'scroll'), {
            scroll: '1m',
            scroll_id: scrollId,
          });
        }
        return this.http.post<ElasticSearchResponse<T> & { _scroll_id: string }>(this.getPath(baseUrl, index, '_search'), body, {
          params: {
            scroll: '1m',
          },
        });
      }),
      tap(response => {
        scrollId = response._scroll_id;
        if (!response.hits.hits.length) {
          control$.complete();
        }
      })
    );

    return { control$, response$ };
  }

  searchAfterCrawl<T>({ baseUrl, index, body }: SearchOptions): CrawlResponse<T> {
    body = { ...body, from: undefined, size: 1000, sort: ['_doc'] };
    let searchAfter: unknown[] | undefined;

    const control$ = new Subject<void>();
    const response$ = control$.asObservable().pipe(
      startWith(null),
      switchMap(() =>
        this.http.post<ElasticSearchResponse<T>>(this.getPath(baseUrl, index, '_search'), { ...body, search_after: searchAfter })
      ),
      tap(response => {
        if (!response.hits.hits.length) {
          control$.complete();
        } else {
          searchAfter = response.hits.hits[response.hits.hits.length - 1].sort;
        }
      })
    );

    return { control$, response$ };
  }

  search<T>({ baseUrl, index, body }: SearchOptions): Observable<ElasticSearchResponse<T>> {
    return this.http.post<ElasticSearchResponse<T>>(this.getPath(baseUrl, index, '_search'), body);
  }

  private getPath(...partials: (string | undefined)[]): string {
    return partials.filter(notNil).join('/');
  }
}

export interface SearchOptions {
  baseUrl: string;
  index?: string;
  body: {};
}

export interface CrawlResponse<T> {
  response$: Observable<ElasticSearchResponse<T>>;
  control$: Subject<void>;
}
