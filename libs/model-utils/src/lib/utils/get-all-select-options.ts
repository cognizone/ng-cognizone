import { SelectOption, SelectOptionGroup } from '../models';

/**
 * `getAllSelectOptions` spread options and sub options into one flat list of options @typedef SelectOption []
 */
export function getAllSelectOptions<T>(options: (SelectOption<T> | SelectOptionGroup<T>)[]): SelectOption<T>[] {
  const allOptions: SelectOption<T>[] = [];
  options.forEach(option => {
    if ('value' in option) {
      allOptions.push(option);
    } else {
      allOptions.push(...option.options);
    }
  });
  return allOptions;
}
