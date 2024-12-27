import { ok } from './ok';
import { error } from './error';
import { lazyUnwrap } from './lazy-unwrap';

describe('lazyUnwrap', () => {
  it('should return content for ok results', () => {
    const result = ok('test');
    expect(lazyUnwrap(result, () => 'default')).toBe('test');
  });

  it('should call factory function for error results', () => {
    const result = error('some error');
    const factory = jest.fn(() => 'default');
    expect(lazyUnwrap(result, factory)).toBe('default');
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('should not call factory function for ok results', () => {
    const result = ok('test');
    const factory = jest.fn(() => 'default');
    expect(lazyUnwrap(result, factory)).toBe('test');
    expect(factory).not.toHaveBeenCalled();
  });
});
