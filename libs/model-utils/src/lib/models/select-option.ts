import { combineLatest, from, Observable } from 'rxjs';
import { filter, first, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

import { LangString, LangStringSimple } from './lang-string';
import { Nil, notNil } from './nil';

/**
 * Kind of an augmented KeyValue type to be used whenever we have case where a user has to select an option, being it in a select, an autocomplete, etc.
 * This is mostly there in an effort of consistency, to have interoperable libraries and data models.
 */
export interface SelectOption<T = string> {
  /**
   * The value associated to the SelectOption. In a given set, this should be unique.
   */
  value: T;
  /**
   * The label, used for presentational purposes
   */
  label: SelectOptionLabel;
  /**
   * Set tu true if this option is disabled, useful when needing to display historical values.
   */
  disabled?: boolean;
  /**
   * Can store whatever, placeholder for library to put whatever they need here.
   */
  data?: {};
}

/**
 * The label of a {@link SelectOption}
 */
export type SelectOptionLabel = string | LangString | LangStringSimple;

/**
 * For consistency, this interface is to be used when needing to use counts for {@link SelectOption}
 */
export interface SelectOptionCounts {
  [value: string]: number;
}

/**
 * a TrackByFn to be used with an `*ngFor` in case it is used on an array of {@link SelectOption}
 */
export function trackBySelectOption<T>(index: number, option: SelectOption<T>): T {
  return option.value;
}

/**
 * This will (naively) check that on the labels of the given option matches the query.
 */
export function selectOptionMatchQuery<T>(option: SelectOption<T>, query: Nil<string>): boolean {
  if (!query) return true;
  const lowerQuery = query.toLowerCase();
  const allLabels = [];
  if (typeof option.label === 'string') {
    allLabels.push(option.label);
  } else {
    Object.values(option.label).forEach(labels => allLabels.push(...labels));
  }
  return allLabels.some(label => label.toLowerCase().includes(lowerQuery));
}

/**
 * Any service or other that provides an array of SelectOption should implement this interface for consistency and interoperability.
 */
export interface SelectOptionsProvider<T> {
  /**
   * Given the query, will return a filtered array of `SelectOption` that all matches.
   */
  getOptions(query: Nil<string>, params: GetSelectOptionsParams): Observable<(SelectOption<T> | SelectOptionGroup<T>)[]>;

  /**
   * Given a value, will return the SelectOption corresponding that value.
   */
  getValueOption(value: T): Observable<SelectOption<T>>;

  /**
   * Returns `true` if this provider has a `SelectOption` that is linked to the given value.
   */
  hasOptionFor(value: T): Observable<boolean>;
}

export interface GetSelectOptionsParams {
  counts?: Nil<SelectOptionCounts>;
  lang?: Nil<string>;
}

/**
 * Merges multiple SelectOptionsProvider together to form a unified one.
 * @deprectated
 */
export class SelectOptionsProvidersMerger<T> implements SelectOptionsProvider<T> {
  constructor(private providers: SelectOptionsProvider<T>[]) {}

  /**
   * see {@link SelectOptionsProvider}
   */
  getOptions(query: Nil<string>, params: GetSelectOptionsParams): Observable<(SelectOption<T> | SelectOptionGroup<T>)[]> {
    const obs = this.providers.map(provider => provider.getOptions(query, params));
    return combineLatest(obs).pipe(map(allOptions => allOptions.reduce((acc, curr) => [...acc, ...curr], [])));
  }

  /**
   * see {@link SelectOptionsProvider}
   */
  getValueOption(value: T): Observable<SelectOption<T>> {
    return from(this.providers).pipe(
      mergeMap(provider => provider.hasOptionFor(value).pipe(map(hasOption => (hasOption ? provider : null)))),
      filter(notNil),
      first(),
      switchMap(provider => provider.getValueOption(value)),
      first()
    );
  }

  /**
   * see {@link SelectOptionsProvider}
   */
  hasOptionFor(value: T): Observable<boolean> {
    return from(this.providers).pipe(
      mergeMap(provider => provider.hasOptionFor(value)),
      toArray(),
      map(hasOptions => hasOptions.some(hasOption => hasOption))
    );
  }
}

/**
 * Represents a group SelectOption, might be useful when having grouped options in selects for example
 */
export interface SelectOptionGroup<T = string> {
  /**
   * Label of the group
   */
  label?: SelectOptionLabel;

  /**
   * Options that are inside that group
   */
  options: SelectOption<T>[];
}

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

function isSelectOption<T>(o: SelectOption<T> | SelectOptionGroup<T>): o is SelectOption<T> {
  return 'value' in o;
}
