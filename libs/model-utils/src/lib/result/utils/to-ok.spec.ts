import { ok } from './ok';
import { error } from './error';
import { toOk } from './to-ok';

describe('toOk', () => {
  it('should return the same result if it is already ok', () => {
    const okResult = ok('test content');
    const result = toOk(okResult);
    expect(result).toBe(okResult);
  });

  it('should convert an error result to ok with the error content', () => {
    const errorResult = error('test error');
    const result = toOk(errorResult);
    expect(result).toEqual({ type: 'ok', content: 'test error' });
  });

  it('should work with different types', () => {
    const numberError = error(42);
    const numberOk = toOk(numberError);
    expect(numberOk).toEqual({ type: 'ok', content: 42 });

    const objectError = error({ foo: 'bar' });
    const objectOk = toOk(objectError);
    expect(objectOk).toEqual({ type: 'ok', content: { foo: 'bar' } });
  });

  it('should preserve ok type when input is already ok', () => {
    const customOk = ok({ code: 200, message: 'Success' });
    const result = toOk(customOk);
    expect(result).toEqual({ type: 'ok', content: { code: 200, message: 'Success' } });
  });
});
