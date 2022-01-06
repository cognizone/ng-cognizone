import { interval, Observable, of } from 'rxjs';
import { completableToObservable, completableToPromise } from './completable';

describe('Completable', () => {
  describe('completableToPromise', () => {
    it('should convert from Promise', async () => {
      const p = Promise.resolve('value');
      const newP = completableToPromise(p);
      expect(await p).toBe(await newP);
    });

    it('should convert from literal', async () => {
      const myObj = {
        foo: 'bar',
      };
      const p = completableToPromise(myObj);
      expect(p).toBeInstanceOf(Promise);
      expect(await p).toBe(myObj);
    });

    it('should convert from completing Observable', async () => {
      const obs$ = of('something');
      const p = completableToPromise(obs$);
      expect(p).toBeInstanceOf(Promise);
      expect(await p).toBe('something');
    });

    it('should convert from non-completing Observable and take its first value', async () => {
      const obs$ = interval(10);
      const p = completableToPromise(obs$);
      expect(p).toBeInstanceOf(Promise);
      expect(await p).toBe(0);
    });
  });

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
});
