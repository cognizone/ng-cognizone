import { interval, Observable } from 'rxjs';

import { completableToObservable } from './completable-to-observable';

describe('completableToObservable', () => {
  it('should convert from Promise', done => {
    const p = Promise.resolve('value');
    const obs$ = completableToObservable(p);
    expect(obs$).toBeInstanceOf(Observable);
    obs$.subscribe({ next: value => expect(value).toBe('value'), complete: () => done() });
  });

  it('should convert from literal', done => {
    const myObj = {
      foo: 'bar',
    };
    const obs$ = completableToObservable(myObj);
    expect(obs$).toBeInstanceOf(Observable);
    obs$.subscribe({ next: value => expect(value).toBe(myObj), complete: () => done() });
  });

  it('should convert from Observable (and keep it as-is)', async () => {
    const obs$ = interval(10);
    const newObs$ = completableToObservable(obs$);
    expect(newObs$).toBe(obs$);
  });
});
