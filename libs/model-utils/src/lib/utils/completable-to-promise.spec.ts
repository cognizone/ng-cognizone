import { interval, of } from 'rxjs';
import { completableToPromise } from './completable-to-promise';

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
