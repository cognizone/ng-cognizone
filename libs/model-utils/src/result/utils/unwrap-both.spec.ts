import { error } from './error';
import { ok } from './ok';
import { unwrapBoth } from './unwrap-both';

describe('unwrapBoth', () => {
  it('should return content for ok results', () => {
    const result = ok('test');
    expect(unwrapBoth(result)).toBe('test');
  });

  it('should return error for error results', () => {
    const err = 'test error';
    const result = error(err);
    expect(unwrapBoth(result)).toBe(err);
  });
});
