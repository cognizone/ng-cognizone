import { Injectable } from '@angular/core';
import { Nil } from '@cognizone/model-utils';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { ElasticClient, ElasticState, getIndices } from '../../core';

@Injectable()
export class ElasticInstanceHandlerService {
  state$: Observable<ElasticState>;

  private _url$: BehaviorSubject<Nil<string>>;
  private _index$: BehaviorSubject<Nil<string>>;

  get url$(): Observable<Nil<string>> {
    return this._url$.asObservable();
  }

  get index$(): Observable<Nil<string>> {
    return this._index$.asObservable();
  }

  get indices$(): Observable<string[]> {
    return this.state$.pipe(map(getIndices));
  }

  constructor(private elastic: ElasticClient) {
    this._url$ = new BehaviorSubject<Nil<string>>(undefined);
    this._index$ = new BehaviorSubject<Nil<string>>(undefined);
    this.state$ = this.getElasticState();
  }

  setUrl(url: string): void {
    this._url$.next(url);
  }

  setIndex(index: string): void {
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
      switchMap(url => (url ? this.elastic.getClusterState(url) : EMPTY)),
      shareReplay(1)
    );
  }
}
