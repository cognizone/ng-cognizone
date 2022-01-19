import { dateToDateString } from './date-to-date-string';

describe('dateToDateString', () => {
  it('should convert date to YYYY-MM-DD', () => {
    expect(dateToDateString(new Date('2021-01-19'))).toBe('2021-01-19');
    expect(dateToDateString(new Date('2021-11-09'))).toBe('2021-11-09');
  });
});
