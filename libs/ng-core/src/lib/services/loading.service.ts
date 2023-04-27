import { inject, Injectable, InjectionToken, OnDestroy, Injector } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable, pipe } from 'rxjs';
import { distinctUntilChanged, finalize, map } from 'rxjs/operators';

import { startWithTap } from '../operators/start-with-tap';

export const DEFAULT_LOADING_SERVICE_OPTIONS: LoadingServiceOptions = {
  defaultKey: '_root',
};

export const LOADING_SERVICE_OPTIONS = new InjectionToken<LoadingServiceOptions>('LOADING_SERVICE_OPTIONS', {
  providedIn: 'root',
  factory: () => DEFAULT_LOADING_SERVICE_OPTIONS,
});

@Injectable({ providedIn: 'root' })
export class LoadingService implements OnDestroy {
  private options = inject(LOADING_SERVICE_OPTIONS);

  loading$: Observable<boolean>;

  get loading(): boolean {
    return this.getLoadingSnapshot();
  }

  private _loadings$: BehaviorSubject<Loadings>;

  constructor() {
    this._loadings$ = new BehaviorSubject<Loadings>({});
    this.loading$ = this.getLoading();
  }

  addLoading(key: string = this.options.defaultKey): void {
    this.addLoadingInternal(key, 1);
  }

  removeLoading(key: string = this.options.defaultKey): void {
    this.addLoadingInternal(key, -1);
  }

  asOperator<T>(key: string = this.options.defaultKey): MonoTypeOperatorFunction<T> {
    return pipe(
      startWithTap(() => this.addLoading(key)),
      finalize(() => this.removeLoading(key))
    );
  }

  getLoading(key: string = this.options.defaultKey): Observable<boolean> {
    return this._loadings$.asObservable().pipe(
      map(loadings => this.getLoadingSnapshotInternal(loadings, key)),
      distinctUntilChanged()
    );
  }

  getLoadingSnapshot(key: string = this.options.defaultKey): boolean {
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

@Injectable({ providedIn: 'root' })
export class LoadingServiceFactory {
  private injector = inject(Injector);

  create(options: LoadingServiceOptions): LoadingService {
    const newInjector = Injector.create({
      providers: [
        { provide: LOADING_SERVICE_OPTIONS, useValue: options },
        { provide: LoadingService, useClass: LoadingService, deps: [LOADING_SERVICE_OPTIONS] },
      ],
      parent: this.injector,
    });
    return newInjector.get(LoadingService);
  }
}

interface Loadings {
  [key: string]: number;
}

export interface LoadingServiceOptions {
  defaultKey: string;
}
