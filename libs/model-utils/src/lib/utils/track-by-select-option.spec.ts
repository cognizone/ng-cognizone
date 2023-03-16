import { SelectOption } from '../models/select-option';
import { trackBySelectOption } from './track-by-select-option';

describe('trackBySelectOption', () => {
  const options: SelectOption<number>[] = [];

  for (let i = 0; i < 10; ++i) {
    options.push({
      value: i,
      label: i.toString(),
    });
  }

  it('should return value', () => {
    expect(trackBySelectOption(1, options[1])).toBe(1);
  });
});
