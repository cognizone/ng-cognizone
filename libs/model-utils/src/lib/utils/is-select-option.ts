import { SelectOption, SelectOptionGroup } from '../models';

export function isSelectOption<T>(o: SelectOption<T> | SelectOptionGroup<T>): o is SelectOption<T> {
  return 'value' in o;
}
