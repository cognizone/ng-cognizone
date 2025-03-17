import { ok } from './ok';
import { error } from './error';
import { unwrap } from './unwrap';

describe('unwrap', () => {
  it('should return content for ok results', () => {
    const result = ok('test');
    expect(unwrap(result, 'default')).toBe('test');
  });

  it('should return default value for error results', () => {
    const result = error('some error');
    expect(unwrap(result, 'default')).toBe('default');
  });

  it('should work with different types', () => {
    expect(unwrap(ok(42), 0)).toBe(42);
    expect(unwrap(error('error'), 0)).toBe(0);

    const defaultObj = { id: 0, name: 'default' };
    const obj = { id: 1, name: 'test' };
    expect(unwrap(ok(obj), defaultObj)).toEqual(obj);
    expect(unwrap(error('error'), defaultObj)).toEqual(defaultObj);
  });
});
