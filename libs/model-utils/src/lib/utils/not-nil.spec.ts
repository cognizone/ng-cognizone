import { notNil } from './not-nil';

describe('notNil', () => {
  it('should consider null and undefined as Nil', () => {
    expect(notNil(undefined)).toBeFalsy();
    expect(notNil(null)).toBeFalsy();
  });

  it('should consider other types as not Nil', () => {
    expect(notNil(0)).toBeTruthy();
    expect(notNil('')).toBeTruthy();
    expect(notNil([])).toBeTruthy();
    expect(notNil({})).toBeTruthy();
    expect(notNil(new Date())).toBeTruthy();
  });
});
