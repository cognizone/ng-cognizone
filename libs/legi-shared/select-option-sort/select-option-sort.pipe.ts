import { Pipe, PipeTransform } from '@angular/core';
import { getLangStringValue, Nil, SelectOption } from '@cognizone/model-utils';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'selectOptionsSort',
})
export class SelectOptionSortPipe implements PipeTransform {
  constructor(private transloco: TranslocoService) {}

  transform(value: Nil<SelectOption[]>, sortType: Nil<'value' | 'label'>, sortOrder: 'asc' | 'desc' = 'asc'): SelectOption[] {
    if (!value || !sortType) return value ?? [];
    const mult = sortOrder === 'asc' ? 1 : -1;
    const sorter = sortType === 'value' ? this.valueSort(mult) : this.labelSort(mult);
    return [...value].sort(sorter);
  }

  valueSort: SelectOptionSort = mult => (a, b) => mult * a.value.localeCompare(b.value);
  labelSort: SelectOptionSort = mult => (a, b) => {
    const aLabel = this.getLabel(a);
    const bLabel = this.getLabel(b);
    return mult * aLabel.localeCompare(bLabel);
  };

  private getLabel(option: SelectOption): string {
    if (typeof option.label === 'string') return option.label;
    return getLangStringValue(option.label, this.transloco.getActiveLang().split('-')[0]) ?? '';
  }
}

type SelectOptionSort = (mult: number) => (a: SelectOption, b: SelectOption) => number;
export type SelectOptionSortType = 'value' | 'label';
