import { manyToOne } from './many-to-one';

describe('manyToOne', () => {
  it('should keep literal as-is', () => {
    expect(manyToOne(0)).toBe(0);
    expect(manyToOne('hey')).toBe('hey');
    expect(manyToOne(null)).toBe(null);
    expect(manyToOne(undefined)).toBe(undefined);
  });

  it('should get the first element of an array', () => {
    expect(manyToOne([0])).toBe(0);
    expect(manyToOne([0, 1, 2])).toBe(0);
    expect(manyToOne([])).toBe(undefined);
  });
});
