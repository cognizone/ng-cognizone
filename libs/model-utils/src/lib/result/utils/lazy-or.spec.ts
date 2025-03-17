import { error } from './error';
import { lazyOr } from './lazy-or';
import { ok } from './ok';

describe('lazyOr', () => {
  it('should return first result if ok', () => {
    const result = ok('first');
    const factory = jest.fn(() => ok('second'));
    const finalResult = lazyOr<string>(result, factory);
    expect(finalResult).toEqual(result);
    expect(factory).not.toHaveBeenCalled();
  });

  it('should call factory function if first result is error', () => {
    const result = error('first error');
    const factory = jest.fn(() => ok('second'));
    const finalResult = lazyOr(result, factory);
    expect(finalResult).toEqual(ok('second'));
    expect(factory).toHaveBeenCalledTimes(1);
  });
});
