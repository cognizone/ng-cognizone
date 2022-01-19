import { manyToArray } from './many-to-array';

describe('manyToArray', () => {
  it('should keep array as-is', () => {
    const arr = [1, 2];
    expect(manyToArray(arr)).toBe(arr);
  });

  it('should put non-nil literal in array', () => {
    const arr = manyToArray('hey');
    expect(arr.length).toBe(1);
    expect(arr[0]).toBe('hey');
  });

  it('should convert nil to empty array', () => {
    expect(manyToArray(undefined).length).toBe(0);
    expect(manyToArray(null).length).toBe(0);
  });
});
