import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '@cognizone/i18n';
import { getLangStringValue, Nil, SelectOption } from '@cognizone/model-utils';

@Pipe({
  name: 'selectOptionsSort',
})
export class SelectOptionSortPipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  /**
   * `transform` sorts the list of options based on provided sortOrder: `'asc' | 'desc'` and sortType `'label' | 'value'`
   */
  transform(value: Nil<SelectOption[]>, sortType: Nil<'label' | 'value'>, sortOrder: 'asc' | 'desc' = 'asc'): SelectOption[] {
    if (!value || !sortType) return value ?? [];
    const mult = sortOrder === 'asc' ? 1 : -1;
    const sorter = sortType === 'value' ? this.valueSort(mult) : this.labelSort(mult);
    return [...value].sort(sorter);
  }

  /**
   *  sorts list of options using localeCompare for values
   */
  valueSort: SelectOptionSort = mult => (a, b) => mult * a.value.localeCompare(b.value);

  /**
   * `labelSort` sorts list of options alphabetically by label
   */
  labelSort: SelectOptionSort = mult => (a, b) => {
    const aLabel = this.getLabel(a);
    const bLabel = this.getLabel(b);
    return mult * aLabel.localeCompare(bLabel);
  };

  /**
   * `getLabel` provides the corresponding label of type {@link SelectOption}
   * adding more flexibility for customizing option template of mat-radio-button
   */
  private getLabel(option: SelectOption): string {
    if (typeof option.label === 'string') return option.label;
    return getLangStringValue(option.label, this.i18nService.getActiveLang().split('-')[0]) ?? '';
  }
}

type SelectOptionSort = (mult: number) => (a: SelectOption, b: SelectOption) => number;
export type SelectOptionSortType = 'label' | 'value';
