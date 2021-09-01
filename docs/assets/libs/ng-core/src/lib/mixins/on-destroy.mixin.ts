/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-redeclare */
import { OnDestroy, Type } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, pipe, Subject, Subscription } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

export interface OnDestroyMixin extends OnDestroy {
  onDestroy$: Observable<void>;
  subSink: Subscription;
  untilDestroyed<T>(): MonoTypeOperatorFunction<T>;
  firstUntilDestroyed<T>(): MonoTypeOperatorFunction<T>;
  emptySink(): void;
}

/**
 *
 * @description beware that if you use this with a base class that has injection, it will not work in AOT
 * unless you redefine the constructor in the child class, i.g. :
 * ```
 * export class MyGreatComponent extends OnDestroyMixin(Autoinjectable) {
 *     constructor(injector: Injector) {
 *         super(injector);
 *     }
 * }
 * ```
 *
 * Also if you use this mixin on a parent class of a component that has @Input, those inputs will not be seen in AOT and will throw an error
 *
 * All those issues should be fixed with Ivy (Angular 9+) https://github.com/angular/angular/issues/19145
 *
 */
export function OnDestroyMixin<T extends Type<any>>(base: T): T & Type<OnDestroyMixin> {
  return class extends base implements OnDestroyMixin {
    onDestroy$: Observable<void>;

    private _onDestroy$: Subject<void>;

    private subscriptions: Subscription[] = [];

    constructor(...args: any[]) {
      super(...args);
      this._onDestroy$ = new Subject();
      this.onDestroy$ = this._onDestroy$.asObservable();
    }

    set subSink(value: Subscription) {
      this.subscriptions.push(value);
    }

    untilDestroyed<U>(): MonoTypeOperatorFunction<U> {
      return takeUntil<U>(this._onDestroy$);
    }

    firstUntilDestroyed<U>(): MonoTypeOperatorFunction<U> {
      return pipe(first(), this.untilDestroyed());
    }

    ngOnDestroy(): void {
      if (super.ngOnDestroy) super.ngOnDestroy();
      this._onDestroy$.next();
      this._onDestroy$.complete();
      this.emptySink();
    }

    emptySink(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.subscriptions = [];
    }
  };
}

export class OnDestroy$ extends OnDestroyMixin(class {}) {}
