import { SelectOption } from '../models';

/**
 * a TrackByFn to be used with an `*ngFor` in case it is used on an array of {@link SelectOption}
 */
export function trackBySelectOption<T>(index: number, option: SelectOption<T>): T {
  return option.value;
}
