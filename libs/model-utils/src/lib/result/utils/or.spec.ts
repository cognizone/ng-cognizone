import { Result } from '../models';
import { error } from './error';
import { ok } from './ok';
import { or } from './or';

describe('or', () => {
  it('should return first result if ok', () => {
    const result1: Result<string> = ok('first');
    const result2: Result<string> = ok('second');
    expect(or<string>(result1, result2)).toEqual(result1);
  });

  it('should return second result if first is error', () => {
    const result1: Result<string> = error('first error');
    const result2: Result<string> = ok('second');
    expect(or<string>(result1, result2)).toEqual(result2);
  });

  it('should return second error if both are errors', () => {
    const result1: Result<string> = error('first error');
    const result2: Result<string> = error('second error');
    expect(or<string>(result1, result2)).toEqual(result2);
  });
});
