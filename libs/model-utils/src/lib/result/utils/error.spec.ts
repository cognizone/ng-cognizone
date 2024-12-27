import { error } from './error';

describe('error', () => {
  it('should create a ResultError with the given error', () => {
    const err = new Error('test error');
    const result = error(err);
    expect(result).toEqual({ type: 'error', error: err });
  });

  it('should work with different error types', () => {
    const stringError = error('error message');
    expect(stringError).toEqual({ type: 'error', error: 'error message' });

    const objectError = error({ code: 404, message: 'Not Found' });
    expect(objectError).toEqual({ type: 'error', error: { code: 404, message: 'Not Found' } });
  });
});
