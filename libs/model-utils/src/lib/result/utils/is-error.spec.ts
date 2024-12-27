import { ok } from './ok';
import { error } from './error';
import { isError } from './is-error';

describe('isError', () => {
  it('should return true for error results', () => {
    const result = error('test error');
    expect(isError(result)).toBe(true);
  });

  it('should return false for ok results', () => {
    const result = ok('test');
    expect(isError(result)).toBe(false);
  });
});
