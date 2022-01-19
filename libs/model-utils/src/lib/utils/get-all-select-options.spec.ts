import { getAllSelectOptions } from './get-all-select-options';
import { isSelectOption } from './is-select-option';

describe('getAllSelectOptions', () => {
  it('should flatten all options', () => {
    const options = [
      {
        options: [
          { value: 1, label: '1' },
          { value: 2, label: '2' },
        ],
      },
      {
        value: 3,
        label: '3',
      },
      { value: 4, label: '4' },
      {
        options: [
          { value: 5, label: '5' },
          { value: 6, label: '6' },
        ],
      },
    ];

    const allOptions = getAllSelectOptions(options);

    expect(allOptions.length).toBe(6);
    expect(allOptions.every(isSelectOption)).toBeTruthy();
  });
});
