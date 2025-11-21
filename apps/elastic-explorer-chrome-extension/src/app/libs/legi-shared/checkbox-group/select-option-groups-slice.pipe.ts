import { Pipe, PipeTransform } from '@angular/core';
import { SelectOptionGroup } from '@cognizone/model-utils';

@Pipe({
  name: 'selectOptionGroupsSlice',
})
export class SelectOptionGroupsSlicePipe implements PipeTransform {
  transform(groups: SelectOptionGroup[], size?: number, selectedValues?: string[]): SelectOptionGroup[] {
    if (size == null || size === Number.POSITIVE_INFINITY) return groups;
    let count = 0;
    return groups
      .map(group => ({
        ...group,
        options: group.options.filter(option => {
          if (count < size || selectedValues?.includes(option.value)) {
            ++count;
            return true;
          }
          return false;
        }),
      }))
      .filter(group => group.options.length > 0);
  }
}
