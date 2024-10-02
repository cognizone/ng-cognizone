import { effect, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';

export function obsToSignal<T>(initialValue: T, obs$: Observable<T>, destroyed$: Observable<unknown>): WritableSignal<T> {
  const val = signal(initialValue);
  obs$.pipe(takeUntil(destroyed$)).subscribe(v => val.set(v));
  return val;
}

export function signalToObs<T>(value: Signal<T>): Observable<T> {
  const subject = new BehaviorSubject(value());

  effect(onCleanup => {
    const snapshot = value();
    if (subject.value !== snapshot) {
      subject.next(snapshot);
    }
    onCleanup(() => {
      subject.complete();
    });
  });

  return subject.asObservable();
}
