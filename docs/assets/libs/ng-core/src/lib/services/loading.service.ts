import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable, pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { startWithTap } from '../operators/start-with-tap';

@Injectable()
export class LoadingService implements OnDestroy {
  loading$: Observable<boolean>;

  get loading(): boolean {
    return this._loading$.value;
  }

  private _loading$: BehaviorSubject<boolean>;

  private loadingCount = 0;

  constructor() {
    this._loading$ = new BehaviorSubject<boolean>(false);
    this.loading$ = this._loading$.asObservable();
  }

  addLoading(): void {
    ++this.loadingCount;
    this.evaluate();
  }

  removeLoading(): void {
    --this.loadingCount;
    this.evaluate();
  }

  asOperator<T>(): MonoTypeOperatorFunction<T> {
    return pipe(
      startWithTap(() => this.addLoading()),
      finalize(() => this.removeLoading())
    );
  }

  ngOnDestroy(): void {
    this._loading$.complete();
  }

  private evaluate(): void {
    const current = this._loading$.value;
    const newValue = this.loadingCount > 0;
    if (newValue !== current) {
      this._loading$.next(newValue);
    }
  }
}
