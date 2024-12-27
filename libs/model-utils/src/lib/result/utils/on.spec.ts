import { Result } from '../models';
import { ok } from './ok';
import { error } from './error';
import { on } from './on';

describe('on', () => {
  it('should call success handler for ok results', () => {
    const result: Result<string> = ok('test');
    const success = jest.fn();
    const errorHandler = jest.fn();

    on(result, { ok: success, error: errorHandler });

    expect(success).toHaveBeenCalledWith('test');
    expect(errorHandler).not.toHaveBeenCalled();
  });

  it('should call error handler for error results', () => {
    const err = new Error('test error');
    const result: Result<string, Error> = error(err);
    const success = jest.fn();
    const errorHandler = jest.fn();

    on(result, { ok: success, error: errorHandler });

    expect(errorHandler).toHaveBeenCalledWith(err);
    expect(success).not.toHaveBeenCalled();
  });
});
