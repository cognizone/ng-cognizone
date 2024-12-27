import { ok } from './ok';

describe('ok', () => {
  it('should create a ResultOk with the given content', () => {
    const content = 'test';
    const result = ok(content);
    expect(result).toEqual({ type: 'ok', content });
  });

  it('should work with different types', () => {
    const numberResult = ok(42);
    expect(numberResult).toEqual({ type: 'ok', content: 42 });

    const objectResult = ok({ foo: 'bar' });
    expect(objectResult).toEqual({ type: 'ok', content: { foo: 'bar' } });
  });
});
