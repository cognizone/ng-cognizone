import { isCurie } from './is-curie';

describe('isCurie', () => {
  const validCuries = ['pfx:abc', 'xsd:string', ':', 'pfx:', 'abc', ':abc', '', 'pfx:/abc', 'pfx:/', ':/'];
  const invalidCuries = ['pfx://abc', 'pfx://', '://', '/'];

  validCuries.forEach(value => {
    it(`should consider ${value} as curie`, () => {
      expect(isCurie(value)).toBeTruthy();
    });
  });

  invalidCuries.forEach(value => {
    it(`should not consider ${value} as curie`, () => {
      expect(isCurie(value)).toBeFalsy();
    });
  });
});
