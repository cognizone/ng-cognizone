import { Result } from '../models';
import { ok } from './ok';
import { error } from './error';
import { mapOk } from './map-ok';

describe('mapOk', () => {
  it('should transform ok results', () => {
    const result = ok(5);
    const doubled = mapOk(result, x => x * 2);
    expect(doubled).toEqual(ok(10));
  });

  it('should not transform error results', () => {
    const err = new Error('test error');
    const result = error(err) as Result<number, Error>;
    const doubled = mapOk(result, x => x * 2);
    expect(doubled).toEqual(error(err));
  });

  it('should work with type transformations', () => {
    const numResult = ok(42);
    expect(mapOk(numResult, n => n.toString())).toEqual(ok('42'));
  });

  it('should preserve error type when mapping ok values', () => {
    interface CustomError {
      code: number;
      message: string;
    }
    const customError: CustomError = { code: 404, message: 'Not Found' };
    const result: Result<number, CustomError> = error(customError);
    expect(mapOk<number, string, CustomError>(result, x => x.toString())).toEqual(error(customError));
  });
});
