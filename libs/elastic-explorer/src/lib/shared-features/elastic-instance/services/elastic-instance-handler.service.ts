import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Nil } from '@cognizone/model-utils';
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { ElasticInfo, ElasticInstanceService, ElasticClient, ElasticState, getIndices } from '../../../core';

@Injectable()
export class ElasticInstanceHandlerService {
  elasticState$: Observable<ElasticState>;

  private _url$: BehaviorSubject<Nil<string>>;
  private _index$: BehaviorSubject<Nil<string>>;

  get url$(): Observable<Nil<string>> {
    return this._url$.asObservable();
  }

  get index$(): Observable<Nil<string>> {
    return this._index$.asObservable();
  }

  get indices$(): Observable<string[]> {
    return this.elasticState$.pipe(map(getIndices));
  }

  get elasticInfo$(): Observable<ElasticInfo> {
    return combineLatest([this.index$, this.url$]).pipe(map(([index, url]) => ({ index, url })));
  }

  constructor(private elastic: ElasticClient, private elasticInstanceService: ElasticInstanceService) {
    this._url$ = new BehaviorSubject<Nil<string>>(undefined);
    this._index$ = new BehaviorSubject<Nil<string>>(undefined);
    this.elasticState$ = this.getElasticState();
  }

  getElasticInfoFromQueryParams({ elasticInfo }: Params): ElasticInfo | undefined {
    if (!elasticInfo) return undefined;
    return JSON.parse(elasticInfo);
  }

  elasticInfoToQueryParams(elasticInfo: ElasticInfo | undefined): Params {
    if (!elasticInfo) return {};
    return { elasticInfo: JSON.stringify(elasticInfo) };
  }

  setElasticInfo(info: ElasticInfo): void {
    this.setUrl(info.url);
    this.setIndex(info.index);
  }

  setUrl(url: Nil<string>): void {
    if (url) {
      this.elasticInstanceService.addIfNotPresent({ url: url, label: url });
    }
    this._url$.next(url);
  }

  setIndex(index: Nil<string>): void {
    this._index$.next(index);
  }

  getUrl(): Nil<string> {
    return this._url$.value;
  }

  getIndex(): Nil<string> {
    return this._index$.value;
  }

  private getElasticState(): Observable<ElasticState> {
    return this.url$.pipe(
      distinctUntilChanged(),
      switchMap(url => (url ? this.elastic.getClusterState(url) : EMPTY)),
      shareReplay(1)
    );
  }
}
