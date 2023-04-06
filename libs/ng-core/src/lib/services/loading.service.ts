import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable, pipe } from 'rxjs';
import { distinctUntilChanged, finalize, map } from 'rxjs/operators';

import { startWithTap } from '../operators/start-with-tap';

@Injectable({ providedIn: 'root' })
export class LoadingService implements OnDestroy {
  readonly defaultKey = '_root';

  loading$: Observable<boolean>;

  get loading(): boolean {
    return this.getLoadingSnapshot();
  }

  private _loadings$: BehaviorSubject<Loadings>;

  constructor() {
    this._loadings$ = new BehaviorSubject<Loadings>({});
    this.loading$ = this.getLoading();
  }

  addLoading(key: string = this.defaultKey): void {
    this.addLoadingInternal(key, 1);
  }

  removeLoading(key: string = this.defaultKey): void {
    this.addLoadingInternal(key, -1);
  }

  asOperator<T>(key: string = this.defaultKey): MonoTypeOperatorFunction<T> {
    return pipe(
      startWithTap(() => this.addLoading(key)),
      finalize(() => this.removeLoading(key))
    );
  }

  getLoading(key: string = this.defaultKey): Observable<boolean> {
    return this._loadings$.asObservable().pipe(
      map(loadings => this.getLoadingSnapshotInternal(loadings, key)),
      distinctUntilChanged()
    );
  }

  getLoadingSnapshot(key: string = this.defaultKey): boolean {
    return this.getLoadingSnapshotInternal(this._loadings$.value, key);
  }

  ngOnDestroy(): void {
    this._loadings$.complete();
  }

  private addLoadingInternal(key: string, value: number): void {
    const newValue = { ...this._loadings$.value, [key]: (this._loadings$.value[key] || 0) + value };
    if (newValue[key] <= 0) {
      delete newValue[key];
    }
    this._loadings$.next(newValue);
  }

  private getLoadingSnapshotInternal(loadings: Loadings, key: string): boolean {
    return !!Object.keys(loadings).find(k => (k.startsWith(key) ? loadings[k] > 0 : false));
  }
}

interface Loadings {
  [key: string]: number;
}
