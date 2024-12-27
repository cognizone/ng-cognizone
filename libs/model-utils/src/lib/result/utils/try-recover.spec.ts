import { Result } from '../models';
import { ok } from './ok';
import { error } from './error';
import { tryRecover } from './try-recover';

describe('tryRecover', () => {
  it('should return original result if ok', () => {
    const result: Result<string> = ok('test');
    const recover = jest.fn(() => ok('recovered'));
    expect(tryRecover(result, recover)).toEqual(result);
    expect(recover).not.toHaveBeenCalled();
  });

  it('should call recover function with error if result is error', () => {
    const result: Result<string, number> = error(404);
    const recover = (e: number) => ok(`recovered ${e}`);
    expect(tryRecover(result, recover)).toEqual(ok('recovered 404'));
  });
});
