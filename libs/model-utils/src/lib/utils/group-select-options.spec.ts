import { groupSelectOptions } from './group-select-options';

describe('groupSelectOptions', () => {
  it('should put all lonely SelectOption in groups', () => {
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
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
    ];

    const allGroups = groupSelectOptions(options);

    expect(allGroups.length).toBe(4);
    expect(allGroups.every(group => 'options' in group)).toBeTruthy();
  });
});
