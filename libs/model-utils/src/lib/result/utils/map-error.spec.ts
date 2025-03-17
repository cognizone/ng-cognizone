import { error } from './error';
import { mapError } from './map-error';
import { ok } from './ok';

describe('mapError', () => {
  it('should transform error results', () => {
    const result = error('test error');
    const transformed = mapError(result, e => `Transformed: ${e}`);
    expect(transformed).toEqual(error('Transformed: test error'));
  });

  it('should not transform ok results', () => {
    const okResult = ok(42);
    const transformed = mapError(okResult, e => `Transformed: ${e}`);
    expect(transformed).toEqual(okResult);
  });
});
