import { DestroyRef, inject, Injectable } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, Subject, Unsubscribable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Can be used in 2 ways, depending on preference. First would be the usual extends, like so
 * ```ts
 *   @Component()
 *   export class MyComponent extends OnDestroy$ {
 *     ngOnInit(): void {
 *       this.subSink = someObs$.subscribe();
 *     }
 *   }
 * ```
 *
 * or using composition
 * * ```ts
 *   @Component({providers: [OnDestroy$]})
 *   export class MyComponent {
 *     #onDestroy = inject(OnDestroy$);
 *     ngOnInit(): void {
 *       this.#onDestroy.subSink = someObs$.subscribe();
 *     }
 *   }
 * ```
 *
 */
@Injectable()
export class OnDestroy$ {
  onDestroy$: Observable<void>;
  #onDestroy$: Subject<void>;

  #subscriptions: Unsubscribable[] = [];
  protected destroyRef = inject(DestroyRef);

  constructor() {
    this.#onDestroy$ = new Subject();
    this.onDestroy$ = this.#onDestroy$.asObservable();
    this.destroyRef.onDestroy(() => {
      this.#onDestroy$.next();
      this.#onDestroy$.complete();
      this.emptySink();
    });
  }

  set subSink(value: Unsubscribable) {
    this.#subscriptions.push(value);
  }

  untilDestroyed<U>(): MonoTypeOperatorFunction<U> {
    return takeUntil<U>(this.onDestroy$);
  }

  emptySink(): void {
    this.#subscriptions.forEach(sub => sub.unsubscribe());
    this.#subscriptions = [];
  }
}
