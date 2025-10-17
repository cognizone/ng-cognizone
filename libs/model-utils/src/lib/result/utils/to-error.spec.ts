import { ok } from './ok';
import { error } from './error';
import { toError } from './to-error';

describe('toError', () => {
  it('should return the same result if it is already an error', () => {
    const errorResult = error('test error');
    const result = toError(errorResult);
    expect(result).toBe(errorResult);
  });

  it('should convert an ok result to an error with the ok content', () => {
    const okResult = ok('test content');
    const result = toError(okResult);
    expect(result).toEqual({ type: 'error', error: 'test content' });
  });

  it('should work with different types', () => {
    const numberOk = ok(42);
    const numberError = toError(numberOk);
    expect(numberError).toEqual({ type: 'error', error: 42 });

    const objectOk = ok({ foo: 'bar' });
    const objectError = toError(objectOk);
    expect(objectError).toEqual({ type: 'error', error: { foo: 'bar' } });
  });

  it('should preserve error type when input is already an error', () => {
    const customError = error({ code: 404, message: 'Not Found' });
    const result = toError(customError);
    expect(result).toEqual({ type: 'error', error: { code: 404, message: 'Not Found' } });
  });
});
