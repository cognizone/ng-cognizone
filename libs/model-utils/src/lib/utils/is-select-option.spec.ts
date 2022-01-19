import { isSelectOption } from './is-select-option';

describe('isSelectOption', () => {
  it('should return true for SelectOption', () => {
    expect(isSelectOption({ value: '', label: '' })).toBeTruthy();
  });

  it('should return false for SelectOptionGroup', () => {
    expect(isSelectOption({ options: [], label: '' })).toBeFalsy();
  });
});
