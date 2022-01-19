import { SelectOption, SelectOptionGroup } from '../models';
import { isSelectOption } from './is-select-option';

export function groupSelectOptions<T>(options: (SelectOption<T> | SelectOptionGroup<T>)[]): SelectOptionGroup<T>[] {
  const allGroups: SelectOptionGroup<T>[] = [];
  let lastDynamicGroup: SelectOptionGroup<T> | undefined;
  for (const option of options) {
    if (isSelectOption(option)) {
      if (!lastDynamicGroup) {
        lastDynamicGroup = { options: [] };
        allGroups.push(lastDynamicGroup);
      }
      lastDynamicGroup.options.push(option);
    } else {
      lastDynamicGroup = undefined;
      allGroups.push(option);
    }
  }
  return allGroups;
}
