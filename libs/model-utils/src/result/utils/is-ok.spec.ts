import { ok } from './ok';
import { error } from './error';
import { isOk } from './is-ok';

describe('isOk', () => {
  it('should return true for ok results', () => {
    const result = ok('test');
    expect(isOk(result)).toBe(true);
  });

  it('should return false for error results', () => {
    const result = error('test error');
    expect(isOk(result)).toBe(false);
  });
});
